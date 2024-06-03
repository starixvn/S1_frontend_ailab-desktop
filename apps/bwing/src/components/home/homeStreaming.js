import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import path from "../../router";

const HomeStreaming = ({ league, home, away, homeScore, awayScore }) => {
	const { t } = useTranslation();

	return (
		<div
			className="home-livesports-item"
			onClick={() => navigate(`/${path.streaming.root}`)}>
			<div className="home-livesports-league">{league}</div>
			<div className="home-livesports-content">
				<div className="home-livesports-team left">
					<div>{t("LBL_STREAMING_HOME").toUpperCase()}</div>
					<div className="name">{home}</div>
				</div>
				<div className="home-livesports-score">
					<span> {homeScore ?? 0}</span>
					<span> {awayScore ?? 0} </span>
				</div>
				<div className="home-livesports-team right">
					<div>{t("LBL_STREAMING_AWAY").toUpperCase()}</div>
					<div className="name">{away}</div>
				</div>
			</div>
		</div>
	);
};
HomeStreaming.defaultProps = {
	league: "",
	home: "",
	away: "",
	homeScore: null,
	awayScore: null
};

HomeStreaming.propTypes = {
	league: PropTypes.string,
	home: PropTypes.string,
	away: PropTypes.string,
	homeScore: PropTypes.number,
	awayScore: PropTypes.number
};

export default HomeStreaming;
