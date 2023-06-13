export const defPreliminary = {
	left: {
		top32Team: [
			{ group: "A", startSort: 1, endSort: 4 },
			{ group: "C", startSort: 5, endSort: 8 },
			{ group: "E", startSort: 9, endSort: 12 },
			{ group: "G", startSort: 13, endSort: 16 }
		],
		roundOf16: [
			{ group: "A", startSort: 1, endSort: 2 },
			{ group: "C", startSort: 3, endSort: 4 },
			{ group: "E", startSort: 5, endSort: 6 },
			{ group: "G", startSort: 7, endSort: 8 }
		],
		quarterFinals: [
			{ group: "A", sort: 1 },
			{ group: "C", sort: 2 },
			{ group: "E", sort: 3 },
			{ group: "G", sort: 4 }
		],
		semiFinals: [
			{ group: "AC", sort: 1 },
			{ group: "EG", sort: 2 }
		]
	},
	right: {
		top32Team: [
			{ group: "B", startSort: 17, endSort: 20 },
			{ group: "D", startSort: 21, endSort: 24 },
			{ group: "F", startSort: 25, endSort: 28 },
			{ group: "H", startSort: 29, endSort: 32 }
		],
		roundOf16: [
			{ group: "B", startSort: 9, endSort: 10 },
			{ group: "D", startSort: 11, endSort: 12 },
			{ group: "F", startSort: 13, endSort: 14 },
			{ group: "H", startSort: 15, endSort: 16 }
		],
		quarterFinals: [
			{ group: "B", sort: 5 },
			{ group: "D", sort: 6 },
			{ group: "F", sort: 7 },
			{ group: "H", sort: 8 }
		],
		semiFinals: [
			{ group: "BD", sort: 3 },
			{ group: "FH", sort: 4 }
		]
	}
};

export const defEventClassName = {
	top32Team: "four",
	roundOf16: "two",
	quarterFinals: "one",
	semiFinals: "semi"
};
