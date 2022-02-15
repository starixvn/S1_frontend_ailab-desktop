import React, { useRef, useEffect, useContext } from "react";
import { Link } from "gatsby";
import { useTranslation } from "react-i18next";
import { defPopBoxType } from "../common/defPopBoxType";
import { defPromotionType, defFilterType } from "./promotion.def";
import { popBoxContext } from "../common/context";
import { checkPromotion } from "./promotion.common";
import { api_promotion_SetClaimPromotion } from "../../service/api/promotion";
import path from "../../router";

export default ({ promotionInfo, userInfo, _isClaimed, filter, callBack }) => {
	const { t } = useTranslation();
	const { isLogin } = userInfo;
	const isMountedRef = useRef(null);
	const { setPopBox } = useContext(popBoxContext);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const clickClose = () => {
		setPopBox({ isOpen: false });
	};

	const openErrorMessagePopBox = (
		message = t("msg_ApiServerError"),
		errorCode = null
	) => {
		setPopBox({
			message,
			errorCode,
			isOpen: true,
			popBoxType: defPopBoxType.ErrorMsg,
			icon: "icon-icon32px_notification",
			btnBar: (
				<div className="btnGroup">
					<button className="btn-cancel" onClick={clickClose}>
						{t("lbl_Close")}
					</button>
				</div>
			)
		});
	};

	const setClaimPromotion = async (langId, bonusCode, lockedAmount = 0) => {
		return api_promotion_SetClaimPromotion({
			langId,
			BonusCode: bonusCode,
			LockedAmount: Number(lockedAmount)
		}).then(
			({ data: { message, errorCode } }) => {
				if (!isMountedRef.current) return;
				const success = errorCode === 0;
				const OTPNotVerify = errorCode === -5;
				if (OTPNotVerify)
					return setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.OTPHint,
						btnBar: (
							<div className="btnGroup">
								<Link
									className="btn-check"
									to={`/${langId}/${path.profile.root}?prevPage=${path.promotion.root}&BonusCode=${bonusCode}`}>
									{t("lbl_UpdatePersonalDetail")}
								</Link>
							</div>
						)
					});
				if (success) {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.Success,
						titleText: "lbl_Congratulations",
						titleIcon: "icon-bell",
						message1: "lbl_JoinSuccessDescription1",
						message2: "lbl_JoinSuccessDescription2",
						onClickClose: clickClose,
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-cancel"
									onClick={clickClose}>
									OK
								</button>
							</div>
						)
					});
					return true;
				}
				openErrorMessagePopBox(message || "error", errorCode);
			},
			() => {
				if (!isMountedRef.current) return;

				openErrorMessagePopBox();
			}
		);
	};

	const onJoinPromotion = async () => {
		const { langId, currencyId } = userInfo;
		const { bonusCode, bonusType, canJoin, promotionType, maxAmount } =
			promotionInfo;

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
				(filter === defFilterType.specialBonus &&
					promotionType === defPromotionType.firstDeposit))
		)
			return setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.PromotionAmountConfirm,
				langId,
				currencyId,
				promotionInfo,
				clickClose,
				setClaimPromotion
			});

		const success = await setClaimPromotion(langId, bonusCode, maxAmount);

		if (success) return callBack();
	};

	return (promotionInfo.isJoin && isLogin) ||
		_isClaimed ||
		promotionInfo.promotionType === defPromotionType.rebate ||
		promotionInfo.promotionType === defPromotionType.other ||
		(filter === defFilterType.specialBonus && !promotionInfo.canJoin) ||
		promotionInfo.beenUsed ? null : (
		<button className="orange" onClick={onJoinPromotion}>
			{promotionInfo.promotionType === defPromotionType.cashback
				? t("promotion.lbl_promo_claim_now")?.toUpperCase()
				: t("lbl_PromoJoinNow")?.toUpperCase()}
		</button>
	);
};
