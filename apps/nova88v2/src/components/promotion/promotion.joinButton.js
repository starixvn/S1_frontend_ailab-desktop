import React, { useRef, useEffect, useContext } from "react";
import { Link } from "@reach/router";
import { useTranslation } from "react-i18next";
import defPopBoxType from "../common/defPopBoxType";
import { defPromotionType } from "./promotion.def";
import { popBoxContext } from "../common/context";
import { checkPromotion } from "./promotion.common";
import { api_promotion_SetClaimPromotion } from "../../service/api/promotion";
import path from "../../router";
import { defFilterType } from "./promotion.nav";

export default ({ promotionInfo, userInfo, filter, callBack }) => {
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
			icon: "icon-bell",
			btnBar: (
				<div className="btnGroup">
					<button className="btn-check" onClick={clickClose}>
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
						icon: "icon icon-bell",
						description: (
							<>
								<div>{t("lbl_JoinSuccessDescription1")}</div>
								<div className="text-center">
									{t("lbl_JoinSuccessDescription2")}
								</div>
							</>
						),
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-check"
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
		const {
			bonusCode,
			bonusType,
			canJoin,
			promotionType,
			maxAmount
		} = promotionInfo;
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
	if (
		(promotionInfo.isJoin && isLogin) ||
		promotionInfo.promotionType === defPromotionType.rebate ||
		promotionInfo.promotionType === defPromotionType.other ||
		(filter === defFilterType.specialBonus && !promotionInfo.canJoin) ||
		promotionInfo.beenUsed
	)
		return null;

	return (
		<button className="orange" onClick={onJoinPromotion}>
			{promotionInfo.promotionType === defPromotionType.cashback
				? t("lbl_ClaimNow")?.toUpperCase()
				: t("lbl_PromoJoinNow")?.toUpperCase()}
		</button>
	);
};
