import React from "react";
import LeaderboardBanner from "./LeaderboardBanner";
import LeaderboardRewards from "./xleaderboardReward/LeaderboardRewards";
import LeaderboardRankingList from "./xleaderboardRankingList/LeaderboardRankingList";
import LeaderboardPointConversion from "./LeaderboardPointConversion";
import LeaderboardTerm from "./LeaderboardTerm";

/** leaderboard 主組件 */
const Leaderboard = () => {
	return (
		<div className="leaderboard">
			<LeaderboardBanner />
			<div className="leaderboard-wrapper">
				<LeaderboardRewards />
				<LeaderboardRankingList />

				<div className="leaderboard-info">
					<LeaderboardPointConversion />
					<LeaderboardTerm />
				</div>
			</div>
		</div>
	);
};
/** leaderboard 主組件 */
export default Leaderboard;
