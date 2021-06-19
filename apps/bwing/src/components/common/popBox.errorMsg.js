import React from "react";
import { useTranslation } from "react-i18next";

export default ({
	btnBar,
	message,
	errorCode = null,
	icon = "icon-icon32px_notification"
}) => {
	const { t } = useTranslation();
	const errMsg = `${errorCode ? `[${errorCode}] ` : ""}${message}`;

	return (
		<div className="Error active">
			<div className={`icon ${icon}`} />
			<div className="title">{t("lbl_ImportantNote")}</div>
			<div className="txt-lightgray">{errMsg}</div>
			{btnBar}
		</div>
	);
};
