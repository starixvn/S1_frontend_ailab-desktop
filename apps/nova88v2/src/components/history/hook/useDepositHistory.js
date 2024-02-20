import React from "react";
import {
	api_payment_GetDepositInfoHistory,
	api_payment_SetDepositCancel
} from "../../../service/api/payment";
import defPopBoxType from "../../common/defPopBoxType";

import { useDeposit, useDepositLocalBank } from "../../deposit/hooks";

import usePopBox from "../../hook/usePopBox";

export default function useDepositHistory({
	t,
	isMountedRef,
	_isConvert,
	userInfo,
	pagination,
	setHistoryDatas,
	setPagination,
	updateHistoryList
}) {
	const { errorPopBox, closePopBox, setPopBox } = usePopBox();
	const { asyncUploadBankPopBox } = useDeposit({
		isMountedRef,
		userInfo
	});
	const { uploadLocalBankReceipt } = useDepositLocalBank({
		isMountedRef
	});

	const depositActivateUploadModal = async ({
		bankInfo,
		depositRep,
		amount,
		transId,
		picFileName,
		filterData
		// historyRefId,
		// historyDepositTime
	}) => {
		const { bankName, bankSite } = bankInfo;
		const { accountName, accountNo, code } = depositRep;

		const uploadPopBoxResult = await asyncUploadBankPopBox({
			formInfo: {
				imgFile: {
					name: picFileName
				}
				// refId: historyRefId,
				// time: historyDepositTime
			},
			localBankInfo: {
				bankName,
				bankSite,
				accountNo,
				accountName,
				transId,
				amount,
				code
			},
			_isConvert,
			currencyId: userInfo.currencyId,
			langId: userInfo.langId
		});

		if (uploadPopBoxResult.success) {
			const {
				datas: { depositTime, depositRefNo, depositImgFiles }
			} = uploadPopBoxResult;

			// const isSameRefId = historyRefId === depositRefNo.value;

			// const isSameDepositTime = moment(depositTime.value).isSame(
			// 	moment(historyDepositTime)
			// );

			if (depositImgFiles.file) {
				await uploadLocalBankReceipt({
					imgFile: depositImgFiles.file,
					transId
				});
			}

			// if (!isSameDepositTime || !isSameRefId) {
			// 	await setLocalBankReceipt({
			// 		transId,
			// 		depositTime: depositTime.value,
			// 		fefNo: depositRefNo.value
			// 	});
			// }

			if (
				depositImgFiles.file
				// || !isSameDepositTime || !isSameRefId
			)
				updateHistoryList(
					filterData?.StartDate,
					filterData?.EndDate,
					true
				);
		}
	};

	const depositActivateCancelConfirmModal = ({ filterData, transId }) => {
		const clickConfirm = () => {
			closePopBox();
			api_payment_SetDepositCancel(transId).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							getDepositHistory(
								filterData,
								pagination.currentPage
							);
						} else {
							errorPopBox(
								res.data.message || "error",
								res.data.errorCode
							);
						}
					}
				},
				() => {
					if (isMountedRef.current) {
						errorPopBox();
					}
				}
			);
		};
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Cancel,
			btnBar: (
				<div className="btnGroup">
					<button className="btn-check" onClick={clickConfirm}>
						{t("lbl_Yes")}
					</button>
					<button className="btn-cancel" onClick={closePopBox}>
						{t("lbl_No")}
					</button>
				</div>
			)
		});
	};

	const getDepositHistory = async (transactionData, pageNumber) => {
		await api_payment_GetDepositInfoHistory({
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
		getDepositHistory,
		depositActivateUploadModal,
		depositActivateCancelConfirmModal
	};
}
