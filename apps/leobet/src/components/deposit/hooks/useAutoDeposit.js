import { useState } from "react";
import { api_payment_GetAutoChannelBankGroupList } from "../../../service/api/payment";
import usePopBox from "../../hook/usePopBox";

const useAutoDeposit = ({ isMountedRef }) => {
	const { errorPopBox } = usePopBox();

	const [autoDepositGroupList, setAutoDepositGroupList] = useState([]);

	const getAutoDepositGroupList = async () => {
		await api_payment_GetAutoChannelBankGroupList().then(res => {
			if (!isMountedRef.current) return;

			const { data = [], message, errorCode } = res.data;

			const success = errorCode === 0;

			if (success) {
				setAutoDepositGroupList(data);
			} else if (!success) {
				errorPopBox(message || `error`, errorCode);
			}
		});
	};

	return { autoDepositGroupList, getAutoDepositGroupList };
};

export { useAutoDeposit };
