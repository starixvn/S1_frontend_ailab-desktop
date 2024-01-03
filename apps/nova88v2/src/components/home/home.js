import { navigate } from "gatsby";
import React, { useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { isDateRange } from "@ailab-desktop/common";
import { AngpaoFloatLink } from "@ailab-desktop/components";
import { useLazyGetPopUpPromotionQuery } from "@ailab-desktop/service";
import {
	userInfoContext,
	popBoxContext,
	isRootContext,
	maintainListContext
} from "../common/context";
import {
	readCookie,
	setCookie,
	deleteCookie,
	getUrlParameter,
	defCurrencyList,
	number_format
} from "../common/common";
import defPopBoxType from "../common/defPopBoxType";
import { api_account_GetWalletInfo } from "../../service/api/account";
import { defBannerType, api_site_GetIpCountry } from "../../service/api/site";
import SwipperBanner from "../common/swipperBanner";
import Marquee from "./marquee";
import path from "../../router";
import PromoList from "./promoList";
import MysteryBoxLink from "./mysteryBoxLink";
import LuckyWheelLink from "../luckyWheel/luckyWheel.link";
import { angpaoAllowedCurrencies, angPaoEventPeriod } from "../../pages/angpao";
import LiveCasino from "./Casino";
import WelcomeInfo from "./WelcomeInfo";
import HotMatch from "./HotMatch";
import { defMenuType } from "../header/header.menu.def";
import { getUrl } from "../common/linkItems";
import { GET_OPEN_RULE, OPEN_IN_BLANK } from "../../service/enterPage";
import HotGame from "./4.0/HotGame";
import AppDownload from "./4.0/AppDownload";
import HonorablePartner from "./4.0/HonorablePartner";
import OfficialPartner from "./4.0/OfficialPartner";
import { defTpGameType } from "../../datas/productList";
import usePopBox from "../hook/usePopBox";
import { defDeviceType } from "../../service/api/base";
import LiveStreamingLink from "./liveStreamingLink";
import { api_bigWin_GetPopUpDataList } from "../../service/api/bigWin";
import { bannerImgUrl } from "../../config";

const IndexPage = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setIsRoot } = useContext(isRootContext);
	const { closePopBox, errorPopBox } = usePopBox();
	const isMountedRef = useRef(null);
	const { allMaintainList: maintainList } = useContext(maintainListContext);

	// Nova 4.0 首頁各靜態路徑共用的點擊事件
	const handleEntryClick = (item, checkLogin = false) => {
		// * 維護彈窗
		const isInMaintain = maintainList?.some(
			mt =>
				mt.tpId === item.tpId &&
				(mt.tpGameType === item.tpGameType ||
					mt.tpGameType === defTpGameType.All)
		);
		const showLogin = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		if ((checkLogin || item.needLogin) && !userInfo.isLogin) {
			showLogin();
			return;
		}

		if (isInMaintain) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.UnderMaintain,
				clickClose: () => {
					setPopBox({ isOpen: false });
				}
			});
			return;
		}

		if (item.menuType === defMenuType.Link) {
			if (item.parameter) {
				navigate(
					getUrl(`${userInfo.langId}/${item.path}`, item.parameter)
				);
			} else {
				navigate(`/${userInfo.langId}/${item.path}`);
			}
		}
		if (item.menuType === defMenuType.entPage) {
			const rule = GET_OPEN_RULE(
				userInfo.langId,
				item?.tpId,
				item?.gameId
			);
			OPEN_IN_BLANK(rule.entPageUrl, rule.windowKey);
		}
	};

	// * 如果 popUpBonusCode 有值需彈出彈窗提醒有該優惠活動可以使用
	const [getPopUpPromotion] = useLazyGetPopUpPromotionQuery();

	useEffect(() => {
		isMountedRef.current = true;
		setIsRoot(true);
		return () => {
			isMountedRef.current = false;
			setIsRoot(false);
		};
	});

	useEffect(() => {
		if (!userInfo.isLogin) {
			if (getUrlParameter("AffId")) {
				setPopBox({
					isOpen: true,
					popBoxType: defPopBoxType.Join
				});
			}
		}
	}, [userInfo.isLogin, userInfo.langId]);

	useEffect(() => {
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

							if (!hasBalance && showDepositHint) {
								setPopBox({
									isOpen: true,
									popBoxType: defPopBoxType.DepositHint
								});
							}
						} else if (res.data.errorCode !== 0) {
							openNextPopUp();
						}
					},
					() => {
						if (isMountedRef.current) {
							openNextPopUp();
						}
					}
				);
			}
		};

		const displayPromotionPopup = () => {
			const cookieName = `popUpPromotion${userInfo.userName}`;
			// * 如果未登入 or 當日觸發過 則直接進入下一個彈窗
			if (
				!userInfo.isLogin ||
				// * 多判斷是否有 accountName 防止 setCookie 紀錄 Guest 狀態時的資料
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
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.Modal,
						content: (
							<div className="pop promosbackpopup">
								<div className="promosback active">
									<div className="promosback-pop">
										<img
											src={`${
												process.env.REACT_APP_BANNER_URL
											}/desktop/img/promosBackPopup/promosPopup-${
												userInfo?.langId || "en"
											}.png`}
											alt="img-promosPopup"
										/>

										<button
											className="popgo"
											onClick={() => {
												navigate(
													`/${path.promotion.root}?bonusCode=${bonusCode}`
												);
											}}
										>
											{t("lbl_ClaimNow")}
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
						)
					});
					setCookie(cookieName, "1", 1);
				} else {
					openNextPopUp();
				}
			});
		};

		const displaySponsorshipPopup = () => {
			if (new Date() > new Date(2023, 12, 31)) {
				openNextPopUp();
				return;
			}
			const cookieName = `Sponsorship${userInfo.userName}`;
			if (
				!userInfo.isLogin &&
				// * 多判斷是否有 accountName 防止 setCookie 紀錄 Guest 狀態時的資料
				!userInfo.accountName &&
				readCookie(cookieName) !== "1"
			) {
				setCookie(cookieName, "1", 1);
				setPopBox({
					isOpen: true,
					popBoxType: defPopBoxType.Modal,
					content: (
						<div className="pop sponsorpop">
							<div className="sponsor active">
								<div className="sponsor-content">
									<img
										src={`${
											process.env.REACT_APP_BANNER_URL
										}/desktop/img/sponsorpop-${
											userInfo?.langId || "en"
										}.png`}
										alt="img-sponsorpop"
									/>
									<img
										src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/promosBackPopup/delet.png`}
										alt=""
										className="closepop"
										onClick={() => {
											closePopBox();
											openNextPopUp();
										}}
									/>
								</div>
							</div>
						</div>
					)
				});
			}
		};

		// * 期限六個月移除 上PRD 時需更新
		const expiredDisclaimerForVndDate = new Date(2024, 3, 13);
		const disclaimerForVnd = async () => {
			const nowDate = new Date();
			if (nowDate > expiredDisclaimerForVndDate) {
				openNextPopUp();
				return;
			}

			const cookieName = "disclaimerForVnd";
			const { data: { data: ipCountryData = {} } = {} } =
				await api_site_GetIpCountry();
			// * 如果未登入 or 當日觸發過 則直接進入下一個彈窗
			if (
				// * 等同於lodash isEmpty
				Object.keys(ipCountryData).length === 0 ||
				ipCountryData.code !== "VN" ||
				readCookie(cookieName) === "1"
			) {
				openNextPopUp();
				return;
			}
			const showLang = userInfo.langId === "vn" ? "vn" : "en";

			setCookie(cookieName, "1", 1);
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Modal,
				content: (
					<div className="pop vnpop">
						<div className="vninfopop active">
							<div className="vninfopop-inner">
								<img
									src={`https://banner.0814media.net/desktop/img/disclaimer-vnd-currency-popup-${showLang}.png`}
									alt="disclaimer-vnd-popUp"
								/>
								<button
									className="popgoto"
									onClick={() => {
										closePopBox();
										openNextPopUp();
									}}
								>
									{/* 這裡只有 vn en 語系 故不用i18n  */}
									JoinNow
								</button>
								<img
									onClick={() => {
										closePopBox();
										openNextPopUp();
									}}
									src="https://banner.0814media.net/desktop/img/promosBackPopup/delet.png"
									alt="close"
									className="closepop"
								/>
							</div>
						</div>
					</div>
				)
			});
		};

		const displayBigWinProfitPopup = async () => {
			const cookieName = `BigWinProfit${userInfo.userName}`;

			if (
				userInfo.isLogin &&
				readCookie(cookieName) !== "1" &&
				userInfo.currencyId === defCurrencyList.IDR
			) {
				try {
					const {
						data: { data: bigWinData }
					} = await api_bigWin_GetPopUpDataList();

					// 該userName回傳null表示不顯示彈窗
					if (bigWinData.userName !== null) {
						setCookie(cookieName, "1", 1);
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.Modal,
							content: (
								<div className="bigwin">
									<div
										className={`bigwinpop active ${userInfo.langId}`}
									>
										<div className="bigwinpop-item">
											<div className="bigwinpop-img" />
											<div className="bigwinpop-text">
												<div className="name">
													{bigWinData?.userName ??
														"-"}
												</div>
												<button className="vender">
													{bigWinData?.gameName ??
														"-"}
												</button>
											</div>
											<div className="bigwinpop-number">
												{t(
													`Currency_${userInfo.currencyId}`
												)}{" "}
												{number_format(
													bigWinData?.amount ?? 0
												)}
											</div>
											<img
												className="money"
												src={`${bannerImgUrl}/desktop/img/4.0/money.gif`}
												alt=""
											/>
											<img
												className="money-two"
												src={`${bannerImgUrl}/desktop/img/4.0/money.gif`}
												alt=""
											/>
											<img
												src={`${bannerImgUrl}/desktop/img/promosBackPopup/delet.png`}
												alt=""
												className="closepop"
												onClick={closePopBox}
											/>
										</div>
									</div>
								</div>
							)
						});
					}
				} catch (error) {
					errorPopBox(error);
				}
			}
		};

		const popUpStack = [
			displayDepositPopup,
			displaySponsorshipPopup,
			displayPromotionPopup,
			disclaimerForVnd,
			displayBigWinProfitPopup
		];

		const openNextPopUp = () => {
			if (popUpStack.length) {
				popUpStack.pop()();
			} else {
				setPopBox({ isOpen: false });
			}
		};
		!userInfo.isResetPwd && openNextPopUp();
	}, [userInfo.isLogin, userInfo.accountName, setPopBox]);

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
								setPopBox({ isOpen: false });
							}}
						>
							{t("lbl_Close")}
						</button>
					</div>
				)
			});
		}
	}, []);

	return (
		<main>
			<Marquee />
			<SwipperBanner
				ImgFolder={[defBannerType.Promotions]}
				className="homebanner"
			/>
			{/* 未啟用 */}
			{/* <TeachingBar /> */}
			<WelcomeInfo handleGameClick={handleEntryClick} />
			<PromoList userInfo={userInfo} />
			<HotMatch handleGameClick={handleEntryClick} />
			<LiveCasino handleGameClick={handleEntryClick} />
			<HotGame />
			<AppDownload />
			<HonorablePartner />
			<OfficialPartner />

			{/* {userInfo.isLogin && <RecentlyViewedGameList />} */}
			{/* <div className="newsVideo"> */}
			{/*	<HomeNews t={t} userInfo={userInfo} /> */}

			{/*	<LiveCasino /> */}
			{/* </div> */}

			{/* 新版本用不到，但有機率市場會想要回來 */}
			{/* <SideBarQuickLink /> */}
			{/* <QuickdownloadLink t={t} /> */}

			{/* 僅限過年期間不顯示 */}
			{!isDateRange(angPaoEventPeriod) && (
				<LuckyWheelLink
					langId={userInfo.langId}
					currencyId={userInfo.currencyId}
				/>
			)}

			{/* 僅限過年期間顯示且只支援部分語系 */}
			{isDateRange(angPaoEventPeriod) &&
				angpaoAllowedCurrencies.includes(userInfo?.currencyId) && (
					<AngpaoFloatLink />
				)}

			<MysteryBoxLink
				to={`/${userInfo.langId}/${path.mysteryBox.root}`}
			/>

			<LiveStreamingLink />
		</main>
	);
};

export default IndexPage;
