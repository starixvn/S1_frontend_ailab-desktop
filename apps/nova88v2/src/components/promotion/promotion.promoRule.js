import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { promoStatus, defPromotionType, defBonusType } from "./promotion.def";
import { number_format, isConvert, langAndCurrMapping } from "../common/common";
import { RULE_TYPE } from "./promotion.common";
import { siteDefLangId } from "../../service/language";

const numberWithCurrency = (value, currencyName, _isConvert) =>
	`${currencyName} ${number_format(value, false, 0)}`;

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

const PromoRule = ({ promotionInfo, t, currencyId, ruleType, langId }) => {
	const {
		bonus,
		bonusType,
		maxBonus,
		rollOver,
		winOver,
		promotionType,
		requiredAmount,
		fullFillType
	} = promotionInfo;

	const isPercentage = bonusType === defBonusType.percentage;

	const _langMappingCurr = langId ?? siteDefLangId;
	const currencyName = currencyId
		? t(`Currency_${currencyId}`)
		: t(`Currency_${langAndCurrMapping[_langMappingCurr]}`);

	const _isConvert = isConvert(currencyId);

	const displayExpiryTime = getExpiryTime(t, promotionInfo);

	const isStaticOrRebate =
		promotionType === defPromotionType.other ||
		promotionType === defPromotionType.rebate;

	const displayMinAmount = requiredAmount > 0;

	if (ruleType === RULE_TYPE.info)
		return (
			<div className="rollover">
				{!isStaticOrRebate && displayMinAmount && (
					<div className="icon icon-coin-dollar">
						{t("lbl_Promotion_Min_Deposit")}
						<span>
							{numberWithCurrency(
								requiredAmount,
								currencyName,
								_isConvert
							)}
						</span>
					</div>
				)}

				{!isStaticOrRebate && (
					<div className="icon icon-coin-dollar">
						{t("lbl_Promotion_Bonus")}
						<span>
							{isPercentage
								? `${bonus}%`
								: numberWithCurrency(
										bonus,
										currencyName,
										_isConvert
								  )}
						</span>
					</div>
				)}

				{isPercentage && !isStaticOrRebate && (
					<div className="icon icon-coin-dollar">
						{t("lbl_MaxBonusAmount")}
						<span>
							{numberWithCurrency(
								maxBonus,
								currencyName,
								_isConvert
							)}
						</span>
					</div>
				)}

				<div className="icon icon-icon32px_">
					{fullFillType === 2 ? t("lbl_WinOver") : t("lbl_RollOver")}
					<span>{fullFillType === 2 ? winOver : rollOver}x</span>
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
					<div>
						{fullFillType === 2
							? t("lbl_WinOver")
							: t("lbl_RollOver")}
					</div>
					<div>{fullFillType === 2 ? winOver : rollOver}x</div>
				</div>

				<div>
					<div>{t("lbl_RemainingTime")}</div>
					<div>{displayExpiryTime}</div>
				</div>
			</div>
		);
	return true;
};

PromoRule.defaultProps = {
	promotionInfo: null,
	currencyId: null,
	ruleType: null,
	langId: null
};

PromoRule.propTypes = {
	t: PropTypes.func.isRequired,
	promotionInfo: PropTypes.objectOf(PropTypes.any),
	currencyId: PropTypes.number,
	ruleType: PropTypes.string,
	langId: PropTypes.string
};

export default PromoRule;
