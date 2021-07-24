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
	/* === sports === */

	sabaClub: {
		tpId: 1,
		gameId: 200,
		tpCategory: defTpCategoryId.sports
	},
	_9WSports: {
		tpId: 31
	},
	sports: {
		tpId: 1,
		gameId: 1
	},
	soccer: {
		gameId: 1,
		tpId: 1
	},
	sabaSoccer: {
		gameId: 997,
		tpId: 1
	},
	basketball: {
		gameId: 2,
		tpId: 1
	},
	badminton: {
		gameId: 9,
		tpId: 1
	},
	football: {
		gameId: 3,
		tpId: 1
	},
	tennis: {
		gameId: 5,
		tpId: 1
	},
	hockey: {
		gameId: 4,
		tpId: 1
	},
	baseball: {
		gameId: 8,
		tpId: 1
	},
	volleyball: {
		gameId: 6,
		tpId: 1
	},
	cricket: {
		gameId: 50,
		tpId: 1
	},
	eSport: {
		tpId: 1,
		gameId: 43,
		tpCategory: defTpCategoryId.sports
	},
	eSport_Csgo: {
		tpId: 1,
		gameId: 4319,
		tpCategory: defTpCategoryId.sports
	},
	eSport_Dota2: {
		tpId: 1,
		gameId: 4320,
		tpCategory: defTpCategoryId.sports
	},
	eSport_KingOfGlory: {
		tpId: 1,
		gameId: 4324,
		tpCategory: defTpCategoryId.sports
	},
	eSport_LeagueOfLegends: {
		tpId: 1,
		gameId: 4325,
		tpCategory: defTpCategoryId.sports
	},
	eSportAll: {
		tpId: 1,
		gameId: 43,
		tpCategory: defTpCategoryId.sports
	},
	eSport_DOTA2: {
		tpId: 1,
		gameId: 43,
		tpCategory: defTpCategoryId.sports
	},
	eSport_LOL: {
		tpId: 1,
		gameId: 43,
		tpCategory: defTpCategoryId.sports
	},
	eSport_CSGO: {
		tpId: 1,
		gameId: 43,
		tpCategory: defTpCategoryId.sports
	},
	eSport_KOG: {
		tpId: 1,
		gameId: 43,
		tpCategory: defTpCategoryId.sports
	},

	/* === 2.  slot === */

	casino_JILI: {
		tpId: 32,
		name: "JILI",
		tpCategory: defTpCategoryId.slot
	},
	casino_PP: {
		tpId: 5,
		tpCategory: defTpCategoryId.slot
	},
	casino_ICG: {
		tpId: 24,
		tpCategory: defTpCategoryId.slot
	},
	casino_JOKER: {
		tpId: 9,
		tpCategory: defTpCategoryId.slot
	},
	casino_CQ9: {
		tpId: 16,
		tpCategory: defTpCategoryId.slot
	},
	casino_GPI: {
		tpId: 6,
		tpCategory: defTpCategoryId.slot
	},
	casino_YGG: {
		tpId: 8,
		tpCategory: defTpCategoryId.slot
	},
	casino_SG: {
		tpId: 10,
		tpCategory: defTpCategoryId.slot
	},
	casino_PG: {
		tpId: 14,
		tpCategory: defTpCategoryId.slot
	},
	casino_OW: {
		tpId: 1,
		gameId: 208,
		tpCategory: defTpCategoryId.slot
	},
	casino_PT: {
		tpId: 27,
		gameId: "0",
		tpCategory: defTpCategoryId.slot
	},
	casino_MGPSW: { tpId: 34, gameId: "", tpCategory: defTpCategoryId.slot },
	kiss918: {
		tpId: 21,
		tpCategory: defTpCategoryId.slot,
		alwaysShow: true,
		needLogin: true
	},

	/* === 3. live casino === */

	liveCasino_WM: {
		tpId: 20,
		gameId: 20,
		tpCategory: defTpCategoryId.liveCasino
	},
	liveCasino_Allbet: {
		gameId: 12,
		tpId: 12,
		tpCategory: defTpCategoryId.liveCasino
	},
	liveCasino_eBET: {
		gameId: 18,
		tpId: 18,
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
	liveCasino_PP: {
		gameId: 101,
		tpId: 5,
		tpCategory: defTpCategoryId.liveCasino
	},
	liveCasino_DG: {
		gameId: 4,
		tpId: 4,
		tpCategory: defTpCategoryId.liveCasino
	},
	liveCasino_AG: {
		gameId: 3,
		tpId: 3,
		tpCategory: defTpCategoryId.liveCasino
	},
	liveCasino_MW: {
		tpId: 5,
		gameId: 105,
		tpCategory: defTpCategoryId.liveCasino
	},
	liveCasino_N2: {
		tpId: 28,
		tpCategory: defTpCategoryId.liveCasino
	},
	liveCasino_PT: {
		gameId: "0",
		tpId: 27,
		tpCategory: defTpCategoryId.liveCasino
	},

	/* === 4. fishing === */

	ICG_DRAGONBALL_FISHING: {
		tpId: 24,
		gameId: "cmf0001",
		tpCategory: defTpCategoryId.fishing
	},
	fishing: {
		tpId: 7,
		gameId: 10
	},
	fishing_SGW: {
		gameId: "F-SF02",
		tpId: 10,
		tpCategory: defTpCategoryId.fishing
	},
	CQ9_Paradise: {
		gameId: "AB3",
		tpId: 16,
		name: "CQ9_Paradise",
		tpCategory: defTpCategoryId.fishing
	},
	CQ9_LuckyFishing: {
		gameId: "AT05",
		tpId: 16,
		name: "CQ9_Lucky_Fishing",
		tpCategory: defTpCategoryId.fishing
	},

	CQ9_Water_Margin_Fishing: {
		gameId: "AT06",
		tpId: 16,
		name: "CQ9_Water_Margin_Fishing",
		tpCategory: defTpCategoryId.fishing
	},
	CQ9_Thunder_Fighter: {
		gameId: "AT04",
		tpId: 16,
		name: "CQ9_Thunder_Fighter:",
		tpCategory: defTpCategoryId.fishing
	},
	// ICG_FISHING_OF_SAVIORS: {
	// 	tpId: 24,
	// 	gameId: "cmf0002"
	// },
	// ICG_THE_TYRANT_AND_THE_PRINCESS: {
	// 	tpId: 24,
	// 	gameId: "cmf0003"
	// },
	// fishing_SG: {
	// 	gameId: "F-SF01",
	// 	tpId: 10
	// },
	// CQ9_Oneshot_Fishing: {
	// 	gameId: "AT01",
	// 	tpId: 16,
	// 	name: "CQ9_Oneshot_Fishing"
	// },

	/* === 5. cook fighting === */

	cockFighting_vn: {
		tpId: 17,
		tpCategory: defTpCategoryId.cockfighting
	},
	cockFighting: {
		tpId: 19,
		gameId: 19,
		tpCategory: defTpCategoryId.cockfighting
	},

	/* === 6. lottery === */

	keno: {
		tpId: 1,
		gameId: 202,
		tpCategory: defTpCategoryId.lottery
	},
	lottery: {
		tpId: 1,
		gameId: 220,
		tpCategory: defTpCategoryId.lottery
	},
	tablegame: {
		gameId: 222,
		tpId: 1,
		tpCategory: defTpCategoryId.lottery
	},
	numberGame: {
		tpId: 1,
		gameId: 161,
		tpCategory: defTpCategoryId.lottery
	},

	indo4D: {
		gameId: 223,
		tpId: 1,
		tpCategory: defTpCategoryId.lottery
		// allowCurrency: [4, 15]
	},

	/* === 7. virtual sports === */

	virtualSports: {
		gameId: 180,
		tpId: 1,
		tpCategory: defTpCategoryId.virtualSports
	},

	/* === 8. poker === */

	poker: {
		tpId: 13,
		tpCategory: defTpCategoryId.poker
	},
	games_AMBPoker: {
		tpId: 30,
		tpCategory: defTpCategoryId.poker
	},
	games_kingMaker: {
		tpId: 11,
		tpCategory: defTpCategoryId.poker
	}
};
