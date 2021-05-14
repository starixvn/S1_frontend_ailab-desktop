export const defRowsPerPage = 20;

export const defNav = {
	ALLGAMES: {
		key: "ALLGAMES",
		displayKey: "lbl_All"
	},
	PROMO: {
		key: "PROMO",
		displayKey: "lbl_Promotion",
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
	{ keyName: "PP", lobbyImgName: "pp", lobbyDisplayName: "pp" },
	{ keyName: "GPI", lobbyImgName: "gp", lobbyDisplayName: "GAMEPLAY" },
	{ keyName: "YGG", lobbyImgName: "yg", lobbyDisplayName: "YGGDRASIL" },
	{ keyName: "Joker", lobbyImgName: "jk", lobbyDisplayName: "JOKER" },
	{ keyName: "SG", lobbyImgName: "sg", lobbyDisplayName: "SPADEGAMING" },
	{ keyName: "PG", lobbyImgName: "pg", lobbyDisplayName: "POCHETGAMES" },
	{ keyName: "CQ9", lobbyImgName: "cq9", lobbyDisplayName: "CQ9" },
	{ keyName: "Iconic", lobbyImgName: "icg", lobbyDisplayName: "ICG" },
	{ keyName: "PT", lobbyImgName: "pt", lobbyDisplayName: "PLAYTECH" },
	{ keyName: "OW", lobbyImgName: "ow", lobbyDisplayName: "OW" }
];
