import React from "react";
import { isDateRange, useLeaderBoard } from "@ailab-desktop/common";
import { bannerImgUrl } from "../../config";
import { eventPerios } from "../../datas/eventDef";

/** Leaderboard 的 Banner 组件 */
const LeaderboardBanner = () => {
	const { langId } = useLeaderBoard();

	/** 取得 banner 路徑，根據活動期間判斷是否更換活動期間的 banner */
	const getBannerUrl = () => {
		/** 中秋期間 banner  */
		const midAutumnBannerUrl = `${bannerImgUrl}/desktop/img/leaderboard/mid-autumn-banner-${langId}.jpg`;

		/** 常態期間 banner 路徑 */
		const generalBannerUrl = `${bannerImgUrl}/desktop/img/leaderboard/banner-${langId}.jpg`;

		/**  banner 路徑，根據活動期間判斷是否更換活動期間的 banner */
		const bannerUrl = isDateRange(eventPerios.leaderboardMidAutumn)
			? midAutumnBannerUrl
			: generalBannerUrl;

		return bannerUrl;
	};

	return (
		<div className="leaderboard-banner">
			<img src={getBannerUrl()} alt="leaderboard-banner" />
		</div>
	);
};

/** Leaderboard 的 Banner 组件 */
export default LeaderboardBanner;
