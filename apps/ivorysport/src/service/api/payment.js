import { paymentRequest, defDeviceType } from "./base";

export const api_payment_GetBankInfoSysList = () =>
	paymentRequest.post("/GetBankInfoSysList");

export const api_payment_GetDepositInfoHistory = ({
	StartDate,
	EndDate,
	PageNumber
}) =>
	paymentRequest.post("/GetDepositInfoHistory", {
		StartDate,
		EndDate,
		PageNumber
	});

export const api_payment_GetOnlinePaymentList = () =>
	paymentRequest.post("/GetOnlinePaymentList");

export const api_payment_GetOnlineBankInfoSysList = ({ payId }) =>
	paymentRequest.post("/GetOnlineBankInfoSysList", { payId });

export const api_payment_GetOnlineBankInfo = ({ payId, sysId }) =>
	paymentRequest.post("/GetOnlineBankInfo", { payId, sysId });

export const api_payment_GetWithdrawalInfoHistory = ({
	StartDate,
	EndDate,
	PageNumber
}) =>
	paymentRequest.post("/GetWithdrawalInfoHistory", {
		StartDate,
		EndDate,
		PageNumber
	});

export const api_payment_GetStatement = ({ StartDate, EndDate, PageNumber }) =>
	paymentRequest.post("/GetStatement", {
		StartDate,
		EndDate,
		PageNumber
	});

export const api_payment_GetBankInfoOffList = () =>
	paymentRequest.post("/GetBankInfoOffList");

export const api_payment_GetBankInfoOffListStatus = queryType =>
	paymentRequest.post("/GetBankInfoOffListStatus", {
		queryType
	});

export const api_payment_GetLocalBankInfo = ({ sysId, amount }) =>
	paymentRequest.post("/GetLocalBankInfo", { sysId, amount });

export const api_payment_GetMobilePayGroupList = () =>
	paymentRequest.post("/GetMobilePayGroupList");

export const api_payment_GetCryptoPayInfoList = () =>
	paymentRequest.post("/GetCryptoPayInfoList");

export const api_payment_DepositReqWireTransfer = ({
	amount,
	sysId,
	fromChannel,
	fromSysId,
	fromAccountNum,
	hasPromotion,
	bankId
}) =>
	paymentRequest.post("/DepositReqWireTransfer", {
		amount,
		sysId,
		fromChannel,
		fromSysId,
		fromAccountNum,
		hasPromotion,
		bankId
	});

export const api_payment_GetDepositInfoRecent = () =>
	paymentRequest.post("/GetDepositInfoRecent");

export const api_payment_CheckDepositSpecialCode = SpecialCode =>
	paymentRequest.post(`/CheckDepositSpecialCode`, {
		SpecialCode,
		DeviceType: defDeviceType.Desktop
	});

export const api_payment_SetDepositCancel = TransId =>
	paymentRequest.post("/SetDepositCancel", { TransId });

export const api_payment_UploadReceipt = (TransId, Receipt) =>
	paymentRequest.post("/UploadReceipt", {
		TransId,
		Receipt
	});

export const api_payment_SetDepositReceipt = (TransId, DepositTime, RefNo) =>
	paymentRequest.post("/SetDepositReceipt", {
		TransId,
		DepositTime,
		RefNo
	});

export const api_payment_GetMobilePayInfoList = GroupId =>
	paymentRequest.post("/GetMobilePayInfoList", {
		GroupId
	});

export const api_payment_WithdrawalReq = ({
	AccountNo,
	amount,
	sysId,
	blackbox,
	IFSCCode
}) =>
	paymentRequest.post("/WithdrawalReq", {
		AccountNo,
		amount,
		sysId,
		blackbox,
		IFSCCode
	});
export const api_payment_WithdrawalEWalletReq = ({
	AccountNo,
	amount,
	sysId,
	memo,
	blackbox
}) =>
	paymentRequest.post("/WithdrawalEWalletReq", {
		AccountNo,
		amount,
		sysId,
		memo,
		blackbox
	});

/**
 * * 提款建單 Crypto 提款時需要多傳入 ExchangeRate、ExchangeAmount
 * * ExchangeRate => 填入 GetExchangeInfo 的 rate
 * * ExchangeAmount => 填入 GetExchangeInfo 的 to_Amount
 */
export const api_payment_WithdrawalCryptoReq = ({
	AccountNo,
	amount,
	blackbox,
	CurrencyId,
	exchangeRate,
	exchangeAmount
}) =>
	paymentRequest.post("/WithdrawalCryptoReq", {
		AccountNo,
		amount,
		blackbox,
		CurrencyId,
		exchangeRate,
		exchangeAmount
	});

export const api_payment_GetWithdrawalInfoRecent = () =>
	paymentRequest.post("/GetWithdrawalInfoRecent");

export const api_payment_SetWithdrawalCancel = TransId =>
	paymentRequest.post("/SetWithdrawalCancel", { TransId });

export const api_payment_KycCheck = () => paymentRequest.post("/KycCheck");

export const api_deposit_KycCheck = () =>
	paymentRequest.post("/DepositKycCheck");

export const api_payment_CustTpBetRecordListDateRange = ({
	StartDate,
	EndDate,
	PageNumber,
	PageSize
}) =>
	paymentRequest.post("/CustTpBetRecordListDateRange", {
		StartDate,
		EndDate,
		PageNumber,
		PageSize
	});

export const api_payment_GetCustTpBetRecordListOneDay = ({
	SelDate,
	PageNumber,
	PageSize
}) =>
	paymentRequest.post("/GetCustTpBetRecordListOneDay", {
		SelDate,
		PageNumber,
		PageSize
	});

export const api_payment_GetCustTpBetRecordListbyCategoryId = ({
	SelDate,
	CategoryId,
	PageNumber,
	PageSize
}) =>
	paymentRequest.post("/GetCustTpBetRecordListbyCategoryId", {
		SelDate,
		CategoryId,
		PageNumber,
		PageSize
	});

export const api_payment_GetCustTpBetRecordDetailListbyGameType = ({
	SelDate,
	gameTypeId,
	PageNumber,
	PageSize
}) =>
	paymentRequest.post("/GetCustTpBetRecordDetailListbyGameType", {
		SelDate,
		gameTypeId,
		PageNumber,
		PageSize
	});

export const api_payment_GetWithdrawalLimit = () =>
	paymentRequest.post("/GetWithdrawalLimit");

export const api_payment_GetExchangeInfo = ({
	Amount,
	CurrencyName,
	Network
}) =>
	paymentRequest.post("/GetExchangeInfo", { Amount, CurrencyName, Network });

export const api_payment_getSupportCryptoInfo = () =>
	paymentRequest.post("/GetSupportCryptoInfo");

export const api_payment_GetAutoChannelBankGroupList = () =>
	paymentRequest.post("GetAutoChannelBankGroupList");

export const api_payment_GetLineChannelForDpeosit = () =>
	paymentRequest.post("GetLineChannelForDpeosit");

export const api_payment_GetEWalletInfoSysList = () =>
	paymentRequest.post("GetEWalletInfoSysList");

export const api_payment_DepositReqLocalPay = ({
	groupId,
	amount,
	bonusCode
}) =>
	paymentRequest.post("DepositReqLocalPay", {
		groupId,
		amount,
		bonusCode
	});
