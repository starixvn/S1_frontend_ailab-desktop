import React from "react";
import moment from "moment";
import { Link } from "gatsby";
import { promoStatus, defPromotionType } from "./promotion.def";
import { defPopBoxType } from "../common/defPopBoxType";
import path from "../../router";
import { number_format } from "../common/common";

export const isArrayNotEmpty = arr => {
	return Array.isArray(arr) && arr.length;
};

export const isExpiry = ({
	periodTo,
	custExpiryTime,
	isLogin,
	isJoin,
	promotionType
}) => {
	return isLogin &&
		isJoin &&
		promotionType !== defPromotionType.rebate &&
		promotionType !== defPromotionType.cashback
		? moment(custExpiryTime).isBefore(new moment())
		: moment(moment.unix(periodTo)).isBefore(new moment());
};

export const isNew = ({ periodFrom }) => {
	return moment(moment.unix(periodFrom)).isAfter(
		new moment().add(-14, "days")
	);
};

export const isClaimed = ({ isJoin, status }) => {
	return (
		isJoin ||
		status === promoStatus.running ||
		status === promoStatus.TransferOut
	);
};

export const checkPromotion = ({ promotionInfo, userInfo, setPopBox, t }) => {
	const {
		canJoin,
		isJoin,
		result,
		requiredAmount,
		depositAmount,
		bonusCode
	} = promotionInfo;

	const { isLogin, currencyId, accountName, phoneNo, email, langId } =
		userInfo;

	const clickClose = () => {
		setPopBox({ isOpen: false });
	};

	if (isLogin === false)
		return setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Login
		});

	if (currencyId && (!accountName || !phoneNo || !email))
		return setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.UpdateProfile,
			title: t("lbl_ImportantNote"),
			content: t("lbl_UpdatePersonalInfoPromotion"),
			btnBar: (
				<div className="btnGroup">
					<Link
						className="btn-check"
						to={`/${langId}/${path.profile.root}?prevPage=${path.promotion.root}&BonusCode=${bonusCode}`}
					>
						{t("lbl_UpdatePersonalDetail")}
					</Link>
				</div>
			)
		});

	if (canJoin && !isJoin && result === 1 && requiredAmount > 0) {
		const lessAmount = number_format({
			number: requiredAmount - depositAmount
		});
		const _currency = t(`Currency_${currencyId}`);
		const hint = `${_currency} ${lessAmount}$`;

		return setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.PromotionDepositConfirm,
			hint,
			btnBar: (
				<div className="btnGroup">
					<button className="btn-cancel" onClick={clickClose}>
						{t("lbl_Later")}
					</button>
					<Link
						to={`/${langId}/${path.deposit.root}`}
						type="button"
						className="btn-check"
					>
						{t("lbl_DepositNow")}
					</Link>
				</div>
			)
		});
	}

	return true;
};

const defPromoDisplayStyle = {
	default: "lobby-promotion-item",
	new: "lobby-promotion-item tag-new",
	expired: "lobby-promotion-item expired",
	claimed: "lobby-promotion-item tag-claimed"
};

export const getStampStyle = (filter, promotionInfo) => {
	const _isClaimed = isClaimed(promotionInfo);
	const _isNew = _isClaimed ? false : isNew(promotionInfo);

	let promoDisplayStyle = defPromoDisplayStyle.default;

	if (_isClaimed) {
		promoDisplayStyle = defPromoDisplayStyle.claimed;
	} else if (
		// 此段 expired 顯示邏輯因市場需求調整 先隱藏處理 如果後來需求有做調整在打開
		// (filter === defFilterType.specialBonus && !promotionInfo.canJoin) ||
		promotionInfo.beenUsed
	) {
		promoDisplayStyle = defPromoDisplayStyle.expired;
	} else if (_isNew && promotionInfo.canJoin) {
		promoDisplayStyle = defPromoDisplayStyle.new;
	}

	return promoDisplayStyle;
};
