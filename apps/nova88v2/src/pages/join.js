import React, { useState, useEffect, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "@reach/router";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import {
	api_site_ExistsUserName,
	api_site_GetSiteCurrencyList,
	api_site_Signup,
	api_site_ExistsEmail,
	api_site_ExistsPhoneNo,
	api_site_GetAffiliateAgent
} from "../service/api/site";
import { api_accountStrict_GetCustProfile } from "../service/api/accountStrict";
import areaCode from "../datas/areaCode";
import {
	getUrlParameter,
	readCookie,
	setCookie,
	passwordCheck
} from "../components/common/common";
import defPopBoxType from "../components/common/defPopBoxType";
import { userInfoContext, popBoxContext } from "../components/common/context";
import { GET_LANG_ID } from "../service/language";
import config from "../config";
import TandC from "../service/t_and_c";
import Inputbox from "../components/common/inputbox";
import InputboxPSW from "../components/common/inputbox.password";
import Dropdown from "../components/common/dropdown";
import { Iov_GetBlackBox } from "../components/common/iovation";
import {
	initValue,
	initTip,
	currencyToAreacode
} from "../components/common/join.data";

export default () => {
	return (
		<Wrapper onlyBeforeLogin={true}>
			<Layout>
				<main>
					<Content />
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
	const isMountedRef = useRef(null);
	const defaultLangId = userInfo.langId ?? GET_LANG_ID();

	const [defaultOption, setDefaultOption] = useState(
		t("lbl_PrefferedCurrency")
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
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: t("msg_ApiServerError"),
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-check"
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
										className="btn-check"
										onClick={ClosePopBox}>
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
									className="btn-check"
									onClick={ClosePopBox}>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
				}
			}
		);
	};

	const ClosePopBox = () => {
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
		} else if (val.length < 6 || val.length > 18) {
			checked = false;
			msg = "msg_UsernameLength";
		} else {
			checked = true;
			msg = "lbl_CantChangeUsername";
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

	const emailCheck = async val => {
		let checked = false;
		let msg = "";
		const regx = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

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
				}
			}
		}

		return { checked, msg };
	};

	const phoneCheck = async val => {
		let checked = false;
		let msg = "";

		if (val === "") {
			checked = false;
			msg = "lbl_PhoneRequired";
		} else {
			checked = true;
			msg = "lbl_CantChangePhone";
		}

		if (checked) {
			const res = await api_site_ExistsPhoneNo({
				AreaCode: _areaCode,
				Phone: val
			});
			if (isMountedRef.current) {
				if (res.data.errorCode === 0) {
					if (res.data.data === true) {
						checked = false;
						msg = "msg_PhoneExisted";
					}
				}
			}
		}

		return { checked, msg };
	};

	const _currencyId = siteCurrency[userValue.currencyIdx]?.id;

	const currencyToCountryCode = _currencyId
		? currencyToAreacode[_currencyId]
		: null;

	const _areaCode =
		currencyToCountryCode !== null
			? areaCode[currencyToCountryCode]?.AreaCode
			: null;

	const currencyCheck = _defaultOption => {
		let checked = true;
		let msg = "";
		if (_defaultOption !== null) {
			checked = false;
			msg = "lbl_RemindPrefferedCurrency";
		}
		return { checked, msg };
	};

	const setCurrencyTip = (col, _defaultOption) => {
		const result = currencyCheck(_defaultOption);
		const { checked, msg } = result.checked;
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

	const onSelectItem = i => {
		setDefaultOption(null);
		setUserValue(prev => {
			return { ...prev, currencyIdx: i };
		});
		setCurrencyTip("currency", null);
	};

	const clickCancel = () => {
		navigate(`/${userInfo.langId}`);
	};

	const checkAll = async () => {
		try {
			const res = await Promise.all([
				usernameCheck(userValue.username),
				phoneCheck(userValue.phone),
				emailCheck(userValue.email)
			]);

			const _usernameCheck = res[0];
			const _phoneCheck = res[1];
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
						email: {
							checked: _emailCheck.checked,
							msg: t(_emailCheck.msg)
						},
						currency: {
							checked: _currencyCheck.checked,
							msg: t(_currencyCheck.msg)
						}
					};
				});
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
			const regData = {
				UserName: userValue.username,
				Userpwd: userValue.password,
				Email: userValue.email,
				PhoneNo: userValue.phone,
				CurrencyId: _currencyId,
				UserLang: defaultLangId,
				PromoCode: userValue.specialBonusCode,
				AreaCode: _areaCode
			};

			regData.RefId = getUrlParameter("RefId") || readCookie("RefId");
			regData.AffId = affIdCheckPass ? _AffId : null;
			regData.Aff = getUrlParameter("Aff") || readCookie("Aff");
			regData.AffCode = isUrlAffCode ?? userValue.affCode;
			regData.blackbox = await Iov_GetBlackBox();

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
											const cookieName = `balanceHint${_user.userName}`;
											setCookie(cookieName, "1", 1);
											_user = {
												isJoin: true,
												..._user,
												...res_custInfo.data.data
											};
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
															className="btn-check"
															onClick={
																ClosePopBox
															}>
															{t("lbl_Close")}
														</button>
													</div>
												)
											});
										}
										setUserInfo(_user);
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
														onClick={ClosePopBox}>
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
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.ErrorMsg,
								message,
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-check"
											onClick={ClosePopBox}>
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
										className="btn-check"
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

	const openLogin = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Login
		});
	};

	if (userInfo.isLogin) {
		if (userInfo.isJoin) {
			navigate(`/${userInfo.langId}`, {
				state: { isJoin: true }
			});
		}
	}

	return (
		<div className="joinpop">
			<div className="joinloginModule">
				<div className="joinAnimation">
					<img
						className="animationlogo"
						alt="animationlogo"
						src={`${config.cloudImgUrl}/SiteSkin/img/logo_en_w.png`}
					/>
					<img
						className="npc1"
						alt="npc1"
						src={require("../styles/img/joinNpc01.png")}
					/>
					<img
						className="npc2"
						alt="npc2"
						src={require("../styles/img/joinNpc02.png")}
					/>
					<img
						className="welcome"
						alt="welcome"
						src={require("../styles/img/welcome.png")}
					/>
					<img
						className="back"
						alt="back"
						src={require("../styles/img/back.png")}
					/>
				</div>
				<form className="joinloginFunction" onSubmit={clickSubmit}>
					<span className="title txt-orange">{t("lbl_JoinNow")}</span>
					<div>
						{t("lbl_LoginMsg")}
						<button
							className="txt-orange"
							type="button"
							onClick={openLogin}>
							{t("lbl_LoginHere")}
						</button>
					</div>
					<div className="inputModule">
						<Inputbox
							className={`inputBox-org${
								!tip.username.checked && tip.username.msg !== ""
									? " error"
									: ""
							}`}
							icon="icon-member txt-orange"
							placeholder={t("lbl_Username")}
							value={userValue.username}
							tip={tip.username.msg}
							checked={tip.username.checked}
							clickInfo={clickInfo.bind(this, "username")}
							onChange={EditField.bind(null, "username")}
							onBlur={checkValue.bind(null, "username")}
						/>

						<InputboxPSW
							className={`inputBox-org${
								!tip.password.checked && tip.password.msg !== ""
									? " error"
									: ""
							}`}
							icon="icon-key txt-orange"
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

						<Inputbox
							className={`inputBox-org${
								!tip.email.checked && tip.email.msg !== ""
									? " error"
									: ""
							}`}
							icon="icon-email txt-orange"
							placeholder={t("lbl_Email")}
							value={userValue.email}
							tip={tip.email.msg}
							checked={tip.email.checked}
							clickInfo={clickInfo.bind(this, "email")}
							onChange={EditField.bind(null, "email")}
							onBlur={checkValue.bind(null, "email")}
						/>

						<div
							className={`inputBox-org${
								tip.currency.msg !== "" ? " error" : ""
							}`}>
							<Dropdown
								defaultOption={defaultOption}
								mainKey="join_currency"
								icon="icon-coin-dollar txt-orange"
								options={siteCurrency}
								selectedIdx={userValue.currencyIdx}
								i18n={t}
								onSelectItem={onSelectItem}
							/>
						</div>
						{tip.currency.msg ? (
							<div className="active">{tip.currency.msg}</div>
						) : null}

						<div className="tip active">
							{t("lbl_CantChangePreferredCurrency")}
						</div>

						{userValue.currencyIdx !== null ? (
							<Inputbox
								className={`inputBox-org${
									!tip.phone.checked && tip.phone.msg !== ""
										? " error"
										: ""
								}`}
								icon="icon-phone txt-orange"
								areaCode={_areaCode}
								placeholder={t("lbl_Phone")}
								value={userValue.phone}
								tip={tip.phone.msg}
								checked={tip.phone.checked}
								clickInfo={clickInfo.bind(this, "phone")}
								onChange={EditField.bind(null, "phone")}
								onBlur={checkValue.bind(null, "phone")}
							/>
						) : (
							<></>
						)}

						<Inputbox
							className={`inputBox-org${
								tip.specialBonusCode.msg !== "" ? " error" : ""
							}`}
							icon="icon-promotion txt-orange"
							placeholder={t("lbl_JoinPromoCode")}
							value={userValue.specialBonusCode}
							onChange={EditField.bind(null, "specialBonusCode")}
							onBlur={checkValue.bind(null, "specialBonusCode")}
							tip={tip.specialBonusCode.msg}
							checked={tip.specialBonusCode.checked}
						/>

						<Inputbox
							className="inputBox-org"
							icon="icon-affiliate txt-orange"
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
						{t("lbl_sign_up_terms_start")}
						<a
							className="txt-orange"
							target="_blank"
							rel="noreferrer"
							href={TandC(defaultLangId).terms}>
							{t("lbl_sign_up_terms_center")}
						</a>
						{t("lbl_sign_up_terms_end")}
					</div>

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
		</div>
	);
};
