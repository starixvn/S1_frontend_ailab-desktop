export const defTabId = {
	event: 0,
	sports: 1,
	liveCasino: 3,
	slots: 2,
	records: 5,
	lastEvent: 6
};

export const defTabList = [
	{ id: defTabId.event, displayKey: "lbl_Event" },
	{ id: defTabId.sports, displayKey: "lbl_Sports" },
	{ id: defTabId.liveCasino, displayKey: "lbl_LiveCasino" },
	{ id: defTabId.slots, displayKey: "lbl_Casino" },
	{ id: defTabId.records, displayKey: "lbl_Records" },
	{ id: defTabId.lastEvent, displayKey: "lbl_Last_Event" }
];

export const defBackground = {
	0: "eventRule",
	1: "ranksports",
	3: "rankLivecasino",
	2: "rankSlots",
	5: "rankRecords",
	6: "lastGameRecords"
};

export const defTabDisplayKey = {
	1: "lbl_Sports",
	2: "lbl_Casino",
	3: "lbl_LiveCasino"
};

export const defLeaderBoardTitle = {
	1: "lbl_Ranking_Sports",
	2: "lbl_Ranking_Slots",
	3: "lbl_Ranking_LiveCasino"
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

export const defRewardList = ({ t }) => {
	let unit = "Ang Pao";
	let unitCS = "紅包";
	return {
		MYR: {
			[defTabId.sports]: [
				{
					displayRank: "1",
					reward:
						"MacBook Pro 13 Apple M1 Chip with 8-Core CPU and 8-Core GPU 256 GB Storage"
				},
				{ displayRank: "2", reward: `iPad Air 64GB Wi-Fi+Cellular ` },
				{ displayRank: "3", reward: `iPad 10.2inch 128GB Wi-Fi ` },
				{ displayRank: "4", reward: `988 ${unit}` },
				{ displayRank: "5", reward: `888 ${unit}` },
				{ displayRank: "6", reward: `788 ${unit}` },
				{ displayRank: "7", reward: `688 ${unit}` },
				{ displayRank: "8", reward: `588 ${unit}` },
				{ displayRank: "9", reward: `188 ${unit}` },
				{ displayRank: "10", reward: `88 ${unit}` }
			],
			[defTabId.liveCasino]: [
				{
					displayRank: "1",
					reward:
						"MacBook Pro 13 Apple M1 Chip with 8-Core CPU and 8-Core GPU 256 GB Storage"
				},
				{ displayRank: "2", reward: `iPad Air 64GB Wi-Fi+Cellular ` },
				{ displayRank: "3", reward: `iPad 10.2inch 128GB Wi-Fi ` },
				{ displayRank: "4", reward: `988 ${unit}` },
				{ displayRank: "5", reward: `888 ${unit}` },
				{ displayRank: "6", reward: `788 ${unit}` },
				{ displayRank: "7", reward: `688 ${unit}` },
				{ displayRank: "8", reward: `588 ${unit}` },
				{ displayRank: "9", reward: `188 ${unit}` },
				{ displayRank: "10", reward: `88 ${unit}` }
			],
			[defTabId.slots]: [
				{
					displayRank: "1",
					reward:
						"MacBook Pro 13 Apple M1 Chip with 8-Core CPU and 8-Core GPU 256 GB Storage"
				},
				{ displayRank: "2", reward: `iPad Air 64GB Wi-Fi+Cellular ` },
				{ displayRank: "3", reward: `iPad 10.2inch 128GB Wi-Fi ` },
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
			[defTabId.sports]: [
				{
					displayRank: "1",
					reward:
						"MacBook Pro 13 Apple M1 Chip with 8-Core CPU and 8-Core GPU 256 GB Storage"
				},
				{ displayRank: "2", reward: `iPad Air 64GB Wi-Fi+Cellular ` },
				{ displayRank: "3", reward: `iPad 10.2inch 128GB Wi-Fi ` },
				{ displayRank: "4", reward: `988 ${unitCS}` },
				{ displayRank: "5", reward: `888 ${unitCS}` },
				{ displayRank: "6", reward: `788 ${unitCS}` },
				{ displayRank: "7", reward: `688 ${unitCS}` },
				{ displayRank: "8", reward: `588 ${unitCS}` },
				{ displayRank: "9", reward: `188 ${unitCS}` },
				{ displayRank: "10", reward: `88 ${unitCS}` }
			],
			[defTabId.liveCasino]: [
				{
					displayRank: "1",
					reward:
						"MacBook Pro 13 Apple M1 Chip with 8-Core CPU and 8-Core GPU 256 GB Storage"
				},
				{ displayRank: "2", reward: `iPad Air 64GB Wi-Fi+Cellular ` },
				{ displayRank: "3", reward: `iPad 10.2inch 128GB Wi-Fi ` },
				{ displayRank: "4", reward: `988 ${unitCS}` },
				{ displayRank: "5", reward: `888 ${unitCS}` },
				{ displayRank: "6", reward: `788 ${unitCS}` },
				{ displayRank: "7", reward: `688 ${unitCS}` },
				{ displayRank: "8", reward: `588 ${unitCS}` },
				{ displayRank: "9", reward: `188 ${unitCS}` },
				{ displayRank: "10", reward: `88 ${unitCS}` }
			],
			[defTabId.slots]: [
				{
					displayRank: "1",
					reward:
						"MacBook Pro 13 Apple M1 Chip with 8-Core CPU and 8-Core GPU 256 GB Storage"
				},
				{ displayRank: "2", reward: `iPad Air 64GB Wi-Fi+Cellular ` },
				{ displayRank: "3", reward: `iPad 10.2inch 128GB Wi-Fi ` },
				{ displayRank: "4", reward: `988 ${unitCS}` },
				{ displayRank: "5", reward: `888 ${unitCS}` },
				{ displayRank: "6", reward: `788 ${unitCS}` },
				{ displayRank: "7", reward: `688 ${unitCS}` },
				{ displayRank: "8", reward: `588 ${unitCS}` },
				{ displayRank: "9", reward: `188 ${unitCS}` },
				{ displayRank: "10", reward: `88 ${unitCS}` }
			]
		},
		IDR: {
			[defTabId.sports]: [
				{ displayRank: "1", reward: "iPad 10.2inch 128GB Wi-Fi" },
				{ displayRank: "2", reward: `3,388,000 IDR ${unit}` },
				{ displayRank: "3", reward: `3,088,000 IDR ${unit}` },
				{ displayRank: "4", reward: `2,688,000 IDR ${unit}` },
				{ displayRank: "5", reward: `2,388,000 IDR ${unit}` },
				{ displayRank: "6", reward: `2,088,000 IDR ${unit}` },
				{ displayRank: "7", reward: `688,000 IDR ${unit}` },
				{ displayRank: "8", reward: `388,000 IDR ${unit}` }
			],
			[defTabId.liveCasino]: [
				{ displayRank: "1", reward: "iPad 10.2inch 128GB Wi-Fi" },
				{ displayRank: "2", reward: `3,388,000 IDR ${unit}` },
				{ displayRank: "3", reward: `3,088,000 IDR ${unit}` },
				{ displayRank: "4", reward: `2,688,000 IDR ${unit}` },
				{ displayRank: "5", reward: `2,388,000 IDR ${unit}` },
				{ displayRank: "6", reward: `2,088,000 IDR ${unit}` },
				{ displayRank: "7", reward: `688,000 IDR ${unit}` },
				{ displayRank: "8", reward: `388,000 IDR ${unit}` }
			],
			[defTabId.slots]: [
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
			[defTabId.sports]: [
				{ displayRank: "1", reward: "iPad 10.2inch 128GB Wi-Fi " },
				{ displayRank: "2", reward: `7,788 THB ${unit}` },
				{ displayRank: "3", reward: `6,688 THB ${unit}` },
				{ displayRank: "4", reward: `5,588 THB ${unit}` },
				{ displayRank: "5", reward: `4,888 THB ${unit}` },
				{ displayRank: "6", reward: `4,388 THB ${unit}` },
				{ displayRank: "7", reward: `1,388 THB ${unit}` },
				{ displayRank: "8", reward: `688 THB ${unit}` }
			],
			[defTabId.liveCasino]: [
				{ displayRank: "1", reward: "iPad 10.2inch 128GB Wi-Fi " },
				{ displayRank: "2", reward: `7,788 THB ${unit}` },
				{ displayRank: "3", reward: `6,688 THB ${unit}` },
				{ displayRank: "4", reward: `5,588 THB ${unit}` },
				{ displayRank: "5", reward: `4,888 THB ${unit}` },
				{ displayRank: "6", reward: `4,388 THB ${unit}` },
				{ displayRank: "7", reward: `1,388 THB ${unit}` },
				{ displayRank: "8", reward: `688 THB ${unit}` }
			],
			[defTabId.slots]: [
				{ displayRank: "1", reward: "iPad 10.2inch 128GB Wi-Fi " },
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
