import React from "react";
import moment from "moment";
import { promoStatus, defPromotionType, defBonusType } from "./promotion.def";
import { number_format, langAndCurrMapping } from "../common/common";
import { siteDefLangId } from "../../service/language";

const numberWithCurrency = (value, currencyName) => {
	return `${currencyName} ${number_format(value, true, 0)}`;
};

const getCurrencyName = ({ langId, currencyId, t }) => {
	const _langMappingCurr = langId ?? siteDefLangId;
	return currencyId
		? t(`Currency_${currencyId}`)
		: t(`Currency_${langAndCurrMapping[_langMappingCurr]}`);
};

export default ({ promotionInfo, t, inListPage, currencyId, langId }) => {
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

	const displayExpiryTime = `${diffDays} ${t(
		"lbl_Days"
	)} ${expiryTime.hours()} ${t("lbl_Hours")}`;

	const isStaticOrRebate =
		promotionType === defPromotionType.other ||
		promotionType === defPromotionType.rebate;

	return (
		<div className="rollover">
			<div>
				{!isStaticOrRebate && (
					<>
						<div>{t("lbl_Promotion_Min_Deposit")}</div>
						<div>{t("lbl_Promotion_Bonus")}</div>
					</>
				)}
				{isPercentage && !isStaticOrRebate && (
					<div>{t("lbl_MaxBonusAmount")}</div>
				)}
				<div>{t("lbl_RollOver").toUpperCase()}</div>
				<div>{t("lbl_RemainingTime")}</div>
			</div>
			<div className={inListPage ? "txt-yellow" : ""}>
				{!isStaticOrRebate && (
					<>
						<div>
							{numberWithCurrency(requiredAmount, currencyName)}
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
