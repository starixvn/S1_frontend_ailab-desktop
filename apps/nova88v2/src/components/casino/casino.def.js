import productList from "../../datas/productList";

export const defRowsPerPage = 20;

export const defNav = {
	ALLGAMES: {
		key: "ALLGAMES",
		displayKey: "lbl_All"
	},
	PROMO: {
		key: "PROMO",
		displayKey: "lbl_Jackpot",
		hot: true
	},
	NEW: {
		key: "NEW",
		displayKey: "lbl_New"
	},
	FEATURED: {
		key: "FEATURED",
		displayKey: "lbl_Feature"
	},
	FAVOURITE: {
		key: "FAVOURITE",
		displayKey: "lbl_Favourite"
	}
};

export const defSearchColumn = {
	searchText: "searchText",
	provider: "provider",
	category: "category"
};

export const defCategoryId = {
	All: 0,
	Slots: 1,
	Table: 2
	// ScratchCard:3,
	// Arcade:4
};

export const defCategory = [
	{ displayKey: "lbl_AllGameType", id: defCategoryId.All },
	{ displayKey: "lbl_Slots", id: defCategoryId.Slots },
	{ displayKey: "lbl_Table", id: defCategoryId.Table }
];

export const defCategoryList = { 0: null, 1: "Slots", 2: "Table" };

export const defLobbyImgList = [
	{
		lobbyImgName: "ji",
		lobbyDisplayName: "JILI",
		providerId: productList.casino_JILI.tpId
	},
	{
		lobbyImgName: "pp",
		lobbyDisplayName: "Pragmatic Play",
		providerId: productList.casino_PP.tpId
	},
	{
		lobbyImgName: "nt",
		lobbyDisplayName: "NetEnt",
		providerId: productList.casino_NetEnt.tpId
	},
	{
		lobbyImgName: "gp",
		lobbyDisplayName: "Game Play",
		providerId: productList.casino_GPI.tpId
	},
	{
		lobbyImgName: "yg",
		lobbyDisplayName: "YGGDrassil",
		providerId: productList.casino_YGG.tpId
	},
	{
		lobbyImgName: "jk",
		lobbyDisplayName: "Joker",
		providerId: productList.casino_JOKER.tpId
	},
	{
		lobbyImgName: "sg",
		lobbyDisplayName: "Spadegaming",
		providerId: productList.casino_SG.tpId
	},
	{
		lobbyImgName: "pg",
		lobbyDisplayName: "PG Soft",
		providerId: productList.casino_PG.tpId
	},
	{
		lobbyImgName: "rt",
		lobbyDisplayName: "Red Tiger",
		providerId: productList.casino_RedTiger.tpId
	},
	{
		lobbyImgName: "cq9",
		lobbyDisplayName: "CQ9",
		providerId: productList.casino_CQ9.tpId
	},
	{
		lobbyImgName: "icg",
		lobbyDisplayName: "Iconic Gaming",
		providerId: productList.casino_ICG.tpId
	},
	{
		lobbyImgName: "pt",
		lobbyDisplayName: "Playtech",
		providerId: productList.casino_PT.tpId
	},
	{
		lobbyImgName: "ow",
		lobbyDisplayName: "Saba Casino",
		providerId: productList.casino_OW.tpId
	},
	{
		lobbyImgName: "mg",
		lobbyDisplayName: "Microgaming",
		providerId: productList.casino_MGPSW.tpId
	}
];
