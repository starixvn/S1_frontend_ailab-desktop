import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Inputbox from "../common/inputbox.password";
import { passwordCheck } from "../common/common";
import { api_account_ChangePassword } from "../../service/api/account";
import { popBoxContext } from "../common/context";
import { defPopBoxType } from "../common/defPopBoxType";

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

const ChangePasswordForm = ({ isPop, msg }) => {
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
							isPop && ClickClose();
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.ChangePswHint,
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
							isPop
								? setPopBox({
										isOpen: true,
										popBoxType: defPopBoxType.ChangePsw,
										message: `[${res.data.errorCode}] ${res.data.message}`
								  })
								: setPopBox({
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
		} else {
			setStatus({
				oldPsw: { checked: _oldPsw.checked, msg: t(_oldPsw.message) },
				newPsw: { checked: _newPsw.checked, msg: t(_newPsw.message) }
			});
		}
	};
	const judgeShowContent = () => {
		return isPop ? (
			<>
				<div className="resetPassWord">
					<div>{t("lbl_OldPassword")}</div>
					<Inputbox
						inputType={showPsw.oldPsw ? "text" : "password"}
						value={userPsw.oldPsw}
						onChange={editField.bind(this, "oldPsw")}
						onBlur={checkPswHandler.bind(this, "oldPsw")}
						showPsw={showPsw.oldPsw}
						checked={status.oldPsw.checked}
						showPswHandler={showPswHandler.bind(this, "oldPsw")}
						clickInfo={clickInfo.bind(this, "oldPsw")}
						tip={status.oldPsw.msg}
					/>
					<div>{t("lbl_NewPassword")}</div>
					<Inputbox
						inputType={showPsw.newPsw ? "text" : "password"}
						value={userPsw.newPsw}
						onChange={editField.bind(this, "newPsw")}
						onBlur={checkPswHandler.bind(this, "newPsw")}
						showPsw={showPsw.newPsw}
						showPswHandler={showPswHandler.bind(this, "newPsw")}
						checked={status.newPsw.checked}
						clickInfo={clickInfo.bind(this, "newPsw")}
						tip={msg !== "" ? msg : status.newPsw.msg}
					/>
				</div>
				<div className="btnGroup">
					<button
						className="btn-check"
						type="submit"
						onClick={clickSubmit}>
						{t("lbl_change_password_submit")}
					</button>
				</div>
			</>
		) : (
			<form className="changePassWord" onSubmit={clickSubmit}>
				<div>{t("lbl_OldPassword")}</div>
				<Inputbox
					inputType={showPsw.oldPsw ? "text" : "password"}
					value={userPsw.oldPsw}
					onChange={editField.bind(this, "oldPsw")}
					onBlur={checkPswHandler.bind(this, "oldPsw")}
					showPsw={showPsw.oldPsw}
					checked={status.oldPsw.checked}
					showPswHandler={showPswHandler.bind(this, "oldPsw")}
					clickInfo={clickInfo.bind(this, "oldPsw")}
					tip={status.oldPsw.msg}
				/>
				<div>{t("lbl_NewPassword")}</div>
				<Inputbox
					inputType={showPsw.newPsw ? "text" : "password"}
					value={userPsw.newPsw}
					onChange={editField.bind(this, "newPsw")}
					onBlur={checkPswHandler.bind(this, "newPsw")}
					showPsw={showPsw.newPsw}
					showPswHandler={showPswHandler.bind(this, "newPsw")}
					checked={status.newPsw.checked}
					clickInfo={clickInfo.bind(this, "newPsw")}
					tip={status.newPsw.msg}
				/>
				<div className="btnGroup">
					<button
						className="btn-check"
						type="submit"
						onClick={clickSubmit}>
						{t("lbl_change_password_submit")}
					</button>
				</div>
			</form>
		);
	};
	return judgeShowContent();
};

export default ChangePasswordForm;

ChangePasswordForm.propTypes = {
	isPop: PropTypes.bool,
	msg: PropTypes.string
};
ChangePasswordForm.defaultProps = {
	isPop: false,
	msg: ""
};
