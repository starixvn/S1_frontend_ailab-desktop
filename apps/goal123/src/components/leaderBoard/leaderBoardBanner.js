import React from "react";
import { bannerImgUrl } from "../../config";

const LeaderBoardBanner = () => {
	return (
		<div className="leaderboard-banner">
			<div className="leaderboard-banner">
				{/* 因為與奧運差 2 天，所以先放個版面即可，到時會換掉 */}
				<img
					src={`${bannerImgUrl}/desktop/img/leaderboard/banner-en.jpg`}
					alt="leaderboaed-banner"
				/>
			</div>
		</div>
	);
};

export default LeaderBoardBanner;
