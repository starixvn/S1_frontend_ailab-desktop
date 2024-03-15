export const initValue = {
	username: "",
	password: "",
	phone: "",
	currency: 0,
	affCode: "",
	termsCheck: false,
	ageCheck: false,
	specialBonusCode: ""
};

export const initTip = {
	username: { checked: null, msg: "" },
	password: { checked: null, msg: "" },
	currency: { checked: null, msg: "" },
	phone: { checked: null, msg: "" },
	affCode: { checked: null, msg: "" },
	checkbox: { checked: null, msg: "" },
	specialBonusCode: { checked: null, msg: "" }
};

export const currencyToAreacode = {
	2: "MY",
	3: "GB",
	4: "TH",
	13: "CS",
	15: "ID",
	51: "VN",
	61: "IN",
	72: "KH",
	74: "BD",
	96: "MY"
};

export const reCaptchaEnum = {
	en: "en",
	cs: "zh-CN",
	hi: "hi",
	hi_en: "en",
	id: "id",
	id_en: "en",
	my: "ms",
	th: "th",
	th_en: "en",
	bd: "bn",
	bd_en: "en",
	kh: "en",
	kh_en: "en",
	vn: "vi"
};

export const countryEnum = {
	MY: "2.0",
	TH: "2.0",
	ID: "2.0",
	IN: "1.8",
	BD: "1.8",
	CS: "1.8",
	GB: "1.8",
	KH: "1.8"
};

export const limitCountryNum = {
	"+60": "9-10",
	"+66": "9",
	"+62": "10-13",
	"+91": "10",
	"+86": "10-11",
	"+880": "10",
	"+855": "8-9"
};
