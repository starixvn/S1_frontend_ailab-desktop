import { useState } from "react";
import usePopBox from "../../hook/usePopBox";
import { api_payment_GetCryptoPayInfoList } from "../../../service/api/payment";

const useDepositCryptoPay = ({ isMountedRef }) => {
	const [cryptoPayGroupList, setCryptoPayGroupList] = useState([]);

	const { errorPopBox } = usePopBox();

	const getCryptoPayGroupList = async () => {
		await api_payment_GetCryptoPayInfoList().then(
			res => {
				if (!isMountedRef.current) return;
				const { data, message, errorCode } = res.data;
				const success = errorCode === 0;

				if (success && data.length > 0) {
					setCryptoPayGroupList(data);
				} else if (!success) {
					errorPopBox(message || `error`, errorCode);
				}
			},
			() => {
				if (!isMountedRef.current) return;
				errorPopBox();
			}
		);
	};

	return {
		getCryptoPayGroupList,
		cryptoPayGroupList
	};
};

export { useDepositCryptoPay };
