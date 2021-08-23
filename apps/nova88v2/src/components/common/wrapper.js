import React, { useState, useEffect, useRef } from "react";
import { Redirect, navigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import path from "../../router";
import * as ct from "./context";
import { defaultLang } from "../../i18n/config";
import { getUrlParameter, setCookie, deleteCookie, readCookie } from "./common";
import {
	api_site_CheckSignIn,
	api_site_GetTpMaintainList,
	api_site_GetTpIds
} from "../../service/api/site";
import { api_accountStrict_GetCustProfile } from "../../service/api/accountStrict";
import {
	api_account_GetMsgCount,
	api_account_onlineCheck
} from "../../service/api/account";
import defPopBoxType from "./defPopBoxType";
import useInterval from "../hook/useInterval";
import {
	GET_LANG_ID,
	isVaildLang,
	getNewLanguagePath
} from "../../service/language";
import { SiteInfo } from "../../config";
import useGetWalletInfo from "./wrapper.walletInfo";
import SEO from "../seo/seo";

const defaultPathLang = () => {
	const urlLang =
		typeof document === `undefined`
			? ""
			: window.location.pathname.split("/")?.[1];
	const cookieLang = readCookie(SiteInfo.langCookie);
	const _defaultLang = GET_LANG_ID();

	let result = _defaultLang;
	if (isVaildLang(urlLang)) {
		result = urlLang;
	} else if (isVaildLang(cookieLang)) {
		result = cookieLang;
	}
	return result;
};

export default ({ children, afterLogin = false, onlyBeforeLogin = false }) => {
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
	const walletInfo = useGetWalletInfo({ isLogin: userInfo.isLogin });
	const [isRoot, setIsRoot] = useState(false);
	const [productTpIds, setProductTpIds] = useState(null);
	const [allMaintainList, setAllMaintainList] = useState([]);

	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		api_site_GetTpMaintainList().then(res => {
			if (!isMountedRef.current) return;
			if (res.data.errorCode === 0) {
				setAllMaintainList(
					res.data.data
						?.filter(
							(elem, idx, self) =>
								self.findIndex(
									tpItem =>
										tpItem.tpId === elem.tpId &&
										tpItem.tpCategoryId ===
											elem.tpCategoryId
								) === idx
						)
						?.map(elem => ({
							tpId: elem.tpId,
							tpCategoryId: elem.tpCategoryId
						})) ?? []
				);
			}
		});
	}, [userInfo.isLogin, userInfo.langId]);

	useEffect(() => {
		api_site_CheckSignIn()
			.then(
				res => res.data.errorCode === 0,
				() => setCorrectPath(true)
			)
			.then(isLogin => {
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
										className="btn-check"
										onClick={ClickClose}>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
					}
				} else if (
					isMountedRef.current &&
					((afterLogin && !isLogin) || (isLogin && onlyBeforeLogin))
				) {
					if (
						localStorage.getItem(
							`${userInfo.userName}-doNotRedirect`
						) === "1"
					) {
						localStorage.removeItem(
							`${userInfo.userName}-doNotRedirect`
						);
					} else {
						setRedirectPath(`/${userInfo.langId}`);
					}
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
						setCookie(SiteInfo.langCookie, data.langId);
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
				const currentLang = isVaildLang(userInfo.langId)
					? userInfo.langId
					: GET_LANG_ID();

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

	useEffect(() => {
		if (userInfo.isLogin && productTpIds === null) {
			api_site_GetTpIds().then(res => {
				if (res.data.errorCode === 0 && isMountedRef.current) {
					setProductTpIds(res.data.data);
				}
			});
		} else if (userInfo.isLogin === false && productTpIds?.length > 0) {
			setProductTpIds(null);
		}
	}, [userInfo.isLogin, productTpIds]);

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
		const content = correctPath ? (
			<ct.maintainListContext.Provider value={{ allMaintainList }}>
				<ct.productTpIdsContext.Provider value={{ productTpIds }}>
					<ct.userInfoContext.Provider
						value={{ userInfo, setUserInfo }}>
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
											<SEO lang={userInfo.langId} />
											{children}
										</ct.isRootContext.Provider>
									</ct.loadingContext.Provider>
								</ct.popBoxContext.Provider>
							</ct.msgCountContext.Provider>
						</ct.walletInfoContext.Provider>
					</ct.userInfoContext.Provider>
				</ct.productTpIdsContext.Provider>
			</ct.maintainListContext.Provider>
		) : (
			<SEO lang={userInfo.langId} />
		);

		return content;
	}
	return <Redirect to={redirectPath} noThrow />;
};
