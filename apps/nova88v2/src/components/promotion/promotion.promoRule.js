import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { promoStatus, defPromotionType, defBonusType } from "./promotion.def";
import { number_format, isConvert, langAndCurrMapping } from "../common/common";
import { siteDefLangId } from "../../service/language";

const numberWithCurrency = (value, currencyName, _isConvert) =>
	`${currencyName} ${number_format(value, false, 0)}`;

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

const PromoRule = ({ promotionInfo, t, currencyId, langId }) => {
	const {
		bonus,
		bonusType,
		maxBonus,
		rollOver,
		winOver,
		promotionType,
		requiredAmount,
		fullFillType,
		tierAmountList
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

	if (tierAmountList?.length > 0) {
		const redepositList = tierAmountList.map(el => (
			<div key={el.requiredAmount}>
				<div>
					{numberWithCurrency(
						el.requiredAmount,
						currencyName,
						_isConvert
					)}
				</div>
				<div>
					{isPercentage
						? `${el.bonus}%`
						: numberWithCurrency(
								el.bonus,
								currencyName,
								_isConvert
						  )}
				</div>
				{isPercentage && (
					<div>
						{numberWithCurrency(
							el.maxBonus,
							currencyName,
							_isConvert
						)}
					</div>
				)}
				<div> {fullFillType === 2 ? el.winOver : el.rollOver}x</div>
			</div>
		));

		return (
			<>
				<div className="remainingTime">
					<div>
						<div>{t("lbl_RemainingTime")}</div>
						<div>{displayExpiryTime}</div>
					</div>
				</div>
				<div className="rolloverListNew">
					<div>
						<div>{t("lbl_Promotion_Min_Deposit")}</div>
						<div>{t("lbl_Promotion_Bonus").toUpperCase()}</div>
						{isPercentage && <div>{t("lbl_MaxBonusAmount")}</div>}
						<div>
							{fullFillType === 2
								? t("lbl_WinOver")
								: t("lbl_RollOver")}
						</div>
					</div>
					{redepositList}
				</div>
			</>
		);
	}

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
						<div>{t("lbl_Promotion_Bonus").toUpperCase()}</div>
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
						{numberWithCurrency(maxBonus, currencyName, _isConvert)}
					</div>
				</div>
			)}

			<div>
				<div>
					{fullFillType === 2 ? t("lbl_WinOver") : t("lbl_RollOver")}
				</div>
				<div>{fullFillType === 2 ? winOver : rollOver}x</div>
			</div>

			<div>
				<div>{t("lbl_RemainingTime")}</div>
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
