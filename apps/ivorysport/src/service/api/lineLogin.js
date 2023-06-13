import { lineLoginRequest } from "./base";

export const api_lineLogin_LineLoginDirect = type =>
	lineLoginRequest.post("/LineLoginDirect", { type });

export const api_lineLogin_LineCallback = ({
	langId,
	lineLoginResponse,
	loginData
}) =>
	lineLoginRequest.post(`/LineCallback/${langId}`, {
		LineLoginResponse: lineLoginResponse,
		LoginData: loginData
	});
