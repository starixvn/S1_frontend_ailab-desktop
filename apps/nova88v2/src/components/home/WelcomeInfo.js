import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { popBoxContext, userInfoContext } from "../common/context";
import path from "../../router";
import { defMenuType } from "../header/header.menu.def";
import productList from "../../datas/productList";
import defPopBoxType from "../common/defPopBoxType";
import { getAffCurrencyLink } from "../footer/About";

const WelcomeInfo = ({ handleGameClick }) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const { langId, currencyId } = userInfo ?? {};

	const showLogin = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Login
		});
	};

	const sportsBook = {
		path: path.sports.root,
		menuType: defMenuType.entPage,
		...productList.sports,
		needLogin: true
	};

	return (
		<div className="welcomeinfo">
			<div className="welcomeinfo-content join">
				{userInfo?.isLogin ? (
					<>
						<img
							src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/welcome-affiliate.png`}
							alt=""
						/>
						<div className="welcomeinfo-content-text">
							<div>{t("lbl_Affiliates")}</div>
							<span>{t("lbl_Affiliate_Program_desc")}</span>
						</div>
						<a
							href={getAffCurrencyLink(currencyId, langId)}
							className="welcome-btn"
							target="_blank"
							rel="noreferrer"
						>
							{t("lbl_More_Info")}
						</a>
					</>
				) : (
					<>
						<img
							src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/welcome-join.png`}
							alt=""
						/>
						<div className="welcomeinfo-content-text">
							<div>{t("lbl_JoinNow")}</div>
							<span>{t("Label_Home_JoinDescription")}</span>
						</div>
						<Link
							to={`/${langId}/${path.join.root}`}
							className="welcome-btn"
						>
							{t("lbl_More_Info")}
						</Link>
					</>
				)}
			</div>
			<div className="welcomeinfo-content winning">
				<img
					src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/welcome-winning.png`}
					alt=""
				/>
				<div className="welcomeinfo-content-text">
					<div>{t("Label_Home_StartWinning")}</div>
					<span>{t("Label_Home_StartWinningDescription")}</span>
				</div>
				<button
					className="welcome-btn"
					onClick={() => handleGameClick(sportsBook)}
				>
					{t("lbl_More_Info")}
				</button>
			</div>
			<div className="welcomeinfo-content reward">
				<img
					src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/welcome-vip.png`}
					alt=""
				/>
				<div className="welcomeinfo-content-text">
					<div>{t("Label_Home_GetReward")}</div>
					<span>{t("Label_Home_GetRewardDescription")}</span>
				</div>
				<Link
					to={`/${langId}/${path.promotion.root}`}
					className="welcome-btn"
				>
					{t("lbl_More_Info")}
				</Link>
			</div>
			<div className="welcomeinfo-content referral">
				<img
					src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/welcome-referral.png`}
					alt=""
				/>
				<div className="welcomeinfo-content-text">
					<div>{t("Label_Home_SimpleReferral")}</div>
					<span>{t("Label_Home_SimpleReferralDescription")}</span>
				</div>
				{userInfo.isLogin ? (
					<Link
						to={`/${langId}/${path.referral.root}`}
						className="welcome-btn"
					>
						{t("lbl_More_Info")}
					</Link>
				) : (
					<button className="welcome-btn" onClick={showLogin}>
						{t("lbl_More_Info")}
					</button>
				)}
			</div>
		</div>
	);
};

export default WelcomeInfo;

WelcomeInfo.propTypes = {
	handleGameClick: PropTypes.func.isRequired
};
