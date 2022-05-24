import React from "react";
import { useTranslation } from "react-i18next";

export default ({
	icon = "icon icon-bell",
	btnBar,
	description = null,
	title
}) => {
	const { t } = useTranslation();

	return (
		<div className="Cancel active">
			<div className={icon} />

			<div className="title">{title ?? t("lbl_Information")}</div>

			{description}

			{btnBar}
		</div>
	);
};
