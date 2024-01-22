export const OCCUPATION_OPTIONS = [
	{ id: 0, displayKey: "lbl_SelfEmployed", value: 1 },
	{ id: 1, displayKey: "lbl_Employed", value: 2 },
	{ id: 2, displayKey: "lbl_Retired", value: 3 },
	{ id: 3, displayKey: "lbl_Others", value: 4 }
];

export const SOURCE_OF_INCOME_OPTIONS = [
	{ id: 0, displayKey: "lbl_OwnSaving", value: 1 },
	{ id: 1, displayKey: "lbl_Loan", value: 2 },
	{ id: 2, displayKey: "lbl_Others", value: 3 }
];

export const initValue = {
	username: "",
	password: "",
	areaCodeIdx: null,
	phone: "",
	email: "",
	realName: "",
	currencyIdx: null,
	termsCheck: false,
	ageCheck: false,
	affCode: null,
	specialBonusCode: null,
	birth: "",
	occupation: {
		index: 0, // * 初始 0
		value: OCCUPATION_OPTIONS[0].value
	},
	sourceOfIncome: {
		index: 0, // * 初始 0
		value: SOURCE_OF_INCOME_OPTIONS[0].value
	},
	nationality: "",
	country: "",
	city: "",
	postCode: "",
	lineFirst: ""
};

export const initTip = {
	username: { checked: null, msg: "" },
	realName: { checked: null, msg: "" },
	password: { checked: null, msg: "" },
	phone: { checked: null, msg: "" },
	email: { checked: null, msg: "" },
	currency: { checked: null, msg: "" },
	checkbox: { checked: null, msg: "" },
	affCode: { checked: null, msg: "" },
	specialBonusCode: { checked: null, msg: "" },
	birth: { checked: null, msg: "" },
	nationality: { checked: null, msg: "" },
	country: { checked: null, msg: "" },
	city: { checked: null, msg: "" }
};
