import { loginRequest, accountRequest } from "./base";

export const api_account_SetLanguage = lang =>
	accountRequest.post("/SetLanguage", { LangId: lang });

export const api_account_UserLogout = () => accountRequest.post("/SignOut");

export const api_account_UserLogin = (langId, data) =>
	loginRequest.post(`/SignIn/${langId}`, data);

export const api_account_onlineCheck = () =>
	accountRequest.post("/onlineCheck");

export const api_account_GetBalnace = () => accountRequest.post("/GetBalance");

export const api_account_GetCustBankInfo = () =>
	accountRequest.post("/GetCustBankInfo");

export const api_account_GetMsgList = ({ PageNumber }) =>
	accountRequest.post("/GetMsgList", { PageNumber });

export const api_account_GetMsgContent = MsgId =>
	accountRequest.post("/GetMsgContent", {
		MsgId
	});

export const api_account_DelMsg = MsgIds =>
	accountRequest.post("/DelMsg", { MsgIds });

export const api_account_GetWalletInfo = () =>
	accountRequest.post("/GetWalletInfo");

export const api_account_GetWithdrawalAvailableBalance = () =>
	accountRequest.post("/GetWithdrawalAvailableBalance");

export const api_account_SetFavoriteGame = (ProviderId, GameId, IsRemove) =>
	accountRequest.post(`/SetFavoriteGame`, { ProviderId, GameId, IsRemove });

export const api_account_GetFavoriteGame = () =>
	accountRequest.post("/GetFavoriteGame");

export const api_account_GetMsgCount = () =>
	accountRequest.post("/GetMsgCount");

export const api_account_ChangePassword = ({ OldPassword, NewPassword }) =>
	accountRequest.post("/ChangePassword", { OldPassword, NewPassword });

export const api_account_GetCustSpecificBonus = ({
	BonusCode,
	TpId,
	PromoCategoryId
}) =>
	accountRequest.post("/GetCustSpecificBonus", {
		BonusCode,
		TpId,
		PromoCategoryId
	});

export const api_account_SetHideBalance = ({ value }) =>
	accountRequest.get(`/SetHideBalance?value=${value}`);

export const api_account_ExistsPhone = ({ AreaCode, Phone }) =>
	accountRequest.post(`/ExistsPhoneNo`, {
		AreaCode,
		PhoneNo: Phone
	});

export const api_account_GetTpWalletList = (ListType, langId) =>
	accountRequest.post(`/GetTpWalletList/${langId}`, { ListType });

export const api_account_GetTpWalletBalance = TpId =>
	accountRequest.post("/GetTpWalletBalance", { TpId });

export const api_account_GetBalance = () => accountRequest.post("/GetBalance");

export const api_account_GetCustBonusWallet = () =>
	accountRequest.post("/GetCustBonusWallet");

export const api_account_GetWalletBalance = () =>
	accountRequest.post("/GetWalletBalance");

export const api_account_GetReferralCode = () =>
	accountRequest.post("/GetReferralCode");

export const api_account_GetReferralSetting = () =>
	accountRequest.post("/GetReferralSetting");

export const api_account_GetReferralSummary = () =>
	accountRequest.post("/GetReferralSummary ");

export const api_account_GetRefFriendList = ({
	StartDate,
	EndDate,
	PageNumber,
	PageSize
}) =>
	accountRequest.post("/GetRefFriendList", {
		StartDate,
		EndDate,
		PageNumber,
		PageSize
	});

export const api_account_GetWalletTransferStatus = () =>
	accountRequest.post("/GetWalletTransferStatus");

export const api_account_SetWalletTransferStatus = ({ AutoTransfer }) =>
	accountRequest.post("/SetWalletTransferStatus", { AutoTransfer });

export const api_account_GetPopupMsg = () =>
	accountRequest.post("/GetPopupMsg");

export const api_account_SetPopupMsgRead = () =>
	accountRequest.post("/SetPopupMsgRead");
