import { cashierRequest } from "./base";

/**
 *  整合所有OnlinePayment的存款申請入口
 *  取代原本的
 *  /Cashier/DepositReqBankAutoChannel
 *  /Cashier/DepositReqQRPay
 *  /Cashier/DepositReqLoadCardPay
 *  /Cashier/DepositReqCryptoPay
 *  /Cashier/DepositReqMobilePay
 *  /Cashier/DepositReqOnlineBanking
 *  新的QuickTransfer可直接用這支建單
 *  支援參數:
 *  int channelId     // AutoChannel帶0
 *  int sysId
 *  decimal amount
 *  string errorUrl   // Leobet錯誤頁
 *  string bonusCode
 *  string payAccount // MoblilePay UPI
 *  string code       // LoadCard
 *  string serial     // LoadCard
 */
export const api_cashier_DepositReq = ({ langId, paramsUrl }) =>
	cashierRequest.get(`/${langId}/Cashier/DepositReq?${paramsUrl}`);

// ** == 以下的 api 在重構時可以被上面這隻 api 取代掉 == **

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
