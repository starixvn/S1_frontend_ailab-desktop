export const defTabId = {
	event: 1,
	second: 2,
	third: 3,
	fourth: 4
	// slots: 2,
	// lastEvent: 6
};

export const defRewardTabId = {
	final: 0,
	monthly: 1
};

export const defTabList = [
	{ id: defTabId.event, displayKey: "lbl_Event" },
	{ id: defTabId.second, displayKey: "lbl_EURO_2020_Final" },
	{ id: defTabId.third, displayKey: "lbl_Tournament_Points" },
	{ id: defTabId.fourth, displayKey: "lbl_Records" }
	// { id: defTabId.defRewardTabId, displayKey: "lbl_Sports" },
	// { id: defTabId.liveCasino, displayKey: "tournament points" },
	// { id: defTabId.slots, displayKey: "lbl_Casino" },
	// { id: defTabId.second, displayKey: "lbl_Last_Event" }
];

// export const defBackground = {
// 	0: "eventRule",
// 	1: "lastevent",
// 	2: "champion",
// 	3: "champion"
// };

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
	today: 0,
	yesterDay: 1,
	lastTwoDay: 2,
	lastThreeDay: 3
};

export const defPeriodId = {
	period1: 1,
	period2: 2,
	period3: 3
	// ,
	// period4: 4
};

export const defEventTimeList = [
	{
		id: defPeriodId.period1,
		eventCode: "2021021",
		startDate: "2021/03/13",
		endDate: "2021/04/12"
	},
	{
		id: defPeriodId.period2,
		eventCode: "2021022",
		startDate: "2021/04/13",
		endDate: "2021/05/12"
	},
	{
		id: defPeriodId.period3,
		eventCode: "2021023",
		startDate: "2021/05/13",
		endDate: "2021/06/12"
	}
	// ,
	// {
	// 	id: defPeriodId.period4,
	// 	eventCode: "2021024",
	// 	startDate: "2021/03/13",
	// 	endDate: "2021/07/12"
	// }
];

export const defPeriodList = {
	1: {
		id: defPeriodId.period1,
		eventCode: "2021021",
		startDate: "2021/03/13",
		endDate: "2021/04/12"
	},
	2: {
		id: defPeriodId.period2,
		eventCode: "2021022",
		startDate: "2021/04/13",
		endDate: "2021/05/12"
	},
	3: {
		id: defPeriodId.period3,
		eventCode: "2021023",
		startDate: "2021/05/13",
		endDate: "2021/06/12"
	}
	// ,
	// 4: {
	// 	id: defPeriodId.period4,
	// 	eventCode: "2021024",
	// 	startDate: "2021/03/13",
	// 	endDate: "2021/07/12"
	// }
};

export const defButtonOptions = [
	{ id: defPeriodId.period1, displayKey: "lbl_period1" },
	{ id: defPeriodId.period2, displayKey: "lbl_period2" },
	{ id: defPeriodId.period3, displayKey: "lbl_period3" }
];

export const defDayOptions = [
	{ id: defDayNum.yesterDay, displayKey: "lbl_YesterDay" },
	{ id: defDayNum.lastTwoDay, displayKey: "lbl_last_2_day" },
	{ id: defDayNum.lastThreeDay, displayKey: "lbl_last_3_day" }
];

export const defRewardList = ({ t }) => {
	const unit = "Ang Pao";
	return {
		MYR: {
			[defRewardTabId.final]: [
				{
					displayRank: "1",
					reward: "MacBook Pro 13 M1 256GB"
				},
				{ displayRank: "2", reward: `iPad Air 64GB Wi-Fi+Cellular` },
				{ displayRank: "3", reward: `iPad 10.2inch 128GB Wi-Fi` },
				{ displayRank: "4", reward: `988 ${unit}` },
				{ displayRank: "5", reward: `888 ${unit}` },
				{ displayRank: "6", reward: `788 ${unit}` },
				{ displayRank: "7", reward: `688 ${unit}` },
				{ displayRank: "8", reward: `588 ${unit}` },
				{ displayRank: "9", reward: `188 ${unit}` },
				{ displayRank: "10", reward: `88 ${unit}` }
			],
			[defRewardTabId.monthly]: [
				{
					displayRank: "1",
					reward: "MacBook Pro 13 M1 256GB"
				},
				{ displayRank: "2", reward: `iPad Air 64GB Wi-Fi+Cellular` },
				{ displayRank: "3", reward: `iPad 10.2inch 128GB Wi-Fi` },
				{ displayRank: "4", reward: `988 ${unit}` },
				{ displayRank: "5", reward: `888 ${unit}` },
				{ displayRank: "6", reward: `788 ${unit}` },
				{ displayRank: "7", reward: `688 ${unit}` },
				{ displayRank: "8", reward: `588 ${unit}` },
				{ displayRank: "9", reward: `188 ${unit}` },
				{ displayRank: "10", reward: `88 ${unit}` }
			]
		},
		RMB: {
			[defRewardTabId.final]: [
				{
					displayRank: "1",
					reward: "MacBook Pro 13 M1 256GB"
				},
				{ displayRank: "2", reward: `iPad Air 64GB Wi-Fi+Cellular` },
				{ displayRank: "3", reward: `iPad 10.2inch 128GB Wi-Fi` },
				{ displayRank: "4", reward: `988` },
				{ displayRank: "5", reward: `888` },
				{ displayRank: "6", reward: `788` },
				{ displayRank: "7", reward: `688` },
				{ displayRank: "8", reward: `588` },
				{ displayRank: "9", reward: `188` },
				{ displayRank: "10", reward: `88` }
			],
			[defRewardTabId.monthly]: [
				{
					displayRank: "1",
					reward: "MacBook Pro 13 M1 256GB"
				},
				{ displayRank: "2", reward: `iPad Air 64GB Wi-Fi+Cellular` },
				{ displayRank: "3", reward: `iPad 10.2inch 128GB Wi-Fi` },
				{ displayRank: "4", reward: `988` },
				{ displayRank: "5", reward: `888` },
				{ displayRank: "6", reward: `788` },
				{ displayRank: "7", reward: `688` },
				{ displayRank: "8", reward: `588` },
				{ displayRank: "9", reward: `188` },
				{ displayRank: "10", reward: `88` }
			]
		},
		IDR: {
			[defRewardTabId.final]: [
				{ displayRank: "1", reward: "iPad 10.2inch 128GB Wi-Fi" },
				{ displayRank: "2", reward: `3,388,000 IDR ${unit}` },
				{ displayRank: "3", reward: `3,088,000 IDR ${unit}` },
				{ displayRank: "4", reward: `2,688,000 IDR ${unit}` },
				{ displayRank: "5", reward: `2,388,000 IDR ${unit}` },
				{ displayRank: "6", reward: `2,088,000 IDR ${unit}` },
				{ displayRank: "7", reward: `688,000 IDR ${unit}` },
				{ displayRank: "8", reward: `388,000 IDR ${unit}` }
			],
			[defRewardTabId.monthly]: [
				{ displayRank: "1", reward: "iPad 10.2inch 128GB Wi-Fi" },
				{ displayRank: "2", reward: `3,388,000 IDR ${unit}` },
				{ displayRank: "3", reward: `3,088,000 IDR ${unit}` },
				{ displayRank: "4", reward: `2,688,000 IDR ${unit}` },
				{ displayRank: "5", reward: `2,388,000 IDR ${unit}` },
				{ displayRank: "6", reward: `2,088,000 IDR ${unit}` },
				{ displayRank: "7", reward: `688,000 IDR ${unit}` },
				{ displayRank: "8", reward: `388,000 IDR ${unit}` }
			]
		},

		THB: {
			[defRewardTabId.final]: [
				{ displayRank: "1", reward: "iPad 10.2inch 128GB Wi-Fi" },
				{ displayRank: "2", reward: `7,788 THB ${unit}` },
				{ displayRank: "3", reward: `6,688 THB ${unit}` },
				{ displayRank: "4", reward: `5,588 THB ${unit}` },
				{ displayRank: "5", reward: `4,888 THB ${unit}` },
				{ displayRank: "6", reward: `4,388 THB ${unit}` },
				{ displayRank: "7", reward: `1,388 THB ${unit}` },
				{ displayRank: "8", reward: `688 THB ${unit}` }
			],
			[defRewardTabId.monthly]: [
				{ displayRank: "1", reward: "iPad 10.2inch 128GB Wi-Fi" },
				{ displayRank: "2", reward: `7,788 THB ${unit}` },
				{ displayRank: "3", reward: `6,688 THB ${unit}` },
				{ displayRank: "4", reward: `5,588 THB ${unit}` },
				{ displayRank: "5", reward: `4,888 THB ${unit}` },
				{ displayRank: "6", reward: `4,388 THB ${unit}` },
				{ displayRank: "7", reward: `1,388 THB ${unit}` },
				{ displayRank: "8", reward: `688 THB ${unit}` }
			]
		}
	};
};
