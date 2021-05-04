import { useState } from "react";
import usePopBox from "../../hook/usePopBox";

import {
	api_payment_GetLoadCardPayGroupList,
	api_payment_GetLoadCardPayInfoList
} from "../../../service/api/payment";

const useDepositLoadCardForm = ({ isMountedRef }) => {
	const [loadCardPayGroupList, setLoadCardPayGroupList] = useState([]);
	const [loadCardPayInfoList, setLoadCardPayInfoList] = useState([]);

	const { errorPopBox } = usePopBox();

	const getLoadCardPayGroupList = async () => {
		await api_payment_GetLoadCardPayGroupList().then(res => {
			if (!isMountedRef.current) return;

			const { data, message, errorCode } = res.data;
			const success = errorCode === 0;

			if (success) {
				setLoadCardPayGroupList(data);
			} else {
				errorPopBox(message || `[${errorCode}] error`, errorCode);
			}
		});
	};

	const getLoadCardPayInfoList = gId =>
		api_payment_GetLoadCardPayInfoList(Number(gId)).then(res => {
			if (!isMountedRef.current) return;

			const { data, message, errorCode } = res.data;
			const success = errorCode === 0;

			if (success) {
				setLoadCardPayInfoList(data);
				return data;
			}

			errorPopBox(message || `[${errorCode}] error`, errorCode);
		});

	return {
		loadCardPayGroupList,
		loadCardPayInfoList,
		getLoadCardPayGroupList,
		getLoadCardPayInfoList,
		setLoadCardPayInfoList
	};
};

export default useDepositLoadCardForm;
