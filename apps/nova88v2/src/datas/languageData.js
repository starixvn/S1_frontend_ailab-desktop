export const defLangList = [
	"en",
	"cs",
	"my",
	"th",
	"th_en",
	"id",
	"id_en",
	"hi",
	"hi_en"
];

export const defOldLangList = ["en", "cs", "th", "id"];

export const isOldLang = _lang => defOldLangList.includes(_lang);

export const defCountryLangList = ["en", "cs", "th", "id", "hi"];

export const isCountryLang = _lang => defCountryLangList.includes(_lang);

export const defLang = {
	en: "en",
	cs: "cs",
	my: "my",
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
	my: "MYR",
	th: "THB",
	th_en: "THB",
	id: "IDR",
	id_en: "IDR",
	hi: "INR",
	hi_en: "INR"
};
