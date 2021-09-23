import React, { useContext } from "react";
import PropTypes from "prop-types";
import ReactMarquee from "react-fast-marquee";
import { SET_ENTER_PAGE, SET_CASINO_ENTER_PAGE } from "../../service/enterPage";
import defPopBoxType from "../common/defPopBoxType";
import { popBoxContext } from "../common/context";
import { cloudImgUrl, bannerImgUrl } from "../../config";
import { defLangToCurrency } from "../../datas/languageData";
import { defTpGameType } from "../../datas/productList";

const defGameType = {
	table: "table",
	slots: "slots",
	poker: "poker"
};

const defGame = {
	Andar_Bahar: {
		name: "Andar Bahar",
		provider: "Kingmaker",
		providerImg: "kma",
		img: "andar_bahar",
		gameType: defGameType.poker,
		tpId: 11,
		gameId: "",
		tpGameType: 52
	},
	Jhandi_Munda: {
		name: "Jhandi Munda",
		provider: "Kingmaker",
		providerImg: "kma",
		img: "jhandi_munda",
		gameType: defGameType.poker,
		tpId: 11,
		gameId: "",
		tpGameType: 52
	},
	Five_Fortune_Dragons: {
		name: "5 Fortune Dragons",
		provider: "Spade Gaming",
		providerImg: "sga",
		img: "5_fortune_dragons",
		gameType: defGameType.slots,
		tpId: 10,
		gameId: "S-FD01",
		tpGameType: 15
	},
	Brothers_Kingdom: {
		name: "Brothers Kingdom",
		provider: "Spade Gaming",
		providerImg: "sga",
		img: "brothers_kingdom",
		gameType: defGameType.slots,
		tpId: 10,
		gameId: "S-GK01",
		tpGameType: 15
	},
	Dragon_Empire: {
		name: "Dragon Empire",
		provider: "Spade Gaming",
		providerImg: "sga",
		img: "dragon_empire",
		gameType: defGameType.slots,
		tpId: 10,
		gameId: "S-DE01",
		tpGameType: 15
	},
	Sky_Lantern: {
		name: "Sky Lantern",
		provider: "CQ9",
		providerImg: "cq9a",
		img: "sky_lantern",
		gameType: defGameType.slots,
		tpId: 16,
		gameId: 146,
		tpGameType: 29
	},
	Fire_Queen_2: {
		name: "Fire Queen 2",
		provider: "CQ9",
		providerImg: "cq9a",
		img: "fire_queen_2",
		gameType: defGameType.slots,
		tpId: 16,
		gameId: 186,
		tpGameType: 29
	},
	Jumping_Mobile: {
		name: "Jumping Mobile",
		provider: "CQ9",
		providerImg: "cq9a",
		img: "jumping_mobile",
		gameType: defGameType.slots,
		tpId: 16,
		gameId: 105,
		tpGameType: 29
	},
	Gates_of_Olympus: {
		name: "Gates of Olympus",
		provider: "PP",
		providerImg: "ppb",
		img: "gates_of_olympus",
		gameType: defGameType.slots,
		tpId: 5,
		gameId: "vs20olympgate",
		tpGameType: 7
	},
	God_Of_Fortune: {
		name: "God Of Fortune",
		provider: "GPI",
		providerImg: "gpb",
		img: "god_of_fortune",
		gameType: defGameType.slots,
		tpId: 6,
		gameId: "godoffortune",
		tpGameType: 11
	},
	Archer: {
		name: "Archer",
		provider: "Playtech",
		providerImg: "ptb",
		img: "archer",
		gameType: defGameType.slots,
		tpId: 27,
		gameId: "arc",
		tpGameType: 46
	},
	Zhao_Cai_Jin_Bao_Jackpot: {
		name: "Zhao Cai Jin Bao Jackpot",
		provider: "Playtech",
		providerImg: "ptb",
		img: "zhao_cai_jin_bao_jackpot",
		gameType: defGameType.slots,
		tpId: 27,
		gameId: "Zhao Cai Jin Bao Jackpot",
		tpGameType: 46
	},
	Gem_Queen: {
		name: "Gem Queen",
		provider: "Playtech",
		providerImg: "ptb",
		img: "gem_queen",
		gameType: defGameType.slots,
		tpId: 27,
		gameId: "gemq",
		tpGameType: 46
	},
	Arowanas_Luck: {
		name: "Arowanas Luck",
		provider: "Playtech",
		providerImg: "ptb",
		img: "arowanas_luck",
		gameType: defGameType.slots,
		tpId: 27,
		gameId: "gpas_aluck_pop",
		tpGameType: 46
	},
	LUCKY_GOD: {
		name: "LUCKY GOD",
		provider: "Joker",
		providerImg: "jka",
		img: "lucky_god",
		gameType: defGameType.slots,
		tpId: 9,
		gameId: "dhdirsn3m3xia",
		tpGameType: 13
	},
	SUPREME_CAISHEN: {
		name: "SUPREME CAISHEN",
		provider: "Joker",
		providerImg: "jka",
		img: "supreme_caishen",
		gameType: defGameType.slots,
		tpId: 9,
		gameId: "byz81hmsq748k",
		tpGameType: 13
	},
	Houyis_Legend: {
		name: "Houyi's Legend",
		provider: "ICG",
		providerImg: "icga",
		img: "houyi's_legend",
		gameType: defGameType.slots,
		tpId: 24,
		gameId: "cm00034",
		tpGameType: 39
	},
	Sonya_Blackjack: {
		name: "Sonya Blackjack",
		provider: "YGG",
		providerImg: "ygb",
		img: "sonya_blackjack",
		gameType: defGameType.table,
		tpId: 8,
		gameId: 21001,
		tpGameType: 14
	},
	Thor_Infinity_Reels: {
		name: "Thor Infinity Reels",
		provider: "YGG",
		providerImg: "ygb",
		img: "thor_infinity_reels",
		gameType: defGameType.slots,
		tpId: 8,
		gameId: 1035,
		tpGameType: 14
	},
	Mahjong_Ways_Two: {
		name: "Mahjong Ways Two",
		provider: "PG Soft",
		providerImg: "pga",
		img: "mahjong_ways_two",
		gameType: defGameType.slots,
		tpId: 14,
		gameId: 74,
		tpGameType: 17
	},
	Baccarat: {
		name: "Baccarat",
		provider: "Saba Casino",
		providerImg: "sabacasino",
		gameType: defGameType.table,
		img: "baccarat",
		tpId: 1,
		gameId: 208,
		tpGameType: 4
	},
	Virtual_Games: {
		name: "Virtual Games",
		provider: "OW",
		providerImg: "sabacasino",
		img: "virtual_games",
		gameType: defGameType.slots,
		tpId: 1,
		gameId: 245,
		tpGameType: 22
	}
};

const defGameList = {
	MYR: [
		defGame.Five_Fortune_Dragons,
		defGame.Thor_Infinity_Reels,
		defGame.Sky_Lantern,
		defGame.Gates_of_Olympus,
		defGame.God_Of_Fortune,
		defGame.Archer,
		defGame.LUCKY_GOD,
		defGame.Houyis_Legend,
		defGame.Baccarat,
		defGame.Sonya_Blackjack,
		defGame.Virtual_Games
	],
	THB: [
		defGame.Brothers_Kingdom,
		defGame.Thor_Infinity_Reels,
		defGame.Mahjong_Ways_Two,
		defGame.Fire_Queen_2,
		defGame.Gates_of_Olympus,
		defGame.God_Of_Fortune,
		defGame.Zhao_Cai_Jin_Bao_Jackpot,
		defGame.SUPREME_CAISHEN,
		defGame.Houyis_Legend,
		defGame.Baccarat,
		defGame.Virtual_Games
	],
	IDR: [
		defGame.Five_Fortune_Dragons,
		defGame.Thor_Infinity_Reels,
		defGame.Mahjong_Ways_Two,
		defGame.Jumping_Mobile,
		defGame.Gates_of_Olympus,
		defGame.God_Of_Fortune,
		defGame.Gem_Queen,
		defGame.SUPREME_CAISHEN,
		defGame.Houyis_Legend,
		defGame.Baccarat,
		defGame.Virtual_Games
	],
	INR: [
		defGame.Andar_Bahar,
		defGame.Jhandi_Munda,
		defGame.Archer,
		defGame.God_Of_Fortune,
		defGame.Thor_Infinity_Reels,
		defGame.Gates_of_Olympus,
		defGame.Houyis_Legend,
		defGame.Sky_Lantern,
		defGame.Sonya_Blackjack,
		defGame.Baccarat,
		defGame.Virtual_Games
	]
};

const HotGameList = ({ t, userInfo, maintainList }) => {
	const { setPopBox } = useContext(popBoxContext);

	const ClickGame = (tpId, gameId, gameType, _isInMaintain, tpGameType) => {
		const clickClose = () => {
			setPopBox({ isOpen: false });
		};
		const LoginPopBox = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};
		if (_isInMaintain) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.UnderMaintain,
				clickClose
			});
			return;
		}
		if (gameType === defGameType.slots) {
			if (userInfo.isLogin !== true) {
				LoginPopBox();
			} else {
				SET_CASINO_ENTER_PAGE({
					tpId,
					gameId,
					isFree: false,
					langId: userInfo.langId,
					tpGameType
				});
			}
		} else {
			SET_ENTER_PAGE({
				langId: userInfo.langId,
				tpId,
				gameId,
				isLogin: userInfo.isLogin,
				loginCallback: LoginPopBox,
				tpGameType
			});
		}
	};

	const currencyName = userInfo.currencyId
		? t(`Currency_${userInfo.currencyId}`)
		: defLangToCurrency[userInfo.langId] ?? defLangToCurrency.en;

	const gameList = defGameList[currencyName] ?? defGameList.MYR;

	const rows = gameList.map(g => {
		const isInMaintain = maintainList?.some(
			mt =>
				mt.tpId === g.tpId &&
				(mt.tpGameType === g.tpGameType ||
					mt.tpGameType === defTpGameType.All)
		);
		return (
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
						g.gameType,
						isInMaintain,
						g.tpGameType
					)
				}>
				<img
					src={`${bannerImgUrl}/img/hotgame/${g.img}.jpg`}
					alt={g.name}
				/>
				<div>
					<div className="title">{g.name}</div>
					<div>{g.provider}</div>
				</div>
				<img
					alt="hotgame-marquee"
					src={`${cloudImgUrl}/SiteSkin/img/logo/${g.providerImg}.png`}
				/>
			</div>
		);
	});

	return (
		<>
			<div className="moduleTitle icon icon-mediafire">
				{t("lbl_HOT_GAMES")}
			</div>
			<div className="hotGame">
				<ReactMarquee
					speed={145}
					pauseOnHover={true}
					gradientColor={false}>
					<div className="swiper-container">
						<div
							className="swiper-wrapper"
							style={{ display: "flex" }}>
							{rows}
						</div>
					</div>
				</ReactMarquee>
			</div>
		</>
	);
};

HotGameList.propTypes = {
	t: PropTypes.func.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	maintainList: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default HotGameList;
