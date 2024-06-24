import React from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import { useLeaderBoard } from "../Leaderboard-context";
import path from "../../../router";

/** 本月倒數 */
const LeaderboardDateCountdown = () => {
	const { t } = useTranslation();
	const { timeLeft, langId } = useLeaderBoard();
	const { days, hours, minutes, seconds } = timeLeft;

	return (
		<div className="countdown">
			<div className="countdown-item">
				<div className="title">{t("lbl_reamainingTime")}</div>
				<div className="countdown-time">
					<div className="list">
						<span>{days}</span>
						{t("lbl_day")}
					</div>
					<div className="list">
						<span>{hours}</span>
						{t("lbl_hours")}
					</div>
					<div className="list">
						<span>{minutes}</span>
						{t("lbl_minutes")}
					</div>
					<div className="list">
						<span>{seconds}</span>
						{t("lbl_seconds")}
					</div>
				</div>
			</div>
			<button
				onClick={() =>
					navigate(`/${langId}/${path.sports.root}/?game=Soccer`)
				}
				className="btn-bet"
			>
				{t("lbl_betNow")}
			</button>
		</div>
	);
};
/** 本月倒數 */
export default LeaderboardDateCountdown;
