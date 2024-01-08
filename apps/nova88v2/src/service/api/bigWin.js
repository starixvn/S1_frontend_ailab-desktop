import { bigWinRequest, defDeviceType } from "./base";

export const api_bigWin_GetPopUpDataList = () =>
	bigWinRequest.post(`/GetPopUpDataList`, {
		deviceType: defDeviceType.Desktop
	});
