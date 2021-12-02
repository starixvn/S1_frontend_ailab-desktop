import { useState } from "react";
import usePopBox from "../../hook/usePopBox";

import {
	api_payment_GetMobilePayGroupList,
	api_payment_GetMobilePayInfoList
} from "../../../service/api/payment";

const useDepositMobilePay = ({ isMountedRef }) => {
	const [mobilePayGourpList, setMobilePayGourpList] = useState([]);
	const [mobilePayInfoList, setMobilePayInfoList] = useState([]);

	const { errorPopBox } = usePopBox();

	const getMobilePayGroupList = async () => {
		await api_payment_GetMobilePayGroupList().then(
			res => {
				if (!isMountedRef.current) return;

				const { data, message, errorCode } = res.data;
				const success = errorCode === 0;

				if (success) {
					setMobilePayGourpList(data);
				} else {
					errorPopBox(message || `error`, errorCode);
				}
			},
			() => {
				errorPopBox();
			}
		);
	};

	const getMobilePayInfoList = async gId => {
		const datas = await api_payment_GetMobilePayInfoList(Number(gId)).then(
			res => {
				if (!isMountedRef.current) return;

				const { data, message, errorCode } = res.data;
				const success = errorCode === 0;

				if (success) {
					setMobilePayInfoList(data);
					return data;
				}

				errorPopBox(message || `error`, errorCode);
			},
			() => {
				errorPopBox();
			}
		);
		return datas || [];
	};

	return {
		getMobilePayGroupList,
		getMobilePayInfoList,
		setMobilePayInfoList,
		mobilePayGourpList,
		mobilePayInfoList
	};
};

export default useDepositMobilePay;
