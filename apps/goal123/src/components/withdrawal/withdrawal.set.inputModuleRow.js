import React from "react";
import { useTranslation } from "react-i18next";
import Inputbox from "../common/inputbox";
import { number_format } from "../common/common";

export default ({
	onChangeAmount,
	amountValue,
	toConfirmPage,
	_isConvert,
	onBlur,
	clickInfo,
	checked,
	tip,
	withdrawalMin,
	withdrawalMax,
	isAmountLimited
}) => {
	const { t } = useTranslation();

	const withdrawalMinMaxLimitHint = `${t("lbl_Daily_Min_Max_Amount", {
		min: number_format({
			number: withdrawalMin,
			formatRequired: _isConvert,
			digits: 0
		}),
		max: isAmountLimited
			? number_format({
					number: withdrawalMax,
					formatRequired: _isConvert,
					digits: 0
			  })
			: t("lbl_Unlimited")
	})}`;

	return (
		<div className="inputModuleRow">
			<Inputbox
				value={amountValue}
				onChange={onChangeAmount}
				onBlur={onBlur}
				title={t("lbl_Amount")}
				clickInfo={clickInfo}
				checked={checked}
				tip={tip}
				_isConvert={_isConvert}
			/>

			<div className="tip active">{withdrawalMinMaxLimitHint}</div>

			<div className="btnGroup">
				<button className="btn-check" onClick={toConfirmPage}>
					{t("lbl_Submit")}
				</button>
			</div>
		</div>
	);
};
