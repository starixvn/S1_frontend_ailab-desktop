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

export const defTabDisplayKey = {
	1: "lbl_Sports",
	2: "lbl_Casino",
	3: "lbl_LiveCasino"
};

export const defDayNum = {
	yesterDay: 1,
	lastTwoDay: 2,
	lastThreeDay: 3
};

export const defDayOptions = [
	{ id: defDayNum.yesterDay, displayKey: "lbl_YesterDay" },
	{ id: defDayNum.lastTwoDay, displayKey: "lbl_last_2_day" },
	{ id: defDayNum.lastThreeDay, displayKey: "lbl_last_3_day" }
];
