export const defRowsPerPage = 20;

export const defNav = {
	ALLGAMES: {
		key: "ALLGAMES",
		displayKey: "lbl_AllGames"
	},
	PROMO: {
		key: "PROMO",
		displayKey: "lbl_Promotion",
		hot: true
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
	{ displayKey: "lbl_AllGames", id: defCategoryId.All },
	{ displayKey: "lbl_Slots", id: defCategoryId.Slots },
	{ displayKey: "lbl_Table", id: defCategoryId.Table }
];

export const defCategoryList = { 0: null, 1: "Slots", 2: "Table" };
