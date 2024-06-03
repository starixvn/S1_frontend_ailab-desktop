import { products } from "@ailab-desktop/common";
import path from "../../router";
import { defMenuType } from "../layout/header.menu.newDef";

export const defPartnerProduct = [
	{
		...products.Soccer,
		path: path.sports.root,
		parameter: { game: "Soccer" },
		imgName: "saba",
		menuType: defMenuType.Link
	},
	{
		...products.TFGaming,
		imgName: "tfg"
	},
	{
		...products.SBOBET,
		path: path.sports.root,
		parameter: { game: "SBOBET" },
		imgName: "sbo",
		menuType: defMenuType.Link
	},
	{
		...products.BtiSport,
		path: path.sports.root,
		parameter: { game: "BtiSport" },
		imgName: "bti",
		menuType: defMenuType.Link
	},
	{
		...products.AsiaGaming,
		imgName: "ag"
	},
	{
		...products.AESexy,
		imgName: "ae"
	},
	{
		...products.YGGDrassil,
		path: path.casino.root,
		parameter: { provider: products.YGGDrassil.tpId },
		imgName: "ygg",
		menuType: defMenuType.Link
	},
	{
		...products.CQ9,
		path: path.casino.root,
		parameter: { provider: products.CQ9.tpId },
		imgName: "cq9",
		menuType: defMenuType.Link
	},
	{
		...products.PlaynGO,
		path: path.casino.root,
		parameter: { provider: products.PlaynGO },
		imgName: "png",
		menuType: defMenuType.Link
	},
	{
		...products.JILI,
		path: path.casino.root,
		parameter: { provider: products.JILI.tpId },
		imgName: "jili",
		menuType: defMenuType.Link
	},
	{
		...products.V8Poker,
		imgName: "v8power"
	},
	{
		...products.KingMaker,
		imgName: "km"
	},
	{
		...products.TCG,
		imgName: "tc"
	},
	{
		...products.Nextspin,
		path: path.casino.root,
		parameter: { provider: products.Nextspin.tpId },
		imgName: "next",
		menuType: defMenuType.Link
	},
	{
		...products.IMSports,
		path: path.sports.root,
		parameter: { game: "IMSports" },
		imgName: "im",
		menuType: defMenuType.Link
	},
	{
		...products.IMESports,
		path: path.sportsIM.root,
		imgName: "im-esports"
	},
	{
		...products.SPRIBE,
		path: path.casino.root,
		parameter: { provider: products.SPRIBE.tpId },
		imgName: "spribe",
		menuType: defMenuType.Link
	},
	{
		...products.ES,
		path: path.casino.root,
		parameter: { provider: products.ES.tpId },
		imgName: "es",
		menuType: defMenuType.Link
	},
	{
		...products.WE,
		path: path.casino.root,
		imgName: "world"
	},
	{
		...products.FaChai,
		path: path.casino.root,
		parameter: { provider: products.FaChai.tpId },
		imgName: "fachai",
		menuType: defMenuType.Link
	}
];
