import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import ChangePasswordForm from "../password/changePassword.form";

const ChangePassword = ({ message }) => {
	const { t } = useTranslation();

	return (
		<div className="resetPassWordpop active">
			<div className="title">
				<i className="icon icon-icon32px_password" />
				{t("lbl_ChangePassword")}
			</div>
			<ChangePasswordForm isPop={true} msg={message} />
		</div>
	);
};
export default ChangePassword;
ChangePassword.propTypes = {
	message: PropTypes.string
};
ChangePassword.defaultProps = {
	message: ""
};
