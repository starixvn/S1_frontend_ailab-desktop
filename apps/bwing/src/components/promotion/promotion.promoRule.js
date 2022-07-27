import React from "react";
import moment from "moment";
import { promoStatus, defPromotionType, defBonusType } from "./promotion.def";
import { number_format, langAndCurrMapping } from "../common/common";
import { siteDefLangId } from "../../service/language";

const numberWithCurrency = (value, currencyName) =>
	`${currencyName} ${number_format({
		number: value,
		isConvertRequired: false,
		digits: 0
	})}`;

export const getExpiryTime = (
	t,
	{ isJoin, status, custExpiryTime, periodTo }
) => {
	const _expiryTime = moment.unix(
		isJoin && status === promoStatus.running && custExpiryTime
			? moment(custExpiryTime).unix()
			: periodTo
	);

	const diffDays = Math.ceil(
		moment.duration(_expiryTime.diff(moment())).asDays() - 1
	);

	const expiryTime = moment.duration(_expiryTime.diff(new Date()));

	return `${diffDays} ${t("lbl_Days")} ${expiryTime.hours()} ${t(
		"lbl_Hours"
	)}`;
};

const getCurrencyName = ({ langId, currencyId, t }) => {
	const _langMappingCurr = langId ?? siteDefLangId;
	return currencyId
		? t(`Currency_${currencyId}`)
		: t(`Currency_${langAndCurrMapping[_langMappingCurr]}`);
};

export default ({ promotionInfo, t, currencyId, langId, isTable }) => {
	const {
		rollOver,
		promotionType,
		bonus,
		bonusType,
		maxBonus,
		requiredAmount
	} = promotionInfo;

	const isPercentage = bonusType === defBonusType.percentage;

	const currencyName = getCurrencyName({ langId, currencyId, t });

	const displayExpiryTime = getExpiryTime(t, promotionInfo);

	const isStaticOrRebate =
		promotionType === defPromotionType.other ||
		promotionType === defPromotionType.rebate;

	const displayMinAmount = requiredAmount > 0;

	if (isTable) {
		return (
			<div className="rolloverList">
				{!isStaticOrRebate && displayMinAmount && (
					<div>
						<div>{t("lbl_Promotion_Min_Deposit")}</div>
						<div>
							{numberWithCurrency(requiredAmount, currencyName)}
						</div>
					</div>
				)}

				{!isStaticOrRebate && (
					<div>
						<div>{t("lbl_Promotion_Bonus")}</div>
						<div>
							{isPercentage
								? `${bonus}%`
								: numberWithCurrency(bonus, currencyName)}
						</div>
					</div>
				)}

				{isPercentage && !isStaticOrRebate && (
					<div>
						<div>{t("lbl_MaxBonusAmount")}</div>
						<div>{numberWithCurrency(maxBonus, currencyName)}</div>
					</div>
				)}

				<div>
					<div>{t("lbl_RollOver").toUpperCase()}</div>
					<div>{rollOver}X</div>
				</div>

				<div>
					<div>{t("lbl_RemainingTime").toUpperCase()}</div>
					<div>{displayExpiryTime}</div>
				</div>
			</div>
		);
	}

	return (
		<div className="rollover">
			{!isStaticOrRebate && displayMinAmount && (
				<div className="icon icon-coin-dollar">
					{t("lbl_Promotion_Min_Deposit")}
					<span>
						{numberWithCurrency(requiredAmount, currencyName)}
					</span>
				</div>
			)}

			{!isStaticOrRebate && (
				<div className="icon icon-coin-dollar">
					{t("lbl_Promotion_Bonus")}
					<span>
						{isPercentage
							? `${bonus}%`
							: numberWithCurrency(bonus, currencyName)}
					</span>
				</div>
			)}

			{isPercentage && !isStaticOrRebate && (
				<div className="icon icon-coin-dollar">
					{t("lbl_MaxBonusAmount")}
					<span>{numberWithCurrency(maxBonus, currencyName)}</span>
				</div>
			)}

			<div className="icon icon-icon32px_">
				{t("lbl_RollOver").toUpperCase()}
				<span>{rollOver}X</span>
			</div>
		</div>
	);
};
