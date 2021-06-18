import React, { useContext } from "react";
import ReactMarquee from "react-fast-marquee";
import { SET_ENTER_PAGE, SET_CASINO_ENTER_PAGE } from "../../service/enterPage";
import defPopBoxType from "../common/defPopBoxType";
import { popBoxContext } from "../common/context";
import config from "../../config";

import Baccarat from "../../styles/img/hotgame01.jpg";
import DragonTiger from "../../styles/img/hotgame02.jpg";
import Belangkai from "../../styles/img/hotgame03.jpg";
import Hulu from "../../styles/img/hotgame04.jpg";
import MultihandBlackjack from "../../styles/img/hotgame05.jpg";
import Img88Draon from "../../styles/img/hotgame06.jpg";
import ImgThreeStarFortune from "../../styles/img/hotgame07.jpg";
import Img5FortuneDragons from "../../styles/img/hotgame08.jpg";
import ImgGodOfFortune from "../../styles/img/hotgame09.jpg";
import ImgLuckyNeko from "../../styles/img/hotgame10.jpg";
import ImgPoker from "../../styles/img/hotgame11.jpg";

const defProductType = {
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
		gameId: "3uim5ppkiqwk1",
		productType: defProductType.slots
	},
	{
		name: "Hulu",
		provider: "Joker",
		providerImg: "jka",
		gameTypeKey: gameType.table,
		img: Hulu,
		tpId: 9,
		gameId: "yr1zy9u9xt6zr",
		productType: defProductType.slots
	},
	{
		name: "Multihand Blackjack",
		provider: "PP",
		providerImg: "ppb",
		gameTypeKey: gameType.table,
		img: MultihandBlackjack,
		tpId: 5,
		gameId: "bjma",
		productType: defProductType.slots
	},
	{
		name: "888 Dragon",
		provider: "PP",
		providerImg: "ppb",
		gameTypeKey: gameType.slots,
		img: Img88Draon,
		tpId: 5,
		gameId: "vs1dragon8",
		productType: defProductType.slots
	},
	{
		name: "Three Star Fortune",
		provider: "PP",
		providerImg: "ppb",
		gameTypeKey: gameType.slots,
		img: ImgThreeStarFortune,
		tpId: 5,
		gameId: "vs10threestar",
		productType: defProductType.slots
	},
	{
		name: "5 Fortune Dragons",
		provider: "Spade",
		providerImg: "sabaa",
		gameTypeKey: gameType.slots,
		img: Img5FortuneDragons,
		tpId: 10,
		gameId: "S-FD01",
		productType: defProductType.slots
	},
	{
		name: "God Of Fortune",
		provider: "GPI",
		providerImg: "gpb",
		gameTypeKey: gameType.slots,
		img: ImgGodOfFortune,
		tpId: 6,
		gameId: "godoffortune",
		productType: defProductType.slots
	},
	{
		name: "Lucky Neko",
		provider: "YGG",
		providerImg: "ygb",
		gameTypeKey: gameType.slots,
		img: ImgLuckyNeko,
		tpId: 8,
		gameId: 7382,
		productType: defProductType.slots
	},
	{
		name: "Poker",
		provider: "OneGame",
		providerImg: "1ga",
		gameTypeKey: gameType.poker,
		img: ImgPoker,
		tpId: 13
	}
];

export default ({ t, userInfo }) => {
	const { setPopBox } = useContext(popBoxContext);

	const ClickGame = ({ tpId, gameId, productType }) => {
		const LoginPopBox = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		if (productType === defProductType.slots) {
			if (userInfo.isLogin !== true) {
				LoginPopBox();
			} else {
				SET_CASINO_ENTER_PAGE({
					tpId,
					gameId,
					isFree: false,
					langId: userInfo.langId
				});
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

	return defGameList && defGameList.length > 0 ? (
		<>
			<div className="moduleTitle icon icon-mediafire">
				{t("lbl_HOT_GAMES")}
			</div>

			<div className="hotGame">
				<ReactMarquee
					speed={60}
					pauseOnHover={true}
					gradientColor={false}>
					<div className="swiper-container">
						<div
							className="swiper-wrapper"
							style={{ display: "flex" }}>
							{defGameList.map(g => (
								<div
									key={`hotGame-${g.gameId}-${g.name}`}
									style={{
										width: "300px",
										margin: "0 15px"
									}}
									onClick={() =>
										ClickGame(
											g.tpId,
											g.gameId,
											g.gameTypeKey
										)
									}>
									<img src={g.img} alt={g.name} />

									<div>
										<div className="title">{g.name}</div>
										<div>{g.provider}</div>
									</div>
									<img
										alt="hotgame-marquee"
										src={`${config.cloudImgUrl}/SiteSkin/img/logo/${g.providerImg}.png`}
									/>
								</div>
							))}
						</div>
					</div>
				</ReactMarquee>
			</div>
		</>
	) : null;
};
