import React, { useState, useEffect, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, navigate } from "@reach/router";
import loginBanner from "../../styles/img/loginBanner.jpg";
import Inputbox from "./inputbox";
import InputboxPSW from "./inputbox.password";
import { LOGIN } from "../../service/auth";
import { userInfoContext, popBoxContext } from "./context";
import path from "../../router";

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
	const { setPopBox } = useContext(popBoxContext);
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
					if (isMountedRef.current) {
						setUserInfo(() => ({
							...res.userData,
							isLogin: res.isLogin
						}));
						setPopBox({ isOpen: false });
						navigate(`/${userInfo.langId}/${path.deposit.root}`);
					}
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

	const openJoin = () => {
		setPopBox({ isOpen: false });
	};

	return (
		<div className="loginpop">
			<div className="icon icon-close" onClick={clickCancel} />
			<div className="loginModule">
				<img src={loginBanner} alt="loginBanner" />

				<div className="loginFunction">
					<span className="title">{t("lbl_Login")}</span>
					<div className="noAccount">
						{t("lbl_DontHaveAccount")}&nbsp;
						<Link
							className="txt-blue2"
							to={`/${userInfo.langId}/${path.join.root}`}
							onClick={openJoin}>
							{t("lbl_JoinNow")}
						</Link>
					</div>
					<form onSubmit={handleLogin}>
						<div className="inputModule">
							<div className="title">{t("lbl_Username")}</div>
							<Inputbox
								// icon="icon-member txt-blue12"
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
							/>

							<div className="title">
								{t("lbl_Password")} &nbsp;
								<Link
									to={`/${userInfo.langId}/${path.forgetPassword.root}`}
									className="txt-blue15">
									{t("lbl_ForgetPassword")}
								</Link>
							</div>
							<InputboxPSW
								// icon="icon-key txt-blue12"
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
							/>
						</div>
						<div className="btnGroup">
							<button
								className="btn-cancel"
								type="button"
								onClick={clickCancel}>
								{t("lbl_Cancel")}
							</button>
							<button className="blue" type="submit">
								{t("lbl_Login")}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginPanel;
