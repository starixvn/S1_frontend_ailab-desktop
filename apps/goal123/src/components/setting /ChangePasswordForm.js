/* eslint-disable consistent-return */
import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import PasswordInputbox from "./PasswordInputbox";
import { popBoxContext } from "../common/context";
import { passwordCheck } from "../common/common";
import { api_account_ChangePassword } from "../../service/api/account";
import { defPopBoxType } from "../common/popBox";

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

/**
 *  使用於 Setting 頁的 ChangePassword 邏輯跟 ChangePassword 頁的邏輯一模一樣，
 *  僅更改 html 結構，並刪除 isPop ＆ msg 參數，這兩個參數僅用於 Leobet 也就是新專案 NX 裡的 Yashbet，已沒在使用故刪除。 */
const ChangePasswordForm = () => {
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
											onClick={ClickClose}
										>
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
								message: `[${res.data.errorCode}] ${res.data.message}`,
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-cancel"
											onClick={ClickClose}
										>
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
										onClick={ClickClose}
									>
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
		return (
			<form className="changepassword-content" onSubmit={clickSubmit}>
				<div className="resetPassWord">
					{/* 未使用共用的 “inputbox.password” 組件 ，因為 html 結構不同，故另外寫一個 setting 頁專用的 “PasswordInputbox” 組件 */}
					<PasswordInputbox
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
				</div>
				<div className="resetPassWord">
					{/* 未使用共用的 “inputbox.password” 組件 ，因為 html 結構不同，故另外寫一個 setting 頁專用的 “PasswordInputbox” 組件 */}
					<PasswordInputbox
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
				</div>
				<div className="btnGroup">
					<button
						className="btn-check"
						type="submit"
						onClick={clickSubmit}
					>
						{t("lbl_Submit")}
					</button>
				</div>
			</form>
		);
	};
	return judgeShowContent();
};

export default ChangePasswordForm;
