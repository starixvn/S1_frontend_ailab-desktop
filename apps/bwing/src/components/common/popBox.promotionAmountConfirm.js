import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Dropdown from "./dropdown";
import { defPromotionType } from "../promotion/promotion.def";
import { number_format } from "./common";

const AmountConfirmPopbox = ({
	langId,
	promotionInfo,
	clickClose,
	setClaimPromotion
}) => {
	const { t } = useTranslation();

	const [selectedIdx, setSelectedIdx] = useState(0);

	const { bonusCode, canJoinTierAmountList, promotionType } = promotionInfo;

	const options = canJoinTierAmountList?.map((el, i) => {
		const {
			requiredAmount: _requireAmount,
			requiredTurnover,
			bonusAmount,
			lockedAmount
		} = el;

		const displayText = _requireAmount
			? `${t("lbl_DepositAmount")} ${number_format({
					number: _requireAmount,
					isConvertRequired: false,
					digits: 0
			  })} / ${t("lbl_Promotion_Bonus")} ${number_format({
					number: bonusAmount,
					isConvertRequired: false,
					digits: 0
			  })}`
			: `${t("lbl_TurnOver")} ${number_format({
					number: requiredTurnover,
					isConvertRequired: false,
					digits: 0
			  })} / ${t("lbl_Promotion_Bonus")} ${number_format({
					number: bonusAmount,
					isConvertRequired: false,
					digits: 0
			  })}`;

		return {
			id: i,
			displayText,
			lockedAmount,
			bonusAmount
		};
	});
	const onSetClaimPromotion = () => {
		setClaimPromotion(
			langId,
			bonusCode,
			// 後端期望promotionType為missionBonus的話帶bonusAmount
			promotionType === defPromotionType.missionBonus
				? options[selectedIdx].bonusAmount
				: options[selectedIdx].lockedAmount
		);
	};

	const onSelectItem = i => {
		if (i !== selectedIdx) {
			setSelectedIdx(i);
		}
	};

	let input = null;
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

	return (
		<div className="loackAmount">
			<div className="icon icon-close" onClick={clickClose} />
			<div className="icon icon-gift" />
			<div className="title">{t("lbl_ImportantNote")}</div>
			<div className="txt-lightgray">
				{t("lbl_PleaseSelectClaimAmount")}
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

// TODO: 2024/9/11 first deposit old logic (input):
/**
 * import React, { useState, useEffect } from "react";
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

	const options = canJoinTierAmountList?.map((el, i) => {
		const {
			requiredAmount: _requireAmount,
			requiredTurnover,
			bonusAmount,
			lockedAmount
		} = el;

		const displayText = _requireAmount
			? `${t("lbl_DepositAmount")} ${number_format({
					number: _requireAmount,
					isConvertRequired: false,
					digits: 0
			  })} / ${t("lbl_Promotion_Bonus")} ${number_format({
					number: bonusAmount,
					isConvertRequired: false,
					digits: 0
			  })}`
			: `${t("lbl_TurnOver")} ${number_format({
					number: requiredTurnover,
					isConvertRequired: false,
					digits: 0
			  })} / ${t("lbl_Promotion_Bonus")} ${number_format({
					number: bonusAmount,
					isConvertRequired: false,
					digits: 0
			  })}`;

		return {
			id: i,
			displayText,
			lockedAmount,
			bonusAmount
		};
	});

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
				// 後端期望promotionType為missionBonus的話帶bonusAmount
				promotionType === defPromotionType.missionBonus
					? options[selectedIdx].bonusAmount
					: options[selectedIdx].lockedAmount
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
					}`}
				>
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
 */
