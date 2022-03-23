import { useState } from "react";
import usePopBox from "../../hook/usePopBox";

import { api_payment_GetLineChannelForDpeosit } from "../../../service/api/payment";

const useDepositLinePay = ({ isMountedRef }) => {
	const { errorPopBox } = usePopBox();
	const [linePayLink, setLink] = useState("");
	const getLinePayLink = async () => {
		await api_payment_GetLineChannelForDpeosit().then(res => {
			if (!isMountedRef.current) return;

			const { data, message, errorCode } = res.data;
			const success = errorCode === 0;

			if (success) {
				setLink(data.link);
			} else {
				errorPopBox(message || `error`, errorCode);
			}
		});
	};
	return {
		getLinePayLink,
		linePayLink
	};
};

export { useDepositLinePay };
