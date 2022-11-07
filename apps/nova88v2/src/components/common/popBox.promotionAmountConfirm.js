import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Dropdown from "./dropdown";
import { defPromotionType } from "../promotion/promotion.def";
import { defFilterType } from "../promotion/promotion.nav";
import { checkAmount, isConvert, number_format } from "./common";

const AmountConfirmPopbox = ({
	currencyId,
	langId,
	promotionInfo,
	bonusType,
	clickClose,
	setClaimPromotion
}) => {
	const { t } = useTranslation();
	const _isConvert = isConvert(currencyId);
	const [amount, setAmount] = useState("");
	const [validationError, setValidationError] = useState({});
	const [selectedIdx, setSelectedIdx] = useState(0);
	const { bonusCode, canJoinTierAmountList, promotionType } = promotionInfo;

	const options = canJoinTierAmountList?.map((el, i) => ({
		id: i,
		displayText: `${t("lbl_DepositAmount")} ${el.requiredAmount} / ${t(
			"lbl_Promotion_Bonus"
		)} ${el.bonusAmount}`,
		lockedAmount: el.lockedAmount
	}));

	const onSelectItem = i => {
		if (i !== selectedIdx) {
			setSelectedIdx(i);
		}
	};

	const renderInput = () => {
		const { requiredAmount, maxAmount } = promotionInfo;

		const onSetClaimPromotion = () => {
			if (validationError.status !== 0) return;

			const _amount = _isConvert ? amount * 1000 : amount;
			setClaimPromotion(langId, bonusCode, _amount);
		};

		const validAmount = _amount => {
			const result = checkAmount({
				amount: _amount,
				minAmount: requiredAmount,
				maxAmount,
				_isConvert,
				t
			});
			setValidationError(result);
		};

		return (
			<>
				<div className="inputBox-white">
					<input
						// autoFocus
						value={amount}
						onBlur={() => validAmount(amount)}
						onChange={e => setAmount(e.target.value)}
					/>
				</div>
				<div
					className={`tip ${
						validationError.status !== 0 ? "active" : ""
					}`}>
					{validationError.msg}
				</div>
				<div className="txt-orange">
					{`${t("lbl_ClaimAmountRange")}: 
				 ${number_format(requiredAmount, _isConvert)} ~ 
				 ${number_format(maxAmount, _isConvert)}`}
				</div>

				<div className="btnGroup">
					<button className="btn-cancel" onClick={clickClose}>
						{t("lbl_Cancel")}
					</button>
					<button className="btn-check" onClick={onSetClaimPromotion}>
						{t("lbl_PromoJoinNow")}
					</button>
				</div>
			</>
		);
	};

	const renderDropdown = () => {
		const onSetClaimPromotion = () => {
			setClaimPromotion(
				langId,
				bonusCode,
				options[selectedIdx].lockedAmount
			);
		};
		return (
			<>
				<div className="inputBox-blue">
					<Dropdown
						i18n={t}
						mainKey={`${bonusCode}_`}
						options={options}
						selectedIdx={selectedIdx}
						onSelectItem={onSelectItem}
					/>
				</div>
				<div className="btnGroup">
					<button className="btn-cancel" onClick={clickClose}>
						{t("lbl_Cancel")}
					</button>
					<button className="btn-check" onClick={onSetClaimPromotion}>
						{t("lbl_PromoJoinNow")}
					</button>
				</div>
			</>
		);
	};

	useEffect(() => {
		setAmount(String(amount).replace(/^(0+)|[^\d]+/g, ""));
	}, [amount]);

	// * 如果 'promotionType' 為 specialBonus 以及是 'firstDeposit' 則需提供 Input 給使用者填寫金額
	const isRenderInput =
		promotionType === defPromotionType.firstDeposit &&
		bonusType === defFilterType.specialBonus;

	// * 如果 promotionType 為 redeposit 則提供 距級 的 Dropdown 直接選擇
	const isRenderDropdown = promotionType === defPromotionType.redeposit;

	return (
		<div className="loackAmount" style={{ display: "flex" }}>
			<div className="icon icon-gift" />
			<div className="title">{t("lbl_ImportantNote")}</div>
			<div className="txt-lightgray">
				{t("lbl_PleaseEnterClaimAmount")}
			</div>

			{isRenderInput && renderInput()}

			{isRenderDropdown && renderDropdown()}
		</div>
	);
};

AmountConfirmPopbox.defaultProps = {
	currencyId: null,
	promotionInfo: null,
	bonusType: null,
	langId: null,
	clickClose: () => null,
	setClaimPromotion: () => null
};

AmountConfirmPopbox.propTypes = {
	currencyId: PropTypes.number,
	promotionInfo: PropTypes.objectOf(PropTypes.any),
	bonusType: PropTypes.string,
	langId: PropTypes.string,
	clickClose: PropTypes.func,
	setClaimPromotion: PropTypes.func
};

export default AmountConfirmPopbox;
