export const defTabId = {
	first: 1,
	second: 2,
	third: 3,
	fourth: 4
};

export const defTabList = [
	{
		id: defTabId.first,
		displayKey: "lbl_Event"
	},
	{
		id: defTabId.second,
		displayKey: "lbl_EURO_2020_Final"
	},
	{
		id: defTabId.third,
		displayKey: "lbl_Tournament_Points"
	},
	{
		id: defTabId.fourth,
		displayKey: "lbl_Records"
	}
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
	{ id: defPeriodId.period3, displayKey: "lbl_period3" },
	{ id: defPeriodId.period4, displayKey: "lbl_EURO_2020_Final" }
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
				{ displayRank: t("lbl_RankChampion"), reward: "118,888,000" },
				{ displayRank: t("lbl_Rank1"), reward: "78,888,000" },
				{ displayRank: t("lbl_Rank2"), reward: "38,888,000" },
				{ displayRank: t("lbl_Rank3"), reward: "28,888,000" },
				{ displayRank: t("lbl_Rank4"), reward: "23,888,000" },
				{ displayRank: t("lbl_Rank5"), reward: "19,888,000" },
				{ displayRank: t("lbl_Rank6"), reward: "15,888,000" },
				{ displayRank: t("lbl_Rank7"), reward: "11,888,000" },
				{ displayRank: t("lbl_Rank8"), reward: "9,888,000" }
			],
			[defRewardTabId.monthly]: [
				{
					displayRank: t("lbl_RankChampion"),
					reward: "38,888,000"
				},
				{ displayRank: t("lbl_Rank1"), reward: "28,888,000" },
				{ displayRank: t("lbl_Rank2"), reward: "18,888,000" }
			]
		}
	};
};
