import React, { useState, useEffect, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "@reach/router";
import { api_site_ForgetPwd } from "../../service/api/site";
import { popBoxContext, userInfoContext } from "../common/context";
import usePopBox from "../hook/usePopBox";
import defPopBoxType from "../common/defPopBoxType";
import ForgetPasswordForm from "./forgetPassword.form";
import forgetPasswordbg from "../../styles/img/forgetpasswordbg.png";

const ForgetPassword = () => {
	const { t } = useTranslation();
	const initStatus = {
		checked: null,
		msg: ""
	};
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox } = usePopBox();
	const [userEmail, setUserEmail] = useState("");
	const [status, setStatus] = useState(initStatus);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const emailCheck = val => {
		let _checked = true;
		let _msg = "";
		const regx = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

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
		const _msg =
			status.msg === ""
				? t("lbl_Please_enter_your_registered_email_to_reset")
				: "";

		setStatus({
			checked: null,
			msg: _msg
		});
	};

	const clickCancel = () => {
		navigate(`/${userInfo.langId}`);
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
								title: t("lbl_ForgetPsw"),
								message: t("lbl_ForgotPwdMailSent"),
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
						} else {
							errorPopBox(
								res.data.message || "error",
								res.data.errorCode
							);
						}
					}
				},
				() => {
					if (isMountedRef.current) {
						errorPopBox();
					}
				}
			);
		}
	};

	return (
		<div className="loginpop">
			<div className="joinloginModule">
				<div className="loginAnimation">
					<img
						src={forgetPasswordbg}
						alt="forget-password-background"
					/>
				</div>
				<div className="joinloginFunction">
					<div className="title txt-blue">
						{t("lbl_ForgetPassword")}
					</div>
					<ForgetPasswordForm
						t={t}
						userEmail={userEmail}
						emailCheck={emailCheck}
						editField={editField}
						status={status}
						clickInfo={clickInfo}
						clickCancel={clickCancel}
						clickSubmit={clickSubmit}
					/>
				</div>
			</div>
		</div>
	);
};

export default ForgetPassword;
