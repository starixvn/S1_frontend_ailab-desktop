import React from "react";
import PropTypes from "prop-types";
import InputboxPassword from "../common/inputbox.password";

const ResetPasswordForm = ({
	t,
	showPsw,
	showPswHandler,
	newPsw,
	editField,
	checkPswHandler,
	status,
	clickInfo,
	clickSubmit
}) => {
	return (
		<div className="forgetPassWord">
			<InputboxPassword
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
				<button
					className="btn-check"
					type="submit"
					onClick={clickSubmit}>
					{t("lbl_Submit")}
				</button>
			</div>
		</div>
	);
};

export default ResetPasswordForm;

ResetPasswordForm.propTypes = {
	t: PropTypes.func.isRequired,
	newPsw: PropTypes.string.isRequired,
	editField: PropTypes.func.isRequired,
	checkPswHandler: PropTypes.func.isRequired,
	showPsw: PropTypes.bool.isRequired,
	showPswHandler: PropTypes.func.isRequired,
	status: PropTypes.objectOf(PropTypes.any).isRequired,
	clickInfo: PropTypes.func.isRequired,
	clickSubmit: PropTypes.func.isRequired
};
