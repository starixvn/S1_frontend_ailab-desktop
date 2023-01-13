/* eslint-disable global-require */
import { commonI18n } from "@ailab-desktop/common";
import i18n from "i18next";

export const langList = ["en", "vn"];
export const defaultLang = "en";

const setResources = () => {
	const result = {};
	langList.forEach(l => {
		result[l] = {
			// * 共用的默認翻譯
			[commonI18n.ns.commonTranslations]: commonI18n.resources?.[l],
			// * 當前 app 翻譯
			// eslint-disable-next-line import/no-dynamic-require
			translations: require(`./${l}.json`)
		};
	});
	return result;
};

i18n.init({
	fallbackLng: defaultLang,
	resources: setResources(),
	fallbackNS: [
		// * 配置使用順序，當 commonI18n 的 fallbackNS 找不到翻譯時，則使用當前 app 的 "translations"
		...commonI18n.fallbackNS,
		"translations"
	],
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

i18n.languages = langList;

export default i18n;
