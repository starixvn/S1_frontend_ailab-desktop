import { api_account_UserLogin, api_account_UserLogout } from "./api/account";
import { api_accountStrict_GetCustProfile } from "./api/accountStrict";
import { api_site_CheckSignIn } from "./api/site";
import { setCookie } from "../components/common/common";
import { langCookie } from "../config";

const isBrowser = typeof window !== `undefined`;

export const LOGIN = async ({ userName, password, langId }) => {
	if (!isBrowser) return false;

	let result = {};

	try {
		let url;
		let platform;
		let userAgent;
		let screen;
		let di = "";
		let bi = "";
		let detecasAnalysis = "";
		let sessionKey = "";
		let token = "";

		if (typeof window !== undefined) {
			url = window.location.origin;
			platform = navigator.platform;
			userAgent = navigator.userAgent;
			screen = `${window.screen.width}:${window.screen.height}:${window.screen.colorDepth}`;

			// * di, bi, detecasAnalysis, sessionKey, token 引用第三方 js: //*/activator.ashx
			di = document.getElementById("__di")?.value;
			bi = document.getElementById("__bi")?.value;
			detecasAnalysis =
				document.getElementById("detecas-analysis")?.value;
			sessionKey = document.getElementById("__fdi")?.value; // * fdi = sessionKey
			token = document.getElementById("__tk")?.value; // * 默認為 empty
		}

		const payload = {
			UserName: userName,
			Userpwd: password,
			isPersistent: true,
			url,
			platform,
			userAgent,
			screen,
			FPSRequest: {
				di,
				bi,
				detecasAnalysis,
				sessionKey,
				token
			}
		};

		const res = await api_account_UserLogin(langId, payload);

		let errMsg = res.data.message;
		let isLogin = false;
		let userData = {};
		if (res.data.errorCode === 0) {
			const userlangId = res.data.message.replace("/", "");

			const res_custInfo = await api_accountStrict_GetCustProfile();
			let _loginUser = {
				userName,
				langId: userlangId,
				isLogin: true
			};

			if (res_custInfo.data.errorCode === 0) {
				const { data } = res_custInfo.data;
				_loginUser = {
					..._loginUser,
					...data
				};
				setCookie(langCookie, data.langId);
			}

			errMsg = "";
			isLogin = true;
			userData = _loginUser;
		}

		result = {
			errorCode: res.data.errorCode,
			message: errMsg,
			isLogin,
			userData
		};
	} catch (error) {
		result = {
			errorCode: 999,
			message: "",
			isLogin: false,
			userData: {}
		};
	}

	return result;
};

export const IS_LOGGED_IN = async () => {
	try {
		const res = await api_site_CheckSignIn();
		return res.data.errorCode === 0;
	} catch (error) {
		return false;
	}
};

export const LOGOUT = callback => {
	if (!isBrowser) return;
	api_account_UserLogout().then(
		res => {
			if (res.data.errorCode === 0) {
				callback();
			}
		},
		err => {
			if (err.response.status === 401) {
				callback();
			}
		}
	);
};
