import React from "react";
import moment from "moment";
import { promoStatus } from "./promotion.def";
import { number_format } from "../common/common";
import { RULE_TYPE } from "./promotion.common";

export default ({ promotionInfo, t, ruleType }) => {
	const {
		isJoin,
		status,
		bonus,
		maxBonus,
		bonusType,
		custExpiryTime,
		periodTo,
		requiredAmount,
		rollOver
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

	// const expiryTime = moment.duration(
	// 	moment
	// 		.unix(
	// 			isJoin && status === promoStatus.running && custExpiryTime
	// 				? moment(custExpiryTime).unix()
	// 				: periodTo
	// 		)
	// 		.diff(new Date())
	// );

	const displayExpiryTime = `${diffDays} ${t(
		"lbl_Days"
	)} ${expiryTime.hours()} ${t("lbl_Hours")}`;

	if (ruleType === RULE_TYPE.list)
		return (
			<div className="rolloverNew">
				<div>
					{isPercentage && requiredAmount > 0 && (
						<div>{t("lbl_Promotion_Min_Deposit")}</div>
					)}

					{isPercentage && <div>{t("lbl_Promotion_Bonus")}</div>}

					{!isAmount && <div>{t("lbl_MaxBonusAmount")}</div>}

					<div>{t("lbl_RemainingTime")}</div>

					<div>{t("lbl_RollOver")}</div>
				</div>
				<div>
					{isPercentage && requiredAmount > 0 && (
						<div>{number_format(requiredAmount, false, 0)}</div>
					)}

					{isPercentage && <div>{bonus}%</div>}

					{!isAmount && (
						<div> {number_format(maxBonus, false, 0)}</div>
					)}

					<div>{rollOver}X</div>

					<div>{displayExpiryTime}</div>
				</div>
			</div>
		);
	if (ruleType === RULE_TYPE.info)
		return (
			<div className="rollover">
				<div>
					{isPercentage && requiredAmount > 0 && (
						<div className="icon icon-icon32px_money">
							{t("lbl_Promotion_Min_Deposit")}
						</div>
					)}

					{isPercentage && (
						<div className="icon icon-icon32px_">
							{t("lbl_Promotion_Bonus")}
						</div>
					)}

					{!isAmount && (
						<div className="icon icon-icon32px_">
							{t("lbl_MaxBonusAmount")}
						</div>
					)}

					<div className="icon icon-icon32px_time">
						{t("lbl_RemainingTime")}
					</div>

					<div className="icon icon-icon32px_">
						{t("lbl_RollOver")}
					</div>
				</div>

				<div className="txt-orange">
					{isPercentage && requiredAmount > 0 && (
						<div>{number_format(requiredAmount, false, 0)}</div>
					)}

					{isPercentage && <div>{bonus}%</div>}

					{!isAmount && (
						<div> {number_format(maxBonus, false, 0)}</div>
					)}

					<div>{rollOver}X</div>

					<div>{displayExpiryTime}</div>
				</div>
			</div>
		);
};
