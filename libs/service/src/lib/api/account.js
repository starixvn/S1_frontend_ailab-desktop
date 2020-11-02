import { accountRequest } from "./base";

export const api_account_GetCustSpecificBonus = ({
  BonusCode,
  TpId,
  PromoCategoryId,
}) =>
  accountRequest.post("/GetCustSpecificBonus", {
    BonusCode,
    TpId,
    PromoCategoryId,
  });
