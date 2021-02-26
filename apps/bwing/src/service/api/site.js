import { siteRequest } from "./base";

export const defBannerType = {
	Promotions: 1,
	HotEvent: 2,
	Slots: 3
};

export const defBannerActionMode = {
	NoAction: 1,
	GoToGame: 2,
	GoToBonus: 3,
	OpenWindow: 4,
	RedirectPage: 5,
	RedirectPageOfThisSite: 6
};

export const api_site_ExistsUserName = ({ UserName }) =>
	siteRequest.post(`/ExistsUserName`, { UserName });

export const api_site_ExistsEmail = ({ Email }) =>
	siteRequest.post(`/ExistsEmail`, { Email });

export const api_site_Register = data => siteRequest.post(`/Register/`, data);

export const api_site_GetSiteCurrencyList = () =>
	siteRequest.post(`/GetSiteCurrencyList/`);

export const api_site_GetSiteLangList = () =>
	siteRequest.post(`/GetSiteLangList/`);

export const api_site_CheckSignIn = () => siteRequest.post(`/CheckSignIn/`);

export const api_site_GetGamelistV2 = () => siteRequest.post(`/GetGamelistV2`);

export const api_site_ForgetPwd = ({ Email, langId }) =>
	siteRequest.post(`/ForgetPwdV2/${langId}`, { Email, flag: 1 });

export const api_site_GetTpIds = () => siteRequest.post(`/GetTpIds`);

export const api_site_GetBanner = (
	FolderName,
	refId,
	lang,
	filterHideInHome = false
) =>
	siteRequest.post(
		`/GetBanner/${lang}`,
		`FolderName=${FolderName}&refId=${refId}&filterHideInHome=${filterHideInHome}`
	);

export const api_site_GetBannerV3 = ({ lang, BannerType }) =>
	siteRequest.post(`/GetBannerV3/${lang}`, { BannerType });

export const api_site_CheckResetPwdTokens = ({ key }) =>
	siteRequest.post(`/CheckResetPwdToken`, `key=${key}`);

export const api_site_GetAffiliateAgent = ({ AffId }) =>
	siteRequest.post("/GetAffiliateAgent", { AffId });
