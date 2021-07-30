export const defTpCategoryId = {
	all: 0,
	sports: 1,
	slot: 2,
	liveCasino: 3,
	fishing: 4,
	cockfighting: 5,
	lottery: 6,
	virtualSports: 7,
	poker: 8
};

export default {
	/* === 1. sports === */

	sportSaba: {
		tpId: 1,
		gameId: 1,
		name: "soccer",
		tpCategory: defTpCategoryId.sports
	},
	sabaClub: {
		tpId: 1,
		gameId: 200,
		name: "sabaClub",
		tpCategory: defTpCategoryId.slot
	},
	sportBti: {
		tpId: 29,
		name: "sportBti",
		tpCategory: defTpCategoryId.sports
	},
	eSport: {
		tpId: 1,
		gameId: 43,
		name: "eSport",
		tpCategory: defTpCategoryId.sports
	},
	soccer: {
		tpId: 1,
		gameId: 1,
		name: "soccer"
	},
	basketball: {
		gameId: 2,
		tpId: 1,
		name: "basketball"
	},
	badminton: {
		gameId: 9,
		tpId: 1,
		name: "badminton"
	},
	football: {
		gameId: 3,
		tpId: 1,
		name: "football"
	},
	tennis: {
		gameId: 5,
		tpId: 1,
		name: "tennis"
	},
	hockey: {
		gameId: 4,
		tpId: 1,
		name: "hockey"
	},
	baseball: {
		gameId: 8,
		tpId: 1,
		name: "baseball"
	},

	/* === 3. live casino === */

	liveCasino_Allbet: {
		gameId: 12,
		tpId: 12,
		tpCategory: defTpCategoryId.liveCasino
	},
	liveCasino_AG: {
		gameId: 3,
		tpId: 3,
		tpCategory: defTpCategoryId.liveCasino
	},
	liveCasino_DG: {
		gameId: 4,
		tpId: 4,
		tpCategory: defTpCategoryId.liveCasino
	},
	liveCasino_SA: {
		gameId: 2,
		tpId: 2,
		tpCategory: defTpCategoryId.liveCasino
	},
	liveCasino_AE: {
		gameId: 15,
		tpId: 15,
		tpCategory: defTpCategoryId.liveCasino
	},
	liveCasino_eBET: {
		gameId: 18,
		tpId: 18,
		tpCategory: defTpCategoryId.liveCasino
	},
	liveCasino_WM: {
		gameId: 20,
		tpId: 20,
		tpCategory: defTpCategoryId.liveCasino
	},
	liveCasino_One789: {
		tpId: 23,
		gameId: 2,
		tpCategory: defTpCategoryId.liveCasino
	},
	liveCasino_n2live: {
		tpId: 28,
		tpCategory: defTpCategoryId.liveCasino
	},
	liveCasino_PT: {
		tpId: 27,
		gameId: "0",
		name: "PT",
		tpCategory: defTpCategoryId.liveCasino
	},

	/* === 4. fishing === */

	fishing: {
		tpId: 7,
		gameId: 10,
		name: "fishing",
		tpCategory: defTpCategoryId.fishing
	},
	fishing_SG: {
		gameId: "F-SF01",
		tpId: 10,
		name: "fishing_SG",
		tpCategory: defTpCategoryId.fishing
	},
	fishing_SGW: {
		gameId: "F-SF02",
		tpId: 10,
		name: "fishing_SGW",
		tpCategory: defTpCategoryId.fishing
	},
	ICG_DRAGONBALL_FISHING: {
		gameId: "cmf0001",
		tpId: 24,
		name: "ICG_DRAGONBALL_FISHING",
		tpCategory: defTpCategoryId.fishing
	},
	ICG_FISHING_OF_SAVIORS: {
		gameId: "cmf0002",
		tpId: 24,
		name: "ICG_FISHING_OF_SAVIORS",
		tpCategory: defTpCategoryId.fishing
	},
	ICG_THE_TYRANT_AND_THE_PRINCESS: {
		gameId: "cmf0003",
		tpId: 24,
		name: "ICG_THE_TYRANT_AND_THE_PRINCESS",
		tpCategory: defTpCategoryId.fishing
	},
	CQ9_Water_Margin_Fishing: {
		gameId: "AT06",
		tpId: 16,
		name: "CQ9_Water_Margin_Fishing",
		tpCategory: defTpCategoryId.fishing
	},
	CQ9_Oneshot_Fishing: {
		gameId: "AT01",
		tpId: 16,
		name: "CQ9_Oneshot_Fishing",
		tpCategory: defTpCategoryId.fishing
	},
	CQ9_LuckyFishing: {
		gameId: "AT05",
		tpId: 16,
		name: "CQ9_Lucky_Fishing",
		tpCategory: defTpCategoryId.fishing
	},
	CQ9_Paradise: {
		gameId: "AB3",
		tpId: 16,
		name: "CQ9_Paradise",
		tpCategory: defTpCategoryId.fishing
	},
	CQ9_Thunder_Fighter: {
		gameId: "AT04",
		tpId: 16,
		name: "CQ9_Thunder_Fighter:",
		tpCategory: defTpCategoryId.fishing
	},

	/* === 5. cook fighting === */

	cockFighting: {
		tpId: 17,
		name: "cockFighting",
		tpCategory: defTpCategoryId.cockfighting
	},

	/* === 6. lottery === */

	numberGame: {
		tpId: 1,
		gameId: 161,
		name: "numberGame",
		tpCategory: defTpCategoryId.lottery
	},
	lottery: {
		tpId: 1,
		gameId: 220,
		name: "lottery",
		tpCategory: defTpCategoryId.lottery
	},
	keno: {
		tpId: 1,
		gameId: 202,
		name: "keno",
		tpCategory: defTpCategoryId.lottery
	},
	One789_lottery: {
		tpId: 23,
		gameId: 0,
		tpCategory: defTpCategoryId.lottery
	},
	One789_lottery_789: {
		tpId: 23,
		gameId: 1,
		tpCategory: defTpCategoryId.lottery
	},

	/* === 7. virtual Sports === */

	virtualSports: {
		tpId: 1,
		gameId: 180,
		name: "virtualSports",
		tpCategory: defTpCategoryId.virtualSports
	},

	/* === 8.poker === */

	V8_Poker: {
		tpId: 25,
		gameId: 0,
		tpCategory: defTpCategoryId.poker
	},
	KingMaker: {
		tpId: 11,
		tpCategory: defTpCategoryId.poker
	}
};

export const defCasinoProviders = {
	/* === 2.  slot === */
	JILI: {
		tpId: 32,
		name: "JILI",
		tpCategory: defTpCategoryId.slot
	},
	GPI: {
		tpId: 6,
		name: "GPI",
		tpCategory: defTpCategoryId.slot
	},
	YGG: {
		tpId: 8,
		name: "YGG",
		tpCategory: defTpCategoryId.slot
	},
	SG: {
		tpId: 10,
		name: "SG",
		tpCategory: defTpCategoryId.slot
	},
	PP: {
		tpId: 5,
		name: "PP",
		tpCategory: defTpCategoryId.slot
	},
	PG: {
		tpId: 14,
		name: "PG",
		tpCategory: defTpCategoryId.slot
	},
	OW: {
		tpId: 1,
		gameId: 208,
		name: "OW"
		// tpCategory: defTpCategoryId.slot
	},
	CQ9: {
		tpId: 16,
		name: "CQ9",
		tpCategory: defTpCategoryId.slot
	},
	ICG: {
		tpId: 24,
		name: "ICG",
		tpCategory: defTpCategoryId.slot
	},
	MGPSW: {
		tpId: 34,
		gameId: "",
		name: "MGPSW",
		tpCategory: defTpCategoryId.slot
	},
	PT: {
		tpId: 27,
		gameId: "0",
		name: "PT",
		tpCategory: defTpCategoryId.slot
	}
};
