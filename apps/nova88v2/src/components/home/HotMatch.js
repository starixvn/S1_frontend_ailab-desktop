import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import EventSwipper from "./eventSwipper";
import { defMenuLinks } from "../header/header.menu.def";

const HotMatch = ({ handleGameClick }) => {
	const { t } = useTranslation();
	const sportMenu = defMenuLinks.sports.subMenu;
	const soccerItem = sportMenu.find(({ keyName }) => keyName === "soccer");
	const basketBallItem = sportMenu.find(
		({ keyName }) => keyName === "basketball"
	);

	const badmintonSportItem = sportMenu.find(
		({ keyName }) => keyName === "badminton"
	);

	return (
		<div className="hotmatch">
			<div className="hotmatch-wrapper">
				<div className="hotmatch-top" style={{ zIndex: -1 }}>
					<img
						src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/hotmatch-logo.png`}
						alt=""
					/>
					<div>{t("lbl_Sports").toUpperCase()}</div>
				</div>
				<EventSwipper />
				<div className="hotsports">
					<div className="hotsports-item">
						<img
							src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/home-sports-soccer.png`}
							alt="sports-soccer"
						/>
						<button
							className="all-btn"
							onClick={() => {
								if (soccerItem) {
									handleGameClick(soccerItem);
								}
							}}
						>
							{t("lbl_BetNow")}
						</button>
					</div>
					<div className="hotsports-item">
						<img
							src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/home-sports-badminton.png`}
							alt="sports-badminton"
						/>
						<button
							className="all-btn"
							onClick={() => {
								if (badmintonSportItem) {
									handleGameClick(badmintonSportItem);
								}
							}}
						>
							{t("lbl_BetNow")}
						</button>
					</div>
					<div className="hotsports-item">
						<img
							src={`${process.env.REACT_APP_BANNER_URL}/desktop/img/4.0/home-sports-basketball.png`}
							alt="sports-basketball"
						/>
						<button
							className="all-btn"
							onClick={() => {
								if (basketBallItem) {
									handleGameClick(basketBallItem);
								}
							}}
						>
							{t("lbl_BetNow")}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HotMatch;

HotMatch.propTypes = {
	handleGameClick: PropTypes.func.isRequired
};
