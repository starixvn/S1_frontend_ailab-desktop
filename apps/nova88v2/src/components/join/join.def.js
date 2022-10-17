export const initValue = {
	username: "",
	password: "",
	phone: "",
	currency: 0,
	affCode: "",
	termsCheck: false,
	ageCheck: false,
	specialBonusCode: null
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
	4: "TH",
	13: "CS",
	15: "ID",
	51: "VN",
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
	bd_en: "en"
};

export const reCaptchaDomainExtraList = [
	"nova88101.net",
	"nova88102.net",
	"nova88103.net",
	"nova88105.net",
	"nova88106.net",
	"nova88801.net",
	"nova88mas801.com",
	"nova88bkk801.com",
	"nova88india801.com"
];
