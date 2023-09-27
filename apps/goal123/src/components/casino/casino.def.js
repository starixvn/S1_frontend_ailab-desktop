export const defRowsPerPage = 20;

export const defNav = {
	All: {
		key: "all",
		displayKey: "lbl_All"
	},
	Random: {
		key: "random",
		displayKey: "lbl_Random"
	},
	RecentlyPlayed: {
		key: "recentlyPlayed",
		displayKey: "lbl_RecentlyPlayed"
	},
	New: {
		key: "new",
		displayKey: "lbl_New"
	},
	Mini: {
		key: "mini",
		displayKey: "lbl_Mini"
	},
	Featured: {
		key: "featured",
		displayKey: "lbl_Feature"
	},
	Jackpot: {
		key: "jackpot",
		displayKey: "lbl_Jackpot"
	},
	TableAndCards: {
		key: "tableAndCards",
		displayKey: "lbl_TableAndCards"
	},
	Arcade: {
		key: "arcade",
		displayKey: "lbl_Arcade"
	},
	BuyFeaturesGames: {
		key: "buyFeaturesGames",
		displayKey: "lbl_BuyFeaturesGames"
	},
	Megaways: {
		key: "megaways",
		displayKey: "lbl_Megaways"
	},

	MyFavorite: {
		key: "myFavorite",
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
