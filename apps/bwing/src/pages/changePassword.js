import React, { useState, useEffect, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import { popBoxContext } from "../components/common/context";
import { api_account_ChangePassword } from "../service/api/account";
import { defPopBoxType } from "../components/common/defPopBoxType";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import LeftMenu from "../components/common/leftMenu";
import Inputbox from "../components/common/inputbox.password";
import Loading from "../components/common/loading";
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
	const [loading, setLoading] = useState(false);
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
			setLoading(true);

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
								titleIcon: "icon-icon32px_password",
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
											className="btn-cancel"
											onClick={ClickClose}>
											{t("lbl_Close")}
										</button>
									</div>
								)
							});
						}
						setLoading(false);
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
										className="btn-cancel"
										onClick={ClickClose}>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
						setLoading(false);
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

	return loading ? (
		<Loading />
	) : (
		<div className="infoModule">
			<div className="inside-title icon-icon32px_deposit">
				{t("lbl_ChangePassword")}
			</div>
			<div className="txt-white">{t("lbl_ChangePasswordHint")}</div>
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
		</div>
	);
};
