import { playerRequest } from "./base";

export const api_player_GetAppLink = () => playerRequest.post(`/GetAppLink`);

export const api_player_GetDeepLink = ({ deepLinkId, siteId }) =>
	playerRequest.post(`/GetDeepLink`, {
		DeepLinkId: deepLinkId,
		SiteId: siteId
	});
