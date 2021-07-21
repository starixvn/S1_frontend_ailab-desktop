import React from "react";
import { useTranslation } from "react-i18next";

export default ({ clickClose }) => {
	const { t } = useTranslation();

	return (
		<div className="Cancel active">
			<div className="icon icon-close" onClick={clickClose} />
			<div className="icon icon-icon32px_notification" />
			<div className="txt-lightgray">{t("lbl_underMaintenance")}</div>
			<div className="btnGroup">
				<button className="btn-cancel" onClick={clickClose}>
					{t("lbl_Close")}
				</button>
			</div>
		</div>
	);
};
