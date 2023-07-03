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
		tennis: 5,
		virtualSports: 6
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
		slot_AdvantPlay: 2,
		slot_Skywind: 3,
		slot_Habanero: 4,
		slot_NetEnt: 5,
		slot_MGPSW: 6,
		slot_JI: 7,
		slot_PG: 8,
		slot_JOKER: 9,
		slot_SG: 10,
		slot_RedTiger: 11,
		slot_PT: 12,
		slot_YGG: 13,
		slot_AMB: 14,
		slot_CQ9: 15,
		slot_GPI: 16,
		slot_ICG: 17,
		slot_OW: 18
	},
	[defCurrencyList.MYR]: {
		slot_PP: 1,
		slot_AdvantPlay: 2,
		slot_Skywind: 3,
		slot_Habanero: 4,
		slot_NetEnt: 5,
		slot_MGPSW: 6,
		slot_JI: 7,
		slot_PG: 8,
		slot_JOKER: 9,
		slot_SG: 10,
		slot_RedTiger: 11,
		slot_PT: 12,
		slot_YGG: 13,
		slot_CQ9: 14,
		slot_GPI: 15,
		slot_ICG: 16,
		slot_OW: 17
	},
	[defCurrencyList.IDR]: {
		slot_PP: 1,
		slot_AdvantPlay: 2,
		slot_Skywind: 3,
		slot_Habanero: 4,
		slot_NetEnt: 5,
		slot_MGPSW: 6,
		slot_JI: 7,
		slot_PG: 8,
		slot_JOKER: 9,
		slot_SG: 10,
		slot_RedTiger: 11,
		slot_PT: 12,
		slot_YGG: 13,
		slot_CQ9: 14,
		slot_GPI: 15,
		slot_ICG: 16,
		slot_OW: 17
	},
	[defCurrencyList.INR]: {
		slot_AdvantPlay: 1,
		slot_PP: 2,
		slot_Skywind: 3,
		slot_Habanero: 4,
		slot_NetEnt: 5,
		slot_MGPSW: 6,
		slot_JI: 7,
		slot_PG: 8,
		slot_JOKER: 9,
		slot_SG: 10,
		slot_RedTiger: 11,
		slot_PT: 12,
		slot_YGG: 13,
		slot_CQ9: 14,
		slot_GPI: 15,
		slot_ICG: 16,
		slot_OW: 17
	},
	[defCurrencyList.BDT]: {
		slot_PP: 1,
		slot_AdvantPlay: 2,
		slot_Habanero: 3,
		slot_NetEnt: 4,
		slot_MGPSW: 5,
		slot_JI: 6,
		slot_PG: 7,
		slot_JOKER: 8,
		slot_SG: 9,
		slot_RedTiger: 10,
		slot_PT: 11,
		slot_YGG: 12,
		slot_CQ9: 13,
		slot_GPI: 14,
		slot_ICG: 15,
		slot_OW: 16
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
	appDownload: "appList",
	sports: "sportsList",
	exchange: "exchangeList",
	eSports: "eSportsList",
	slot: "casinoList",
	casino: "livecasinoList",
	poker: "pokerList",
	games: "tableList",
	lottery: "gameList",
	fishing: "fishList",
	promotion: "promoList",
	tv: "tvList",
	vip: "vipList",
	ranking: "rankingList",

	worldCup: "eventList",
	cryptoSports: "cryptoList"
};

export const defMenuLinks = {
	home: {
		className: "icon icon-home",
		path: path.home.root
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
				displayKey: "lbl_Tennis",
				listNpcImgUrl: "tennisNPC.png",
				listBgImgUrl: "tennisBG.png",
				menuType: defMenuType.Link,
				// parameter: { ...productList.tennis },
				parameter: { provider: "saba", type: "tennis" },
				...productList.tennis,
				keyName: "tennis"
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
				keyName: "cricket"
			}
			// {
			// 	path: path.sports.root,
			// 	displayKey: "lbl_Virtual_Sports",
			// 	listNpcImgUrl: "betradarsoccerNPC.png",
			// 	listBgImgUrl: "soccerBG.png",
			// 	menuType: defMenuType.Link,
			// 	// parameter: { ...productList.virtualSports },
			// 	parameter: { provider: "saba", type: "virtual-sports" },
			// 	...productList["virtual-sports"],
			// 	keyName: "virtualSports",
			// 	eventIcons: [
			// 		showEventIcon({
			// 			icon: defEventIcon.new,
			// 			period: defEventPeriod.sports_virtualSports
			// 		})
			// 	]
			// }
		]
	},
	eSports: {
		displayKey: "lbl_eSports",
		className: "eSportsbtn",
		path: path.eSport.root,
		subMenu: [
			{
				displayKey: "lbl_All",
				listNpcImgUrl: "esportALL.png",
				listBgImgUrl: "eSportsListHover.png",
				menuType: defMenuType.entPage,
				parameter: { ...productList.eSportAll },
				...productList.eSportAll,
				lobbyPage: {
					bgImg: "esposts-all.png",
					hoverBgImg: "esposts-alla.png"
				}
			},
			{
				displayKey: "lbl_Dota2",
				listNpcImgUrl: "esportDOTA2.png",
				listBgImgUrl: "eSportsListHover.png",
				menuType: defMenuType.entPage,
				parameter: { ...productList.eSport_DOTA2 },
				...productList.eSport_DOTA2,
				lobbyPage: {
					bgImg: "esposts-dota.png",
					hoverBgImg: "esposts-dotaa.png"
				}
			},
			{
				displayKey: "lbl_LOL",
				listNpcImgUrl: "esportLOL.png",
				listBgImgUrl: "eSportsListHover.png",
				menuType: defMenuType.entPage,
				parameter: { ...productList.eSport_LOL },
				...productList.eSport_LOL,
				lobbyPage: {
					bgImg: "esposts-lol.png",
					hoverBgImg: "esposts-lola.png"
				}
			},
			{
				displayKey: "lbl_CSGO",
				listNpcImgUrl: "esportCS.png",
				listBgImgUrl: "eSportsListHover.png",
				menuType: defMenuType.entPage,
				parameter: { ...productList.eSport_CSGO },
				...productList.eSport_CSGO,
				lobbyPage: {
					bgImg: "esposts-cs.png",
					hoverBgImg: "esposts-csa.png"
				}
			},
			{
				displayKey: "lbl_Kog",
				listNpcImgUrl: "esportKOG.png",
				listBgImgUrl: "eSportsListHover.png",
				menuType: defMenuType.entPage,
				parameter: { ...productList.eSport_KOG },
				...productList.eSport_KOG,
				lobbyPage: {
					bgImg: "esposts-kog.png",
					hoverBgImg: "esposts-koga.png"
				}
			}
		]
	}
};
