import React, { useContext } from "react";
import { LeaderboardProvider } from "@ailab-desktop/common";
import LeaderBoardBanner from "./leaderBoardBanner";
import LeaderBoardReward from "./leaderBoardReward";
import LeaderBoardRanking from "./LeaderboardRankingList/leaderBoardRanking";
import LeaderBoardInfoAndTerm from "./leaderBoardInfoAndTerm";
import { userInfoContext } from "../common/context";
import { siteId } from "../../config";

export default () => {
	const { userInfo } = useContext(userInfoContext);
	return (
		<LeaderboardProvider siteId={siteId} userInfo={userInfo}>
			<LeaderBoardBanner />

			<div className="leaderboard-wrapper">
				<LeaderBoardReward />
				<LeaderBoardRanking />
				<LeaderBoardInfoAndTerm />
			</div>
		</LeaderboardProvider>
	);
};
