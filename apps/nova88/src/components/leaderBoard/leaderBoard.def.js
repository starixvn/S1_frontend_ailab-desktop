export const defTabId = {
	event: 0,
	sports: 1,
	liveCasino: 3,
	slots: 2,
	records: 5
};

export const defTabList = [
	{ id: defTabId.event, displayKey: "lbl_Event" },
	{ id: defTabId.sports, displayKey: "lbl_Sports" },
	{ id: defTabId.liveCasino, displayKey: "lbl_LiveCasino" },
	{ id: defTabId.slots, displayKey: "lbl_Casino" },
	{ id: defTabId.records, displayKey: "lbl_Records" }
];

export const defBackground = {
	0: "eventRule",
	1: "ranksports",
	3: "rankLivecasino",
	2: "rankSlots",
	5: "rankRecords"
};

export const defTabDisplayKey = {
	1: "lbl_Sports",
	2: "lbl_Casino",
	3: "lbl_LiveCasino"
};

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
	MY: {
		[defTabId.sports]: [
			{ displayRank: "1", reward: "iphone 12 (64gb)" },
			{ displayRank: "2", reward: "888 MYR (cash)" },
			{ displayRank: "3", reward: "788 MYR (cash)" },
			{ displayRank: "4", reward: "688 MYR (cash)" },
			{ displayRank: "5", reward: "588 MYR (cash)" }
		],
		[defTabId.liveCasino]: [
			{ displayRank: "1", reward: "iphone 12 (64gb)" },
			{ displayRank: "2", reward: "888 MYR (cash)" },
			{ displayRank: "3", reward: "788 MYR (cash)" },
			{ displayRank: "4", reward: "688 MYR (cash)" },
			{ displayRank: "5", reward: "588 MYR (cash)" }
		],
		[defTabId.slots]: [
			{ displayRank: "1", reward: "iphone 12 (64gb)" },
			{ displayRank: "2", reward: "888 MYR (cash)" },
			{ displayRank: "3", reward: "788 MYR (cash)" },
			{ displayRank: "4", reward: "688 MYR (cash)" },
			{ displayRank: "5", reward: "588 MYR (cash)" }
		]
	},
	ID: {
		[defTabId.sports]: [
			{ displayRank: "1", reward: "iphone 12 (64gb)" },
			{ displayRank: "2", reward: "3,000,000 IDR (cash)" },
			{ displayRank: "3", reward: "2,688,000 IDR (cash)" },
			{ displayRank: "4", reward: "2,388,000 IDR (cash)" },
			{ displayRank: "5", reward: "1,388,000 IDR (cash)" }
		],
		[defTabId.liveCasino]: [
			{ displayRank: "1", reward: "iphone 12 (64gb)" },
			{ displayRank: "2", reward: "3,000,000 IDR (cash)" },
			{ displayRank: "3", reward: "2,688,000 IDR (cash)" },
			{ displayRank: "4", reward: "2,388,000 IDR (cash)" },
			{ displayRank: "5", reward: "1,388,000 IDR (cash)" }
		],
		[defTabId.slots]: [
			{ displayRank: "1", reward: "iphone 12 (64gb)" },
			{ displayRank: "2", reward: "3,000,000 IDR (cash)" },
			{ displayRank: "3", reward: "2,688,000 IDR (cash)" },
			{ displayRank: "4", reward: "2,388,000 IDR (cash)" },
			{ displayRank: "5", reward: "1,388,000 IDR (cash)" }
		]
	},

	TH: {
		[defTabId.sports]: [
			{ displayRank: "1", reward: "iphone 12 (64gb)" },
			{ displayRank: "2", reward: "6,588 THB (cash)" },
			{ displayRank: "3", reward: "5,588 THB (cash)" },
			{ displayRank: "4", reward: "5,088 THB (cash)" },
			{ displayRank: "5", reward: "4,088 THB (cash)" }
		],
		[defTabId.liveCasino]: [
			{ displayRank: "1", reward: "iphone 12 (64gb)" },
			{ displayRank: "2", reward: "6,588 THB (cash)" },
			{ displayRank: "3", reward: "5,588 THB (cash)" },
			{ displayRank: "4", reward: "5,088 THB (cash)" },
			{ displayRank: "5", reward: "4,088 THB (cash)" }
		],
		[defTabId.slots]: [
			{ displayRank: "1", reward: "iphone 12 (64gb)" },
			{ displayRank: "2", reward: "6,588 THB (cash)" },
			{ displayRank: "3", reward: "5,588 THB (cash)" },
			{ displayRank: "4", reward: "5,088 THB (cash)" },
			{ displayRank: "5", reward: "4,088 THB (cash)" }
		]
	}
};
