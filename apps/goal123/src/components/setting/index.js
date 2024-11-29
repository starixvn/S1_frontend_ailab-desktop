/* eslint-disable react/self-closing-comp */
import React from "react";
import { useTranslation } from "react-i18next";
import NotificationSetting from "./NotificationSetting";
import ChangePasswordForm from "./ChangePasswordForm";

const Setting = () => {
	const { t } = useTranslation();
	return (
		<div className="infoModule">
			<div className="inside-title">
				<span className="setting-title">{t("lbl_Setting")}</span>
			</div>
			<div className="setting-container">
				<NotificationSetting />
			</div>
			<div className="setting-container">
				<div className="setting-subtitle">
					{t("lbl_ChangePassword")}
				</div>
				<div className="setting-tip">
					{t("lbl_ProfileModifyWarning")}
				</div>
				<ChangePasswordForm />
			</div>
		</div>
	);
};

export default Setting;
