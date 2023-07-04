import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "@reach/router";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import * as ct from "./context";
import { defaultLang } from "../../i18n/config";
import {
	getUrlParameter,
	setCookie,
	deleteCookie,
	readCookie,
	defCurrencyList,
	setLocalStorage,
	langAndCurrMapping,
	memberType
} from "./common";
import {
	api_site_CheckSignIn,
	api_site_GetTpMaintainList,
	api_site_GetTpIds
} from "../../service/api/site";
import { api_accountStrict_GetCustProfile } from "../../service/api/accountStrict";
import {
	api_account_GetCustTpGameTypeSetting,
	api_account_GetMsgCount,
	api_account_onlineCheck
} from "../../service/api/account";
import defPopBoxType from "./defPopBoxType";
import useInterval from "../hook/useInterval";
import {
	GET_LANG_ID,
	isVaildLang,
	getNewLanguagePath,
	siteDefLangId
} from "../../service/language";
import { SiteInfo } from "../../config";
import useGetWalletInfo from "./wrapper.walletInfo";
// import SEO, { useGetSEODatas } from "../seo/seo";
import ThirdPartyJS from "./thirdPartyJS";
import usePopBox from "../hook/usePopBox";
import { api_lineLogin_LineCallback } from "../../service/api/lineLogin";
import path from "../../router";
import { defType } from "../hook/useHandleLineLogin";

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

const getDefaultCurrencyId = () => {
	let result = defCurrencyList.MYR;

	const langId = defaultPathLang();
	if (langId !== "en" && langId !== "cs") {
		result = langAndCurrMapping[langId];
	}

	const cookieCurrencyId = readCookie(SiteInfo.currencyCookie);
	if (cookieCurrencyId) {
		result = Number(cookieCurrencyId);
	}
	return result;
};

export default ({ children, afterLogin = false, onlyBeforeLogin = false }) => {
	const { t, i18n } = useTranslation();
	const location = useLocation();
	const [popBox, setPopBox] = useState({
		isOpen: false,
		popBoxType: null
	});
	const [loading, setLoading] = useState(false);
	const [msgCount, setMsgCount] = useState(0);
	const [userInfo, setUserInfo] = useState({
		isLogin: null,
		userName: null,
		langId: defaultPathLang(),
		currencyId: getDefaultCurrencyId()
	});

	const [currentPath] = useState(
		typeof window !== `undefined` ? window.location.pathname : null
	);
	const [correctPath, setCorrectPath] = useState(false);
	const [redirectPath, setRedirectPath] = useState(null);

	const { errorPopBox } = usePopBox(setPopBox);
	const walletInfo = useGetWalletInfo({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId,
		errorPopBox
	});

	const [isRoot, setIsRoot] = useState(false);
	const [productTpIds, setProductTpIds] = useState(null);
	const [tpGameTypeSettingList, setTpGameTypeSettingList] = useState([]);
	const [allMaintainList, setAllMaintainList] = useState([]);

	const isMountedRef = useRef(null);

	// const { SEODatas } = useGetSEODatas({ getFromAPI: true });

	const [popUp, setPopUp] = useState({
		popupMessage: "",
		id: "",
		pageNumber: ""
	});

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	// * 如果帳號是直播主，只允許進入 首頁 及 slots 頁面
	useEffect(() => {
		if (userInfo.memberType) {
			const LiveStreamingMemberType = 3;
			const isHome =
				location.pathname === `/${userInfo.langId}` ||
				location.pathname === "/";

			if (
				userInfo.memberType === LiveStreamingMemberType &&
				!isHome &&
				!location.pathname.includes(path.casino.root)
			) {
				navigate(`/${userInfo.langId}`);
			}
		}
	}, [location.pathname, userInfo.memberType]);

	useEffect(() => {
		api_site_GetTpMaintainList().then(
			res => {
				if (!isMountedRef.current) return;
				if (res.data.errorCode === 0) {
					setAllMaintainList(
						res.data.data
							?.filter(
								(elem, idx, self) =>
									self.findIndex(
										tpItem =>
											tpItem.tpId === elem.tpId &&
											tpItem.tpGameType ===
												elem.tpGameType
									) === idx
							)
							?.map(elem => ({
								tpId: elem.tpId,
								tpGameType: elem.tpGameType
							})) ?? []
					);
				} else {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.ErrorMsg,
						message: `[${res.data.errorCode}] ${res.data.message}`,
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-check"
									onClick={() => {
										setPopBox({ isOpen: false });
									}}>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
				}
			},
			() => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.ErrorMsg,
						message: t("msg_ApiServerError"),
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-check"
									onClick={() => {
										setPopBox({ isOpen: false });
									}}>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
					setLoading(false);
				}
			}
		);
	}, [userInfo.isLogin, userInfo.langId]);

	useEffect(() => {
		const code = getUrlParameter("code");
		const state = getUrlParameter("state");
		const error = getUrlParameter("error");
		const description = getUrlParameter("description");
		const errormessage = getUrlParameter("errormessage");

		let url;
		let platform;
		let userAgent;
		let screen;
		let di = "";
		if (typeof window !== "undefined") {
			url = window.location.origin;
			platform = navigator.platform;
			userAgent = navigator.userAgent;
			screen = `${window.screen.width}:${window.screen.height}:${window.screen.colorDepth}`;
			di = document.getElementById("__di")?.value;
		}

		if (code || state || error) {
			api_lineLogin_LineCallback({
				langId: userInfo.langId,
				lineLoginResponse: {
					code,
					state,
					error,
					description,
					errormessage
				},
				loginData: {
					isPersistent: true,
					url,
					platform,
					userAgent,
					screen,
					di
				}
			}).then(res => {
				const { errorCode, message, data } = res.data;
				if (errorCode === 0) {
					if (data.type === defType.register) {
						setLocalStorage("lineUser", data.userId);
						navigate(`/${userInfo.langId}/${path.join.root}`);
					} else if (data.type === defType.login) {
						navigate(`/${userInfo.langId}/${path.deposit.root}`);
					} else if (data.type === defType.binding) {
						navigate(`/${userInfo.langId}/${path.profile.root}`);
					}
				} else {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.ErrorMsg,
						message: `[${errorCode}] ${message}`,
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-check"
									onClick={() => {
										setPopBox({ isOpen: false });
									}}>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
				}
			});
		}
	}, []);

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
						navigate(`/${userInfo.langId}`);
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
		setPopBox
	]);

	useEffect(() => {
		if (userInfo.isLogin) {
			if (!userInfo.regTime) {
				api_accountStrict_GetCustProfile().then(
					res_custInfo => {
						if (
							res_custInfo.data.errorCode === 0 &&
							isMountedRef.current
						) {
							const { data } = res_custInfo.data;
							setCookie(SiteInfo.langCookie, data.langId);
							setUserInfo(prevState => ({
								...prevState,
								...data,
								langId: isVaildLang(data.langId)
									? data.langId
									: siteDefLangId
							}));
							data.isResetPwd &&
								setPopBox({
									isOpen: true,
									popBoxType: defPopBoxType.ChangePsw
								});

							if (data.memberType === memberType.liveHost)
								api_account_GetCustTpGameTypeSetting().then(
									res => {
										setTpGameTypeSettingList(res.data.data);
									},
									() => {
										if (isMountedRef.current) {
											setPopBox({
												isOpen: true,
												popBoxType:
													defPopBoxType.ErrorMsg,
												message:
													t("msg_ApiServerError"),
												btnBar: (
													<div className="btnGroup">
														<button
															className="btn-check"
															onClick={() => {
																setPopBox({
																	isOpen: false
																});
															}}>
															{t("lbl_Close")}
														</button>
													</div>
												)
											});
										}
									}
								);
						} else if (res_custInfo.data.errorCode !== 0) {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.ErrorMsg,
								message: `[${res_custInfo.data.errorCode}] ${res_custInfo.data.message}`,
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-check"
											onClick={() => {
												setPopBox({ isOpen: false });
											}}>
											{t("lbl_Close")}
										</button>
									</div>
								)
							});
						}
					},
					() => {
						if (isMountedRef.current) {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.ErrorMsg,
								message: t("msg_ApiServerError"),
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-check"
											onClick={() => {
												setPopBox({ isOpen: false });
											}}>
											{t("lbl_Close")}
										</button>
									</div>
								)
							});
						}
					}
				);
			}

			if (
				userInfo.memberType &&
				userInfo.memberType === memberType.liveHost
			) {
				api_account_GetCustTpGameTypeSetting().then(
					res => {
						setTpGameTypeSettingList(res.data.data);
					},
					() => {
						if (isMountedRef.current) {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.ErrorMsg,
								message: t("msg_ApiServerError"),
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-check"
											onClick={() => {
												setPopBox({
													isOpen: false
												});
											}}>
											{t("lbl_Close")}
										</button>
									</div>
								)
							});
						}
					}
				);
			}

			api_account_GetMsgCount().then(
				res => {
					if (res.data.errorCode === 0 && isMountedRef.current) {
						setMsgCount(res.data.data);
					} else if (res.data.errorCode !== 0) {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: `[${res.data.errorCode}] ${res.data.message}`,
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-check"
										onClick={() => {
											setPopBox({ isOpen: false });
										}}>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
					}
				},
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: t("msg_ApiServerError"),
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-check"
										onClick={() => {
											setPopBox({ isOpen: false });
										}}>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
						setLoading(false);
					}
				}
			);
		} else if (isMountedRef.current) {
			// if (SEODatas) {
			setUserInfo(prevState => {
				const res = { ...prevState };
				if (!prevState.isLogin) {
					res.userName = t("lbl_Guest");
				}

				return {
					...res,
					defaultLang: "en"
				};
			});
			// }

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
					navigate(`/${currentLang}`);
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
			api_site_GetTpIds().then(
				res => {
					if (res.data.errorCode === 0 && isMountedRef.current) {
						setProductTpIds(res.data.data);
					} else if (res.data.errorCode !== 0) {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: `[${res.data.errorCode}] ${res.data.message}`,
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-check"
										onClick={() => {
											setPopBox({ isOpen: false });
										}}>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
					}
				},
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: t("msg_ApiServerError"),
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-check"
										onClick={() => {
											setPopBox({ isOpen: false });
										}}>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
					}
				}
			);
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

	const content = correctPath ? (
		<ct.popUpMsgContext.Provider value={{ setPopUp, popUp }}>
			<ct.maintainListContext.Provider value={{ allMaintainList }}>
				<ct.productTpIdsContext.Provider value={{ productTpIds }}>
					<ct.productTpGameTypeSettingListContext.Provider
						value={{ tpGameTypeSettingList }}>
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
												value={{
													isRoot,
													setIsRoot
												}}>
												<ThirdPartyJS />

												{children}
											</ct.isRootContext.Provider>
										</ct.loadingContext.Provider>
									</ct.popBoxContext.Provider>
								</ct.msgCountContext.Provider>
							</ct.walletInfoContext.Provider>
						</ct.userInfoContext.Provider>
					</ct.productTpGameTypeSettingListContext.Provider>
				</ct.productTpIdsContext.Provider>
			</ct.maintainListContext.Provider>
		</ct.popUpMsgContext.Provider>
	) : (
		<ThirdPartyJS />
	);

	return content;
};
