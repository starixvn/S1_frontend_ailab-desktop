import React, { useContext, useState } from "react";
import Swiper from "react-id-swiper";
import { SET_ENTER_PAGE, SET_CASINO_ENTER_PAGE } from "../../service/enterPage";
import defPopBoxType from "../common/defPopBoxType";
import { popBoxContext } from "../common/context";
import config from "../../config";

import Baccarat from "../../styles/img/hotgame01.jpg";
import DragonTiger from "../../styles/img/hotgame02.jpg";
import Belangkai from "../../styles/img/hotgame03.jpg";
import Hulu from "../../styles/img/hotgame04.jpg";
import MultihandBlackjack from "../../styles/img/hotgame05.jpg";

const defLinkType = {
	default: "default",
	slots: "slots"
};

const gameType = {
	table: "lbl_TableGame",
	slots: "lbl_SlotsGame",
	poker: "lbl_Poker"
};

const defGameList = [
	{
		name: "Baccarat",
		provider: "OneRNG",
		providerImg: "sabaa",
		gameTypeKey: gameType.table,
		img: Baccarat,
		tpId: 1,
		gameId: 208
	},
	{
		name: "Dragon Tiger",
		provider: "OneRNG",
		providerImg: "sabaa",
		gameTypeKey: gameType.table,
		img: DragonTiger,
		tpId: 1,
		gameId: 208
	},
	{
		name: "Belangkai",
		provider: "Joker",
		providerImg: "jka",
		gameTypeKey: gameType.table,
		img: Belangkai,
		tpId: 9,
		gameId: "3uim5ppkiqwk1"
	},
	{
		name: "Hulu",
		provider: "Joker",
		providerImg: "jka",
		gameTypeKey: gameType.table,
		img: Hulu,
		tpId: 9,
		gameId: "yr1zy9u9xt6zr"
	},
	{
		name: "Multihand Blackjack",
		provider: "PP",
		providerImg: "pp",
		gameTypeKey: gameType.table,
		img: MultihandBlackjack,
		tpId: 5,
		gameId: "bjma"
	},
	{
		name: "888 Dragon",
		provider: "PP",
		providerImg: "pp",
		gameTypeKey: gameType.slots,
		img: Baccarat,
		tpId: 5,
		gameId: "vs1dragon8"
	},
	{
		name: "Three Star Fortune",
		provider: "PP",
		providerImg: "pp",
		gameTypeKey: gameType.slots,
		img: Baccarat,
		tpId: 5,
		gameId: "vs10threestar"
	},
	{
		name: "5 Fortune Dragons",
		provider: "Spade",
		providerImg: "sabaa",
		gameTypeKey: gameType.slots,
		img: Baccarat,
		tpId: 10,
		gameId: "S-FD01"
	},
	{
		name: "God Of Fortune",
		provider: "GPI",
		providerImg: "gp",
		gameTypeKey: gameType.slots,
		img: Baccarat,
		tpId: 6,
		gameId: "godoffortune"
	},
	{
		name: "Lucky Neko",
		provider: "YGG",
		providerImg: "yg",
		gameTypeKey: gameType.slots,
		img: Baccarat,
		tpId: 5,
		gameId: 7382
	},
	{
		name: "Poker",
		provider: "OneGame",
		providerImg: "1g",
		gameTypeKey: gameType.poker,
		img: Baccarat,
		tpId: 13
	}
];

export default ({ t, userInfo }) => {
	const { setPopBox } = useContext(popBoxContext);

	const ClickGame = (tpId, gameId, betType, linkType) => {
		const LoginPopBox = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		if (linkType === defLinkType.slots) {
			if (userInfo.isLogin !== true) {
				LoginPopBox();
			} else {
				SET_CASINO_ENTER_PAGE(tpId, gameId, false, userInfo.langId);
			}
		} else {
			SET_ENTER_PAGE({
				langId: userInfo.langId,
				tpId,
				gameId,
				isLogin: userInfo.isLogin,
				loginCallback: LoginPopBox
			});
		}
	};

	const defSwipperConfig = {
		spaceBetween: 20,
		slidesPerView: 8,
		centeredSlides: true,
		loopFillGroupWithBlank: true,
		loop: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false
		}
	};

	const params = {
		...defSwipperConfig
	};

	const Rows = defGameList.map(g => {
		return (
			<div
				className="swiper-slide"
				key={`hotGame-${g.gameId}-${g.name}`}
				onClick={ClickGame.bind(this, g.tpId, g.gameId, g.gameTypeKey)}>
				<img src={g.img} alt={g.name} />
				{/* <span className={g.isNew ? "icon icon-new" : ""}>
					{displayText}
				</span> */}
				<div>
					<div className="title">{g.name}</div>
					<div>{g.provider}</div>
				</div>
				<img
					src={`${config.cloudImgUrl}/SiteSkin/img/logo/${g.providerImg}.png`}
				/>
			</div>
		);
	});

	const [swiper, setSwiper] = useState(null);

	return Rows && Rows.length > 0 ? (
		<>
			<div className="moduleTitle icon icon-mediafire">Hot Games</div>
			{/* <div className="hotGame"> */}
			<div className="hotGame">
				<div className="swiper-container promosSwiper">
					<Swiper {...params} getSwiper={setSwiper}>
						{Rows}
					</Swiper>
				</div>
			</div>
		</>
	) : (
		<></>
	);
};
