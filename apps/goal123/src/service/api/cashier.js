import { cashierRequest } from "./base";

export const api_cashier_DepositReqLoadCardPay = ({
	langId,
	cardSerial,
	cardCode,
	channelId,
	amount
}) =>
	cashierRequest.post(
		`/${langId}/Cashier/DepositReqLoadCardPay?ChannelId=${channelId}&Code=${cardCode}&Serial=${cardSerial}&Amount=${amount}`
	);
