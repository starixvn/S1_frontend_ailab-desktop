import { api_tp_GetTransferHistory } from "../../../service/api/tp";

import usePopBox from "../../hook/usePopBox";

export default function useTransferHistory({
	isMountedRef,
	setHistoryDatas,
	setPagination
}) {
	const { errorPopBox } = usePopBox();

	const transferDirection = (
		direction,
		displayMainWallet,
		displaySabaWallet
	) => {
		let startWallet = "";
		let endWallet = "";

		if (direction === 1) {
			startWallet = displayMainWallet;
			endWallet = displaySabaWallet;
		} else {
			startWallet = displaySabaWallet;
			endWallet = displayMainWallet;
		}
		return { startWallet, endWallet };
	};

	const getTransferHistory = async (transactionData, pageNumber) => {
		await api_tp_GetTransferHistory({
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
		transferDirection,
		getTransferHistory
	};
}
