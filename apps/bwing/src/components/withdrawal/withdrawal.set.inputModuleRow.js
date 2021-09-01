import React from "react";
import { useTranslation } from "react-i18next";
import Inputbox from "../common/inputbox";
import { number_format } from "../common/common";

export default ({
	amountValue,
	onChangeAmount,
	onBlur,
	clickInfo,
	checked,
	_isConvert,
	toConfirmPage,
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
		<>
			<div className="inputModuleRow">
				<Inputbox
					value={amountValue}
					onChange={onChangeAmount}
					onBlur={onBlur}
					title={t("lbl_Amount")}
					clickInfo={clickInfo}
					checked={checked}
					_isConvert={_isConvert}
				/>

				<div className="btnGroup">
					<button className="btn-check" onClick={toConfirmPage}>
						{t("lbl_withdraw_submit")}
					</button>
				</div>
			</div>

			<div className={tip ? "errorTip active" : ""}>{tip}</div>

			<div className="tip active">{withdrawalMinMaxLimitHint}</div>
		</>
	);
};
