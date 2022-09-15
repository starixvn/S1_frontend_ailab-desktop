import React, { useState, useEffect, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import {
	api_site_ExistsUserName,
	api_site_GetSiteCurrencyList,
	api_site_Signup,
	api_site_ExistsPhoneNo,
	api_site_GetAffiliateAgent
} from "../../service/api/site";
import { api_accountStrict_GetCustProfile } from "../../service/api/accountStrict";
import { getUrlParameter, readCookie, passwordCheck } from "../common/common";
import { defPopBoxType } from "../common/defPopBoxType";
import { userInfoContext, popBoxContext } from "../common/context";
import { GET_LANG_ID } from "../../service/language";
import config, { bannerImgUrl } from "../../config";
import TandC from "../../service/t_and_c";
import areaCode from "../../datas/areaCode";
import { initValue, initTip, currencyToAreacode } from "./join.def";
import JoinForm from "./join.form";
import usePopBox from "../hook/usePopBox";
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
	const [reCaptchaToken, setReCaptchaToken] = useState("");
	const defaultLangId = userInfo.langId ?? GET_LANG_ID();
	const isMountedRef = useRef(null);
	const configSiteName = config.siteName;
	const tandCTerms = TandC(defaultLangId).terms;
	const tandCRule = TandC(defaultLangId).rule;

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		checkAffiliate();
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
						const currencyArr = data.map(id => ({
							id,
							displayKey: `Currency_${id}`
						}));
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
		} else if (col === "phone") {
			msg = t("lbl_PhoneTooltip");
		} else if (col === "affCode") {
			msg = t("lbl_Please_enter_Affiliate_ID");
		} else if (col === "specialBonusCode") {
			msg = t("lbl_PromoCode");
		}

		if (tip[col].msg === msg) {
			msg = "";
		}

		setTip(prev => ({
			...prev,
			[col]: {
				checked: tip[col].checked,
				msg
			}
		}));
	};

	const EditField = (col, e) => {
		let val = e.target.value;

		if (col === "username") {
			val = val.replace(/[\W]/g, "");
		}
		if (col === "phone") {
			val = val.replace(/[^0-9]+/g, "");
		}
		setUserValue(prev => ({
			...prev,
			[col]: val
		}));
	};

	const checkValue = async (col, e) => {
		const val = e.target.value;
		let checked = true;
		let msg = "";

		if (col === "username") {
			const result = await usernameCheck(val);
			checked = result.checked;
			msg = result.msg;
		} else if (col === "password") {
			const result = passwordCheck(val);
			checked = result.checked;
			msg = result.message;
		} else if (col === "phone") {
			const result = await phoneCheck(val);
			checked = result.checked;
			msg = result.msg;
		} else if (col === "specialBonusCode") {
			checked = null;
		}

		setTip(prev => ({
			...prev,
			[col]: {
				checked,
				msg: t(msg)
			}
		}));
	};

	const usernameCheck = async val => {
		let checked = true;
		let msg = "";

		if (val === "") {
			checked = false;
			msg = "msg_UsernameReq";
		} else if ((val !== "" && val.length < 6) || val.length > 18) {
			checked = false;
			msg = "msg_UsernameLength";
		}

		if (checked) {
			const res = await api_site_ExistsUserName({
				UserName: val,
				langId: userInfo.langId
			});
			if (isMountedRef.current) {
				if (res.data.errorCode === 0) {
					if (res.data.data === true) {
						checked = false;
						msg = "msg_UsernameNotAvailable";
					}
				} else {
					errorPopBox(
						res.data.message || "error",
						res.data.errorCode
					);
				}
			}
		}

		return { checked, msg };
	};

	const _currencyId = siteCurrency[userValue.currency]?.id;

	const currencyToCountryCode = _currencyId
		? currencyToAreacode[_currencyId]
		: null;

	const _areaCode =
		currencyToCountryCode !== null
			? areaCode[currencyToCountryCode]?.AreaCode
			: null;

	const phoneCheck = async val => {
		let checked = true;
		let msg = "lbl_CantChangePhone";

		if (val === "") {
			checked = false;
			msg = "lbl_PhoneRequired";
		} else if (val.length > 0 && val.length < 9) {
			checked = false;
			msg = "lbl_CantChangePhone";
		}

		if (checked) {
			const res = await api_site_ExistsPhoneNo({
				AreaCode: _areaCode,
				Phone: val
			});
			if (isMountedRef.current) {
				if (res.data.errorCode === 0) {
					if (!res.data.data === false) {
						checked = false;
						msg = "msg_PhoneExisted";
					}
				} else {
					errorPopBox(
						res.data.message || "error",
						res.data.errorCode
					);
				}
			}
		}
		return { checked, msg };
	};

	const onSelectItem = i => {
		setUserValue(prev => ({ ...prev, currency: i }));
	};

	const checkboxHandler = col => {
		setUserValue(prev => ({ ...prev, [col]: !userValue[col] }));
	};

	const clickCancel = () => {
		navigate(`/${userInfo.langId}`);
	};

	const checkAll = async () => {
		const res = await Promise.all([
			usernameCheck(userValue.username),
			phoneCheck(userValue.phone)
		]);

		const _usernameCheck = res[0];
		const _passwordCheck = passwordCheck(userValue.password);
		const _phoneCheck = res[1];
		// let _emailCheck = emailCheck(userValue.email);
		const _agreeCheck = userValue.agreeCheck;
		const _reCaptchaCheck = reCaptchaToken !== "";

		const checked =
			_usernameCheck.checked &&
			_passwordCheck.checked &&
			_phoneCheck.checked &&
			_agreeCheck &&
			_reCaptchaCheck;

		if (!checked) {
			let checkboxMsg = "";
			if (!_agreeCheck) {
				checkboxMsg = "lbl_Check18TCTooltip";
			}
			setTip(prev => ({
				...prev,
				username: {
					checked: _usernameCheck.checked,
					msg: t(_usernameCheck.msg)
				},
				password: {
					checked: _passwordCheck.checked,
					msg: t(_passwordCheck.message)
				},
				phone: {
					checked: _phoneCheck.checked,
					msg: t(_phoneCheck.msg)
				},
				checkbox: {
					checked: true,
					msg: t(checkboxMsg)
				}
			}));
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
		const checked = await checkAll();

		const _AffId = getUrlParameter("AffId") || readCookie("AffId");
		let affIdCheckPass = false;
		if (_AffId) {
			try {
				affIdCheckPass =
					(await api_site_GetAffiliateAgent({ AffId: _AffId })).data
						.errorCode === 0;
			} catch (error) {}
		}

		if (checked && !userInfo.isLogin) {
			const regData = {
				UserName: userValue.username,
				Userpwd: userValue.password,
				CurrencyId: siteCurrency[userValue.currency].id,
				PhoneNo: userValue.phone,
				UserLang: defaultLangId,
				PromoCode: userValue.specialBonusCode,
				AreaCode: _areaCode,
				ReferralUrl: document.referrer,
				ReCaptchaToken: reCaptchaToken
			};

			regData.RefId = getUrlParameter("RefId") || readCookie("RefId");
			regData.AffId = affIdCheckPass ? _AffId : null;
			regData.Aff = getUrlParameter("Aff") || readCookie("Aff");
			regData.AffCode = isUrlAffCode ?? userValue.affCode;

			api_site_Signup(regData, defaultLangId).then(
				res => {
					if (isMountedRef.current) {
						const { errorCode } = res.data;
						const { message } = res.data;
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
							setTip(prev => ({
								...prev,
								username: {
									checked: false,
									msg: message
								}
							}));
						} else if (errorCode === -3) {
							setTip(prev => ({
								...prev,
								password: {
									checked: false,
									msg: message
								}
							}));
						} else if (errorCode === -7) {
							setTip(prev => ({
								...prev,
								specialBonusCode: {
									checked: false,
									msg: message
								}
							}));
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

	const handleReCaptchaChange = token => {
		setReCaptchaToken(token);
	};

	return (
		<div className="joinus">
			<img
				src={`${bannerImgUrl}/desktop/img/joinBanner-new.jpg`}
				alt="joinBanner"
			/>
			<div className="joinloginModule">
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
					_areaCode={_areaCode}
					hasRefOrAffCode={hasRefOrAffCode}
					checkboxHandler={checkboxHandler}
					configSiteName={configSiteName}
					tandCTerms={tandCTerms}
					tandCRule={tandCRule}
					clickCancel={clickCancel}
					clickSubmit={clickSubmit}
					langId={userInfo.langId}
					reCaptchaOnChange={handleReCaptchaChange}
				/>
			</div>
		</div>
	);
};
