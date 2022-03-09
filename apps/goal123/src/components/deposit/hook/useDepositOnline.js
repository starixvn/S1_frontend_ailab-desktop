import { useState } from "react";
import usePopBox from "../../hook/usePopBox";

import { api_payment_GetAutoChannelBankGroupList } from "../../../service/api/payment";

const useDepositLocalBank = ({ isMountedRef }) => {
	const { errorPopBox } = usePopBox();

	const [autoChannelBankGroupList, setAutoChannelBankGroupList] = useState(
		[]
	);

	const getAutoChannelBankGroupList = async () => {
		await api_payment_GetAutoChannelBankGroupList().then(
			res => {
				if (!isMountedRef.current) return;

				const { data, message, errorCode } = res.data;
				const success = errorCode === 0;

				if (success) {
					setAutoChannelBankGroupList(data);
				} else {
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
		autoChannelBankGroupList,
		getAutoChannelBankGroupList
	};
};

export default useDepositLocalBank;
