import { useState, useContext } from "react";
import moment from "moment";
import { userInfoContext } from "../../common/context";
import usePopBox from "../../hook/usePopBox";

import {
	api_payment_GetBankInfoOffList,
	api_payment_GetLocalBankInfo,
	api_payment_DepositReqWireTransfer,
	api_payment_SetDepositReceipt,
	api_payment_UploadReceipt
} from "../../../service/api/payment";

import { api_accountStrict_SetAccountName } from "../../../service/api/accountStrict";

const useDepositLocalBank = ({ isMountedRef }) => {
	const [localBankGroupList, setLocalBankGroupList] = useState([]);
	const [localBankInfo, setLocalBankInfo] = useState({});

	const { setUserInfo } = useContext(userInfoContext);

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

	const setLocalBankReceipt = async ({ transId, depositTime, fefNo }) => {
		let success = false;

		await api_payment_SetDepositReceipt(
			transId,
			moment(depositTime).unix(),
			fefNo
		).then(
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

	const setAccountName = async accountName => {
		await api_accountStrict_SetAccountName({
			name: accountName
		}).then(
			res => {
				if (!isMountedRef.current) return;

				const { message, errorCode } = res.data;
				const success = errorCode === 0;

				if (success) {
					setUserInfo(prev => ({
						...prev,
						accountName
					}));
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

	return {
		getLocalBankGroupList,
		getLocalBankInfo,
		localBankGroupList,
		localBankInfo,
		postLocalBankReqWireTransfer,
		setLocalBankReceipt,
		uploadLocalBankReceipt,
		setAccountName
	};
};

export default useDepositLocalBank;
