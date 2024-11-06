import React, { useState, useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Link, navigate } from "gatsby";
import Inputbox from "./inputbox";
import InputboxPSW from "./inputbox.password";
import { LOGIN } from "../../service/auth";
import { userInfoContext, popBoxContext } from "./context";
import path from "../../router";
import { isDateRange } from "./common";
import { eventPeriodIdpd } from "../../datas/eventDef";
import { bannerImgUrl } from "../../config";
import useShieldCheck from "../hook/useShieldCheck";
import { defPopBoxType } from "./defPopBoxType";
import useDepositWithdrawTracker from "../hook/useDepositWithdrawTracker";

const initValue = {
	userName: "",
	password: ""
};

const initStatus = {
	userName: {
		checked: null,
		msg: "",
		hint: "lbl_UsernameTooltip"
	},
	password: {
		checked: null,
		msg: "",
		hint: "lbl_PasswordTooltip"
	}
};

const LoginPanel = () => {
	const { t } = useTranslation();
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const [userValue, setUserValue] = useState(initValue);
	const { setPopBox } = useContext(popBoxContext);
	const [showPsw, setShowPsw] = useState(false);
	const [inputStatus, setInputStatus] = useState(initStatus);
	const [activeInfo, setActiveInfo] = useState("");

	const isMountedRef = useRef(null);
	const isInPeriodEvent = isDateRange(
		eventPeriodIdpd.startDate,
		eventPeriodIdpd.endDate
	);

	const { handleNotification } = useDepositWithdrawTracker();
	const { getShieldData, saveShieldData } = useShieldCheck();

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		getShieldData();
	}, []);

	const showPswHandler = () => {
		setShowPsw(!showPsw);
	};

	const clickInfo = col => {
		setActiveInfo(inputStatus[col].hint);
	};

	const EditField = (col, e) => {
		let val = e.target.value;

		if (col === "userName") {
			val = val.replace(/[\W_]/g, "");
		}

		setUserValue(prev => {
			return { ...prev, [col]: val };
		});
	};

	const checkValue = (col, val) => {
		let checked = true;
		let msg = "";

		if (val === "") {
			msg =
				col === "userName"
					? t("msg_UsernameReq")
					: t("msg_PasswordReq");
			checked = false;
		} else if (col === "userName" && (val.length < 6 || val.length > 18)) {
			checked = false;
			msg = t("msg_UsernameLength");
		}

		setInputStatus(prev => ({
			...prev,
			[col]: {
				checked,
				msg
			}
		}));
		return checked;
	};

	const handleLogin = async e => {
		e.preventDefault();
		const checkUsername = checkValue("userName", userValue.userName);
		const checkPassword = checkValue("password", userValue.password);
		const checkAll = checkUsername && checkPassword;
		if (checkAll) {
			await LOGIN({
				userName: userValue.userName,
				password: userValue.password,
				langId: userInfo.langId
			}).then(res => {
				if (res.errorCode === 0) {
					if (isMountedRef.current) {
						setUserInfo(() => ({
							...res.userData,
							isLogin: res.isLogin
						}));

						setPopBox({ isOpen: false });
						navigate(`/${userInfo.langId}`);
						saveShieldData();
						setInputStatus(initStatus);
						setActiveInfo("");

						// 獲取使用者財務通知設定
						const { financeNotification, soundEffects } =
							res.userData ?? {};
						handleNotification(financeNotification, soundEffects);
					}
				} else if (
					res.errorCode === 1101 ||
					res.errorCode === 1102 ||
					res.errorCode === 9000
				) {
					if (isMountedRef.current) {
						setInputStatus(prev => ({
							...prev,
							userName: {
								checked: false,
								msg: res.message,
								hint: "lbl_UsernameTooltip"
							}
						}));
						setActiveInfo("");
					}
				} else if (res.errorCode === 1001) {
					if (isMountedRef.current) {
						setInputStatus(prev => ({
							...prev,
							password: {
								checked: false,
								msg: res.message,
								hint: "lbl_PasswordTooltip"
							}
						}));
						setActiveInfo("");
					}
				}
			});
		}
	};

	const clickCancel = () => {
		setPopBox({ isOpen: false });
	};

	const openJoin = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Join,
			customLayout: true
		});
	};
	return (
		<div className="login-module popup active">
			<LoginForm
				t={t}
				clickCancel={clickCancel}
				userInfo={userInfo}
				path={path}
				openJoin={openJoin}
				handleLogin={handleLogin}
				userValue={userValue}
				EditField={EditField}
				checkValue={checkValue}
				clickInfo={clickInfo}
				showPsw={showPsw}
				showPswHandler={showPswHandler}
				isInPeriodEvent={isInPeriodEvent}
				inputStatus={inputStatus}
				activeInfo={activeInfo}
				setActiveInfo={setActiveInfo}
			/>
		</div>
	);
};

export default LoginPanel;

export const LoginForm = ({
	t,
	clickCancel,
	userInfo,
	openJoin,
	handleLogin,
	userValue,
	EditField,
	checkValue,
	clickInfo,
	showPsw,
	showPswHandler,
	inputStatus,
	activeInfo,
	setActiveInfo
}) => {
	return (
		<form onSubmit={handleLogin}>
			<button
				type="button"
				className="icon-close-primary"
				onClick={clickCancel}
			/>
			<div className="left">
				<img
					className="login-logo"
					src={`${bannerImgUrl}/desktop/img/4.0/logo.png`}
					alt="login-logo"
				/>
				<img
					className="login-banner"
					src={`${bannerImgUrl}/desktop/img/4.0/loginjoin-banner.png`}
					alt="login-banner"
				/>
				<div className="join-bottominfo">
					{t("lbl_PoweredBy")} Bong88
				</div>
			</div>
			<div className="right">
				<div className="login-title">{t("lbl_Login")}</div>

				<Inputbox
					placeholder={t("lbl_Username")}
					value={userValue.userName}
					onChange={e => EditField("userName", e)}
					onBlur={() => checkValue("userName", userValue.userName)}
					clickInfo={() => clickInfo("userName")}
					checked={inputStatus.userName.checked}
					tip={inputStatus.userName.msg}
					warningIcon="icon-warning"
					border={false}
					icon="icon-profile"
					hint={inputStatus.userName.hint}
					activeInfo={activeInfo}
					setActiveInfo={setActiveInfo}
				/>

				<InputboxPSW
					// icon="icon-key txt-blue12"
					inputType={`${!showPsw ? "password" : "text"}`}
					placeholder={t("lbl_Password")}
					value={userValue.password}
					onChange={e => EditField("password", e)}
					onBlur={() => checkValue("password", userValue.password)}
					showPsw={showPsw}
					showPswHandler={showPswHandler}
					checked={inputStatus.password.checked}
					clickInfo={() => clickInfo("password")}
					tip={inputStatus.password.msg}
					border={false}
					icon="icon-profile"
					hint={inputStatus.password.hint}
					activeInfo={activeInfo}
					setActiveInfo={setActiveInfo}
				/>
				<Link
					className="login-forget"
					to={`/${userInfo.langId}/${path.forgetPassword.root}`}
				>
					{t("lbl_ForgetPassword")}
				</Link>
				<div className="btn-group">
					<button type="submit" className="btn-primary">
						{t("lbl_Login")}
					</button>
				</div>
				<div className="login-message">
					{t("lbl_DontHaveAccount")}
					<a onClick={openJoin}>{t("lbl_JoinNow")}</a>
				</div>
			</div>
		</form>
	);
};

LoginForm.propTypes = {
	t: PropTypes.func.isRequired,
	clickCancel: PropTypes.func.isRequired,
	openJoin: PropTypes.func.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	handleLogin: PropTypes.func.isRequired,
	userValue: PropTypes.objectOf(PropTypes.any).isRequired,
	EditField: PropTypes.func.isRequired,
	checkValue: PropTypes.func.isRequired,
	clickInfo: PropTypes.func.isRequired,
	showPsw: PropTypes.bool.isRequired,
	showPswHandler: PropTypes.func.isRequired,
	inputStatus: PropTypes.objectOf(PropTypes.any).isRequired,
	activeInfo: PropTypes.string.isRequired,
	setActiveInfo: PropTypes.func.isRequired
};
