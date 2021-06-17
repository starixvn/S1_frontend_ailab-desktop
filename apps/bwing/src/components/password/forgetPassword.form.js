import React from "react";
import PropTypes from "prop-types";
import Inputbox from "../common/inputbox";

const ForgetPasswordForm = ({
	t,
	userEmail,
	emailCheck,
	editField,
	status,
	clickInfo,
	clickSubmit
}) => {
	return (
		<div className="forgetPassWord">
			<div>{t("lbl_Email")}</div>
			<form className="inputModuleRow" onSubmit={clickSubmit}>
				<Inputbox
					icon="icon-email txt-blue12"
					value={userEmail}
					onChange={editField.bind(this)}
					onBlur={emailCheck.bind(this, userEmail)}
					checked={status.checked}
					clickInfo={clickInfo.bind(this)}
				/>
				<div className="btnGroup">
					<button className="btn-check" type="submit">
						{t("lbl_Submit")}
					</button>
				</div>
			</form>
			{status.msg ? <div className="tip active">{status.msg}</div> : null}
		</div>
	);
};

export default ForgetPasswordForm;

ForgetPasswordForm.propTypes = {
	t: PropTypes.func.isRequired,
	userEmail: PropTypes.string.isRequired,
	editField: PropTypes.func.isRequired,
	emailCheck: PropTypes.func.isRequired,
	status: PropTypes.objectOf(PropTypes.any).isRequired,
	clickInfo: PropTypes.func.isRequired,
	clickSubmit: PropTypes.func.isRequired
};
