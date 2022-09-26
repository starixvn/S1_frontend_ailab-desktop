import React from "react";
import { useTranslation } from "react-i18next";
import ChangePasswordForm from "./changePassword.form";

const ChangePassword = () => {
	const { t } = useTranslation();

	return (
		<div className="infoModule">
			<div className="inside-title icon icon-icon32px_password">
				<span>{t("lbl_ChangePassword")}</span>
				<div>{t("lbl_ChangePasswordHint")}</div>
			</div>
			<ChangePasswordForm />
		</div>
	);
};

export default ChangePassword;
