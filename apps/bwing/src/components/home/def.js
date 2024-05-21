import { products } from "@ailab-desktop/common";
import path from "../../router";
import { bannerImgUrl } from "../../config";
import { defMenuType } from "../layout/header.menu.newDef";

export const HOT_GAME_LIST = [
	{
		displayKey: "lbl_Sports",
		image: "sports",
		menuType: defMenuType.Link,
		parameter: { game: "Soccer" },
		path: path.sports.root,
		...products.Soccer
	},
	{
		displayKey: "lbl_Jackpot",
		image: "jackpot",
		menuType: defMenuType.Link,
		// * 屬於Slot遊戲類別中的 category
		slotCategory: "jackpot",
		path: path.casino.root
	},
	{
		displayKey: "lbl_LiveCasino",
		image: "livecasino",
		menuType: defMenuType.Link,
		path: path.liveCasino.root
	},
	{
		displayKey: "lbl_Vgaming",
		image: "vgaming",
		menuType: defMenuType.entPage,
		...products.Vgaming
	},
	{
		displayKey: "lbl_SEDIE",
		image: "sedie",
		...products["789SeDie"],
		menuType: defMenuType.entPage,
		icon: "tag-live"
	},
	{
		displayKey: "lbl_Keno",
		image: "keno",
		...products.Keno,
		menuType: defMenuType.entPage
	},
	{
		displayKey: "lbl_Fishing",
		image: "fishing",
		menuType: defMenuType.Link,
		path: path.fishing.root
	},
	{
		displayKey: "lbl_QuickGames",
		image: "qgames",
		menuType: defMenuType.Link,
		path: path.games.root
	},
	{
		displayKey: "lbl_Lottery",
		image: "lottery",
		...products.TraditionalLottery,
		menuType: defMenuType.entPage,
		icon: "tag-live"
	}
];

export const SPORT_LIST = {
	en: [
		{
			...products.SBOBET,
			menuType: defMenuType.Link,
			path: path.sports.root,
			parameter: { game: "SBOBET" },
			isNeedLogin: true,
			displayText: "SBOBET",
			img: `${bannerImgUrl}/desktop/img/4.0/sbo.png`
		},
		{
			...products.Soccer,
			menuType: defMenuType.Link,
			parameter: { game: "Soccer" },
			path: path.sports.root,
			img: `${bannerImgUrl}/desktop/img/4.0/saba.png`,
			displayKey: "lbl_SabaSport"
		},
		{
			...products.BtiSport,
			menuType: defMenuType.Link,
			path: path.sports.root,
			parameter: { game: "BtiSport" },
			displayKey: "lbl_BTISport",
			img: `${bannerImgUrl}/desktop/img/4.0/bti.png`
		},
		{
			...products.VirtualSports,
			menuType: defMenuType.Link,
			path: path.sports.root,
			parameter: { game: "VirtualSports" },
			displayKey: "lbl_VirtualSports",
			img: `${bannerImgUrl}/desktop/img/4.0/virtual.png`
		},
		{
			...products.IMSports,
			menuType: defMenuType.Link,
			path: path.sports.root,
			parameter: { game: "IMSports" },
			displayText: "IM Sports",
			img: `${bannerImgUrl}/desktop/img/4.0/im.png`
		}
	],
	vn: [
		{
			...products.SBOBET,
			menuType: defMenuType.Link,
			path: path.sports.root,
			parameter: { game: "SBOBET" },
			isNeedLogin: true,
			displayText: "SBOBET",
			img: `${bannerImgUrl}/desktop/img/4.0/sbo-vn.png`
		},
		{
			...products.Soccer,
			menuType: defMenuType.Link,
			path: path.sports.root,
			parameter: { game: "Soccer" },
			displayKey: "lbl_SabaSport",
			img: `${bannerImgUrl}/desktop/img/4.0/saba-vn.png`
		},
		{
			...products.BtiSport,
			menuType: defMenuType.Link,
			path: path.sports.root,
			parameter: { game: "BtiSport" },
			displayKey: "lbl_BTISport",
			img: `${bannerImgUrl}/desktop/img/4.0/bti-vn.png`
		},
		{
			...products.VirtualSports,
			menuType: defMenuType.Link,
			path: path.sports.root,
			parameter: { game: "VirtualSports" },
			displayKey: "lbl_VirtualSports",
			img: `${bannerImgUrl}/desktop/img/4.0/virtual-vn.png`
		},
		{
			...products.IMSports,
			menuType: defMenuType.Link,
			path: path.sports.root,
			parameter: { game: "IMSports" },
			displayText: "IM Sports",
			img: `${bannerImgUrl}/desktop/img/4.0/im-vn.png`
		}
	]
};

export const rankMap = {
	1: "1st",
	2: "2nd",
	3: "3rd"
};
