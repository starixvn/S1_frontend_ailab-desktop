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
		<form className="inputModuleRow" onSubmit={clickSubmit}>
			<Inputbox
				icon="icon-email txt-blue12"
				title={t("lbl_Email")}
				value={userEmail}
				onChange={editField.bind(this)}
				onBlur={emailCheck.bind(this, userEmail)}
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
