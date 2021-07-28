import React from "react";
import moment from "moment";
import { promoStatus, defPromotionType, defBonusType } from "./promotion.def";
import { number_format, isConvert, langAndCurrMapping } from "../common/common";
import { RULE_TYPE } from "./promotion.common";
import { siteDefLangId } from "../../service/language";

const numberWithCurrency = (value, currencyName, _isConvert) => {
	return `${currencyName} ${number_format(value, false, 0)}`;
};

export default ({ promotionInfo, t, currencyId, ruleType, langId }) => {
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

	const isPercentage = bonusType === defBonusType.percentage;

	const _langMappingCurr = langId ?? siteDefLangId;
	const currencyName = currencyId
		? t(`Currency_${currencyId}`)
		: t(`Currency_${langAndCurrMapping[_langMappingCurr]}`);

	const _isConvert = isConvert(currencyId);

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

	const isStaticOrRebate =
		promotionType === defPromotionType.other ||
		promotionType === defPromotionType.rebate;

	const displayMinAmount = requiredAmount > 0;

	if (ruleType === RULE_TYPE.info)
		return (
			<div className="rollover">
				<div>
					{!isStaticOrRebate && (
						<>
							{displayMinAmount && (
								<div className="icon icon-icon32px_money">
									{t("lbl_Promotion_Min_Deposit")}
								</div>
							)}
							<div className="icon icon-icon32px_">
								{t("lbl_Promotion_Bonus")}
							</div>
						</>
					)}
					{isPercentage && !isStaticOrRebate && (
						<div className="icon icon-icon32px_">
							{t("lbl_MaxBonusAmount")}
						</div>
					)}
					<div className="icon icon-icon32px_">
						{t("lbl_RollOver")}
					</div>
					<div className="icon icon-icon32px_time">
						{t("lbl_RemainingTime")}
					</div>
				</div>

				<div className="txt-orange">
					{!isStaticOrRebate && (
						<>
							{displayMinAmount && (
								<div>
									{numberWithCurrency(
										requiredAmount,
										currencyName,
										_isConvert
									)}
								</div>
							)}
							<div>
								{isPercentage
									? `${bonus}%`
									: numberWithCurrency(
											bonus,
											currencyName,
											_isConvert
									  )}
							</div>
						</>
					)}

					{isPercentage && !isStaticOrRebate && (
						<div>
							{numberWithCurrency(
								maxBonus,
								currencyName,
								_isConvert
							)}
						</div>
					)}
					<div>{rollOver}X</div>
					<div>{displayExpiryTime}</div>
				</div>
			</div>
		);

	if (ruleType === RULE_TYPE.list)
		return (
			<div className="rolloverList">
				{!isStaticOrRebate && (
					<>
						{displayMinAmount && (
							<div>
								<div>{t("lbl_Promotion_Min_Deposit")}</div>
								<div>
									{numberWithCurrency(
										requiredAmount,
										currencyName,
										_isConvert
									)}
								</div>
							</div>
						)}
						<div>
							<div>{t("lbl_Promotion_Bonus")}</div>
							<div>
								{isPercentage
									? `${bonus}%`
									: numberWithCurrency(
											bonus,
											currencyName,
											_isConvert
									  )}
							</div>
						</div>
					</>
				)}

				{isPercentage && !isStaticOrRebate && (
					<div>
						<div>{t("lbl_MaxBonusAmount")}</div>
						<div>
							{numberWithCurrency(
								maxBonus,
								currencyName,
								_isConvert
							)}
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
