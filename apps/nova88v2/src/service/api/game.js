import { gameRequest, defDeviceType } from "./base";

export const api_game_GetSlotGamePage = ({ currencyId }) =>
	gameRequest.post(`/GetSlotGamePage`, {
		DeviceType: defDeviceType.Desktop,
		CurrencyId: currencyId
	});
