import { promotionRequest } from "./base";

export const api_promotion_GetPromotionListV2 = ({ langId }) =>
  promotionRequest.post(`/GetPromotionListV2/${langId}`);

export const api_promotion_SetClaimPromotion = ({ langId, BonusCode }) =>
  promotionRequest.post(`/SetClaimPromotion/${langId}`, {
    BonusCode,
  });
