import React, { useEffect, useContext, useRef } from "react";

import { useTranslation } from "react-i18next";

import { isDateRange } from "@ailab-desktop/common";

import { readCookie, deleteCookie } from "../common/common";

import {
	userInfoContext,
	popBoxContext,
	isRootContext
} from "../common/context";

import { BannerSwipper } from "../common/customSwipper";
import { defBannerType } from "../../service/api/site";
import HomeJoin from "./new-ui-components/HomeJoin";
import HomeHotGame from "./new-ui-components/HomeHotGame";
import HomeSportMatches from "./new-ui-components/HomeSportMatches";
import HomePopularSlotGames from "./new-ui-components/HomePopularSlotGames";
import HomeInfo from "./new-ui-components/HomeInfo";
import HomeApp from "./new-ui-components/HomeApp";
import HomeLeaderBoard from "./new-ui-components/HomeLeaderBoard";
import HomeMarquee from "./new-ui-components/HomeMarquee";
import HomeRecent from "./new-ui-components/HomeRecent";

import MysteryBoxLink from "./mysteryBoxLink";
import LuckyWheelLink from "../luckyWheel/luckyWheel.link";
import DragonEgg from "../dragonEgg/homeLink";
import path from "../../router";
import { eventPerios } from "../../datas/eventDef";
import { defPopBoxType } from "../common/popBox";
import LiveStreamingLink from "./liveStreaming";
import usePopupHandler from "./hooks/useHomePopup";

const NewHome = () => {
	const isMountedRef = useRef(null);
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { setIsRoot } = useContext(isRootContext);

	usePopupHandler();

	useEffect(() => {
		isMountedRef.current = true;
		setIsRoot(true);
		return () => {
			isMountedRef.current = false;
			setIsRoot(false);
		};
	}, []);

	useEffect(() => {
		const popBoxMsg = readCookie("popBoxMsg");
		if (popBoxMsg) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.ErrorMsg,
				message: popBoxMsg,
				btnBar: (
					<div className="btnGroup">
						<button
							className="btn-cancel"
							onClick={() => {
								deleteCookie("popBoxMsg");
								setPopBox({ isOpen: false });
							}}>
							{t("lbl_Close")}
						</button>
					</div>
				)
			});
		}
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
				<HomeHotGame />
				<HomeLeaderBoard />
				<HomePopularSlotGames />
				<HomeInfo />
				<HomeRecent />
				<HomeApp />
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
