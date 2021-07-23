import countryCode, { currencyCode } from "../../datas/countryCode";

export const getUrlParameter = name => {
	const _name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
	const regex = new RegExp(`[\\?&]${_name}=([^&#]*)`, "i");
	if (typeof window !== `undefined`) {
		const results = regex.exec(window.location.search);
		return results === null
			? ""
			: decodeURIComponent(results[1].replace(/\+/g, " "));
	}
};

export const number_format = ({
	number,
	formatRequired = false,
	isConvertRequired = true,
	digits = 2
}) => {
	let _number = number;
	if (!isNaN(number)) {
		if (isConvertRequired || formatRequired) {
			_number /= 1000;
		}

		if (digits > 0) {
			_number = Number(_number).toFixed(digits);
		}
	}

	_number += "";
	const arr = _number.split(".");
	const re = /(\d{1,3})(?=(\d{3})+$)/g;

	return `${arr[0].replace(re, "$1,")}${
		digits > 0 && arr.length === 2 ? `.${arr[1]}` : ""
	}${formatRequired ? " ('000)" : ""}`;
};

const _isConvertList = {
	51: true,
	15: true
};

export const isConvert = currencyId => {
	return _isConvertList[currencyId] === true;
};

export const getCountryCode = currencyId => {
	return countryCode[currencyId];
};
export const getCurrencyCode = langId => {
	if (!langId) return null;

	return currencyCode[langId.toUpperCase()];
};

export const getAmountTip = (minAmount, formatRequired, i18n, digits) => {
	return isNaN(minAmount)
		? i18n("lbl_AmountTooltip")?.replace("{0}", 0)
		: i18n("lbl_AmountTooltip")?.replace(
				"{0}",
				number_format({ number: minAmount, formatRequired, digits })
		  );
};

export const checkAmount = ({
	amount,
	minAmount,
	maxAmount,
	formatRequired,
	t,
	digits,
	maxAmountAllowUnlimit = true
}) => {
	let status = 0;
	let msg = "";
	if (amount !== null && amount !== undefined) {
		const num_Amount = isNaN(amount) ? 0 : Number(amount) * 1000;
		if (num_Amount <= 0) {
			status = 2;
			msg = getAmountTip(minAmount, formatRequired, t, digits);
		} else if (
			(minAmount !== 0 &&
				maxAmount !== 0 &&
				(num_Amount > maxAmount || num_Amount < minAmount)) ||
			(!maxAmountAllowUnlimit && num_Amount > maxAmount)
		) {
			status = 2;
			msg = `${number_format({
				number: num_Amount,
				formatRequired,
				digits
			})} ${t("lbl_NotinLimit")}`;
		}
	} else {
		status = 3;
		msg = getAmountTip(minAmount, formatRequired, t, digits);
	}
	return { status, msg };
};

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
	const flattenDeepObject = obj => {
		return Object.values(obj).reduce((acc, val) => {
			return typeof val === "object"
				? acc.concat(flattenDeepObject(val))
				: acc.concat(val);
		}, []);
	};
	return flattenDeepObject(path)
		.splice(0, orderNumber || flattenDeepObject(path).length)
		.join("/");
};

export const eventPeriod = () => {
	const startDate = new Date("2020/12/10 11:00:00 GMT+0800"); // yyyy/mm/dd hh:mm:ss
	const endDate = new Date("2021/01/07 11:00:00 GMT+0800"); // yyyy/mm/dd hh:mm:ss
	const now = new Date();

	return now > startDate && now < endDate;
};

export const passwordCheck = val => {
	const passwordRegx = /^(?=.{6,15}$)(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*]).*$/;

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
	const _startDate = startDate ? new Date(`${startDate} GMT+0700`) : null; // yyyy/mm/dd hh:mm:ss
	const _endDate = endDate ? new Date(`${endDate} GMT+0700`) : null; // yyyy/mm/dd hh:mm:ss

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

export const langAndCurrMapping = {
	en: 51,
	vn: 51
};

export const stringLinkify = text => {
	const pattern = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
	return text.replace(pattern, '<a href="$1" target="_blank">$1</a>');
};
