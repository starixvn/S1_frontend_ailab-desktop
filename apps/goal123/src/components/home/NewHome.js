import React, { useContext } from "react";
import { isDateRange, LeaderboardProvider } from "@ailab-desktop/common";
import { userInfoContext } from "../common/context";
import { BannerSwipper } from "../common/customSwipper";
import { defBannerType } from "../../service/api/site";
import HomeJoin from "./new-ui-components/HomeJoin";
import HomeHotGames from "./new-ui-components/HomeHotGames";
import HomeSportMatches from "./new-ui-components/HomeSportMatches";
import { siteId } from "../../config";
import HomePopularSlotGames from "./new-ui-components/HomePopularSlotGames";
import HomeInfo from "./new-ui-components/HomeInfo";
import HomeAppDownload from "./new-ui-components/HomeAppDownload";
import HomePrevious from "./new-ui-components/HomePrevious";
import HomeLeaderBoard from "./new-ui-components/HomeLeaderBoard";
import HomeMarquee from "./new-ui-components/HomeMarquee";
import HomeRecentViewedGames from "./new-ui-components/HomeRecentViewedGames";
import MysteryBoxLink from "./mysteryBoxLink";
import LuckyWheelLink from "../luckyWheel/luckyWheel.link";
import VgamingLink from "./vgaming";
import DragonEgg from "../dragonEgg/homeLink";
import path from "../../router";
import { eventPeriods } from "../../datas/eventDef";
import LiveStreamingLink from "./liveStreaming";
import usePopupHandler from "./hooks/usePopupHandler";
import CupEventLink from "./cupEventLink";

const NewHome = () => {
	const { userInfo } = useContext(userInfoContext);
	// 彈窗邏輯整合至usePopupHandlerhook
	usePopupHandler();

	const bannerSwipperConfig = {
		effect: "fade",
		autoplay: {
			delay: 5000,
			disableOnInteraction: false
		}
	};

	return (
		<main id="main" className="home">
			{/* swiper 沿用舊的 */}
			<BannerSwipper
				ImgFolder={[defBannerType.Promotions]}
				withBtn={false}
				withPagination={true}
				config={bannerSwipperConfig}
			/>
			<HomeMarquee />
			<div className="home-wrapper">
				<HomeJoin />
				<HomeSportMatches />
				<HomeHotGames />
				<HomePopularSlotGames />

				{/* 首頁的 HomeLeaderBoard 比 leaderboard 頁面更早開發（但功能相同），由於 PM 希望內頁與首頁的資料顯示一致，
                    為了避免相同邏輯分散在兩個頁面，所以將後期開發的 LeaderboardProvider 包裹 HomeLeaderBoard，共享相同的資料與 API。 */}
				<LeaderboardProvider siteId={siteId} userInfo={userInfo}>
					<HomeLeaderBoard />
				</LeaderboardProvider>
				<HomeInfo />
				<HomeRecentViewedGames />
				<HomeAppDownload />
				<HomePrevious/>
				{!isDateRange(eventPeriods.euroCup) && <LuckyWheelLink />}
				{/* testing for retention during euro-cup */}
				<LuckyWheelLink />
				{isDateRange(eventPeriods.dragonEgg) && <DragonEgg />}
				{isDateRange(eventPeriods.euroCup) && <CupEventLink />}
				<VgamingLink />
				<MysteryBoxLink
					to={`/${userInfo.langId}/${path.mysteryBox.root}`}
					langId={userInfo.langId}
				/>
				<LiveStreamingLink />
			</div>
		</main>
	);
};

export default NewHome;
