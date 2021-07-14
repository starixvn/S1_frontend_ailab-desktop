export const defTabId = {
	first: 1,
	second: 2,
	third: 3,
	fourth: 4
};

export const defImgRankId = ["", "first", "second", "third"];

export const defTabList = [
	{ id: defTabId.first, displayKey: "lbl_Event" },
	{ id: defTabId.second, displayKey: "lbl_EURO_2020_Final" },
	{ id: defTabId.third, displayKey: "lbl_Tournament_Points" },
	{ id: defTabId.fourth, displayKey: "lbl_Records" }
];

export const defPeriodId = {
	period1: 1,
	period2: 2,
	period3: 3,
	period4: 4
};

export const defPeriodList = {
	1: {
		id: defPeriodId.period1,
		eventCode: "2021021",
		startDate: "2021/03/13",
		endDate: "2021/04/12",
		StartMonth: "lbl_Mar",
		EndMonth: "lbl_Apr"
	},
	2: {
		id: defPeriodId.period2,
		eventCode: "2021022",
		startDate: "2021/04/13",
		endDate: "2021/05/12",
		StartMonth: "lbl_Apr",
		EndMonth: "lbl_May"
	},
	3: {
		id: defPeriodId.period3,
		eventCode: "2021023",
		startDate: "2021/05/13",
		endDate: "2021/06/12",
		StartMonth: "lbl_May",
		EndMonth: "lbl_Jun"
	},
	4: {
		id: defPeriodId.period4,
		eventCode: "2021024",
		startDate: "2021/06/13",
		endDate: "2021/07/12",
		StartMonth: "lbl_Mar",
		EndMonth: "lbl_Jul"
	}
};

export const defDayNum = {
	today: 0,
	yesterDay: 1,
	lastTwoDay: 2,
	lastThreeDay: 3
};

export const defPeriodOptions = [
	{ id: defPeriodId.period2, displayKey: "lbl_period2" },
	{ id: defPeriodId.period3, displayKey: "lbl_period3" }
];

export const defDayOptions = [
	{ id: defDayNum.yesterDay, displayKey: "lbl_YesterDay" },
	{ id: defDayNum.lastTwoDay, displayKey: "lbl_last_2_day" },
	{ id: defDayNum.lastThreeDay, displayKey: "lbl_last_3_day" }
];

export const defRewardTabId = {
	final: 1,
	monthly: 2
};

export const defRewardList = ({ t }) => {
	return {
		VND: {
			[defRewardTabId.final]: [
				{ displayRank: "dt*******an", reward: "123,123,000" },
				{ displayRank: t("lbl_Rank1"), reward: "88,123,000" },
				{ displayRank: "Ng**tb", reward: "55,123,000" },
				{ displayRank: "An********89", reward: "36,123,000" },
				{ displayRank: "ba********ss", reward: "28,123,000" },
				{ displayRank: "Du*****68", reward: "22,123,000" },
				{ displayRank: "th********97", reward: "17,123,000" },
				{ displayRank: "Ph***********20", reward: "13,123,000" },
				{ displayRank: "SB********ng", reward: "11,123,000" }
			],
			[defRewardTabId.monthly]: [
				{
					displayRank: t("lbl_RankChampion"),
					reward: "43,123,000"
				},
				{ displayRank: t("lbl_Rank1"), reward: "28,123,000" },
				{ displayRank: t("lbl_Rank2"), reward: "20,123,000" }
			]
		}
	};
};
