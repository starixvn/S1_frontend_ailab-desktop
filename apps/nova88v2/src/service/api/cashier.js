import { cashierRequest } from "./base";

export const api_cashier_DepositReqOnlineBanking = ({ langId, paramsUrl }) =>
	cashierRequest.get(
		`/${langId}/Cashier/DepositReqOnlineBanking?${paramsUrl}`
	);

export const api_cashier_DepositReqMobilePay = ({ langId, paramsUrl }) =>
	cashierRequest.get(`/${langId}/Cashier/DepositReqMobilePay?${paramsUrl}`);

export const api_cashier_DepositReqCryptoPay = ({ langId, paramsUrl }) =>
	cashierRequest.get(`/${langId}/Cashier/DepositReqCryptoPay?${paramsUrl}`);
