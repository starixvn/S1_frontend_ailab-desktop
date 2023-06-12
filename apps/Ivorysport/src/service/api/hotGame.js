import { hotGameRequest, defDeviceType } from "./base";

export const api_HotGame_GetDataList = ({ currencyId }) =>
	hotGameRequest.post(`/GetDataList`, {
		DeviceType: defDeviceType.Desktop,
		CurrencyId: currencyId
	});
