import React from "react";
import { useTranslation } from "react-i18next";

export default ({ btnBar }) => {
	const { t } = useTranslation();

	return (
		<div className="Cancel active">
			<div className="icon icon-icon32px_Withdraw" />
			<div className="title">{t("lbl_Withdrawal")}</div>
			<div>
				{t("lbl_WithdrawalSuccess")}
				<br />
				{t("lbl_WithdrawalSuccessNotify")}
			</div>
			{btnBar}
		</div>
	);
};
