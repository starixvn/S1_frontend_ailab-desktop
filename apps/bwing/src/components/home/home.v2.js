import React, { useEffect, useRef, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "gatsby";
import { api_events_GetLeaderboardListV2 } from "../../service/api/events";
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
	isDateRange
} from "../common/common";
import { api_account_GetWalletInfo } from "../../service/api/account";
import { defPopBoxType } from "../common/defPopBoxType";
import usePopBox from "../hook/usePopBox";
import MysteryBoxLink from "./mysteryBoxLink";
import AngpowLink from "./angpowLink";
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

function Home() {
	const { t } = useTranslation();
	const { setPopBox, errorPopBox } = usePopBox();

	const isMountedRef = useRef(null);

	const { userInfo } = useContext(userInfoContext);
	const { setIsRoot } = useContext(isRootContext);
	const { allMaintainList } = useContext(maintainListContext);

	const { videoList } = useGetVideo({
		langId: userInfo.langId,
		isMounted: isMountedRef.current
	});

	const [winnerList, setWinnerList] = useState([]);
	const isEvent = isDateRange(
		defEventPeriod.newYear.start,
		defEventPeriod.newYear.end
	);

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

		const popUpStack = [
			displayDepositPopup,
			displayNewYearPopup,
			displayAnnouncePopup
		];

		const openNextPopUp = () => {
			if (popUpStack.length) {
				popUpStack.pop()();
			} else {
				setPopBox({ isOpen: false });
			}
		};

		openNextPopUp();
	}, [userInfo.isLogin, setPopBox, userInfo.langId, userInfo.userName]);

	const getTopWinnners = () => {
		const payload = {
			lBCategoryId: 0,
			TopNum: 10,
			BeforeDays: 0,
			EventCode: "202104"
		};

		api_events_GetLeaderboardListV2(payload).then(
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
			<div className="newyear">
				<AngpowLink
					to={`/${userInfo.langId}/${path.angpow.root}`}
					langId={userInfo.langId}
				/>
			</div>

			<LuckyWheelLink langId={userInfo.langId} />

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
				</section>

				<section className={isEvent ? "newyear" : ""}>
					<div className="guide">
						<div className="guidelist">
							<div className="title">{t("lbl_UserGuide")}</div>
							<ul>
								<li>
									<div className="icon" />
									<a
										onClick={() =>
											setPopBox({
												isOpen: true,
												popBoxType:
													defPopBoxType.DepositGuide,
												onClickClose: () =>
													setPopBox({ isOpen: false })
											})
										}>
										{t("lbl_HowToDepoist")}
									</a>
								</li>
								<li>
									<div className="icon withdrawal" />
									<Link
										to={`/${userInfo.langId}/${path.howToWithdraw.root}`}>
										{t("lbl_HowToWithdraw")}
									</Link>
								</li>
								<li>
									<div className="icon play" />
									<Link
										to={`/${userInfo.langId}/${path.howToPlay.root}`}>
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

			<SideBarQuickLink />

			<AppDownload langId={userInfo.langId} />
		</>
	);
}

export default Home;
