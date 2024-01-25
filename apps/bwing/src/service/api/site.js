import { siteRequest, defDeviceType } from "./base";

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

export const api_site_ExistsUserName = ({ UserName, langId }) =>
	siteRequest.post(`/ExistsUserName/${langId}`, { UserName });

export const api_site_ExistsEmail = ({ Email }) =>
	siteRequest.post(`/ExistsEmail`, { Email });

export const api_site_Signup = (data, langId) =>
	siteRequest.post(`/Signup/${langId}`, data);

export const api_site_GetSiteCurrencyList = () =>
	siteRequest.post(`/GetSiteCurrencyList/`);

export const api_site_GetSiteLangList = () =>
	siteRequest.post(`/GetSiteLangList/`);

export const api_site_CheckSignIn = () => siteRequest.post(`/CheckSignIn/`);

export const api_site_GetGameListByDevice = () =>
	siteRequest.post(`/GetGameListByDevice`, {
		DeviceType: defDeviceType.Desktop
	});

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
	siteRequest.post(`/GetBannerV3/${lang}`, { BannerType, CurrencyId: 51 });

export const api_site_CheckResetPwdTokens = ({ key }) =>
	siteRequest.post(`/CheckResetPwdToken`, `key=${key}`);

export const api_site_ExistsPhoneNo = ({ AreaCode, Phone }) =>
	siteRequest.post(`/ExistsPhoneNo`, { AreaCode, PhoneNo: Phone });

export const api_site_GetAffiliateAgent = ({ AffId }) =>
	siteRequest.post("/GetAffiliateAgent", { AffId });

export const api_site_AffiliateCheck = ({ AffCode, langId }) =>
	siteRequest.post(`/AffiliateCheck/${langId}`, { AffCode });

export const api_site_GetSupportDomainList = () =>
	siteRequest.post(`/GetSupportDomainList/`);

export const api_site_GetTpMaintainList = () =>
	siteRequest.post(`/GetTpMaintainList`);

// using new api - api/HotGame/GetDataList
// export const api_site_GetHotGames = ({ langId }) =>
// 	siteRequest.post(`/GetHotGames/${langId}`, {
// 		DeviceType: defDeviceType.Desktop,
// 		CurrencyId: 51
// 	});

export const api_site_GetSocialChannel = ({ langId, displayPage }) =>
	siteRequest.post("GetSocialChannel", {
		CurrencyId: 51,
		LangId: langId,
		DisplayPage: displayPage
	});

export const api_account_GetVipBanner = ({ CurrencyId }) =>
	siteRequest.post("/GetVipBanner", {
		CurrencyId
	});

export const api_site_GetRecaptchaInfo = () =>
	siteRequest.post("/GetRecaptchaInfo", null, {
		headers: {
			common: {
				"origin-host":
					typeof window !== "undefined"
						? window?.location?.origin
						: undefined
			}
		}
	});
