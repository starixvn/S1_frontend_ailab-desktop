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
	Poker: 8,
	Crypto: 9,
	Games: 10,
	ESports: 11
};

export const defDeepLinkId = {
	mega888: 1
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
	// 新的 PlayTech (Seamless Wallet)
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
	END: { tpId: 49, tpGameType: 98, name: "Endorphina" },
	FaChai: { tpId: 55, tpGameType: 106, name: "FaChai" },
	BNG: { tpId: 57, name: "BNG", tpGameType: 108 },
	Pegasus: { tpId: 56, tpGameType: 107, name: "PEGASUS" },
	NLC: { tpId: 59, tpGameType: 111, name: "NoLimitCity" },
	Amigo: { tpId: 60, name: "Amigo", tpGameType: 112 }
};

export default {
	/* === sports === */

	sabaClub: {
		tpId: 41,
		gameId: 171,
		tpGameType: 95
	},
	_9WSports: {
		tpId: 31,
		tpGameType: 51
	},
	sports: {
		tpId: 41,
		gameId: 1,
		tpGameType: 69
	},
	soccer: {
		gameId: 1,
		tpId: 41,
		tpGameType: 69
	},
	"saba-soccer": {
		gameId: 997,
		tpId: 41,
		tpGameType: 69
	},
	basketball: {
		gameId: 2,
		tpId: 41,
		tpGameType: 69
	},
	badminton: {
		gameId: 9,
		tpId: 41,
		tpGameType: 69
	},
	football: {
		gameId: 3,
		tpId: 41,
		tpGameType: 69
	},
	tennis: {
		gameId: 5,
		tpId: 41,
		tpGameType: 69
	},
	hockey: {
		gameId: 4,
		tpId: 41,
		tpGameType: 69
	},
	baseball: {
		gameId: 8,
		tpId: 41,
		tpGameType: 69
	},
	volleyball: {
		gameId: 6,
		tpId: 41,
		tpGameType: 69
	},
	cricket: {
		gameId: 50,
		tpId: 41,
		tpGameType: 69
	},
	worldCup: {
		tpId: 41,
		gameId: 2002,
		tpGameType: 1
	},
	cryptoSports: {
		tpId: 45,
		tpGameType: 87
	},

	/* === e-sports === */

	eSport: {
		tpId: 41,
		gameId: 43,
		tpGameType: 69
	},
	eSportAll: {
		tpId: 41,
		gameId: 43,
		tpGameType: 69
	},
	eSport_DOTA2: {
		tpId: 41,
		// gameId: 4320,
		gameId: 43,
		tpGameType: 69,
		betType: 1
	},
	eSport_LOL: {
		tpId: 41,
		// gameId: 4325,
		gameId: 43,
		tpGameType: 69,
		betType: 2
	},
	eSport_CSGO: {
		tpId: 41,
		// gameId: 4319,
		gameId: 43,
		tpGameType: 69,
		betType: 3
	},
	eSport_KOG: {
		tpId: 41,
		// gameId: 4324,
		gameId: 43,
		tpGameType: 69,
		betType: 4
	},
	eSport_IM: {
		tpId: 52,
		gameId: "ESPORTSBULL",
		tpGameType: 102
	},
	TFGaming: {
		tpId: 48,
		gameId: 0,
		tpGameType: 97
	},

	/* === 2.  slot === */

	casino_JILI: {
		tpId: 32,
		name: "JILI",
		tpGameType: 53
	},
	casino_PP: {
		tpId: 5,
		tpGameType: 7
	},
	casino_ICG: {
		tpId: 24,
		tpGameType: 39
	},
	casino_JOKER: {
		tpId: 9,
		tpGameType: 13
	},
	casino_PEGASUS: {
		tpId: 56,
		tpGameType: 107
	},
	casino_NoLimitCity: {
		tpId: 59,
		tpGameType: 111
	},
	casino_CQ9: {
		tpId: 16,
		tpGameType: 29
	},
	casino_PNG: {
		tpId: 54,
		tpGameType: 105
	},
	casino_GPI: {
		tpId: 6,
		tpGameType: 11
	},
	casino_YGG: {
		tpId: 8,
		tpGameType: 14
	},
	casino_AMB: {
		tpId: 30,
		tpGameType: 76
	},
	casino_SG: {
		tpId: 10,
		tpGameType: 15
	},
	casino_PG: {
		tpId: 14,
		tpGameType: 17
	},
	casino_BNG: {
		tpId: 57,
		tpGameType: 108
	},
	casino_OW: {
		tpId: 41,
		gameId: 208,
		tpGameType: 4
	},
	// 新的 PlayTech (Seamless Wallet)
	casino_PlayTech: {
		tpId: 51,
		gameId: "0",
		tpGameType: 100
	},
	casino_MGPSW: {
		tpId: 34,
		gameId: "",
		tpGameType: 57
	},
	casino_RedTiger: {
		tpId: 38,
		tpGameType: 65
	},
	casino_NetEnt: {
		tpId: 37,
		tpGameType: 64
	},
	kiss918: {
		tpId: 21,
		tpGameType: 33,
		alwaysShow: true,
		needLogin: true
	},
	casino_AdvantPlay: {
		tpId: 39,
		tpGameType: 67
	},
	casino_Habanero: {
		tpId: 40,
		tpGameType: 68
	},
	casino_SimplePlay: {
		tpId: 44,
		tpGameType: 86
	},
	casino_Skywind: {
		tpId: 43,
		tpGameType: 82
	},
	casino_Nextspin: {
		tpId: 50,
		tpGameType: 99
	},
	casino_SPRIBE: {
		tpId: 53,
		tpGameType: 104
	},
	casino_Endorphina: {
		tpId: 49,
		tpGameType: 98
	},
	casino_FaChai: {
		tpId: 55,
		tpGameType: 106
	},
	casino_Amigo: {
		tpId: 60,
		tpGameType: 112
	},
	/* === 3. live casino === */

	liveCasino_WM: {
		tpId: 20,
		gameId: 20,
		tpGameType: 32
	},
	liveCasino_Allbet: {
		gameId: 12,
		tpId: 12,
		tpGameType: 6
	},
	liveCasino_eBET: {
		gameId: 18,
		tpId: 18,
		tpGameType: 28
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
	liveCasino_PP: {
		gameId: 101,
		tpId: 5,
		tpGameType: 16
	},
	liveCasino_BG: {
		gameId: 0,
		tpId: 47,
		tpGameType: 94
	},
	liveCasino_DG: {
		gameId: 4,
		tpId: 4,
		tpGameType: 10
	},
	liveCasino_AG: {
		gameId: 3,
		tpId: 3,
		tpGameType: 8
	},
	liveCasino_MW: {
		tpId: 5,
		gameId: 105
	},
	liveCasino_N2: {
		tpId: 28,
		tpGameType: 45
	},
	// 新的 PlayTech (Seamless Wallet)
	liveCasino_PlayTech: {
		gameId: "0",
		tpId: 51,
		tpGameType: 101
	},
	liveCasino_EVO: {
		gameId: 0,
		tpId: 36,
		tpGameType: 63
	},
	liveCasino_MG: {
		tpId: 34,
		gameId: "0",
		tpGameType: 58
	},
	liveCasino_Skywind: {
		gameId: "0",
		tpId: 43,
		tpGameType: 84
	},
	liveCasino_YeeBet: {
		gameId: 0,
		tpId: 46,
		tpGameType: 93
	},

	/* === 4. fishing === */

	ICG_DRAGONBALL_FISHING: {
		tpId: 24,
		gameId: "cmf0001",
		tpGameType: 40
	},
	fishing: {
		tpId: 7,
		gameId: 10,
		tpGameType: 12
	},
	fishing_SG: {
		tpId: 10,
		gameId: "F-SF01",
		tpGameType: 31
	},
	fishing_SGW: {
		gameId: "F-SF02",
		tpId: 10,
		tpGameType: 31
	},
	fishing_Haiba: {
		gameId: "kk8nqm3cfwtng",
		tpId: 9,
		tpGameType: 66
	},
	fishing_Hunting_Happy_Fish_5: {
		gameId: "st5cmuqnaxycn",
		tpId: 9,
		tpGameType: 66
	},
	fishing_Hunting_Monster_Awaken: {
		gameId: "1jeqx59c7ztqg",
		tpId: 9,
		tpGameType: 66
	},

	CQ9_Paradise: {
		gameId: "AB3",
		tpId: 16,
		name: "CQ9_Paradise",
		tpGameType: 44
	},
	CQ9_LuckyFishing: {
		gameId: "AT05",
		tpId: 16,
		name: "CQ9_Lucky_Fishing",
		tpGameType: 44
	},
	CQ9_Water_Margin_Fishing: {
		gameId: "AT06",
		tpId: 16,
		name: "CQ9_Water_Margin_Fishing",
		tpGameType: 44
	},
	CQ9_Thunder_Fighter: {
		gameId: "AT04",
		tpId: 16,
		name: "CQ9_Thunder_Fighter:",
		tpGameType: 44
	},
	ICG_FISHING_OF_SAVIORS: {
		tpId: 24,
		gameId: "cmf0002",
		tpGameType: 40
	},
	ICG_THE_TYRANT_AND_THE_PRINCESS: {
		tpId: 24,
		gameId: "cmf0006",
		tpGameType: 40
	},
	CQ9_Oneshot_Fishing: {
		gameId: "AT01",
		tpId: 16,
		name: "CQ9_Oneshot_Fishing",
		tpGameType: 44
	},
	Fishing_Zombie_Party: {
		gameId: "F-ZP01",
		tpId: 10,
		name: "Fishing_Zombie_Party",
		tpGameType: 31
	},
	Fishing_Alien_Hunter: {
		gameId: "F-AH01",
		tpId: 10,
		name: "Fishing_Alien_Hunter",
		tpGameType: 31
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

	/* === 5. 4D === */

	HaoLong: {
		tpId: 58,
		gameId: "HL",
		tpGameType: 110
	},

	/* === 6. lottery === */

	keno: {
		tpId: 41,
		gameId: 202,
		tpGameType: 73
	},
	lottery: {
		tpId: 41,
		gameId: 220,
		tpGameType: 74
	},
	tablegame: {
		gameId: 222,
		tpId: 41,
		tpGameType: 75
	},
	"number-game": {
		tpId: 41,
		gameId: 161,
		tpGameType: 70
	},
	indo4D: {
		gameId: 223,
		tpId: 41,
		tpGameType: 20
	},
	tcg: {
		tpId: 33,
		tpGameType: 54
	},
	GPI_Keno: {
		tpId: 6,
		gameId: "keno",
		tpGameType: 88
	},
	GPI_ThaiLottery: {
		tpId: 6,
		gameId: "thailottery",
		tpGameType: 90
	},
	GPI_Fast3: {
		tpId: 6,
		gameId: "fast3",
		tpGameType: 91
	},

	/* === 7. virtual sports === */

	virtualGame: {
		tpId: 41,
		gameId: 245,
		tpGameType: 22
	},
	"virtual-sports": {
		tpId: 41,
		gameId: 192,
		tpGameType: 72
	},

	/* === 8. poker === */

	poker: {
		tpId: 13,
		tpGameType: 41
	},
	games_AMBPoker: {
		tpId: 30,
		tpGameType: 50
	},
	games_kingMaker: {
		tpId: 11,
		tpGameType: 52
	},
	games_V8Poker: {
		tpId: 25,
		tpGameType: 47,
		gameId: 0
	},
	games_MPoker: {
		tpId: 35,
		tpGameType: 60
	},
	game_MaxGame: {
		tpId: 41,
		gameId: 237,
		tpGameType: 83
	},
	games_im_avaitor: {
		tpId: 53,
		gameId: "imgame12001",
		tpGameType: 104
	},
	games_im_mines: {
		tpId: 53,
		gameId: "imgame12002",
		tpGameType: 104
	},
	games_im_goal: {
		tpId: 53,
		gameId: "imgame12003",
		tpGameType: 104
	},
	games_im_dice: {
		tpId: 53,
		gameId: "imgame12004",
		tpGameType: 104
	},
	mega888: {
		tpId: 22,
		tpGameType: 34
	},
	games_Spaceman: {
		tpId: 5,
		tpGameType: 7,
		gameId: 1302
	},
	games_Crash: {
		tpId: 39,
		tpGameType: 67,
		gameId: "Crash"
	},
	games_GoRush: {
		tpId: 32,
		tpGameType: 53,
		gameId: 224
	},
	games_93Connect: {
		tpId: 62,
		tpGameType: 114,
		gameId: "LOBBY"
	},

	/* === 9. event === */
	"world-cup": {
		tpId: 41,
		gameId: 2002,
		tpGameType: 1
	}
};
