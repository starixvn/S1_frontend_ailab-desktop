export const initValue = {
	username: "",
	realName: "",
	password: "",
	confirmPwd: "",
	phone: "",
	email: "",
	affCode: null,
	currency: 0,
	agreeCheck: false
};

export const initTip = {
	username: { checked: null, msg: "" },
	realName: { checked: null, msg: "" },
	password: { checked: null, msg: "" },
	confirmPwd: { checked: null, msg: "" },
	currency: { checked: null, msg: "" },
	phone: { checked: null, msg: "" },
	email: { checked: null, msg: "" },
	affCode: { checked: null, msg: "" },
	checkbox: { checked: null, msg: "" }
};

export const currencyToAreacode = {
	2: "MY",
	4: "TH",
	13: "CS",
	15: "ID",
	51: "VN",
	96: "MY"
};

export const reCaptchaEnum = {
	en: "en",
	vn: "vi"
};

export const initShowPwdState = {
	password: false,
	confirmPwd: false
};
