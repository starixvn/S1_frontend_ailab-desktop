import productList from "../../datas/productList";
import path from "../../router";

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
		displayKey: "lbl_Sports"
	},
	eSport: {
		productInfo: productList.eSport,
		path: path.sports.root,
		displayKey: "lbl_eSports"
	},
	casino: {
		path: path.casino.root,
		displayKey: "lbl_Casino",
		className: "COCK icon icon-new",
		subMenu: [
			{
				className: "PP",
				icon: "icon icon-PP",
				displayText: "PP",
				menuType: defMenuType.Link,
				parameter: { ...productList.casino_PP },
				...productList.casino_PP
			},
			{
				className: "ICG icon icon-new",
				icon: "icon icon-ICG",
				displayText: "ICG",
				menuType: defMenuType.Link,
				parameter: { ...productList.casino_ICG },
				...productList.casino_ICG
			},
			{
				className: "JOKER",
				icon: "icon icon-JOKER",
				displayText: "JOKER",
				menuType: defMenuType.Link,
				parameter: { ...productList.casino_JOKER },
				...productList.casino_JOKER
			},
			{
				className: "CQ9",
				icon: "icon icon-cq9",
				displayText: "CQ9",
				menuType: defMenuType.Link,
				parameter: { ...productList.casino_CQ9 },
				...productList.casino_CQ9
			},
			{
				className: "GPI",
				icon: "icon icon-GPI",
				displayText: "GPI",
				menuType: defMenuType.Link,
				parameter: { ...productList.casino_GPI },
				...productList.casino_GPI
			},
			{
				className: "YGG",
				icon: "icon icon-YGG",
				displayText: "YGG",
				menuType: defMenuType.Link,
				parameter: { ...productList.casino_YGG },
				...productList.casino_YGG
			},
			{
				className: "SG",
				icon: "icon icon-SG",
				displayText: "SG",
				menuType: defMenuType.Link,
				parameter: { ...productList.casino_SG },
				...productList.casino_SG
			},
			{
				className: "PG",
				icon: "icon icon-PG",
				displayText: "PG",
				menuType: defMenuType.Link,
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
				className: "OW",
				icon: "icon icon-OW",
				displayText: "OW",
				menuType: defMenuType.entPage,
				...productList.casino_OW
			}
		]
	},
	liveCasino: {
		displayKey: "lbl_LiveCasino",
		subMenu: [
			{
				...productList.liveCasino_WM,
				className: "liveWM",
				icon: "icon icon-WM",
				displayText: "WM",
				menuType: defMenuType.entPage
			},
			{
				...productList.liveCasino_Allbet,
				className: "liveALL",
				icon: "icon icon-AB",
				displayText: "Allbet",
				menuType: defMenuType.entPage
			},
			{
				...productList.liveCasino_eBET,
				className: "liveEB",
				icon: "icon icon-EB",
				displayText: "eBET",
				menuType: defMenuType.entPage
			},
			{
				...productList.liveCasino_SA,
				className: "liveSA",
				icon: "icon icon-SA",
				displayText: "SA",
				menuType: defMenuType.entPage
			},
			{
				...productList.liveCasino_AE,
				className: "liveAE",
				icon: "icon icon-AE",
				displayText: "AE",
				menuType: defMenuType.entPage
			},
			{
				...productList.liveCasino_PP,
				className: "livePP",
				icon: "icon icon-PP",
				displayText: "PP",
				menuType: defMenuType.entPage
			},
			{
				...productList.liveCasino_DG,
				className: "liveDG",
				icon: "icon icon-DG",
				displayText: "DG",
				menuType: defMenuType.entPage
			},
			{
				...productList.liveCasino_AG,
				className: "liveAG",
				icon: "icon icon-AG",
				displayText: "AG",
				menuType: defMenuType.entPage
			}
		]
	},
	lottery: {
		productInfo: productList.lottery,
		displayKey: "lbl_Lottery",
		subMenu: [
			{
				...productList.keno,
				className: "keno",
				displayKey: "lbl_Keno",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.keno }
			},
			{
				...productList.lottery,
				className: "lottery",
				displayKey: "lbl_Lottery",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.lottery }
			},
			{
				...productList.numberGame,
				path: path.sports.root,
				className: "numberGame",
				displayKey: "lbl_NumberGame",
				menuType: defMenuType.Link,
				parameter: { ...productList.numberGame }
			},
			{
				...productList.indo4D,
				className: "indo",
				displayKey: "Indo 4D",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.indo4D }
			}
		]
	},
	fishing: {
		productInfo: productList.fishing,
		displayKey: "lbl_Fishing",
		className: "icon icon-new",
		subMenu: [
			{
				...productList.ICG_DRAGONBALL_FISHING,
				className: "fsdf icon icon-new",
				displayKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
				menuType: defMenuType.entPage,
				parameter: { ...productList.ICG_DRAGONBALL_FISHING }
			},
			{
				...productList.ICG_FISHING_OF_SAVIORS,
				className: "fsgfos icon icon-new",
				displayKey: "lbl_Game_ICG_FISHING_OF_SAVIORS",
				menuType: defMenuType.entPage,
				parameter: { ...productList.ICG_FISHING_OF_SAVIORS }
			},
			{
				...productList.ICG_THE_TYRANT_AND_THE_PRINCESS,
				className: "fsttatp icon icon-new",
				displayKey: "lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS",
				menuType: defMenuType.entPage,
				parameter: { ...productList.ICG_THE_TYRANT_AND_THE_PRINCESS }
			},
			{
				...productList.ICG_TOWER_OF_SAVIORS,
				className: "fstos icon icon-new",
				displayKey: "lbl_Game_ICG_TOWER_OF_SAVIORS",
				menuType: defMenuType.entPage,
				parameter: { ...productList.ICG_TOWER_OF_SAVIORS }
			},
			{
				...productList.fishing,
				className: "fgg",
				displayKey: "lbl_FishingGG",
				menuType: defMenuType.entPage,
				parameter: { ...productList.fishing }
			},
			{
				...productList.fishing_SG,
				className: "fsg",
				displayKey: "lbl_FishingSG1",
				menuType: defMenuType.entPage,
				parameter: { ...productList.fishing_SG }
			},
			{
				...productList.fishing_SGW,
				className: "fsgw",
				displayKey: "lbl_FishingSG2",
				menuType: defMenuType.entPage,
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
	},
	poker: {
		// productInfo: productList.poker,
		path: path.oneGame.root,
		displayKey: "lbl_Poker",
		className: "icon icon-new"
	}
};

export const defSubListClassName = {
	casino: "casinoList",
	liveCasino: "livecasinoList",
	lottery: "gameList",
	fishing: "fishList"
};
