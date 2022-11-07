import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Dropdown from "./dropdown";

const AmountConfirmPopbox = ({
	langId,
	promotionInfo,
	clickClose,
	setClaimPromotion
}) => {
	const { t } = useTranslation();
	const [selectedIdx, setSelectedIdx] = useState(0);
	const { bonusCode, canJoinTierAmountList } = promotionInfo;

	const options = canJoinTierAmountList?.map((el, i) => ({
		id: i,
		displayText: `${t("lbl_DepositAmount")} ${el.requiredAmount} / ${t(
			"lbl_Promotion_Bonus"
		)} ${el.bonusAmount}`,
		lockedAmount: el.lockedAmount
	}));

	const onSetClaimPromotion = () => {
		setClaimPromotion(langId, bonusCode, options[selectedIdx].lockedAmount);
	};

	const onSelectItem = i => {
		if (i !== selectedIdx) {
			setSelectedIdx(i);
		}
	};

	return (
		<div className="loackAmount" style={{ display: "flex" }}>
			<div className="icon icon-gift" />
			<div className="title">{t("lbl_ImportantNote")}</div>
			<div className="txt-lightgray">
				{t("lbl_PleaseEnterClaimAmount")}
			</div>
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
