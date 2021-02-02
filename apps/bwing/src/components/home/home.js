import React, { useEffect, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "gatsby";
import { userInfoContext, popBoxContext } from "../common/context";
import { defPopBoxType } from "../common/defPopBoxType";
import { setCookie, readCookie } from "../common/common";
import { api_account_GetWalletInfo } from "../../service/api/account";
import { defaultLang } from "../../i18n/config";

import Marquee from "./marquee";
import EventSwipper from "./eventSwipper";
import SwipperBanner from "../common/swipperBanner";
import PromoGameList from "./promoGameList";
import TandC from "../../service/t_and_c";
import SideBarQuickLink from "./sideBarQuickLink";
import path from "../../router";

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.isLogin && userInfo.userName) {
			const cookieName = `balanceHint${userInfo.userName}`;
			let showDepositHint = false;
			if (readCookie(cookieName) !== "1") {
				setCookie(cookieName, "1", 1);
				showDepositHint = true;
			}

			if (showDepositHint) {
				api_account_GetWalletInfo().then(res => {
					if (res.data.errorCode === 0 && isMountedRef.current) {
						const tpWallets = res.data.data.tpWallets?.map(tp => {
							return {
								tpId: tp.tpId,
								balance: tp.balance
							};
						});

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
		}
	}, [userInfo.isLogin, userInfo.userName, setPopBox]);

	// const getDepositWithdrawImage = () => {
	// 	if (userInfo.langId === "en") {
	// 		return require(`../../styles/img/D&W.png"`);
	// 	} else {
	// 		return require(`../../styles/img/D&W_vn.png"`);
	// 	}
	// };

	return (
		<>
			{/* new year style ↓ */}
			<div className="newyear">
				<section className="flowerArea">
					<div className="allstars">
						<div className="star1" />
						<div className="star2" />
						<div className="star3" />
						<div className="star4" />
						<div className="star5" />
						<div className="star6" />
						<div className="star7" />
						<div className="star8" />
						<div className="star9" />
						<div className="star10" />
						<div className="star11" />
						<div className="star12" />
						<div className="star13" />
						<div className="star14" />
						<div className="star15" />
						<div className="star16" />
						<div className="star17" />
						<div className="star18" />
						<div className="star19" />
						<div className="star20" />
					</div>
				</section>
				<div className="newyearLeft">
					<div className="line" />
					<div className="lantern" />
					<div className="lantern" />
				</div>
				<div className="newyearLeft newyearRight">
					<div className="line" />
					<div className="lantern" />
					<div className="lantern" />
				</div>
				{/* <a href="" className="money">
					<div className="box" />
					<div className="l" />
					<div className="l" />
					<div className="l" />
					<div className="l" />
					<div className="l" />
				</a> */}
				<div className="cow" />
			</div>
			{/* new year style ↑ */}
			<main>
				{/* new year style ↓ */}
				<div className="newyearBg">
					<div className="pillarL" />
					<div className="pillarL pillarR" />
				</div>
				{/* new year style ↑ */}
				<SwipperBanner ImgFolder="Promotion" filterHideInHome={true} />
				<Marquee />
				<section>
					<EventSwipper langId={userInfo.langId} />
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
				<SideBarQuickLink />
			</main>
		</>
	);
};

const UserGuide = ({ t, langId }) => {
	const { userInfo } = useContext(userInfoContext);
	return (
		<ul>
			<li className="icon icon-deposit1">
				<Link to={`/${userInfo.langId}/${path.howToDeposit.root}`}>
					{t("lbl_HowToDepoist")}
				</Link>
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
		</ul>
	);
};
