import productList from "../../datas/productList";
import path from "../../router";
import {
	defEventIcon,
	defEventPeriod,
	showEventIcon
} from "../common/eventIcon";

export const defMenuType = {
	entPage: "entPage",
	Link: "Link",
	LinkOrBtn: "LinkOrBtn",
	LinkNoImg: "LinkNoImg",
	DirectUrl: "DirectUrl"
};

export const defSubListClassName = {
	home: "homeList",
	sports: "sportsList",
	eSports: "eSportsList",
	casino: "casinoList",
	liveCasino: "livecasinoList",
	poker: "pokerList",
	lottery: "gameList",
	fishing: "fishList",
	promotion: "promoList",
	tv: "tvList",
	vip: "vipList",
	ranking: "rankingList"
};

export const defMenuLinks = {
	home: {
		path: path.home.root,
		className: "icon icon-home",
		menuType: defMenuType.Link,
		subMenu: [
			{
				displayKey: "lbl_Vip",
				listNpcImgUrl: "home-vip.png",
				listBgImgUrl: "vipbg.png",
				menuType: defMenuType.Link,
				path: path.vip.root
			},
			{
				displayKey: "lbl_Live_Streaming",
				listNpcImgUrl: "home-livesports.png",
				listBgImgUrl: "livesportsbg.png",
				menuType: defMenuType.Link,
				path: path.streaming.root
			},
			{
				displayKey: "lbl_TV",
				listNpcImgUrl: "home-movie.png",
				listBgImgUrl: "moviebg.png",
				menuType: defMenuType.DirectUrl,
				path: "https://nova88tv.com/"
			}
		]
	},
	sports: {
		productInfo: productList.sports,
		path: path.sports.root,
		displayKey: "lbl_Sports",
		className: "sportsbtn",
		filterByAuth: true,
		subMenu: [
			{
				displayKey: "lbl_Soccer",
				listNpcImgUrl: "soccerNPC.png",
				listBgImgUrl: "soccerBG.png",
				menuType: defMenuType.Link,
				parameter: { ...productList.soccer },
				...productList.soccer
			},
			{
				displayKey: "lbl_SabaSoccer",
				listNpcImgUrl: "sabssoccerNPC.png",
				listBgImgUrl: "soccerBG.png",
				menuType: defMenuType.Link,
				parameter: { ...productList.sabaSoccer },
				...productList.sabaSoccer
			},
			{
				displayKey: "lbl_Basketball",
				listNpcImgUrl: "basketballNPC.png",
				listBgImgUrl: "basketballBG.png",
				menuType: defMenuType.Link,
				parameter: { ...productList.basketball },
				...productList.basketball
			},
			{
				displayKey: "lbl_Tennis",
				listNpcImgUrl: "tennisNPC.png",
				listBgImgUrl: "tennisBG.png",
				menuType: defMenuType.Link,
				parameter: { ...productList.tennis },
				...productList.tennis
			},
			{
				displayKey: "lbl_Cricket",
				listNpcImgUrl: "cricketNPC.png",
				listBgImgUrl: "cricketBG.png",
				menuType: defMenuType.Link,
				parameter: { ...productList.cricket },
				...productList.cricket
			}
		]
	},
	eSports: {
		productInfo: productList.eSport,
		path: path.sports.root,
		displayKey: "lbl_eSports",
		className: "eSportsbtn",
		subMenu: [
			{
				displayKey: "lbl_All",
				listNpcImgUrl: "esportALL.png",
				listBgImgUrl: "eSportsListHover.png",
				menuType: defMenuType.Link,
				parameter: { ...productList.eSport_All },
				...productList.eSport_All
			},
			{
				displayKey: "lbl_Dota2",
				listNpcImgUrl: "esportDOTA2.png",
				listBgImgUrl: "eSportsListHover.png",
				menuType: defMenuType.Link,
				parameter: { ...productList.eSport_DOTA2 },
				...productList.eSport_DOTA2
			},
			{
				displayKey: "lbl_LOL",
				listNpcImgUrl: "esportLOL.png",
				listBgImgUrl: "eSportsListHover.png",
				menuType: defMenuType.Link,
				parameter: { ...productList.eSport_LOL },
				...productList.eSport_LOL
			},
			{
				displayKey: "lbl_CSGO",
				listNpcImgUrl: "esportCS.png",
				listBgImgUrl: "eSportsListHover.png",
				menuType: defMenuType.Link,
				parameter: { ...productList.eSport_CSGO },
				...productList.eSport_CSGO
			},
			{
				displayKey: "lbl_Kog",
				listNpcImgUrl: "esportKOG.png",
				listBgImgUrl: "eSportsListHover.png",
				menuType: defMenuType.Link,
				parameter: { ...productList.eSport_KOG },
				...productList.eSport_KOG
			}
		]
	},
	casino: {
		path: path.casino.root,
		displayKey: "lbl_Casino",
		className: "slotbtn",
		filterByAuth: true,
		subMenu: [
			{
				icon: "icon icon-PP",
				displayText: "PP",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotPP.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_PP },
				...productList.casino_PP
			},
			{
				icon: "icon icon-ICG",
				displayText: "ICG",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotICG.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_ICG },
				...productList.casino_ICG
			},
			{
				icon: "icon icon-JOKER",
				displayText: "JOKER",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotJOKER.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_JOKER },
				...productList.casino_JOKER
			},
			{
				icon: "icon icon-cq9",
				displayText: "CQ9",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotCQ9.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_CQ9 },
				...productList.casino_CQ9
			},
			{
				icon: "icon icon-GPI",
				displayText: "GPI",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotGPI.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_GPI },
				...productList.casino_GPI
			},
			{
				icon: "icon icon-YGG",
				displayText: "YGG",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotYGG.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_YGG },
				...productList.casino_YGG
			},
			{
				icon: "icon icon-SG",
				displayText: "SG",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotSG.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_SG },
				...productList.casino_SG
			},
			{
				icon: "icon icon-PG",
				displayText: "PG",
				menuType: defMenuType.Link,
				listNpcImgUrl: "slotPG.png",
				listBgImgUrl: "slotListHover.png",
				parameter: { ...productList.casino_PG },
				...productList.casino_PG
			},
			{
				icon: "icon icon-OW",
				displayText: "OW",
				menuType: defMenuType.entPage,
				listNpcImgUrl: "slotOW.png",
				listBgImgUrl: "slotListHover.png",
				...productList.casino_OW
			}
		]
	},
	liveCasino: {
		displayKey: "lbl_LiveCasino",
		className: "livecasinobtn",
		filterByAuth: true,
		subMenu: [
			{
				...productList.liveCasino_N2,
				displayText: "N2Live",
				listNpcImgUrl: "casino-n2.png",
				listBgImgUrl: ["n2bg.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage,
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.n2
					})
				]
			},
			{
				...productList.liveCasino_WM,
				className: "liveWM",
				icon: "icon icon-WM",
				displayText: "WM",
				listNpcImgUrl: "casino-WM.png",
				listBgImgUrl: ["wmBG.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage
			},
			{
				...productList.liveCasino_Allbet,
				className: "liveALL",
				icon: "icon icon-AB",
				displayText: "Allbet",
				listNpcImgUrl: "casino-ALL.png",
				listBgImgUrl: ["allBG.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage
			},
			{
				...productList.liveCasino_eBET,
				className: "liveEB",
				icon: "icon icon-EB",
				displayText: "eBET",
				listNpcImgUrl: "casino-EB.png",
				listBgImgUrl: ["ebBG.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage
			},
			{
				...productList.liveCasino_SA,
				className: "liveSA",
				icon: "icon icon-SA",
				displayText: "SA",
				listNpcImgUrl: "casino-SA.png",
				listBgImgUrl: ["saBG.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage
			},
			{
				...productList.liveCasino_AE,
				className: "liveAE",
				icon: "icon icon-AE",
				displayText: "AE",
				listNpcImgUrl: "casino-AE.png",
				listBgImgUrl: ["aeBG.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage
			},
			{
				...productList.liveCasino_PP,
				className: "livePP",
				icon: "icon icon-PP",
				displayText: "PP",
				listNpcImgUrl: "casino-PP.png",
				listBgImgUrl: ["ppBG.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage
			},
			{
				...productList.liveCasino_DG,
				className: "liveDG",
				icon: "icon icon-DG",
				displayText: "DG",
				listNpcImgUrl: "casino-DG.png",
				listBgImgUrl: ["dgBG.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage
			},
			{
				...productList.liveCasino_AG,
				className: "liveAG",
				icon: "icon icon-AG",
				displayText: "AG",
				listNpcImgUrl: "casino-AG.png",
				listBgImgUrl: ["agBG.png", "livecasinListHover.png"],
				menuType: defMenuType.entPage
			}
		]
	},
	poker: {
		productInfo: productList.poker,
		path: path.oneGame.root,
		displayKey: "lbl_Poker",
		className: "pokerbtn",
		openPopBox: true
	},
	lottery: {
		productInfo: productList.lottery,
		displayKey: "lbl_Lottery",
		className: "game",
		filterByAuth: true,
		subMenu: [
			{
				...productList.keno,
				className: "keno",
				displayKey: "lbl_Keno",
				menuType: defMenuType.LinkOrBtn,
				listNpcImgUrl: "lo-keno.png",
				listBgImgUrl: "gameListHover.png",
				parameter: { ...productList.keno }
			},
			{
				...productList.lottery,
				className: "lottery",
				displayKey: "lbl_Lottery",
				menuType: defMenuType.LinkOrBtn,
				listNpcImgUrl: "lo-lottery.png",
				listBgImgUrl: "gameListHover.png",
				parameter: { ...productList.lottery }
			},
			{
				...productList.numberGame,
				path: path.sports.root,
				className: "numberGame",
				displayKey: "lbl_NumberGame",
				menuType: defMenuType.LinkOrBtn,
				listNpcImgUrl: "lo-numberGame.png",
				listBgImgUrl: "gameListHover.png",
				parameter: { ...productList.numberGame }
			},
			{
				...productList.tablegame,
				displayKey: "lbl_TableGame",
				menuType: defMenuType.LinkOrBtn,
				listNpcImgUrl: "lo-tableGame.png",
				listBgImgUrl: "gameListHover.png",
				parameter: { ...productList.tablegame }
			},
			{
				...productList.indo4D,
				className: "indo",
				displayKey: "lbl_Indo4D",
				menuType: defMenuType.LinkOrBtn,
				listNpcImgUrl: "lo-indo.png",
				listBgImgUrl: "gameListHover.png",
				parameter: { ...productList.indo4D }
			}
		]
	},
	fishing: {
		// productInfo: productList.fishing,
		displayKey: "lbl_Fishing",
		className: "fishbtn",
		filterByAuth: true,
		subMenu: [
			{
				...productList.CQ9_Paradise,
				className: "fsgw",
				listNpcImgUrl: "paradise.png",
				listBgImgUrl: "fishListHover.png",
				displayKey: "lbl_Paradise",
				menuType: defMenuType.entPage,
				parameter: { ...productList.CQ9_Paradise }
			},
			{
				...productList.CQ9_Oneshot_Fishing,
				className: "fsgw",
				listNpcImgUrl: "oneshotfishing.png",
				listBgImgUrl: "fishListHover.png",
				displayKey: "lbl_Oneshot_Fishing",
				menuType: defMenuType.entPage,
				parameter: { ...productList.CQ9_Oneshot_Fishing }
			},
			{
				...productList.ICG_DRAGONBALL_FISHING,
				className: "fsdf",
				displayKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
				menuType: defMenuType.entPage,
				listNpcImgUrl: "fishICG-DB.png",
				listBgImgUrl: "fishListHover.png",
				parameter: { ...productList.ICG_DRAGONBALL_FISHING }
			},
			{
				...productList.ICG_FISHING_OF_SAVIORS,
				className: "fsgfos",
				displayKey: "lbl_Game_ICG_FISHING_OF_SAVIORS",
				menuType: defMenuType.entPage,
				listNpcImgUrl: "fishICG-FOS.png",
				listBgImgUrl: "fishListHover.png",
				parameter: { ...productList.ICG_FISHING_OF_SAVIORS }
			},
			{
				...productList.ICG_THE_TYRANT_AND_THE_PRINCESS,
				className: "fsttatp",
				displayKey: "lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS",
				menuType: defMenuType.entPage,
				listNpcImgUrl: "fishICG-TTATP.png",
				listBgImgUrl: "fishListHover.png",
				parameter: {
					...productList.ICG_THE_TYRANT_AND_THE_PRINCESS
				}
			},
			{
				...productList.fishing,
				className: "fgg",
				displayKey: "lbl_FishingGG",
				menuType: defMenuType.entPage,
				listNpcImgUrl: "fishGG.png",
				listBgImgUrl: "fishListHover.png",
				parameter: { ...productList.fishing }
			},
			{
				...productList.fishing_SG,
				className: "fsg",
				displayKey: "lbl_FishingSG1",
				menuType: defMenuType.entPage,
				listNpcImgUrl: "fishSG.png",
				listBgImgUrl: "fishListHover.png",
				parameter: { ...productList.fishing_SG }
			},
			{
				...productList.fishing_SGW,
				className: "fsgw",
				displayKey: "lbl_FishingSG2",
				menuType: defMenuType.entPage,
				listNpcImgUrl: "fishSGwar.png",
				listBgImgUrl: "fishListHover.png",
				parameter: { ...productList.fishing_SGW }
			}
		]
	},
	promotion: {
		path: path.promotion.root,
		displayKey: "lbl_Promotions",
		className: "promobtn",
		subMenu: [
			{
				displayKey: "lbl_Promotion_Link_1",
				menuType: defMenuType.LinkNoImg,
				path: path.promotion.root
			},
			{
				displayKey: "lbl_Promotion_Link_2",
				menuType: defMenuType.LinkNoImg,
				path: path.promotion.root
			},
			{
				displayKey: "lbl_Promotion_Link_3",
				menuType: defMenuType.LinkNoImg,
				path: path.promotion.root
			},
			{
				displayKey: "lbl_Promotion_Link_4",
				menuType: defMenuType.LinkNoImg,
				path: path.promotion.root
			}
		]
	},
	tv: {
		displayKey: "lbl_TV",
		className: "tvbtn",
		menuType: defMenuType.Link,
		eventIcons: [
			showEventIcon({
				icon: defEventIcon.live,
				period: defEventPeriod.tv
			})
		],
		subMenu: [
			{
				displayKey: "lbl_Live_Streaming",
				listNpcImgUrl: "home-livesports.png",
				listBgImgUrl: "livesportsbg.png",
				menuType: defMenuType.Link,
				path: path.streaming.root
			},
			{
				displayKey: "lbl_TV",
				listNpcImgUrl: "home-movie.png",
				listBgImgUrl: "moviebg.png",
				menuType: defMenuType.DirectUrl,
				path: "https://nova88tv.com/"
			}
		]
	},
	vip: {
		path: path.vip.root,
		displayKey: "lbl_Vip",
		menuType: defMenuType.Link,
		eventIcons: [
			showEventIcon({
				icon: defEventIcon.new,
				period: defEventPeriod.vip
			})
		]
	},
	ranking: {
		path: path.leaderBoard.root,
		displayKey: "lbl_Ranking",
		eventIcons: [
			showEventIcon({
				icon: defEventIcon.live,
				period: defEventPeriod.ranking
			})
		]
	}
};
