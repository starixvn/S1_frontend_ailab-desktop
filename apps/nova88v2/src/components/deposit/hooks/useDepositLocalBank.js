import { useState } from "react";
import usePopBox from "../../hook/usePopBox";

import {
	api_payment_GetBankInfoOffListStatus,
	api_payment_GetLocalBankInfo,
	api_payment_DepositReqWireTransfer,
	api_payment_UploadReceipt
	// api_payment_SetDepositReceipt
} from "../../../service/api/payment";

import { api_account_GetCustBankInfo } from "../../../service/api/account";
import { getBase64 } from "../../common/common";

const useDepositLocalBank = ({ isMountedRef }) => {
	const [localBankGroupList, setLocalBankGroupList] = useState([]);
	const [localBankInfo, setLocalBankInfo] = useState({});
	const [custBankInfoList, setCustBankInfoList] = useState([]);
	const { errorPopBox } = usePopBox();

	const getLocalBankGroupList = async () => {
		const queryType = 1;

		await api_payment_GetBankInfoOffListStatus(queryType).then(res => {
			if (!isMountedRef.current) return;

			const { data, message, errorCode } = res.data;
			const success = errorCode === 0;

			if (success && data.length > 0) {
				setLocalBankGroupList(data);
			} else if (!success) {
				errorPopBox(message || `error`, errorCode);
			}
		});
	};

	const getLocalBankInfo = async ({ sysId }) => {
		await api_payment_GetLocalBankInfo({ sysId }).then(
			res => {
				if (!isMountedRef.current) return;

				const { data, message, errorCode } = res.data;
				const success = errorCode === 0;

				if (success) {
					setLocalBankInfo(data);
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

	const postLocalBankReqWireTransfer = async ({
		amount,
		sysId,
		hasPromotion,
		bankId
	}) => {
		const transId = await api_payment_DepositReqWireTransfer({
			amount,
			sysId,
			hasPromotion,
			bankId
		}).then(
			res => {
				if (!isMountedRef.current) return;

				const { data, message, errorCode } = res.data;
				const success = errorCode === 0;

				if (success) {
					// eslint-disable-next-line consistent-return
					return data.transId;
				}

				errorPopBox(message || `error`, errorCode);
			},
			() => {
				if (!isMountedRef.current) return;

				errorPopBox();
			}
		);
		return transId;
	};

	const uploadLocalBankReceipt = async ({ transId, imgFile }) => {
		let success = false;

		const image = await getBase64(imgFile);
		await api_payment_UploadReceipt(transId, image).then(
			res => {
				if (!isMountedRef.current) return;

				const { message, errorCode } = res.data;
				success = errorCode === 0;

				if (!success) errorPopBox(message || `error`, errorCode);
			},
			() => {
				if (!isMountedRef.current) return;

				errorPopBox();
			}
		);
		return success;
	};

	// const setLocalBankReceipt = async ({ transId, depositTime, fefNo }) => {
	// 	let success = false;

	// 	await api_payment_SetDepositReceipt(
	// 		transId,fsetLocalBankReceipt
	// 		moment(depositTime).unix(),
	// 		fefNo
	// 	).then(
	// 		res => {
	// 			if (!isMountedRef.current) return;

	// 			const { message, errorCode } = res.data;
	// 			success = errorCode === 0;

	// 			if (!success)
	// 				errorPopBox(message || `[${errorCode}] error`, errorCode);
	// 		},
	// 		() => {
	// 			if (!isMountedRef.current) return;

	// 			errorPopBox();
	// 		}
	// 	);
	// 	return success;
	// };

	const getBankInfo = async () => {
		await api_account_GetCustBankInfo().then(
			res => {
				if (!isMountedRef.current) return;

				const { errorCode, data, message } = res.data;

				if (errorCode === 0) {
					if (data?.bankInfoDetail?.length > 0) {
						const formatBankInfoDetail = data.bankInfoDetail.map(
							item => {
								return {
									...item,
									id: item.sysId,
									displayText: `${item.bankName} ${item.accountNo}`
								};
							}
						);

						setCustBankInfoList(formatBankInfoDetail);
					} else {
						setCustBankInfoList([]);
					}
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
		getLocalBankGroupList,
		getLocalBankInfo,
		localBankGroupList,
		localBankInfo,
		postLocalBankReqWireTransfer,
		uploadLocalBankReceipt,
		getBankInfo,
		custBankInfoList
		// setLocalBankReceipt
	};
};

export { useDepositLocalBank };
