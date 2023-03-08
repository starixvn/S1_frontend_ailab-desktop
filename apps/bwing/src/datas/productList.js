export const defTpGameType = {
	All: 0
};

export const defCategory = {
	Sports: 1,
	Slots: 2,
	LiveCasino: 3,
	Fishing: 4,
	CockFighting: 5,
	Lottery: 6,
	VirtualSports: 7,
	Poker: 8
};

export const defSlotTpGameType = {
	Saba: { tpId: 1, tpGameType: 4, name: "saba" },
	PP: { tpId: 5, tpGameType: 7, name: "pragmatic-play" },
	GPI: { tpId: 6, tpGameType: 11, name: "gpi" },
	Joker: { tpId: 9, tpGameType: 13, name: "joker" },
	YGG: { tpId: 8, tpGameType: 14, name: "ygg" },
	AMB: { tpId: 30, tpGameType: 76, name: "amb" },
	SG: { tpId: 10, tpGameType: 15, name: "spadegaming" },
	PG: { tpId: 14, tpGameType: 17, name: "pg" },
	CQ9: { tpId: 16, tpGameType: 29, name: "cq9" },
	Iconic: { tpId: 24, tpGameType: 39, name: "astro-tech" },
	PT: { tpId: 27, tpGameType: 46, name: "playtech" },
	JILI: { tpId: 32, tpGameType: 53, name: "jili" },
	AP: { tpId: 39, tpGameType: 67, name: "advant-play" },
	MG: { tpId: 34, tpGameType: 57, name: "microgaming" },
	RedTiger: { tpId: 38, tpGameType: 65, name: "red-tiger" },
	NetEnt: { tpId: 37, tpGameType: 64, name: "netent" },
	SimplePlay: { tpId: 44, tpGameType: 86, name: "simple-play" },
	Habanero: { tpId: 40, tpGameType: 68, name: "habanero" },
	Skywind: { tpId: 43, tpGameType: 82, name: "skywind" }
};

export default {
	/* === 1. sports === */

	sportSaba: {
		tpId: 1,
		gameId: 1,
		name: "soccer",
		tpGameType: 1
	},
	sabaClub: {
		tpId: 1,
		gameId: 171,
		name: "sabaClub",
		tpGameType: 59
	},
	sportSbo: {
		tpId: 42,
		name: "sportSbo",
		tpGameType: 77
	},
	sportBti: {
		tpId: 29,
		name: "sportBti",
		tpGameType: 49
	},
	eSport: {
		tpId: 1,
		gameId: 43,
		name: "eSport",
		tpGameType: 1
	},
	soccer: {
		tpId: 1,
		gameId: 1,
		name: "soccer",
		tpGameType: 1
	},
	basketball: {
		gameId: 2,
		tpId: 1,
		name: "basketball",
		tpGameType: 1
	},
	badminton: {
		gameId: 9,
		tpId: 1,
		name: "badminton",
		tpGameType: 1
	},
	football: {
		gameId: 3,
		tpId: 1,
		name: "football",
		tpGameType: 1
	},
	tennis: {
		gameId: 5,
		tpId: 1,
		name: "tennis",
		tpGameType: 1
	},
	hockey: {
		gameId: 4,
		tpId: 1,
		name: "hockey",
		tpGameType: 1
	},
	baseball: {
		gameId: 8,
		tpId: 1,
		name: "baseball",
		tpGameType: 1
	},
	// esport

	eSport_Csgo: {
		tpId: 1,
		// gameId: 4319,
		gameId: 43,
		tpGameType: 1,
		betType: 3
	},
	eSport_Dota2: {
		tpId: 1,
		// gameId: 4320,
		gameId: 43,
		tpGameType: 1,
		betType: 1
	},
	eSport_KingOfGlory: {
		tpId: 1,
		// gameId: 4324,
		gameId: 43,
		tpGameType: 1,
		betType: 4
	},
	eSport_LeagueOfLegends: {
		tpId: 1,
		// gameId: 4325,
		gameId: 43,
		tpGameType: 1,
		betType: 2
	},
	/* === 3. live casino === */

	liveCasino_Allbet: {
		gameId: 12,
		tpId: 12,
		tpGameType: 6
	},
	liveCasino_AG: {
		gameId: 3,
		tpId: 3,
		tpGameType: 8
	},
	liveCasino_DG: {
		gameId: 4,
		tpId: 4,
		tpGameType: 10
	},
	liveCasino_SA: {
		gameId: 2,
		tpId: 2,
		tpGameType: 9
	},
	liveCasino_AE: {
		gameId: 15,
		tpId: 15,
		tpGameType: 18
	},
	liveCasino_eBET: {
		gameId: 18,
		tpId: 18,
		tpGameType: 28
	},
	liveCasino_WM: {
		gameId: 20,
		tpId: 20,
		tpGameType: 32
	},
	liveCasino_One789: {
		tpId: 23,
		gameId: 2,
		tpGameType: 37
	},
	liveCasino_n2live: {
		tpId: 28,
		tpGameType: 45
	},
	liveCasino_PT: {
		tpId: 27,
		gameId: "0",
		name: "PT",
		tpGameType: 48
	},
	liveCasino_EVO: {
		tpId: 36,
		gameId: 0,
		tpGameType: 63
	},
	liveCasino_PP: {
		tpId: 5,
		gameId: 101,
		tpGameType: 16
	},
	liveCasino_YeeBet: {
		tpId: 46,
		gameId: 0,
		tpGameType: 93
	},
	liveCasino_MG: {
		tpId: 34,
		gameId: "0",
		tpGameType: 58
	},
	liveCasino_Skywind: {
		tpId: 43,
		gameId: "0",
		tpGameType: 84
	},

	/* === 4. fishing === */

	fishing: {
		tpId: 7,
		gameId: 10,
		name: "fishing",
		tpGameType: 12
	},
	fishing_SG: {
		gameId: "F-SF01",
		tpId: 10,
		name: "fishing_SG",
		tpGameType: 31
	},
	fishing_SGW: {
		gameId: "F-SF02",
		tpId: 10,
		name: "fishing_SGW",
		tpGameType: 31
	},
	ICG_DRAGONBALL_FISHING: {
		gameId: "cmf0001",
		tpId: 24,
		name: "ICG_DRAGONBALL_FISHING",
		tpGameType: 40
	},
	ICG_FISHING_OF_SAVIORS: {
		gameId: "cmf0002",
		tpId: 24,
		name: "ICG_FISHING_OF_SAVIORS",
		tpGameType: 40
	},
	ICG_THE_TYRANT_AND_THE_PRINCESS: {
		gameId: "cmf0006",
		tpId: 24,
		name: "ICG_THE_TYRANT_AND_THE_PRINCESS",
		tpGameType: 40
	},
	CQ9_Water_Margin_Fishing: {
		gameId: "AT06",
		tpId: 16,
		name: "CQ9_Water_Margin_Fishing",
		tpGameType: 44
	},
	CQ9_Oneshot_Fishing: {
		gameId: "AT01",
		tpId: 16,
		name: "CQ9_Oneshot_Fishing",
		tpGameType: 44
	},
	CQ9_LuckyFishing: {
		gameId: "AT05",
		tpId: 16,
		name: "CQ9_Lucky_Fishing",
		tpGameType: 44
	},
	CQ9_Paradise: {
		gameId: "AB3",
		tpId: 16,
		name: "CQ9_Paradise",
		tpGameType: 44
	},
	CQ9_Thunder_Fighter: {
		gameId: "AT04",
		tpId: 16,
		name: "CQ9_Thunder_Fighter:",
		tpGameType: 44
	},
	Skywind_Ocean_Ruler: {
		gameId: "sw_or",
		tpId: 43,
		name: "Skywind_Ocean_Ruler",
		tpGameType: 85
	},
	Skywind_Cai_Shen_Da_Hai: {
		gameId: "sw_cashdaha",
		tpId: 43,
		name: "Skywind_Cai_Shen_Da_Hai",
		tpGameType: 85
	},

	/* === 5. cook fighting === */

	cockFighting: {
		tpId: 17,
		name: "cockFighting",
		tpGameType: 27
	},

	/* === 6. lottery === */

	numberGame: {
		tpId: 1,
		gameId: 161,
		name: "numberGame",
		tpGameType: 2
	},
	lottery: {
		tpId: 1,
		gameId: 220,
		name: "lottery",
		tpGameType: 19
	},
	tableGame: {
		tpId: 1,
		gameId: 222,
		name: "tableGame",
		tpGameType: 23
	},
	keno: {
		tpId: 1,
		gameId: 202,
		name: "keno",
		tpGameType: 5
	},
	One789_lottery: {
		tpId: 23,
		gameId: 0,
		tpGameType: 35
	},
	One789_lottery_789: {
		tpId: 23,
		gameId: 1,
		tpGameType: 36
	},
	tcg: {
		tpId: 33,
		tpGameType: 55
	},
	GPI_VNLottery: {
		tpId: 6,
		gameId: "sode",
		tpGameType: 89
	},

	/* === 7. virtual Sports === */

	virtualGame: { tpId: 1, gameId: 245, tpGameType: 22, name: "virtualGame" }, // 單一錢包 (目前不支援)
	virtualSports: {
		tpId: 1,
		gameId: 192,
		tpGameType: 24,
		name: "virtualSports"
	}, // 單一錢包 {tpId:41, tpGameType:72, gameId:192}

	/* === 8.poker === */

	V8_Poker: {
		tpId: 25,
		gameId: 0,
		tpGameType: 42
	},
	KingMaker: {
		tpId: 11,
		tpGameType: 52
	},
	MaxGame: {
		tpId: 1,
		gameId: 237,
		tpGameType: 83
	}
};

export const defCasinoProviders = {
	/* === 2.  slot === */
	JILI: {
		tpId: 32,
		name: "JILI",
		tpGameType: 53
	},
	GPI: {
		tpId: 6,
		name: "GPI",
		tpGameType: 11
	},
	YGG: {
		tpId: 8,
		name: "YGG",
		tpGameType: 14
	},
	SG: {
		tpId: 10,
		name: "SG",
		tpGameType: 15
	},
	PP: {
		tpId: 5,
		name: "PP",
		tpGameType: 7
	},
	PG: {
		tpId: 14,
		name: "PG",
		tpGameType: 17
	},
	OW: {
		tpId: 1,
		gameId: 208,
		name: "OW",
		tpGameType: 4
	},
	CQ9: {
		tpId: 16,
		name: "CQ9",
		tpGameType: 29
	},
	AstroTech: {
		tpId: 24,
		name: "AstroTech",
		tpGameType: 39
	},
	MGPSW: {
		tpId: 34,
		gameId: "",
		name: "MGPSW",
		tpGameType: 57
	},
	PT: {
		tpId: 27,
		gameId: "0",
		name: "PT",
		tpGameType: 46
	},
	RedTiger: {
		tpId: 38,
		name: "RedTiger",
		tpGameType: 65
	},
	NetEnt: {
		tpId: 37,
		name: "NetEnt",
		tpGameType: 64
	},
	AdvantPlay: {
		tpId: 39,
		name: "AdvantPlay",
		tpGameType: 67
	},
	Habanero: {
		tpId: 40,
		name: "Habanero",
		tpGameType: 68
	},
	SimplePlay: {
		tpId: 44,
		name: "SimplePlay",
		tpGameType: 86
	},
	Skywind: {
		tpId: 43,
		name: "Skywind",
		tpGameType: 82
	}
};
