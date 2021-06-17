import React, { useEffect, useRef, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { Link } from "@reach/router";
import { userInfoContext, popBoxContext } from "../common/context";
import { InfoList, initValue, initStatus, DisplayRow } from "./profile.data";
import areaCode from "../../datas/areaCode";
import { api_account_ExistsPhone } from "../../service/api/account";
import {
	api_accountStrict_SetProfile,
	api_accountStrict_SendOTPSMS
} from "../../service/api/accountStrict";
import defPopBoxType from "../common/defPopBoxType";
import usePopBox from "../hook/usePopBox";
import ProfileEdit from "./profile.edit";
import ProfileRead from "./profile.read";
import { getUrlParameter } from "../common/common";
import { defPrevPage } from "./profile.dev";
import Loading from "../common/loading";
import { defPageClubImg } from "../vip/vip.def";
import { api_site_GetCountryList } from "../../service/api/site";
import { currencyCode } from "../../datas/countryCode";

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
	const infoList = InfoList({ countryList });
	const [mobileVerificationLoading, setMobileVerificationLoading] = useState(
		false
	);
	const country =
		userInfo.country && userInfo.country !== "null"
			? userInfo.country
			: userInfo.perCountry;

	const isUSDT = userInfo.currencyId === currencyCode.USDT;
	const allAreaCodeArr = Object.values(areaCode)
		.map(a => a.AreaCode)
		.sort();
	const areaCodeOptions = [...new Set(allAreaCodeArr)].map((_a, idx) => {
		return {
			id: idx,
			displayText: _a
		};
	});
	const usdtAreaCode = userValue.areaCodeIdx
		? areaCodeOptions[userValue.areaCodeIdx - 1].displayText
		: "";

	const _areaCodeVal = isUSDT
		? usdtAreaCode
		: country
		? areaCode[country].AreaCode
		: "";

	const hasRequireValueNull =
		(!userInfo.accountName && userValue.accountName === "") ||
		(!userInfo.birth_d && userValue.birth === "") ||
		(!userInfo.phoneNo &&
			(userValue.phoneNo === "" || _areaCodeVal === ""));

	const hasCheckFalseStatus = Object.values(status)
		.map(item => item.checked)
		.includes(false);

	const disableSubmit = hasRequireValueNull || hasCheckFalseStatus;

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
						}
					}
				);
			}
		}
	}, [userInfo.langId]);

	useEffect(() => {
		if (
			userInfo.accountName !== undefined ||
			userInfo.phoneNo !== undefined
		) {
			setLoading(false);
		}
	}, [userInfo.accountName, userInfo.phoneNo]);

	const onSelectAreaCode = i => {
		setUserValue(prev => {
			return { ...prev, areaCodeIdx: i + 1 };
		});
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

		if (col === "accountName") {
			_tip = status.accountName.tip === "" ? t("lbl_RemindForName") : "";
		} else {
			_tip = status.phoneNo.tip === "" ? t("lbl_PhoneTooltip") : "";
		}

		setStatus(prev => ({
			...prev,
			[col]: {
				checked: null,
				tip: _tip
			}
		}));
	};

	const editField = (col, e) => {
		let val = null;

		if (col === "birth") {
			val = moment(e).format("YYYY-MM-DD");
		} else if (col === "accountName") {
			val = e.target.value;
			const pattern = new RegExp(/["'`_^+-@#!<>%;)(&$.]/);
			val = val.replace(pattern, "");
		} else {
			val = e.target.value;
			val = val.replace(/[^\d]+/g, "");
		}

		setUserValue(prev => ({
			...prev,
			[col]: val
		}));
	};

	const phoneCheck = (col, val) => {
		let checked = true;
		let tip = "";

		if (_areaCodeVal === "") {
			checked = false;
			tip = t("lbl_PhoneRequired");
		} else if (
			(col === "areaCode" && userValue?.phoneNo.length < 1) ||
			(col === "phoneNo" && (!val || val === ""))
		) {
			checked = false;
			tip = t("lbl_PhoneRequired");
		} else {
			api_account_ExistsPhone({
				AreaCode: _areaCodeVal,
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

	const valueCheck = (val, col) => {
		let checked = true;
		let tip = "";

		if (col === "accountName") {
			tip = !val ? t("lbl_NameRequired") : "";
			checked = !!val;
		} else if (col === "birth") {
			tip = !val ? t("lbl_BirthRequired") : "";
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

	const clickSubmit = e => {
		e.preventDefault();

		if (disableSubmit) return;

		const accountNameCheck = userInfo.accountName
			? true
			: valueCheck(userValue.accountName, "accountName");

		const birthCheck = userInfo.birth_d
			? true
			: valueCheck(userValue.birth, "birth");

		const phoneNoCheck = userInfo.phoneNo
			? true
			: phoneCheck("phoneNo", userValue.phoneNo);

		const SetProfile = () => {
			const profileDatas = {
				AccountName: userInfo.accountName ?? userValue.accountName,
				Birth_d: userInfo.birth_d ?? userValue.birth.slice(8, 10),
				Birth_m: userInfo.birth_m ?? userValue.birth.slice(5, 7),
				Birth_y: userInfo.birth_y ?? userValue.birth.slice(0, 4),
				// CountryCode: country,
				CountryCode: "",
				AreaCode: userInfo.areaCode ?? _areaCodeVal,
				PhoneNo: userInfo.phoneNo ?? userValue.phoneNo
			};

			closePopBox();
			setLoading(true);

			api_accountStrict_SetProfile(profileDatas).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setUserInfo(prev => ({
								...prev,
								accountName: profileDatas.AccountName,
								birth_d: profileDatas.Birth_d,
								birth_m: profileDatas.Birth_m,
								birth_y: profileDatas.Birth_y,
								phoneNo: profileDatas.PhoneNo,
								country
							}));

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
												onClick={closePopBox}>
												{t("lbl_Later")}
											</button>
											<button
												className="blue"
												onClick={sendOTPSMS}>
												{t("lbl_VertifyNow")}
											</button>
										</div>
									)
								});

							if (defPrevPage[prevPage])
								return setPopBox({
									isOpen: true,
									popBoxType: defPopBoxType.ProfileCompelete,
									contentMsg: t(
										defPrevPage[prevPage].contentMsg
									),
									btnBar: (
										<div className="btnGroup">
											<button
												className="btn-cancel"
												onClick={closePopBox}>
												{t("lbl_Later")}
											</button>
											<Link
												className="btn-check"
												to={`/${userInfo.langId}/${defPrevPage[prevPage].path}`}>
												{t(defPrevPage[prevPage].label)}
											</Link>
										</div>
									)
								});
						} else {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.ErrorMsg,
								message: res.data.message,
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-check"
											onClick={closePopBox}>
											{t("lbl_Close")}
										</button>
									</div>
								)
							});
						}
					}
					setLoading(false);
				},
				err => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: t("msg_ApiServerError"),
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-check"
										onClick={closePopBox}>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
						setLoading(false);
					}
				}
			);
		};

		if (accountNameCheck && birthCheck && phoneNoCheck) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.ProfileConfirmCheck,
				accountName: userValue.accountName,
				btnBar: (
					<div className="btnGroup">
						<button className="btn-cancel" onClick={closePopBox}>
							{t("lbl_ReModify")}
						</button>
						<button className="btn-check" onClick={SetProfile}>
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
					const {
						data: {
							data: { startUnixTime },
							errorCode,
							message
						}
					} = res;
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
						openErrorMessagePopBox(
							errorCode === 5002
								? t(`msg_API_SendOTPSMS_${errorCode}`)
								: errorCode === 1000
								? t("msg_OTP_Invalid")
								: message ||
								  `[${errorCode}] ${t("msg_ApiServerError")}`,
							errorCode
						);
					}
					setMobileVerificationLoading(false);
				}
			},
			err => {
				if (isMountedRef.current) {
					openErrorMessagePopBox();
					setMobileVerificationLoading(false);
				}
			}
		);
	};

	const arr = infoList?.map(item => {
		let displayValue = item.content;

		if (item.format) {
			displayValue = item.format(item.content, item.bindingData);
		}

		return item.show ? (
			<DisplayRow
				key={`profile-${item.displayKey}`}
				t={t}
				displayKey={item.displayKey}
				content={displayValue}
				mobileVerificationLoading={mobileVerificationLoading}
				areaCode={_areaCodeVal}
				sendOTPSMS={sendOTPSMS}
			/>
		) : null;
	});

	const vipClubImg = userInfo.userLevel
		? defPageClubImg[userInfo.userLevel - 1]
		: {};

	return loading ? (
		<Loading />
	) : (
		<div className="infoModule">
			<div className="inside-title icon icon-icon32px_Profile">
				<span>{t("lbl_Profile")}</span>
				<div>{t("lbl_ProfileModifyWarning")}</div>
			</div>

			{userInfo?.userLevel ? (
				<div className="vipLv">
					<div className="vipbg">
						<img src={vipClubImg.url} alt={vipClubImg.alt} />
					</div>
					{userInfo.langId === "cs" ? (
						<div>
							{`${t(vipClubImg.displayKey)}${t("lbl_Club")}`}
						</div>
					) : (
						<div>{t(vipClubImg.displayKey)}</div>
					)}
				</div>
			) : null}

			{userInfo.accountName && userInfo.birth_d && userInfo.phoneNo ? (
				<ProfileRead
					t={t}
					infoList={infoList}
					mobileVerificationLoading={mobileVerificationLoading}
					areaCodeVal={_areaCodeVal}
					sendOTPSMS={sendOTPSMS}
				/>
			) : (
				<ProfileEdit
					t={t}
					userInfo={userInfo}
					userValue={userValue}
					status={status}
					arr={arr}
					editField={editField}
					valueCheck={valueCheck}
					phoneCheck={phoneCheck}
					clickInfo={clickInfo}
					clickSubmit={clickSubmit}
					isUSDT={isUSDT}
					areaCodeOptions={areaCodeOptions}
					onSelectAreaCode={onSelectAreaCode}
					_areaCodeVal={_areaCodeVal}
					disableSubmit={disableSubmit}
				/>
			)}
		</div>
	);
};
