import React, { useState, useContext } from "react";
import { Link } from "gatsby";
import { useTranslation } from "react-i18next";
import {
	api_promotion_GetPromotionListV2,
	api_promotion_GetPromotionUploadCustList,
	api_promotion_SetClaimPromotion,
	api_promotion_SetClaimPromotionForUploadCustList
} from "../../../service/api/promotion";
import { popBoxContext } from "../../common/context";
import { defPopBoxType } from "../../common/defPopBoxType";

export default ({ userInfo, isMountedRef, errorPopBox, promotionInfo }) => {
	const { t } = useTranslation();
	const [promoList, setPromoList] = useState([]);
	const [processing, setProcessing] = useState(false);
	const { setPopBox } = useContext(popBoxContext);
	const clickClose = () => {
		setPopBox({ isOpen: false });
	};

	const getPromotionListV2 = async () => {
		const {
			data: { data: promoCustListData }
		} = await api_promotion_GetPromotionUploadCustList({
			langId: userInfo.langId
		});
		await api_promotion_GetPromotionListV2({
			langId: userInfo.langId
		}).then(
			({ data: { data, message, errorCode } }) => {
				if (!isMountedRef.current) return;

				const success = errorCode === 0;

				if (success) {
					setPromoList([...data, ...promoCustListData]);
				} else errorPopBox(message || "error", errorCode);
			},
			() => {
				if (!isMountedRef.current) return;
				errorPopBox();
			}
		);
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

			if (promotionInfo.isPromotionUploadCustList) {
				api_promotion_SetClaimPromotionForUploadCustList({
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
							openErrorMessagePopBox(
								message || "error",
								errorCode
							);
						}
						setProcessing(false);
					},
					() => {
						if (!isMountedRef.current) return;
						setProcessing(false);
						openErrorMessagePopBox();
					}
				);
			} else {
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
							openErrorMessagePopBox(
								message || "error",
								errorCode
							);
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
		}
	};

	return {
		promoList,
		setPromoList,
		getPromotionListV2,
		setClaimPromotion
	};
};
