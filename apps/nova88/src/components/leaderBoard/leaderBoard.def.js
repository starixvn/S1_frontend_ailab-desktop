export const defTabId = {
	first: 1,
	second: 2,
	third: 3,
	fourth: 4
};

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
		startDate: "2021/03/13",
		endDate: "2021/07/12",
		StartMonth: "Mar",
		EndMonth: "Jul"
	}
};

export const defDayNum = {
	today: 0,
	yesterDay: 1,
	lastTwoDay: 2,
	lastThreeDay: 3
};

export const defPeriodOptions = [
	{ id: defPeriodId.period1, displayKey: "lbl_period1" },
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
	const unit = "Ang Pao";
	const rankMYR = "st Runner Up";
	const unitMYR = "MYR";
	const rankIDR = "Juara";
	const unitIDR = "THB";
	const rankTHB = "รองชนะเลิศอันดับ";
	return {
		MYR: {
			[defRewardTabId.final]: [
				{
					displayRank: "Champion",
					reward: "HUBLOT Big Bang Gold Ceramic"
				},
				{
					displayRank: `1${rankMYR}`,
					reward: `HUBLOT	Classic Fusion Aerofusion Chronograph Titanium`
				},
				{
					displayRank: `2${rankMYR}`,
					reward: `HUBLOT Classic Fusion Chronograph Titanium Blue`
				},
				{ displayRank: `3${rankMYR}`, reward: `${unitMYR} 18,000` },
				{ displayRank: `4${rankMYR}`, reward: `${unitMYR} 15,000` },
				{ displayRank: `5${rankMYR}`, reward: `${unitMYR} 13,000` },
				{ displayRank: `6${rankMYR}`, reward: `${unitMYR} 10,000` },
				{ displayRank: `7${rankMYR}`, reward: `${unitMYR} 8,000` },
				{ displayRank: `8${rankMYR}`, reward: `${unitMYR} 5,000` }
			],
			[defRewardTabId.monthly]: [
				{ displayRank: "Champion", reward: `${unitMYR} 8,000` },
				{ displayRank: `1${rankMYR}`, reward: `${unitMYR} 5,000` },
				{ displayRank: `2${rankMYR}`, reward: `${unitMYR} 3,000` }
			]
		},
		RMB: {
			[defRewardTabId.final]: [
				{
					displayRank: "Champion",
					reward: "HUBLOT Big Bang Gold Ceramic"
				},
				{
					displayRank: `1${rankMYR}`,
					reward: `HUBLOT	Classic Fusion Aerofusion Chronograph Titanium`
				},
				{
					displayRank: `2${rankMYR}`,
					reward: `HUBLOT Classic Fusion Chronograph Titanium Blue`
				},
				{ displayRank: `3${rankMYR}`, reward: `${unitMYR} 18,000` },
				{ displayRank: `4${rankMYR}`, reward: `${unitMYR} 15,000` },
				{ displayRank: `5${rankMYR}`, reward: `${unitMYR} 13,000` },
				{ displayRank: `6${rankMYR}`, reward: `${unitMYR} 10,000` },
				{ displayRank: `7${rankMYR}`, reward: `${unitMYR} 8,000` },
				{ displayRank: `8${rankMYR}`, reward: `${unitMYR} 5,000` }
			],
			[defRewardTabId.monthly]: [
				{ displayRank: "Champion", reward: `${unitMYR} 8,000` },
				{ displayRank: `1${rankMYR}`, reward: `${unitMYR} 5,000` },
				{ displayRank: `2${rankMYR}`, reward: `${unitMYR} 3,000` }
			]
		},
		IDR: {
			[defRewardTabId.final]: [
				{ displayRank: "PEMENANG", reward: "LOGAM MULIA 100g" },
				{ displayRank: `${rankIDR} 2`, reward: "LOGAM MULIA 75g" },
				{ displayRank: `${rankIDR} 3`, reward: "LOGAM MULIA 50g" },
				{ displayRank: `${rankIDR} 4`, reward: `18,000` },
				{ displayRank: `${rankIDR} 5`, reward: `15,000` },
				{ displayRank: `${rankIDR} 6`, reward: `13,000` },
				{ displayRank: `${rankIDR} 7`, reward: `10,000` },
				{ displayRank: `${rankIDR} 8`, reward: `8,000` },
				{ displayRank: `${rankIDR} 9`, reward: `5,000` }
			],
			[defRewardTabId.monthly]: [
				{ displayRank: "Pemenang", reward: "15,000,000" },
				{ displayRank: `${rankIDR} 2`, reward: `12,000,000` },
				{ displayRank: `${rankIDR} 3`, reward: `8,000,000` }
			]
		},

		THB: {
			[defRewardTabId.final]: [
				{ displayRank: "รางวัลชนะเลิศ", reward: `${unitIDR} 80,000` },
				{ displayRank: `${rankTHB} 1`, reward: `${unitIDR} 50,000` },
				{ displayRank: `${rankTHB} 2`, reward: `${unitIDR} 35,000` },
				{ displayRank: `${rankTHB} 3`, reward: `${unitIDR} 30,000` },
				{ displayRank: `${rankTHB} 4`, reward: `${unitIDR} 25,000` },
				{ displayRank: `${rankTHB} 5`, reward: `${unitIDR} 20,000` },
				{ displayRank: `${rankTHB} 6`, reward: `${unitIDR} 15,000` },
				{ displayRank: `${rankTHB} 7`, reward: `${unitIDR} 10,000` },
				{ displayRank: `${rankTHB} 8`, reward: `${unitIDR} 5,000` }
			],
			[defRewardTabId.monthly]: [
				{ displayRank: `รางวัลชนะเลิศ`, reward: `${unitIDR} 15,000` },
				{ displayRank: `${rankTHB} 1`, reward: `${unitIDR} 12,000` },
				{ displayRank: `${rankTHB} 2`, reward: `${unitIDR} 8,000` }
			]
		}
	};
};
