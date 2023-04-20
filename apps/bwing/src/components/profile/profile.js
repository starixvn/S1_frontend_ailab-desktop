/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
import React, { useContext, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Link } from "gatsby";
import { INPUT_PATTERN } from "@ailab-desktop/format-pattern";
import { api_site_ExistsEmail } from "../../service/api/site";
import { api_account_ExistsPhone } from "../../service/api/account";
import {
	api_accountStrict_SetProfile,
	api_accountStrict_SendOTPSMS,
	api_accountStrict_SendOTPEmail
} from "../../service/api/accountStrict";
import areaCode from "../../datas/areaCode";
import ProfileEdit from "./profileEdit";
import { defPopBoxType } from "../common/defPopBoxType";
import { popBoxContext, userInfoContext } from "../common/context";
import { getCountryCode, getUrlParameter } from "../common/common";
import Loading from "../common/loading";
import handleError from "../common/handleError";
import { defPrevPage, initStatus } from "./profile.def";
import VerificationPanel from "./verificationPanel";
import useVerifyEmail from "./hook/useVerifyEmail";

export default () => {
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { t } = useTranslation();
	const isMountedRef = useRef(null);
	const { setPopBox } = useContext(popBoxContext);
	const [loading, setLoading] = useState(false);
	const [mobileVerificationLoading, setMobileVerificationLoading] =
		useState(false);

	const [nameValue, setNameValue] = useState("");
	const [birthValue, setBirthValue] = useState("");
	const [phoneValue, setPhoneValue] = useState("");
	const [emailValue, setEmailValue] = useState("");
	const [status, setStatus] = useState(initStatus);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		setLoading(true);
		if (userInfo.isLogin && userInfo.currencyId) {
			getAreaCode();
			setLoading(false);
		}
	}, [userInfo.country]);

	const openErrorMessagePopBox = (
		message = t("msg_ApiServerError"),
		errorCode = null
	) => {
		setPopBox({
			message,
			errorCode,
			isOpen: true,
			popBoxType: defPopBoxType.ErrorMsg,
			icon: "icon-icon32px_notification",
			btnBar: (
				<div className="btnGroup">
					<button className="btn-cancel" onClick={ClickClose}>
						{t("lbl_Close")}
					</button>
				</div>
			)
		});
	};

	const getAreaCode = () => {
		if (!userInfo.country) {
			const value_areaCode =
				areaCode[getCountryCode(userInfo.currencyId)].AreaCode;
			const value_country = getCountryCode(userInfo.currencyId);
			setUserInfo(prev => ({
				...prev,
				AreaCode: value_areaCode,
				country: value_country
			}));
		} else {
			const value_areaCode = areaCode[userInfo.country].AreaCode;
			setUserInfo(prev => ({
				...prev,
				AreaCode: value_areaCode
			}));
		}
	};

	const onChangeName = e => {
		const { value } = e.target;
		setNameValue(value);
	};

	const onChangeBirth = value => {
		const selectDate = moment(value).format("YYYY-MM-DD");
		setBirthValue(selectDate);
	};

	const onChangePhone = e => {
		const { value } = e.target;
		const regex = /^(\(?\+?[0-9]*\?)?[0-9_]*$/;
		if (!(regex.test(value) || value === "") || value.length > 10) {
			return false;
		}
		setPhoneValue(value);
	};

	const onChangeEmail = e => {
		const { value } = e.target;
		setEmailValue(value);
	};

	const ClickClose = () => {
		setPopBox({ isOpen: false });
	};

	const checkName = () => {
		let checked = true;
		let tip = "";

		if (!nameValue && !userInfo.accountName) {
			tip = t("lbl_NameRequired");
			checked = false;
		} else if (
			// * 如果使用者有填入特殊字元則顯示錯誤訊息
			String(nameValue).match(
				INPUT_PATTERN.userNameSpecialCharactersPattern
			)
		) {
			tip = t("lbl_EnterRealName");
			checked = false;
		}

		setStatus(prev => ({
			...prev,
			accountName: {
				tip,
				checked
			}
		}));

		return checked;
	};

	const checkBirth = () => {
		const isValidDate = d => {
			const date = new Date(d);
			return date instanceof Date && !isNaN(date);
		};

		const checkResult =
			Boolean(userInfo.birth_d) || isValidDate(birthValue);
		const checkTip = isValidDate(birthValue)
			? ""
			: t("lbl_BirthdayErrorTip");

		setStatus(prev => ({
			...prev,
			birth: {
				tip: checkTip,
				checked: checkResult
			}
		}));
		return checkResult;
	};

	const checkPhoneIsUnique = async () => {
		try {
			if (!userInfo.phoneNo && phoneValue && phoneValue.length > 0) {
				const { data } = await api_account_ExistsPhone({
					AreaCode: userInfo.AreaCode,
					Phone: phoneValue
				});

				if (isMountedRef.current) {
					if (data.errorCode === 0) {
						if (data.data) {
							setStatus(prev => ({
								...prev,
								phoneNo: {
									tip: t("msg_PhoneExisted"),
									checked: false
								}
							}));
							return false;
						}
						setStatus(prev => ({
							...prev,
							phoneNo: {
								tip: "",
								checked: true
							}
						}));
						return true;
					}
					openErrorMessagePopBox(
						data.message || "error",
						data.errorCode
					);
				}
			}
		} catch (err) {
			if (isMountedRef.current) {
				setStatus(prev => ({
					...prev,
					phoneNo: {
						tip: "",
						checked: false
					}
				}));
				handleError({ setPopBox, t, err });
			}
		}
	};

	const checkPhone = async () => {
		let checkResult = false;

		if (userInfo.phoneNo) {
			checkResult = true;
		}

		if (!userInfo.phoneNo && !phoneValue) {
			setStatus(prev => ({
				...prev,
				phoneNo: {
					tip: t("lbl_PhoneRequired"),
					checked: false
				}
			}));
		} else if (
			!userInfo.phoneNo &&
			phoneValue !== "" &&
			phoneValue.length > 0
		) {
			setStatus(prev => ({
				...prev,
				phoneNo: {
					tip: "",
					checked: "loading"
				}
			}));

			checkResult = await checkPhoneIsUnique();
		}

		return checkResult;
	};

	const checkEmailIsUnique = async () => {
		try {
			if (!userInfo.email && emailValue && emailValue.length > 0) {
				const { data } = await api_site_ExistsEmail({
					Email: emailValue
				});

				if (isMountedRef.current) {
					if (data.errorCode === 0) {
						if (data.data === true) {
							setStatus(prev => ({
								...prev,
								email: {
									tip: t("msg_MailExisted"),
									checked: false
								}
							}));
							return false;
						}
						if (data.data === false) {
							setStatus(prev => ({
								...prev,
								email: {
									tip: "",
									checked: true
								}
							}));
							return true;
						}
					} else {
						openErrorMessagePopBox(
							data.message || "error",
							data.errorCode
						);
					}
				}
			}
		} catch (err) {
			if (isMountedRef.current) {
				setStatus(prev => ({
					...prev,
					email: {
						tip: "",
						checked: false
					}
				}));
				handleError({ setPopBox, t, err });
			}
		}
	};

	const checkEmail = async () => {
		let checkResult = false;
		const emailRegex =
			/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

		if (userInfo.email) {
			checkResult = true;
		} else if (!emailValue) {
			checkResult = false;
			setStatus(prev => ({
				...prev,
				email: {
					tip: t("lbl_EmailRequired"),
					checked: checkResult
				}
			}));
		} else if (!emailRegex.test(emailValue)) {
			checkResult = false;
			setStatus(prev => ({
				...prev,
				email: {
					tip: t("lbl_EmailFormatError"),
					checked: checkResult
				}
			}));
		} else {
			setStatus(prev => ({
				...prev,
				email: {
					tip: "",
					checked: "loading"
				}
			}));

			checkResult = await checkEmailIsUnique();
		}

		return checkResult;
	};

	const submitCheck = async () => {
		Promise.all([checkEmail(), checkPhone()]).then(res => {
			if (
				checkName() === true &&
				checkBirth() === true &&
				res[0] === true &&
				res[1] === true
			) {
				if (!userInfo.accountName) {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.ProfileConfirmCheck,
						accountName: nameValue,
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-cancel"
									onClick={ClickClose}
								>
									{t("lbl_ReModify")}
								</button>
								<button
									className="btn-check"
									onClick={submitProfile}
								>
									{t("lbl_Confirm")}
								</button>
							</div>
						)
					});
				} else {
					submitProfile();
				}
			}
		});
	};

	const clickInfo = col => {
		const prevTip = status[col].tip;
		if (col === "accountName") {
			setStatus(prev => ({
				...prev,
				accountName: {
					tip: prevTip === "" ? t("lbl_RemindForName") : "",
					checked: null
				}
			}));
		} else if (col === "phoneNo") {
			setStatus(prev => ({
				...prev,
				phoneNo: {
					tip: prevTip === "" ? t("lbl_PhoneTooltip") : "",
					checked: null
				}
			}));
		} else if (col === "email") {
			setStatus(prev => ({
				...prev,
				email: {
					tip: prevTip === "" ? t("lbl_EmailToolTip") : "",
					checked: null
				}
			}));
		}
	};

	const submitProfile = () => {
		ClickClose();
		setLoading(true);

		const _prevPage = getUrlParameter("prevPage");

		api_accountStrict_SetProfile({
			AccountName: !userInfo.accountName
				? nameValue
				: userInfo.accountName,
			Birth_d: !userInfo.birth_d
				? birthValue.slice(8, 10)
				: userInfo.birth_d,
			Birth_m: !userInfo.birth_d
				? birthValue.slice(5, 7)
				: userInfo.birth_m,
			Birth_y: !userInfo.birth_d
				? birthValue.slice(0, 4)
				: userInfo.birth_y,
			CountryCode: userInfo.country,
			AreaCode: userInfo.AreaCode,
			PhoneNo: !userInfo.phoneNo ? phoneValue : userInfo.phoneNo,
			Email: !userInfo.email ? emailValue : userInfo.email
		}).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setLoading(false);
						setUserInfo(prev => ({
							...prev,
							accountName: !userInfo.accountName
								? nameValue
								: userInfo.accountName,
							birth_d: !userInfo.birth_d
								? birthValue.slice(8, 10)
								: userInfo.birth_d,
							birth_m: !userInfo.birth_d
								? birthValue.slice(5, 7)
								: userInfo.birth_m,
							birth_y: !userInfo.birth_d
								? birthValue.slice(0, 4)
								: userInfo.birth_y,
							phoneNo: !userInfo.phoneNo
								? phoneValue
								: userInfo.phoneNo,
							email: !userInfo.email ? emailValue : userInfo.email
						}));
						setNameValue("");
						setBirthValue("");
						setPhoneValue("");
						setEmailValue("");

						if (!userInfo.phoneVerified)
							return setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.ProfileCompelete,
								contentMsg: t("lbl_VertifyContactConfirm"),
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-cancel"
											onClick={ClickClose}
										>
											{t("lbl_Later")}
										</button>
										<button
											className="btn-check"
											onClick={sendOTPSMS}
										>
											{t("lbl_VertifyNow")}
										</button>
									</div>
								)
							});

						if (defPrevPage[_prevPage])
							return setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.ProfileCompelete,
								contentMsg: t(
									defPrevPage[_prevPage].contentMsg
								),
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-cancel"
											onClick={ClickClose}
										>
											{t("lbl_Later")}
										</button>
										<Link
											className="btn-check"
											to={`/${userInfo.langId}/${defPrevPage[_prevPage].path}`}
										>
											{t(defPrevPage[_prevPage].label)}
										</Link>
									</div>
								)
							});
					} else {
						openErrorMessagePopBox(
							res.data.message || `error`,
							res.data.errorCode
						);
					}
				}
			},
			() => {
				if (isMountedRef.current) {
					setLoading(false);
					openErrorMessagePopBox();
				}
			}
		);
	};

	const sendOTPSMS = () => {
		ClickClose();
		setMobileVerificationLoading(true);

		api_accountStrict_SendOTPSMS().then(
			res => {
				if (isMountedRef.current) {
					const {
						data: { data, errorCode, message }
					} = res;
					const success = errorCode === 0;
					const alreadyVerifiedPhone = errorCode === 5001;

					if (alreadyVerifiedPhone) {
						setUserInfo(prev => ({
							...prev,
							phoneVerified: true
						}));
						ClickClose();
					} else if (success) {
						setPopBox({
							isOpen: true,
							startUnixTime: data?.startUnixTime,
							popBoxType: defPopBoxType.VerifyPhoneForm
						});
					} else {
						openErrorMessagePopBox(
							errorCode === 5002
								? t(`msg_API_SendOTPSMS_${errorCode}`)
								: errorCode === 1000
								? t("msg_OTP_Invalid")
								: message || `error`,
							errorCode
						);
					}
					setMobileVerificationLoading(false);
				}
			},
			() => {
				if (isMountedRef.current) {
					openErrorMessagePopBox();
					setMobileVerificationLoading(false);
				}
			}
		);
	};

	const sendEmailOtp = () => {
		api_accountStrict_SendOTPEmail().then(
			res => {
				const { errorCode, message } = res.data;
				if (errorCode === 0) {
					const clickClose = () => {
						setPopBox({ isOpen: false });
					};

					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.Success,
						titleIcon: "icon-bell",
						message1: "lbl_EmailOTPHint1",
						onClickClose: clickClose,
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-check"
									onClick={clickClose}
								>
									OK
								</button>
							</div>
						)
					});
				} else {
					openErrorMessagePopBox(message || "error", errorCode);
				}
			},
			() => {
				openErrorMessagePopBox();
			}
		);
	};

	const { tokenPassed } = useVerifyEmail({
		langId: userInfo.langId,
		t,
		setPopBox,
		setUserInfo,
		openErrorMessagePopBox
	});

	if (loading || !tokenPassed) return <Loading />;

	return (
		<div className="infoModule">
			<div className="inside-title">
				<p>{t("lbl_Profile")}</p>
			</div>

			<div className="profileGrade">
				{userInfo?.userLevel ? (
					<VerificationPanel
						t={t}
						userLevel={userInfo.userLevel}
						accountName={userInfo.accountName}
						phoneVerified={userInfo.phoneVerified}
						emailVerified={userInfo.emailVerified}
						phoneReward={userInfo.phoneReward}
						emailReward={userInfo.emailReward}
					/>
				) : null}

				<ProfileEdit
					t={t}
					userInfo={userInfo}
					onChangeName={onChangeName}
					onChangeBirth={onChangeBirth}
					onChangePhone={onChangePhone}
					onChangeEmail={onChangeEmail}
					nameValue={nameValue}
					birthValue={birthValue}
					phoneValue={phoneValue}
					emailValue={emailValue}
					checkName={checkName}
					checkBirth={checkBirth}
					checkPhone={checkPhone}
					checkEmail={checkEmail}
					clickInfo={clickInfo.bind(this)}
					status={status}
					sendOTPSMS={sendOTPSMS}
					mobileVerificationLoading={mobileVerificationLoading}
					sendEmailOtp={sendEmailOtp}
				/>
			</div>

			{!userInfo.accountName ||
			!userInfo.birth_d ||
			!userInfo.phoneNo ||
			!userInfo.email ? (
				<div className="btnGroup">
					<button className="blueGradient" onClick={submitCheck}>
						{t("lbl_Submit")}
					</button>
				</div>
			) : null}
		</div>
	);
};
