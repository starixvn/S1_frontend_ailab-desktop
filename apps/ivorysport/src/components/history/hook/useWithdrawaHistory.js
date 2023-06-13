import React from "react";
import {
	api_payment_GetWithdrawalInfoHistory,
	api_payment_SetWithdrawalCancel
} from "../../../service/api/payment";

import defPopBoxType from "../../common/defPopBoxType";
import usePopBox from "../../hook/usePopBox";

export default function useTransferHistory({
	t,
	isMountedRef,
	setHistoryDatas,
	setPagination
}) {
	const { errorPopBox, closePopBox, setPopBox } = usePopBox();

	const setWithdrawalCancel = async transId => {
		await api_payment_SetWithdrawalCancel(transId).then(
			res => {
				if (!isMountedRef.current) return;
				const { errorCode, message } = res.data;
				if (errorCode === 0) {
					setHistoryDatas(prev => {
						const newData = [...prev];
						const idx = newData.findIndex(
							x => x.transId === transId
						);
						newData[idx].status = 5;
						return newData;
					});
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

	const activateWithdrawalCancelConfirmModal = transId => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Cancel,
			btnBar: (
				<div className="btnGroup">
					<button
						className="btn-cancel"
						onClick={() => {
							closePopBox();
							setWithdrawalCancel(transId);
						}}>
						{t("lbl_Yes")}
					</button>
					<button className="btn-check" onClick={closePopBox}>
						{t("lbl_No")}
					</button>
				</div>
			)
		});
	};

	const getWithdrawalInfoHistory = async (transactionData, pageNumber) => {
		await api_payment_GetWithdrawalInfoHistory({
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
		getWithdrawalInfoHistory,
		activateWithdrawalCancelConfirmModal
	};
}
