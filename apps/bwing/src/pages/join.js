import React, { useState, useEffect, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "@reach/router";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import {
	api_site_ExistsUserName,
	api_site_GetSiteCurrencyList,
	api_site_Signup,
	api_site_ExistsPhoneNo,
	api_site_Register,
	api_site_GetAffiliateAgent
} from "../service/api/site";
import { api_accountStrict_GetCustProfile } from "../service/api/accountStrict";
import {
	getUrlParameter,
	readCookie,
	passwordCheck
} from "../components/common/common";
import { defPopBoxType } from "../components/common/defPopBoxType";
import { userInfoContext, popBoxContext } from "../components/common/context";
import { GET_LANG_ID } from "../service/language";
import config from "../config";
import TandC from "../service/t_and_c";
import Inputbox from "../components/common/inputbox";
import InputboxPSW from "../components/common/inputbox.password";
import Dropdown from "../components/common/dropdown";
import Checkbox from "../components/common/checkbox";
import joinBanner from "../styles/img/joinBanner.jpg";
import areaCode from "../datas/areaCode";
import {
	initValue,
	initTip,
	currencyToAreacode
} from "../components/join/join.def";

export default () => {
	return (
		<Wrapper>
			<Layout>
				<main>
					<section>
						<Content />
					</section>
				</main>
			</Layout>
		</Wrapper>
	);
};

const Content = () => {
	const { t } = useTranslation();
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [userValue, setUserValue] = useState(initValue);
	const [tip, setTip] = useState(initTip);
	const [showPsw, setShowPsw] = useState(false);
	const [siteCurrency, setSiteCurrency] = useState([]);
	const defaultLangId = userInfo.langId ?? GET_LANG_ID();
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.isLogin) {
			navigate(`/${userInfo.langId}`);
		}
	}, [userInfo.isLogin, userInfo.langId]);

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
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: t("msg_ApiServerError"),
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-cancel"
										onClick={ClosePopBox}>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
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
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: res.data.message,
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
									className="btn-cancel"
									onClick={ClickClose}>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
				}
			}
		);
	};

	const ClickClose = () => {
		setPopBox({ isOpen: false });
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
		}

		if (tip[col].msg === msg) {
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

	const usernameCheck = async val => {
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
			const res = await api_site_ExistsUserName({ UserName: val });
			if (isMountedRef.current) {
				if (res.data.errorCode === 0) {
					if (res.data.data === true) {
						checked = false;
						msg = "msg_UsernameNotAvailable";
					}
				}
			}
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
				}
			}
		}
		return { checked, msg };
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

	const checkAll = async () => {
		const res = await Promise.all([
			usernameCheck(userValue.username),
			phoneCheck(userValue.phone)
		]);

		const _usernameCheck = res[0];
		const _passwordCheck = passwordCheck(userValue.password);
		const _phoneCheck = res[1];
		// let _emailCheck = emailCheck(userValue.email);
		const _termsCheck = userValue.termsCheck;
		const _ageCheck = userValue.ageCheck;

		const checked =
			_usernameCheck.checked &&
			_passwordCheck.checked &&
			_phoneCheck.checked &&
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
					phone: {
						checked: _phoneCheck.checked,
						msg: t(_phoneCheck.msg)
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
				AreaCode: _areaCode
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
												...res_custInfo.data.data
											};
											navigate(`/${userInfo.langId}`);
										} else {
											setPopBox({
												isOpen: true,
												popBoxType:
													defPopBoxType.ErrorMsg,
												message:
													res_custInfo.data.message,
												btnBar: (
													<div className="btnGroup">
														<button
															className="btn-cancel"
															onClick={
																ClickClose
															}>
															{t("lbl_Close")}
														</button>
													</div>
												)
											});
										}
										setUserInfo(_user);
										setPopBox({ isOpen: false });
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
														className="btn-cancel"
														onClick={ClickClose}>
														{t("lbl_Close")}
													</button>
												</div>
											)
										});
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
						} else {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.ErrorMsg,
								message,
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
										className="btn-cancel"
										onClick={ClickClose}>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
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

	return userInfo.isLogin === true ? (
		<></>
	) : (
		<div className="joinus">
			<img src={joinBanner} alt="joinBanner" />
			<div className="joinloginModule">
				<div className="joinModule" onSubmit={clickSubmit}>
					<div className="title">{t("lbl_JoinNow")}</div>
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
						<div className="title">{t("lbl_Username")}</div>
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
						<div className="title">{t("lbl_Password")}</div>
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
						<div className="title">
							{t("lbl_PrefferedCurrency")}
						</div>
						<div className="inputBox-blue">
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

						{tip.currency.msg !== "" ? (
							<div className="tip active">{tip.currency.msg}</div>
						) : null}

						<div className="title">{t("lbl_Phone")}</div>
						<Inputbox
							icon="icon-phone txt-blue12"
							areaCode={_areaCode}
							placeholder={t("lbl_Phone")}
							value={userValue.phone}
							tip={tip.phone.msg}
							checked={tip.phone.checked}
							clickInfo={clickInfo.bind(this, "phone")}
							onChange={EditField.bind(null, "phone")}
							onBlur={checkValue.bind(null, "phone")}
						/>

						<div className="title">{t("lbl_Affiliates")}</div>
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
					</div>

					<div className="Terms">
						<Checkbox
							id="joinTermsCheck"
							checked={userValue.termsCheck}
							onChange={checkboxHandler.bind(null, "termsCheck")}>
							{t("lbl_Check18TC1")}{" "}
							<a
								target="_blank"
								rel="noreferrer"
								href={TandC(defaultLangId).terms}>
								{t("lbl_TermsConditions")}{" "}
							</a>
							{t("lbl_Check18TC2")}{" "}
							<a
								target="_blank"
								rel="noreferrer"
								href={TandC(defaultLangId).rule}>
								{t("lbl_RuleRegulations")}{" "}
							</a>
							{t("lbl_Check18TC3")} {config.siteName}.
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
							className="gray"
							onClick={clickCancel}>
							{t("lbl_Cancel").toUpperCase()}
						</button>
						<button
							className="orange"
							type="submit"
							onClick={clickSubmit}>
							{t("lbl_JoinNow").toUpperCase()}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
