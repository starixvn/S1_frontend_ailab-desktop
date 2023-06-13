import React from "react";
import { useTranslation } from "react-i18next";

export default ({ clickClose }) => {
	const { t } = useTranslation();

	return (
		<div className="Cancel active">
			<div className="icon icon-bell" />
			<div className="title" />
			<div>{t("lbl_underMaintenance")}</div>
			<div className="btnGroup">
				<button className="btn-cancel" onClick={clickClose}>
					{t("lbl_Close")}
				</button>
			</div>
		</div>
	);
};
