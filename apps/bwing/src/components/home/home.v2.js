import React, { useEffect, useRef, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, navigate } from "gatsby";
import i18next from "i18next";
import { isDateRange } from "@ailab-desktop/common";
import { useLazyGetPopUpPromotionQuery } from "@ailab-desktop/service";
import { AngpaoFloatLink } from "@ailab-desktop/components";
import { api_events_GetLeaderboardList } from "../../service/api/events";
import path from "../../router";
import {
	userInfoContext,
	isRootContext,
	maintainListContext
} from "../common/context";
import {
	number_format,
	readCookie,
	setCookie,
	deleteCookie
} from "../common/common";
import { api_account_GetWalletInfo } from "../../service/api/account";
import { defPopBoxType } from "../common/defPopBoxType";
import usePopBox from "../hook/usePopBox";
import MysteryBoxLink from "./mysteryBoxLink";
import LuckyWheelLink from "../luckyWheel/luckyWheel.link";
import SwipperBanner from "../common/swipperBanner";
import Marquee from "./marquee";
import EventSwipper from "./eventSwipper";
import WinnerBoard from "./winnerBoard";
import Jackpot from "./jackpot";
import MainGame from "./maingame";
import Streaming from "./streaming";
import HotGameList from "./hotGameList";
import TandC from "../../service/t_and_c";
import SideBarQuickLink from "./sideBarQuickLink";
import AppDownload from "./appDownload";
import { defBannerType } from "../../service/api/site";
import useGetVideo from "../streaming/hook";
import { bannerImgUrl } from "../../config";
import { defEventPeriod } from "../common/eventIcon";
import Fireworks from "../specialEffects/fireworks";
import { defEventPeriod as NewYearEventPeriod } from "../common/popbox.newYear";
import { angPaoEventPeriod } from "../../pages/angpao";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import { defMenuLinks } from "../layout/header.menu.def";
import RecentlyViewedGameList from "./recentlyViewedGameList";
import { defDeviceType } from "../../service/api/base";

function Home() {
	const { t } = useTranslation();

	const { setPopBox, errorPopBox, closePopBox } = usePopBox();

	const isMountedRef = useRef(null);

	const { userInfo } = useContext(userInfoContext);
	const { setIsRoot } = useContext(isRootContext);
	const { allMaintainList } = useContext(maintainListContext);

	// * 如果 popUpBonusCode 有值需彈出彈窗提醒有該優惠活動可以使用
	const [getPopUpPromotion] = useLazyGetPopUpPromotionQuery();

	const { videoList } = useGetVideo({
		langId: userInfo.langId,
		isMounted: isMountedRef.current
	});

	const [winnerList, setWinnerList] = useState([]);
	const [displayVgaming, setDisplayVgaming] = useState(true);

	const isEvent = isDateRange(
		defEventPeriod.newYear.start,
		defEventPeriod.newYear.end
	);

	const openLoginPopBox = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Login
		});
	};

	const mainGameNavigate = ({ tpId, gameId, isInMaintain }) => {
		if (isInMaintain) return;

		SET_ENTER_PAGE({
			isLogin: userInfo.isLogin,
			langId: userInfo.langId,
			tpId,
			gameId,
			loginCallback: openLoginPopBox
		});
	};

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
				!userInfo.userName ||
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
							<div id="popup" className="active">
								<div className="pop promosbackpopup">
									<div className="promosback active">
										<div className="promosback-pop">
											<img
												src={`${
													process.env
														.REACT_APP_BANNER_URL
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
												{t(
													"promotion.lbl_promo_claim_now"
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
	}, [userInfo.isLogin, setPopBox, userInfo.langId, userInfo.userName]);

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
							}}
						>
							{t("lbl_Close")}
						</button>
					</div>
				)
			});
		}
	}, []);

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
				if (!isMountedRef.current) return;
				errorPopBox();
			}
		);
	};

	return (
		<>
			{isEvent && <Fireworks />}
			<MysteryBoxLink
				to={`/${userInfo.langId}/${path.mysteryBox.root}`}
				langId={userInfo.langId}
			/>

			<main className="home">
				<SwipperBanner ImgFolder={[defBannerType.Promotions]} />

				<Marquee />

				<section>
					<div className="offers">
						<EventSwipper langId={userInfo.langId} />
					</div>

					<div className="area2">
						<Jackpot t={t} userInfo={userInfo} />

						<WinnerBoard
							t={t}
							number_format={number_format}
							winnerList={winnerList}
						/>

						<Streaming
							videoList={videoList}
							t={t}
							langId={userInfo.langId}
						/>
					</div>

					<MainGame
						t={t}
						userInfo={userInfo}
						setPopBox={setPopBox}
						allMaintainList={allMaintainList}
					/>

					<HotGameList
						t={t}
						userInfo={userInfo}
						setPopBox={setPopBox}
						allMaintainList={allMaintainList}
					/>
					{userInfo.isLogin && <RecentlyViewedGameList />}
				</section>

				<section className={isEvent ? "newyear" : ""}>
					<div className="guide">
						<div className="guidelist">
							<div className="title">{t("lbl_UserGuide")}</div>
							<ul>
								<li>
									<div className="icon" />
									<Link
										to={`${bannerImgUrl}/Static/images/How_To_Deposit.mp4`}
										target="_blank"
									>
										{t("lbl_HowToDepoist")}
									</Link>
								</li>
								<li>
									<div className="icon withdrawal" />
									<Link
										to={`/${userInfo.langId}/${path.howToWithdraw.root}`}
									>
										{t("lbl_HowToWithdraw")}
									</Link>
								</li>
								<li>
									<div className="icon play" />
									<Link
										to={`/${userInfo.langId}/${path.howToPlay.root}`}
									>
										{t("lbl_HowToPlay")}
									</Link>
								</li>
								<li>
									<div className="icon faq" />
									<a href={TandC(userInfo.langId).FAQ}>
										{t("lbl_FAQ")}
									</a>
								</li>
							</ul>
						</div>
						<div className="exGroup">
							<div className="title">{t("lbl_Superiority")}</div>
							<div className="exGroupBox">
								<div className="left">
									<div className="ex">
										<img
											src={`${bannerImgUrl}/desktop/img/timeIcon.png`}
											alt="imgTimeIcon"
										/>
										<ul>
											<li>
												{t("lbl_ExcellentCustomerCare")}
											</li>
											<li>
												{t(
													"lbl_ExcellentCustomerCareDesc"
												)}
											</li>
										</ul>
									</div>
									<div className="ex">
										<img
											src={`${bannerImgUrl}/desktop/img/gameIcon.png`}
											alt="imgGameIcon"
										/>
										<ul>
											<li>{t("lbl_ExtensiveGames")}</li>
											<li>
												{t("lbl_ExtensiveGamesDesc")}
											</li>
										</ul>
									</div>
								</div>
								<div className="right">
									<div className="ex">
										<h1>{t("lbl_Deposit_Average")}</h1>
										<p>01</p>
										<h1>
											{String(
												t("lbl_Minutes")
											).toUpperCase()}
										</h1>
									</div>
									<div className="ex">
										<h1>{t("lbl_Withdrawal_Average")}</h1>
										<p>05</p>
										<h1>
											{String(
												t("lbl_Minutes")
											).toUpperCase()}
										</h1>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
			{/* vgaming Home 點擊入口 */}
			{displayVgaming && (
				<div className="eventLink vgaming">
					<button
						style={{ zIndex: 50 }}
						className="icon icon-close"
						onClick={() => setDisplayVgaming(false)}
					/>
					<img
						src={`${bannerImgUrl}/desktop/img/vgaming.gif`}
						alt="vgaming-link"
						onClick={() =>
							mainGameNavigate(
								// vgaming
								defMenuLinks.games.subMenu.find(
									game => game.gameId === 171
								).parameter
							)
						}
					/>
				</div>
			)}

			{/* 僅限過年期間不顯示 */}
			{!isDateRange(angPaoEventPeriod) && (
				<LuckyWheelLink langId={userInfo.langId} />
			)}

			{/* 僅限過年期間顯示且只支援部分語系 */}
			{isDateRange(angPaoEventPeriod) &&
				["en", "vn"].includes(i18next.language) && <AngpaoFloatLink />}

			<SideBarQuickLink />

			<AppDownload langId={userInfo.langId} />
		</>
	);
}

export default Home;
