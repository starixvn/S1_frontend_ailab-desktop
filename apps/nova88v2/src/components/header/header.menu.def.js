import { isDateRange } from "@ailab-desktop/common";
import productList from "../../datas/productList";
import path from "../../router";
import {
	defEventIcon,
	defEventPeriod,
	showEventIcon
} from "../common/eventIcon";
import { defCurrencyList } from "../common/common";
import { getLeaderBoardSupportCurrencyId } from "../leaderBoard/leaderBoard.def";
import allowedCurrencyList from "../../datas/allowedCurrencyList";
import config from "../../config";

// PP 移除時間
const ppDestroyDate = "2023-02-28 23:00:00";

export const getPPAllowCurrencies = () => {
	return isDateRange({ endDate: ppDestroyDate })
		? Object.values(defCurrencyList).filter(
				currency => currency !== defCurrencyList.INR
		  )
		: Object.values(defCurrencyList);
};

const defSortSports = {
	[defCurrencyList.INR]: {
		cricket: 1,
		soccer: 2,
		sabaSoccer: 3,
		basketball: 4,
		badminton: 5
	},
	[defCurrencyList.BDT]: {
		cricket: 1,
		soccer: 2,
		sabaSoccer: 3,
		basketball: 4,
		badminton: 5
	}
};

const defSortCasino = {
	[defCurrencyList.THB]: {
		casino_PP: 1,
		casino_yb: 2,
		casino_Skywind: 3,
		casino_EVO: 4,
		casino_PT: 5,
		casino_DG: 6,
		casino_AE: 7,
		casino_SA: 8,
		casino_ALBET: 9,
		casino_AG: 10,
		casino_WM: 11,
		casino_EBET: 12,
		casino_N2LIVE: 13
	},
	[defCurrencyList.MYR]: {
		casino_PP: 1,
		casino_yb: 2,
		casino_Skywind: 3,
		casino_EVO: 4,
		casino_PT: 5,
		casino_DG: 6,
		casino_AE: 7,
		casino_SA: 8,
		casino_ALBET: 9,
		casino_AG: 10,
		casino_WM: 11,
		casino_EBET: 12,
		casino_N2LIVE: 13
	},
	[defCurrencyList.IDR]: {
		casino_PP: 1,
		casino_yb: 2,
		casino_Skywind: 3,
		casino_EVO: 4,
		casino_PT: 5,
		casino_DG: 6,
		casino_AE: 7,
		casino_SA: 8,
		casino_ALBET: 9,
		casino_AG: 10,
		casino_WM: 11,
		casino_EBET: 12,
		casino_N2LIVE: 13
	},
	[defCurrencyList.INR]: {
		casino_PP: 1,
		casino_yb: 2,
		casino_Skywind: 3,
		casino_EVO: 4,
		casino_PT: 5,
		casino_DG: 6,
		casino_AE: 7,
		casino_SA: 8,
		casino_ALBET: 9,
		casino_AG: 10,
		casino_WM: 11,
		casino_EBET: 12,
		casino_N2LIVE: 13
	},
	[defCurrencyList.BDT]: {
		casino_PP: 1,
		casino_yb: 2,
		casino_EVO: 3,
		casino_PT: 4,
		casino_DG: 5,
		casino_AE: 6,
		casino_SA: 7,
		casino_ALBET: 8,
		casino_AG: 9,
		casino_WM: 10,
		casino_EBET: 11,
		casino_N2LIVE: 12
	}
};

const defSortSlot = {
	[defCurrencyList.THB]: {
		slot_PP: 1,
		slot_SG: 2,
		slot_AdvantPlay: 3,
		slot_PG: 4,
		slot_MGPSW: 5,
		slot_JI: 6,
		slot_SPRIBE: 7,
		slot_JOKER: 8,
		slot_RedTiger: 9,
		slot_NetEnt: 10,
		slot_CQ9: 11,
		slot_PNG: 12,
		slot_GPI: 13,
		slot_YGG: 14,
		slot_AMB: 15,
		slot_Habanero: 16,
		slot_SimplePlay: 17,
		slot_Skywind: 18,
		slot_PT: 19
		// slot_ICG: 17,
		// slot_OW: 18
	},
	[defCurrencyList.MYR]: {
		slot_PP: 1,
		slot_SG: 2,
		slot_AdvantPlay: 3,
		slot_PG: 4,
		slot_MGPSW: 5,
		slot_JI: 6,
		slot_SPRIBE: 7,
		slot_JOKER: 8,
		slot_RedTiger: 9,
		slot_NetEnt: 10,
		slot_CQ9: 11,
		slot_PNG: 12,
		slot_GPI: 13,
		slot_YGG: 14,
		slot_AMB: 15,
		slot_Habanero: 16,
		slot_SimplePlay: 17,
		slot_Skywind: 18,
		slot_PT: 19
		// slot_ICG: 17,
		// slot_OW: 18
	},
	[defCurrencyList.IDR]: {
		slot_PP: 1,
		slot_SG: 2,
		slot_AdvantPlay: 3,
		slot_PG: 4,
		slot_MGPSW: 5,
		slot_JI: 6,
		slot_SPRIBE: 7,
		slot_JOKER: 8,
		slot_RedTiger: 9,
		slot_NetEnt: 10,
		slot_CQ9: 11,
		slot_PNG: 12,
		slot_GPI: 13,
		slot_YGG: 14,
		slot_AMB: 15,
		slot_Habanero: 16,
		slot_SimplePlay: 17,
		slot_Skywind: 18,
		slot_PT: 19
		// slot_ICG: 17,
		// slot_OW: 18
	},
	[defCurrencyList.INR]: {
		slot_PP: 1,
		slot_SG: 2,
		slot_AdvantPlay: 3,
		slot_PG: 4,
		slot_MGPSW: 5,
		slot_JI: 6,
		slot_SPRIBE: 7,
		slot_JOKER: 8,
		slot_RedTiger: 9,
		slot_NetEnt: 10,
		slot_CQ9: 11,
		slot_PNG: 12,
		slot_GPI: 13,
		slot_YGG: 14,
		slot_AMB: 15,
		slot_Habanero: 16,
		slot_SimplePlay: 17,
		slot_Skywind: 18,
		slot_PT: 19
		// slot_ICG: 17,
		// slot_OW: 18
	},
	[defCurrencyList.BDT]: {
		slot_PP: 1,
		slot_SG: 2,
		slot_AdvantPlay: 3,
		slot_PG: 4,
		slot_MGPSW: 5,
		slot_JI: 6,
		slot_JOKER: 7,
		slot_RedTiger: 8,
		slot_NetEnt: 9,
		slot_CQ9: 10,
		slot_PNG: 11,
		slot_GPI: 12,
		slot_YGG: 13,
		slot_AMB: 14,
		slot_Habanero: 15,
		slot_SimplePlay: 16,
		slot_Skywind: 17,
		slot_PT: 18
		// slot_ICG: 17,
		// slot_OW: 18
	}
};

const defSortFishing = {
	[defCurrencyList.THB]: {
		fishing_SGW_WAR: 1,
		fishing_CQ9_PARADISE: 2,
		fishing_GGYL_WORLD: 3,
		Skywind_Ocean_Ruler: 4,
		Skywind_Cai_Shen_Da_Hai: 5,
		fishing_ICG_DRAGONBALL: 6,
		fishing_Haiba: 7,
		fishing_Hunting_Happy_Fish_5: 8,
		fishing_Hunting_Monster_Awaken: 9,
		fishing_SG: 10,
		fishing_CQ9_ONESHOT: 11,
		fishing_ICG_THE_TYRANT_AND_THE_PRINCESS: 12,
		ICG_FISHING_OF_SAVIORS: 13
	},
	[defCurrencyList.MYR]: {
		fishing_SGW_WAR: 1,
		fishing_CQ9_PARADISE: 2,
		fishing_GGYL_WORLD: 3,
		Skywind_Ocean_Ruler: 4,
		Skywind_Cai_Shen_Da_Hai: 5,
		fishing_ICG_DRAGONBALL: 6,
		fishing_Haiba: 7,
		fishing_Hunting_Happy_Fish_5: 8,
		fishing_Hunting_Monster_Awaken: 9
	},
	[defCurrencyList.IDR]: {
		fishing_SGW_WAR: 1,
		fishing_CQ9_PARADISE: 2,
		fishing_GGYL_WORLD: 3,
		Skywind_Ocean_Ruler: 4,
		Skywind_Cai_Shen_Da_Hai: 5,
		fishing_ICG_DRAGONBALL: 6,
		fishing_Haiba: 7,
		fishing_Hunting_Happy_Fish_5: 8,
		fishing_Hunting_Monster_Awaken: 9
	},
	[defCurrencyList.INR]: {
		fishing_SGW_WAR: 1,
		fishing_CQ9_PARADISE: 2,
		fishing_GGYL_WORLD: 3,
		Skywind_Ocean_Ruler: 4,
		Skywind_Cai_Shen_Da_Hai: 5,
		fishing_ICG_DRAGONBALL: 6,
		fishing_Haiba: 7,
		fishing_Hunting_Happy_Fish_5: 8,
		fishing_Hunting_Monster_Awaken: 9,
		fishing_SG: 10,
		fishing_CQ9_ONESHOT: 11,
		fishing_ICG_THE_TYRANT_AND_THE_PRINCESS: 12,
		ICG_FISHING_OF_SAVIORS: 13
	}
};

const defSortGames = {
	[defCurrencyList.THB]: {
		games_MPoker: 1,
		games_AMBpoker: 2,
		games_VGaming: 3,
		games_MaxGame: 4,
		games_kingMaker: 5,
		games_VirtualGame: 6
	},
	[defCurrencyList.MYR]: {
		games_MPoker: 1,
		games_AMBpoker: 2,
		games_VGaming: 3,
		games_MaxGame: 4,
		games_kingMaker: 5,
		games_VirtualGame: 6
	},
	[defCurrencyList.IDR]: {
		games_MPoker: 1,
		games_AMBpoker: 2,
		games_VGaming: 3,
		games_MaxGame: 4,
		games_kingMaker: 5,
		games_VirtualGame: 6
	},
	[defCurrencyList.INR]: {
		games_MPoker: 1,
		games_AMBpoker: 2,
		games_VGaming: 3,
		games_MaxGame: 4,
		games_kingMaker: 5,
		games_VirtualGame: 6
	},
	[defCurrencyList.BDT]: {
		games_MPoker: 1,
		games_AMBpoker: 2,
		games_VGaming: 3,
		games_MaxGame: 4,
		games_kingMaker: 5,
		games_VirtualGame: 6
	}
};

export const defMenuType = {
	entPage: "entPage",
	Link: "Link",
	LinkNoImg: "LinkNoImg",
	DirectUrl: "DirectUrl",
	useGoToGame: "useGoToGame"
};

export const defSubListClassName = {
	home: "homeList",
	appDownload: "appList",
	sports: "sportsList",
	exchange: "exchangeList",
	esports: "eSportsList",
	slot: "casinoList",
	casino: "livecasinoList",
	poker: "pokerList",
	game: "tableList",
	lottery: "gameList",
	fishing: "fishList",
	promotion: "promoList",
	tv: "tvList",
	vip: "vipList",
	ranking: "rankingList",
	sponsor: "homeList",
	worldCup: "eventList",
	cryptoSports: "cryptoList"
};

export const defMenuLinks = {
	home: {
		className: "icon icon-home",
		path: path.home.root,
		subMenu: [
			{
				displayKey: "lbl_Vip",
				listNpcImgUrl: "home-vip.png",
				listBgImgUrl: "vipbg.png",
				menuType: defMenuType.Link,
				path: path.vip.root,
				allowCurrencies: allowedCurrencyList.VIP
			},
			// {
			// 	displayKey: "lbl_Live_Sports",
			// 	listNpcImgUrl: "home-livesports.png",
			// 	listBgImgUrl: "livesportsbg.png",
			// 	menuType: defMenuType.Link,
			// 	path: path.streaming.root
			// },
			// {
			// 	displayKey: "lbl_Movie_TV",
			// 	listNpcImgUrl: "home-movie.png",
			// 	listBgImgUrl: "moviebg.png",
			// 	menuType: defMenuType.DirectUrl,
			// 	path: "http://nova88vip.com/"
			// },
			{
				displayKey: "lbl_Leaderboard",
				listNpcImgUrl: "home-ranking.png",
				listBgImgUrl: "rankingbg.png",
				menuType: defMenuType.Link,
				path: path.leaderBoard.root,
				allowCurrencies: [...getLeaderBoardSupportCurrencyId()]
			},
			{
				displayKey: "lbl_Referral",
				listNpcImgUrl: "home-refer.png",
				listBgImgUrl: "referbg.png",
				menuType: defMenuType.entPage,
				needLogin: true,
				path: path.referral.root
			}
		]
	},
	rewards: {
		className: "reward",
		allowCurrencies: allowedCurrencyList.rewards,
		href: `${config.openURL}/rewards/`
	},
	sports: {
		displayKey: "lbl_Sports",
		className: "sportsbtn",
		path: path.sports.root,
		// productInfo: productList.sports,
		productInfo: {
			provider: "saba",
			type: "soccer",
			...productList.sports
		},
		filterByAuth: true,
		customSort: defSortSports,
		subMenu: [
			{
				displayKey: "lbl_cryptoSports",
				listNpcImgUrl: "cryptosportNPC.png",
				menuType: defMenuType.entPage,
				...productList.cryptoSports,
				keyName: "cryptoSports",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.sports_cryptoSports
					})
				]
			},
			{
				path: path.sports.root,
				displayKey: "lbl_Soccer",
				listNpcImgUrl: "soccerNPC.png",
				listBgImgUrl: "soccerBG.png",
				menuType: defMenuType.Link,
				// parameter: { ...productList.soccer },
				parameter: { provider: "saba", type: "soccer" },
				...productList.soccer,
				keyName: "soccer"
			},
			{
				path: path.sports.root,
				displayKey: "lbl_SabaSoccer",
				listNpcImgUrl: "sabssoccerNPC.png",
				listBgImgUrl: "soccerBG.png",
				menuType: defMenuType.Link,
				// parameter: { ...productList.sabaSoccer },
				parameter: { provider: "saba", type: "saba-soccer" },
				...productList["saba-soccer"],
				keyName: "sabaSoccer"
			},
			{
				path: path.sports.root,
				displayKey: "lbl_Basketball",
				listNpcImgUrl: "basketballNPC.png",
				listBgImgUrl: "basketballBG.png",
				menuType: defMenuType.Link,
				// parameter: { ...productList.basketball },
				parameter: { provider: "saba", type: "basketball" },
				...productList.basketball,
				keyName: "basketball"
			},
			{
				path: path.sports.root,
				displayKey: "lbl_Cricket",
				listNpcImgUrl: "cricketNPC.png",
				listBgImgUrl: "cricketBG.png",
				menuType: defMenuType.Link,
				// parameter: { ...productList.cricket },
				parameter: { provider: "saba", type: "cricket" },
				...productList.cricket,
				keyName: "cricket",
				allowCurrencies: allowedCurrencyList.sportsCricket
			},
			{
				path: path.sports.root,
				displayKey: "lbl_Badminton",
				listNpcImgUrl: "badmintonNPC.png",
				listBgImgUrl: "badmintonBG.png",
				menuType: defMenuType.Link,
				parameter: { provider: "saba", type: "badminton" },
				...productList.badminton,
				keyName: "badminton"
			},
			{
				path: path.sports.root,
				displayKey: "lbl_Volleyball",
				listNpcImgUrl: "volleyballNPC.png",
				listBgImgUrl: "volleyballBG.png",
				menuType: defMenuType.Link,
				parameter: { provider: "saba", type: "volleyball" },
				...productList.volleyball,
				keyName: "volleyball",
				allowCurrencies: allowedCurrencyList.sportsVolleyball
			},
			{
				path: path.sports.root,
				displayKey: "lbl_Virtual_Sports",
				listNpcImgUrl: "betradarsoccerNPC.png",
				listBgImgUrl: "soccerBG.png",
				menuType: defMenuType.Link,
				// parameter: { ...productList.virtualSports },
				parameter: { provider: "saba", type: "virtual-sports" },
				...productList["virtual-sports"],
				keyName: "virtualSports",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.sports_virtualSports
					})
				]
			}
		]
	},
	exchange: {
		displayKey: "lbl_Exchange",
		className: "exchange",
		allowCurrencies: allowedCurrencyList.exchange,
		subMenu: [
			{
				...productList._9WSports,
				displayKey: "lbl_9W",
				listNpcImgUrl: "9wnpc.png",
				listBgImgUrl: "cricketBG.png",
				menuType: defMenuType.useGoToGame,
				parameter: { ...productList._9WSports },
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.Sports_9W
					})
				],
				keyName: "_9WSports",
				needLogin: true
			}
		]
	},
	esports: {
		displayKey: "lbl_eSports",
		className: "eSportsbtn",
		path: path.eSport.root,
		subMenu: [
			{
				displayText: "Saba",
				listNpcImgUrl: "esportSABA.png",
				listBgImgUrl: "eSportsListHover.png",
				menuType: defMenuType.entPage,
				parameter: { ...productList.eSportAll },
				...productList.eSportAll,
				lobbyPage: {
					bgImg: "esposts-saba.png",
					hoverBgImg: "esposts-sabaa.png"
				}
			},
			// {
			// 	displayKey: "lbl_Dota2",
			// 	listNpcImgUrl: "esportDOTA2.png",
			// 	listBgImgUrl: "eSportsListHover.png",
			// 	menuType: defMenuType.entPage,
			// 	parameter: { ...productList.eSport_DOTA2 },
			// 	...productList.eSport_DOTA2,
			// 	lobbyPage: {
			// 		bgImg: "esposts-dota.png",
			// 		hoverBgImg: "esposts-dotaa.png"
			// 	}
			// },
			// {
			// 	displayKey: "lbl_LOL",
			// 	listNpcImgUrl: "esportLOL.png",
			// 	listBgImgUrl: "eSportsListHover.png",
			// 	menuType: defMenuType.entPage,
			// 	parameter: { ...productList.eSport_LOL },
			// 	...productList.eSport_LOL,
			// 	lobbyPage: {
			// 		bgImg: "esposts-lol.png",
			// 		hoverBgImg: "esposts-lola.png"
			// 	}
			// },
			// {
			// 	displayKey: "lbl_CSGO",
			// 	listNpcImgUrl: "esportCS.png",
			// 	listBgImgUrl: "eSportsListHover.png",
			// 	menuType: defMenuType.entPage,
			// 	parameter: { ...productList.eSport_CSGO },
			// 	...productList.eSport_CSGO,
			// 	lobbyPage: {
			// 		bgImg: "esposts-cs.png",
			// 		hoverBgImg: "esposts-csa.png"
			// 	}
			// },
			// {
			// 	displayKey: "lbl_Kog",
			// 	listNpcImgUrl: "esportKOG.png",
			// 	listBgImgUrl: "eSportsListHover.png",
			// 	menuType: defMenuType.entPage,
			// 	parameter: { ...productList.eSport_KOG },
			// 	...productList.eSport_KOG,
			// 	lobbyPage: {
			// 		bgImg: "esposts-kog.png",
			// 		hoverBgImg: "esposts-koga.png"
			// 	}
			// },
			{
				displayText: "IM E-Sports",
				listNpcImgUrl: "esportInplayMatrix.png",
				listBgImgUrl: "eSportsListHover.png",
				menuType: defMenuType.entPage,
				parameter: { ...productList.eSport_IM },
				...productList.eSport_IM,
				lobbyPage: {
					bgImg: "esposts-inplaymatrix.png",
					hoverBgImg: "esposts-inplaymatrixa.png"
				},
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.IM
					})
				]
			}
		]
	},
	casino: {
		displayKey: "lbl_LiveCasino",
		className: "livecasinobtn icon icon-newicon",
		path: path.liveCasino.root,
		filterByAuth: true,
		checkBeforeLogin: true,
		customSort: defSortCasino,
		subMenu: [
			{
				...productList.liveCasino_PP,
				keyName: "casino_PP",
				className: "livePP",
				icon: "icon icon-PP",
				displayText: "Pragmatic Play",
				listNpcImgUrl: "casino-PP.png",
				listBgImgUrl: ["ppBG.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage,
				lobbyPage: { npcImg: "casino_pp" },
				allowCurrencies: getPPAllowCurrencies()
			},
			{
				...productList.liveCasino_BG,
				keyName: "casino_BG",
				className: "liveBG",
				icon: "icon icon-BG",
				displayText: "Big Gaming",
				listNpcImgUrl: "casino-bg.png",
				listBgImgUrl: ["bgbg.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage,
				lobbyPage: { npcImg: "casino_bg" },
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.liveCasino_BG
					})
				]
			},
			{
				...productList.liveCasino_YeeBet,
				keyName: "casino_yb",
				className: "casino-yb",
				icon: "",
				displayText: "YeeBet",
				listNpcImgUrl: "casino-yb.png",
				listBgImgUrl: ["ybBG.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage,
				lobbyPage: { npcImg: "casino_yb" },
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.yee_bet
					})
				]
			},
			{
				...productList.liveCasino_Skywind,
				keyName: "casino_Skywind",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.skywind
					})
				],
				displayText: "Skywind",
				listNpcImgUrl: "casino-SK.png",
				listBgImgUrl: ["skbg.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage,
				lobbyPage: { npcImg: "casino_sk" }
			},
			{
				keyName: "casino_MG",
				displayText: "Microgaming",
				menuType: defMenuType.entPage,
				listNpcImgUrl: "casino-mg.png",
				listBgImgUrl: ["mgbg.png", "livecasinListHover.png"],
				...productList.liveCasino_MG,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.liveCasino_mg
					})
				],
				lobbyPage: { npcImg: "casino_mg" }
			},
			{
				keyName: "casino_EVO",
				displayText: "Evolution Gaming",
				listNpcImgUrl: "casino-ev.png",
				listBgImgUrl: ["evbg.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage,
				...productList.liveCasino_EVO,
				lobbyPage: { npcImg: "casino_ev" },
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.liveCasino_EVO
					})
				]
			},
			// 新的 PlayTech (Seamless Wallet)
			{
				keyName: "casino_PT",
				displayText: "PlayTech",
				listNpcImgUrl: "casino-pt.png",
				listBgImgUrl: ["ptbg.png", "livecasinListHover.png"],
				...productList.liveCasino_PlayTech,
				lobbyPage: { npcImg: "casino_pt" }
			},
			{
				keyName: "casino_N2LIVE",
				displayText: "n2-LIVE",
				listNpcImgUrl: "casino-n2.png",
				listBgImgUrl: ["n2bg.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage,
				...productList.liveCasino_N2,
				lobbyPage: { npcImg: "casino_n2" }
			},
			{
				keyName: "casino_WM",
				className: "liveWM",
				icon: "icon icon-WM",
				displayText: "WM Casino",
				listNpcImgUrl: "casino-WM.png",
				listBgImgUrl: ["wmBG.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage,
				allowCurrencies: allowedCurrencyList.casino_WM,
				...productList.liveCasino_WM,
				lobbyPage: { npcImg: "casino_wm" }
			},
			{
				keyName: "casino_ALBET",
				className: "liveALL",
				icon: "icon icon-AB",
				displayText: "Allbet",
				listNpcImgUrl: "casino-ALL.png",
				listBgImgUrl: ["allBG.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage,
				...productList.liveCasino_Allbet,
				lobbyPage: { npcImg: "casino_ab" },
				allowCurrencies: allowedCurrencyList.allbet
			},
			{
				keyName: "casino_EBET",
				className: "liveEB",
				icon: "icon icon-EB",
				displayText: "eBET",
				listNpcImgUrl: "casino-EB.png",
				listBgImgUrl: ["ebBG.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage,
				...productList.liveCasino_eBET,
				lobbyPage: { npcImg: "casino_eb" }
			},
			{
				keyName: "casino_SA",
				className: "liveSA",
				icon: "icon icon-SA",
				displayText: "SA Gaming",
				listNpcImgUrl: "casino-SA.png",
				listBgImgUrl: ["saBG.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage,
				...productList.liveCasino_SA,
				lobbyPage: { npcImg: "casino_sa" }
			},
			{
				keyName: "casino_AE",
				className: "liveAE",
				icon: "icon icon-AE",
				displayText: "AE Sexy",
				listNpcImgUrl: "casino-AE.png",
				listBgImgUrl: ["aeBG.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage,
				...productList.liveCasino_AE,
				lobbyPage: { npcImg: "casino_ae" }
			},
			{
				keyName: "casino_DG",
				className: "liveDG",
				icon: "icon icon-DG",
				displayText: "Dream Gaming",
				listNpcImgUrl: "casino-DG.png",
				listBgImgUrl: ["dgBG.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage,
				...productList.liveCasino_DG,
				lobbyPage: { npcImg: "casino_dg" }
			},
			{
				keyName: "casino_AG",
				className: "liveAG",
				icon: "icon icon-AG",
				displayText: "Asia Gaming",
				listNpcImgUrl: "casino-ag.png",
				listBgImgUrl: ["agBG.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage,
				...productList.liveCasino_AG,
				lobbyPage: { npcImg: "casino_ag" }
			}
		]
	},
	slot: {
		displayKey: "lbl_Slots",
		className: "slotbtn",
		path: path.casino.root,
		filterByAuth: true,
		customSort: defSortSlot,
		checkBeforeLogin: true,
		subMenu: [
			{
				keyName: "slot_PP",
				icon: "icon icon-PP",
				displayText: "Pragmatic Play",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotPP.png",
				listBgImgUrl: "slotListHover.png",
				// parameter: { ...productList.casino_PP },
				parameter: { provider: "pragmatic-play" },
				...productList.casino_PP,
				allowCurrencies: getPPAllowCurrencies()
			},
			{
				keyName: "slot_SG",
				icon: "icon icon-SG",
				displayText: "Spadegaming",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotSG.png",
				listBgImgUrl: "slotListHover.png",
				// parameter: { ...productList.casino_SG },
				parameter: { provider: "spadegaming" },
				...productList.casino_SG
			},
			{
				keyName: "slot_AdvantPlay",
				displayText: "AdvantPlay",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotap.png",
				listBgImgUrl: "slotListHover.png",
				// parameter: { ...productList.casino_AdvantPlay },
				parameter: { provider: "advant-play" },
				...productList.casino_AdvantPlay
			},
			{
				keyName: "slot_Endorphina",
				displayText: "Endorphina",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotEndorphina.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { provider: "endorphina" },
				...productList.casino_Endorphina,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.slot_endorphina
					})
				]
			},
			{
				keyName: "slot_Nextspin",
				displayText: "Nextspin",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotNextspin.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { provider: "nextspin" },
				...productList.casino_Nextspin,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.slot_nextspin
					})
				]
			},
			{
				keyName: "slot_PG",
				icon: "icon icon-PG",
				displayText: "PG Soft",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotPG.png",
				listBgImgUrl: "slotListHover.png",
				// parameter: { ...productList.casino_PG },
				parameter: { provider: "pg" },
				...productList.casino_PG
			},
			{
				keyName: "slot_MGPSW",
				displayText: "Microgaming",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotmg.png",
				listBgImgUrl: "slotListHover.png",
				// parameter: { ...productList.casino_MGPSW },
				parameter: { provider: "microgaming" },
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.casino_MGPSW
					})
				],
				...productList.casino_MGPSW
			},
			{
				keyName: "slot_JI",
				icon: "icon icon-PT",
				displayText: "Jili",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotji.png",
				listBgImgUrl: "slotListHover.png",
				// parameter: { ...productList.casino_JILI },
				parameter: { provider: "jili" },
				...productList.casino_JILI
			},
			{
				keyName: "slot_SPRIBE",
				displayText: "SPRIBE",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotSPRIBE.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { provider: "spribe" },
				...productList.casino_SPRIBE,
				allowCurrencies: allowedCurrencyList.SPRIBE,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.IM
					})
				]
			},
			{
				keyName: "slot_JOKER",
				icon: "icon icon-JOKER",
				displayText: "Joker",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotJOKER.png",
				listBgImgUrl: "slotListHover.png",
				// parameter: { ...productList.casino_JOKER },
				parameter: { provider: "joker" },
				...productList.casino_JOKER,
				allowCurrencies: allowedCurrencyList.slotJoker
			},
			{
				keyName: "slot_RedTiger",
				displayText: "Red Tiger",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotrt.png",
				listBgImgUrl: "slotListHover.png",
				// parameter: { ...productList.casino_RedTiger },
				parameter: { provider: "red-tiger" },
				...productList.casino_RedTiger,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.casino_RedTiger
					})
				]
			},
			{
				keyName: "slot_NetEnt",
				displayText: "NetEnt",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotnt.png",
				listBgImgUrl: "slotListHover.png",
				// parameter: { ...productList.casino_NetEnt },
				parameter: { provider: "netent" },
				...productList.casino_NetEnt,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.casino_NetEnt
					})
				]
			},
			{
				keyName: "slot_CQ9",
				icon: "icon icon-cq9",
				displayText: "CQ9",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotCQ9.png",
				listBgImgUrl: "slotListHover.png",
				// parameter: { ...productList.casino_CQ9 },
				parameter: { provider: "cq9" },
				...productList.casino_CQ9
			},
			{
				keyName: "slot_PNG",
				icon: "icon icon-png",
				displayText: "Play' n GO",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotPlayngo.png",
				listBgImgUrl: "slotListHover.png",
				// parameter: { ...productList.casino_PNG },
				parameter: { provider: "png" },
				...productList.casino_PNG
			},
			{
				keyName: "slot_GPI",
				icon: "icon icon-GPI",
				displayText: "Game Play",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotGPI.png",
				listBgImgUrl: "slotListHover.png",
				// parameter: { ...productList.casino_GPI },
				parameter: { provider: "gpi" },
				...productList.casino_GPI
			},
			{
				keyName: "slot_YGG",
				icon: "icon icon-YGG",
				displayText: "YGGDrassil",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotYGG.png",
				listBgImgUrl: "slotListHover.png",
				// parameter: { ...productList.casino_YGG },
				parameter: { provider: "ygg" },
				...productList.casino_YGG
			},
			{
				keyName: "slot_AMB",
				icon: "icon icon-AMB",
				displayText: "AMBSlot",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotam.png",
				listBgImgUrl: "slotListHover.png",
				// parameter: { ...productList.casino_AMB },
				parameter: { provider: "amb" },
				...productList.casino_AMB,
				allowCurrencies: allowedCurrencyList.slotAMB,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.casino_AMB
					})
				]
			},
			{
				keyName: "slot_Habanero",
				displayText: "Habanero",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotho.png",
				listBgImgUrl: "slotListHover.png",
				// parameter: { ...productList.casino_Habanero },
				parameter: { provider: "habanero" },
				...productList.casino_Habanero,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.casino_Habanero
					})
				]
			},
			{
				keyName: "slot_SimplePlay",
				displayText: "SimplePlay",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotSimplePlay.png",
				listBgImgUrl: "slotListHover.png",
				// parameter: { ...productList.casino_SimplePlay },
				parameter: { provider: "simple-play" },
				...productList.casino_SimplePlay,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.casino_SimplePlay
					})
				]
			},
			{
				keyName: "slot_Skywind",
				displayText: "Skywind",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotsk.png",
				listBgImgUrl: "slotListHover.png",
				// parameter: { ...productList.casino_Skywind },
				parameter: { provider: "skywind" },
				...productList.casino_Skywind,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.skywind
					})
				]
			},
			// 新的 PlayTech (Seamless Wallet)
			{
				keyName: "slot_PT",
				icon: "icon icon-PT",
				displayText: "PlayTech",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotpt.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { provider: "playtech" },
				...productList.casino_PlayTech
			}
			// {
			// 	keyName: "slot_Mega888",
			// 	displayText: "Mega888",
			// 	menuType: defMenuType.Link,
			// 	path: path.mega888.root,
			// 	listNpcImgUrl: "slotMEGA888.png",
			// 	listBgImgUrl: "slotListHover.png",
			// 	...productList.mega888
			// },
			// {
			// 	keyName: "slot_ICG",
			// 	icon: "icon icon-ICG",
			// 	displayText: "Astro Tech",
			// 	menuType: defMenuType.Link,
			// 	listNpcImgUrl: "slotICG.png",
			// 	listBgImgUrl: "slotListHover.png",
			// 	// parameter: { ...productList.casino_ICG },
			// 	parameter: { provider: "astro-tech" },
			// 	...productList.casino_ICG
			// },
			// {
			// 	keyName: "slot_OW",
			// 	icon: "icon icon-OW",
			// 	displayText: "Saba Casino",
			// 	menuType: defMenuType.entPage,
			// 	listNpcImgUrl: "slotOW.png",
			// 	listBgImgUrl: "slotListHover.png",
			// 	...productList.casino_OW
			// }
		]
	},
	// poker: {
	// 	displayKey: "lbl_Poker",
	// 	className: "pokerbtn",
	// 	allowCurrencies: allowedCurrencyList.oneGame
	// },
	game: {
		displayKey: "lbl_Games",
		path: path.game.root,
		filterByAuth: true,
		customSort: defSortGames,
		subMenu: [
			{
				keyName: "games_MPoker",
				className: "mp",
				listNpcImgUrl: "mp.png",
				listBgImgUrl: "tablelisthover.png",
				displayText: "MPoker",
				menuType: defMenuType.entPage,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.Games_MPoker
					})
				],
				...productList.games_MPoker,
				parameter: { ...productList.games_MPoker },
				lobbyPage: {
					bgImg: "gamemp.png",
					hoverBgImg: "gamempa.png"
				},
				allowCurrencies: allowedCurrencyList.mPoker
			},
			{
				keyName: "games_AMBpoker",
				className: "fsgw",
				listNpcImgUrl: "am.png",
				listBgImgUrl: "tablelisthover.png",
				displayKey: "lbl_AMB_Poker",
				menuType: defMenuType.entPage,
				...productList.games_AMBPoker,
				parameter: { ...productList.games_AMBPoker },
				lobbyPage: {
					bgImg: "gameamb.png",
					hoverBgImg: "gameamba.png"
				},
				allowCurrencies: allowedCurrencyList.amb
			},
			{
				keyName: "games_VGaming",
				className: "fsgw",
				listNpcImgUrl: "vg.png",
				listBgImgUrl: "tablelisthover.png",
				displayKey: "lbl_Vgaming",
				menuType: defMenuType.entPage,
				...productList.sabaClub,
				parameter: { ...productList.sabaClub },
				lobbyPage: {
					bgImg: "gamevg.png",
					hoverBgImg: "gamevga.png"
				},
				allowCurrencies: allowedCurrencyList.vGaming
			},
			{
				keyName: "games_kingMaker",
				className: "fsgw",
				listNpcImgUrl: "km.png",
				listBgImgUrl: "tablelisthover.png",
				displayKey: "lbl_King_Maker",
				menuType: defMenuType.entPage,
				...productList.games_kingMaker,
				parameter: { ...productList.games_kingMaker },
				lobbyPage: {
					bgImg: "gamekim.png",
					hoverBgImg: "gamekima.png"
				}
			},
			{
				keyName: "games_im_aviator",
				className: "fsgw",
				listNpcImgUrl: "gameSpribeAviator.png",
				listBgImgUrl: "tablelisthover.png",
				displayText: "Aviator",
				menuType: defMenuType.entPage,
				...productList.games_im_avaitor,
				parameter: { ...productList.games_im_avaitor },
				lobbyPage: {
					bgImg: "gamespribe-aciator.png",
					hoverBgImg: "gamespribe-aciatora.png"
				},
				allowCurrencies: allowedCurrencyList.SPRIBE,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.IM
					})
				]
			},
			{
				keyName: "games_im_mines",
				className: "fsgw",
				listNpcImgUrl: "gameSpribeMines.png",
				listBgImgUrl: "tablelisthover.png",
				displayText: "Mines",
				menuType: defMenuType.entPage,
				...productList.games_im_mines,
				parameter: { ...productList.games_im_mines },
				lobbyPage: {
					bgImg: "gamespribe-mines.png",
					hoverBgImg: "gamespribe-minesa.png"
				},
				allowCurrencies: allowedCurrencyList.SPRIBE,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.IM
					})
				]
			},
			{
				keyName: "games_im_goal",
				className: "fsgw",
				listNpcImgUrl: "gameSpribeGoal.png",
				listBgImgUrl: "tablelisthover.png",
				displayText: "Goal",
				menuType: defMenuType.entPage,
				...productList.games_im_goal,
				parameter: { ...productList.games_im_goal },
				lobbyPage: {
					bgImg: "gamespribe-goal.png",
					hoverBgImg: "gamespribe-goala.png"
				},
				allowCurrencies: allowedCurrencyList.SPRIBE,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.IM
					})
				]
			},
			{
				keyName: "games_im_dice",
				className: "fsgw",
				listNpcImgUrl: "gameSpribeDice.png",
				listBgImgUrl: "tablelisthover.png",
				displayText: "Dice",
				menuType: defMenuType.entPage,
				...productList.games_im_dice,
				parameter: { ...productList.games_im_dice },
				lobbyPage: {
					bgImg: "gamespribe-dice.png",
					hoverBgImg: "gamespribe-dicea.png"
				},
				allowCurrencies: allowedCurrencyList.SPRIBE,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.IM
					})
				]
			},
			{
				keyName: "games_Spaceman",
				className: "fsgw",
				listNpcImgUrl: "pp.png",
				listBgImgUrl: "tablelisthover.png",
				displayText: "Spaceman",
				menuType: defMenuType.entPage,
				...productList.games_Spaceman,
				parameter: { ...productList.games_Spaceman },
				lobbyPage: {
					bgImg: "gamepp.png",
					hoverBgImg: "gameppa.png"
				},
				allowCurrencies: allowedCurrencyList.spaceman
			},
			{
				keyName: "games_Crash",
				className: "fsgw",
				listNpcImgUrl: "ap.png",
				listBgImgUrl: "tablelisthover.png",
				displayText: "Crash",
				menuType: defMenuType.entPage,
				...productList.games_Crash,
				parameter: { ...productList.games_Crash },
				lobbyPage: {
					bgImg: "gameap.png",
					hoverBgImg: "gameapa.png"
				}
			},
			{
				keyName: "games_GoRush",
				className: "fsgw",
				listNpcImgUrl: "jili.png",
				listBgImgUrl: "tablelisthover.png",
				displayText: "Go Rush",
				menuType: defMenuType.entPage,
				...productList.games_GoRush,
				parameter: { ...productList.games_GoRush },
				lobbyPage: {
					bgImg: "gamejili.png",
					hoverBgImg: "gamejilia.png"
				}
			}
		]
	},
	fishing: {
		displayKey: "lbl_Fishing",
		className: "fishbtn",
		path: path.fishing.root,
		filterByAuth: true,
		checkBeforeLogin: true,
		customSort: defSortFishing,
		subMenu: [
			{
				keyName: "fishing_Haiba",
				displayKey: "lbl_Fishing_Haiba",
				listNpcImgUrl: "hb.png",
				listBgImgUrl: "fishListHover.png",
				menuType: defMenuType.entPage,
				...productList.fishing_Haiba,
				parameter: { ...productList.fishing_Haiba },
				lobbyPage: {
					bgImg: "fishhb.png",
					hoverBgImg: "fishhba.png"
				},
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.fishing_Joker
					})
				],
				allowCurrencies: allowedCurrencyList.fishingHaiba
			},
			{
				keyName: "fishing_Hunting_Happy_Fish_5",
				displayKey: "lbl_Fishing_Hunting_Happy_Fish_5",
				listNpcImgUrl: "hf5.png",
				listBgImgUrl: "fishListHover.png",
				menuType: defMenuType.entPage,
				...productList.fishing_Hunting_Happy_Fish_5,
				parameter: { ...productList.fishing_Hunting_Happy_Fish_5 },
				lobbyPage: {
					bgImg: "fishhf.png",
					hoverBgImg: "fishhfa.png"
				},
				allowCurrencies: allowedCurrencyList.happyFish5
			},
			{
				keyName: "fishing_Hunting_Monster_Awaken",
				displayKey: "lbl_Fishing_Hunting_Monster_Awaken",
				listNpcImgUrl: "ma.png",
				listBgImgUrl: "fishListHover.png",
				menuType: defMenuType.entPage,
				...productList.fishing_Hunting_Monster_Awaken,
				parameter: { ...productList.fishing_Hunting_Monster_Awaken },
				lobbyPage: {
					bgImg: "fishma.png",
					hoverBgImg: "fishmaa.png"
				},
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.fishing_Joker
					})
				],
				allowCurrencies: allowedCurrencyList.monsterAwaken
			},
			{
				keyName: "fishing_CQ9_PARADISE",
				className: "fsgw",
				listNpcImgUrl: "paradise.png",
				listBgImgUrl: "fishListHover.png",
				displayKey: "lbl_Paradise",
				menuType: defMenuType.entPage,
				...productList.CQ9_Paradise,
				parameter: { ...productList.CQ9_Paradise },
				lobbyPage: {
					bgImg: "fishpd.png",
					hoverBgImg: "fishpda.png"
				}
			},
			{
				keyName: "fishing_GGYL_WORLD",
				className: "fgg",
				displayKey: "lbl_FishingGG",
				menuType: defMenuType.entPage,
				listNpcImgUrl: "fishGG.png",
				listBgImgUrl: "fishListHover.png",
				...productList.fishing,
				parameter: { ...productList.fishing },
				lobbyPage: {
					bgImg: "fishgg.png",
					hoverBgImg: "fishgga.png"
				}
			},
			// {
			// 	keyName: "Skywind_Ocean_Ruler",
			// 	displayKey: "Skywind_Ocean_Ruler",
			// 	menuType: defMenuType.entPage,
			// 	listNpcImgUrl: "fishSK-or.png",
			// 	listBgImgUrl: "fishListHover.png",
			// 	...productList.Skywind_Ocean_Ruler,
			// 	parameter: { ...productList.Skywind_Ocean_Ruler },
			// 	lobbyPage: {
			// 		bgImg: "fishor.png",
			// 		hoverBgImg: "fishora.png"
			// 	},
			// 	eventIcons: [
			// 		showEventIcon({
			// 			icon: defEventIcon.new,
			// 			period: defEventPeriod.skywind
			// 		})
			// 	]
			// },
			// {
			// 	keyName: "Skywind_Cai_Shen_Da_Hai",
			// 	displayKey: "Skywind_Cai_Shen_Da_Hai",
			// 	menuType: defMenuType.entPage,
			// 	listNpcImgUrl: "fishSK-casdaha.png",
			// 	listBgImgUrl: "fishListHover.png",
			// 	...productList.Skywind_Cai_Shen_Da_Hai,
			// 	parameter: { ...productList.Skywind_Cai_Shen_Da_Hai },
			// 	lobbyPage: {
			// 		bgImg: "fishcai.png",
			// 		hoverBgImg: "fishcaia.png"
			// 	},
			// 	eventIcons: [
			// 		showEventIcon({
			// 			icon: defEventIcon.new,
			// 			period: defEventPeriod.skywind
			// 		})
			// 	]
			// },
			{
				keyName: "fishing_SGW_WAR",
				className: "fsgw",
				displayKey: "lbl_FishingSG2",
				menuType: defMenuType.entPage,
				listNpcImgUrl: "fishSGwar.png",
				listBgImgUrl: "fishListHover.png",
				...productList.fishing_SGW,
				parameter: { ...productList.fishing_SGW },
				lobbyPage: {
					bgImg: "fishfw.png",
					hoverBgImg: "fishfwa.png"
				}
			},
			{
				keyName: "fishing_SG",
				className: "fsg",
				displayKey: "lbl_FishingSG1",
				menuType: defMenuType.entPage,
				listNpcImgUrl: "fishSG.png",
				listBgImgUrl: "fishListHover.png",
				...productList.fishing_SG,
				parameter: { ...productList.fishing_SG },
				lobbyPage: {
					bgImg: "fishfg.png",
					hoverBgImg: "fishfga.png"
				},
				allowCurrencies: allowedCurrencyList.fishingGod
			},
			{
				keyName: "fishing_CQ9_ONESHOT",
				className: "fsg",
				displayKey: "lbl_Oneshot_Fishing",
				menuType: defMenuType.entPage,
				listNpcImgUrl: "oneshotfishing.png",
				listBgImgUrl: "fishListHover.png",
				...productList.CQ9_Oneshot_Fishing,
				parameter: { ...productList.CQ9_Oneshot_Fishing },
				lobbyPage: {
					bgImg: "fishof.png",
					hoverBgImg: "fishofa.png"
				},
				allowCurrencies: allowedCurrencyList.oneShot
			}
			// {
			// 	keyName: "fishing_ICG_THE_TYRANT_AND_THE_PRINCESS",
			// 	className: "fsg",
			// 	displayKey: "lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS",
			// 	menuType: defMenuType.entPage,
			// 	listNpcImgUrl: "fishICG-TTATP.png",
			// 	listBgImgUrl: "fishListHover.png",
			// 	...productList.ICG_THE_TYRANT_AND_THE_PRINCESS,
			// 	parameter: { ...productList.ICG_THE_TYRANT_AND_THE_PRINCESS },
			// 	lobbyPage: {
			// 		bgImg: "fishtp.png",
			// 		hoverBgImg: "fishtpa.png"
			// 	},
			// 	allowCurrencies: allowedCurrencyList.tyrantAndProncess
			// },
			// {
			// 	keyName: "ICG_FISHING_OF_SAVIORS",
			// 	className: "fsg",
			// 	displayKey: "lbl_Game_ICG_FISHING_OF_SAVIORS",
			// 	menuType: defMenuType.entPage,
			// 	listNpcImgUrl: "fishICG-FOS.png",
			// 	listBgImgUrl: "fishListHover.png",
			// 	...productList.ICG_FISHING_OF_SAVIORS,
			// 	parameter: { ...productList.ICG_FISHING_OF_SAVIORS },
			// 	lobbyPage: {
			// 		bgImg: "fishfs.png",
			// 		hoverBgImg: "fishfsa.png"
			// 	},
			// 	allowCurrencies: allowedCurrencyList.fishingOfSaviors
			// }
		]
	},
	lottery: {
		displayKey: "lbl_Lottery",
		path: path.lottery.root,
		filterByAuth: true,
		checkBeforeLogin: true,
		subMenu: [
			{
				...productList.GPI_Keno,
				displayKey: "GPI_Keno",
				listNpcImgUrl: "lo-gpikeno.png",
				listBgImgUrl: "gameListHover.png",
				menuType: defMenuType.entPage,
				parameter: { ...productList.GPI_Keno },
				lobbyPage: {
					bgImg: "lotterygpikeno.png",
					hoverBgImg: "lotterygpikenoa.png"
				},
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.GPI_Lottery
					})
				]
			},
			{
				...productList.GPI_ThaiLottery,
				displayKey: "GPI_ThaiLottery",
				listNpcImgUrl: "lo-gpithai.png",
				listBgImgUrl: "gameListHover.png",
				menuType: defMenuType.entPage,
				parameter: { ...productList.GPI_ThaiLottery },
				lobbyPage: {
					bgImg: "lotterygpithai.png",
					hoverBgImg: "lotterygpithaia.png"
				},
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.GPI_Lottery
					})
				],
				allowCurrencies: allowedCurrencyList.thaiLottery
			},
			{
				...productList.GPI_Fast3,
				displayKey: "GPI_Fast3",
				listNpcImgUrl: "lo-gpifast3.png",
				listBgImgUrl: "gameListHover.png",
				menuType: defMenuType.entPage,
				parameter: { ...productList.GPI_Fast3 },
				lobbyPage: {
					bgImg: "lotterygpifast3.png",
					hoverBgImg: "lotterygpifast3a.png"
				},
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.GPI_Lottery
					})
				],
				allowCurrencies: allowedCurrencyList.fast3
			},
			{
				...productList.tcg,
				className: "indo",
				displayKey: "lbl_TcGame",
				listNpcImgUrl: "lo-tcg.png",
				listBgImgUrl: "gameListHover.png",
				menuType: defMenuType.entPage,
				parameter: { ...productList.tcg },
				lobbyPage: {
					bgImg: "lotterytc.png",
					hoverBgImg: "lotterytca.png"
				}
			},
			{
				...productList.keno,
				className: "keno",
				displayKey: "lbl_Keno",
				listNpcImgUrl: "lo-keno.png",
				listBgImgUrl: "gameListHover.png",
				menuType: defMenuType.entPage,
				parameter: { ...productList.keno },
				lobbyPage: {
					bgImg: "lotteryke.png",
					hoverBgImg: "lotterykea.png"
				}
			},
			{
				...productList.lottery,
				className: "lottery",
				displayKey: "lbl_Lottery",
				listNpcImgUrl: "lo-lottery.png",
				listBgImgUrl: "gameListHover.png",
				menuType: defMenuType.entPage,
				parameter: { ...productList.lottery },
				lobbyPage: {
					bgImg: "lotterylo.png",
					hoverBgImg: "lotteryloa.png"
				}
			},
			{
				...productList["number-game"],
				path: path.sports.root,
				className: "numberGame",
				displayKey: "lbl_NumberGame",
				listNpcImgUrl: "lo-numberGame.png",
				listBgImgUrl: "gameListHover.png",
				menuType: defMenuType.Link,
				// parameter: { ...productList.numberGame },
				parameter: { provider: "saba", type: "number-game" },
				lobbyPage: {
					bgImg: "lotterynu.png",
					hoverBgImg: "lotterynua.png"
				}
			},
			{
				...productList.tablegame,
				displayKey: "lbl_TableGame",
				listNpcImgUrl: "lo-tableGame.png",
				listBgImgUrl: "gameListHover.png",
				menuType: defMenuType.entPage,
				parameter: { ...productList.tablegame },
				lobbyPage: {
					bgImg: "lotteryta.png",
					hoverBgImg: "lotterytaa.png"
				}
			}
			// {
			// 	...productList.indo4D,
			// 	className: "indo",
			// 	displayKey: "lbl_Indo4D",
			// 	listNpcImgUrl: "lo-indo.png",
			// 	listBgImgUrl: "gameListHover.png",
			// 	menuType: defMenuType.entPage,
			// 	parameter: { ...productList.indo4D },
			// 	lobbyPage: {
			// 		bgImg: "lottery4d.png",
			// 		hoverBgImg: "lottery4da.png"
			// 	},
			// 	allowCurrencies: changeAllowCurrenciesByTime({
			// 		allowCurriesList: allowedCurrencyList.indo4d,
			// 		currencies: [defCurrencyList.IDR],
			// 		endTime: "2023-03-29 19:00:00"
			// 	})
			// }
		]
	},
	promotion: {
		displayKey: "lbl_Promos",
		path: path.promotion.root,
		eventIcons: [
			showEventIcon({
				icon: defEventIcon.hot,
				period: defEventPeriod.promo
			})
		]
	},
	vip: {
		displayKey: "lbl_Vip",
		path: path.vip.root,
		allowCurrencies: allowedCurrencyList.VIP
	},
	// sponsor: {
	// 	displayKey: "lbl_Sponsor",
	// 	path: path.sponsor.root,
	// 	subMenu: [
	// 		{
	// 			displayKey: "lbl_JOE_COLE",
	// 			listNpcImgUrl: "sponsors-joe.png",
	// 			listBgImgUrl: "ambassadorbg.png",
	// 			menuType: defMenuType.DirectUrl,
	// 			path: "https://www.joecole.club"
	// 		},
	// 		{
	// 			displayKey: "lbl_Sponsor",
	// 			listNpcImgUrl: "sponsors-amber.png",
	// 			listBgImgUrl: "ambassadorbg.png",
	// 			menuType: defMenuType.Link,
	// 			path: path.sponsor.root
	// 		}
	// 	]
	// },
	// tv: {
	// 	displayKey: "lbl_TV",
	// 	className: "tvbtn",
	// 	path: "http://nova88vip.com/",
	// 	eventIcons: [
	// 		showEventIcon({
	// 			icon: defEventIcon.live,
	// 			period: defEventPeriod.tv
	// 		})
	// 	],
	// 	subMenu: [
	// 		{
	// 			displayKey: "lbl_MOVIE_TV",
	// 			listNpcImgUrl: "home-movie.png",
	// 			listBgImgUrl: "moviebg.png",
	// 			menuType: defMenuType.DirectUrl,
	// 			path: "http://nova88vip.com/"
	// 		}
	// 	]
	// },
	ranking: {
		displayKey: "lbl_Leaderboard",
		path: path.leaderBoard.root,
		allowCurrencies: [...getLeaderBoardSupportCurrencyId()]
	}
};
