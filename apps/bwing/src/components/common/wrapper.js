import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "@reach/router";
import { useTranslation } from "react-i18next";
import * as ct from "./context";
import { defaultLang } from "../../i18n/config";
import { getUrlParameter, setCookie, deleteCookie, readCookie } from "./common";
import { IS_LOGGED_IN } from "../../service/auth";
import {
	api_account_GetMsgCount,
	api_account_onlineCheck
} from "../../service/api/account";
import { api_accountStrict_GetCustProfile } from "../../service/api/accountStrict";
import { defPopBoxType } from "./defPopBoxType";
import useInterval from "../hook/useInterval";
import {
	GET_LANG_ID,
	isVaildLang,
	getNewLanguagePath
} from "../../service/language";
import useGetWalletInfo from "./wrapper.walletInfo";
import { langCookie } from "../../config";

const defaultPathLang = () => {
	const urlLang =
		typeof document === `undefined`
			? ""
			: window.location.pathname.split("/")?.[1];
	const cookieLang = readCookie(langCookie);
	const _defaultLang = "vn";

	let result = _defaultLang;
	if (isVaildLang(urlLang)) {
		result = urlLang;
	} else if (isVaildLang(cookieLang)) {
		result = cookieLang;
	}
	return result;
};

export default ({ children, afterLogin = false }) => {
	const { t, i18n } = useTranslation();
	const [popBox, setPopBox] = useState({
		isOpen: false,
		popBoxType: null
	});
	const [loading, setLoading] = useState(false);
	const [msgCount, setMsgCount] = useState(0);
	const [userInfo, setUserInfo] = useState({
		isLogin: null,
		userName: null,
		langId: defaultPathLang()
	});

	const [currentPath] = useState(
		typeof window !== `undefined` ? window.location.pathname : null
	);
	const [correctPath, setCorrectPath] = useState(false);
	const [redirectPath, setRedirectPath] = useState(null);
	const [isRoot, setIsRoot] = useState(false);

	const walletInfo = useGetWalletInfo({ isLogin: userInfo.isLogin });

	const isMountedRef = useRef(null);
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		IS_LOGGED_IN().then(isLogin => {
			if (userInfo.kickout) {
				if (userInfo.willLogout) {
					setUserInfo(prevS => ({
						...prevS,
						kickout: false,
						willLogout: false
					}));
				} else {
					const ClickClose = () => {
						setPopBox({ isOpen: false });
						setUserInfo(prevS => ({
							...prevS,
							kickout: false
						}));
					};
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.LogoutHint,
						content: t("msg_ForceLogedout"),
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-cancel"
									onClick={ClickClose}>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
				}
			} else if (afterLogin && !isLogin && isMountedRef.current) {
				setRedirectPath(`/${userInfo.langId}`);
			}
			if (isLogin !== userInfo.isLogin && isMountedRef.current) {
				setUserInfo(prevState => ({
					...prevState,
					isLogin
				}));
			}
		});
	}, [
		userInfo.isLogin,
		userInfo.kickout,
		userInfo.willLogout,
		setUserInfo,
		setRedirectPath,
		setPopBox
	]);

	useEffect(() => {
		if (userInfo.isLogin) {
			if (!userInfo.regTime) {
				api_accountStrict_GetCustProfile().then(res_custInfo => {
					if (
						res_custInfo.data.errorCode === 0 &&
						isMountedRef.current
					) {
						const { data } = res_custInfo.data;
						data.langId = GET_LANG_ID(data.langId);
						setCookie(langCookie, data.langId);
						setUserInfo(prevState => ({
							...prevState,
							...data
						}));
					}
				});
			}

			api_account_GetMsgCount().then(res => {
				if (res.data.errorCode === 0 && isMountedRef.current) {
					setMsgCount(res.data.data);
				}
			});
		} else if (isMountedRef.current) {
			if (userInfo.isLogin === false) {
				setUserInfo(prevState => ({
					...prevState,
					userName: t("lbl_Guest")
				}));
			}
			setMsgCount(0);
		}
	}, [userInfo.isLogin, userInfo.regTime]);

	useEffect(() => {
		if (userInfo.isLogin !== null) {
			if (typeof window !== `undefined`) {
				const pathLang = window.location.pathname.split("/")?.[1];
				const currentLang = userInfo.langId;

				if (!pathLang && currentLang !== defaultLang) {
					setRedirectPath(`/${currentLang}`);
				} else if (pathLang !== "" && pathLang !== currentLang) {
					setUserInfo(prevState => ({
						...prevState,
						langId: currentLang
					}));

					const newPathArr = getNewLanguagePath(currentLang);
					navigate(newPathArr);
				} else {
					setCorrectPath(true);
				}
			}
		}
	}, [currentPath, i18n.language, userInfo.langId, userInfo.isLogin]);

	useEffect(() => {
		const AffId = getUrlParameter("AffId");
		const RefId = getUrlParameter("RefId");
		const Aff = getUrlParameter("Aff");
		const AffCode = getUrlParameter("AffCode");

		if (AffId) {
			setCookie("AffId", AffId, 7);
			deleteCookie("RefId");
			deleteCookie("Aff");
			deleteCookie("AffCode");
		} else if (RefId) {
			setCookie("RefId", RefId, 7);
			deleteCookie("AffId");
			deleteCookie("Aff");
			deleteCookie("AffCode");
		} else if (Aff) {
			setCookie("Aff", Aff, 7);
			deleteCookie("AffId");
			deleteCookie("RefId");
			deleteCookie("AffCode");
		} else if (AffCode) {
			setCookie("AffCode", AffCode, 7);
			deleteCookie("AffId");
			deleteCookie("Aff");
			deleteCookie("RefId");
		}
	}, []);

	useInterval(
		() => {
			api_account_onlineCheck().then(res => {
				if (res.data.errorCode !== 0) {
					setUserInfo(prev => ({
						...prev,
						isLogin: false,
						langId: prev.langId,
						kickout: true
					}));
				}
			});
		},
		userInfo.isLogin ? 10000 : null
	);

	if (redirectPath === null) {
		if (
			(correctPath &&
				((afterLogin === true && userInfo.isLogin) || !afterLogin)) ||
			(afterLogin && userInfo.isLogin === false && userInfo.kickout)
		) {
			return (
				<ct.userInfoContext.Provider value={{ userInfo, setUserInfo }}>
					<ct.walletInfoContext.Provider
						value={{
							...walletInfo.state,
							dispatch: walletInfo.dispatch
						}}>
						<ct.msgCountContext.Provider
							value={{ msgCount, setMsgCount }}>
							<ct.popBoxContext.Provider
								value={{ popBox, setPopBox }}>
								<ct.loadingContext.Provider
									value={{ loading, setLoading }}>
									<ct.isRootContext.Provider
										value={{ isRoot, setIsRoot }}>
										{children}
									</ct.isRootContext.Provider>
								</ct.loadingContext.Provider>
							</ct.popBoxContext.Provider>
						</ct.msgCountContext.Provider>
					</ct.walletInfoContext.Provider>
				</ct.userInfoContext.Provider>
			);
		}
		return null;
	}
	return <Redirect to={redirectPath} noThrow />;
};
