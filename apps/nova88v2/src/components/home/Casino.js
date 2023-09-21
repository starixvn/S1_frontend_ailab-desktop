import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import path from "../../router";
import { defMenuLinks } from "../header/header.menu.def";
import { useAuth } from "../hook";
import { defCurrencyList } from "../common/common";

const LiveCasino = ({ handleGameClick }) => {
	const { t } = useTranslation();
	const { userInfo } = useAuth();
	const { checkBeforeLogin, subMenu: casinoMenu } = defMenuLinks.casino;
	const ppItem = casinoMenu.find(({ keyName }) => keyName === "casino_PP");
	const aeItem = casinoMenu.find(({ keyName }) => keyName === "casino_AE");
	const evoItem = casinoMenu.find(({ keyName }) => keyName === "casino_EVO");
	const dgItem = casinoMenu.find(({ keyName }) => keyName === "casino_DG");
	const sgItem = casinoMenu.find(({ keyName }) => keyName === "casino_SA");

	return (
		<div className="mainlivecasino">
			<div className="maintitle">
				{t("lbl_Promotion_Link_3")}
				<Link to={path.liveCasino.root} style={{ zIndex: 1 }}>
					{`${t("lbl_More").toUpperCase()}`}
				</Link>
			</div>
			{userInfo.currencyId === defCurrencyList.INR ? (
				<div className="livecasino-bn">
					<img
						src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/home-livecasino-sg-2.png`}
						alt="casino_SA"
					/>

					<button
						className="all-btn"
						onClick={() => {
							if (ppItem) {
								handleGameClick(sgItem, checkBeforeLogin);
							}
						}}>
						{t("lbl_PlayNow")}
					</button>
				</div>
			) : (
				<div className="livecasino-bn">
					<img
						src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/home-livecasino-pp.png`}
						alt="casino_PP"
					/>

					<button
						className="all-btn"
						onClick={() => {
							if (ppItem) {
								handleGameClick(ppItem, checkBeforeLogin);
							}
						}}>
						{t("lbl_PlayNow")}
					</button>
				</div>
			)}

			<div className="main-livecasino-item">
				<div className="hotlivecasino">
					<img
						src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/home-livecasino-sexy.png`}
						alt="casino_AE"
					/>
					<button
						className="all-btn"
						onClick={() => {
							if (aeItem) {
								handleGameClick(aeItem, checkBeforeLogin);
							}
						}}>
						{t("lbl_PlayNow")}
					</button>
				</div>
				<div className="hotlivecasino">
					<img
						src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/home-livecasino-evo.png`}
						alt="casino_EVO"
					/>
					<button
						className="all-btn"
						onClick={() => {
							if (evoItem) {
								handleGameClick(evoItem, checkBeforeLogin);
							}
						}}>
						{t("lbl_PlayNow")}
					</button>
				</div>
				{/* // * BDT幣別不支援 DG，改為開始 SG 產品 */}
				{userInfo.currencyId === defCurrencyList.BDT ? (
					<div className="hotlivecasino">
						<img
							src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/home-livecasino-sg.png`}
							alt="casino_DG"
						/>
						<button
							className="all-btn"
							onClick={() => {
								if (sgItem) {
									handleGameClick(sgItem, checkBeforeLogin);
								}
							}}>
							{t("lbl_PlayNow")}
						</button>
					</div>
				) : (
					<div className="hotlivecasino">
						<img
							src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/home-livecasino-dg.png`}
							alt="casino_DG"
						/>
						<button
							className="all-btn"
							onClick={() => {
								if (dgItem) {
									handleGameClick(dgItem, checkBeforeLogin);
								}
							}}>
							{t("lbl_PlayNow")}
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default LiveCasino;

LiveCasino.propTypes = {
	handleGameClick: PropTypes.func.isRequired
};
