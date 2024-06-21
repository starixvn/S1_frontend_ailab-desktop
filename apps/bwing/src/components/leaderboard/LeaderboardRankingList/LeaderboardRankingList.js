import React from "react";
import { useLeaderBoard } from "../Leaderboard-context/Leaderboard-context";
import LeaderboardDateSelection from "./LeaderboardDateSelection";
import LeaderboardDateCountdown from "./LeaderboardDateCountdown";
import LeaderboardUserRanking from "./LeaderboardUserRanking";
import LeaderboardItem from "./LeaderboardItem";

/** 排行榜單 */
const LeaderboardRankingList = () => {
	const { t, getFormattedUpdateTime, isLogin, userRank, rankList } =
		useLeaderBoard();

	return (
		<div className="leaderboard-ranking">
			<LeaderboardDateCountdown />
			<div className="board">
				<LeaderboardDateSelection />
				<div className="winner-total">
					<LeaderboardItem rankList={rankList} t={t} />
					{/* 確認登入並且有 userRank 資料才顯示使用者排名 */}
					{isLogin && userRank ? (
						<LeaderboardUserRanking userRank={userRank} />
					) : null}
				</div>

				{/* 每 30 entries 刷新一次 */}
				<div className="board-refresh">
					{t("leaderboard_lastUpdateOn")}
					<span className="data">{getFormattedUpdateTime()}</span>
					{t("leaderboard_updateEvery30Minutes")}
				</div>
			</div>
		</div>
	);
};

/** 排行榜單 */
export default LeaderboardRankingList;
