import React from "react";
import moment from "moment";
import { promoStatus, defPromotionType } from "./promotion.def";
import { number_format, isConvert } from "../common/common";

export default ({ promotionInfo, t, currencyId }) => {
	const {
		isJoin,
		status,
		custExpiryTime,
		periodTo,
		maxBonus,
		rollOver,
		promotionType
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
				{promotionType !== defPromotionType.other && (
					<div className="icon icon-icon32px_money">
						{t("lbl_MaxBonusAmount")}
					</div>
				)}
				<div className="icon icon-icon32px_time">
					{t("lbl_RemainingTime")}
				</div>
				<div className="icon icon-icon32px_">{t("lbl_RollOver")}</div>
			</div>
			<div className="txt-orange">
				{promotionType !== defPromotionType.other && (
					<div>{number_format(maxBonus, isConvert(currencyId))}</div>
				)}
				<div>{displayExpiryTime}</div>
				<div>{rollOver}X</div>
			</div>
		</div>
	);
};
