import React, { useState, useEffect, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import { popBoxContext } from "../components/common/context";
import { api_account_ChangePassword } from "../service/api/account";
import defPopBoxType from "../components/common/defPopBoxType";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import LeftMenu from "../components/common/leftMenu";
import InputboxPSW from "../components/common/inputbox.password";
import SideBarQuickLink from "../components/home/sideBarQuickLink";
import { passwordCheck } from "../components/common/common";

export default () => {
	return (
		<Wrapper afterLogin={true}>
			<Layout>
				<main>
					<section className="inside">
						<LeftMenu />
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

const initPsw = {
	oldPsw: "",
	newPsw: ""
};

const initStatus = {
	oldPsw: { checked: null, msg: "" },
	newPsw: { checked: null, msg: "" }
};

const initShowPsw = {
	oldPsw: false,
	newPsw: false
};

const Content = () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const [userPsw, setUserPsw] = useState(initPsw);
	const [status, setStatus] = useState(initStatus);
	const [showPsw, setShowPsw] = useState(initShowPsw);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const _oldPsw =
		userPsw.oldPsw === ""
			? { checked: false, message: "msg_PasswordReq" }
			: { checked: true, message: "" };
	const _newPsw = passwordCheck(userPsw.newPsw);

	const checkPswHandler = (col, e) => {
		if (col === "oldPsw")
			return setStatus(prev => ({
				...prev,
				oldPsw: {
					checked: _oldPsw.checked,
					msg: t(_oldPsw.message)
				}
			}));

		const val = e.target.value;
		const { checked, message } = passwordCheck(val);

		setStatus(prev => ({
			...prev,
			[col]: { checked, msg: t(message) }
		}));
	};

	const clickInfo = col => {
		const _msg = status[col].msg === "" ? t("lbl_PasswordTooltip") : "";

		setStatus(prev => ({
			...prev,
			[col]: { checked: null, msg: _msg }
		}));
	};

	const editField = (col, e) => {
		const val = e.target.value;
		setUserPsw(prev => ({ ...prev, [col]: val }));
	};

	const showPswHandler = col => {
		const _showPsw = !showPsw[col];
		setShowPsw(prev => ({ ...prev, [col]: _showPsw }));
	};

	const clickSubmit = e => {
		e.preventDefault();

		const ClickClose = () => {
			setPopBox({ isOpen: false });
		};

		if (_oldPsw.checked && _newPsw.checked) {
			api_account_ChangePassword({
				OldPassword: userPsw.oldPsw,
				NewPassword: userPsw.newPsw
			}).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.ChangePsw,
								title: t("lbl_ChangePassword"),
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
											onClick={ClickClose}>
											OK
										</button>
									</div>
								),
								ClickClose
							});
							setUserPsw(initPsw);
							setStatus(initStatus);
							setShowPsw(initShowPsw);
						} else {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.ErrorMsg,
								message: res.data.message,
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-check"
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
										className="btn-check"
										onClick={ClickClose}>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
					}
				}
			);
		} else {
			setStatus({
				oldPsw: { checked: _oldPsw.checked, msg: t(_oldPsw.message) },
				newPsw: { checked: _newPsw.checked, msg: t(_newPsw.message) }
			});
		}
	};

	return (
		<div className="infoModule">
			<div className="inside-title icon icon-icon32px_password">
				<span>{t("lbl_ChangePassword")}</span>
				<div>{t("lbl_ChangePasswordHint")}</div>
			</div>
			<form className="changePassWord" onSubmit={clickSubmit}>
				<InputboxPSW
					className={`inputBox-blue${
						!status.oldPsw.checked && status.oldPsw.msg !== ""
							? " error"
							: ""
					}`}
					inputType={showPsw.oldPsw ? "text" : "password"}
					title={t("lbl_OldPassword")}
					value={userPsw.oldPsw}
					onChange={editField.bind(this, "oldPsw")}
					onBlur={checkPswHandler.bind(this, "oldPsw")}
					showPsw={showPsw.oldPsw}
					showPswHandler={showPswHandler.bind(this, "oldPsw")}
					clickInfo={clickInfo.bind(this, "oldPsw")}
					tip={status.oldPsw.msg}
				/>
				<InputboxPSW
					className={`inputBox-blue${
						!status.newPsw.checked && status.newPsw.msg !== ""
							? " error"
							: ""
					}`}
					inputType={showPsw.newPsw ? "text" : "password"}
					title={t("lbl_NewPassword")}
					value={userPsw.newPsw}
					onChange={editField.bind(this, "newPsw")}
					onBlur={checkPswHandler.bind(this, "newPsw")}
					showPsw={showPsw.newPsw}
					showPswHandler={showPswHandler.bind(this, "newPsw")}
					clickInfo={clickInfo.bind(this, "newPsw")}
					tip={status.newPsw.msg}
				/>
				<div className="btnGroup">
					<button
						className="btn-check"
						type="submit"
						onClick={clickSubmit}>
						{t("lbl_Submit")}
					</button>
				</div>
			</form>
		</div>
	);
};
