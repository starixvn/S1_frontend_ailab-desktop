export const defPreliminary = {
	up: {
		top32Team: [
			{ group: "A", startSort: 1, endSort: 4 },
			{ group: "B", startSort: 17, endSort: 20 },
			{ group: "C", startSort: 5, endSort: 8 },
			{ group: "D", startSort: 21, endSort: 24 }
		],
		roundOf16: [
			{ group: "A", startSort: 1, endSort: 2 },
			{ group: "B", startSort: 9, endSort: 10 },
			{ group: "C", startSort: 3, endSort: 4 },
			{ group: "D", startSort: 11, endSort: 12 }
		],
		quarterFinals: [
			{ group: "A", sort: 1 },
			{ group: "B", sort: 5 },
			{ group: "C", sort: 2 },
			{ group: "D", sort: 6 }
		],
		semiFinals: [
			{ group: "AC", sort: 1 },
			{ group: "BD", sort: 3 }
		]
	},
	down: {
		top32Team: [
			{ group: "E", startSort: 9, endSort: 12 },
			{ group: "F", startSort: 25, endSort: 28 },
			{ group: "G", startSort: 13, endSort: 16 },
			{ group: "H", startSort: 29, endSort: 32 }
		],
		roundOf16: [
			{ group: "E", startSort: 5, endSort: 6 },
			{ group: "F", startSort: 13, endSort: 14 },
			{ group: "G", startSort: 7, endSort: 8 },
			{ group: "H", startSort: 15, endSort: 16 }
		],
		quarterFinals: [
			{ group: "E", sort: 3 },
			{ group: "F", sort: 7 },
			{ group: "G", sort: 4 },
			{ group: "H", sort: 8 }
		],
		semiFinals: [
			{ group: "EG", sort: 2 },
			{ group: "FH", sort: 4 }
		]
	}
};
