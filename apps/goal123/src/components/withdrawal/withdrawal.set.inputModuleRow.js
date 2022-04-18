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
	withdrawalType,
	withdrawalMin,
	withdrawalMax,
	unlimited,
	withdrawalTimes,
	maxTimes
}) => {
	const { t } = useTranslation();

	const min = number_format({
		number: withdrawalMin,
		formatRequired: _isConvert,
		digits: 2
	});

	const max = unlimited
		? t("lbl_Unlimited")
		: number_format({
				number: withdrawalMax,
				formatRequired: _isConvert,
				digits: 2
		  });

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

			<div className={`tip ${withdrawalType ? "active" : ""}`}>
				<span>
					{t("lbl_Times")}:{" "}
					{`${withdrawalTimes} / ${
						maxTimes === 0 ? t("lbl_Unlimited") : maxTimes
					}`}
				</span>
				{t("lbl_Daily_Min_Max_Amount", { min, max })}
			</div>

			<div className="btnGroup">
				<button
					disabled={maxTimes > 0 && withdrawalTimes >= maxTimes}
					className={`${
						maxTimes > 0 && withdrawalTimes >= maxTimes
							? "darkGray"
							: "btn-check"
					}`}
					onClick={toConfirmPage}>
					{t("lbl_Submit")}
				</button>
			</div>
		</div>
	);
};
