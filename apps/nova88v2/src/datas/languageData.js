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

export const defLangListOld = ["en", "cs", "th", "id"];

export const isOldLang = _lang => {
	return defLangListOld.includes(_lang);
};

export const defLang = {
	en: "en",
	cs: "cs",
	th: "th",
	th_en: "th_en",
	id: "id",
	ld_en: "id_en",
	hi: "hi",
	hi_en: "hi_en"
};
