import React from "react";
import LeaderboardBanner from "./LeaderboardBanner";
import LeaderboardRewards from "./LeaderboardReward/LeaderboardRewards";
import LeaderboardRankingList from "./LeaderboardRankingList/LeaderboardRankingList";
import LeaderboardPointConversion from "./LeaderboardPointConversion";
import LeaderboardTerm from "./LeaderboardTerm";
import { useLeaderBoard } from "./tempLeaderboard-context";
import Loading from "../common/loading";

/** leaderboard 主組件 */
const Leaderboard = () => {
	const { loading } = useLeaderBoard();
	return (
		<div className="leaderboard">
			<LeaderboardBanner />
			{loading ? (
				<Loading />
			) : (
				<div className="leaderboard-wrapper">
					<LeaderboardRewards />
					<LeaderboardRankingList />

					<div className="leaderboard-info">
						<LeaderboardPointConversion />
						<LeaderboardTerm />
					</div>
				</div>
			)}
		</div>
	);
};
/** leaderboard 主組件 */
export default Leaderboard;
