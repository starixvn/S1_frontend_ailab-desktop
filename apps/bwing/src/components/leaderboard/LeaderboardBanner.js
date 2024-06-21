import React from "react";
import { useLeaderBoard } from "./Leaderboard-context";
/** Leaderboard 的 Banner 组件 */
const LeaderboardBanner = () => {
	const { langId } = useLeaderBoard();
	return (
		<div className="leaderboard-banner">
			<img
				src={`https://banner.bw88.io/desktop/img/leaderboard/banner-${langId}.jpg`}
				alt=""
			/>
		</div>
	);
};

/** Leaderboard 的 Banner 组件 */
export default LeaderboardBanner;
