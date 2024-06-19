import React, { useEffect, useRef, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import { defTpGameType, isDateRange, products } from "@ailab-desktop/common";
import { useLazyGetPopUpPromotionQuery } from "@ailab-desktop/service";
import useMenu from "../hook/useMenu";
import { api_events_GetLeaderboardList } from "../../service/api/events";
import path from "../../router";
import {
	userInfoContext,
	isRootContext,
	maintainListContext
} from "../common/context";
import { readCookie, setCookie, deleteCookie } from "../common/common";
import { api_account_GetWalletInfo } from "../../service/api/account";
import { defPopBoxType } from "../common/defPopBoxType";
import usePopBox from "../hook/usePopBox";
import LuckyWheelLink from "../luckyWheel/luckyWheel.link";
import SwipperBanner from "../common/swipperBanner";
import Marquee from "./marquee";
import Jackpot from "./jackpot";
import SideBarContactUs from "./sideBarContactUs";
import SideBarDownload from "./sideBarDownload";
import { defBannerType } from "../../service/api/site";
import useGetVideo from "../streaming/hook";
import { bannerImgUrl } from "../../config";
import { defEventPeriod as NewYearEventPeriod } from "../common/popbox.newYear";
import { defDeviceType } from "../../service/api/base";
import HotGames from "./hotGame";
import HotPromotion from "./hotPromotion";
import { isExpiry } from "../promotion/promotion.common";
import {
	api_promotion_GetPromotionDetail,
	api_promotion_GetPromotionListV2
} from "../../service/api/promotion";
import { api_hotEvent_GetDataList } from "../../service/api/hotEvent";
import HomeMatch from "./homeMatch";
import TopWinner from "./topWinner";
import FavoriteSlots from "./favoriteSlots";
import { api_HotGame_GetDataList } from "../../service/api/hotGame";
import RecentlyViewed from "./recentlyViewed";
import HomeDownLoad from "./homeDownLoad";
import LiveSports from "./liveSports";
import News from "./news";
import { api_news_GetNews } from "../../service/api/news";
import { eventPerios } from "../../datas/eventDef";
import DragonEgg from "../dragonEgg/homeLink";
import CupEventLink from "../cupEventLink/cupEventLink";
import useAppDownLoad from "../appDownload/useAppDownLoad";

const apiResPromotionType = {
	retentionFreebet: 9
};

const Home = () => {
	const { t } = useTranslation();
	const { setPopBox, errorPopBox, closePopBox } = usePopBox();
	const isMountedRef = useRef(null);
	const timeRef = useRef(null);
	const { userInfo } = useContext(userInfoContext);
	const { setIsRoot } = useContext(isRootContext);
	const { allMaintainList } = useContext(maintainListContext);

	// * 如果 popUpBonusCode 有值需彈出彈窗提醒有該優惠活動可以使用
	const [getPopUpPromotion] = useLazyGetPopUpPromotionQuery();
	const { appLinkDatas } = useAppDownLoad();

	const { videoList } = useGetVideo({
		langId: userInfo.langId,
		isMounted: isMountedRef.current
	});
	const [displayVGaming, setDisplayVGaming] = useState(true);
	const [promotionList, setPromotionList] = useState([]);
	const filterPromotionList = promotionList.filter(
		item =>
			!isExpiry({
				...item,
				isLogin: userInfo.isLogin
			})
	);
	const [hotEventList, setHotEventList] = useState([]);
	const [leaderBoardList, setLeaderBoardList] = useState([]);
	const [hotGameList, setHotGameList] = useState([]);
	const [news, setNews] = useState([]);

	const { onClickProductItem } = useMenu();

	const vGamingItem = products.Vgaming;

	const handleClickHomeProduct = product => {
		// console.log(product);
		// * 為靜態遊戲檢查的 isInMaintain
		const isInMaintain = allMaintainList?.some(
			mt =>
				mt.tpId === product?.tpId &&
				(mt.tpGameType === product?.tpGameType ||
					mt.tpGameType === defTpGameType.All)
		);

		if (isInMaintain || product?.isInMaintain) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.UnderMaintain,
				clickClose: () => setPopBox({ isOpen: false }),
				content: t("lbl_underMaintenance"),
				hasBtn: true,
				btnBar: (
					<div className="btn-group">
						<button
							className="btn-gray"
							onClick={() => {
								setPopBox({ isOpen: false });
							}}>
							OK
						</button>
					</div>
				)
			});
		} else {
			onClickProductItem(product);
		}
	};

	const getPromotionList = async () => {
		try {
			const {
				data: { data }
			} = await api_promotion_GetPromotionListV2({
				langId: userInfo.langId
			});
			setPromotionList(data ?? []);
		} catch (error) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.ErrorMsg,
				message: t("msg_ApiServerError"),
				btnBar: (
					<div className="btnGroup">
						<button
							className="btn-cancel"
							onClick={() => setPopBox({ isOpen: false })}>
							{t("lbl_Close")}
						</button>
					</div>
				)
			});
		}
	};

	const getHotEventList = async () => {
		try {
			const {
				data: { data }
			} = await api_hotEvent_GetDataList({
				langId: userInfo.langId
			});
			setHotEventList(data ?? []);
		} catch (error) {
			// * getHotEventList 會定期更新資料，目前有收到市場回饋首頁有情境會出現「 Oops something wrong 」 的錯誤訊息
			// * 因此跟 announce 一樣先關閉錯誤訊息，讓邏輯變為「 api 成功時就更新資料」
			// setPopBox({
			// 	isOpen: true,
			// 	popBoxType: defPopBoxType.ErrorMsg,
			// 	message: t("msg_ApiServerError"),
			// 	btnBar: (
			// 		<div className="btnGroup">
			// 			<button
			// 				className="btn-cancel"
			// 				onClick={() => setPopBox({ isOpen: false })}
			// 			>
			// 				{t("lbl_Close")}
			// 			</button>
			// 		</div>
			// 	)
			// });
		}
	};

	const getLeaderBoardList = async () => {
		try {
			const res = await api_events_GetLeaderboardList({
				lBCategoryId: 0,
				TopNum: 10,
				BeforeDays: 0,
				EventCode: "202104"
			});
			setLeaderBoardList(res.data.data ?? []);
		} catch (error) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.ErrorMsg,
				message: t("msg_ApiServerError"),
				btnBar: (
					<div className="btnGroup">
						<button
							className="btn-cancel"
							onClick={() => setPopBox({ isOpen: false })}>
							{t("lbl_Close")}
						</button>
					</div>
				)
			});
		}
	};

	const getHotGameList = async () => {
		try {
			const res = await api_HotGame_GetDataList(userInfo.langId);
			setHotGameList(res.data.data.HotGame ?? []);
		} catch (error) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.ErrorMsg,
				message: t("msg_ApiServerError"),
				btnBar: (
					<div className="btnGroup">
						<button
							className="btn-cancel"
							onClick={() => setPopBox({ isOpen: false })}>
							{t("lbl_Close")}
						</button>
					</div>
				)
			});
		}
	};

	const getNews = async () => {
		try {
			const res = await api_news_GetNews({
				langId: userInfo.langId,
				PageNumber: 1,
				PageSize: 2,
				currencyId: userInfo.currencyId
			});
			setNews(res.data.data ?? []);
		} catch (error) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.ErrorMsg,
				message: t("msg_ApiServerError"),
				btnBar: (
					<div className="btnGroup">
						<button
							className="btn-cancel"
							onClick={() => setPopBox({ isOpen: false })}>
							{t("lbl_Close")}
						</button>
					</div>
				)
			});
		}
	};

	useEffect(() => {
		getPromotionList();
		getHotEventList();
		getLeaderBoardList();
		getHotGameList();
		getNews();

		timeRef.current = setInterval(() => {
			getHotEventList();
		}, 60000);

		return () => {
			clearInterval(timeRef.current);
		};
	}, []);

	useEffect(() => {
		isMountedRef.current = true;
		setIsRoot(true);
		return () => {
			isMountedRef.current = false;
			setIsRoot(false);
		};
	});

	useEffect(() => {
		const displayAnnouncePopup = () => {
			const cookieOfficialAnnounce = `OfficialAnnounce_cookie`;
			const isShowOfficialAnnouncePopBox =
				readCookie(cookieOfficialAnnounce) !== "1";

			if (
				!isDateRange(
					NewYearEventPeriod.startDate,
					NewYearEventPeriod.endDate
				) &&
				userInfo.isLogin === false &&
				isShowOfficialAnnouncePopBox
			) {
				setPopBox({
					isOpen: true,
					popBoxType: defPopBoxType.OfficialAnnounce,
					onClickClose: openNextPopUp
				});
				setCookie(cookieOfficialAnnounce, "1", 1);
			} else {
				openNextPopUp();
			}
		};

		const displayNewYearPopup = () => {
			if (
				isDateRange(
					NewYearEventPeriod.startDate,
					NewYearEventPeriod.endDate
				) &&
				!readCookie(`NewYear-${window.location.hostname}`)
			) {
				setPopBox({
					isOpen: true,
					customLayout: true,
					popBoxType: defPopBoxType.NewYear,
					onClickClose: openNextPopUp,
					langId: userInfo.langId
				});
			} else {
				openNextPopUp();
			}
		};

		const displayDepositPopup = () => {
			const cookieName = `balanceHint${userInfo.userName}`;

			if (
				userInfo.isLogin &&
				userInfo.userName &&
				readCookie(cookieName) !== "1"
			) {
				setCookie(cookieName, "1", 1);
				api_account_GetWalletInfo().then(
					res => {
						if (res.data.errorCode === 0 && isMountedRef.current) {
							const tpWallets = res.data.data.tpWallets?.map(
								tp => ({
									tpId: tp.tpId,
									balance: tp.balance
								})
							);

							const hasBalance =
								res.data.data?.balance ||
								tpWallets?.filter(tp => tp.balance > 0)
									.length >= 1;

							if (!hasBalance) {
								setPopBox({
									isOpen: true,
									popBoxType: defPopBoxType.DepositHint
								});
							}
						} else if (res.data.errorCode !== 0) {
							errorPopBox(
								res.data.message || "error",
								res.data.errorCode,
								openNextPopUp
							);
						}
					},
					() => {
						errorPopBox(null, null, openNextPopUp);
					}
				);
			}
		};

		const displayPromotionPopup = () => {
			const cookieName = `popUpPromotion${userInfo.userName}`;

			// * 如果未登入 or 當日觸發過 則直接進入下一個彈窗
			if (
				!userInfo.isLogin ||
				!userInfo.accountName ||
				readCookie(cookieName) === "1"
			) {
				openNextPopUp();
				return;
			}

			// * 如果 bonusCode 不為 null ，打開並記錄 cookie，效期為一日
			getPopUpPromotion({
				deviceType: defDeviceType.Desktop,
				langId: userInfo.langId
			}).then(({ data: { data: { bonusCode } = {} } = {} }) => {
				if (bonusCode) {
					// getting promotion detail to determine the type of promotion
					api_promotion_GetPromotionDetail({
						langId: userInfo.langId,
						BonusCode: bonusCode
					}).then(
						// giving default value to response data and promotionType
						({
							data: { data: { promotionType = null } = {} } = {}
						}) => {
							// 使用獲取到的詳細資訊顯示彈出框
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.Modal,
								content: (
									<div id="popup" className="active">
										<div className="pop promosbackpopup">
											<div className="promosback active">
												<div className="promosback-pop">
													<img
														src={`${
															process.env
																.REACT_APP_BANNER_URL
														}/desktop/img/promosBackPopup/promosPopup-${
															userInfo?.langId ||
															"en"
														}.png`}
														alt="img-promosPopup"
													/>
													{/*  if promotion type = retention freebet(9), then link to retention landing page  */}
													<button
														className="popgo"
														onClick={() => {
															if (
																promotionType ===
																apiResPromotionType.retentionFreebet
															) {
																navigate(
																	`/${path.retention.root}`
																);
															} else {
																navigate(
																	`/${path.promotion.root}?bonusCode=${bonusCode}`
																);
															}
														}}>
														{t(
															"lbl_Promotion_ClaimNow"
														)}
													</button>

													<img
														src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/promosBackPopup/delet.png`}
														alt="img-delet"
														className="closepop"
														onClick={() => {
															closePopBox();
															openNextPopUp();
														}}
													/>
												</div>
											</div>
										</div>
									</div>
								)
							});
							setCookie(cookieName, "1", 1);
						}
					);
				} else {
					openNextPopUp();
				}
			});
		};

		const popUpStack = [
			displayDepositPopup,
			displayNewYearPopup,
			displayAnnouncePopup,
			displayPromotionPopup
		];

		const openNextPopUp = () => {
			if (popUpStack.length) {
				popUpStack.pop()();
			} else {
				setPopBox({ isOpen: false });
			}
		};
		!userInfo.isResetPwd && openNextPopUp();
	}, [userInfo.isLogin, setPopBox, userInfo.langId, userInfo.accountName]);

	useEffect(() => {
		const popBoxMsg = readCookie("popBoxMsg");
		if (popBoxMsg) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.ErrorMsg,
				message: popBoxMsg,
				btnBar: (
					<div className="btnGroup">
						<button
							className="btn-cancel"
							onClick={() => {
								deleteCookie("popBoxMsg");
								closePopBox();
							}}>
							{t("lbl_Close")}
						</button>
					</div>
				)
			});
		}
	}, []);

	return (
		<>
			<main className="home">
				<div className="fullbanner">
					<SwipperBanner ImgFolder={[defBannerType.Promotions]} />
				</div>
				<Marquee />
				<div className="wrapper">
					<HotGames
						maintainList={allMaintainList}
						handleClickHomeProduct={handleClickHomeProduct}
					/>
					<HotPromotion promotionList={filterPromotionList} />
					<HomeMatch
						hotEventList={hotEventList}
						maintainList={allMaintainList}
						handleClickHomeProduct={handleClickHomeProduct}
					/>
					<TopWinner leaderBoardList={leaderBoardList} />
					<Jackpot t={t} userInfo={userInfo} />
					{hotGameList?.length > 0 && (
						<FavoriteSlots
							hotGameList={hotGameList}
							maintainList={allMaintainList}
						/>
					)}
					{userInfo.isLogin && <RecentlyViewed />}
					<HomeDownLoad appLinkDatas={appLinkDatas} />
					<LiveSports videoList={videoList} />
					<News news={news} />
				</div>
			</main>
			{/* vGaming Home 點擊入口 */}
			{displayVGaming && !isDateRange(eventPerios.euroCup) && (
				<div
					className={classNames("eventLink vgaming", {
						eurocup: isDateRange(eventPerios.euroCup)
					})}>
					<button
						style={{ zIndex: 50 }}
						className="icon-close-primary"
						onClick={() => setDisplayVGaming(false)}
					/>
					<img
						src={`${bannerImgUrl}/desktop/img/4.0/vgaming.gif`}
						alt="vgaming-link"
						onClick={() => handleClickHomeProduct(vGamingItem)}
					/>
				</div>
			)}

			{/* 僅限過年期間不顯示 */}
			{!isDateRange(eventPerios.dragonEgg) && (
				<LuckyWheelLink langId={userInfo.langId} />
			)}

			{/* 僅限過年期間顯示 */}
			{isDateRange(eventPerios.dragonEgg) && <DragonEgg />}

			{/* 歐冠杯期間顯示 */}
			{isDateRange(eventPerios.euroCup) && <CupEventLink />}

			<SideBarContactUs />

			<SideBarDownload
				langId={userInfo.langId}
				appLinkDatas={appLinkDatas}
			/>
		</>
	);
};

export default Home;
