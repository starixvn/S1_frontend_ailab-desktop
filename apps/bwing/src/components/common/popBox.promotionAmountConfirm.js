import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Dropdown from "./dropdown";
import { defPromotionType } from "../promotion/promotion.def";
import { number_format, checkAmount, isConvert } from "./common";

const AmountConfirmPopbox = ({
	currencyId,
	langId,
	promotionInfo,
	clickClose,
	setClaimPromotion
}) => {
	const { t } = useTranslation();
	const [amount, setAmount] = useState("");
	const [validationError, setValidationError] = useState({});
	const [selectedIdx, setSelectedIdx] = useState(0);

	const {
		bonusCode,
		requiredAmount,
		maxAmount,
		canJoinTierAmountList,
		promotionType
	} = promotionInfo;

	const isFirstDeposit = promotionType === defPromotionType.firstDeposit;

	useEffect(() => {
		if (isFirstDeposit) {
			setAmount(String(amount).replace(/^(0+)|[^\d]+/g, ""));
		}
	}, [amount]);

	const options = canJoinTierAmountList?.map((el, i) => ({
		id: i,
		displayText: `${t("lbl_DepositAmount")} ${el.requiredAmount} / ${t(
			"lbl_Promotion_Bonus"
		)} ${el.bonusAmount}`,
		lockedAmount: el.lockedAmount
	}));

	const onSetClaimPromotion = () => {
		if (isFirstDeposit) {
			if (validationError.status !== 0) return;

			const _isConvert = isConvert(currencyId);
			const _amount = _isConvert ? amount * 1000 : amount;
			setClaimPromotion(langId, bonusCode, _amount);
		} else {
			setClaimPromotion(
				langId,
				bonusCode,
				options[selectedIdx].lockedAmount
			);
		}
	};

	const onSelectItem = i => {
		if (i !== selectedIdx) {
			setSelectedIdx(i);
		}
	};

	const validAmount = _amount => {
		const result = checkAmount({
			amount: _amount,
			minAmount: requiredAmount,
			maxAmount,
			formatRequired: false,
			t
		});
		setValidationError(result);
	};

	let input = null;
	if (isFirstDeposit) {
		input = (
			<>
				<div className="inputBox-blue">
					<input
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
				 ${number_format({ number: requiredAmount })} ~ 
				 ${number_format({ number: maxAmount })}`}
				</div>
			</>
		);
	} else {
		input = (
			<div className="inputBox-blue">
				<Dropdown
					i18n={t}
					mainKey={`${bonusCode}_`}
					options={options}
					selectedIdx={selectedIdx}
					onSelectItem={onSelectItem}
					showDropDownIcon={true}
				/>
			</div>
		);
	}

	return (
		<div className="loackAmount">
			<div className="icon icon-close" onClick={clickClose} />
			<div className="icon icon-gift" />
			<div className="title">{t("lbl_ImportantNote")}</div>
			<div className="txt-lightgray">
				{isFirstDeposit
					? t("lbl_PleaseEnterClaimAmount")
					: t("lbl_PleaseSelectClaimAmount")}
			</div>
			{input}
			<div className="btnGroup">
				<button className="btn-cancel" onClick={clickClose}>
					{t("lbl_Cancel")}
				</button>
				<button className="btn-check" onClick={onSetClaimPromotion}>
					{t("lbl_PromoJoinNow")}
				</button>
			</div>
		</div>
	);
};

AmountConfirmPopbox.defaultProps = {
	promotionInfo: null,
	langId: null,
	clickClose: () => null,
	setClaimPromotion: () => null
};

AmountConfirmPopbox.propTypes = {
	promotionInfo: PropTypes.objectOf(PropTypes.any),
	langId: PropTypes.string,
	clickClose: PropTypes.func,
	setClaimPromotion: PropTypes.func
};

export default AmountConfirmPopbox;
