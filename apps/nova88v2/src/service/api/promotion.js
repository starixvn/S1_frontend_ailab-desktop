import { promotionRequest, defDeviceType } from "./base";

export const api_promotion_GetPromotionList = ({ langId, currencyId }) =>
	promotionRequest.post(`/GetPromotionListV3/${langId}`, {
		DeviceType: defDeviceType.Desktop,
		CurrencyId: currencyId
	});

export const api_promotion_GetPromotionDetail = ({
	langId,
	BonusCode,
	currencyId
}) =>
	promotionRequest.post(`/GetPromotionDetail/${langId}`, {
		BonusCode,
		DeviceType: defDeviceType.Desktop,
		CurrencyId: currencyId
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

export const api_promotion_GetDepositPromotionList = ({ langId }) =>
	promotionRequest.post(`/GetDepositPromotionList/${langId}`, {
		DeviceType: defDeviceType.Desktop
	});

export const api_promotion_SetDepositPromotionQueue = ({
	langId,
	transId,
	bonusCode
}) =>
	promotionRequest.post(`/SetDepositPromotionQueue/${langId}`, {
		TransId: transId,
		BonusCode: bonusCode,
		DeviceType: defDeviceType.Desktop
	});

export const api_promotion_GetRebateExcludeGameList = ({
	langId,
	currencyId
}) =>
	promotionRequest.post(`GetRebateExcludeGameList/${langId}`, {
		CurrencyId: currencyId
	});
