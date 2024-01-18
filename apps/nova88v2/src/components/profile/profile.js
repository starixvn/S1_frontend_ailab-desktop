import React, { useEffect, useRef, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Link } from "gatsby";
import { INPUT_PATTERN } from "@ailab-desktop/format-pattern";
import { userInfoContext, popBoxContext } from "../common/context";
import { InfoList, initValue, initStatus } from "./profile.data";
import areaCode from "../../datas/areaCode";
import { api_account_ExistsPhone } from "../../service/api/account";
import {
	api_accountStrict_SetProfile,
	api_accountStrict_SetProfileAddress,
	api_accountStrict_SendOTPSMS,
	api_accountStrict_SendOTPEmail
} from "../../service/api/accountStrict";
import defPopBoxType from "../common/defPopBoxType";
import usePopBox from "../hook/usePopBox";
import ProfileForm from "./profile.form";
import ProfileAddrForm from "./profile.addrForm";
import { getUrlParameter } from "../common/common";
import { defPrevPage } from "./profile.def";
import Loading from "../common/loading";
import {
	api_site_ExistsEmail,
	api_site_GetCountryList
} from "../../service/api/site";
import { currencyCode } from "../../datas/countryCode";
import VerificationPanel from "./verificationPanel";
import useVerifyEmail from "./hook/useVerifyEmail";
import { areaCodeList } from "../join/join";

export default () => {
	const { t } = useTranslation();
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox } = usePopBox();
	const [userValue, setUserValue] = useState(initValue);
	const [status, setStatus] = useState(initStatus);
	const [loading, setLoading] = useState(true);
	const isMountedRef = useRef(null);
	const [countryList, setCountryList] = useState([]);
	const addrList = InfoList({ countryList }).filter(obj => obj.code);
	const infoList = InfoList({ countryList }).filter(obj => !obj.code);
	const [mobileVerificationLoading, setMobileVerificationLoading] =
		useState(false);
	const country =
		userInfo.country && userInfo.country !== "null"
			? userInfo.country
			: userInfo.perCountry;

	const isUSDT = userInfo.currencyId === currencyCode.USDT;
	const allAreaCodeArr = Object.values(areaCode)
		.map(a => a.AreaCode)
		.sort();
	const areaCodeOptions = [...new Set(allAreaCodeArr)].map((_a, idx) => ({
		id: idx,
		displayText: _a
	}));

	let _areaCodeVal = "";
	if (country) {
		_areaCodeVal = areaCode[country].AreaCode;
	} else if (userInfo?.areaCode) {
		_areaCodeVal = userInfo?.areaCode;
	}

	const hasRequireValueNull = type => {
		let result;
		switch (type) {
			case "profile": {
				result =
					(!userInfo.accountName && userValue.accountName === "") ||
					(!userInfo.birth_d && userValue.birth === "") ||
					(!userInfo.phoneNo && userValue.phoneNo === "") ||
					(!userInfo.email && userValue.email === "");
				break;
			}
			case "addr": {
				result =
					(!userInfo.addressLineFirst &&
						userValue.addressLineFirst === "") ||
					(!userInfo.addressCity && userValue.addressCity === "") ||
					(!userInfo.addressPostCode &&
						userValue.addressPostCode === "") ||
					(!userInfo.addressState && userValue.addressState === "") ||
					(!userInfo.addressCountry &&
						userValue.addressCountry === "");
				break;
			}
			default:
				break;
		}
		return result;
	};

	const hasCheckFalseStatus = type => {
		const profileStatus = {
			accountName: status.accountName,
			birth: status.birth,
			phoneNo: status.phoneNo,
			email: status.email
		};
		const addrStatus = {
			addressLineFirst: status.addressLineFirst,
			addressCity: status.addressCity,
			addressPostCode: status.addressPostCode,
			addressState: status.addressState,
			addressCountry: status.addressCountry
		};
		return Object.values(type === "profile" ? profileStatus : addrStatus)
			.map(item => item.checked)
			.includes(false);
	};

	const disableSubmit = type =>
		hasRequireValueNull(type) || hasCheckFalseStatus(type);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (isMountedRef.current) {
			if (userInfo.isLogin) {
				api_site_GetCountryList({ langId: userInfo.langId }).then(
					res => {
						if (res.data.errorCode === 0) {
							setCountryList(res.data.data);
						} else {
							openErrorMessagePopBox(
								res.data.message || "error",
								res.data.errorCode
							);
						}
					},
					() => {
						openErrorMessagePopBox();
					}
				);
			}
		}
	}, [userInfo.langId]);

	useEffect(() => {
		if (
			userInfo.accountName !== undefined ||
			userInfo.phoneNo !== undefined ||
			userInfo.addressCity !== undefined
		) {
			setLoading(false);
		}
	}, [userInfo.accountName, userInfo.phoneNo, userInfo.addressCity]);

	const onSelectAreaCode = i => {
		setUserValue(prev => ({ ...prev, areaCodeIdx: i }));
		phoneCheck("areaCode", i);
	};

	const closePopBox = () => {
		setPopBox({ isOpen: false });
	};

	const openErrorMessagePopBox = (
		message = t("msg_ApiServerError"),
		errorCode = null
	) => {
		setPopBox({
			message,
			errorCode,
			isOpen: true,
			popBoxType: defPopBoxType.ErrorMsg,
			icon: "icon-bell",
			btnBar: (
				<div className="btnGroup">
					<button className="btn-check" onClick={closePopBox}>
						{t("lbl_Close")}
					</button>
				</div>
			)
		});
	};

	const clickInfo = col => {
		let _tip = "";

		switch (col) {
			case "accountName":
				_tip =
					status.accountName.tip === "" ? t("lbl_RemindForName") : "";
				break;
			case "phoneNo":
				_tip = status.phoneNo.tip === "" ? t("lbl_PhoneTooltip") : "";
				break;
			case "addressLineFirst":
				_tip =
					status.addressLineFirst.tip === ""
						? t("msg_EnterAddress")
						: "";
				break;
			case "addressLineSecond":
				_tip =
					status.addressLineSecond.tip === ""
						? t("msg_EnterAddress")
						: "";
				break;
			case "addressCity":
				_tip = status.addressCity.tip === "" ? t("msg_EnterCity") : "";
				break;
			case "addressPostCode":
				_tip =
					status.addressPostCode.tip === ""
						? t("msg_EnterPostCode")
						: "";
				break;
			case "addressState":
				_tip =
					status.addressState.tip === "" ? t("msg_EnterState") : "";
				break;
			case "addressCountry":
				_tip =
					status.addressCountry.tip === ""
						? t("msg_EnterCountry")
						: "";
				break;
		}

		setStatus(prev => ({
			...prev,
			[col]: {
				checked: null,
				tip: _tip
			}
		}));
	};

	const valueCheck = (val, col) => {
		let checked = true;
		let tip = "";
		const addrCheckList = [
			"addressLineFirst",
			"addressCity",
			"addressPostCode",
			"addressState",
			"addressCountry"
		];

		if (col === "accountName") {
			if (!val) {
				tip = t("lbl_NameRequired");
				checked = !!val;
			} else if (
				// * 如果使用者有填入特殊字元則顯示錯誤訊息
				String(val).match(
					INPUT_PATTERN.userNameSpecialCharactersPattern
				)
			) {
				tip = t("lbl_EnterRealName");
				checked = false;
			}
		} else if (col === "birth") {
			const pattern =
				/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
			if (!val) {
				tip = t("lbl_BirthRequired");
				checked = !!val;
			}
			if (!pattern.test(val)) {
				tip = t("lbl_BirthdayErrorTip");
				checked = false;
			}
		} else if (addrCheckList.includes(col)) {
			tip = !val ? t("msg_Content_Not_Empty") : "";
			checked = !!val;
		}

		setStatus(prev => ({
			...prev,
			[col]: {
				checked,
				tip
			}
		}));

		return checked;
	};

	const editField = (col, e) => {
		let val = null;
		const addrInputList = [
			"addressLineFirst",
			"addressLineSecond",
			"addressCity",
			"addressState",
			"addressCountry"
		];
		if (col === "birth") {
			val = moment(e).format("YYYY-MM-DD");
		} else if (col === "accountName") {
			val = String(e.target.value).replace(
				INPUT_PATTERN.userNameSpecialCharactersPattern,
				""
			);
		} else if (col === "email") {
			val = e.target.value;
		} else if (addrInputList.includes(col)) {
			val = e.target.value;
		} else {
			val = e.target.value;
			val = val.replace(/[^0-9]+/g, "");
		}

		setUserValue(prev => ({
			...prev,
			[col]: val
		}));
	};

	const phoneCheck = (col, val) => {
		let checked = true;
		let tip = "";

		let _areaCode = areaCodeList[userValue.areaCodeIdx]?.areaCode;
		if (col === "areaCode") {
			_areaCode = areaCodeList[val]?.areaCode;
		}

		if (!_areaCode || (col === "phoneNo" && (!val || val === ""))) {
			checked = false;
			tip = t("lbl_PhoneRequired");
		} else {
			api_account_ExistsPhone({
				AreaCode: areaCodeList[userValue.areaCodeIdx]?.areaCode,
				Phone: col === "areaCode" ? userValue.phoneNo : val
			}).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							if (res.data.data) {
								setStatus(prev => ({
									...prev,
									phoneNo: {
										checked: false,
										tip: t("msg_PhoneExisted")
									}
								}));
							} else {
								setStatus(prev => ({
									...prev,
									phoneNo: {
										checked: true,
										tip: ""
									}
								}));
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
					if (!isMountedRef.current) return;
					errorPopBox();
				}
			);
		}
		setStatus(prev => ({
			...prev,
			phoneNo: {
				checked,
				tip
			}
		}));

		return checked;
	};

	const emailCheck = async val => {
		let checked = true;
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
						setStatus(prev => ({
							...prev,
							email: {
								checked: false,
								tip: t("msg_MailExisted")
							}
						}));
					} else {
						setStatus(prev => ({
							...prev,
							email: {
								checked,
								tip: msg
							}
						}));
					}
				} else {
					errorPopBox(
						res.data.message || "error",
						res.data.errorCode
					);
				}
			}
		} else {
			setStatus(prev => ({
				...prev,
				email: {
					checked,
					tip: msg
				}
			}));
		}

		return { checked, msg };
	};

	const clickSubmit = (e, type) => {
		e.preventDefault();
		if (disableSubmit(type)) return;
		let accountNameCheck;
		let birthCheck;
		let phoneNoCheck;
		let addrListCheck;
		if (type === "profile") {
			accountNameCheck = userInfo.accountName
				? true
				: valueCheck(userValue.accountName, "accountName");

			birthCheck = userInfo.birth_d
				? true
				: valueCheck(userValue.birth, "birth");
			phoneNoCheck = userInfo.phoneNo
				? true
				: phoneCheck("phoneNo", userValue.phoneNo);
		} else if (type === "addr") {
			addrListCheck = addrList.filter(obj =>
				userInfo[obj.code]
					? true
					: valueCheck(userValue[obj.code], obj.code)
			);
		}

		const SetProfileOrAddr = () => {
			const profileDatas =
				type === "profile"
					? {
							AccountName:
								userInfo.accountName &&
								userInfo.accountName !== ""
									? userInfo.accountName
									: userValue.accountName,
							Birth_d:
								userInfo.birth_d ??
								userValue.birth.slice(8, 10),
							Birth_m:
								userInfo.birth_m ?? userValue.birth.slice(5, 7),
							Birth_y:
								userInfo.birth_y ?? userValue.birth.slice(0, 4),
							// CountryCode: country,
							CountryCode: "",
							AreaCode:
								userInfo.areaCode && userInfo.areaCode !== ""
									? userInfo.areaCode
									: areaCodeList[userValue.areaCodeIdx]
											?.areaCode,
							PhoneNo:
								userInfo.phoneNo && userInfo.phoneNo !== ""
									? userInfo.phoneNo
									: userValue.phoneNo,
							Email:
								userInfo.email && userInfo.email !== ""
									? userInfo.email
									: userValue.email
					  }
					: {
							AddressCountry:
								userInfo.addressCountry &&
								userInfo.addressCountry !== ""
									? userInfo.addressCountry
									: userValue.addressCountry,
							AddressState:
								userInfo.addressState &&
								userInfo.addressState !== ""
									? userInfo.addressState
									: userValue.addressState,
							AddressPostCode:
								userInfo.addressPostCode &&
								userInfo.addressPostCode !== ""
									? userInfo.addressPostCode
									: userValue.addressPostCode,
							AddressCity:
								userInfo.addressCity &&
								userInfo.addressCity !== ""
									? userInfo.addressCity
									: userValue.addressCity,
							AddressLineFirst:
								userInfo.addressLineFirst &&
								userInfo.addressLineFirst !== ""
									? userInfo.addressLineFirst
									: userValue.addressLineFirst,
							AddressLineSecond:
								userInfo.addressLineSecond &&
								userInfo.addressLineSecond !== ""
									? userInfo.addressLineSecond
									: userValue.addressLineSecond
					  };

			const fulfillHandle = res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setUserInfo(prev =>
							type === "profile"
								? {
										...prev,
										accountName: profileDatas.AccountName,
										birth_d: profileDatas.Birth_d,
										birth_m: profileDatas.Birth_m,
										birth_y: profileDatas.Birth_y,
										phoneNo: profileDatas.PhoneNo,
										areaCode: profileDatas.AreaCode,
										email: profileDatas.Email
								  }
								: {
										...prev,
										addressLineFirst:
											profileDatas.AddressLineFirst,
										addressLineSecond:
											profileDatas.AddressLineSecond,
										addressCity: profileDatas.AddressCity,
										addressPostCode:
											profileDatas.AddressPostCode,
										addressState: profileDatas.AddressState,
										addressCountry:
											profileDatas.AddressCountry
								  }
						);

						setUserValue(initValue);
						setStatus(initStatus);

						const prevPage = getUrlParameter("prevPage");

						if (!userInfo.phoneVerified)
							return setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.ProfileCompelete,
								contentMsg: t("lbl_VertifyContactConfirm"),
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-cancel"
											onClick={closePopBox}
										>
											{t("lbl_Later")}
										</button>
										<button
											className="blue"
											onClick={sendOTPSMS}
										>
											{t("lbl_VertifyNow")}
										</button>
									</div>
								)
							});

						if (defPrevPage[prevPage])
							return setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.ProfileCompelete,
								contentMsg: t(defPrevPage[prevPage].contentMsg),
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-cancel"
											onClick={closePopBox}
										>
											{t("lbl_Later")}
										</button>
										<Link
											className="btn-check"
											to={`/${userInfo.langId}/${defPrevPage[prevPage].path}`}
										>
											{t(defPrevPage[prevPage].label)}
										</Link>
									</div>
								)
							});
					} else {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: `[${res.data.errorCode}] ${res.data.message}`,
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-check"
										onClick={closePopBox}
									>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
					}
				}
				setLoading(false);
				return null;
			};

			const rejectHandle = () => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.ErrorMsg,
						message: t("msg_ApiServerError"),
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-check"
									onClick={closePopBox}
								>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
					setLoading(false);
				}
			};
			closePopBox();
			setLoading(false);

			if (type === "profile") {
				api_accountStrict_SetProfile(profileDatas).then(
					res => fulfillHandle(res),
					rejectHandle
				);
			} else {
				api_accountStrict_SetProfileAddress(profileDatas).then(
					res => fulfillHandle(res),
					rejectHandle
				);
			}
		};

		if (
			(type === "profile" &&
				accountNameCheck &&
				birthCheck &&
				phoneNoCheck) ||
			(type === "addr" && addrListCheck)
		) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.ProfileConfirmCheck,
				accountName: userValue.accountName,
				btnBar: (
					<div className="btnGroup">
						<button className="btn-cancel" onClick={closePopBox}>
							{t("lbl_ReModify")}
						</button>
						<button
							className="btn-check"
							onClick={SetProfileOrAddr}
						>
							{t("lbl_Confirm")}
						</button>
					</div>
				)
			});
		}
	};

	const sendOTPSMS = () => {
		setMobileVerificationLoading(true);

		api_accountStrict_SendOTPSMS().then(
			res => {
				if (isMountedRef.current) {
					const { errorCode, message } = res.data;
					const startUnixTime = res.data.data?.startUnixTime;

					const success = errorCode === 0;
					const alreadyVerifiedPhone = errorCode === 5001;

					if (alreadyVerifiedPhone) {
						setUserInfo(prev => ({
							...prev,
							phoneVerified: true
						}));
						closePopBox();
					} else if (success) {
						setPopBox({
							isOpen: true,
							startUnixTime,
							popBoxType: defPopBoxType.VerifyPhoneForm
						});
					} else {
						let errorMsg = `[${errorCode}] ${message}`;
						if (errorCode === 5002) {
							errorMsg = t(`msg_API_SendOTPSMS_${errorCode}`);
						} else if (errorCode === 1000) {
							errorMsg = t("msg_OTP_Invalid");
						}
						openErrorMessagePopBox(errorMsg);
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
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.Success,
						icon: "icon icon-bell",
						description: <div>{t("lbl_EmailOTPHint1")}</div>,
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-check"
									onClick={() => {
										setPopBox({ isOpen: false });
									}}
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
				<span className="icon icon-icon32px_Profile">
					{t("lbl_Profile")}
				</span>
				<div>{t("lbl_ProfileModifyWarning")}</div>
			</div>

			<div className="profileModule">
				<VerificationPanel
					t={t}
					userLevel={userInfo.userLevel}
					langId={userInfo.langId}
					accountName={userInfo.accountName}
					phoneVerified={userInfo.phoneVerified}
					emailVerified={userInfo.emailVerified}
					currencyId={userInfo.currencyId}
					phoneReward={userInfo.phoneReward}
					emailReward={userInfo.emailReward}
					isLineBinding={userInfo.isLineBinding}
				/>

				<ProfileForm
					t={t}
					infoList={infoList}
					mobileVerificationLoading={mobileVerificationLoading}
					areaCodeVal={_areaCodeVal}
					sendOTPSMS={sendOTPSMS}
					userInfo={userInfo}
					userValue={userValue}
					status={status}
					editField={editField}
					valueCheck={valueCheck}
					phoneCheck={phoneCheck}
					emailCheck={emailCheck}
					clickInfo={clickInfo}
					clickSubmit={e => clickSubmit(e, "profile")}
					isUSDT={isUSDT}
					areaCodeOptions={areaCodeOptions}
					onSelectAreaCode={onSelectAreaCode}
					sendEmailOtp={sendEmailOtp}
				/>
			</div>

			{!userInfo?.accountName ||
			!userInfo?.birth_d ||
			!userInfo?.phoneNo ||
			!userInfo.email ? (
				<div className="btnGroup">
					<button
						className={
							disableSubmit("profile")
								? "btn-cancel"
								: "btn-check"
						}
						onClick={e => clickSubmit(e, "profile")}
					>
						{t("lbl_Submit")}
					</button>
				</div>
			) : null}

			<div className="addressModule">
				<ProfileAddrForm
					t={t}
					userInfo={userInfo}
					userValue={userValue}
					status={status}
					editField={editField}
					valueCheck={valueCheck}
					addrList={addrList}
					disableSubmit={disableSubmit("addr")}
					clickInfo={clickInfo}
					clickSubmit={e => clickSubmit(e, "addr")}
				/>
			</div>
		</div>
	);
};
