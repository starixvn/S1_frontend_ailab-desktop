import i18n from "i18next";
import { defLangList } from "../datas/languageData";

export const defaultLang = "en";

const setResources = () => {
	const result = {};
	defLangList.forEach(l => {
		result[l] = {
			translations: require(`./${l}.json`)
		};
	});
	return result;
};

i18n.init({
	fallbackLng: defaultLang,
	resources: setResources(),
	ns: ["translations"],
	defaultNS: "translations",
	returnObjects: true,
	debug: process.env.NODE_ENV === "development",
	interpolation: {
		escapeValue: false
	},
	react: {
		wait: true
	}
});

i18n.languages = defLangList;

export default i18n;
