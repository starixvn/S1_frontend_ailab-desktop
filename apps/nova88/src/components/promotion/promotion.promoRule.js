import React from "react";
import moment from "moment";
import { promoStatus } from "./promotion.def";
import { number_format, isConvert } from "../common/common";

export default ({ promotionInfo, t, currencyId }) => {
	const {
		isJoin,
		status,
		custExpiryTime,
		periodTo,
		requiredAmount,
		rollOver
	} = promotionInfo;

	const _expiryTime = moment.unix(
		isJoin && status === promoStatus.running && custExpiryTime
			? moment(custExpiryTime).unix()
			: periodTo
	);

	const diffDays = Math.ceil(
		moment.duration(_expiryTime.diff(moment())).asDays() - 1
	);

	const expiryTime = moment.duration(_expiryTime.diff(new Date()));

	const displayExpiryTime = `${diffDays} ${t(
		"lbl_Days"
	)} ${expiryTime.hours()} ${t("lbl_Hours")}`;

	return (
		<div className="rollover">
			<div>
				{requiredAmount > 0 ? (
					<div className="icon icon-icon32px_money">
						{t("lbl_MinAmount")}
					</div>
				) : null}
				<div className="icon icon-icon32px_time">
					{t("lbl_RemainingTime")}
				</div>
				<div className="icon icon-icon32px_">{t("lbl_RollOver")}</div>
			</div>
			<div className="txt-orange">
				{requiredAmount > 0 ? (
					<div>
						{number_format(requiredAmount, isConvert(currencyId))}
					</div>
				) : null}
				<div>{displayExpiryTime}</div>
				<div>{rollOver}X</div>
			</div>
		</div>
	);
};
