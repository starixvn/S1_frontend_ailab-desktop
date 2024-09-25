import React, { useRef, useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Link } from "gatsby";
import { useTranslation } from "react-i18next";
import { defPopBoxType } from "../common/defPopBoxType";
import { defPromotionType, defFilterType } from "./promotion.def";
import { popBoxContext } from "../common/context";
import { checkPromotion } from "./promotion.common";
import { api_promotion_SetClaimPromotion } from "../../service/api/promotion";
import path from "../../router";

const JoinBtn = ({ promotionInfo, userInfo, _isClaimed, filter, callBack }) => {
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
							titleText: "lbl_Congratulations",
							titleIcon: "icon-bell",
							message1: "lbl_JoinSuccessDescription1",
							message2: "lbl_JoinSuccessDescription2",
							onClickClose: clickClose,
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
						callBack(); // 成功claim後重新取得promotion list資料
						if (
							promotionInfo.promotionType ===
							defPromotionType.missionBonus
						) {
							callBack();
						}
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

	return (promotionInfo.isJoin && isLogin) ||
		_isClaimed ||
		promotionInfo.promotionType === defPromotionType.rebate ||
		promotionInfo.promotionType === defPromotionType.other ||
		(filter === defFilterType.specialBonus && !promotionInfo.canJoin) ||
		promotionInfo.beenUsed ||
		moment.unix(promotionInfo.periodFrom).diff(Date.now()) > 0 ||
		moment.unix(promotionInfo.periodTo).diff(Date.now()) < 0 ? null : (
		<button className="btn-primary" onClick={onJoinPromotion}>
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
