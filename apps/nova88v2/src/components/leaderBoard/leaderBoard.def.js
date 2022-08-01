import { defCurrencyList } from "../common/common";

export const defTabId = {
	first: 1,
	second: 2,
	third: 3,
	fourth: 4
};

export const defTabList = [
	{ id: defTabId.first, displayKey: "lbl_Event" },
	{ id: defTabId.second, displayKey: "lbl_Ranking" },
	{ id: defTabId.third, displayKey: "lbl_GAMES_POINT" },
	{ id: defTabId.fourth, displayKey: "lbl_RESULT" }
];

export const defDayNum = {
	today: 0,
	yesterDay: 1,
	lastTwoDay: 2,
	lastThreeDay: 3
};

export const defDayOptions = [
	{ id: defDayNum.today, displayKey: "lbl_Today" },
	{ id: defDayNum.yesterDay, displayKey: "lbl_YesterDay" },
	{ id: defDayNum.lastTwoDay, displayKey: "lbl_2_DAYS_AGO" },
	{ id: defDayNum.lastThreeDay, displayKey: "lbl_3_DAYS_AGO" }
];

export const defGameType = {
	all: 0,
	sports: 1,
	slots: 2,
	casino: 3
};

export const defGameTypeOptions = [
	{ id: defGameType.sports, displayKey: "lbl_Sports" },
	{ id: defGameType.casino, displayKey: "lbl_LiveCasino" },
	{ id: defGameType.slots, displayKey: "lbl_Slots" }
];

export const defRankNum = { current: 50, monthly: 30 };

export const defEventCode = { current: "2021051", monthly: "2021052" };

export const defMonthKey = {
	1: "lbl_Jan",
	2: "lbl_Feb",
	3: "lbl_Mar",
	4: "lbl_Apr",
	5: "lbl_May",
	6: "lbl_Jun",
	7: "lbl_Jul",
	8: "lbl_Aug",
	9: "lbl_Sep",
	10: "lbl_Otc",
	11: "lbl_Nov",
	12: "lbl_Dec"
};

export const getLeaderBoardSupportCurrencyId = () =>
	Object.keys(defRewardList({ t: () => "_" })).map(
		key => defCurrencyList[key]
	);

export const defRewardList = ({ t }) => ({
	MYR: {
		section1: [
			{ turnover: "100", point: "1" },
			{ turnover: "500", point: "1" },
			{ turnover: "1000", point: "1" }
		],
		section2: [
			{
				rank: t("lbl_RankChampion"),
				deposit: "300,000",
				point: "30,000",
				bonus: "10,000"
			},
			{
				rank: t("lbl_Rank1"),
				deposit: "250,000",
				point: "25,000",
				bonus: "8,000"
			},
			{
				rank: t("lbl_Rank2"),
				deposit: "180,000",
				point: "18,000",
				bonus: "6,000"
			},
			{
				rank: t("lbl_Rank3"),
				deposit: "150,000",
				point: "15,000",
				bonus: "5,000"
			},
			{
				rank: t("lbl_Rank4"),
				deposit: "120,000",
				point: "12,000",
				bonus: "4,000"
			},
			{
				rank: t("lbl_Rank5"),
				deposit: "100,000",
				point: "10,000",
				bonus: "3,000"
			},
			{
				rank: t("lbl_Rank6"),
				deposit: "90,000",
				point: "9,000",
				bonus: "2,000"
			},
			{
				rank: t("lbl_Rank7"),
				deposit: "80,000",
				point: "8,000",
				bonus: "1,000"
			},
			{
				rank: t("lbl_Rank9_30"),
				deposit: "50,000",
				point: "5,000",
				bonus: "500"
			}
		]
	},
	THB: {
		section1: [
			{ turnover: "500", point: "1" },
			{ turnover: "3,000", point: "1" },
			{ turnover: "6,000", point: "1" }
		],
		section2: [
			{
				rank: t("lbl_RankChampion"),
				deposit: "1,200,000",
				point: "30,000",
				bonus: "50,000"
			},
			{
				rank: t("lbl_Rank1"),
				deposit: "1,100,000",
				point: "25,000",
				bonus: "40,000"
			},
			{
				rank: t("lbl_Rank2"),
				deposit: "950,000",
				point: "18,000",
				bonus: "35,000"
			},
			{
				rank: t("lbl_Rank3"),
				deposit: "800,000",
				point: "15,000",
				bonus: "25,000"
			},
			{
				rank: t("lbl_Rank4"),
				deposit: "700,000",
				point: "12,000",
				bonus: "20,000"
			},
			{
				rank: t("lbl_Rank5"),
				deposit: "600,000",
				point: "10,000",
				bonus: "15,000"
			},
			{
				rank: t("lbl_Rank6"),
				deposit: "500,000",
				point: "9,000",
				bonus: "10,000"
			},
			{
				rank: t("lbl_Rank7"),
				deposit: "400,000",
				point: "8,000",
				bonus: "5,000"
			},
			{
				rank: t("lbl_Rank9_30"),
				deposit: "300,000",
				point: "5,000",
				bonus: "3,000"
			}
		]
	},
	IDR: {
		section1: [
			{ turnover: "300,000", point: "1" },
			{ turnover: "1,000,000", point: "1" },
			{ turnover: "2,500,000", point: "1" }
		],
		section2: [
			{
				rank: t("lbl_RankChampion"),
				deposit: "400,000,000",
				point: "30,000",
				bonus: "15,000,000"
			},
			{
				rank: t("lbl_Rank1"),
				deposit: "300,000,000",
				point: "25,000",
				bonus: "12,000,000"
			},
			{
				rank: t("lbl_Rank2"),
				deposit: "220,000,000",
				point: "18,000",
				bonus: "8,500,000"
			},
			{
				rank: t("lbl_Rank3"),
				deposit: "180,000,000",
				point: "15,000",
				bonus: "6,500,000"
			},
			{
				rank: t("lbl_Rank4"),
				deposit: "150,000,000",
				point: "12,000",
				bonus: "5,000,000"
			},
			{
				rank: t("lbl_Rank5"),
				deposit: "130,000,000",
				point: "10,000",
				bonus: "3,500,000"
			},
			{
				rank: t("lbl_Rank6"),
				deposit: "100,000,000",
				point: "9,000",
				bonus: "2,000,000"
			},
			{
				rank: t("lbl_Rank7"),
				deposit: "65,000,000",
				point: "8,000",
				bonus: "1,000,000"
			},
			{
				rank: t("lbl_Rank9_30"),
				deposit: "35,000,000",
				point: "5,000",
				bonus: "500,000"
			}
		]
	}
});
