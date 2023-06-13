import { api_account_GetRefFriendList } from "../../../service/api/account";

import usePopBox from "../../hook/usePopBox";

const _pageSize = 10;

export default function useTransferHistory({
	isMountedRef,
	setHistoryDatas,
	setPagination
}) {
	const { errorPopBox } = usePopBox();

	const getRefFriendHistory = async (transactionData, pageNumber) => {
		await api_account_GetRefFriendList({
			...transactionData,
			PageNumber: pageNumber,
			PageSize: _pageSize
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
		getRefFriendHistory
	};
}
