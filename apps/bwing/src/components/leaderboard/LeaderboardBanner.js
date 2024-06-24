import React from "react";
import { bannerImgUrl } from "../../config";
import { useLeaderBoard } from "./tempLeaderboard-context";
/** Leaderboard 的 Banner 组件 */
const LeaderboardBanner = () => {
	const { langId } = useLeaderBoard();
	return (
		<div className="leaderboard-banner">
			<img
				src={`${bannerImgUrl}/desktop/img/leaderboard/banner-${langId}.jpg`}
				alt="leaderboard-banner"
			/>
		</div>
	);
};

/** Leaderboard 的 Banner 组件 */
export default LeaderboardBanner;
