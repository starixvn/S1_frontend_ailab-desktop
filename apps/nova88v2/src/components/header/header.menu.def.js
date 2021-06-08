import productList from "../../datas/productList";
import path from "../../router";
import {
	defEventIcon,
	defEventPeriod,
	showEventIcon
} from "../common/eventIcon";
import { currencyCode } from "../../datas/countryCode";

const defSortCasino = {
	[currencyCode.TH]: {
		casino_PT: 1,
		casino_DG: 2,
		casino_AE: 3,
		casino_SA: 4,
		casino_ALBET: 5,
		casino_AG: 6,
		slot_PT: 7,
		casino_WM: 8,
		casino_PP: 9,
		casino_EBET: 10,
		casino_N2LIVE: 11
	},
	[currencyCode.MY]: {
		casino_PT: 1,
		casino_DG: 2,
		casino_AE: 3,
		casino_PP: 4,
		casino_SA: 5,
		slot_PT: 6,
		casino_ALBET: 7,
		casino_AG: 8,
		casino_WM: 9,
		casino_EBET: 10,
		casino_N2LIVE: 11
	},
	[currencyCode.ID]: {
		casino_PT: 1,
		casino_AE: 2,
		casino_AG: 3,
		casino_EBET: 4,
		casino_DG: 5,
		slot_PT: 6,
		casino_WM: 7,
		casino_PP: 8,
		casino_SA: 9,
		casino_ALBET: 10,
		casino_N2LIVE: 11
	}
};

const defSortSlot = {
	[currencyCode.TH]: {
		slot_PG: 1,
		slot_PP: 2,
		slot_JOKER: 3,
		slot_SG: 4,
		slot_ICG: 5,
		slot_PT: 6,
		slot_YGG: 7,
		slot_CQ9: 8,
		slot_GPI: 9,
		slot_OW: 10
	},
	[currencyCode.MY]: {
		slot_PP: 1,
		slot_SG: 2,
		slot_YGG: 3,
		slot_JOKER: 4,
		slot_PT: 5,
		slot_GPI: 6,
		slot_CQ9: 7,
		slot_ICG: 8,
		slot_OW: 9,
		slot_PG: 10
	},
	[currencyCode.ID]: {
		slot_PP: 1,
		slot_PG: 2,
		slot_SG: 3,
		slot_PT: 4,
		slot_JOKER: 5,
		slot_CQ9: 6,
		slot_ICG: 7,
		slot_GPI: 8,
		slot_YGG: 9,
		slot_OW: 10
	}
};

const defSortFishing = {
	[currencyCode.TH]: {
		fishing_SGW_WAR: 1,
		fishing_CQ9_PARADISE: 2,
		fishing_GGYL_WORLD: 3,
		fishing_ICG_DRAGONBALL: 4
	},
	[currencyCode.MY]: {
		fishing_GGYL_WORLD: 1,
		fishing_SGW_WAR: 2,
		fishing_CQ9_PARADISE: 3,
		fishing_ICG_DRAGONBALL: 4
	},
	[currencyCode.ID]: {
		fishing_SGW_WAR: 1,
		fishing_ICG_DRAGONBALL: 2,
		fishing_CQ9_PARADISE: 3,
		fishing_GGYL_WORLD: 4
	}
};

export const defMenuType = {
	entPage: "entPage",
	Link: "Link",
	LinkNoImg: "LinkNoImg",
	DirectUrl: "DirectUrl",
	GotoGame: "GotoGame",
	useGoToGame: "useGoToGame"
};

export const defSubListClassName = {
	home: "homeList",
	appDownload: "appList",
	sports: "sportsList",
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
	ranking: "rankingList"
};

export const defImgSourceType = {
	bannerImgUrl: "bannerImgUrl"
};

export const defMenuLinks = {
	home: {
		className: "icon icon-home",
		path: path.home.root,
		subMenu: [
			{
				displayKey: "lbl_Ambassador",
				listNpcImgUrl: "home-ambassador.png",
				listBgImgUrl: "ambassadorbg.png",
				menuType: defMenuType.DirectUrl,
				path: "https://www.joecole.club"
			},
			{
				displayKey: "lbl_Vip",
				listNpcImgUrl: "home-vip.png",
				listBgImgUrl: "vipbg.png",
				menuType: defMenuType.Link,
				path: path.vip.root
			},
			{
				displayKey: "lbl_Live_Sports",
				listNpcImgUrl: "home-livesports.png",
				listBgImgUrl: "livesportsbg.png",
				menuType: defMenuType.Link,
				path: path.streaming.root
			},
			{
				displayKey: "lbl_Movie_TV",
				listNpcImgUrl: "home-movie.png",
				listBgImgUrl: "moviebg.png",
				menuType: defMenuType.DirectUrl,
				path: "https://nova88tv.com/"
			},
			{
				displayKey: "lbl_Ranking",
				listNpcImgUrl: "home-ranking.png",
				listBgImgUrl: "rankingbg.png",
				menuType: defMenuType.Link,
				path: path.leaderBoard.root
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
	sports: {
		displayKey: "lbl_Sports",
		className: "sportsbtn",
		// productInfo: productList.sports,
		filterByAuth: true,
		subMenu: [
			{
				path: path.sports.root,
				displayKey: "lbl_Soccer",
				listNpcImgUrl: "soccerNPC.png",
				listBgImgUrl: "soccerBG.png",
				menuType: defMenuType.Link,
				parameter: { ...productList.soccer },
				...productList.soccer
			},
			{
				path: path.sports.root,
				displayKey: "lbl_SabaSoccer",
				listNpcImgUrl: "sabssoccerNPC.png",
				listBgImgUrl: "soccerBG.png",
				menuType: defMenuType.Link,
				parameter: { ...productList.sabaSoccer },
				...productList.sabaSoccer
			},
			{
				path: path.sports.root,
				displayKey: "lbl_Basketball",
				listNpcImgUrl: "basketballNPC.png",
				listBgImgUrl: "basketballBG.png",
				menuType: defMenuType.Link,
				parameter: { ...productList.basketball },
				...productList.basketball
			},
			{
				path: path.sports.root,
				displayKey: "lbl_Tennis",
				listNpcImgUrl: "tennisNPC.png",
				listBgImgUrl: "tennisBG.png",
				menuType: defMenuType.Link,
				parameter: { ...productList.tennis },
				...productList.tennis
			},
			{
				path: path.sports.root,
				displayKey: "lbl_Cricket",
				listNpcImgUrl: "cricketNPC.png",
				listBgImgUrl: "cricketBG.png",
				menuType: defMenuType.Link,
				parameter: { ...productList.cricket },
				...productList.cricket
			},
			{
				displayKey: "lbl_9W",
				listNpcImgUrl: "9wnpc.png",
				listBgImgUrl: "cricketBG.png",
				menuType: defMenuType.GotoGame,
				parameter: { ...productList._9WSports },
				imgSource: defImgSourceType.bannerImgUrl,
				canSeeOnlyAfterLogin: true,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.Sports_9W
					})
				],
				...productList._9WSports
			}
		]
	},
	eSports: {
		displayKey: "lbl_eSports",
		className: "eSportsbtn",
		path: path.sports.root,
		productInfo: productList.eSport,
		subMenu: [
			{
				displayKey: "lbl_All",
				listNpcImgUrl: "esportALL.png",
				listBgImgUrl: "eSportsListHover.png",
				menuType: defMenuType.entPage,
				parameter: { ...productList.eSportAll },
				...productList.eSportAll
			},
			{
				displayKey: "lbl_Dota2",
				listNpcImgUrl: "esportDOTA2.png",
				listBgImgUrl: "eSportsListHover.png",
				menuType: defMenuType.entPage,
				parameter: { ...productList.eSport_DOTA2 },
				...productList.eSport_DOTA2
			},
			{
				displayKey: "lbl_LOL",
				listNpcImgUrl: "esportLOL.png",
				listBgImgUrl: "eSportsListHover.png",
				menuType: defMenuType.entPage,
				parameter: { ...productList.eSport_LOL },
				...productList.eSport_LOL
			},
			{
				displayKey: "lbl_CSGO",
				listNpcImgUrl: "esportCS.png",
				listBgImgUrl: "eSportsListHover.png",
				menuType: defMenuType.entPage,
				parameter: { ...productList.eSport_CSGO },
				...productList.eSport_CSGO
			},
			{
				displayKey: "lbl_Kog",
				listNpcImgUrl: "esportKOG.png",
				listBgImgUrl: "eSportsListHover.png",
				menuType: defMenuType.entPage,
				parameter: { ...productList.eSport_KOG },
				...productList.eSport_KOG
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
				keyName: "casino_PT",
				// icon: "icon icon-PT",
				displayText: "PT",
				menuType: defMenuType.useGoToGame,
				imgSource: defImgSourceType.bannerImgUrl,
				listNpcImgUrl: "casino-pt.png",
				listBgImgUrl: ["ptbg.png", "livecasinListHover.png"],
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
				keyName: "casino_N2LIVE",
				displayText: "N2Live",
				imgSource: defImgSourceType.bannerImgUrl,
				listNpcImgUrl: "casino-n2.png",
				listBgImgUrl: ["n2bg.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage,
				...productList.liveCasino_N2,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.n2
					})
				],
				lobbyPage: {
					bgImg: "livecasino_n2.jpg",
					hoverBgImg: "livecasino_n2a.jpg"
				}
			},
			{
				keyName: "casino_WM",
				className: "liveWM",
				icon: "icon icon-WM",
				displayText: "WM",
				imgSource: defImgSourceType.bannerImgUrl,
				listNpcImgUrl: "casino-WM.png",
				listBgImgUrl: ["wmBG.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage,
				...productList.liveCasino_WM,
				lobbyPage: {
					bgImg: "livecasino_wm.jpg",
					hoverBgImg: "livecasino_wma.jpg"
				}
			},
			{
				keyName: "casino_ALBET",
				className: "liveALL",
				icon: "icon icon-AB",
				displayText: "Allbet",
				imgSource: defImgSourceType.bannerImgUrl,
				listNpcImgUrl: "casino-ALL.png",
				listBgImgUrl: ["allBG.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage,
				...productList.liveCasino_Allbet,
				lobbyPage: {
					bgImg: "livecasino_ab.jpg",
					hoverBgImg: "livecasino_aba.jpg"
				}
			},
			{
				keyName: "casino_EBET",
				className: "liveEB",
				icon: "icon icon-EB",
				displayText: "eBET",
				imgSource: defImgSourceType.bannerImgUrl,
				listNpcImgUrl: "casino-EB.png",
				listBgImgUrl: ["ebBG.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage,
				...productList.liveCasino_eBET,
				lobbyPage: {
					bgImg: "livecasino_eb.jpg",
					hoverBgImg: "livecasino_eba.jpg"
				}
			},
			{
				keyName: "casino_SA",
				className: "liveSA",
				icon: "icon icon-SA",
				displayText: "SA",
				imgSource: defImgSourceType.bannerImgUrl,
				listNpcImgUrl: "casino-SA.png",
				listBgImgUrl: ["saBG.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage,
				...productList.liveCasino_SA,
				lobbyPage: {
					bgImg: "livecasino_sa.jpg",
					hoverBgImg: "livecasino_saa.jpg"
				}
			},
			{
				keyName: "casino_AE",
				className: "liveAE",
				icon: "icon icon-AE",
				displayText: "AE",
				imgSource: defImgSourceType.bannerImgUrl,
				listNpcImgUrl: "casino-AE.png",
				listBgImgUrl: ["aeBG.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage,
				...productList.liveCasino_AE,
				lobbyPage: {
					bgImg: "livecasino_ae.jpg",
					hoverBgImg: "livecasino_aea.jpg"
				}
			},
			{
				keyName: "casino_PP",
				className: "livePP",
				icon: "icon icon-PP",
				displayText: "PP",
				imgSource: defImgSourceType.bannerImgUrl,
				listNpcImgUrl: "casino-PP.png",
				listBgImgUrl: ["ppBG.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage,
				...productList.liveCasino_PP,
				lobbyPage: {
					bgImg: "livecasino_pp.jpg",
					hoverBgImg: "livecasino_ppa.jpg"
				}
			},
			{
				keyName: "casino_DG",
				className: "liveDG",
				icon: "icon icon-DG",
				displayText: "DG",
				imgSource: defImgSourceType.bannerImgUrl,
				listNpcImgUrl: "casino-DG.png",
				listBgImgUrl: ["dgBG.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage,
				...productList.liveCasino_DG,
				lobbyPage: {
					bgImg: "livecasino_dg.jpg",
					hoverBgImg: "livecasino_dga.jpg"
				}
			},
			{
				keyName: "casino_AG",
				className: "liveAG",
				icon: "icon icon-AG",
				displayText: "AG",
				imgSource: defImgSourceType.bannerImgUrl,
				listNpcImgUrl: "casino-AG.png",
				listBgImgUrl: ["agBG.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage,
				...productList.liveCasino_AG,
				lobbyPage: {
					bgImg: "livecasino_ag.jpg",
					hoverBgImg: "livecasino_aga.jpg"
				}
			}
		]
	},
	slot: {
		displayKey: "lbl_Slots",
		className: "slotbtn",
		path: path.casino.root,
		filterByAuth: true,
		customSort: defSortSlot,
		subMenu: [
			{
				keyName: "slot_PT",
				icon: "icon icon-PT",
				displayText: "PT",
				menuType: defMenuType.Link,
				imgSource: defImgSourceType.bannerImgUrl,
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
				keyName: "slot_PP",
				icon: "icon icon-PP",
				displayText: "PP",
				menuType: defMenuType.Link,
				imgSource: defImgSourceType.bannerImgUrl,
				listNpcImgUrl: "slotPP.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_PP },
				...productList.casino_PP
			},
			{
				keyName: "slot_ICG",
				icon: "icon icon-ICG",
				displayText: "ICG",
				menuType: defMenuType.Link,
				imgSource: defImgSourceType.bannerImgUrl,
				listNpcImgUrl: "slotICG.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_ICG },
				...productList.casino_ICG
			},
			{
				keyName: "slot_JOKER",
				icon: "icon icon-JOKER",
				displayText: "JOKER",
				menuType: defMenuType.Link,
				imgSource: defImgSourceType.bannerImgUrl,
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
				imgSource: defImgSourceType.bannerImgUrl,
				listNpcImgUrl: "slotCQ9.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_CQ9 },
				...productList.casino_CQ9
			},
			{
				keyName: "slot_GPI",
				icon: "icon icon-GPI",
				displayText: "GPI",
				menuType: defMenuType.Link,
				imgSource: defImgSourceType.bannerImgUrl,
				listNpcImgUrl: "slotGPI.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_GPI },
				...productList.casino_GPI
			},
			{
				keyName: "slot_YGG",
				icon: "icon icon-YGG",
				displayText: "YGG",
				menuType: defMenuType.Link,
				imgSource: defImgSourceType.bannerImgUrl,
				listNpcImgUrl: "slotYGG.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_YGG },
				...productList.casino_YGG
			},
			{
				keyName: "slot_SG",
				icon: "icon icon-SG",
				displayText: "SG",
				menuType: defMenuType.Link,
				imgSource: defImgSourceType.bannerImgUrl,
				listNpcImgUrl: "slotSG.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_SG },
				...productList.casino_SG
			},
			{
				keyName: "slot_PG",
				icon: "icon icon-PG",
				displayText: "PG",
				menuType: defMenuType.Link,
				imgSource: defImgSourceType.bannerImgUrl,
				listNpcImgUrl: "slotPG.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_PG },
				...productList.casino_PG
			},
			{
				keyName: "slot_OW",
				icon: "icon icon-OW",
				displayText: "OW",
				menuType: defMenuType.entPage,
				imgSource: defImgSourceType.bannerImgUrl,
				listNpcImgUrl: "slotOW.png",
				listBgImgUrl: "slotListHover.png",
				...productList.casino_OW
			}
		]
	},
	poker: {
		displayKey: "lbl_Poker",
		className: "pokerbtn"
	},
	games: {
		displayKey: "lbl_Games",
		filterByAuth: true,
		subMenu: [
			{
				keyName: "games_poker",
				className: "fsgw",
				imgSource: defImgSourceType.bannerImgUrl,
				listNpcImgUrl: "am.png",
				listBgImgUrl: "tablelisthover.png",
				displayKey: "lbl_AMB_Poker",
				menuType: defMenuType.entPage,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.Games_AMBPoker
					})
				],
				...productList.games_AMBPoker,
				parameter: { ...productList.games_AMBPoker }
			},
			{
				keyName: "games_kingMaker",
				className: "fsgw",
				imgSource: defImgSourceType.bannerImgUrl,
				listNpcImgUrl: "km.png",
				listBgImgUrl: "tablelisthover.png",
				displayKey: "lbl_King_Maker",
				menuType: defMenuType.entPage,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.Games_KingMaker
					})
				],
				...productList.games_kingMaker,
				parameter: { ...productList.games_kingMaker }
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
				keyName: "fishing_CQ9_PARADISE",
				className: "fsgw",
				imgSource: defImgSourceType.bannerImgUrl,
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
				imgSource: defImgSourceType.bannerImgUrl,
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
				imgSource: defImgSourceType.bannerImgUrl,
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
				imgSource: defImgSourceType.bannerImgUrl,
				listNpcImgUrl: "fishSGwar.png",
				listBgImgUrl: "fishListHover.png",
				...productList.fishing_SGW,
				parameter: { ...productList.fishing_SGW },
				lobbyPage: {
					bgImg: "fishfw.png",
					hoverBgImg: "fishfwa.png"
				}
			}
		]
	},
	lottery: {
		displayKey: "lbl_Lottery",
		className: "game",
		productInfo: productList.lottery,
		filterByAuth: true,
		subMenu: [
			{
				...productList.keno,
				className: "keno",
				displayKey: "lbl_Keno",
				listNpcImgUrl: "lo-keno.png",
				listBgImgUrl: "gameListHover.png",
				menuType: defMenuType.entPage,
				parameter: { ...productList.keno }
			},
			{
				...productList.lottery,
				className: "lottery",
				displayKey: "lbl_Lottery",
				listNpcImgUrl: "lo-lottery.png",
				listBgImgUrl: "gameListHover.png",
				menuType: defMenuType.entPage,
				parameter: { ...productList.lottery }
			},
			{
				...productList.numberGame,
				path: path.sports.root,
				className: "numberGame",
				displayKey: "lbl_NumberGame",
				listNpcImgUrl: "lo-numberGame.png",
				listBgImgUrl: "gameListHover.png",
				menuType: defMenuType.entPage,
				parameter: { ...productList.numberGame }
			},
			{
				...productList.tablegame,
				displayKey: "lbl_TableGame",
				listNpcImgUrl: "lo-tableGame.png",
				listBgImgUrl: "gameListHover.png",
				menuType: defMenuType.entPage,
				parameter: { ...productList.tablegame }
			},
			{
				...productList.indo4D,
				className: "indo",
				displayKey: "lbl_Indo4D",
				listNpcImgUrl: "lo-indo.png",
				listBgImgUrl: "gameListHover.png",
				menuType: defMenuType.entPage,
				parameter: { ...productList.indo4D }
			}
		]
	},
	promotion: {
		displayKey: "lbl_Promos",
		path: path.promotion.root
	},
	vip: {
		displayKey: "lbl_Vip",
		path: path.vip.root
	},
	tv: {
		displayKey: "lbl_TV",
		className: "tvbtn",
		path: path.streaming.root,
		eventIcons: [
			showEventIcon({
				icon: defEventIcon.live,
				period: defEventPeriod.tv
			})
		],
		subMenu: [
			{
				displayKey: "lbl_LIVE_SPORT",
				listNpcImgUrl: "home-livesports.png",
				listBgImgUrl: "livesportsbg.png",
				menuType: defMenuType.Link,
				path: path.streaming.root
			},
			{
				displayKey: "lbl_MOVIE_TV",
				listNpcImgUrl: "home-movie.png",
				listBgImgUrl: "moviebg.png",
				menuType: defMenuType.DirectUrl,
				path: "https://nova88tv.com/"
			}
		]
	},
	ranking: {
		displayKey: "lbl_Ranking",
		path: path.leaderBoard.root
	}
};
