import React, { useState, useEffect, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import {
	api_site_ExistsUserName,
	api_site_GetSiteCurrencyList,
	api_site_Signup,
	api_site_GetAffiliateAgent
} from "../../service/api/site";
import { api_accountStrict_GetCustProfile } from "../../service/api/accountStrict";
import {
	getUrlParameter,
	readCookie,
	passwordCheck,
	isDateRange
} from "../common/common";
import { defPopBoxType } from "../common/popBox";
import { userInfoContext, popBoxContext } from "../common/context";
import { GET_LANG_ID } from "../../service/language";
import config, { bannerImgUrl } from "../../config";
import TandC from "../../service/t_and_c";
import { initValue, initTip } from "./join.def";
import JoinForm from "./join.form";
import usePopBox from "../hook/usePopBox";
import { eventPeriodIdpd } from "../../datas/eventDef";
import path from "../../router";

export default () => {
	const { t } = useTranslation();
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox } = usePopBox();
	const [userValue, setUserValue] = useState(initValue);
	const [tip, setTip] = useState(initTip);
	const [showPsw, setShowPsw] = useState(false);
	const [siteCurrency, setSiteCurrency] = useState([]);
	const isMountedRef = useRef(null);
	const defaultLangId = userInfo.langId ?? GET_LANG_ID();
	const configSiteName = config.siteName;
	const tandCTerms = TandC(defaultLangId).terms;
	const tandCRule = TandC(defaultLangId).rule;
	const isInPeriodEvent = isDateRange(
		eventPeriodIdpd.startDate,
		eventPeriodIdpd.endDate
	);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		checkAffiliate();
	}, []);

	const checkAffiliate = async () => {
		const _AffId = getUrlParameter("AffId") || readCookie("AffId");
		if (!_AffId) {
			getCurrencyList();
		} else {
			await api_site_GetAffiliateAgent({ AffId: _AffId }).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							const { currencyId } = res.data.data;
							const currencyArr = [
								{
									id: currencyId,
									displayKey: `Currency_${currencyId}`
								}
							];
							setSiteCurrency(currencyArr);
							onSelectItem(0);
						} else {
							getCurrencyList();
						}
					}
				},
				() => {
					if (isMountedRef.current) {
						errorPopBox();
					}
				}
			);
		}
	};

	const getCurrencyList = () => {
		api_site_GetSiteCurrencyList().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						const { data } = res.data;
						const currencyArr = data.map(id => {
							return { id, displayKey: `Currency_${id}` };
						});
						setSiteCurrency(() => currencyArr);
					} else {
						errorPopBox(res.data.message || "error", errorCode);
					}
				}
			},
			() => {
				if (isMountedRef.current) {
					errorPopBox();
				}
			}
		);
	};

	const showPswHandler = () => {
		setShowPsw(!showPsw);
	};

	const clickInfo = col => {
		let msg = "";
		if (col === "username") {
			msg = t("lbl_UsernameTooltip");
		} else if (col === "password") {
			msg = t("lbl_PasswordTooltip");
		} else if (col === "affCode") {
			msg = t("lbl_Please_enter_Affiliate_ID");
		} else if (col === "specialBonusCode") {
			msg = t("lbl_PromoCode");
		} else if (tip[col].msg === msg) {
			msg = "";
		}

		setTip(prev => {
			return {
				...prev,
				[col]: {
					checked: tip[col].checked,
					msg
				}
			};
		});
	};

	const EditField = (col, e) => {
		let val = e.target.value;

		if (col === "username") {
			val = val.replace(/[\W]/g, "");
		}

		setUserValue(prev => ({
			...prev,
			[col]: val
		}));
	};

	const checkValue = (col, e) => {
		const val = e.target.value;
		let checked = true;
		let msg = "";

		if (col === "username") {
			const result = usernameCheck(val);
			checked = result.checked;
			msg = result.msg;
		} else if (col === "password") {
			const result = passwordCheck(val);
			checked = result.checked;
			msg = result.message;
		}

		setTip(prev => {
			return {
				...prev,
				[col]: {
					checked,
					msg: t(msg)
				}
			};
		});
	};

	const usernameCheck = val => {
		let checked = true;
		let msg = "";

		if (!val) {
			checked = false;
			msg = "msg_UsernameReq";
		} else if (val.length < 6 || val.length > 18) {
			checked = false;
			msg = "msg_UsernameLength";
		}

		if (checked) {
			api_site_ExistsUserName({
				UserName: val,
				langId: userInfo.langId
			}).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							if (res.data.data === true) {
								setTip(prev => {
									return {
										...prev,
										username: {
											checked: false,
											msg: res.data.message
										}
									};
								});
							} else {
								setTip(prev => {
									return {
										...prev,
										username: {
											checked: true,
											msg: ""
										}
									};
								});
							}
						} else {
							errorPopBox(
								res.data.message || "error",
								res.data.errorCode
							);
						}
					}
				},
				() => {
					if (isMountedRef.current) {
						errorPopBox();
					}
				}
			);
		}

		return { checked, msg };
	};

	const clickDropdown = () => {
		setTip(prev => {
			return {
				...prev,
				currency: {
					checked: true,
					msg: t("lbl_PreferredCurrencyToolTip")
				}
			};
		});
	};

	const onSelectItem = i => {
		setUserValue(prev => {
			return { ...prev, currency: i };
		});
	};

	const checkboxHandler = col => {
		setUserValue(prev => {
			return { ...prev, [col]: !userValue[col] };
		});
	};

	const clickCancel = () => {
		navigate(`/${userInfo.langId}`);
	};

	const checkAll = () => {
		const _usernameCheck = usernameCheck(userValue.username);
		const _passwordCheck = passwordCheck(userValue.password);
		const _termsCheck = userValue.termsCheck;
		const _ageCheck = userValue.ageCheck;

		const checked =
			_usernameCheck.checked &&
			_passwordCheck.checked &&
			_termsCheck &&
			_ageCheck;

		if (!checked) {
			let checkboxMsg = "";
			if (!_termsCheck || !_ageCheck) {
				checkboxMsg = "lbl_Check18TCTooltip";
			}
			setTip(prev => {
				return {
					...prev,
					username: {
						checked: _usernameCheck.checked,
						msg: t(_usernameCheck.msg)
					},
					password: {
						checked: _passwordCheck.checked,
						msg: t(_passwordCheck.message)
					},
					checkbox: {
						checked: true,
						msg: t(checkboxMsg)
					}
				};
			});
		}
		return checked;
	};

	const isUrlAffCode = getUrlParameter("AffCode") || readCookie("AffCode");

	const hasRefOrAffCode =
		getUrlParameter("AffId") ||
		readCookie("AffId") ||
		getUrlParameter("AffCode") ||
		readCookie("AffCode");

	const clickSubmit = async e => {
		e.preventDefault();
		const checked = checkAll();

		const _AffId = getUrlParameter("AffId") || readCookie("AffId");
		let affIdCheckPass = false;
		if (_AffId) {
			try {
				affIdCheckPass =
					(await api_site_GetAffiliateAgent({ AffId: _AffId })).data
						.errorCode === 0;
			} catch (error) {
				errorPopBox();
			}
		}

		if (checked && !userInfo.isLogin) {
			const regData = {
				UserName: userValue.username,
				Userpwd: userValue.password,
				CurrencyId: siteCurrency[userValue.currency].id,
				UserLang: defaultLangId,
				PromoCode: userValue.specialBonusCode
			};

			regData.RefId = getUrlParameter("RefId") || readCookie("RefId");
			regData.AffId = affIdCheckPass ? _AffId : null;
			regData.Aff = getUrlParameter("Aff") || readCookie("Aff");
			regData.AffCode = isUrlAffCode ?? userValue.affCode;

			api_site_Signup(regData, defaultLangId).then(
				res => {
					if (isMountedRef.current) {
						const { errorCode, message } = res.data;
						if (errorCode === 0) {
							api_accountStrict_GetCustProfile().then(
								async res_custInfo => {
									if (isMountedRef.current) {
										let _user = {
											isLogin: true,
											langId: defaultLangId,
											userName: userValue.username
										};
										if (res_custInfo.data.errorCode === 0) {
											_user = {
												isJoin: true,
												..._user,
												...res_custInfo.data.data
											};
											localStorage.setItem(
												`${_user.userName}-doNotRedirect`,
												"1"
											);
											await navigate(
												`/${userInfo.langId}/${path.deposit.root}`
											);
										} else {
											errorPopBox(
												res_custInfo.data.message ||
													"error",
												res_custInfo.data.errorCode
											);
										}
										setUserInfo(_user);
									}
								},
								() => {
									if (isMountedRef.current) {
										errorPopBox();
									}
								}
							);
						} else if (
							errorCode === -2 ||
							errorCode === -5 ||
							errorCode === -19
						) {
							setTip(prev => {
								return {
									...prev,
									username: {
										checked: false,
										msg: message
									}
								};
							});
						} else if (errorCode === -3) {
							setTip(prev => {
								return {
									...prev,
									password: {
										checked: false,
										msg: message
									}
								};
							});
						} else if (errorCode === -7) {
							setTip(prev => {
								return {
									...prev,
									specialBonusCode: {
										checked: false,
										msg: message
									}
								};
							});
						} else {
							errorPopBox(message || "error", errorCode);
						}
					}
				},
				() => {
					if (isMountedRef.current) {
						errorPopBox();
					}
				}
			);
		}
	};

	const openLogin = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Login
		});
	};

	return (
		<div className="joinloginModule">
			<img
				src={
					isInPeriodEvent
						? `${bannerImgUrl}/desktop/img/joinBanner_event.jpg`
						: `${bannerImgUrl}/desktop/img/joinBanner.jpg`
				}
				alt="joinBanner"
			/>
			<JoinForm
				t={t}
				openLogin={openLogin}
				userValue={userValue}
				tip={tip}
				clickInfo={clickInfo}
				EditField={EditField}
				checkValue={checkValue}
				showPsw={showPsw}
				showPswHandler={showPswHandler}
				siteCurrency={siteCurrency}
				hasRefOrAffCode={hasRefOrAffCode}
				onSelectItem={onSelectItem}
				clickDropdown={clickDropdown}
				checkboxHandler={checkboxHandler}
				configSiteName={configSiteName}
				tandCTerms={tandCTerms}
				tandCRule={tandCRule}
				clickCancel={clickCancel}
				clickSubmit={clickSubmit}
			/>
		</div>
	);
};
