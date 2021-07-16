import React from "react";
import { useTranslation } from "react-i18next";
import { number_format } from "../common/common";

export default ({ balanceData, _isConvert }) => {
	const { t } = useTranslation();
	const { balance, deduction, availableBalance } = balanceData;

	return (
		<div className="calculation">
			<div>
				<div>{t("lbl_Balance")}</div>
				<div>
					{number_format({
						number: balance,
						formatRequired: _isConvert
					})}
				</div>
			</div>
			<div>-</div>
			<div>
				<div>{t("lbl_Deduction")}</div>
				<div>
					{number_format({
						number: deduction,
						formatRequired: _isConvert
					})}
				</div>
			</div>
			<div>=</div>
			<div>
				<div>{t("lbl_EligibleWithdrawalAmount")}</div>
				<div>
					{number_format({
						number: availableBalance,
						formatRequired: _isConvert
					})}
				</div>
			</div>
		</div>
	);
};
