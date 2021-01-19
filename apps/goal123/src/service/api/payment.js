import { paymentRequest } from "./base";

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

export const api_payment_GetMobilePayGroupList = () =>
	paymentRequest.post("/GetMobilePayGroupList");

export const api_payment_DepositReqWireTransfer = ({ amount, sysId }) =>
	paymentRequest.post("/DepositReqWireTransfer", { amount, sysId });

export const api_payment_GetDepositInfoRecent = () =>
	paymentRequest.post("/GetDepositInfoRecent");

export const api_payment_SetDepositCancel = TransId =>
	paymentRequest.post("/SetDepositCancel", { TransId });

export const api_payment_UploadReceipt = formData =>
	paymentRequest.post("/UploadReceipt", formData, {
		headers: {
			"Content-Type": "multipart/form-data"
		}
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

export const api_payment_WithdrawalReq = (AccountNo, amount, sysId) =>
	paymentRequest.post("/WithdrawalReq", {
		AccountNo,
		amount,
		sysId
	});

export const api_payment_GetWithdrawalInfoRecent = () =>
	paymentRequest.post("/GetWithdrawalInfoRecent");

export const api_payment_SetWithdrawalCancel = TransId =>
	paymentRequest.post("/SetWithdrawalCancel", { TransId });

export const api_payment_KycCheck = () => paymentRequest.post("/KycCheck");

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
