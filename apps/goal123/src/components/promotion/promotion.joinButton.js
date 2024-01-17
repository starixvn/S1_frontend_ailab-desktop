import React, { useRef, useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Link } from "gatsby";
import { useTranslation } from "react-i18next";
import { defPopBoxType } from "../common/popBox";
import { defPromotionType } from "./promotion.def";
import { popBoxContext } from "../common/context";
import { checkPromotion } from "./promotion.common";
import { api_promotion_SetClaimPromotion } from "../../service/api/promotion";
import path from "../../router";
import { defFilterType } from "./promotion.nav";

const JoinBtn = ({ promotionInfo, userInfo, filter, callBack }) => {
	const { t } = useTranslation();
	const { isLogin } = userInfo;
	const isMountedRef = useRef(null);
	const { setPopBox } = useContext(popBoxContext);
	const [processing, setProcessing] = useState(false);

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
					<button className="btn-cancel" onClick={clickClose}>
						{t("lbl_Close")}
					</button>
				</div>
			)
		});
	};

	const setClaimPromotion = async (langId, bonusCode, lockedAmount = 0) => {
		if (!processing) {
			setProcessing(true);

			api_promotion_SetClaimPromotion({
				langId,
				BonusCode: bonusCode,
				LockedAmount: Number(lockedAmount)
			}).then(
				({ data: { message, errorCode } }) => {
					if (!isMountedRef.current) return;

					const success = errorCode === 0;
					const OTPNotVerify = errorCode === -5;

					if (OTPNotVerify)
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.OTPHint,
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

					if (success) {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.Success,
							icon: "icon icon-bell",
							description: (
								<>
									<div>
										{t("lbl_JoinSuccessDescription1")}
									</div>
									<div>
										{t("lbl_JoinSuccessDescription2")}
									</div>
								</>
							),
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-cancel"
										onClick={clickClose}
									>
										OK
									</button>
								</div>
							)
						});
					} else {
						openErrorMessagePopBox(message || "error", errorCode);
					}
					setProcessing(false);
				},
				() => {
					if (!isMountedRef.current) return;
					setProcessing(false);
					openErrorMessagePopBox();
				}
			);
		}
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
				promotionType === defPromotionType.firstDeposit)
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

	if (
		(promotionInfo.isJoin && isLogin) ||
		promotionInfo.promotionType === defPromotionType.rebate ||
		promotionInfo.promotionType === defPromotionType.other ||
		(filter === defFilterType.specialBonus && !promotionInfo.canJoin) ||
		promotionInfo.beenUsed ||
		moment.unix(promotionInfo.periodFrom).diff(Date.now()) > 0 ||
		moment.unix(promotionInfo.periodTo).diff(Date.now()) < 0
	)
		return null;

	return (
		<button className="yellow" onClick={onJoinPromotion}>
			{promotionInfo.promotionType === defPromotionType.cashback ||
			promotionInfo.promotionType === defPromotionType.retentionFreeBet
				? t("lbl_Promotion_ClaimNow")?.toUpperCase()
				: t("lbl_PromoJoinNow")?.toUpperCase()}
		</button>
	);
};

JoinBtn.defaultProps = {
	promotionInfo: null,
	userInfo: null,
	filter: null,
	callBack: () => null
};

JoinBtn.propTypes = {
	promotionInfo: PropTypes.objectOf(PropTypes.any),
	userInfo: PropTypes.objectOf(PropTypes.any),
	filter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	callBack: PropTypes.func
};

export default JoinBtn;
