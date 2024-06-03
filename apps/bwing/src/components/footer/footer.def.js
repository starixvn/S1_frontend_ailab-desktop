import { products } from "@ailab-desktop/common";
import { defMenuType } from "../layout/header.menu.newDef";

export const defSportsBetting = [
	{
		...products.Soccer,
		footerDisplayKey: "lbl_SoccerBetting",
		menuType: defMenuType.entPage
	},
	{
		...products.Basketball,
		footerDisplayKey: "lbl_BasketballBetting",
		menuType: defMenuType.entPage
	},
	{
		...products.BaseBall,
		displayKey: "lbl_BaseballBetting",
		menuType: defMenuType.entPage
	},
	{
		...products.Football,
		footerDisplayKey: "lbl_FootballBetting",
		menuType: defMenuType.entPage
	},
	{
		...products.Tennis,
		footerDisplayKey: "lbl_TennisBetting",
		menuType: defMenuType.entPage
	},
	{
		...products.Hockey,
		footerDisplayKey: "lbl_HockeyBetting",
		menuType: defMenuType.entPage
	},
	{
		...products.ESportALL,
		footerDisplayKey: "lbl_eSportsBetting",
		menuType: defMenuType.entPage
	}
];
