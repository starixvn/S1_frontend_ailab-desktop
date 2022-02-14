import React, { useState, useEffect, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import { api_site_ForgetPwd } from "../../service/api/site";
import { popBoxContext, userInfoContext } from "../common/context";
import { defPopBoxType } from "../common/popBox";
import ForgetPasswordForm from "./forgetPassword.form";

const initStatus = { checked: null, msg: "" };

const ForgetPassword = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [userEmail, setUserEmail] = useState("");
	const [status, setStatus] = useState(initStatus);
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

	const emailCheck = val => {
		let _checked = true;
		let _msg = "";
		const regx =
			/^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

		if (val === "") {
			_checked = false;
			_msg = "msg_MailWrongFormat";
		} else if (val !== "") {
			if (!regx.test(val)) {
				_checked = false;
				_msg = "msg_MailWrongFormat";
			}
		}

		setStatus({
			checked: _checked,
			msg: t(_msg)
		});

		return _checked;
	};

	const editField = e => {
		const val = e.target.value;
		setUserEmail(val);
	};

	const clickInfo = () => {
		const _msg = status.msg === "" ? t("lbl_EmailRequired") : "";

		setStatus({
			checked: null,
			msg: _msg
		});
	};

	const clickSubmit = e => {
		e.preventDefault();
		const checked = emailCheck(userEmail);

		const ClickClose = () => {
			setPopBox({ isOpen: false });
		};

		if (checked) {
			api_site_ForgetPwd({
				Email: userEmail,
				langId: userInfo.langId
			}).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.ChangePsw,
								titleIcon: "icon-icon32px_uplock",
								title: t("lbl_ForgetPsw"),
								message: t("lbl_ForgetPwdSuccess"),
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-check"
											onClick={ClickClose}>
											OK
										</button>
									</div>
								),
								ClickClose
							});
							setUserEmail("");
							setStatus(initStatus);
						} else {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.ErrorMsg,
								message: `[${res.data.errorCode}] ${res.data.message}`,
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

	return userInfo?.isLogin === true ? (
		<></>
	) : (
		<div className="infoModule">
			<div className="inside-title icon icon-icon32px_password">
				<span>{t("lbl_ForgetPassword")}</span>
				<div>{t("lbl_ForgetPwdHint")}</div>
			</div>
			<div className="forgetPassWord">
				<ForgetPasswordForm
					t={t}
					userEmail={userEmail}
					emailCheck={emailCheck}
					editField={editField}
					status={status}
					clickInfo={clickInfo}
					clickSubmit={clickSubmit}
				/>
			</div>
		</div>
	);
};

export default ForgetPassword;
