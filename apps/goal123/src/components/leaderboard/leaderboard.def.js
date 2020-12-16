export const defTabId = {
	event: 1,
	ranking: 2,
	records: 3
};

export const defImgRankId = ["", "first", "second", "third"];
export const defBackground = ["", "", "bg_rank", "bg_record"];

export const defTabList = [
	{ id: defTabId.event, displayKey: "lbl_Event" },
	{ id: defTabId.ranking, displayKey: "lbl_Ranking" },
	{ id: defTabId.records, displayKey: "lbl_Records" }
];

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
		{ displayRank: "1", reward: "38,888" },
		{ displayRank: "2", reward: "28,888" },
		{ displayRank: "3", reward: "18888" },
		{ displayRank: "4", reward: "12,888" },
		{ displayRank: "5", reward: "8,888" },
		{ displayRank: "6", reward: "6,888" },
		{ displayRank: "7", reward: "5,888" },
		{ displayRank: "8~10", reward: "3,888" },
		{ displayRank: "11~20", reward: "2,888" }
	]
};
