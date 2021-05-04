import { promotionRequest, defDeviceType } from "./base";

export const api_promotion_GetPromotionListV2 = ({ langId }) =>
	promotionRequest.post(`/GetPromotionListV3/${langId}`, {
		DeviceType: defDeviceType.Desktop
	});

export const api_promotion_GetPromotionDetail = ({ langId, BonusCode }) =>
	promotionRequest.post(`/GetPromotionDetail/${langId}`, {
		BonusCode,
		DeviceType: defDeviceType.Desktop
	});

export const api_promotion_SetClaimPromotion = ({
	langId,
	BonusCode,
	LockedAmount
}) =>
	promotionRequest.post(`/SetClaimPromotion/${langId}`, {
		BonusCode,
		LockedAmount,
		DeviceType: defDeviceType.Desktop
	});

export const api_promotion_GetSpecialPromotionList = ({ langId }) =>
	promotionRequest.post(`/GetSpecialPromotionListV2/${langId}`, {
		DeviceType: defDeviceType.Desktop
	});

export const api_promotion_SetSpecialCode = ({ langId, SpecialCode }) =>
	promotionRequest.post(`/SetSpecialCode/${langId}`, {
		SpecialCode,
		DeviceType: defDeviceType.Desktop
	});
