import React from "react";
import moment from "moment";
import { promoStatus, defPromotionType } from "./promotion.def";
import { number_format } from "../common/common";

export default ({ promotionInfo, t, inListPage }) => {
	const {
		isJoin,
		status,
		custExpiryTime,
		periodTo,
		rollOver,
		promotionType,
		bonus,
		bonusType,
		maxBonus,
		requiredAmount
	} = promotionInfo;

	const isPercentage = bonusType === 1;

	const isAmount = bonusType === 2;

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
				{isPercentage && promotionType !== defPromotionType.other && (
					<>
						<div>{t("lbl_Promotion_Min_Deposit")}</div>

						<div>{t("lbl_Promotion_Bonus")}</div>
					</>
				)}

				{!isAmount && promotionType !== defPromotionType.other && (
					<div>{t("lbl_MaxBonusAmount")}</div>
				)}

				<div>{t("lbl_RollOver").toUpperCase()}</div>

				<div>{t("lbl_RemainingTime")}</div>
			</div>

			<div className={inListPage ? "txt-yellow" : ""}>
				{isPercentage && promotionType !== defPromotionType.other && (
					<>
						<div>{number_format(requiredAmount, true, 0)}</div>

						<div>{bonus}%</div>
					</>
				)}

				{!isAmount && promotionType !== defPromotionType.other && (
					<div>{number_format(maxBonus, true, 0)}</div>
				)}

				<div>{rollOver}X</div>

				<div>{displayExpiryTime}</div>
			</div>
		</div>
	);
};
