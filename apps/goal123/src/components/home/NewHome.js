import React, { useEffect, useContext, useRef } from "react";
import { isDateRange } from "@ailab-desktop/common";
import { userInfoContext, isRootContext } from "../common/context";
import { BannerSwipper } from "../common/customSwipper";
import { defBannerType } from "../../service/api/site";
import HomeJoin from "./new-ui-components/HomeJoin";
import HomeHotGames from "./new-ui-components/HomeHotGames";
import HomeSportMatches from "./new-ui-components/HomeSportMatches";
import HomePopularSlotGames from "./new-ui-components/HomePopularSlotGames";
import HomeInfo from "./new-ui-components/HomeInfo";
import HomeAppDownload from "./new-ui-components/HomeAppDownload";
import HomeLeaderBoard from "./new-ui-components/HomeLeaderBoard";
import HomeMarquee from "./new-ui-components/HomeMarquee";
import HomeRecentViewedGames from "./new-ui-components/HomeRecentViewedGames";
import MysteryBoxLink from "./mysteryBoxLink";
import LuckyWheelLink from "../luckyWheel/luckyWheel.link";
import DragonEgg from "../dragonEgg/homeLink";
import path from "../../router";
import { eventPerios } from "../../datas/eventDef";
import LiveStreamingLink from "./liveStreaming";
import usePopupHandler from "./hooks/usePopupHandler";

const NewHome = () => {
	const isMountedRef = useRef(null);
	const { userInfo } = useContext(userInfoContext);
	const { setIsRoot } = useContext(isRootContext);

	// 彈窗邏輯整合至usePopupHandlerhook
	usePopupHandler();

	useEffect(() => {
		isMountedRef.current = true;
		setIsRoot(true);
		return () => {
			isMountedRef.current = false;
			setIsRoot(false);
		};
	}, []);

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
				<HomeLeaderBoard />
				<HomePopularSlotGames />
				<HomeInfo />
				<HomeRecentViewedGames />
				<HomeAppDownload />
				{!isDateRange(eventPerios.dragonEgg) && <LuckyWheelLink />}
				{isDateRange(eventPerios.dragonEgg) && <DragonEgg />}
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
