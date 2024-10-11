import React from "react";
import PropTypes from "prop-types";
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
	{ isJoin, status, custExpiryTime, periodTo, periodFrom }
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

	let isActive = false;

	const periodFromTime = moment.unix(periodFrom);
	if (periodFromTime.diff(Date.now()) <= 0) {
		isActive = true;
	}

	return isActive
		? `${diffDays} ${t("lbl_Days")} ${expiryTime.hours()} ${t("lbl_Hours")}`
		: `0 ${t("lbl_Days")} 0 ${t("lbl_Hours")}`;
};

const getCurrencyName = ({ langId, currencyId, t }) => {
	const _langMappingCurr = langId ?? siteDefLangId;
	return currencyId
		? t(`Currency_${currencyId}`)
		: t(`Currency_${langAndCurrMapping[_langMappingCurr]}`);
};

const PromoRule = ({ promotionInfo, t, currencyId, langId }) => {
	const {
		rollOver,
		promotionType,
		bonus,
		bonusType,
		maxBonus,
		requiredAmount,
		tierAmountList
	} = promotionInfo;

	const isPercentage = bonusType === defBonusType.percentage;

	const currencyName = getCurrencyName({ langId, currencyId, t });

	const displayExpiryTime = getExpiryTime(t, promotionInfo);

	const isStaticOrRebate =
		promotionType === defPromotionType.other ||
		promotionType === defPromotionType.rebate;

	const displayMinAmount = requiredAmount > 0;

	if (tierAmountList?.length > 0) {
		const redepositList = tierAmountList.map(el => (
			<div className="promotionpop-td" key={el.requiredAmount}>
				<div>{numberWithCurrency(el.requiredAmount, currencyName)}</div>
				<div>
					{isPercentage
						? `${el.bonus}%`
						: numberWithCurrency(el.bonus, currencyName)}
				</div>
				{isPercentage && (
					<div>{numberWithCurrency(el.maxBonus, currencyName)}</div>
				)}

				<div>{el.rollOver}X</div>
			</div>
		));

		return tierAmountList?.length > 1 ? (
			<>
				<div className="promotionpop-info remaining-time">
					<div className="promotionpop-info-inner">
						<div className="promotionpop-remaining">
							<div className="th">{t("lbl_RemainingTime")}</div>
							<div className="td">{displayExpiryTime}</div>
						</div>
					</div>
				</div>
				<div className="promotionpop-info-table multiple">
					<div className="promotionpop-th">
						<div>{t("lbl_Promotion_Min_Deposit")}</div>
						<div>{t("lbl_Promotion_Bonus")}</div>
						{isPercentage && <div>{t("lbl_MaxBonusAmount")}</div>}
						<div>{t("lbl_RollOver")}</div>
					</div>
					{redepositList}
				</div>
			</>
		) : (
			// 只有一組時使用同一排顯示
			<div className="promotionpop-info-table">
				<div className="promotionpop-th">
					<div>{t("lbl_Promotion_Min_Deposit")}</div>
					<div>{t("lbl_Promotion_Bonus")}</div>
					{isPercentage && <div>{t("lbl_MaxBonusAmount")}</div>}
					<div>{t("lbl_RollOver")}</div>
					<div className="th">{t("lbl_RemainingTime")}</div>
				</div>
				<div className="promotionpop-td">
					<div>
						{numberWithCurrency(
							tierAmountList[0]?.requiredAmount,
							currencyName
						)}
					</div>
					<div>
						{isPercentage
							? `${tierAmountList[0]?.bonus}%`
							: numberWithCurrency(
									tierAmountList[0]?.bonus,
									currencyName
							  )}
					</div>
					{isPercentage && (
						<div>
							{numberWithCurrency(
								tierAmountList[0]?.maxBonus,
								currencyName
							)}
						</div>
					)}
					<div>{tierAmountList[0]?.rollOver}X</div>
					<div>{displayExpiryTime}</div>
				</div>
			</div>
		);
	}

	return (
		<div className="promotionpop-info">
			{!isStaticOrRebate && displayMinAmount && (
				<div className="promotionpop-info-item">
					<div>{t("lbl_Promotion_Min_Deposit")}</div>
					<div>
						{numberWithCurrency(requiredAmount, currencyName)}
					</div>
				</div>
			)}

			{!isStaticOrRebate && (
				<div className="promotionpop-info-item">
					<div>{t("lbl_Promotion_Bonus")}</div>
					<div>
						{isPercentage
							? `${bonus}%`
							: numberWithCurrency(bonus, currencyName)}
					</div>
				</div>
			)}

			{isPercentage && !isStaticOrRebate && (
				<div className="promotionpop-info-item">
					<div>{t("lbl_MaxBonusAmount")}</div>
					<div>{numberWithCurrency(maxBonus, currencyName)}</div>
				</div>
			)}

			<div className="promotionpop-info-item">
				<div>{t("lbl_RollOver").toUpperCase()}</div>
				<div>{rollOver}X</div>
			</div>

			<div className="promotionpop-info-item">
				<div>{t("lbl_RemainingTime").toUpperCase()}</div>
				<div>{displayExpiryTime}</div>
			</div>
		</div>
	);
};

PromoRule.defaultProps = {
	promotionInfo: null,
	currencyId: null,
	langId: null
};

PromoRule.propTypes = {
	t: PropTypes.func.isRequired,
	promotionInfo: PropTypes.objectOf(PropTypes.any),
	currencyId: PropTypes.number,
	langId: PropTypes.string
};

export default PromoRule;
