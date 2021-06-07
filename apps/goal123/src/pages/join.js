import React, { useState, useEffect, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "@reach/router";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import {
	api_site_ExistsUserName,
	api_site_GetSiteCurrencyList,
	// api_site_Register,
	api_site_GetAffiliateAgent,
	api_site_Signup
} from "../service/api/site";
import { api_accountStrict_GetCustProfile } from "../service/api/accountStrict";
import {
	getUrlParameter,
	readCookie,
	passwordCheck,
	isDateRange
} from "../components/common/common";
import { defPopBoxType } from "../components/common/popBox";
import usePopBox from "../components/hook/usePopBox";
import { userInfoContext, popBoxContext } from "../components/common/context";
import { GET_LANG_ID } from "../service/language";
import config from "../config";
import TandC from "../service/t_and_c";
import Inputbox from "../components/common/inputbox";
import InputboxPSW from "../components/common/inputbox.password";
import Dropdown from "../components/common/dropdown";
import Checkbox from "../components/common/checkbox";
import joinBanner from "../styles/img/joinBanner.jpg";

import { eventPeriodEuro } from "../datas/euroDef";
import joinBannerEuro from "../styles/img/joinBanner_euro.png";

export default () => {
	return (
		<Wrapper onlyBeforeLogin={true}>
			<Layout>
				<main className="joinlogin">
					<Content />
				</main>
			</Layout>
		</Wrapper>
	);
};

const initValue = {
	username: "",
	password: "",
	affCode: null,
	currency: 0,
	termsCheck: false,
	ageCheck: false,
	specialBonusCode: null
};

const initTip = {
	username: { checked: null, msg: "" },
	password: { checked: null, msg: "" },
	currency: { checked: null, msg: "" },
	affCode: { checked: null, msg: "" },
	checkbox: { checked: null, msg: "" },
	specialBonusCode: { checked: null, msg: "" }
};

const Content = () => {
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
	const isInPeriodEuro = isDateRange(null, eventPeriodEuro.endDate);

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
		} else if (col === "affCode") {
			msg = t("lbl_Please_enter_Affiliate_ID");
		} else if (col === "specialBonusCode") {
			msg = t("lbl_JoinPromoCode");
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
		let checked = false;
		let msg = "";

		if (val === "") {
			checked = false;
			msg = "msg_UsernameReq";
		} else if (val !== "") {
			if (val.length < 6 || val.length > 18) {
				checked = false;
				msg = "msg_UsernameLength";
			} else {
				checked = true;
			}
		}

		if (checked === true) {
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
			} catch (error) {}
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
						const { errorCode } = res.data;
						const { message } = res.data;
						if (errorCode === 0) {
							api_accountStrict_GetCustProfile().then(
								res_custInfo => {
									if (isMountedRef.current) {
										let _user = {
											isLogin: true,
											langId: defaultLangId,
											userName: userValue.username
										};
										if (res_custInfo.data.errorCode === 0) {
											_user = {
												..._user,
												...res_custInfo.data.data,
												langId: GET_LANG_ID(
													res_custInfo.data.data
														.langId
												)
											};
										} else {
											errorPopBox(
												res_custInfo.data.message ||
													"error",
												res_custInfo.data.errorCode
											);
										}
										setUserInfo(_user);
										setPopBox({ isOpen: false });
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
				src={isInPeriodEuro ? joinBannerEuro : joinBanner}
				alt="joinBanner"
			/>
			<form className="joinloginFunction" onSubmit={clickSubmit}>
				<span className="title txt-yellow">{t("lbl_JoinNow")}</span>
				<div>
					{t("lbl_LoginMsg")}
					<button
						className="txt-blue2"
						type="button"
						onClick={openLogin}>
						{t("lbl_LoginHere")}
					</button>
				</div>
				<div className="inputModule">
					<Inputbox
						icon="icon-member txt-blue12"
						placeholder={t("lbl_Username")}
						value={userValue.username}
						tip={tip.username.msg}
						checked={tip.username.checked}
						clickInfo={clickInfo.bind(this, "username")}
						onChange={EditField.bind(null, "username")}
						onBlur={checkValue.bind(null, "username")}
					/>
					<InputboxPSW
						icon="icon-key txt-blue12"
						inputType={`${!showPsw ? "password" : "text"}`}
						placeholder={t("lbl_Password")}
						value={userValue.password}
						tip={tip.password.msg}
						onChange={EditField.bind(null, "password")}
						onBlur={checkValue.bind(null, "password")}
						showPsw={showPsw}
						showPswHandler={showPswHandler}
						checked={tip.password.checked}
						clickInfo={clickInfo.bind(this, "password")}
					/>
					<div className="inputBox">
						<Dropdown
							mainKey="join_currency"
							icon="icon-coin-dollar txt-blue12"
							options={siteCurrency}
							selectedIdx={userValue.currency}
							i18n={t}
							onSelectItem={onSelectItem}
							clickDropdown={clickDropdown}
						/>
					</div>
					{/* <Inputbox
						icon="icon-promotion txt-blue12"
						placeholder={t("lbl_JoinPromoCode")}
						value={userValue.specialBonusCode}
						onChange={EditField.bind(null, "specialBonusCode")}
						onBlur={checkValue.bind(null, "specialBonusCode")}
						tip={tip.specialBonusCode.msg}
						checked={tip.specialBonusCode.checked}
						clickInfo={clickInfo.bind(this, "specialBonusCode")}
					/> */}
					<Inputbox
						icon="icon-affiliate txt-blue12"
						placeholder={t("lbl_Affiliate_ID")}
						value={hasRefOrAffCode ?? userValue.affCode}
						onChange={EditField.bind(null, "affCode")}
						readOnly={hasRefOrAffCode}
						checked={tip.affCode.checked}
						tip={tip.affCode.msg}
						clickInfo={clickInfo.bind(this, "affCode")}
					/>
					{tip.currency.msg !== "" ? (
						<div className="tip active">{tip.currency.msg}</div>
					) : null}
				</div>

				<div className="Terms">
					<Checkbox
						id="joinTermsCheck"
						checked={userValue.termsCheck}
						onChange={checkboxHandler.bind(null, "termsCheck")}>
						{t("lbl_Check18TC1")}&nbsp;
						<a
							target="_blank"
							rel="noreferrer"
							href={TandC(defaultLangId).terms}>
							{t("lbl_TermsConditions")}
						</a>
						&nbsp;
						{t("lbl_Check18TC2")}&nbsp;
						<a
							target="_blank"
							rel="noreferrer"
							href={TandC(defaultLangId).rule}>
							{t("lbl_RuleRegulations")}
						</a>
						&nbsp;
						{t("lbl_Check18TC3")}&nbsp;{config.siteName}.
					</Checkbox>

					<Checkbox
						id="joinAgeCheck"
						checked={userValue.ageCheck}
						onChange={checkboxHandler.bind(null, "ageCheck")}>
						{t("lbl_Check18TC4")}
					</Checkbox>
				</div>
				{tip.checkbox.msg !== "" ? (
					<div className="tip active">{tip.checkbox.msg}</div>
				) : null}

				<div className="btnGroup">
					<button
						type="button"
						className="btn-cancel"
						onClick={clickCancel}>
						{t("lbl_Cancel")}
					</button>
					<button className="btn-check" type="submit">
						{t("lbl_Submit")}
					</button>
				</div>
			</form>
		</div>
	);
};
