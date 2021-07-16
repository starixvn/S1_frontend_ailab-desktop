import React from "react";
import moment from "moment";
import { promoStatus, defPromotionType } from "./promotion.def";
import { number_format, isConvert } from "../common/common";
import { RULE_TYPE } from "./promotion.common";

export default ({ promotionInfo, t, currencyId, ruleType }) => {
	const {
		isJoin,
		status,
		bonus,
		bonusType,
		custExpiryTime,
		periodTo,
		maxBonus,
		rollOver,
		promotionType,
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

	if (ruleType === RULE_TYPE.info)
		return (
			<div className="rollover">
				<div>
					{isPercentage && (
						<>
							<div className="icon icon-icon32px_time">
								{t("lbl_Promotion_Min_Deposit")}
							</div>

							<div className="icon icon-icon32px_time">
								{t("lbl_Promotion_Bonus")}
							</div>
						</>
					)}

					{!isAmount && promotionType !== defPromotionType.other && (
						<div className="icon icon-icon32px_money">
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
					{isPercentage && (
						<>
							<div>
								{number_format(
									requiredAmount,
									isConvert(currencyId),
									0
								)}
							</div>

							<div>{bonus}%</div>
						</>
					)}

					{!isAmount && promotionType !== defPromotionType.other && (
						<div>
							{number_format(maxBonus, isConvert(currencyId), 0)}
						</div>
					)}

					<div>{displayExpiryTime}</div>

					<div>{rollOver}X</div>
				</div>
			</div>
		);

	if (ruleType === RULE_TYPE.list)
		return (
			<div className="rolloverList">
				{isPercentage && promotionType !== defPromotionType.other && (
					<>
						<div>
							<div>{t("lbl_Promotion_Min_Deposit")}</div>
							<div>
								{number_format(
									requiredAmount,
									isConvert(currencyId),
									0
								)}
							</div>
						</div>
						<div>
							<div>{t("lbl_Promotion_Bonus")}</div>
							<div>{bonus}%</div>
						</div>
					</>
				)}

				{!isAmount && promotionType !== defPromotionType.other && (
					<div>
						<div>{t("lbl_MaxBonusAmount")}</div>
						<div>
							{number_format(maxBonus, isConvert(currencyId), 0)}
						</div>
					</div>
				)}

				<div>
					<div>{t("lbl_RollOver")}</div>
					<div>{rollOver}X</div>
				</div>

				<div>
					<div>{t("lbl_RemainingTime")}</div>
					<div>{displayExpiryTime}</div>
				</div>
			</div>
		);
};
