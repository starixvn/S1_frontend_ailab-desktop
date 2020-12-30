import { promotionRequest } from "./base";

export const api_promotion_GetPromotionListV2 = ({ langId }) =>
	promotionRequest.post(`/GetPromotionListV2/${langId}`);

export const api_promotion_GetPromotionDetail = ({ langId, BonusCode }) =>
	promotionRequest.post(`/GetPromotionDetail/${langId}`, {
		BonusCode
	});

export const api_promotion_GetCustSpecificBonus = ({
	BonusCode,
	TpId,
	PromoCategoryId
}) =>
	promotionRequest.post(`/GetCustSpecificBonus/`, {
		BonusCode,
		TpId,
		PromoCategoryId
	});

export const api_promotion_SetClaimPromotion = ({
	langId,
	BonusCode,
	LockedAmount
}) =>
	promotionRequest.post(`/SetClaimPromotion/${langId}`, {
		BonusCode,
		LockedAmount
	});

export const api_promotion_GetSpecialPromotionList = ({ langId }) =>
	promotionRequest.post(`/GetSpecialPromotionList/${langId}`);

export const api_promotion_SetSpecialCode = ({ langId, SpecialCode }) =>
	promotionRequest.post(`/SetSpecialCode/${langId}`, {
		SpecialCode
	});
