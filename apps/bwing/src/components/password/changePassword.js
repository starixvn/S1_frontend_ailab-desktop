import React from "react";
import { useTranslation } from "react-i18next";
import ChangePasswordForm from "./changePassword.form";

const ChangePassword = () => {
	const { t } = useTranslation();

	return (
		<div className="infoModule">
			<div className="inside-title icon-icon32px_deposit">
				{t("lbl_ChangePassword")}
			</div>
			<div className="txt-white">{t("lbl_ChangePasswordHint")}</div>
			<ChangePasswordForm />
		</div>
	);
};

export default ChangePassword;
