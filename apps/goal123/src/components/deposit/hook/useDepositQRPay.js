import { useState } from "react";
import usePopBox from "../../hook/usePopBox";

import {
	api_payment_GetQRPayGroupList,
	api_payment_GetQRPayInfoList
} from "../../../service/api/payment";

const useDepositQRPay = ({ isMountedRef }) => {
	const [QRPayGroupList, setQRPayGroupList] = useState([]);
	const [QRPayInfoList, setQRPayInfoList] = useState([]);
	const { errorPopBox } = usePopBox();

	const getQRPayGroupList = async () => {
		await api_payment_GetQRPayGroupList().then(
			res => {
				if (!isMountedRef.current) return;

				const { data, message, errorCode } = res.data;
				const success = errorCode === 0;

				if (success) {
					setQRPayGroupList(data);
				} else {
					errorPopBox(message || `error`, errorCode);
				}
			},
			() => {
				if (isMountedRef.current) {
					errorPopBox();
				}
			}
		);
	};

	const getQRPayInfoList = async gId => {
		const datas = await api_payment_GetQRPayInfoList(Number(gId)).then(
			res => {
				if (!isMountedRef.current) return;

				const { data, message, errorCode } = res.data;
				const success = errorCode === 0;

				if (success) {
					setQRPayInfoList(data);
					return data;
				}

				errorPopBox(message || `error`, errorCode);
			},
			() => {
				if (isMountedRef.current) {
					errorPopBox();
				}
			}
		);
		return datas || [];
	};

	return {
		getQRPayGroupList,
		getQRPayInfoList,
		setQRPayInfoList,
		QRPayGroupList,
		QRPayInfoList
	};
};

export default useDepositQRPay;
