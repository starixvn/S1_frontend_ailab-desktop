export const current_eventCode = "202101";
export const last_eventCode = "xmas2020";

export const defTabId = {
	event: 1,
	ranking: 2,
	records: 3,
	lastEvent: 4
};

export const defTabList = [
	{
		id: defTabId.event,
		displayKey: "lbl_Event"
	},
	{
		id: defTabId.ranking,
		displayKey: "lbl_Ranking"
	},
	{
		id: defTabId.records,
		displayKey: "lbl_Records"
	},
	{
		id: defTabId.lastEvent,
		displayKey: "lbl_Last_Event"
	}
];

export const defBackground = {
	1: "eventBg",
	2: "rankingBg",
	3: "recordsBg",
	4: "lasteventBg"
};

export const defRightSectionRewardImg = {
	1: "money",
	2: "money",
	3: "money",
	4: "iphone"
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

export const currentTopNum = 20;
export const lastTopNum = 16;

export const defRewardList = {
	VND: [
		{
			displayRank: "1",
			reward: "8,888,000",
			winnersNum: 1
		},
		{ displayRank: "2", reward: "5,888,000", winnersNum: 1 },
		{ displayRank: "3", reward: "2,888,000", winnersNum: 1 },
		{ displayRank: "4", reward: "1,888,000", winnersNum: 1 },
		{ displayRank: "5", reward: "888,000", winnersNum: 1 },
		{ displayRank: "6", reward: "88,000", winnersNum: 15 }
	]
};

export const defLastChampionReward = {
	VND: [
		{ displayRank: "1", reward: "iPhone 12 Pro Max (256GB)", winnersNum: 1 }
	]
};
