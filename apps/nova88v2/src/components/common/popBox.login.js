import React, { useState, useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Link, navigate } from "@reach/router";
import Inputbox from "./inputbox";
import InputboxPSW from "./inputbox.password";
import { LOGIN } from "../../service/auth";
import { userInfoContext, popBoxContext } from "./context";
import path from "../../router";
import { setCookie } from "./common";
import { SiteInfo, cloudImgUrl } from "../../config";

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

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

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
			val = val.replace(/[\W]/g, "");
		}

		setUserValue(prev => {
			return { ...prev, [col]: val };
		});
	};

	const checkValue = (col, val) => {
		let checked = false;
		let msg = "";

		if (val === "") {
			msg =
				col === "username"
					? t("msg_UsernameReq")
					: t("msg_PasswordReq");
			checked = false;
		} else if (val.length < 6 || val.length > 18) {
			checked = false;
			msg = t("msg_UsernameLength");
		} else {
			checked = true;
			msg = "";
		}

		setTip(prev => {
			return {
				...prev,
				[col]: {
					checked,
					msg
				}
			};
		});
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
					setCookie(SiteInfo.langCookie, res.userData.langId);
					setUserInfo(() => ({
						...res.userData,
						isLogin: res.isLogin
					}));
					setPopBox({ isOpen: false });
					navigate(`/${userInfo.langId}/${path.deposit.root}`);
				} else if (
					res.errorCode === 1101 ||
					res.errorCode === 1102 ||
					res.errorCode === 9000
				) {
					if (isMountedRef.current) {
						setTip(prev => {
							return {
								...prev,
								username: {
									checked: false,
									msg: res.message
								}
							};
						});
					}
				} else if (res.errorCode === 1001) {
					if (isMountedRef.current) {
						setTip(prev => {
							return {
								...prev,
								password: {
									checked: false,
									msg: res.message
								}
							};
						});
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
				<div className="loginAnimation">
					<img
						className="animationlogo"
						alt="animationlogo"
						src={`${cloudImgUrl}/SiteSkin/img/logo_en_w.png`}
					/>
					<img
						className="npc1"
						alt="npc1"
						src={require("../../styles/img/loginNpc01.png")}
					/>
					<img
						className="npc2"
						alt="npc2"
						src={require("../../styles/img/loginNpc02.png")}
					/>
					<img
						className="welcome"
						alt="welcome"
						src={require("../../styles/img/welcome.png")}
					/>
					<img
						className="back"
						alt="back"
						src={require("../../styles/img/back.png")}
					/>
				</div>
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
					path={path}
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
}) => {
	return (
		<form className="joinloginFunction" onSubmit={handleLogin}>
			<div className="title txt-orange">{t("lbl_Login")}</div>
			<div className="noAccount">
				{t("lbl_DontHaveAccount")}{" "}
				<button
					className="txt-orange"
					type="button"
					onClick={clickJoin}>
					{t("lbl_JoinNow")}
				</button>
			</div>
			<div className="inputModule">
				<Inputbox
					icon="icon-member txt-orange"
					placeholder={t("lbl_Username")}
					value={userValue.username}
					onChange={EditField.bind(null, "username")}
					onBlur={checkValue.bind(
						null,
						"username",
						userValue.username
					)}
					clickInfo={clickInfo.bind(this, "username")}
					checked={tip.username.checked}
					tip={tip.username.msg}
					warningIcon="icon-warning"
					className="inputBox-org"
				/>

				<InputboxPSW
					icon="icon-key txt-orange"
					inputType={`${!showPsw ? "password" : "text"}`}
					placeholder={t("lbl_Password")}
					value={userValue.password}
					onChange={EditField.bind(null, "password")}
					onBlur={checkValue.bind(
						null,
						"password",
						userValue.password
					)}
					showPsw={showPsw}
					showPswHandler={showPswHandler}
					checked={tip.password.checked}
					clickInfo={clickInfo.bind(this, "password")}
					tip={tip.password.msg}
					className="inputBox-org"
				/>

				<Link
					to={`/${userInfo.langId}/${path.forgetPassword.root}`}
					className="txt-blue2">
					{t("lbl_ForgetPassword")}
				</Link>
			</div>
			<div className="btnGroup">
				<button
					className="btn-cancel"
					type="button"
					onClick={clickCancel}>
					{t("lbl_Cancel")}
				</button>
				<button className="btn-check" type="submit">
					{t("lbl_Login")}
				</button>
			</div>
		</form>
	);
};

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
