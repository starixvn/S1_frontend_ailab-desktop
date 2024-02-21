import React from "react";
import HomeBanner from "./new-ui-components/HomeBanner";
import HomeJoin from "./new-ui-components/HomeJoin";
import HomeHotGame from "./new-ui-components/HomeHotGame";
import HomeSport from "./new-ui-components/HomeSport";
import HomeSlot from "./new-ui-components/HomeSlot";
import HomeInfo from "./new-ui-components/HomeInfo";
import HomeApp from "./new-ui-components/HomeApp";
import HomeLeaderBoard from "./new-ui-components/HomeLeaderBoard";
import NewMarquee from "./new-ui-components/NewMarquee";

const NewHome = ({ productTpIds }) => {




	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox, closePopBox } = usePopBox();
	const isMountedRef = useRef(null);
	const { setIsRoot } = useContext(isRootContext);
	const [winnerList, setWinnerList] = useState([]);
	const [displayVgaming, setDisplayVgaming] = useState(true);
	const [displayLiveStreaming, setDisplayLiveStreaming] = useState(false);
	const [liveStreamingList, setLiveStreamingList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const { allMaintainList } = useContext(maintainListContext);

	// * 如果 popUpBonusCode 有值需彈出彈窗提醒有該優惠活動可以使用
	const [getPopUpPromotion] = useLazyGetPopUpPromotionQuery();

	
	return (
		<main id="main" className="home">
			<HomeBanner />
			<NewMarquee />
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
