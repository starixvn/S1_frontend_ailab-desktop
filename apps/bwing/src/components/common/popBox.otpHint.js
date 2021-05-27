import React from "react";
import { useTranslation } from "react-i18next";

export default ({ btnBar }) => {
	const { t } = useTranslation();
	return (
		<div className="editSuccess active">
			<div className="icon icon-icon32px_notification" />
			<div className="title">{t("lbl_ImportantNote")}</div>
			<div className="txt-lightgray">{t("msg_OTPHint")}</div>
			{btnBar}
		</div>
	);
};
