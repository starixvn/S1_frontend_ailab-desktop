import { useState } from "react";
import moment from "moment";
import usePopBox from "../../hook/usePopBox";

import {
	api_payment_GetBankInfoOffList,
	api_payment_GetLocalBankInfo,
	api_payment_DepositReqWireTransfer,
	api_payment_UploadReceipt
	// api_payment_SetDepositReceipt
} from "../../../service/api/payment";

const useDepositLocalBank = ({ isMountedRef }) => {
	const [localBankGroupList, setLocalBankGroupList] = useState([]);
	const [localBankInfo, setLocalBankInfo] = useState({});

	const { errorPopBox } = usePopBox();

	const getLocalBankGroupList = async () => {
		await api_payment_GetBankInfoOffList().then(
			res => {
				if (!isMountedRef.current) return;

				const { data, message, errorCode } = res.data;
				const success = errorCode === 0;

				if (success) {
					setLocalBankGroupList(data);
				} else {
					errorPopBox(message || `[${errorCode}] error`, errorCode);
				}
			},
			() => {
				if (!isMountedRef.current) return;

				errorPopBox();
			}
		);
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
					errorPopBox(message || `[${errorCode}] error`, errorCode);
				}
			},
			() => {
				if (!isMountedRef.current) return;

				errorPopBox();
			}
		);
	};

	const postLocalBankReqWireTransfer = async ({ amount, sysId }) => {
		const transId = await api_payment_DepositReqWireTransfer({
			amount,
			sysId
		}).then(
			res => {
				if (!isMountedRef.current) return;

				const { data, message, errorCode } = res.data;
				const success = errorCode === 0;

				if (success) {
					return data.transId;
				}

				errorPopBox(message || `[${errorCode}] error`, errorCode);
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

		const formData = new FormData();

		formData.append("TransId", transId);
		formData.append("Receipt", imgFile);

		await api_payment_UploadReceipt(formData).then(
			res => {
				if (!isMountedRef.current) return;

				const { message, errorCode } = res.data;
				success = errorCode === 0;

				if (!success)
					errorPopBox(message || `[${errorCode}] error`, errorCode);
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

	return {
		getLocalBankGroupList,
		getLocalBankInfo,
		localBankGroupList,
		localBankInfo,
		postLocalBankReqWireTransfer,
		uploadLocalBankReceipt
		// setLocalBankReceipt
	};
};

export default useDepositLocalBank;
