import React, { useState, useEffect, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import {
	api_site_ExistsUserName,
	api_site_GetSiteCurrencyList,
	api_site_Signup,
	api_site_ExistsEmail,
	// api_site_ExistsPhoneNo,
	api_site_GetAffiliateAgent,
	api_site_GetRecaptchaInfo
} from "../../service/api/site";
import { api_accountStrict_GetCustProfile } from "../../service/api/accountStrict";
import { GET_LANG_ID } from "../../service/language";
import areaCode from "../../datas/areaCode";
import {
	getUrlParameter,
	readCookie,
	setCookie,
	passwordCheck,
	getLocalStorage,
	defCurrencyList,
	getCombineLangId,
	defCurrencyToClass
} from "../common/common";
import defPopBoxType from "../common/defPopBoxType";
import usePopBox from "../hook/usePopBox";
import { userInfoContext, popBoxContext } from "../common/context";
import { cloudImgUrl, bannerImgUrl } from "../../config";
import { Iov_GetBlackBox } from "../common/iovation";
import { initValue, initTip, currencyToAreacode } from "../common/join.data";
import JoinForm from "./join.form";
import path from "../../router";
import JoinPromoInfo from "./join.promoInfo";
import useHandleLineLogin, { defType } from "../hook/useHandleLineLogin";
import { limitCountryNum } from "./join.def";
import { defLangGroups } from "../header/header.langDropdown";

export const areaCodeList = Object.values(areaCode).map(el => ({
	id: `${el.AreaCode} ${el.Name}`,
	displayText: `${el.AreaCode} ${el.Name}`,
	displaySelected: el.AreaCode,
	areaCode: el.AreaCode,
	abbr: el.Abbr
}));

export default () => {
	const { t } = useTranslation();
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [userValue, setUserValue] = useState(initValue);
	const [tip, setTip] = useState(initTip);
	const [showPsw, setShowPsw] = useState(false);
	const [siteCurrency, setSiteCurrency] = useState([]);
	const [reCaptchaToken, setReCaptchaToken] = useState("");
	const [recaptchaInfo, setRecaptchaInfo] = useState({});
	const isMountedRef = useRef(null);
	const defaultLangId = userInfo.langId ?? GET_LANG_ID();
	const { errorPopBox } = usePopBox();
	const [defaultOption, setDefaultOption] = useState(
		t("lbl_PrefferedCurrency")
	);
	const tandCTerms = `${bannerImgUrl}/Static/${getCombineLangId(
		defaultLangId,
		userInfo.currencyId
	)}/TermsConditions.html`;
	const { lineLogin } = useHandleLineLogin();
	const lineUserId = getLocalStorage("lineUser");
	const _areaCode = areaCodeList[userValue?.areaCodeIdx]?.areaCode;

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		checkUrlParam();
		getRecaptchaSiteKey();
	}, []);

	const getRecaptchaSiteKey = async () => {
		try {
			const res = await api_site_GetRecaptchaInfo();
			const { country, siteKey } = res.data.data;
			setRecaptchaInfo({
				country,
				siteKey
			});
		} catch (err) {}
	};

	const checkUrlParam = async () => {
		const _AffId = getUrlParameter("AffId") || readCookie("AffId");
		if (!_AffId && !lineUserId) {
			getCurrencyList();
		} else if (_AffId) {
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
		} else if (lineUserId) {
			setSiteCurrency([
				{
					id: defCurrencyList.THB,
					displayKey: `Currency_${defCurrencyList.THB}`
				}
			]);
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
						if (lineUserId) {
							currencyArr.filter(
								el => el.id === defCurrencyList.THB
							);
						}
						setSiteCurrency(() => currencyArr);
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
		} else if (col === "email") {
			msg = t("lbl_EmailToolTip");
		} else if (col === "currency") {
			msg = t("lbl_CantChangePreferredCurrency");
		} else if (col === "phone") {
			msg = t("lbl_PhoneTooltip");
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

	const setCurrencyTip = (col, _defaultOption) => {
		const result = currencyCheck(_defaultOption);
		const { checked, msg } = result.checked;
		setTip(prev => ({
			...prev,
			[col]: {
				checked,
				msg: t(msg)
			}
		}));
	};

	const onSelectItem = ({ idx, col, item }) => {
		setDefaultOption(null);
		const param = {};

		if (col === "currencyIdx") {
			const selCurrecnyName = currencyToAreacode[siteCurrency[idx].id];
			const areaCodeIdx = areaCodeList.findIndex(
				obj => obj.abbr === selCurrecnyName
			);
			param.currencyIdx = idx;
			param.areaCodeIdx = areaCodeIdx;
		} else if (col === "areaCodeIdx") {
			const areaCodeIdx = areaCodeList.findIndex(
				obj => obj.abbr === item.abbr
			);
			param.areaCodeIdx = areaCodeIdx;
		}
		setUserValue(prev => ({ ...prev, ...param }));

		setCurrencyTip("currency", null);
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
		} else if (col === "email") {
			const result = await emailCheck(val);
			checked = result.checked;
			msg = result.msg;
		} else if (col === "currency") {
			const result = currencyCheck(defaultOption);
			checked = result.checked;
			msg = result.msg;
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
		let checked = false;
		let msg = "";

		if (val === "") {
			checked = false;
			msg = "msg_UsernameReq";
		} else if (val.length < 6 || val.length > 18) {
			checked = false;
			msg = "msg_UsernameLength";
		} else {
			checked = true;
			msg = "lbl_CantChangeUsername";
		}

		if (checked === true) {
			const res = await api_site_ExistsUserName({
				UserName: val,
				langId: userInfo.langId
			});
			if (isMountedRef.current) {
				if (res.data.errorCode === 0) {
					if (res.data.data === true) {
						checked = false;
						msg = res.data.message;
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

	const emailCheck = async val => {
		let checked = false;
		let msg = "";
		const regx =
			/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

		if (val === "") {
			checked = false;
			msg = "msg_MailWrongFormat";
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

	const currencyCheck = _defaultOption => {
		let checked = true;
		let msg = "";
		if (_defaultOption !== null) {
			checked = false;
			msg = "lbl_RemindPrefferedCurrency";
		}
		return { checked, msg };
	};

	const phoneCheck = val => {
		let checked = true;
		let msg = "";
		const phoneLengthRegx =
			/^\+60[0-9]{9,10}$|\+62[0-9]{10,13}$|\+86[0-9]{10,11}$|\+91[0-9]{10}$|\+66[0-9]{9}$|\+880[0-9]{9}$/;
		if (val === "" || !_areaCode) {
			checked = false;
			msg = "lbl_PhoneRequired";
		} else if (Object.keys(limitCountryNum).includes(_areaCode)) {
			const limitRange =
				limitCountryNum[areaCodeList[userValue.areaCodeIdx].areaCode];
			if (!phoneLengthRegx.test(_areaCode + val)) {
				checked = false;
				msg = t("lbl_PhoneNumberErrorTip", {
					digitalArea: limitRange
				});
			}
		}

		// if (checked) {
		// 	const res = await api_site_ExistsPhoneNo({
		// 		AreaCode: _areaCode,
		// 		Phone: val
		// 	});
		// 	if (isMountedRef.current) {
		// 		if (res.data.errorCode === 0) {
		// 			if (res.data.data === true) {
		// 				checked = false;
		// 				msg = "msg_PhoneExisted";
		// 			}
		// 		} else {
		// 			errorPopBox(
		// 				res.data.message || "error",
		// 				res.data.errorCode
		// 			);
		// 		}
		// 	}
		// }

		return { checked, msg };
	};

	const clickCancel = () => {
		navigate(`/${userInfo.langId}`);
	};

	const checkAll = async () => {
		try {
			const _reCaptchaCheck =
				reCaptchaToken !== "" || recaptchaInfo.country === "CN";

			// * 機器人驗證沒過直接 return 出去
			if (!_reCaptchaCheck) return false;

			const res = await Promise.all([
				usernameCheck(userValue.username),
				// phoneCheck(userValue.phone),
				null,
				emailCheck(userValue.email)
			]);

			const _usernameCheck = res[0];
			// const _phoneCheck = res[1];
			const _phoneCheck = phoneCheck(userValue.phone);
			const _emailCheck = res[2];
			const _passwordCheck = passwordCheck(userValue.password);
			const _currencyCheck = currencyCheck(defaultOption);

			const checked =
				_usernameCheck.checked &&
				_passwordCheck.checked &&
				_phoneCheck.checked &&
				_emailCheck.checked &&
				_currencyCheck.checked;

			if (!checked) {
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
					email: {
						checked: _emailCheck.checked,
						msg: t(_emailCheck.msg)
					},
					currency: {
						checked: _currencyCheck.checked,
						msg: t(_currencyCheck.msg)
					}
				}));
			}

			return checked;
		} catch (error) {
			return false;
		}
	};

	const isUrlAffCode = getUrlParameter("AffCode") || readCookie("AffCode");

	const hasRefOrAffCode =
		getUrlParameter("AffId") ||
		readCookie("AffId") ||
		getUrlParameter("AffCode") ||
		readCookie("AffCode");

	const handleReCaptchaChange = token => {
		setReCaptchaToken(token);
	};

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

		if (checked) {
			const getSignupLangId = () => {
				const langList = [];
				defLangGroups[
					defCurrencyToClass[siteCurrency[userValue.currencyIdx]?.id]
				].forEach(({ value }) => {
					langList.push(value);
				});
				return langList.includes(defaultLangId) ? defaultLangId : "en";
			};
			const signupLangId = getSignupLangId();

			const regData = {
				UserName: userValue.username,
				Userpwd: userValue.password,
				Email: userValue.email,
				PhoneNo: userValue.phone,
				CurrencyId: siteCurrency[userValue.currencyIdx]?.id,
				UserLang: signupLangId,
				PromoCode: userValue.specialBonusCode,
				AreaCode: _areaCode,
				ReferralUrl: document.referrer,
				ReCaptchaToken: reCaptchaToken
			};

			regData.RefId = getUrlParameter("RefId") || readCookie("RefId");
			regData.AffId = affIdCheckPass ? _AffId : null;
			regData.Aff = getUrlParameter("Aff") || readCookie("Aff");
			regData.AffCode = isUrlAffCode ?? userValue.affCode;
			regData.blackbox = await Iov_GetBlackBox();
			regData.LineUserId = lineUserId;

			api_site_Signup(regData, signupLangId).then(
				res => {
					if (isMountedRef.current) {
						const { errorCode, message } = res.data;
						if (errorCode === 0) {
							api_accountStrict_GetCustProfile().then(
								async res_custInfo => {
									if (isMountedRef.current) {
										let _user = {
											isLogin: true,
											langId: signupLangId,
											userName: userValue.username
										};
										if (res_custInfo.data.errorCode === 0) {
											const cookieName = `balanceHint${_user.userName}`;
											setCookie(cookieName, "1", 1);
											_user = {
												isJoin: true,
												..._user,
												...res_custInfo.data.data
											};
											localStorage.setItem(
												`${_user.userName}-doNotRedirect`,
												"1"
											);
											if (lineUserId) {
												removeLocalStorage("lineUser");
											}
											await navigate(
												`/${_user.langId}/${path.deposit.root}`
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
										setPopBox({ isOpen: false });
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
						} else if (errorCode === -6) {
							setTip(prev => ({
								...prev,
								phone: {
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

	const handleLineRegister = e => {
		e.preventDefault();
		lineLogin({ type: defType.register });
	};

	return (
		<div className="joinpop">
			<div className="joinloginModule">
				<JoinPromoInfo currencyId={userInfo.currencyId} t={t} />
				<div className="joinAnimation">
					<img
						className="animationlogo"
						alt="animationlogo"
						src={`${cloudImgUrl}/SiteSkin/img/logo_en_w.png`}
					/>
					<img
						className="npc1"
						alt="npc1"
						src={`${bannerImgUrl}/desktop/img/joinNpc01.png`}
					/>
					<img
						className="npc2"
						alt="npc2"
						src={`${bannerImgUrl}/desktop/img/joinNpc02.png`}
					/>
					<img
						className="welcome"
						alt="welcome"
						src={`${bannerImgUrl}/desktop/img/welcome.png`}
					/>
					<img
						className="back"
						alt="back"
						src={`${bannerImgUrl}/desktop/img/back.png`}
					/>
				</div>
				<JoinForm
					t={t}
					openLogin={openLogin}
					userValue={userValue}
					tip={tip}
					setTip={setTip}
					clickInfo={clickInfo}
					EditField={EditField}
					checkValue={checkValue}
					showPsw={showPsw}
					showPswHandler={showPswHandler}
					siteCurrency={siteCurrency}
					_areaCode={_areaCode}
					hasRefOrAffCode={hasRefOrAffCode}
					onSelectItem={onSelectItem}
					tandCTerms={tandCTerms}
					clickCancel={clickCancel}
					clickSubmit={clickSubmit}
					defaultOption={defaultOption}
					handleLineRegister={handleLineRegister}
					langId={userInfo.langId}
					currencyId={userInfo?.currencyId}
					lineUserId={lineUserId}
					areaCodeList={areaCodeList}
					reCaptchaOnChange={handleReCaptchaChange}
					recaptchaInfo={recaptchaInfo}
				/>
			</div>
		</div>
	);
};
