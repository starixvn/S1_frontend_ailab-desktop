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
	Saba: { tpId: 41, tpGameType: 4, name: "saba" },
	PP: { tpId: 5, tpGameType: 7, name: "pragmatic-play" },
	GPI: { tpId: 6, tpGameType: 11, name: "gpi" },
	Joker: { tpId: 9, tpGameType: 13, name: "joker" },
	YGG: { tpId: 8, tpGameType: 14, name: "ygg" },
	AMB: { tpId: 30, tpGameType: 76, name: "amb" },
	SG: { tpId: 10, tpGameType: 15, name: "spadegaming" },
	PG: { tpId: 14, tpGameType: 17, name: "pg" },
	CQ9: { tpId: 16, tpGameType: 29, name: "cq9" },
	PNG: { tpId: 54, tpGameType: 105, name: "png" },
	// Iconic: { tpId: 24, tpGameType: 39, name: "astro-tech" },
	// 新的 Playtech (Seamless Wallet)
	PlayTech: { tpId: 51, tpGameType: 100, name: "playtech" },
	JILI: { tpId: 32, tpGameType: 53, name: "jili" },
	AP: { tpId: 39, tpGameType: 67, name: "advant-play" },
	MG: { tpId: 34, tpGameType: 57, name: "microgaming" },
	RedTiger: { tpId: 38, tpGameType: 65, name: "red-tiger" },
	Netent: { tpId: 37, tpGameType: 64, name: "netent" },
	SimplePlay: { tpId: 44, tpGameType: 86, name: "simple-play" },
	HB: { tpId: 40, tpGameType: 68, name: "habanero" },
	Skywind: { tpId: 43, tpGameType: 82, name: "skywind" },
	Nextspin: { tpId: 50, tpGameType: 99, name: "nextspin" },
	SPRIBE: { tpId: 53, tpGameType: 104, name: "spribe" },
	END: { tpId: 49, tpGameType: 98, name: "endorphina" },
	FaChai: { tpId: 55, tpGameType: 106, name: "FaChai" },
	BNG: { tpId: 57, name: "BNG", tpGameType: 108 },
	NLC: { tpId: 59, tpGameType: 111, name: "NoLimitCity" },
	Amigo: { tpId: 60, tpGameType: 112, name: "Amigo" }
};

export default {
	/* === 1. sports === */

	sportSaba: {
		tpId: 41,
		gameId: 1,
		name: "soccer",
		tpGameType: 69
	},
	sabaClub: {
		tpId: 41,
		gameId: 171,
		name: "sabaClub",
		tpGameType: 95
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
		tpId: 41,
		gameId: 43,
		name: "eSport",
		tpGameType: 69
	},
	soccer: {
		tpId: 41,
		gameId: 1,
		name: "soccer",
		tpGameType: 69
	},
	basketball: {
		gameId: 2,
		tpId: 41,
		name: "basketball",
		tpGameType: 69
	},
	badminton: {
		gameId: 9,
		tpId: 41,
		name: "badminton",
		tpGameType: 69
	},
	football: {
		gameId: 3,
		tpId: 41,
		name: "football",
		tpGameType: 69
	},
	tennis: {
		gameId: 5,
		tpId: 41,
		name: "tennis",
		tpGameType: 69
	},
	hockey: {
		gameId: 4,
		tpId: 41,
		name: "hockey",
		tpGameType: 69
	},
	baseball: {
		gameId: 8,
		tpId: 41,
		name: "baseball",
		tpGameType: 69
	},
	cryptoSports: {
		tpId: 45,
		tpGameType: 87
	},
	sports_IM: {
		tpId: 52,
		tpGameType: 103,
		gameId: "IMSB"
	},

	/* === 2. e sports === */

	eSport_Csgo: {
		tpId: 41,
		// gameId: 4319,
		gameId: 43,
		tpGameType: 69,
		betType: 3
	},
	eSport_Dota2: {
		tpId: 41,
		// gameId: 4320,
		gameId: 43,
		tpGameType: 69,
		betType: 1
	},
	eSport_KingOfGlory: {
		tpId: 41,
		// gameId: 4324,
		gameId: 43,
		tpGameType: 69,
		betType: 4
	},
	eSport_LeagueOfLegends: {
		tpId: 41,
		// gameId: 4325,
		gameId: 43,
		tpGameType: 69,
		betType: 2
	},
	eSport_TFGaming: {
		tpId: 48,
		gameId: 0,
		tpGameType: 97
	},
	eSport_IM: {
		tpId: 52,
		gameId: "ESPORTSBULL",
		tpGameType: 102
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
	// 新的 PlayTech (Seamless Wallet)
	liveCasino_PlayTech: {
		tpId: 51,
		gameId: "0",
		name: "PlayTech",
		tpGameType: 101
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
	liveCasino_BG: {
		gameId: 0,
		tpId: 47,
		tpGameType: 94
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
	fishing_Zombie_Party: {
		gameId: "F-ZP01",
		tpId: 10,
		name: "fishing_Zombie_Party",
		tpGameType: 31
	},
	fishing_Alien_Hunter: {
		gameId: "F-AH01",
		tpId: 10,
		name: "fishing_Alien_Hunter",
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
		tpId: 41,
		gameId: 161,
		name: "numberGame",
		tpGameType: 70
	},
	lottery: {
		tpId: 41,
		gameId: 220,
		name: "lottery",
		tpGameType: 74
	},
	tableGame: {
		tpId: 41,
		gameId: 222,
		name: "tableGame",
		tpGameType: 75
	},
	keno: {
		tpId: 41,
		gameId: 202,
		name: "keno",
		tpGameType: 73
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

	virtualGame: {
		tpId: 41,
		gameId: 245,
		tpGameType: 22,
		name: "virtualGame"
	},
	virtualSports: {
		tpId: 41,
		gameId: 192,
		tpGameType: 72,
		name: "virtualSports"
	},

	/* === 8.poker === */

	V8_Poker: {
		tpId: 25,
		gameId: 0,
		tpGameType: 47
	},
	KingMaker: {
		tpId: 11,
		tpGameType: 52
	},
	MaxGame: {
		tpId: 41,
		gameId: 237,
		tpGameType: 83
	},
	IM_Avaitor: {
		tpId: 53,
		gameId: "imgame12001",
		tpGameType: 104
	},
	IM_Mines: {
		tpId: 53,
		gameId: "imgame12002",
		tpGameType: 104
	},
	IM_Goal: {
		tpId: 53,
		gameId: "imgame12003",
		tpGameType: 104
	},
	IM_Dice: {
		tpId: 53,
		gameId: "imgame12004",
		tpGameType: 104
	},
	Spaceman: {
		tpId: 5,
		tpGameType: 7,
		gameId: 1302
	},
	Crash: {
		tpId: 39,
		tpGameType: 67,
		gameId: "Crash"
	},
	GoRush: {
		tpId: 32,
		tpGameType: 53,
		gameId: 224
	},
	"93Connect": {
		tpId: 62,
		tpGameType: 114,
		gameId: "LOBBY"
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
		tpId: 41,
		gameId: 208,
		name: "OW",
		tpGameType: 4
	},
	CQ9: {
		tpId: 16,
		name: "CQ9",
		tpGameType: 29
	},
	PNG: {
		tpId: 54,
		name: "PNG",
		tpGameType: 105
	},

	// AstroTech: {
	// 	tpId: 24,
	// 	name: "AstroTech",
	// 	tpGameType: 39
	// },
	MGPSW: {
		tpId: 34,
		gameId: "",
		name: "MGPSW",
		tpGameType: 57
	},
	// 新的 PlayTech (Seamless Wallet)
	PlayTech: {
		tpId: 51,
		gameId: "0",
		name: "PlayTech",
		tpGameType: 100
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
	},
	Nextspin: {
		tpId: 50,
		name: "Nextspin",
		tpGameType: 99
	},
	SPRIBE: {
		tpId: 53,
		tpGameType: 104,
		name: "SPRIBE"
	},
	Endorphina: {
		tpId: 49,
		name: "ES",
		tpGameType: 98
	},
	FaChai: {
		tpId: 55,
		name: "FaChai",
		tpGameType: 106
	},
	BNG: {
		tpId: 57,
		name: "BNG",
		tpGameType: 108
	},
	eBET: {
		tpId: 56,
		name: "eBET",
		tpGameType: 107
	},
	NoLimitCity: {
		tpId: 59,
		tpGameType: 111,
		name: "NoLimitCity"
	},
	Amigo: {
		tpId: 60,
		name: "Amigo",
		tpGameType: 112
	}
};
