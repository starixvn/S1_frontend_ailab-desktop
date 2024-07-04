import React from "react";
// import { isDateRange, useLeaderBoard } from "@ailab-desktop/common";
import { bannerImgUrl } from "../../config";
// import { eventPeriods } from "../../datas/eventDef";

const LeaderBoardBanner = () => {
	const { langId } = useLeaderBoard();

	// /** 取得 banner 路徑，根據活動期間判斷是否更換活動期間的 banner */
	// const getBannerUrl = () => {
	// 	/** 巴黎奧運期間 banner 巴黎奧運過後可以刪除 */
	// 	const parisOlympicsBannerUrl = `${bannerImgUrl}/desktop/img/leaderboard/olympic-banner-${langId}.jpg`;

	// 	/** 常態期間 banner 路徑 */
	// 	const generalBannerUrl = `${bannerImgUrl}/desktop/img/leaderboard/banner-${langId}.jpg`;

	// 	/**  banner 路徑，根據活動期間判斷是否更換活動期間的 banner */
	// 	const bannerUrl = isDateRange(eventPeriods.olympic)
	// 		? parisOlympicsBannerUrl
	// 		: generalBannerUrl;

	// 	return bannerUrl;
	// };
	return (
		<div className="leaderboard-banner">
			<div className="leaderboard-banner">
				<img
					src={`${bannerImgUrl}/desktop/img/leaderboard/olympic-banner-${langId}.jpg`}
					alt="leaderboaed-banner"
				/>
			</div>
		</div>
	);
};

export default LeaderBoardBanner;
