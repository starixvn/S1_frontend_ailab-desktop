import React, { useState, useEffect, useRef } from "react";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import { getUrlParameter, setCookie, deleteCookie, readCookie } from "./common";
import { defaultLang } from "../../i18n/config";
import { IS_LOGGED_IN } from "../../service/auth";
import {
	api_site_GetTpMaintainList,
	api_site_GetTpIds
} from "../../service/api/site";
import { api_accountStrict_GetCustProfile } from "../../service/api/accountStrict";
import {
	api_account_GetMsgCount,
	api_account_onlineCheck
} from "../../service/api/account";
import { defPopBoxType } from "./popBox";
import useInterval from "../hook/useInterval";
import * as ct from "./context";
import {
	GET_LANG_ID,
	isVaildLang,
	getNewLanguagePath
} from "../../service/language";
import useGetWalletInfo from "./wrapper.walletInfo";
import { langCookie } from "../../config";
import usePopBox from "../hook/usePopBox";
import useDepositWithdrawTracker from "../hook/useDepositWithdrawTracker";
import SEO from "../seo";
import ThirdPartyJS from "./thirdPartyJS";

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
	const [isRoot, setIsRoot] = useState(false);
	const [productTpIds, setProductTpIds] = useState(null);
	const [allMaintainList, setAllMaintainList] = useState([]);
	const isMountedRef = useRef(null);

	const { errorPopBox } = usePopBox(setPopBox);
	const { checkDepositSuccessful } = useDepositWithdrawTracker();
	const walletInfo = useGetWalletInfo({
		langId: userInfo.langId,
		isLogin: userInfo.isLogin,
		errorPopBox
	});

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
					errorPopBox(
						res.data.message || "error",
						res.data.errorCode
					);
				}
			},
			() => {
				if (isMountedRef.current) {
					errorPopBox();
				}
			}
		);
	}, [userInfo.isLogin, userInfo.langId]);

	useEffect(() => {
		IS_LOGGED_IN().then(async isLogin => {
			/** 登入時確認使用者是否有存款成功，如果有成功，觸發 MetaPixelTracker 事件（ 臉書通知 ）通知市場 */
			await checkDepositSuccessful();

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
				api_accountStrict_GetCustProfile().then(
					res_custInfo => {
						if (
							res_custInfo.data.errorCode === 0 &&
							isMountedRef.current
						) {
							const { data } = res_custInfo.data;
							// data.langId = GET_LANG_ID(data.langId);
							setCookie(langCookie, data.langId);
							setUserInfo(prevState => ({
								...prevState,
								...data
							}));
							data.isResetPwd &&
								setPopBox({
									isOpen: true,
									popBoxType: defPopBoxType.ChangePsw
								});
						} else if (res_custInfo.data.errorCode !== 0) {
							errorPopBox(
								res_custInfo.data.message || "error",
								res_custInfo.data.errorCode
							);
						}
					},
					() => {
						if (isMountedRef.current) {
							errorPopBox();
						}
					}
				);
			}

			api_account_GetMsgCount().then(
				res => {
					if (res.data.errorCode === 0 && isMountedRef.current) {
						setMsgCount(res.data.data);
					} else if (res.data.errorCode !== 0) {
						errorPopBox(
							res.data.message || "error",
							res.data.errorCode
						);
					}
				},
				() => {
					if (isMountedRef.current) {
						errorPopBox();
					}
				}
			);
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
			api_site_GetTpIds().then(
				res => {
					if (res.data.errorCode === 0 && isMountedRef.current) {
						setProductTpIds(res.data.data);
					} else if (res.data.errorCode !== 0) {
						errorPopBox(
							res.data.message || "error",
							res.data.errorCode
						);
					}
				},
				() => {
					if (isMountedRef.current) {
						errorPopBox();
					}
				}
			);
		} else if (userInfo.isLogin === false && productTpIds?.length > 0) {
			setProductTpIds(null);
		}
	}, [userInfo.isLogin, productTpIds]);

	useInterval(
		async () => {
			// 每分鐘確認使用者是否有儲值成功的單號，如果有就通知市場（ 臉書通知 ）
			await checkDepositSuccessful();
			api_account_onlineCheck().then(res => {
				if (res.data.errorCode === 1001) {
					setUserInfo(prev => ({
						...prev,
						isLogin: false,
						langId: prev.langId,
						kickout: true
					}));
				}
			});
		},
		userInfo.isLogin ? 60000 : null
	);

	if (redirectPath === null) {
		if (
			(correctPath &&
				((afterLogin === true && userInfo.isLogin) || !afterLogin)) ||
			(afterLogin && userInfo.isLogin === false && userInfo.kickout)
		) {
			return (
				<ct.popUpMsgContext.Provider value={{ setPopUp, popUp }}>
					<ct.maintainListContext.Provider
						value={{ allMaintainList }}>
						<ct.productTpIdsContext.Provider
							value={{ productTpIds }}>
							<ct.userInfoContext.Provider
								value={{
									userInfo,
									setUserInfo
								}}>
								<ct.walletInfoContext.Provider
									value={{
										...walletInfo.state,
										dispatch: walletInfo.dispatch
									}}>
									<ct.msgCountContext.Provider
										value={{
											msgCount,
											setMsgCount
										}}>
										<ct.popBoxContext.Provider
											value={{
												popBox,
												setPopBox
											}}>
											<ct.loadingContext.Provider
												value={{
													loading,
													setLoading
												}}>
												<ct.isRootContext.Provider
													value={{
														isRoot,
														setIsRoot
													}}>
													<SEO />
													<ThirdPartyJS />

													{children}
												</ct.isRootContext.Provider>
											</ct.loadingContext.Provider>
										</ct.popBoxContext.Provider>
									</ct.msgCountContext.Provider>
								</ct.walletInfoContext.Provider>
							</ct.userInfoContext.Provider>
						</ct.productTpIdsContext.Provider>
					</ct.maintainListContext.Provider>
				</ct.popUpMsgContext.Provider>
			);
		}
		return null;
	}
	navigate(redirectPath);
	return [];
};
