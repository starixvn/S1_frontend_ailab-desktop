import React, { useEffect, useRef, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "gatsby";
import {
	userInfoContext,
	popBoxContext,
	isRootContext
} from "../common/context";
import { defPopBoxType } from "../common/defPopBoxType";
import usePopBox from "../hook/usePopBox";
import {
	setCookie,
	readCookie,
	isDateRange,
	number_format
} from "../common/common";
import { api_account_GetWalletInfo } from "../../service/api/account";
import { defBannerType } from "../../service/api/site";
import { api_events_GetLeaderboardListV2 } from "../../service/api/events";
import { defaultLang } from "../../i18n/config";
import Marquee from "./marquee";
import EventSwipper from "./eventSwipper";
import Jackpot from "./jackpot";
import SwipperBanner from "../common/swipperBanner";
import PromoGameList from "./promoGameList";
import TandC from "../../service/t_and_c";
import WinnerBoard from "./winnerBoard";
import SideBarQuickLink from "./sideBarQuickLink";

import AngpowLink from "./angpowLink";
import MysteryBoxLink from "./mysteryBoxLink";
import path from "../../router";

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox } = usePopBox();
	const { setIsRoot } = useContext(isRootContext);
	const isMountedRef = useRef(null);
	const [winnerList, setWinnerList] = useState([]);

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
		const ShowRankingPopup = () => {
			if (
				userInfo.isLogin === false &&
				isDateRange(null, "2021/05/18 23:59:59")
			) {
				setPopBox({
					isOpen: true,
					popBoxType: defPopBoxType.RankingWinner
				});
			}
		};

		const cookieOfficialAnnounce = `OfficialAnnounce_cookie`;
		const isShowOfficialAnnouncePopBox =
			readCookie(cookieOfficialAnnounce) !== "1";

		if (userInfo.isLogin === false && isShowOfficialAnnouncePopBox) {
			const clickCloseOfficialAnnounce = () => {
				setPopBox({ isOpen: false });
				ShowRankingPopup();
			};

			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.OfficialAnnounce,
				onClickClose: () => clickCloseOfficialAnnounce()
			});
			setCookie(cookieOfficialAnnounce, "1", 1);
		}

		if (!isShowOfficialAnnouncePopBox) {
			ShowRankingPopup();
		}
	}, [userInfo.isLogin, setPopBox, userInfo.langId]);

	useEffect(() => {
		if (userInfo.isLogin && userInfo.userName) {
			const showDepositPopBox = () => {
				const cookieName = `balanceHint${userInfo.userName}`;
				let showDepositHint = false;
				if (readCookie(cookieName) !== "1") {
					setCookie(cookieName, "1", 1);
					showDepositHint = true;
				}

				if (showDepositHint) {
					api_account_GetWalletInfo().then(res => {
						if (res.data.errorCode === 0 && isMountedRef.current) {
							const tpWallets = res.data.data.tpWallets?.map(
								tp => {
									return {
										tpId: tp.tpId,
										balance: tp.balance
									};
								}
							);

							const hasBalance =
								res.data.data?.balance ||
								tpWallets?.filter(tp => {
									return tp.balance > 0;
								}).length >= 1;

							if (!hasBalance && showDepositHint) {
								setPopBox({
									isOpen: true,
									popBoxType: defPopBoxType.DepositHint
								});
							}
						}
					});
				}
			};

			showDepositPopBox();
		}
	}, [userInfo.isLogin, userInfo.langId, userInfo.userName, setPopBox]);

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

			<main>
				<SwipperBanner ImgFolder={[defBannerType.Promotions]} />
				<Marquee />
				<section>
					<div className="offers">
						<EventSwipper langId={userInfo.langId} />
					</div>
					<div className="offers">
						<WinnerBoard
							t={t}
							number_format={number_format}
							winnerList={winnerList}
						/>
						<span className="straightBorder" />
						<Jackpot t={t} userInfo={userInfo} />
					</div>
				</section>
				<section>
					<PromoGameList t={t} userInfo={userInfo} />
				</section>
				<section>
					<div className="guide">
						<div className="guidelist">
							<span className="title">{t("lbl_UserGuide")}</span>
							<UserGuide t={t} langId={userInfo.langId} />
						</div>
						<div className="exGroup">
							<div className="ex">
								<img
									src={require("../../styles/img/24hr.png")}
									alt="24/7 customer care service"
								/>
								<ul>
									<li className="title">
										{t("lbl_ExcellentCustomerCare")}
									</li>
									<li>
										{t("lbl_ExcellentCustomerCareDesc")}
									</li>
								</ul>
							</div>
							<div className="ex">
								<img
									src={require("../../styles/img/games.png")}
									alt="games"
								/>
								<ul>
									<li className="title">
										{t("lbl_ExtensiveGames")}
									</li>
									<li>{t("lbl_ExtensiveGamesDesc")}</li>
								</ul>
							</div>
						</div>

						<div>
							<img
								src={
									userInfo.langId === defaultLang
										? require("../../styles/img/D&W.png")
										: require(`../../styles/img/D&W_${userInfo.langId}.png`)
								}
								alt="deposit and withdrawal"
							/>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

const UserGuide = ({ t, langId }) => {
	const { setPopBox } = useContext(popBoxContext);
	const ClickClose = () => {
		setPopBox({ isOpen: false });
	};
	const openDepositGuide = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.DepositGuide,
			onClickClose: ClickClose
		});
	};

	const { userInfo } = useContext(userInfoContext);
	return (
		<ul>
			<li className="icon icon-deposit1">
				<button onClick={openDepositGuide}>
					{t("lbl_HowToDepoist")}
				</button>
			</li>
			<li className="icon icon-withdrawal1">
				<Link to={`/${userInfo.langId}/${path.howToWithdraw.root}`}>
					{t("lbl_HowToWithdraw")}
				</Link>
			</li>
			<li className="icon icon-play">
				<Link to={`/${userInfo.langId}/${path.howToPlay.root}`}>
					{t("lbl_HowToPlay")}
				</Link>
			</li>
			<li className="icon icon-FAQS">
				<a href={TandC(langId).FAQ}>{t("lbl_FAQ")}</a>
			</li>

			<SideBarQuickLink />
		</ul>
	);
};
