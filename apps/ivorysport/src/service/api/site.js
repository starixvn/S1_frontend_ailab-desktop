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

/**
 * //* 專門開給 Ivorysport 的註冊 api，跟 'Signup' 比起來多了以下參數
 * //*  Occupation、SourceOfIncome、Nationality、Country、City、PostCode、LineFirst、Birth_d、Birth_m、Birth_y
 */
export const api_site_Signup = (formData, langId) =>
	siteRequest.post(`/IvorysportSignup/${langId}`, formData, {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	});

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

export const api_site_GetBannerV3 = ({ lang, BannerType, currencyId }) =>
	siteRequest.post(`/GetBannerV3/${lang}`, {
		BannerType,
		CurrencyId: currencyId
	});

export const api_site_CheckResetPwdTokens = ({ key }) =>
	siteRequest.post(`/CheckResetPwdToken`, `key=${key}`);

export const api_site_GetCountryList = ({ langId }) =>
	siteRequest.post(`/GetCountryList/${langId}`);

export const api_site_ExistsPhoneNo = ({ AreaCode, Phone }) =>
	siteRequest.post(`/ExistsPhoneNo`, { AreaCode, PhoneNo: Phone });

export const api_site_GetAffiliateAgent = ({ AffId }) =>
	siteRequest.post("/GetAffiliateAgent", { AffId });

export const api_site_GetSupportDomainList = ({ langId }) =>
	siteRequest.post(`/GetSupportDomainList/${langId}`);

export const api_site_GetTpMaintainList = () =>
	siteRequest.post(`/GetTpMaintainList`);

export const api_site_seo = () => siteRequest.post(`/seo`);

export const api_site_GetMenuOfGames = () =>
	siteRequest.post(`/GetMenuOfGames`);

// using new api - api/HotGame/GetDataList
// export const api_site_GetHotGames = ({ langId, currencyId }) =>
// 	siteRequest.post(`/GetHotGames/${langId}`, {
// 		DeviceType: defDeviceType.Desktop,
// 		CurrencyId: currencyId
// 	});

export const api_site_GetSocialChannel = ({
	currencyId,
	langId,
	displayPage
}) =>
	siteRequest.post("GetSocialChannel", {
		CurrencyId: currencyId,
		LangId: langId,
		DisplayPage: displayPage
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
