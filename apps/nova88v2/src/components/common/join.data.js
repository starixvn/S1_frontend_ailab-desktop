export const initValue = {
	username: "",
	password: "",
	areaCodeIdx: null,
	phone: "",
	email: "",
	currencyIdx: null,
	termsCheck: false,
	ageCheck: false,
	affCode: null,
	specialBonusCode: null
};

export const initTip = {
	username: { checked: null, msg: "" },
	password: { checked: null, msg: "" },
	phone: { checked: null, msg: "" },
	email: { checked: null, msg: "" },
	currency: { checked: null, msg: "" },
	checkbox: { checked: null, msg: "" },
	affCode: { checked: null, msg: "" },
	specialBonusCode: { checked: null, msg: "" }
};

export const currencyToAreacode = {
	2: "MY",
	4: "TH",
	13: "CS",
	15: "ID",
	51: "VN",
	96: "MY"
};
