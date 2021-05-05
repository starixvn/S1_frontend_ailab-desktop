import React from "react";
import { useTranslation } from "react-i18next";

export default ({ btnBar, description }) => {
	const { t } = useTranslation();

	return (
		<div className="Cancel active">
			<div className="icon icon-cogs" />
			<div className="title">{t("lbl_Information")}</div>
			<div>{t("lbl_UpdateSuccessful")}</div>
			<div className="text-center">
				{description || t("lbl_UpdateSuccessWillProcess")}
			</div>
			{btnBar}
		</div>
	);
};
