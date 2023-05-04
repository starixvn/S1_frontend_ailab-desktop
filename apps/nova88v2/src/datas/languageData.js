export const defLangList = ["en", "cs", "my", "th", "id", "hi", "bd", "kh"];

export const defOldLangList = ["en", "cs", "th", "id", "bd", "kh"];

export const isOldLang = _lang => defOldLangList.includes(_lang);

export const defCountryLangList = ["en", "cs", "th", "id", "hi", "bd", "kh"];

export const isCountryLang = _lang => defCountryLangList.includes(_lang);

export const defLang = {
	en: "en",
	cs: "cs",
	my: "my",
	th: "th",
	id: "id",
	hi: "hi",
	bd: "bd",
	kh: "kh"
};

export const defLangToCurrency = {
	en: "MYR",
	cs: "MYR",
	my: "MYR",
	th: "THB",
	id: "IDR",
	hi: "INR",
	bd: "BDT",
	kh: "KHM"
};
