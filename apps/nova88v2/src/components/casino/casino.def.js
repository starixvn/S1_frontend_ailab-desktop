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
		lobbyImgName: "pp",
		lobbyDisplayName: "pp",
		providerId: productList.casino_PP.tpId
	},
	{
		lobbyImgName: "gp",
		lobbyDisplayName: "GAMEPLAY",
		providerId: productList.casino_GPI.tpId
	},
	{
		lobbyImgName: "yg",
		lobbyDisplayName: "YGGDRASIL",
		providerId: productList.casino_YGG.tpId
	},
	{
		lobbyImgName: "jk",
		lobbyDisplayName: "JOKER",
		providerId: productList.casino_JOKER.tpId
	},
	{
		lobbyImgName: "sg",
		lobbyDisplayName: "SPADEGAMING",
		providerId: productList.casino_SG.tpId
	},
	{
		lobbyImgName: "pg",
		lobbyDisplayName: "POCHETGAMES",
		providerId: productList.casino_PG.tpId
	},
	{
		lobbyImgName: "cq9",
		lobbyDisplayName: "CQ9",
		providerId: productList.casino_CQ9.tpId
	},
	{
		lobbyImgName: "icg",
		lobbyDisplayName: "ICG",
		providerId: productList.casino_ICG.tpId
	},
	{
		lobbyImgName: "pt",
		lobbyDisplayName: "PLAYTECH",
		providerId: productList.casino_PT.tpId
	},
	{
		lobbyImgName: "ow",
		lobbyDisplayName: "OW",
		providerId: productList.casino_OW.tpId
	}
];
