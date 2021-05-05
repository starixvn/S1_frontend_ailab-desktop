import { api_payment_GetStatement } from "../../../service/api/payment";

import usePopBox from "../../hook/usePopBox";

export default function useFinancialHistory({
	isMountedRef,
	setHistoryDatas,
	setPagination
}) {
	const { errorPopBox } = usePopBox();

	const getStatementHistory = async (transactionData, pageNumber) => {
		await api_payment_GetStatement({
			...transactionData,
			PageNumber: pageNumber
		}).then(
			res => {
				if (!isMountedRef.current) return;
				const { errorCode, data, totalPages, message } = res.data;
				if (errorCode === 0) {
					setHistoryDatas(data);
					setPagination(prev => ({
						...prev,
						totalPages
					}));
				} else {
					errorPopBox(message || "error", errorCode);
				}
			},
			() => {
				if (!isMountedRef.current) return;

				errorPopBox();
			}
		);
	};

	return {
		getStatementHistory
	};
}
