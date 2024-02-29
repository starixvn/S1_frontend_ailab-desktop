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
		casino_EBET: 12
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
		casino_EBET: 12
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
		casino_EBET: 12
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
		casino_EBET: 12
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
		casino_EBET: 11
	}
};

const defSortSlot = {
	[defCurrencyList.THB]: {
		slot_PP: 1,
		slot_SG: 2,
		slot_AdvantPlay: 3,
		slot_PG: 4,
		slot_BNG: 5,
		slot_FaChai: 6,
		slot_MGPSW: 7,
		slot_JI: 8,
		slot_SPRIBE: 9,
		slot_JOKER: 10,
		slot_RedTiger: 11,
		slot_NetEnt: 12,
		slot_CQ9: 13,
		slot_PNG: 14,
		slot_GPI: 15,
		slot_YGG: 16,
		slot_AMB: 17,
		slot_Habanero: 18,
		slot_SimplePlay: 19,
		slot_Skywind: 20,
		slot_PT: 21
		// slot_ICG: 17,
		// slot_OW: 18
	},
	[defCurrencyList.MYR]: {
		slot_PP: 1,
		slot_SG: 2,
		slot_AdvantPlay: 3,
		slot_PG: 4,
		slot_BNG: 5,
		slot_FaChai: 6,
		slot_MGPSW: 7,
		slot_JI: 8,
		slot_SPRIBE: 9,
		slot_JOKER: 10,
		slot_PEGASUS: 11,
		slot_RedTiger: 12,
		slot_NetEnt: 13,
		slot_CQ9: 14,
		slot_PNG: 15,
		slot_GPI: 16,
		slot_YGG: 17,
		slot_AMB: 18,
		slot_Habanero: 19,
		slot_SimplePlay: 20,
		slot_Skywind: 21,
		slot_PT: 22
		// slot_ICG: 17,
		// slot_OW: 18
	},
	[defCurrencyList.IDR]: {
		slot_PP: 1,
		slot_SG: 2,
		slot_AdvantPlay: 3,
		slot_PG: 4,
		slot_BNG: 5,
		slot_FaChai: 6,
		slot_MGPSW: 7,
		slot_JI: 8,
		slot_SPRIBE: 9,
		slot_JOKER: 10,
		slot_RedTiger: 11,
		slot_NetEnt: 12,
		slot_CQ9: 13,
		slot_PNG: 14,
		slot_GPI: 15,
		slot_YGG: 16,
		slot_AMB: 17,
		slot_Habanero: 18,
		slot_SimplePlay: 19,
		slot_Skywind: 20,
		slot_PT: 21
	},
	[defCurrencyList.INR]: {
		slot_PP: 1,
		slot_SG: 2,
		slot_AdvantPlay: 3,
		slot_PG: 4,
		slot_BNG: 5,
		slot_FaChai: 6,
		slot_MGPSW: 7,
		slot_JI: 8,
		slot_SPRIBE: 9,
		slot_JOKER: 10,
		slot_RedTiger: 11,
		slot_NetEnt: 12,
		slot_CQ9: 13,
		slot_PNG: 14,
		slot_GPI: 15,
		slot_YGG: 16,
		slot_AMB: 17,
		slot_Habanero: 18,
		slot_SimplePlay: 19,
		slot_Skywind: 20,
		slot_PT: 21
	},
	[defCurrencyList.BDT]: {
		slot_PP: 1,
		slot_SG: 2,
		slot_AdvantPlay: 3,
		slot_PG: 4,
		slot_BNG: 5,
		slot_MGPSW: 6,
		slot_JI: 7,
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
	}
};

const defSortFishing = {
	[defCurrencyList.THB]: {
		fishing_SG: 1,
		fishing_SGW_WAR: 2,
		fishing_Zombie_Party: 3,
		fishing_Alien_Hunter: 4,
		fishing_CQ9_PARADISE: 5,
		fishing_Haiba: 7,
		fishing_Hunting_Happy_Fish_5: 8,
		fishing_Hunting_Monster_Awaken: 9,
		fishing_CQ9_ONESHOT: 10
	},
	[defCurrencyList.MYR]: {
		fishing_SGW_WAR: 1,
		fishing_Zombie_Party: 2,
		fishing_Alien_Hunter: 3,
		fishing_CQ9_PARADISE: 4,
		fishing_Haiba: 6,
		fishing_Hunting_Happy_Fish_5: 7,
		fishing_Hunting_Monster_Awaken: 8
	},
	[defCurrencyList.IDR]: {
		fishing_SGW_WAR: 1,
		fishing_Zombie_Party: 2,
		fishing_Alien_Hunter: 3,
		fishing_CQ9_PARADISE: 4,
		fishing_Haiba: 6,
		fishing_Hunting_Happy_Fish_5: 7,
		fishing_Hunting_Monster_Awaken: 8
	},
	[defCurrencyList.INR]: {
		fishing_SG: 1,
		fishing_SGW_WAR: 2,
		fishing_Zombie_Party: 3,
		fishing_Alien_Hunter: 4,
		fishing_CQ9_PARADISE: 5,
		fishing_Haiba: 7,
		fishing_Hunting_Happy_Fish_5: 8,
		fishing_Hunting_Monster_Awaken: 9,
		fishing_CQ9_ONESHOT: 10
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
	"4d": "fourList",
	lottery: "gameList",
	fishing: "fishList",
	promotion: "promoList",
	tv: "tvList",
	vip: "vipList",
	ranking: "rankingList",
	sponsor: "homeList",
	cryptoSports: "cryptoList"
};

export const defMenuLinks = {
	home: {
		className: "icon icon-home",
		path: path.home.root,
		checkBeforeLogin: true,
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
		href: `${config.openURL}/rewards/`,
		checkBeforeLogin: true
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
		checkBeforeLogin: true,
		customSort: defSortSports,
		subMenu: [
			// {
			// 	displayKey: "lbl_cryptoSports",
			// 	listNpcImgUrl: "cryptosportNPC.png",
			// 	menuType: defMenuType.entPage,
			// 	...productList.cryptoSports,
			// 	keyName: "cryptoSports",
			// 	eventIcons: [
			// 		showEventIcon({
			// 			icon: defEventIcon.new,
			// 			period: defEventPeriod.sports_cryptoSports
			// 		})
			// 	]
			// },
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
		checkBeforeLogin: true,
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
		checkBeforeLogin: true,
		subMenu: [
			{
				displayText: "Saba",
				listNpcImgUrl: "esportSABA.png",
				listBgImgUrl: "eSportsListHover.png",
				menuType: defMenuType.entPage,
				parameter: { ...productList.eSportAll },
				...productList.eSportAll,
				lobbyPage: {
					bgImg: "esportlobby-saba.png"
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
					bgImg: "esportlobby-im.png"
				},
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.IM
					})
				]
			},
			{
				displayText: "TFGaming",
				listNpcImgUrl: "esportTFG.png",
				listBgImgUrl: "eSportsListHover.png",
				menuType: defMenuType.entPage,
				parameter: { ...productList.TFGaming },
				...productList.TFGaming,
				lobbyPage: {
					bgImg: "esportlobby-tfg.png"
				},
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.TFGaming
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
				lobbyPage: { npcImg: "casino-PP.png" },
				allowCurrencies: allowedCurrencyList.casino_PP
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
				lobbyPage: { npcImg: "casino-bg.png" },
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
				lobbyPage: { npcImg: "casino-yb.png" },
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
				lobbyPage: { npcImg: "casino-SK.png" },
				allowCurrencies: allowedCurrencyList.casino_SkyWind
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
				lobbyPage: { npcImg: "casino-mg.png" },
				allowCurrencies: allowedCurrencyList.casino_MGPSW
			},
			{
				keyName: "casino_EVO",
				displayText: "Evolution Gaming",
				listNpcImgUrl: "casino-ev.png",
				listBgImgUrl: ["evbg.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage,
				...productList.liveCasino_EVO,
				lobbyPage: { npcImg: "casino-ev.png" },
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
				lobbyPage: { npcImg: "casino-pt.png" },
				allowCurrencies: allowedCurrencyList.liveCasinoPlayTech
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
				lobbyPage: { npcImg: "casino-WM.png" }
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
				lobbyPage: { npcImg: "casino-ALL.png" },
				allowCurrencies: allowedCurrencyList.allbet
			},
			{
				keyName: "casino_EBET",
				className: "liveEB",
				icon: "icon icon-EB",
				displayText: "WE",
				listNpcImgUrl: "casino-we.png",
				listBgImgUrl: ["ebBG.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage,
				...productList.liveCasino_eBET,
				lobbyPage: { npcImg: "casino-we.png" }
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
				lobbyPage: { npcImg: "casino-SA.png" },
				allowCurrencies: allowedCurrencyList.casinoSA
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
				lobbyPage: { npcImg: "casino-AE.png" }
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
				lobbyPage: { npcImg: "casino-DG.png" },
				allowCurrencies: allowedCurrencyList.liveCasino_DG
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
				lobbyPage: { npcImg: "casino-ag.png" },
				allowCurrencies: allowedCurrencyList.liveCasino_AG
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
				allowCurrencies: allowedCurrencyList.slot_PP
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
				keyName: "slot_AmigoGaming",
				displayText: "Amigo Gaming",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotamigo.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_Amigo },
				...productList.casino_Amigo,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.casino_Amigo
					})
				],
				allowCurrencies: allowedCurrencyList.casino_Amigo
			},
			{
				keyName: "slot_Endorphina",
				displayText: "ES",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotEs.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_Endorphina },
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
				...productList.casino_Nextspin
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
				...productList.casino_PG,
				allowCurrencies: allowedCurrencyList.slotPGSoft
			},
			{
				keyName: "slot_BNG",
				displayText: "BNG",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotbng.png",
				listBgImgUrl: "slotListHover.png",
				parameter: productList.casino_BNG,
				...productList.casino_BNG,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.slot_BNG
					})
				]
			},
			{
				keyName: "slot_FaChai",
				displayText: "Fa Chai",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotfachai.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { provider: "FaChai" },
				...productList.casino_FaChai,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.slot_fachai
					})
				],
				allowCurrencies: allowedCurrencyList.slot_FaChai
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
				...productList.casino_MGPSW,
				allowCurrencies: allowedCurrencyList.slot_MGPSW
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
				keyName: "slot_PEGASUS",
				icon: "icon icon-PRGASUS",
				displayText: "Pegasus",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotpegasus.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_PEGASUS },
				...productList.casino_PEGASUS,
				allowCurrencies: allowedCurrencyList.slotPegasus,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.casino_Pegasus
					})
				]
			},
			{
				keyName: "slot_NoLimitCity",
				displayText: "NoLimit City",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotnlc.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_NoLimitCity },
				...productList.casino_NoLimitCity,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.slot_NoLimitCity
					})
				]
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
				listNpcImgUrl: "slotplayngo.png",
				listBgImgUrl: "slotListHover.png",
				// parameter: { ...productList.casino_PNG },
				parameter: { provider: "png" },
				...productList.casino_PNG,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.PNG
					})
				]
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
				displayText: "Askmeslot",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotAskMe.png",
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
				],
				allowCurrencies: allowedCurrencyList.slot_SimplePlay
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
				],
				allowCurrencies: allowedCurrencyList.slot_SkyWind
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
				...productList.casino_PlayTech,
				allowCurrencies: allowedCurrencyList.slotPlayTech
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
		checkBeforeLogin: true,
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
					bgImg: "mp.png"
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
					bgImg: "am.png"
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
					bgImg: "vg.png"
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
					bgImg: "km.png"
				}
			},
			{
				keyName: "games_V8Poker",
				className: "fsgw",
				listNpcImgUrl: "v8.png",
				listBgImgUrl: "tablelisthover.png",
				displayKey: "lbl_V8Poker",
				menuType: defMenuType.entPage,
				...productList.games_V8Poker,
				parameter: { ...productList.games_V8Poker },
				lobbyPage: {
					bgImg: "v8.png"
				},
				allowCurrencies: allowedCurrencyList.V8Poker,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.V8Poker
					})
				]
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
					bgImg: "gameSpribeAviator.png"
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
					bgImg: "gameSpribeMines.png"
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
					bgImg: "gameSpribeGoal.png"
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
					bgImg: "gameSpribeDice.png"
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
					bgImg: "pp.png"
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
					bgImg: "ap.png"
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
					bgImg: "jili.png"
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
				keyName: "fishing_SG",
				className: "fsg",
				displayKey: "lbl_FishingSG1",
				menuType: defMenuType.entPage,
				listNpcImgUrl: "fishSG.png",
				listBgImgUrl: "fishListHover.png",
				...productList.fishing_SG,
				parameter: { ...productList.fishing_SG },
				lobbyPage: {
					bgImg: "fishSG.png"
				}
			},
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
					bgImg: "fishSGwar.png"
				}
			},
			{
				keyName: "fishing_Zombie_Party",
				className: "fsgw",
				displayKey: "lbl_Fishing_Zombie_Party",
				menuType: defMenuType.entPage,
				listNpcImgUrl: "fishzp.png",
				listBgImgUrl: "fishListHover.png",
				...productList.Fishing_Zombie_Party,
				parameter: { ...productList.Fishing_Zombie_Party },
				lobbyPage: {
					bgImg: "fishzp.png"
				},
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.fishing_Zombie_Party
					})
				],
				allowCurrencies: allowedCurrencyList.zombieParty
			},
			{
				keyName: "fishing_Alien_Hunter",
				className: "fsgw",
				displayKey: "lbl_Fishing_Alien_Hunter",
				menuType: defMenuType.entPage,
				listNpcImgUrl: "fishah.png",
				listBgImgUrl: "fishListHover.png",
				...productList.Fishing_Alien_Hunter,
				parameter: { ...productList.Fishing_Alien_Hunter },
				lobbyPage: {
					bgImg: "fishah.png"
				},
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.fishing_Alien_Hunter
					})
				],
				allowCurrencies: allowedCurrencyList.alienHunter
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
					bgImg: "paradise.png"
				}
			},
			{
				keyName: "fishing_Haiba",
				displayKey: "lbl_Fishing_Haiba",
				listNpcImgUrl: "hb.png",
				listBgImgUrl: "fishListHover.png",
				menuType: defMenuType.entPage,
				...productList.fishing_Haiba,
				parameter: { ...productList.fishing_Haiba },
				lobbyPage: {
					bgImg: "hb.png"
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
					bgImg: "hf5.png"
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
					bgImg: "ma.png"
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
				keyName: "fishing_CQ9_ONESHOT",
				className: "fsg",
				displayKey: "lbl_Oneshot_Fishing",
				menuType: defMenuType.entPage,
				listNpcImgUrl: "oneshotfishing.png",
				listBgImgUrl: "fishListHover.png",
				...productList.CQ9_Oneshot_Fishing,
				parameter: { ...productList.CQ9_Oneshot_Fishing },
				lobbyPage: {
					bgImg: "oneshotfishing.png"
				}
			}
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
	"4d": {
		displayKey: "lbl_4D",
		path: path["4d"].root,
		filterByAuth: true,
		checkBeforeLogin: true,
		allowCurrencies: allowedCurrencyList["4D"],
		subMenu: [
			{
				...productList.HaoLong,
				displayText: "Grand Dragon",
				listNpcImgUrl: "haolong.png",
				menuType: defMenuType.useGoToGame,
				parameter: { ...productList.HaoLong },
				allowCurrencies: allowedCurrencyList.haoLong,
				lobbyPage: {
					bgImg: "haolong.png"
				},
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.HaoLong
					})
				]
			}
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
					bgImg: "lo-gpikeno.png"
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
					bgImg: "lo-gpithai.png"
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
					bgImg: "lo-gpifast3.png"
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
					bgImg: "lo-tcg.png"
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
					bgImg: "lo-keno.png"
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
					bgImg: "lo-lottery.png"
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
					bgImg: "lo-numberGame.png"
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
					bgImg: "lo-tableGame.png"
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
		checkBeforeLogin: true,
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
		checkBeforeLogin: true,
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
		checkBeforeLogin: true,
		allowCurrencies: [...getLeaderBoardSupportCurrencyId()]
	}
};
