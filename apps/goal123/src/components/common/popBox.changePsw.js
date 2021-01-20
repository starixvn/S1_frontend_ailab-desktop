import React from "react";
import { useTranslation } from "react-i18next";

export default ({ btnBar, title, message, ClickClose }) => {
	const { t } = useTranslation();

	return (
		<div className="changePassWordpop active">
			<button className="icon icon-cross" onClick={ClickClose} />
			<div className="icon icon-icon32px_password" />
			<div className="title">{title}</div>
			<div>{message}</div>
			{btnBar}
		</div>
	);
};
