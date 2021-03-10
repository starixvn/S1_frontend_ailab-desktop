import { useState } from "react";
import usePopBox from "../../hook/usePopBox";
import { api_payment_GetDepositInfoRecent } from "../../../service/api/payment";

const useDeposit = ({ isMountedRef }) => {
	const [depositInfoRecentDatas, setDepositInfoRecentDatas] = useState([]);

	const { errorPopBox } = usePopBox();

	const getDepositInfoRecent = async () => {
		const result = await api_payment_GetDepositInfoRecent().then(
			res => {
				if (!isMountedRef.current) return;

				const { data, message, errorCode } = res.data;
				const success = errorCode === 0;

				if (success) {
					setDepositInfoRecentDatas(data);
					return data;
				}

				errorPopBox(message || `[${errorCode}] error`, errorCode);
			},
			() => {
				if (!isMountedRef.current) return;

				errorPopBox();
			}
		);
		return result;
	};

	return {
		getDepositInfoRecent,
		depositInfoRecentDatas,
		setDepositInfoRecentDatas
	};
};

export default useDeposit;
