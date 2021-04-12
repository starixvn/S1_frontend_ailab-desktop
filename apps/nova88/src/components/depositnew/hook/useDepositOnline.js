import { useState } from "react";
import usePopBox from "../../hook/usePopBox";

import {
	api_payment_GetOnlinePaymentList,
	api_payment_GetOnlineBankInfoSysList
} from "../../../service/api/payment";

const useDepositOnline = ({ isMountedRef }) => {
	const [onlineBankGroupList, setOnlineBankGroupList] = useState([]);
	const [onlineBankInfoList, setOnlineBankInfoList] = useState([]);

	const { errorPopBox } = usePopBox();

	const getOnlineBankGroupList = async () => {
		await api_payment_GetOnlinePaymentList().then(
			res => {
				if (!isMountedRef.current) return;

				const { data, message, errorCode } = res.data;
				const success = errorCode === 0;

				if (success) {
					setOnlineBankGroupList(data);
				} else {
					errorPopBox(message || `[${errorCode}] error`, errorCode);
				}
			},
			() => {
				if (!isMountedRef.current) return;

				errorPopBox();
			}
		);
	};

	const getOnlineBankInfoList = async pId => {
		const datas = await api_payment_GetOnlineBankInfoSysList({
			payId: Number(pId)
		}).then(
			res => {
				if (!isMountedRef.current) return;

				const { data, message, errorCode } = res.data;
				const success = errorCode === 0;

				if (success && data.length > 0) {
					setOnlineBankInfoList(data);
					return data;
				}

				if (!success) {
					errorPopBox(message || `[${errorCode}] error`, errorCode);
				}
			},
			() => {
				if (!isMountedRef.current) return;

				errorPopBox();
			}
		);

		return datas || [];
	};

	return {
		getOnlineBankGroupList,
		getOnlineBankInfoList,
		setOnlineBankInfoList,
		onlineBankGroupList,
		onlineBankInfoList
	};
};

export default useDepositOnline;
