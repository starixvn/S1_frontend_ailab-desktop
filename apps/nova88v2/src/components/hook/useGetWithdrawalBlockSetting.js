import { useEffect, useState } from "react";
import { api_payment_GetWithdrawalBlockSetting } from "../../service/api/payment";

export const WITHDRAWAL_BLOCK_SETTING_TYPE = {
	BankCard: 1,
	EWallet: 3,
	Crypto: 4
};

export const useGetWithdrawalBlockSetting = () => {
	const [withdrawalSettingTypeList, setWithdrawalSettingTypeList] = useState(
		[]
	);

	useEffect(async () => {
		const { data } = await api_payment_GetWithdrawalBlockSetting();

		if (data?.errorCode === 0) setWithdrawalSettingTypeList(data?.data);
	}, []);

	const displayBankCard = withdrawalSettingTypeList?.find(
		item => item.type === WITHDRAWAL_BLOCK_SETTING_TYPE.BankCard
	)?.status;

	const displayEWallet = withdrawalSettingTypeList?.find(
		item => item.type === WITHDRAWAL_BLOCK_SETTING_TYPE.EWallet
	)?.status;

	const displayCrypto = withdrawalSettingTypeList?.find(
		item => item.type === WITHDRAWAL_BLOCK_SETTING_TYPE.Crypto
	)?.status;

	return { displayBankCard, displayEWallet, displayCrypto };
};
