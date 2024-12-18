import { promotionRequest, defDeviceType } from "./base";

export const api_promotion_GetPromotionListV2 = ({ langId }) =>
	promotionRequest.post(`/GetPromotionListV3/${langId}`, {
		DeviceType: defDeviceType.Desktop
	});

// 2024/12/16 為了後台新功能：first deposit, redeposit, special deposit有在名單內可以直接領取的API
export const api_promotion_GetPromotionUploadCustList = ({ langId }) =>
	promotionRequest.post(`/GetPromotionUploadCustList/${langId}`, {
		DeviceType: defDeviceType.Desktop
	});

export const api_promotion_GetPromotionDetail = ({ langId, BonusCode }) =>
	promotionRequest.post(`/GetPromotionDetail/${langId}`, {
		BonusCode,
		DeviceType: defDeviceType.Desktop
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
		LockedAmount,
		DeviceType: defDeviceType.Desktop
	});

// 2024/12/16 為了後台新功能：first deposit, redeposit, special deposit有在名單內可以直接領取的API(直接送給後端，少一層請客服處理的流程)
export const api_promotion_SetClaimPromotionForUploadCustList = ({
	langId,
	BonusCode,
	LockedAmount = 0
}) =>
	promotionRequest.post(`/SetClaimPromotionForUploadCustList/${langId}`, {
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

export const api_promotion_GetRetentionPromotion = ({ langId }) =>
	promotionRequest.post(`/GetRetentionPromotion/${langId}`, {
		DeviceType: defDeviceType.Desktop
	});
