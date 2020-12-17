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

export const defDayNum = {
	today: 0,
	yesterDay: 1,
	lastTwoDay: 2,
	lastThreeDay: 3
};

export const defDayOptions = [
	{ id: defDayNum.yesterDay, displayKey: "lbl_YesterDay" },
	{ id: defDayNum.lastTwoDay, displayKey: "lbl_last_2_day" },
	{ id: defDayNum.lastThreeDay, displayKey: "lbl_last_3_day" }
];

export const defRewardList = {
	VND: [
		{
			displayRank: "1",
			reward: "iPhone 12 Pro Max (256GB)",
			winnersNum: 1
		},
		{ displayRank: "2~6", reward: "10,888,000", winnersNum: 5 },
		{ displayRank: "7~16", reward: "5,888,000", winnersNum: 10 }
	]
};
