import React from "react";
import HomeBanner from "./new-ui-components/HomeBanner";
import HomeMarquee from "./new-ui-components/HomeMarquee";
import HomeJoin from "./new-ui-components/HomeJoin";
import HomeHotGame from "./new-ui-components/HomeHotGame";
import HomeSport from "./new-ui-components/HomeSport";
import HomeSlot from "./new-ui-components/HomeSlot";
import HomeInfo from "./new-ui-components/HomeInfo";
import HomeApp from "./new-ui-components/HomeApp";
import HomeLeaderBoard from "./new-ui-components/HomeLeaderBoard";

const NewHome = () => {
	return (
		<main id="main" className="home">
			<HomeBanner />
			<HomeMarquee />
			<div className="home-wrapper">
                <div className="home-title">JOIN GOAL123</div>
				<HomeJoin />
				<HomeSport />
                <div className="home-title">Hot Game</div>
				<HomeHotGame />
                <HomeLeaderBoard />
				<HomeSlot />
				<HomeInfo />
				<HomeApp />
			</div>
		</main>
	);
};

export default NewHome;
