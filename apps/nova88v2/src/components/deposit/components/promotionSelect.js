import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation, Trans } from "react-i18next";
import { userInfoContext } from "../../common/context";
import Dropdown from "../../common/dropdown";
import { number_format, isConvert } from "../../common/common";

const NONE_IDX = 0;

const PromotionSelect = ({ value, amount, depositPromoList, onSelectItem }) => {
	const { requiredAmount, idx, specialCode, bonusCode } = value;

	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { phoneVerified, currencyId } = userInfo;

	const selectClassName = ["inputBox-blue", specialCode && "active"]
		.filter(Boolean)
		.join(" ");

	const inputClassName = ["inputBox-white", bonusCode && "active"]
		.filter(Boolean)
		.join(" ");

	const input = specialCode ?? "";

	return (
		<>
			<div className="subModuleTitle">
				<i className="txt-blue" />
				{t("lbl_Nova_Select_Bonus")}
			</div>

			<div className="subModule">
				<div className={selectClassName}>
					<Dropdown
						mainKey="deposit-localbank-bonus-provider"
						options={depositPromoList}
						onSelectItem={onSelectItem}
						selectedIdx={idx}
						i18n={t}
					/>
				</div>

				<div className={inputClassName}>
					<input
						value={input}
						placeholder={t("lbl_PromoCode")}
						onChange={val =>
							onSelectItem(NONE_IDX, {
								requiredAmount: null,
								specialCode: val.target.value
							})
						}
					/>
				</div>

				<DepositPromoTip
					t={t}
					amount={amount}
					phoneVerified={phoneVerified}
					currencyId={currencyId}
					requiredAmount={requiredAmount}
				/>
			</div>
		</>
	);
};

export default PromotionSelect;

PromotionSelect.propTypes = {
	amount: PropTypes.number.isRequired,
	value: PropTypes.objectOf(PropTypes.any).isRequired,
	onSelectItem: PropTypes.func.isRequired,
	depositPromoList: PropTypes.arrayOf(PropTypes.any).isRequired
};

const DepositPromoTip = ({
	t,
	amount,
	phoneVerified,
	currencyId,
	requiredAmount
}) => {
	const _isConvert = isConvert(currencyId);
	const resultAmount = _isConvert ? amount * 1000 : Number(amount);

	const depositPromoMsgActive = !phoneVerified || requiredAmount;

	const depositPromoMsgClass = ["tip", depositPromoMsgActive && "active"]
		.filter(Boolean)
		.join(" ");

	const tip = () => {
		if (!phoneVerified) return t("lbl_Nova_DepositPromoMsg1");

		if (!requiredAmount) return null;

		if (resultAmount < requiredAmount)
			return (
				<Trans
					i18nKey="lbl_Nova_DepositPromoMsg2"
					values={{
						currency: t(`Currency_${currencyId}`),
						amount: number_format(requiredAmount, _isConvert)
					}}
					components={{
						span: <span className="txt-red" />
					}}
				/>
			);

		return null;
	};

	return <div className={depositPromoMsgClass}>{tip()}</div>;
};

DepositPromoTip.defaultProps = {
	phoneVerified: false,
	currencyId: null,
	requiredAmount: null
};

DepositPromoTip.propTypes = {
	t: PropTypes.func.isRequired,
	amount: PropTypes.number.isRequired,
	phoneVerified: PropTypes.bool,
	currencyId: PropTypes.number,
	requiredAmount: PropTypes.number
};
