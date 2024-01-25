import { lineLoginRequest } from "./base";

export const api_lineLogin_LineLoginDirect = type =>
	lineLoginRequest.post(
		"/LineLoginDirect",
		{ type },
		{
			headers: {
				common: {
					"origin-host":
						typeof window !== "undefined"
							? window?.location?.origin
							: undefined
				}
			}
		}
	);

export const api_lineLogin_LineCallback = ({
	langId,
	lineLoginResponse,
	loginData
}) =>
	lineLoginRequest.post(
		`/LineCallback/${langId}`,
		{
			LineLoginResponse: lineLoginResponse,
			LoginData: loginData
		},
		{
			headers: {
				common: {
					"origin-host":
						typeof window !== "undefined"
							? window?.location?.origin
							: undefined
				}
			}
		}
	);
