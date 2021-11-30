export const defLangList = [
	"en",
	"cs",
	"th",
	"th_en",
	"id",
	"id_en",
	"hi",
	"hi_en"
];

export const defOldLangList = ["en", "cs", "th", "id"];

export const isOldLang = _lang => {
	return defOldLangList.includes(_lang);
};

export const defCountryLangList = ["en", "cs", "th", "id", "hi"];

export const isCountryLang = _lang => {
	return defCountryLangList.includes(_lang);
};

export const defLang = {
	en: "en",
	cs: "cs",
	th: "th",
	th_en: "th_en",
	id: "id",
	id_en: "id_en",
	hi: "hi",
	hi_en: "hi_en"
};

export const defLangToCurrency = {
	en: "MYR",
	cs: "MYR",
	th: "THB",
	th_en: "THB",
	id: "IDR",
	id_en: "IDR",
	hi: "INR",
	hi_en: "INR"
};
