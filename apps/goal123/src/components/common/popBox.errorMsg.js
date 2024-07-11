import moment from "moment";
import React from "react";
import { number, string, node } from "prop-types";
import { useTranslation } from "react-i18next";

const ErrorMsg = ({ btnBar, message, errorCode, icon }) => {
	const { t } = useTranslation();
	const errMsg = message || t("msg_ApiServerError");
	const errCode = errorCode ? ` (${errorCode})` : "";
	const content = `${errMsg}${errCode}`;

	return (
		<div className="Success active">
			<div className={`icon ${icon}`} />
			<div className="title">{t("lbl_Error_Oops")}</div>
			<div>
				<span>{content}</span>
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

ErrorMsg.defaultProps = {
	btnBar: null,
	message: "",
	errorCode: null,
	icon: "icon-library"
};

ErrorMsg.propTypes = {
	btnBar: node,
	message: string,
	errorCode: number,
	icon: string
};

export default ErrorMsg;
