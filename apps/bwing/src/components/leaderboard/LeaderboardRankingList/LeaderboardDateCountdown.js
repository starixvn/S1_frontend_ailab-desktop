import React from "react";
import { useLeaderBoard } from "../Leaderboard-context";

/** 本月倒數 */
const LeaderboardDateCountdown = () => {
	const { t, timeLeft } = useLeaderBoard();
	const { days, hours, minutes, seconds } = timeLeft;

	return (
		<div className="countdown">
			<div className="countdown-item">
				<div className="title">{t("leaderboard_reamainingTime")}</div>
				<div className="countdown-time">
					<div className="list">
						<span>{days}</span>
						{t("leaderboard_day")}
					</div>
					<div className="list">
						<span>{hours}</span>
						{t("leaderboard_hours")}
					</div>
					<div className="list">
						<span>{minutes}</span>
						{t("leaderboard_minutes")}
					</div>
					<div className="list">
						<span>{seconds}</span>
						{t("leaderboard_seconds")}
					</div>
				</div>
			</div>
			<button className="btn-bet">{t("leaderboard_betNow")}</button>
		</div>
	);
};
/** 本月倒數 */
export default LeaderboardDateCountdown;
