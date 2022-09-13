import productList from "../../datas/productList";
import path from "../../router";
import {
	defEventIcon,
	defEventPeriod,
	showEventIcon
} from "../common/eventIcon";
import { defCurrencyList } from "../common/common";
import { getLeaderBoardSupportCurrencyId } from "../leaderBoard/leaderBoard.def";
import { bannerImgUrl } from "../../config";

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
		casino_EVO: 2,
		casino_PT: 3,
		casino_DG: 4,
		casino_AE: 5,
		casino_SA: 6,
		casino_ALBET: 7,
		casino_AG: 8,
		casino_WM: 9,
		casino_EBET: 10,
		casino_N2LIVE: 11
	},
	[defCurrencyList.MYR]: {
		casino_PP: 1,
		casino_EVO: 2,
		casino_PT: 3,
		casino_DG: 4,
		casino_AE: 5,
		casino_SA: 6,
		casino_ALBET: 7,
		casino_AG: 8,
		casino_WM: 9,
		casino_EBET: 10,
		casino_N2LIVE: 11
	},
	[defCurrencyList.IDR]: {
		casino_PP: 1,
		casino_EVO: 2,
		casino_PT: 3,
		casino_DG: 4,
		casino_AE: 5,
		casino_SA: 6,
		casino_ALBET: 7,
		casino_AG: 8,
		casino_WM: 9,
		casino_EBET: 10,
		casino_N2LIVE: 11
	},
	[defCurrencyList.INR]: {
		casino_PP: 1,
		casino_EVO: 2,
		casino_PT: 3,
		casino_DG: 4,
		casino_AE: 5,
		casino_SA: 6,
		casino_ALBET: 7,
		casino_AG: 8,
		casino_WM: 9,
		casino_EBET: 10,
		casino_N2LIVE: 11
	}
};

const defSortSlot = {
	[defCurrencyList.THB]: {
		slot_AdvantPlay: 1,
		slot_PP: 2,
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
		slot_AMB: 13,
		slot_CQ9: 14,
		slot_GPI: 15,
		slot_ICG: 16,
		slot_OW: 17
	},
	[defCurrencyList.MYR]: {
		slot_AdvantPlay: 1,
		slot_PP: 2,
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
	},
	[defCurrencyList.IDR]: {
		slot_AdvantPlay: 1,
		slot_PP: 2,
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
	},
	[defCurrencyList.INR]: {
		slot_AdvantPlay: 1,
		slot_PP: 2,
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
		fishing_ICG_DRAGONBALL: 4,
		fishing_Haiba: 5,
		fishing_Hunting_Happy_Fish_5: 6,
		fishing_Hunting_Monster_Awaken: 7,
		fishing_SG: 8,
		fishing_CQ9_ONESHOT: 9,
		fishing_ICG_THE_TYRANT_AND_THE_PRINCESS: 10,
		ICG_FISHING_OF_SAVIORS: 11
	},
	[defCurrencyList.MYR]: {
		fishing_SGW_WAR: 1,
		fishing_CQ9_PARADISE: 2,
		fishing_GGYL_WORLD: 3,
		fishing_ICG_DRAGONBALL: 4,
		fishing_Haiba: 5,
		fishing_Hunting_Happy_Fish_5: 6,
		fishing_Hunting_Monster_Awaken: 7
	},
	[defCurrencyList.IDR]: {
		fishing_SGW_WAR: 1,
		fishing_CQ9_PARADISE: 2,
		fishing_GGYL_WORLD: 3,
		fishing_ICG_DRAGONBALL: 4,
		fishing_Haiba: 5,
		fishing_Hunting_Happy_Fish_5: 6,
		fishing_Hunting_Monster_Awaken: 7
	},
	[defCurrencyList.INR]: {
		fishing_SGW_WAR: 1,
		fishing_CQ9_PARADISE: 2,
		fishing_GGYL_WORLD: 3,
		fishing_ICG_DRAGONBALL: 4,
		fishing_Haiba: 5,
		fishing_Hunting_Happy_Fish_5: 6,
		fishing_Hunting_Monster_Awaken: 7,
		fishing_SG: 8,
		fishing_CQ9_ONESHOT: 9,
		fishing_ICG_THE_TYRANT_AND_THE_PRINCESS: 10,
		ICG_FISHING_OF_SAVIORS: 11
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
	sponsor: "homeList",
	worldCup: "eventList"
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
				path: path.vip.root
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
	appDownload: {
		className: "icon icon-mobile",
		path: path.appDownload.root
	},
	worldCup: {
		className: "eventbtn",
		path: path.sports.root,
		imgUrl: `${bannerImgUrl}/desktop/img/event/worldcup/xs-logo.png`,
		productInfo: { tpId: 1, gameId: 2002, tpGameType: 1 },
		eventIcons: [
			showEventIcon({
				icon: defEventIcon.hot,
				period: defEventPeriod.worldCup_hot
			})
		]
	},
	sports: {
		displayKey: "lbl_Sports",
		className: "sportsbtn",
		path: path.sports.root,
		productInfo: productList.sports,
		filterByAuth: true,
		customSort: defSortSports,
		subMenu: [
			{
				path: path.sports.root,
				displayKey: "lbl_Soccer",
				listNpcImgUrl: "soccerNPC.png",
				listBgImgUrl: "soccerBG.png",
				menuType: defMenuType.Link,
				parameter: { ...productList.soccer },
				...productList.soccer,
				keyName: "soccer"
			},
			{
				path: path.sports.root,
				displayKey: "lbl_SabaSoccer",
				listNpcImgUrl: "sabssoccerNPC.png",
				listBgImgUrl: "soccerBG.png",
				menuType: defMenuType.Link,
				parameter: { ...productList.sabaSoccer },
				...productList.sabaSoccer,
				keyName: "sabaSoccer"
			},
			{
				path: path.sports.root,
				displayKey: "lbl_Basketball",
				listNpcImgUrl: "basketballNPC.png",
				listBgImgUrl: "basketballBG.png",
				menuType: defMenuType.Link,
				parameter: { ...productList.basketball },
				...productList.basketball,
				keyName: "basketball"
			},
			{
				path: path.sports.root,
				displayKey: "lbl_Tennis",
				listNpcImgUrl: "tennisNPC.png",
				listBgImgUrl: "tennisBG.png",
				menuType: defMenuType.Link,
				parameter: { ...productList.tennis },
				...productList.tennis,
				keyName: "tennis"
			},
			{
				path: path.sports.root,
				displayKey: "lbl_Cricket",
				listNpcImgUrl: "cricketNPC.png",
				listBgImgUrl: "cricketBG.png",
				menuType: defMenuType.Link,
				parameter: { ...productList.cricket },
				...productList.cricket,
				keyName: "cricket"
			},
			{
				path: path.sports.root,
				displayKey: "lbl_Virtual_Sports",
				listNpcImgUrl: "betradarsoccerNPC.png",
				listBgImgUrl: "soccerBG.png",
				menuType: defMenuType.Link,
				parameter: { ...productList.virtualSports },
				...productList.virtualSports,
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
		allowCurrencies: [defCurrencyList.INR],
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
	},
	casino: {
		displayKey: "lbl_LiveCasino",
		className: "livecasinobtn",
		path: path.liveCasino.root,
		filterByAuth: true,
		customSort: defSortCasino,
		subMenu: [
			{
				...productList.liveCasino_PP,
				keyName: "casino_PP",
				className: "livePP",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.liveCasino_pp
					})
				],
				icon: "icon icon-PP",
				displayText: "Pragmatic Play",
				listNpcImgUrl: "casino-PP.png",
				listBgImgUrl: ["ppBG.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage,
				lobbyPage: { npcImg: "casino_pp" }
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
			{
				keyName: "casino_PT",
				displayText: "Playtech",
				menuType: defMenuType.useGoToGame,
				listNpcImgUrl: "casino-pt.png",
				listBgImgUrl: ["ptbg.png", "livecasinListHover.png"],
				...productList.liveCasino_PT,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.liveCasino_pt
					})
				],
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
				lobbyPage: { npcImg: "casino_ab" }
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
				listNpcImgUrl: "casino-AG.png",
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
				keyName: "slot_AdvantPlay",
				displayText: "AdvantPlay",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotap.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_AdvantPlay },
				...productList.casino_AdvantPlay,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.casino_AdvantPlay
					})
				]
			},
			{
				keyName: "slot_PP",
				icon: "icon icon-PP",
				displayText: "Pragmatic Play",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotPP.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_PP },
				...productList.casino_PP
			},
			{
				keyName: "slot_Mega888",
				displayText: "Mega888",
				menuType: defMenuType.Link,
				path: path.mega888.root,
				listNpcImgUrl: "slotMEGA888.png",
				listBgImgUrl: "slotListHover.png",
				...productList.mega888,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.mega888
					})
				]
			},
			{
				keyName: "slot_Habanero",
				displayText: "Habanero",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotho.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_Habanero },
				...productList.casino_Habanero,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.casino_Habanero
					})
				]
			},
			{
				keyName: "slot_NetEnt",
				displayText: "NetEnt",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotnt.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_NetEnt },
				...productList.casino_NetEnt,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.casino_NetEnt
					})
				]
			},
			{
				keyName: "slot_MGPSW",
				displayText: "Microgaming",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotmg.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_MGPSW },
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
				parameter: { ...productList.casino_JILI },
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.casino_ji
					})
				],
				...productList.casino_JILI
			},
			{
				keyName: "slot_PT",
				icon: "icon icon-PT",
				displayText: "Playtech",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotpt.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_PT },
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.casino_pt
					})
				],
				...productList.casino_PT
			},
			{
				keyName: "slot_ICG",
				icon: "icon icon-ICG",
				displayText: "Astro Tech",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotICG.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_ICG },
				...productList.casino_ICG
			},
			{
				keyName: "slot_JOKER",
				icon: "icon icon-JOKER",
				displayText: "Joker",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotJOKER.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_JOKER },
				...productList.casino_JOKER
			},
			{
				keyName: "slot_CQ9",
				icon: "icon icon-cq9",
				displayText: "CQ9",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotCQ9.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_CQ9 },
				...productList.casino_CQ9
			},
			{
				keyName: "slot_GPI",
				icon: "icon icon-GPI",
				displayText: "Game Play",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotGPI.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_GPI },
				...productList.casino_GPI
			},
			{
				keyName: "slot_YGG",
				icon: "icon icon-YGG",
				displayText: "YGGDrassil",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotYGG.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_YGG },
				...productList.casino_YGG
			},
			{
				keyName: "slot_AMB",
				icon: "icon icon-AMB",
				displayText: "AMBSlot",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotam.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_AMB },
				...productList.casino_AMB,
				allowCurrencies: [defCurrencyList.THB],
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.casino_AMB
					})
				]
			},
			{
				keyName: "slot_SG",
				icon: "icon icon-SG",
				displayText: "Spadegaming",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotSG.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_SG },
				...productList.casino_SG
			},
			{
				keyName: "slot_RedTiger",
				displayText: "Red Tiger",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotrt.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_RedTiger },
				...productList.casino_RedTiger,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.casino_RedTiger
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
				parameter: { ...productList.casino_PG },
				...productList.casino_PG
			},
			{
				keyName: "slot_OW",
				icon: "icon icon-OW",
				displayText: "Saba Casino",
				menuType: defMenuType.entPage,
				listNpcImgUrl: "slotOW.png",
				listBgImgUrl: "slotListHover.png",
				...productList.casino_OW,
				allowCurrencies: [
					defCurrencyList.IDR,
					defCurrencyList.MYR,
					defCurrencyList.THB
				]
			}
		]
	},
	poker: {
		displayKey: "lbl_Poker",
		className: "pokerbtn",
		allowCurrencies: [
			defCurrencyList.MYR,
			defCurrencyList.THB,
			defCurrencyList.IDR
		]
	},
	games: {
		displayKey: "lbl_Games",
		path: path.game.root,
		filterByAuth: true,
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
				allowCurrencies: [defCurrencyList.THB]
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
				allowCurrencies: [defCurrencyList.THB]
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
				}
			},
			{
				keyName: "games_MaxGame",
				listNpcImgUrl: "max.png",
				listBgImgUrl: "tablelisthover.png",
				displayText: "Max Game",
				menuType: defMenuType.entPage,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.game_MaxGame
					})
				],
				...productList.game_MaxGame,
				lobbyPage: {
					bgImg: "gamemax.png",
					hoverBgImg: "gamemaxa.png"
				}
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
				...productList.virtualGame,
				keyName: "games_VirtualGame",
				listNpcImgUrl: "virtualgames.png",
				listBgImgUrl: "tablelisthover.png",
				displayKey: "lbl_Virtual_Games",
				menuType: defMenuType.entPage,
				parameter: { ...productList.virtualGame },
				lobbyPage: {
					bgImg: "gamevirtual.png",
					hoverBgImg: "gamevirtuala.png"
				}
			}
		]
	},
	fishing: {
		displayKey: "lbl_Fishing",
		className: "fishbtn",
		path: path.fishing.root,
		filterByAuth: true,
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
				]
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
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.fishing_Joker
					})
				]
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
				]
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
				keyName: "fishing_ICG_DRAGONBALL",
				className: "fsdf",
				displayKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
				menuType: defMenuType.entPage,
				listNpcImgUrl: "fishICG-DB.png",
				listBgImgUrl: "fishListHover.png",
				...productList.ICG_DRAGONBALL_FISHING,
				parameter: { ...productList.ICG_DRAGONBALL_FISHING },
				lobbyPage: {
					bgImg: "fishdf.png",
					hoverBgImg: "fishdfa.png"
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
				allowCurrencies: [defCurrencyList.INR]
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
				allowCurrencies: [defCurrencyList.INR]
			},
			{
				keyName: "fishing_ICG_THE_TYRANT_AND_THE_PRINCESS",
				className: "fsg",
				displayKey: "lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS",
				menuType: defMenuType.entPage,
				listNpcImgUrl: "fishICG-TTATP.png",
				listBgImgUrl: "fishListHover.png",
				...productList.ICG_THE_TYRANT_AND_THE_PRINCESS,
				parameter: { ...productList.ICG_THE_TYRANT_AND_THE_PRINCESS },
				lobbyPage: {
					bgImg: "fishtp.png",
					hoverBgImg: "fishtpa.png"
				},
				allowCurrencies: [defCurrencyList.INR]
			},
			{
				keyName: "ICG_FISHING_OF_SAVIORS",
				className: "fsg",
				displayKey: "lbl_Game_ICG_FISHING_OF_SAVIORS",
				menuType: defMenuType.entPage,
				listNpcImgUrl: "fishICG-FOS.png",
				listBgImgUrl: "fishListHover.png",
				...productList.ICG_FISHING_OF_SAVIORS,
				parameter: { ...productList.ICG_FISHING_OF_SAVIORS },
				lobbyPage: {
					bgImg: "fishfs.png",
					hoverBgImg: "fishfsa.png"
				},
				allowCurrencies: [defCurrencyList.INR]
			}
		]
	},
	lottery: {
		displayKey: "lbl_Lottery",
		path: path.lottery.root,
		filterByAuth: true,
		subMenu: [
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
				},
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.lottery_tcg
					})
				]
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
				...productList.numberGame,
				path: path.sports.root,
				className: "numberGame",
				displayKey: "lbl_NumberGame",
				listNpcImgUrl: "lo-numberGame.png",
				listBgImgUrl: "gameListHover.png",
				menuType: defMenuType.Link,
				parameter: { ...productList.numberGame },
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
			},
			{
				...productList.indo4D,
				className: "indo",
				displayKey: "lbl_Indo4D",
				listNpcImgUrl: "lo-indo.png",
				listBgImgUrl: "gameListHover.png",
				menuType: defMenuType.entPage,
				parameter: { ...productList.indo4D },
				lobbyPage: {
					bgImg: "lottery4d.png",
					hoverBgImg: "lottery4da.png"
				},
				allowCurrencies: [defCurrencyList.IDR]
			}
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
		allowCurrencies: [
			defCurrencyList.MYR,
			defCurrencyList.THB,
			defCurrencyList.IDR
		]
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
