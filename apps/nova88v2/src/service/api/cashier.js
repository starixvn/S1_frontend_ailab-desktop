import { cashierRequest } from "./base";

export const api_cashier_DepositReqOnlineBanking = ({ langId, paramsUrl }) =>
	cashierRequest.get(
		`/${langId}/Cashier/DepositReqOnlineBanking?${paramsUrl}`
	);

export const api_cashier_DepositReqMobilePay = ({ langId, paramsUrl }) =>
	cashierRequest.get(`/${langId}/Cashier/DepositReqMobilePay?${paramsUrl}`);

export const api_cashier_DepositReqCryptoPay = ({ langId, paramsUrl }) =>
	cashierRequest.get(`/${langId}/Cashier/DepositReqCryptoPay?${paramsUrl}`);

export const api_cashier_DepositReqCryptoLocalPay = ({ langId, paramsUrl }) =>
	cashierRequest.get(
		`/${langId}/Cashier/DepositReqCryptoLocalPay?${paramsUrl}`
	);

export const api_cashier_DepositReqLoadCardPay = ({
	langId,
	cardSerial,
	cardCode,
	channelId,
	amount,
	bonusCode
}) => {
	const baseApi = `/${langId}/Cashier/DepositReqLoadCardPay`;
	const params = [
		`ChannelId=${channelId}`,
		`Code=${cardCode}`,
		`Serial=${cardSerial}`,
		`Amount=${amount}`,
		bonusCode ? `&BonusCode=${bonusCode}` : ""
	]
		.filter(Boolean)
		.join("&");

	return cashierRequest.post(`${baseApi}?${params}`);
};
