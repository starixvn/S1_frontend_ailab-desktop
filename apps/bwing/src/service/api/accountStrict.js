import { accountStrictRequest } from "./base";
import router from "../../router";

export const api_accountStrict_GetCustProfile = () =>
	accountStrictRequest.post("/GetCustProfile");

export const api_accountStrict_SetProfile = ({
	AccountName,
	Birth_d,
	Birth_m,
	Birth_y,
	CountryCode,
	AreaCode,
	PhoneNo,
	Email
}) =>
	accountStrictRequest.post("/SetProfileV2", {
		AccountName,
		Birth_d,
		Birth_m,
		Birth_y,
		CountryCode,
		AreaCode,
		PhoneNo,
		Email
	});

export const api_accountStrict_SetAccountName = ({ name }) =>
	accountStrictRequest.post("/SetAccountName", {
		name
	});

export const api_accountStrict_SetCustBankInfo = ({
	AccountName,
	AccountNo,
	SysId
}) =>
	accountStrictRequest.post("/SetCustBankInfo", {
		AccountName,
		AccountNo,
		SysId
	});

export const api_accountStrict_DelCustBankInfo = ({
	AccountName,
	AccountNo,
	SysId
}) =>
	accountStrictRequest.post("/DelCustBankInfo", {
		AccountName,
		AccountNo,
		SysId
	});

export const api_accountStrict_ResetPassword = ({ NewPassword }) =>
	accountStrictRequest.post("/ResetPassword", {
		NewPassword
	});

export const api_accountStrict_UploadCustPhotoId = formData =>
	accountStrictRequest.post("/UploadCustPhotoId", formData, {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	});

export const api_accountStrict_SendOTPSMS = () =>
	accountStrictRequest.post("/SendOTPSMS");

export const api_accountStrict_VerifyOTP = ({ inputOTPcode }) =>
	accountStrictRequest.post(
		"/VerifyOTP",
		{ inputOTPcode },
		{
			headers: {
				"Content-Type": "application/json"
			}
		}
	);

export const api_accountStrict_SendOTPEmail = () =>
	accountStrictRequest.post("/SendOTPEmail", { route: router.profile.root });

export const api_accountStrict_VerifyEmail = ({ langId, key, code }) =>
	accountStrictRequest.post(`/VerifyEmail/${langId}`, { key, code });

export const api_accountStrict_SetCustUSDTInfoBatch = ({
	AccountName,
	USDTInfo
}) =>
	accountStrictRequest.post("/SetCustUSDTInfoBatch", {
		AccountName,
		USDTInfo
	});

export const api_accountStrict_getOTPVerifyInfo = () =>
	accountStrictRequest.post("/GetOTPVerifyInfo");

export const api_accountStrict_DelCustUSDTInfo = ({
	accountName,
	nickName,
	usdtAddress,
	currencyId
}) =>
	accountStrictRequest.post("/DelCustUSDTInfo", {
		AccountName: accountName,
		NickName: nickName,
		USDTAddress: usdtAddress,
		CurrencyId: currencyId
	});
