import { cashierRequest } from "./base";

export const api_cashier_DepositReqOnlineBanking = ({
	langId,
	sysId,
	payId,
	channelId,
	real_amount
}) =>
	cashierRequest.get(
		`/${langId}/Cashier/DepositReqOnlineBanking?payId=${payId}&ChannelId=${channelId}&Amount=${real_amount}${
			sysId ? `&sysId=${sysId}` : ""
		}`
	);

export const api_cashier_DepositReqMobilePay = ({
	langId,
	channelId,
	real_amount
}) =>
	cashierRequest.get(
		`/${langId}/Cashier/DepositReqMobilePay?ChannelId=${channelId}&Amount=${real_amount}`
	);

export const api_cashier_DepositReqCryptoPay = ({
	langId,
	channelId,
	real_amount
}) =>
	cashierRequest.get(
		`/${langId}/Cashier/DepositReqCryptoPay?ChannelId=${channelId}&Amount=${real_amount}`
	);
