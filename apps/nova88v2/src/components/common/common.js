import { currencyCode } from "../../datas/countryCode";

export const getUrlParameter = name => {
	const _name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
	const regex = new RegExp(`[\\?&]${_name}=([^&#]*)`, "i");
	if (typeof window !== `undefined`) {
		const results = regex.exec(window.location.search);
		return results === null
			? ""
			: decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	return null;
};

export const number_format = (
	number,
	IsConvertRequired = false,
	digits = 2,
	formatRequired = true
) => {
	let n = number;
	if (!isNaN(n)) {
		if (IsConvertRequired) {
			n /= 1000;
		}
		// 無條件捨去到第二位，避免四捨五入進位
		n =
			digits > 0
				? (
						Math.floor(n * Math.pow(10, digits)) /
						Math.pow(10, digits).toFixed(digits)
				  ).toFixed(digits)
				: Number(n);
	}

	n += "";
	const arr = n.split(".");
	const re = /(\d{1,3})(?=(\d{3})+$)/g;
	return (
		arr[0].replace(re, "$1,") +
		(arr.length === 2 ? `.${arr[1]}` : "") +
		(IsConvertRequired && formatRequired ? " ('000)" : "")
	);
};

const _isConvertList = {
	51: true,
	15: true
};

export const isConvert = currencyId => _isConvertList[currencyId] === true;

export const getCurrencyCode = langId => {
	if (!langId) return null;

	return currencyCode[langId.toUpperCase()];
};

export const checkAmount = ({
	amount,
	minAmount,
	maxAmount,
	_isConvert,
	t,
	maxAmountAllowUnlimit = true,
	hintKey,
	digits = 2
}) => {
	let status = 0;
	let msg = "";
	if (amount !== null && amount !== undefined) {
		let num_Amount = isNaN(amount) ? 0 : Number(amount);
		if (_isConvert) {
			num_Amount *= 1000;
		}
		if (num_Amount <= 0 || (minAmount !== 0 && num_Amount < minAmount)) {
			status = 2;
			msg = t("lbl_AmountTooltip")?.replace(
				"{0}",
				number_format(minAmount, _isConvert, digits)
			);
		} else if (
			(minAmount !== 0 &&
				maxAmount !== 0 &&
				(num_Amount > maxAmount || num_Amount < minAmount)) ||
			(!maxAmountAllowUnlimit && num_Amount > maxAmount)
		) {
			status = 2;
			msg = `${number_format(num_Amount, _isConvert, digits)} ${t(
				hintKey ?? "lbl_NotinLimit"
			)}`;
		}
	} else {
		status = 3;
		msg = t(hintKey ?? "lbl_NotinLimit");
	}

	return { status, msg };
};

export const getAmountTip = (minAmount, _isConvert, i18n) =>
	isNaN(minAmount)
		? i18n("lbl_AmountTooltip")?.replace("{0}", 0)
		: i18n("lbl_AmountTooltip")?.replace(
				"{0}",
				number_format(minAmount, _isConvert)
		  );

export const setCookie = (cookieName, cookieValue, exdays) => {
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	const expires = `expires=${d.toUTCString()}`;
	if (typeof document !== `undefined`) {
		document.cookie = `${cookieName}=${cookieValue};${expires};path=/`;
	}
};

export const readCookie = cookieName => {
	if (typeof document !== `undefined`) {
		const match = document.cookie.match(
			new RegExp(`(^| )${cookieName}=([^;]+)`)
		);
		return match ? match[2] : null;
	}
	return null;
};

export const deleteCookie = cookieName => {
	setCookie(cookieName, null, 0);
	// if (typeof document !== `undefined`) {
	// 	document.cookie =
	// 		cookieName + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
	// }
};

export const routerFlattenToPath = (path, orderNumber) => {
	//  將 router 物件扁平化後轉換成路徑
	const flattenDeepObject = obj =>
		Object.values(obj).reduce(
			(acc, val) =>
				typeof val === "object"
					? acc.concat(flattenDeepObject(val))
					: acc.concat(val),
			[]
		);
	return flattenDeepObject(path)
		.splice(0, orderNumber || flattenDeepObject(path).length)
		.join("/");
};

export const passwordCheck = val => {
	const passwordRegx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z!@#$%^&*\d]{6,15}$/;

	// /^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/;

	if (val === "")
		return {
			checked: false,
			message: "msg_PasswordReq"
		};

	if (val !== null && !passwordRegx.test(val))
		return {
			checked: false,
			message: "msg_PasswordVaildate"
		};

	return { checked: true, message: "" };
};

export const isDateRange = (startDate, endDate) => {
	const now = new Date();
	const _startDate = startDate ? new Date(`${startDate} GMT+0800`) : null; // yyyy/mm/dd hh:mm:ss
	const _endDate = endDate ? new Date(`${endDate} GMT+0800`) : null; // yyyy/mm/dd hh:mm:ss

	let result = false;
	if (_startDate && _endDate) {
		result = now > _startDate && now < _endDate;
	} else if (_startDate) {
		result = now > _startDate;
	} else if (_endDate) {
		result = now < _endDate;
	}

	return result;
};

export const setLocalStorage = (key, data) => {
	localStorage.setItem(key, JSON.stringify(data));
};

export const getLocalStorage = key => {
	const json = localStorage.getItem(key);

	return json ? JSON.parse(json) : undefined;
};

export const removeLocalStorage = key => {
	localStorage.removeItem(key);
};

export const uuidv4 = () =>
	// eslint-disable-next-line func-names
	"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
		// eslint-disable-next-line no-bitwise
		const r = (Math.random() * 16) | 0;
		// eslint-disable-next-line no-bitwise
		const v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});

export const stringLinkify = text => {
	const pattern =
		/(\b(https?):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gim;
	return text
		.replace(pattern, '<a href="$1" target="_blank">$1</a>')
		.replaceAll("\n", "<br>");
};

export const defCurrencyList = {
	MYR: 2,
	USD: 3,
	THB: 4,
	CNY: 13,
	IDR: 15,
	INR: 61,
	USDT: 96,
	KHM: 72,
	BDT: 74,
	VND: 51
};

export const currencyIdToCurrency = {
	2: "MYR",
	3: "USD",
	4: "THB",
	13: "CNY",
	15: "IDR",
	61: "INR",
	74: "BDT",
	51: "VND",
	72: "KHUSD"
};

export const defCountryList = {
	2: "Malaysia",
	3: "Global",
	4: "Thailand",
	13: "China",
	15: "Indonesia",
	61: "India",
	72: "Cambodia",
	74: "Bangladesh",
	51: "Vietnam"
};

export const currencyIdToTimeZone = {
	2: "+08:00",
	4: "+07:00",
	15: "+07:00",
	72: "+07:00",
	74: "+06:00",
	61: "+05:30",
	3: "+00:00",
	13: "+08:00",
	51: "+07:00"
};

export const langAndCurrMapping = {
	en: 2,
	cs: 2,
	my: 2,
	th: 4,
	id: 15,
	hi: 61,
	kh: 72,
	bd: 74,
	vn: 51
};

export const defCurrencyToClass = {
	2: "ch",
	3: "gb",
	4: "th",
	13: "cs",
	15: "id",
	61: "in",
	72: "kh",
	74: "bd",
	51: "vn"
};

export const defCurrencyToLangId = {
	2: "my",
	3: "global",
	4: "th",
	13: "cs",
	15: "id",
	51: "vn",
	61: "hi",
	72: "kh",
	74: "bd"
};

export const GetCurrencyName = ({ langId, currencyId, t }) =>
	t(
		currencyId
			? `Currency_${currencyId}`
			: `Currency_${langAndCurrMapping[langId]}`,
		t(`Currency_${defCurrencyList.MYR}`)
	);

export const validImgLang = langId => {
	if (
		langId !== "en" &&
		langId !== "cs" &&
		langId !== "my" &&
		langId !== "th" &&
		langId !== "id" &&
		langId !== "bd" &&
		langId !== "kh" &&
		langId !== "vn"
	) {
		return "en";
	}
	return langId;
};

export const getCombineLangId = (langId, currencyId) => {
	let combineLangId = "";
	switch (langId) {
		case "en":
			combineLangId = `${defCurrencyToLangId[Number(currencyId)]}_en`;
			break;
		case "cs":
			combineLangId =
				currencyId === defCurrencyList.CNY
					? "cs"
					: `${defCurrencyToLangId[Number(currencyId)]}_cs`;
			break;
		default:
			combineLangId = langId;
			break;
	}
	return combineLangId;
};

export const getCombineLeaderBoardLangId = (langId, currencyId) => {
	let combineLangId = "";

	if (currencyId === langAndCurrMapping.my) {
		return langId;
	}

	switch (langId) {
		case "en":
			combineLangId = `${defCurrencyToLangId[Number(currencyId)]}_en`;
			break;
		case "cs":
			combineLangId =
				currencyId === defCurrencyList.CNY
					? "cs"
					: `${defCurrencyToLangId[Number(currencyId)]}_cs`;
			break;
		default:
			combineLangId = langId;
			break;
	}
	return combineLangId;
};

// 用於上傳圖片轉 AWS Url
export const getBase64 = file =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});

export const memberType = {
	generalUser: 1,
	liveHost: 3
};

// 每個字斷第一個字均大寫
export function capitalizeFirstLetter(string = "") {
	const words = string?.toLowerCase().split(" ");

	return words
		.map(word => {
			return word.charAt(0).toUpperCase() + word.slice(1);
		})
		.join(" ");
}

// 數字 format 到特定小數點，預設為第二位
export const numFormatToDigits = (
	value,
	digits = 2,
	minimumFractionDigits = 0
) => {
	if (isNaN(value) || value === undefined) return "0";
	const formatter = new Intl.NumberFormat("en", {
		maximumFractionDigits: digits,
		minimumFractionDigits
	});
	return formatter.format(Number(value.toFixed(digits)));
};
