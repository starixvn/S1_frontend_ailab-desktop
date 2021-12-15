import { cashierRequest } from "./base";

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

export const api_cashier_DepositReqCryptoPay = ({ langId, paramsUrl }) =>
	cashierRequest.get(`/${langId}/Cashier/DepositReqCryptoPay?${paramsUrl}`);
