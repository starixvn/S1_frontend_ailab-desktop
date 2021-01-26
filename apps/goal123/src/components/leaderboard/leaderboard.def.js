export const current_eventCode = "202101";
export const last_eventCode = "xmas2020";

export const TopNum = 6;

export const defTabId = {
	event: 1,
	ranking: 2,
	records: 3,
	lastEvent: 4
};

export const defImgRankId = ["", "first", "second", "third"];

export const defBackground = {
	1: "",
	2: "bg_rank",
	3: "bg_record",
	4: "bg_last"
};

export const defTabList = [
	{ id: defTabId.event, displayKey: "lbl_Event" },
	{ id: defTabId.ranking, displayKey: "lbl_Ranking" },
	{ id: defTabId.records, displayKey: "lbl_Records" },
	{ id: defTabId.lastEvent, displayKey: "lbl_Last_Event" }
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
		{ displayRank: "1", reward: "5,888,123" },
		{ displayRank: "2", reward: "2,888,123" },
		{ displayRank: "3", reward: "880,123" },
		{ displayRank: "4", reward: "680,123" },
		{ displayRank: "5", reward: "380,123" },
		{ displayRank: "6", reward: "280,123" }
	]
};

export const rewardPrizeSum = "10,996,738";

export const defLastChampionReward = {
	VND: [{ displayRank: "1", reward: "38,888,000" }]
};
