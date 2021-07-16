import React from "react";
import moment from "moment";
import { promoStatus, defBonusType, defPromotionType } from "./promotion.def";
import { number_format, langAndCurrMapping } from "../common/common";
import { RULE_TYPE } from "./promotion.common";
import { siteDefLangId } from "../../service/language";

const numberWithCurrency = (value, currencyName) => {
	return `${currencyName} ${number_format({
		number: value,
		isConvertRequired: false,
		digits: 0
	})}`;
};

const getCurrencyName = ({ langId, currencyId, t }) => {
	const _langMappingCurr = langId ?? siteDefLangId;
	return currencyId
		? t(`Currency_${currencyId}`)
		: t(`Currency_${langAndCurrMapping[_langMappingCurr]}`);
};

export default ({ promotionInfo, t, ruleType, currencyId, langId }) => {
	const {
		isJoin,
		status,
		bonus,
		maxBonus,
		bonusType,
		custExpiryTime,
		periodTo,
		requiredAmount,
		rollOver,
		promotionType
	} = promotionInfo;

	const isPercentage = bonusType === defBonusType.percentage;

	const currencyName = getCurrencyName({ langId, currencyId, t });

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

	const isStaticOrRebate =
		promotionType === defPromotionType.other ||
		promotionType === defPromotionType.rebate;

	if (ruleType === RULE_TYPE.list)
		return (
			<div className="rolloverNew">
				<div>
					{!isStaticOrRebate && (
						<>
							<div>
								{t("lbl_Promotion_Min_Deposit")?.toUpperCase()}
							</div>
							<div>{t("lbl_Promotion_Bonus")?.toUpperCase()}</div>
						</>
					)}
					{isPercentage && !isStaticOrRebate && (
						<div>{t("lbl_MaxBonusAmount")?.toUpperCase()}</div>
					)}
					<div>{t("lbl_RollOver")?.toUpperCase()}</div>
					<div>{t("lbl_RemainingTime")?.toUpperCase()}</div>
				</div>
				<div>
					{!isStaticOrRebate && (
						<>
							<div>
								{numberWithCurrency(
									requiredAmount,
									currencyName
								)}
							</div>
							<div>
								{isPercentage
									? `${bonus}%`
									: numberWithCurrency(bonus, currencyName)}
							</div>
						</>
					)}
					{isPercentage && !isStaticOrRebate && (
						<div>{numberWithCurrency(maxBonus, currencyName)}</div>
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
					{!isStaticOrRebate && (
						<>
							<div className="icon icon-icon32px_money">
								{t("lbl_Promotion_Min_Deposit")?.toUpperCase()}
							</div>
							<div className="icon icon-icon32px_">
								{t("lbl_Promotion_Bonus")?.toUpperCase()}
							</div>
						</>
					)}
					{isPercentage && !isStaticOrRebate && (
						<div className="icon icon-icon32px_">
							{t("lbl_MaxBonusAmount")?.toUpperCase()}
						</div>
					)}
					<div className="icon icon-icon32px_">
						{t("lbl_RollOver")?.toUpperCase()}
					</div>
					<div className="icon icon-icon32px_time">
						{t("lbl_RemainingTime")?.toUpperCase()}
					</div>
				</div>
				<div className="txt-orange">
					{!isStaticOrRebate && (
						<>
							<div>
								{numberWithCurrency(
									requiredAmount,
									currencyName
								)}
							</div>
							<div>
								{isPercentage
									? `${bonus}%`
									: numberWithCurrency(bonus, currencyName)}
							</div>
						</>
					)}
					{isPercentage && !isStaticOrRebate && (
						<div>{numberWithCurrency(maxBonus, currencyName)}</div>
					)}
					<div>{rollOver}X</div>
					<div>{displayExpiryTime}</div>
				</div>
			</div>
		);
};
