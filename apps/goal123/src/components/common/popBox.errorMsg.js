import moment from "moment";
import React from "react";
import { useTranslation } from "react-i18next";

export default ({
	btnBar,
	message,
	errorCode = null,
	icon = "icon-library"
}) => {
	const { t } = useTranslation();
	const errMsg = `${errorCode ? `[${errorCode}] ` : ""}${message}`;

	return (
		<div className="Success active">
			<div className={`icon ${icon}`} />
			<div className="title">{t("lbl_Information")}</div>
			<div>
				<span>{errMsg}</span>
				<div>
					<span>
						time:{" "}
						{moment()
							.utcOffset("+00:00")
							.format("YYYY-MM-DD HH:mm:ss Z")}
					</span>
				</div>
			</div>
			{btnBar}
		</div>
	);
};
