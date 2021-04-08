import React, { useState, useEffect, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "@reach/router";
import { api_site_CheckResetPwdTokens } from "../service/api/site";
import { api_accountStrict_ResetPassword } from "../service/api/accountStrict";
import { popBoxContext, userInfoContext } from "../components/common/context";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import defPopBoxType from "../components/common/defPopBoxType";
import InputboxPassword from "../components/common/inputbox.password";
import { getUrlParameter, passwordCheck } from "../components/common/common";
import { LOGOUT } from "../service/auth";
import path from "../router";
import SideBarQuickLink from "../components/home/sideBarQuickLink";

export default () => {
	return (
		<Wrapper>
			<Layout>
				<main>
					<section className="inside">
						<div className="rightModule">
							<Content />
						</div>
					</section>
					{/* <SideBarQuickLink /> */}
				</main>
			</Layout>
		</Wrapper>
	);
};

const initStatus = { checked: null, msg: "" };

const Content = () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const [newPsw, setNewPsw] = useState("");
	const [showPsw, setShowPsw] = useState(false);
	const [status, setStatus] = useState(initStatus);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.isLogin === false) {
			const _key = getUrlParameter("key");
			api_site_CheckResetPwdTokens({ key: _key }).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setUserInfo(prev => ({
								...prev,
								isLogin: true,
								loginFromResetPwd: true
							}));
						} else {
							navigate(`/${userInfo.langId}`);
						}
					}
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
										onClick={clickClose}>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
					}
				}
			);
		} else if (userInfo.isLogin && !userInfo.loginFromResetPwd) {
			navigate(`/${userInfo.langId}`);
		}
	}, [userInfo.isLogin]);

	const clickClose = () => {
		setPopBox({ isOpen: false });
	};

	const editField = e => {
		const val = e.target.value;
		setNewPsw(val);
	};

	const clickInfo = () => {
		const _msg = status.msg === "" ? t("msg_PasswordVaildate") : "";

		setStatus({
			checked: null,
			msg: _msg
		});
	};

	const showPswHandler = () => {
		const _showPsw = !showPsw;
		setShowPsw(_showPsw);
	};

	const checkPswHandler = val => {
		const { checked, message } = passwordCheck(val);
		setStatus({
			checked,
			msg: t(message)
		});
	};

	const clickSubmit = e => {
		e.preventDefault();

		if (status.checked) {
			api_accountStrict_ResetPassword({ NewPassword: newPsw }).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							const handleLogout = () => {
								LOGOUT(() => {
									const clickPopBoxClose = () => {
										if (
											window.location.pathname.includes(
												`/${userInfo.langId}/${path.resetPassword.root}`
											)
										) {
											navigate(`/${userInfo.langId}`);
										}

										setPopBox({ isOpen: false });
										setUserInfo(prevState => ({
											isLogin: false,
											langId: prevState.langId,
											kickout: true,
											willLogout: true
										}));
									};

									setPopBox({
										isOpen: true,
										popBoxType: defPopBoxType.LogoutHint,
										content: t("msg_loggedout"),
										btnBar: (
											<div className="btnGroup">
												<button
													className="btn-check"
													onClick={clickPopBoxClose}>
													{t("lbl_Close")}
												</button>
											</div>
										)
									});
								});
							};

							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.ChangePsw,
								title: t("lbl_ResetPassword"),
								message: (
									<>
										{t("msg_changePswUpdateSuccess")}
										<br />
										{t("msg_changePswSuccessHint")}
									</>
								),
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-check"
											onClick={handleLogout}>
											OK
										</button>
									</div>
								),
								clickClose: handleLogout
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
											onClick={clickClose}>
											{t("lbl_Close")}
										</button>
									</div>
								)
							});
						}
					}
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
										onClick={clickClose}>
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

	return (
		<div className="infoModule">
			<div className="inside-title icon icon-icon32px_password">
				<span>{t("lbl_ResetPassword")}</span>
			</div>

			<div className="forgetPassWord">
				<form className="inputModuleRow" onSubmit={clickSubmit}>
					<InputboxPassword
						className="inputBox-white"
						inputType={showPsw ? "text" : "password"}
						showPswHandler={showPswHandler}
						title={t("lbl_NewPassword")}
						value={newPsw}
						onChange={editField.bind(this)}
						onBlur={checkPswHandler.bind(this, newPsw)}
						checked={status.checked}
						clickInfo={clickInfo.bind(this)}
						tip={status.msg}
					/>
					<div className="btnGroup">
						<button className="btn-check" type="submit">
							{t("lbl_Submit")}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
