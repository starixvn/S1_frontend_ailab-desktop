import React from "react";
import PropTypes from "prop-types";
import Inputbox from "../common/inputbox.password";

const ChangePasswordForm = ({
	t,
	clickSubmit,
	userPsw,
	editField,
	checkPswHandler,
	showPsw,
	showPswHandler,
	status,
	clickInfo
}) => {
	return (
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

export default ChangePasswordForm;

ChangePasswordForm.propTypes = {
	t: PropTypes.func.isRequired,
	clickSubmit: PropTypes.func.isRequired,
	userPsw: PropTypes.objectOf(PropTypes.any).isRequired,
	editField: PropTypes.func.isRequired,
	checkPswHandler: PropTypes.func.isRequired,
	showPsw: PropTypes.objectOf(PropTypes.any).isRequired,
	showPswHandler: PropTypes.func.isRequired,
	status: PropTypes.objectOf(PropTypes.any).isRequired,
	clickInfo: PropTypes.func.isRequired
};
