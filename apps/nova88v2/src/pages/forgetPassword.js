import React, { useState, useEffect, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import { api_site_ForgetPwd } from "../service/api/site";
import { popBoxContext, userInfoContext } from "../components/common/context";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Inputbox from "../components/common/inputbox";
import defPopBoxType from "../components/common/defPopBoxType";
import usePopBox from "../components/hook/usePopBox";
import forgetPasswordbg from "../styles/img/forgetpasswordbg.png";

export default () => {
	return (
		<Wrapper afterLogin={false}>
			<Layout>
				<main>
					<section className="inside">
						<div className="rightModule">
							<Content />
						</div>
					</section>
				</main>
			</Layout>
		</Wrapper>
	);
};

const Content = () => {
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
					<form onSubmit={clickSubmit} className="inputModule">
						<Inputbox
							className="inputBox-blue"
							icon="txt-blue icon-email "
							title={t("lbl_Email")}
							value={userEmail}
							onChange={editField.bind(this)}
							onBlur={emailCheck.bind(this, userEmail)}
							checked={status.checked}
							clickInfo={clickInfo.bind(this)}
							tip={status.msg}
						/>
						<div className="btnGroup">
							<div className="btnGroup">
								<button className="gray">
									{t("lbl_Cancel")}
								</button>
								<button className="orange">
									{t("lbl_Submit")}
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
