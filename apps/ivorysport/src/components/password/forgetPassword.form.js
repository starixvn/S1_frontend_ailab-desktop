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
	clickCancel,
	clickSubmit
}) => {
	return (
		<form onSubmit={clickSubmit}>
			<div className="inputModule">
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
			</div>
			<div className="btnGroup">
				<button onClick={clickCancel} className="gray">
					{t("lbl_Cancel")}
				</button>
				<button onClick={clickSubmit} className="orange">
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
	clickCancel: PropTypes.func.isRequired,
	clickSubmit: PropTypes.func.isRequired
};
