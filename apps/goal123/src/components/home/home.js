import React, { useEffect, useRef, useContext, useState } from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import moment from "moment/moment";
import { useTranslation } from "react-i18next";
import { isDateRange } from "@ailab-desktop/common";
import { useLazyGetPopUpPromotionQuery } from "@ailab-desktop/service";
import {
	userInfoContext,
	popBoxContext,
	isRootContext,
	maintainListContext
} from "../common/context";
import { defPopBoxType } from "../common/popBox";
import usePopBox from "../hook/usePopBox";
import { defBannerType } from "../../service/api/site";
import {
	setCookie,
	readCookie,
	deleteCookie,
	number_format
} from "../common/common";
import { api_account_GetWalletInfo } from "../../service/api/account";
import { api_events_GetLeaderboardList } from "../../service/api/events";
import { api_liveStreaming_GetDataList } from "../../service/api/liveStreaming";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import path from "../../router";
import config from "../../config";
import { BannerSwipper } from "../common/customSwipper";
import EventSwipper from "./components/eventSwipper";
import Marquee from "./components/marquee";
import LiveCasinoSwipper from "./components/liveCasinoSwipper";
import Jackpot from "./components/jackpot";
import HotGameList from "./components/hotGameList";
import News from "./components/news";
import WinnerBoard from "./winnerBoard";
import MysteryBoxLink from "./mysteryBoxLink";
import SideBarQuickLink from "./sideBarQuickLink";
import QuickdownloadLink from "./quickdownloadLink";
import { defTpGameType } from "../../datas/productList";
import LuckyWheelLink from "../luckyWheel/luckyWheel.link";
import { defMenuLinks } from "../layout/header.menu.def";
import RecentlyViewedGameList from "./components/recentlyViewedGameList";
import { defDeviceType } from "../../service/api/base";
import { eventPerios } from "../../datas/eventDef";
import DragonEgg from "../dragonEgg/homeLink";
import LiveStreamingLink from "./liveStreaming";

const Home = ({ productTpIds }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox, closePopBox } = usePopBox();
	const isMountedRef = useRef(null);
	const { setIsRoot } = useContext(isRootContext);
	const [winnerList, setWinnerList] = useState([]);
	const [displayVgaming, setDisplayVgaming] = useState(true);
	const [displayLiveStreaming, setDisplayLiveStreaming] = useState(false);
	const [liveStreamingList, setLiveStreamingList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const { allMaintainList } = useContext(maintainListContext);

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
		getTopWinnners();
	}, []);

	useEffect(() => {
		const displayAnnouncePopup = () => {
			const cookieOfficialAnnounce = `OfficialAnnounce_cookie`;
			const isShowOfficialAnnouncePopBox =
				readCookie(cookieOfficialAnnounce) !== "1";

			if (userInfo.isLogin === false && isShowOfficialAnnouncePopBox) {
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
						if (isMountedRef.current) {
							errorPopBox(null, null, openNextPopUp);
						}
					}
				);
			} else {
				openNextPopUp();
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
											}}>
											{t("lbl_Promotion_ClaimNow")}
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

		const popUpStack = [
			displayDepositPopup,
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
								setPopBox({ isOpen: false });
							}}>
							{t("lbl_Close")}
						</button>
					</div>
				)
			});
		}
	}, []);

	useEffect(() => {
		const getLiveStreamingList = async () => {
			setIsLoading(true);
			try {
				const {
					data: { data: resultList }
				} = await api_liveStreaming_GetDataList({
					langId: userInfo.langId,
					currencyId: 51
				});
				if (resultList.length > 0) {
					setDisplayLiveStreaming(true);
					// 根據開始時間+2hr判斷是否過期,並取前3項
					const filterList = resultList
						.filter(({ battleTime }) =>
							moment(battleTime).add(2, "hours").isAfter(moment())
						)
						.slice(0, 3);

					setLiveStreamingList(filterList);
				}
				setIsLoading(false);
			} catch (error) {
				errorPopBox(error);
				setIsLoading(false);
			}
		};
		getLiveStreamingList();
	}, [userInfo.isLogin, userInfo.isLogin]);

	const clickItem = ({ tpId, gameId, tpGameType }) => {
		const isInMaintain = allMaintainList?.some(
			mt =>
				mt.tpId === tpId &&
				(mt.tpGameType === tpGameType ||
					mt.tpGameType === defTpGameType.All)
		);

		const loginCallback = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		if (isInMaintain) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.UnderMaintain,
				clickClose: closePopBox
			});
		} else {
			SET_ENTER_PAGE({
				isLogin: userInfo.isLogin,
				langId: userInfo.langId,
				tpId,
				gameId,
				loginCallback,
				openInBlank: true,
				tpGameType
			});
		}
	};

	const getTopWinnners = () => {
		const payload = {
			lBCategoryId: 0,
			TopNum: 10,
			BeforeDays: 0,
			EventCode: "202104"
		};

		api_events_GetLeaderboardList(payload).then(
			res => {
				if (!isMountedRef.current) return;
				if (res.data.errorCode === 0) {
					setWinnerList(res.data.data);
				} else {
					errorPopBox(
						res.data.message || "error",
						res.data.errorCode
					);
				}
			},
			() => {
				// if (!isMountedRef.current) return;
				// errorPopBox();
			}
		);
	};

	return (
		<>
			<main id="main" className="home">
				<div className="home-banner ">
					<div className="swiper-container">
						<div className="swiper-wrapper">
							<a className="swiper-slide">
								<img src="https://goal123.org/Dec/Goal123-Direpay-Crypto-Cashback-EN.jpg" />
							</a>
							<a className="swiper-slide">
								<img src="https://goal123imgs.0814media.net/PRD/BannerManagement/24dac1a4-bdb7-4b45-808e-c0d981c6dc55.jpg" />
							</a>
							<a className="swiper-slide">
								<img src="https://goal123.org/Dec/Goal123-Direpay-Crypto-Cashback-EN.jpg" />
							</a>
							<a className="swiper-slide">
								<img src="https://goal123imgs.0814media.net/PRD/BannerManagement/24dac1a4-bdb7-4b45-808e-c0d981c6dc55.jpg" />
							</a>
							<div className="swiper-pagination" />
						</div>
					</div>

					{/* <BannerSwipper
						ImgFolder={[defBannerType.Promotions]}
						withBtn={false}
						withPagination={true}
						config={{
							effect: "fade",
							autoplay: {
								delay: 5000,
								disableOnInteraction: false
							}
						}}
					/> */}
				</div>

				{/* <EventSwipper langId={userInfo.langId} /> */}

				{/* <Marquee /> */}

				<div id="Marquee">
					<div className="home-marquee">
						<i className="icon-speaker" />
						<div className="marquee-run">
							<a href="#">
								IMPORTANT!!! Local Transfer Bank Account
								Replacement!!!
							</a>
							<a href="#">
								本公司希望借此机会提醒各位尊贵的客户，恳请频繁重置您的密码以确保您的帐户安全。
							</a>
							<a href="#">
								本公司希望借此机会提醒各位尊贵的客户，恳请频繁重置您的密码以确保您的帐户安全。
							</a>
						</div>
						<button
							className="btn-info"
							onClick={() => alert("Button clicked!")}>
							More
						</button>
					</div>
				</div>

				<div className="home-wrapper">
					<section>
						<div className="indexliveCasinoList topten">
							<LiveCasinoSwipper
								t={t}
								clickItem={clickItem}
								langId={userInfo.langId}
								productTpIds={productTpIds}
							/>
							<Jackpot t={t} userInfo={userInfo} />
							<WinnerBoard
								t={t}
								number_format={number_format}
								winnerList={winnerList}
							/>
						</div>

						<HotGameList
							t={t}
							langId={userInfo.langId}
							clickItem={clickItem}
							navigate={navigate}
							allMaintainList={allMaintainList}
						/>
						{userInfo.isLogin && <RecentlyViewedGameList />}
						<div className="indexInfo">
							<InfoCenter t={t} langId={userInfo.langId} />

							<News t={t} langId={userInfo.langId} />
						</div>

						{/* <PlatformSection
					langId={userInfo.langId}
					isLogin={userInfo.isLogin}
					productTpIds={productTpIds}
				/> */}
					</section>
					{/* vgaming Home 點擊入口 */}
					{displayVgaming && !displayLiveStreaming && !isLoading && (
						<div className="eventLink vgaming">
							<button
								className="icon icon-close"
								onClick={() => setDisplayVgaming(false)}
							/>

							<img
								onClick={() =>
									clickItem(
										// vgaming
										defMenuLinks(
											userInfo.langId
										)?.games?.subMenu.find(
											game => game.gameId === 171
										).parameter
									)
								}
								alt="vgaming-link"
								src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/vgaming.gif`}
							/>
						</div>
					)}

					{/* 僅限過年期間不顯示 */}
					{!isDateRange(eventPerios.dragonEgg) && (
						<LuckyWheelLink langId={userInfo.langId} />
					)}

					{/* 僅限過年期間顯示 */}
					{isDateRange(eventPerios.dragonEgg) && <DragonEgg />}

					<MysteryBoxLink
						to={`/${userInfo.langId}/${path.mysteryBox.root}`}
						langId={userInfo.langId}
					/>

					<SideBarQuickLink />

					<QuickdownloadLink />

					<LiveStreamingLink
						liveStreamingList={liveStreamingList}
						displayLiveStreaming={displayLiveStreaming}
						setDisplayLiveStreaming={setDisplayLiveStreaming}
					/>
				</div>
			</main>
		</>
	);
};

Home.defaultProps = {
	productTpIds: []
};

Home.propTypes = {
	productTpIds: PropTypes.arrayOf(PropTypes.number)
};

export default Home;

const InfoCenter = ({ t, langId }) => (
	<div className="infoCenter">
		<div>
			<div className="title">
				<i className="icon icon-infocenter" />
				{t("lbl_InfoCenter")}
			</div>
			<div className="infoGroup">
				<a
					href={`${config.t_and_cURL}/Static/${langId}/HowToDeposit.html`}
					rel="noreferrer"
					target="_blank">
					<i className="icon icon-deposit2" />
					{t("lbl_HowToDepoist")}
				</a>
				<a
					href={`${config.t_and_cURL}/Static/${langId}/HowToWithdrawal.html`}
					rel="noreferrer"
					target="_blank">
					<i className="icon icon-withdrawal2" />
					{t("lbl_HowToWithdraw")}
				</a>
				<a
					href={`${config.t_and_cURL}/Static/${langId}/FAQ.html`}
					rel="noreferrer"
					target="_blank">
					<i className="icon icon-support" />
					{t("lbl_FAQ")}
				</a>
			</div>
		</div>
	</div>
);

InfoCenter.propTypes = {
	t: PropTypes.func.isRequired,
	langId: PropTypes.string.isRequired
};
