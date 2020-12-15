export const defTabId = {
	event: 1,
	ranking: 2,
	records: 3
};

export const defTabList = [
	{ id: defTabId.event, displayKey: "lbl_Event" },
	{ id: defTabId.ranking, displayKey: "lbl_Ranking" },
	{ id: defTabId.records, displayKey: "lbl_Records" }
];

export const defBackground = {
	1: "eventBg",
	2: "rankingBg",
	3: "recordsBg"
};

// export const defTabDisplayKey = {
// 	1: "lbl_Sports",
// 	2: "lbl_Casino",
// 	3: "lbl_LiveCasino"
// };

// export const defLeaderBoardTitle = {
// 	1: "lbl_Ranking_Sports",
// 	2: "lbl_Ranking_Slots",
// 	3: "lbl_Ranking_LiveCasino"
// };

export const defDayNum = {
	yesterDay: 0,
	lastTwoDay: 1,
	lastThreeDay: 2
};

export const defDayOptions = [
	{ id: defDayNum.yesterDay, displayKey: "lbl_YesterDay" },
	{ id: defDayNum.lastTwoDay, displayKey: "lbl_last_2_day" },
	{ id: defDayNum.lastThreeDay, displayKey: "lbl_last_3_day" }
];

export const defRewardList = {
	EN: [
		{ displayRank: "1", reward: "iPhone 12 (64GB)" },
		{ displayRank: "2-6", reward: "888 MYR" },
		{ displayRank: "7-16", reward: "788 MYR" }
	],
	VN: [
		{ displayRank: "1", reward: "iPhone 12 (64GB)" },
		{ displayRank: "2-6", reward: "3,000,000 IDR" },
		{ displayRank: "7-16", reward: "788 MYR" }
	]
};
