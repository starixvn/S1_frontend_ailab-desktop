import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "@reach/router";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import * as ct from "./context";
import {
	getUrlParameter,
	setCookie,
	deleteCookie,
	readCookie,
	setLocalStorage,
	memberType
} from "./common";
import {
	api_site_CheckSignIn,
	api_site_GetTpMaintainList,
	api_site_GetTpIds,
	api_site_GetIpCountry
} from "../../service/api/site";
import { api_accountStrict_GetCustProfile } from "../../service/api/accountStrict";
import {
	api_account_GetCustTpGameTypeSetting,
	api_account_GetMsgCount,
	api_account_onlineCheck
} from "../../service/api/account";
import defPopBoxType from "./defPopBoxType";
import useInterval from "../hook/useInterval";
import { isVaildLang, siteDefLangId } from "../../service/language";
import { SiteInfo } from "../../config";
import useGetWalletInfo from "./wrapper.walletInfo";
// import SEO, { useGetSEODatas } from "../seo/seo";
import ThirdPartyJS from "./thirdPartyJS";
import usePopBox from "../hook/usePopBox";
import { api_lineLogin_LineCallback } from "../../service/api/lineLogin";
import path from "../../router";
import { defType } from "../hook/useHandleLineLogin";
import { defLangByIp, currencyCode } from "../../datas/countryCode";
import { defLangGroups } from "../header/header.langDropdown";

const flatLangList = Object.values(defLangGroups).flatMap(item => item);

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
		defaultLang: "en",
		langId: null, // * 初始不給，有值才渲染內容
		currencyId: null
	});

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

	const pathLang =
		typeof window !== `undefined` &&
		window.location.pathname.split("/")?.[1];

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

	// * checkSignIn
	useEffect(() => {
		api_site_CheckSignIn().then(({ data: { errorCode } = {} }) => {
			const isLogin = errorCode === 0;

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

	// * 登入後，取得必要資訊
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
								currencyId: data.currencyId,
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

	// * 登入前 => 設定登入前的默認語系與幣別
	useEffect(() => {
		const getDefaultCurrencyId = async () => {
			const getCurrencyIdByUserIp = async () => {
				let currencyIdByUserIp;
				try {
					const {
						data: {
							data: { code }
						}
					} = await api_site_GetIpCountry();

					currencyIdByUserIp = currencyCode[code];

					return currencyIdByUserIp;
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error(error);
				}

				return currencyIdByUserIp;
			};

			// * cookie 幣別
			const currencyIdByCookie = readCookie(SiteInfo.currencyCookie);

			// * 使用者當前 ip 幣別
			const currencyIdByUserIp = await getCurrencyIdByUserIp();

			// * 默認幣別
			const defaultCurrencyId = currencyCode.USD;

			const currencyId =
				currencyIdByCookie || currencyIdByUserIp || defaultCurrencyId;

			return Number(currencyId);
		};

		const initCurrencyIdAndLanguage = async () => {
			// * 取得默認幣別
			const defaultCurrencyId = await getDefaultCurrencyId();

			// * 透過幣別取得默認語系
			const defaultLangId = String(
				defLangByIp[defaultCurrencyId]
			).toLowerCase();

			let langIdByPath;
			let currencyIdByPath;

			if (pathLang && pathLang !== "en") {
				const result = flatLangList.find(
					({ value }) => value === pathLang
				);

				langIdByPath = result?.value;
				currencyIdByPath = result?.currencyId;
			}

			// 需另外判斷 en 是否存在於當前選擇的幣別語系中，若存在則寫入 en , 確保 langId 寫入正確
			if (pathLang && pathLang === "en") {
				const isInclude = !!flatLangList
					.filter(
						({ currencyId }) => currencyId === defaultCurrencyId
					)
					.find(({ value }) => value === pathLang);

				if (isInclude) {
					langIdByPath = pathLang;
				}
			}

			setUserInfo(prev => ({
				...prev,
				langId: langIdByPath || defaultLangId,
				currencyId: currencyIdByPath || defaultCurrencyId
			}));
		};

		// * null 不能進來，所以不使用 falsey
		if (userInfo.isLogin === false) {
			initCurrencyIdAndLanguage();
		}
	}, [userInfo.isLogin]);

	// * 補語系 url
	useEffect(() => {
		if (userInfo.langId && !pathLang) {
			navigate(`/${userInfo.langId}`);
		} else if (
			// * 利用 userInfo.accountName 判斷是否已拿到登入資訊
			userInfo.accountName
		) {
			const isNotSupportLangId = flatLangList.some(
				item =>
					item.currencyId === userInfo.currencyId &&
					item.value === pathLang
			);

			// * 如果是不支援的語系，導航回首頁
			if (!isNotSupportLangId) {
				navigate(`/${userInfo.langId}`);
			}
		}
	}, [pathLang, userInfo.langId, userInfo.isLogin, userInfo.accountName]);

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

	// * checkSign 後，`登出狀態` 及 `登入後並拿到資訊` 才渲染畫面
	const correctPath = !!pathLang && userInfo.langId;

	if (!correctPath) return null;

	return (
		<ct.popUpMsgContext.Provider value={{ setPopUp, popUp }}>
			<ct.maintainListContext.Provider value={{ allMaintainList }}>
				<ct.productTpIdsContext.Provider value={{ productTpIds }}>
					<ct.productTpGameTypeSettingListContext.Provider
						value={{ tpGameTypeSettingList }}>
						<ct.userInfoContext.Provider
							value={{
								userInfo: {
									...userInfo,
									currencyName: t(
										`Currency_${userInfo.currencyId}`
									)
								},
								setUserInfo
							}}>
							{/* currencyName: t(`Label_General_Currency_${originUserInfo.currencyId}`), */}
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
	);
};
