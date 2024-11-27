import React, { useState, useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Link, navigate } from "gatsby";
import Inputbox from "./inputbox";
import InputboxPSW from "./inputbox.password";
import { LOGIN } from "../../service/auth";
import { userInfoContext, popBoxContext } from "./context";
import path from "../../router";
import { eventPeriodIdpd } from "../../datas/eventDef";
import { isDateRange } from "./common";
import { bannerImgUrl } from "../../config";
import useShieldCheck from "../hook/useShieldCheck";

const initValue = {
	username: "",
	password: ""
};

const initTip = {
	username: { checked: null, msg: "" },
	password: { checked: null, msg: "" }
};

const LoginPanel = () => {
	const { t } = useTranslation();
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const [userValue, setUserValue] = useState(initValue);
	const { popBox, setPopBox } = useContext(popBoxContext);
	const [tip, setTip] = useState(initTip);
	const [showPsw, setShowPsw] = useState(false);
	const isMountedRef = useRef(null);
	const isInPeriodEvent = isDateRange(
		eventPeriodIdpd.startDate,
		eventPeriodIdpd.endDate
	);
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
		let _msg =
			col === "username" ? t("msg_UsernameReq") : t("msg_PasswordReq");

		if (tip[col].msg === _msg) {
			_msg = "";
		}

		setTip(prev => ({
			...prev,
			[col]: {
				checked: tip[col].checked,
				msg: _msg
			}
		}));
	};

	const EditField = (col, e) => {
		let val = e.target.value;

		if (col === "username") {
			val = val.replace(/[\W_]/g, "");
		}

		setUserValue(prev => ({ ...prev, [col]: val }));
	};

	const checkValue = (col, val) => {
		let checked = true;
		let msg = "";

		if (val === "") {
			msg =
				col === "username"
					? t("msg_UsernameReq")
					: t("msg_PasswordReq");
			checked = false;
		} else if (col === "username" && (val.length < 6 || val.length > 18)) {
			checked = false;
			msg = t("msg_UsernameLength");
		}

		setTip(prev => ({
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

		const checkUsername = checkValue("username", userValue.username);
		const checkPassword = checkValue("password", userValue.password);
		const checkAll = checkUsername && checkPassword;

		if (checkAll) {
			await LOGIN({
				userName: userValue.username,
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
						localStorage.setItem("fpsNeededToCheck", "true");
					}
				} else if (
					res.errorCode === 1101 ||
					res.errorCode === 1102 ||
					res.errorCode === 9000
				) {
					if (isMountedRef.current) {
						setTip(prev => ({
							...prev,
							username: {
								checked: false,
								msg: res.message
							}
						}));
					}
				} else if (res.errorCode === 1001) {
					if (isMountedRef.current) {
						setTip(prev => ({
							...prev,
							password: {
								checked: false,
								msg: res.message
							}
						}));
					}
				}
			});
		}
	};

	const clickCancel = () => {
		setPopBox({ isOpen: false });
	};

	const clickJoin = () => {
		navigate(`/${userInfo.langId}/${path.join.root}`);
		if (popBox.isOpen) {
			setPopBox({ isOpen: false });
		}
	};

	return (
		<div className="loginpop active">
			<div className="joinloginModule">
				<img
					src={
						isInPeriodEvent
							? `${bannerImgUrl}/desktop/img/loginBanner_event.jpg`
							: `${bannerImgUrl}/desktop/img/loginBanner.jpg`
					}
					alt="loginBanner"
				/>
				<LoginForm
					t={t}
					clickCancel={clickCancel}
					userInfo={userInfo}
					path={path}
					clickJoin={clickJoin}
					handleLogin={handleLogin}
					userValue={userValue}
					EditField={EditField}
					checkValue={checkValue}
					clickInfo={clickInfo}
					tip={tip}
					showPsw={showPsw}
					showPswHandler={showPswHandler}
				/>
			</div>
		</div>
	);
};

export default LoginPanel;

export const LoginForm = ({
	t,
	clickCancel,
	clickJoin,
	userInfo,
	handleLogin,
	userValue,
	EditField,
	checkValue,
	clickInfo,
	tip,
	showPsw,
	showPswHandler
}) => (
	<form className="joinloginFunction" onSubmit={handleLogin}>
		<span className="title txt-yellow">{t("lbl_Login")}</span>
		<div className="noAccount">
			{t("lbl_DontHaveAccount")}&nbsp;
			<button className="txt-blue2" type="button" onClick={clickJoin}>
				{t("lbl_JoinNow")}
			</button>
		</div>
		<div className="inputModule">
			<Inputbox
				icon="icon-member txt-blue12"
				placeholder={t("lbl_Username")}
				value={userValue.username}
				onChange={EditField.bind(null, "username")}
				onBlur={checkValue.bind(null, "username", userValue.username)}
				clickInfo={clickInfo.bind(this, "username")}
				checked={tip.username.checked}
				tip={tip.username.msg}
				warningIcon="icon-warning"
			/>

			<InputboxPSW
				icon="icon-key txt-blue12"
				inputType={`${!showPsw ? "password" : "text"}`}
				placeholder={t("lbl_Password")}
				value={userValue.password}
				onChange={EditField.bind(null, "password")}
				onBlur={checkValue.bind(null, "password", userValue.password)}
				showPsw={showPsw}
				showPswHandler={showPswHandler}
				checked={tip.password.checked}
				clickInfo={clickInfo.bind(this, "password")}
				tip={tip.password.msg}
			/>

			<Link
				to={`/${userInfo.langId}/${path.forgetPassword.root}`}
				className="txt-blue2"
			>
				{t("lbl_ForgetPassword")}
			</Link>
		</div>
		<div className="btnGroup">
			<button className="btn-cancel" type="button" onClick={clickCancel}>
				{t("lbl_Cancel")}
			</button>
			<button className="btn-check" type="submit">
				{t("lbl_Login")}
			</button>
		</div>
	</form>
);

LoginForm.propTypes = {
	t: PropTypes.func.isRequired,
	clickCancel: PropTypes.func.isRequired,
	clickJoin: PropTypes.func.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	handleLogin: PropTypes.func.isRequired,
	userValue: PropTypes.objectOf(PropTypes.any).isRequired,
	EditField: PropTypes.func.isRequired,
	checkValue: PropTypes.func.isRequired,
	clickInfo: PropTypes.func.isRequired,
	tip: PropTypes.objectOf(PropTypes.any).isRequired,
	showPsw: PropTypes.bool.isRequired,
	showPswHandler: PropTypes.func.isRequired
};
