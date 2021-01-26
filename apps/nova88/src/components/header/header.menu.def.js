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
	LinkOrBtn: "LinkOrBtn"
};

export const defMenuLinks = {
	home: {
		path: path.home.root,
		className: "icon icon-home"
	},
	sports: {
		productInfo: productList.sports,
		path: path.sports.root,
		displayKey: "lbl_Sports",
		className: "sportsbtn",
		subMenu: [
			{
				className: "icon",
				displayKey: "lbl_Soccer",
				listNpcImgUrl: "soccerNPC.png",
				listBgImgUrl: "soccerBG.png",
				menuType: defMenuType.Link,
				parameter: { ...productList.soccer },
				...productList.soccer
			},
			{
				className: "icon",
				displayKey: "lbl_SabaSoccer",
				listNpcImgUrl: "sabssoccerNPC.png",
				listBgImgUrl: "soccerBG.png",
				menuType: defMenuType.Link,
				parameter: { ...productList.sabaSoccer },
				...productList.sabaSoccer
			},
			{
				className: "icon",
				displayKey: "lbl_Basketball",
				listNpcImgUrl: "basketballNPC.png",
				listBgImgUrl: "basketballBG.png",
				menuType: defMenuType.Link,
				parameter: { ...productList.basketball },
				...productList.basketball
			},
			{
				className: "icon",
				displayKey: "lbl_Tennis",
				listNpcImgUrl: "tennisNPC.png",
				listBgImgUrl: "tennisBG.png",
				menuType: defMenuType.Link,
				parameter: { ...productList.tennis },
				...productList.tennis
			},
			{
				className: "icon",
				displayKey: "lbl_Baseball",
				listNpcImgUrl: "baseballNPC.png",
				listBgImgUrl: "baseballBG.png",
				menuType: defMenuType.Link,
				parameter: { ...productList.baseball },
				...productList.baseball
			},
			{
				className: "icon",
				displayKey: "lbl_Volleyball",
				listNpcImgUrl: "volleyballNPC.png",
				listBgImgUrl: "volleyballBG.png",
				menuType: defMenuType.Link,
				parameter: { ...productList.volleyball },
				...productList.volleyball
			},
			{
				className: "icon",
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
		className: "eSportsbtn"
		// subMenu: [
		// 	{
		// 		className: "icon",
		// 		displayKey: "lbl_eSports",
		// 		menuType: defMenuType.LinkOrBtn,
		// 		listNpcImgUrl: "esportALL.png",
		// 		listBgImgUrl: "eSportsListHover.png",
		// 		parameter: { ...productList.eSport },
		// 		...productList.eSport
		// 	},
		// 	{
		// 		className: "icon",
		// 		displayKey: "lbl_Dota2",
		// 		listNpcImgUrl: "esportDOTA2.png",
		// 		listBgImgUrl: "eSportsListHover.png",
		// 		menuType: defMenuType.LinkOrBtn,
		// 		parameter: { ...productList.eSport_Dota2 },
		// 		...productList.eSport_Dota2
		// 	},
		// 	{
		// 		className: "icon",
		// 		displayKey: "lbl_LeagueOfLegends",
		// 		menuType: defMenuType.LinkOrBtn,
		// 		listNpcImgUrl: "esportLOL.png",
		// 		listBgImgUrl: "eSportsListHover.png",
		// 		parameter: { ...productList.eSport_LeagueOfLegends },
		// 		...productList.eSport_LeagueOfLegends
		// 	},
		// 	{
		// 		className: "icon",
		// 		displayKey: "lbl_CSGO",
		// 		menuType: defMenuType.LinkOrBtn,
		// 		listNpcImgUrl: "esportCS.png",
		// 		listBgImgUrl: "eSportsListHover.png",
		// 		parameter: { ...productList.eSport_Csgo },
		// 		...productList.eSport_Csgo
		// 	},

		// 	{
		// 		className: "icon",
		// 		displayKey: "lbl_Kog",
		// 		menuType: defMenuType.LinkOrBtn,
		// 		listNpcImgUrl: "esportKOG.png",
		// 		listBgImgUrl: "eSportsListHover.png",
		// 		parameter: { ...productList.eSport_KingOfGlory },
		// 		...productList.eSport_KingOfGlory
		// 	}
		// ]
	},
	casino: {
		path: path.casino.root,
		displayKey: "lbl_Casino",
		className: "slotbtn icon",
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
				className: "icon",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.icg
					})
				],
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
			// {
			// 	className: "Kiss icon icon-new",
			// 	icon: "icon icon-kiss",
			// 	displayText: "918Kiss",
			// 	menuType: defMenuType.LinkOrBtn,
			// 	path: path["918kiss"].root,
			// 	...productList.kiss918
			// },
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
		subMenu: [
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
	lottery: {
		productInfo: productList.lottery,
		displayKey: "lbl_Lottery",
		className: "game",
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
				displayKey: "Indo 4D",
				menuType: defMenuType.LinkOrBtn,
				listNpcImgUrl: "lo-indo.png",
				listBgImgUrl: "gameListHover.png",
				parameter: { ...productList.indo4D }
			}
		]
	},
	fishing: {
		productInfo: productList.fishing,
		displayKey: "lbl_Fishing",
		className: "fishbtn icon",
		subMenu: [
			{
				...productList.ICG_DRAGONBALL_FISHING,
				className: "fsdf icon",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.icg
					})
				],
				displayKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
				menuType: defMenuType.entPage,
				listNpcImgUrl: "fishICG-DB.png",
				listBgImgUrl: "fishListHover.png",
				parameter: { ...productList.ICG_DRAGONBALL_FISHING }
			},
			{
				...productList.ICG_FISHING_OF_SAVIORS,
				className: "fsgfos icon",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.icg
					})
				],
				displayKey: "lbl_Game_ICG_FISHING_OF_SAVIORS",
				menuType: defMenuType.entPage,
				listNpcImgUrl: "fishICG-FOS.png",
				listBgImgUrl: "fishListHover.png",
				parameter: { ...productList.ICG_FISHING_OF_SAVIORS }
			},
			{
				...productList.ICG_THE_TYRANT_AND_THE_PRINCESS,
				className: "fsttatp icon",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.icg
					})
				],
				displayKey: "lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS",
				menuType: defMenuType.entPage,
				listNpcImgUrl: "fishICG-TTATP.png",
				listBgImgUrl: "fishListHover.png",
				parameter: {
					...productList.ICG_THE_TYRANT_AND_THE_PRINCESS
				}
			},
			{
				...productList.ICG_TOWER_OF_SAVIORS,
				className: "fstos icon",
				eventIcons: [
					showEventIcon({
						icon: defEventIcon.new,
						period: defEventPeriod.icg
					})
				],
				displayKey: "lbl_Game_ICG_TOWER_OF_SAVIORS",
				menuType: defMenuType.entPage,
				listNpcImgUrl: "fishICG-TOS.png",
				listBgImgUrl: "fishListHover.png",
				parameter: { ...productList.ICG_TOWER_OF_SAVIORS }
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
	cockFighting: {
		productInfo: productList.cockFighting,
		displayKey: "lbl_CockFighting",
		className: "COCK"
	},
	promotion: {
		path: path.promotion.root,
		displayKey: "lbl_Promotions"
	},
	ranking: {
		path: path.leaderBoard.root,
		displayKey: "lbl_Ranking",
		className: "live"
	}
};

export const defSubListClassName = {
	sports: "sportsList",
	eSports: "eSportsList",
	casino: "casinoList",
	liveCasino: "livecasinoList",
	lottery: "gameList",
	fishing: "fishList"
};
