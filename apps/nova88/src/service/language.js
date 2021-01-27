import { readCookie } from "../components/common/common";

const siteLangList = ["en", "cs", "th", "id"];

const SetReplaceChar = (initPath, idx, langId) => {
	const _path = initPath
		.split("/")
		?.filter(x => x !== "")
		.map(x => (siteLangList.includes(x) ? langId : x));

	let result = "";
	if (_path.length === 1) {
		const pathIsLang = siteLangList.includes(_path[0]);
		result = pathIsLang
			? `/${_path.join("/")}`
			: `/${langId}/${_path.join("/")}`;
	} else if (_path.length > 1) {
		result = `/${_path.join("/")}`;
	} else {
		result = `/${langId}${initPath}`;
	}
	return result;
};

export const getNewLanguagePath = langId => {
	const url =
		window.location.pathname +
		window.location.search +
		window.location.hash;

	return SetReplaceChar(url, 1, langId);
};

export const isVaildLang = lang => {
	const _lang = lang.replace("/");
	return siteLangList.includes(_lang);
};

export const GET_LANG_ID = userLangId => {
	const siteDefLangId = "en";

	let langId = userLangId || readCookie("LangId");
	const browserDefLang =
		typeof window !== `undefined` ? navigator.language.toLowerCase() : null;

	if (!langId && browserDefLang) {
		if (
			browserDefLang.startsWith("ms") ||
			browserDefLang.startsWith("zh-tw") ||
			browserDefLang.startsWith("zh-hk")
		) {
			langId = "cs";
		} else if (browserDefLang.startsWith("zh")) {
			langId = "cs";
		} else if (browserDefLang.startsWith("th")) {
			langId = "th";
		} else if (browserDefLang.startsWith("vi")) {
			langId = "vn";
		} else if (browserDefLang.startsWith("id")) {
			langId = "id";
		} else if (browserDefLang.startsWith("jp")) {
			langId = "jp";
		} else if (browserDefLang.startsWith("ko")) {
			langId = "ko";
		} else if (
			browserDefLang.startsWith("pa") ||
			browserDefLang.startsWith("ta")
		) {
			langId = "hi";
		} else if (browserDefLang.startsWith("en")) {
			langId = "en";
		} else {
			langId = siteDefLangId;
		}
	}

	if (!langId || !siteLangList.includes(langId)) {
		langId = siteDefLangId;
	}

	return langId;
};
