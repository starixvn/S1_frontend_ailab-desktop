import { useState } from "react";

import { api_payment_GetLineChannelForDpeosit } from "../../../service/api/payment";

const useDepositLinePay = ({ isMountedRef }) => {
	const [linePayLink, setLink] = useState("");
	const getLinePayLink = async () => {
		await api_payment_GetLineChannelForDpeosit()
			.then(res => {
				if (!isMountedRef.current) return;

				const { data, errorCode } = res.data;
				const success = errorCode === 0;

				if (success) {
					setLink(data.link);
				}
			})
			.catch();
	};
	return {
		getLinePayLink,
		linePayLink
	};
};

export { useDepositLinePay };
