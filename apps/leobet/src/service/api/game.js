import { gameRequest, defDeviceType } from "./base";

export const api_game_GetSlotGamePage = ({ currencyId }) =>
	gameRequest.post(`/GetSlotGamePage`, {
		DeviceType: defDeviceType.Desktop,
		CurrencyId: currencyId
	});

export const api_game_GetRecentlyViewed = ({ currencyId }) =>
	gameRequest.post(`/GetRecentlyViewed`, {
		DeviceType: defDeviceType.Desktop,
		CurrencyId: currencyId
	});
