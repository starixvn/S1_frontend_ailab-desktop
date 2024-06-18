import React from "react";
import LeaderBoardBanner from "./leaderBoardBanner";
import LeaderBoardReward from "./leaderBoardReward";
import LeaderBoardRanking from "./leaderBoardRanking";
import LeaderBoardInfoAndTerm from "./leaderBoardInfoAndTerm";

export default () => {
	return (
		<>
			<LeaderBoardBanner />

			<div className="leaderboard-wrapper">
				<LeaderBoardReward />
				<LeaderBoardRanking />
				<LeaderBoardInfoAndTerm />
			</div>
		</>
	);
};
