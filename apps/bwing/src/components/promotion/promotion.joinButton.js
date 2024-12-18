import React, { useRef, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { defPopBoxType } from "../common/defPopBoxType";
import { defPromotionType, defFilterType } from "./promotion.def";
import { popBoxContext } from "../common/context";
import { checkPromotion } from "./promotion.common";
import usePopBox from "../hook/usePopBox";
import usePromotion from "./hook/usePromotion";

const JoinBtn = ({ promotionInfo, userInfo, _isClaimed, filter, callBack }) => {
	const { t } = useTranslation();
	const { isLogin } = userInfo;
	const isMountedRef = useRef(null);
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox } = usePopBox();

	const { setClaimPromotion } = usePromotion({
		userInfo,
		isMountedRef,
		errorPopBox,
		promotionInfo
	});

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const clickClose = () => {
		setPopBox({ isOpen: false });
	};

	const onJoinPromotion = async () => {
		const { langId, currencyId } = userInfo;
		const { bonusCode, canJoin, promotionType, maxAmount } = promotionInfo;

		const promotionCanJoin = checkPromotion({
			promotionInfo,
			userInfo,
			setPopBox,
			t
		});

		if (!promotionCanJoin) return;
		if (
			canJoin &&
			(promotionType === defPromotionType.redeposit ||
				promotionType === defPromotionType.firstDeposit ||
				promotionType === defPromotionType.missionBonus)
		) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.PromotionAmountConfirm,
				langId,
				currencyId,
				promotionInfo,
				clickClose,
				setClaimPromotion
			});
		} else {
			const success = await setClaimPromotion(
				langId,
				bonusCode,
				maxAmount
			);
			if (success) callBack();
		}
	};

	const showBtn =
		(promotionInfo.isJoin && isLogin) ||
		_isClaimed ||
		promotionInfo.promotionType === defPromotionType.rebate ||
		promotionInfo.promotionType === defPromotionType.other ||
		(filter === defFilterType.specialBonus && !promotionInfo.canJoin) ||
		promotionInfo.beenUsed ||
		moment.unix(promotionInfo.periodFrom).diff(Date.now()) > 0 ||
		moment.unix(promotionInfo.periodTo).diff(Date.now()) < 0 ? null : (
			<button className="btn-primary" onClick={onJoinPromotion}>
				{promotionInfo.promotionType === defPromotionType.cashback ||
				promotionInfo.promotionType ===
					defPromotionType.retentionFreeBet
					? t("lbl_Promotion_ClaimNow")?.toUpperCase()
					: t("lbl_PromoJoinNow")?.toUpperCase()}
			</button>
		);

	return (
		<>
			{showBtn}
			{(promotionInfo.promotionType === defPromotionType.other ||
				filter === defFilterType.specialBonus) &&
				promotionInfo.canJoin &&
				!promotionInfo.isJoin &&
				promotionInfo.isPromotionUploadCustList && (
					<button
						className="btn-primary"
						onClick={async () => {
							const success = await setClaimPromotion(
								userInfo.langId,
								promotionInfo.bonusCode
							);
							if (success) callBack();
						}}
					>
						{t("lbl_Promotion_ClaimNow")?.toUpperCase()}
					</button>
				)}
		</>
	);
};

JoinBtn.defaultProps = {
	promotionInfo: null,
	userInfo: null,
	filter: null,
	callBack: () => null,
	_isClaimed: null
};

JoinBtn.propTypes = {
	promotionInfo: PropTypes.objectOf(PropTypes.any),
	userInfo: PropTypes.objectOf(PropTypes.any),
	filter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	callBack: PropTypes.func,
	_isClaimed: PropTypes.bool
};

export default JoinBtn;
