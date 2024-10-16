import { useGetRecaptchaInfoQuery } from "@ailab-desktop/service";
import React, { useState, useEffect, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { MetaPixelTracker } from "@ailab-desktop/common";
import {
	api_site_ExistsUserName,
	api_site_GetSiteCurrencyList,
	api_site_Signup,
	api_site_GetAffiliateAgent,
	api_site_ExistsEmail,
	api_site_AffiliateCheck
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
import {
	initValue,
	initTip,
	initShowPwdState,
	currencyToAreacode
} from "./join.def";
import JoinForm from "./join.form";
import usePopBox from "../hook/usePopBox";
import { eventPeriodIdpd } from "../../datas/eventDef";
import useShieldCheck from "../hook/useShieldCheck";
import areaCode from "../../datas/areaCode";

export default () => {
	const { t } = useTranslation();
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox } = usePopBox();
	const [userValue, setUserValue] = useState(initValue);
	const [tip, setTip] = useState(initTip);
	const [showPwdState, setShowPwdState] = useState(initShowPwdState);
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
	const { getShieldData, saveShieldData } = useShieldCheck();
	const { data: { data: recaptchaInfoData } = {} } =
		useGetRecaptchaInfoQuery();

	const urlAffId = getUrlParameter("AffId") || readCookie("AffId");
	const urlAffCode = getUrlParameter("AffCode") || readCookie("AffCode");
	const urlAffiliate = urlAffId || urlAffCode;

	const { executeRecaptcha } = useGoogleReCaptcha();

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		getShieldData();
		if (urlAffiliate) {
			checkAffiliate({});
		} else {
			getCurrencyList();
		}
	}, []);

	const checkAffiliate = async ({ formAffCode }) => {
		let checked = null;
		let msg = "";

		// * 預先撈取 default currencies
		await getCurrencyList();

		if (urlAffId) {
			const res = await api_site_GetAffiliateAgent({ AffId: urlAffId });
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
					setUserValue(prev => ({
						...prev,
						affiliate: urlAffId
					}));
				}
			}
		} else if (urlAffCode) {
			const res = await api_site_AffiliateCheck({
				AffCode: urlAffCode,
				langId: userInfo.langId
			});
			if (isMountedRef.current) {
				if (res.data.errorCode === 0) {
					setUserValue(prev => ({
						...prev,
						affiliate: urlAffCode
					}));
				}
			}
		} else if (formAffCode) {
			const res = await api_site_AffiliateCheck({
				AffCode: formAffCode,
				langId: userInfo.langId
			});
			if (isMountedRef.current) {
				if (res.data.errorCode === 0) {
					checked = true;
					msg = "";
				} else {
					checked = false;
					msg = "lbl_AffiliateIdWrong";
				}
			}
		}

		return { checked, msg };
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

	const showPwdHandler = col => {
		setShowPwdState(prev => ({ ...prev, [col]: !prev[col] }));
	};

	const clickInfo = col => {
		let msg = "";
		if (col === "username") {
			msg = t("lbl_UsernameTooltip");
		} else if (col === "realName") {
			msg = t("lbl_RemindForName");
		} else if (col === "phone") {
			msg = t("lbl_PhoneTooltip");
		} else if (col === "email") {
			msg = t("lbl_EmailToolTip");
		} else if (col === "affCode") {
			msg = t("lbl_Please_enter_Affiliate_ID");
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
			val = val.replace(/[\W_]/g, "");
		} else if (col === "realName") {
			val = val.replace(/[\d\-!@#$%^&_()+";~～<>=|?\[\]\\`~{}]+/gu, "");
		} else if (col === "phone") {
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
		} else if (col === "realName") {
			const result = realNameCheck(val);
			checked = result.checked;
			msg = result.msg;
		} else if (col === "password") {
			const result = passwordCheck(val);
			checked = result.checked;
			msg = result.message;
		} else if (col === "confirmPwd") {
			const result = confirmPwdCheck(val);
			checked = result.checked;
			msg = result.msg;
		} else if (col === "phone") {
			const result = phoneCheck(val);
			checked = result.checked;
			msg = result.msg;
		} else if (col === "email") {
			const result = await emailCheck(val);
			checked = result.checked;
			msg = result.msg;
		} else if (col === "affiliate") {
			const result = await checkAffiliate({ formAffCode: val });
			checked = result.checked;
			msg = result.msg;
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

		if (!val) {
			checked = false;
			msg = "msg_UsernameReq";
		} else if (val.length < 6 || val.length > 18) {
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

	const realNameCheck = val => {
		let checked = false;
		let msg = "";

		if (val === "") {
			checked = false;
			msg = "msg_RealNameReq";
		} else {
			checked = true;
			msg = "";
		}

		return { checked, msg };
	};

	const confirmPwdCheck = val => {
		let checked = false;
		let msg = "";

		if (val === "") {
			checked = false;
			msg = "msg_ConfirmPwdReq";
		} else if (val !== userValue.password) {
			checked = false;
			msg = "msg_ConfirmPwdNotMatch";
		} else {
			checked = true;
			msg = "";
		}

		return { checked, msg };
	};

	const emailCheck = async val => {
		let checked = false;
		let msg = "";
		const regx =
			/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

		if (val === "") {
			checked = false;
			msg = "msg_EmailReq";
		} else if (!regx.test(val)) {
			checked = false;
			msg = "msg_MailWrongFormat";
		} else {
			checked = true;
			msg = "lbl_CantChangeEmail";
		}

		if (checked === true) {
			const res = await api_site_ExistsEmail({ Email: val });
			if (isMountedRef.current) {
				if (res.data.errorCode === 0) {
					if (res.data.data === true) {
						checked = false;
						msg = "msg_MailExisted";
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

	const phoneCheck = val => {
		let checked = true;
		let msg = "lbl_CantChangePhone";

		if (val === "") {
			checked = false;
			msg = "lbl_PhoneRequired";
		} else if (val.length > 0 && val.length < 9) {
			checked = false;
			msg = "lbl_CantChangePhone";
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
			// emailCheck(userValue.email),
			checkAffiliate({ formAffCode: userValue.affiliate })
		]);

		const _usernameCheck = res[0];
		const _realNameCheck = realNameCheck(userValue.realName);
		const _passwordCheck = passwordCheck(userValue.password);
		const _confirmPwdCheck = confirmPwdCheck(userValue.confirmPwd);
		const _phoneCheck = phoneCheck(userValue.phone);
		// const _emailCheck = res[1];
		const _agreeCheck = userValue.agreeCheck;
		const _affiliateCheck = res[1];

		const checked =
			_usernameCheck.checked &&
			_realNameCheck.checked &&
			_passwordCheck.checked &&
			_confirmPwdCheck.checked &&
			_phoneCheck.checked &&
			// _emailCheck.checked &&
			_agreeCheck &&
			// affiliate is optional
			(_affiliateCheck.checked === true ||
				_affiliateCheck.checked === null);

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
				realName: {
					checked: _realNameCheck.checked,
					msg: t(_realNameCheck.msg)
				},
				password: {
					checked: _passwordCheck.checked,
					msg: t(_passwordCheck.message)
				},
				confirmPwd: {
					checked: _confirmPwdCheck.checked,
					msg: t(_confirmPwdCheck.msg)
				},
				phone: {
					checked: _phoneCheck.checked,
					msg: t(_phoneCheck.msg)
				},
				// email: {
				// 	checked: _emailCheck.checked,
				// 	msg: t(_emailCheck.msg)
				// },
				checkbox: {
					checked: true,
					msg: t(checkboxMsg)
				}
			}));
		}
		return checked;
	};

	const clickSubmit = async e => {
		e.preventDefault();
		const checked = await checkAll();

		// 中國地區不需驗證
		const ReCaptchaAction = "signup";
		let reCaptchaToken;
		if (recaptchaInfoData?.country !== "CN") {
			if (!executeRecaptcha) return;
			reCaptchaToken = await executeRecaptcha(ReCaptchaAction);
		}

		if (checked && !userInfo.isLogin) {
			const regData = {
				UserName: userValue.username,
				RealName: userValue.realName,
				Userpwd: userValue.password,
				CurrencyId: siteCurrency[userValue.currency].id,
				AreaCode: _areaCode,
				PhoneNo: userValue.phone,
				// Email: userValue.email,
				UserLang: defaultLangId,
				PromoCode: userValue.specialBonusCode,
				ReferralUrl: document.referrer,
				ReCaptchaToken: reCaptchaToken,
				ReCaptchaAction
			};

			regData.RefId = getUrlParameter("RefId") || readCookie("RefId");
			// If userValue.affiliate means urlAffId is qualified
			regData.AffId = urlAffId && userValue.affiliate ? urlAffId : null;
			regData.Aff = getUrlParameter("Aff") || readCookie("Aff");
			// If no urlAffId, then userValue.affiliate is affCode (no matter url or form value)
			regData.AffCode = !urlAffId ? userValue.affiliate : null;

			api_site_Signup(regData, defaultLangId).then(
				res => {
					if (isMountedRef.current) {
						const { errorCode, message } = res.data;
						if (errorCode === 0) {
							// 註冊成功送出臉書廣告埋點給市場
							MetaPixelTracker("registerSubmit");
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
												`/${userInfo.langId}`
											);
											saveShieldData();
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
				showPwdState={showPwdState}
				showPwdHandler={showPwdHandler}
				checkboxHandler={checkboxHandler}
				configSiteName={configSiteName}
				tandCTerms={tandCTerms}
				tandCRule={tandCRule}
				clickCancel={clickCancel}
				clickSubmit={clickSubmit}
				_areaCode={_areaCode}
				urlAffiliate={urlAffiliate}
			/>
		</div>
	);
};
