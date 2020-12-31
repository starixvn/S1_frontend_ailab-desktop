import productList, { defCasinoProviders } from "../../datas/productList";
import path from "../../router";

export const defMenuType = {
	entPage: "entPage",
	Link: "Link",
	LinkOrBtn: "LinkOrBtn"
};

export const defMenuLinks = {
	sports: {
		productInfo: productList.soccer,
		path: path.sports.root,
		displayKey: "lbl_Sports"
	},
	// cockFighting: {
	// 	productInfo: productList.cockFighting,
	// 	displayKey: "lbl_CockFighting"
	// },
	// sabaClub: {
	// 	productInfo: productList.sabaClub,
	// 	displayKey: "lbl_SabaClub"
	// },
	games: {
		displayKey: "lbl_Games",
		className: "game icon icon-newicon",
		subMenu: [
			{
				...productList.One789_lottery,
				path: path.sports.root,
				className: "traditional",
				isNew: true,
				displayKey: "lbl_TraditionalLottery",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.One789_lottery }
			},
			{
				...productList.One789_lottery_789,
				path: path.sports.root,
				className: "one789",
				isNew: true,
				displayKey: "lbl_789Lottery",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.One789_lottery_789 }
			},
			{
				...productList.sabaClub,
				path: path.sports.root,
				className: "sabaclub",
				displayKey: "lbl_SabaClub",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.sabaClub }
			},
			{
				...productList.keno,
				path: path.sports.root,
				className: "keno",
				displayKey: "lbl_Keno",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.keno }
			},
			{
				...productList.lottery,
				path: path.sports.root,
				className: "lottery",
				displayKey: "lbl_Lottery",
				menuType: defMenuType.LinkOrBtn,
				parameter: { ...productList.lottery }
			}
		]
	},
	// numberGame: {
	// 	productInfo: productList.numberGame,
	// 	path: path.sports.root,
	// 	displayKey: "lbl_NumberGame"
	// },
	// virtualSport: {
	// 	productInfo: productList.virtualSports,
	// 	path: path.sports.root,
	// 	displayKey: "lbl_VirtualSport"
	// },
	eSport: {
		productInfo: productList.eSport,
		path: path.sports.root,
		displayKey: "lbl_eSports"
	},
	casino: {
		path: path.casino.root,
		displayKey: "lbl_Slots",
		className: "casinobtn icon icon-newicon",
		subMenu: [
			{
				...defCasinoProviders.ICG,
				className: "ICG",
				isNew: true,
				icon: "icon icon-ICG",
				displayText: "ICG",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.ICG.name }
			},
			{
				...defCasinoProviders.CQ9,
				className: "CQ9",
				isNew: true,
				icon: "icon icon-cq9",
				displayText: "CQ9",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.CQ9.name }
			},
			{
				...defCasinoProviders.GPI,
				className: "GPI",
				icon: "icon icon-GPI",
				displayText: "GPI",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.GPI.name }
			},
			{
				...defCasinoProviders.YGG,
				className: "YGG",
				icon: "icon icon-YGG",
				displayText: "YGG",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.YGG.name }
			},
			{
				...defCasinoProviders.SG,
				className: "SG",
				icon: "icon icon-SG",
				displayText: "SG",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.SG.name }
			},
			{
				...defCasinoProviders.PP,
				className: "PP",
				icon: "icon icon-PP",
				displayText: "PP",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.PP.name }
			},
			{
				...defCasinoProviders.PG,
				className: "PG",
				icon: "icon icon-PG",
				displayText: "PG",
				menuType: defMenuType.Link,
				parameter: { provider: defCasinoProviders.PG.name }
			},
			{
				...defCasinoProviders.OW,
				className: "OW",
				icon: "icon icon-OW",
				displayText: "OW",
				menuType: defMenuType.entPage
			}
		]
	},
	liveCasino: {
		displayKey: "lbl_LiveCasino",
		className: "livecasinobtn icon icon-newicon",
		subMenu: [
			{
				...productList.liveCasino_One789,
				className: "live789",
				icon: "icon icon-one789",
				isNew: true,
				displayKey: "lbl_liveCasino_789SeDie",
				menuType: defMenuType.entPage
			},
			{
				gameId: 20,
				tpId: 20,
				className: "liveWM",
				icon: "icon icon-WM",
				displayText: "WM",
				menuType: defMenuType.entPage
			},
			{
				gameId: 4,
				tpId: 4,
				className: "liveDG",
				icon: "icon icon-DG",
				displayText: "DG",
				menuType: defMenuType.entPage
			},
			{
				gameId: 12,
				tpId: 12,
				className: "liveALL",
				icon: "icon icon-AB",
				displayText: "Allbet",
				menuType: defMenuType.entPage
			},
			{
				gameId: 3,
				tpId: 3,
				className: "liveAG",
				icon: "icon icon-AG",
				displayText: "AG",
				menuType: defMenuType.entPage
			},
			{
				gameId: 101,
				tpId: 5,
				className: "livePP",
				icon: "icon icon-PP",
				displayText: "PP",
				menuType: defMenuType.entPage
			},
			{
				gameId: 2,
				tpId: 2,
				className: "liveSA",
				icon: "icon icon-SA",
				displayText: "SA",
				menuType: defMenuType.entPage
			},
			{
				gameId: 15,
				tpId: 15,
				className: "liveAE",
				icon: "icon icon-AE",
				displayText: "AE",
				menuType: defMenuType.entPage
			},
			{
				gameId: 18,
				tpId: 18,
				className: "liveEB",
				icon: "icon icon-EB",
				displayText: "eBET",
				menuType: defMenuType.entPage
			}
		]
	},
	fishing: {
		productInfo: productList.fishing,
		displayKey: "lbl_Fishing",
		subMenu: [
			{
				...productList.ICG_DRAGONBALL_FISHING,
				className: "fsdf",
				isNew: true,
				displayKey: "lbl_Game_ICG_DRAGONBALL_FISHING",
				menuType: defMenuType.entPage,
				parameter: { ...productList.ICG_DRAGONBALL_FISHING }
			},
			{
				...productList.ICG_FISHING_OF_SAVIORS,
				className: "fsgfos",
				isNew: true,
				displayKey: "lbl_Game_ICG_FISHING_OF_SAVIORS",
				menuType: defMenuType.entPage,
				parameter: { ...productList.ICG_FISHING_OF_SAVIORS }
			},
			{
				...productList.ICG_THE_TYRANT_AND_THE_PRINCESS,
				className: "fsttatp",
				isNew: true,
				displayKey: "lbl_Game_ICG_THE_TYRANT_AND_THE_PRINCESS",
				menuType: defMenuType.entPage,
				parameter: { ...productList.ICG_THE_TYRANT_AND_THE_PRINCESS }
			},
			{
				...productList.ICG_TOWER_OF_SAVIORS,
				className: "fstos",
				isNew: true,
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
	promotion: {
		path: path.promotion.root,
		displayKey: "lbl_Promotions"
	},
	affiliate: {
		affiliate: true,
		displayKey: "lbl_Affiliates"
	},
	ranking: {
		path: path.leaderBoard.root,
		displayKey: "lbl_Ranking",
		className: "liveIcon"
	}
	// lottery: {
	// 	productInfo: productList.lottery,
	// 	path: path.sports.root,
	// 	displayKey: "lbl_KenoAndLottery"
	// }
	// fishing: {
	// 	productInfo: productList.fishing,
	// 	path: path.sports.root,
	// 	displayKey: "lbl_Fishing"
	// }
};

export const defSubListClassName = {
	casino: "casinoList",
	liveCasino: "livecasinoList",
	games: "gameList",
	fishing: "fishList"
};
