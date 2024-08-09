import { useState, useContext } from "react";
import { MetaPixelTracker } from "@ailab-desktop/common";
import moment from "moment";
import { userInfoContext } from "../../common/context";
import usePopBox from "../../hook/usePopBox";
import { getBase64 } from "../../common/common";
import {
	api_payment_GetBankInfoOffList,
	api_payment_GetLocalBankInfo,
	api_payment_DepositReqWireTransfer,
	api_payment_UploadReceipt,
	api_payment_SetDepositReceipt
} from "../../../service/api/payment";

import { api_accountStrict_SetAccountName } from "../../../service/api/accountStrict";

const useDepositLocalBank = ({ isMountedRef }) => {
	const { setUserInfo } = useContext(userInfoContext);

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
					errorPopBox(message || `error`, errorCode);
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
					// 存款成功送出臉書廣告埋點給市場
					MetaPixelTracker("depositSubmit");
					setLocalBankInfo(data);
				} else {
					errorPopBox(message || `error`, errorCode);
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
		bankId,
		code
	}) => {
		const transId = await api_payment_DepositReqWireTransfer({
			amount,
			sysId,
			bankId,
			code
		}).then(
			res => {
				if (!isMountedRef.current) return;

				const { data, message, errorCode } = res.data;
				const success = errorCode === 0;

				if (success) {
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

				if (!success) errorPopBox(message || `error`, errorCode);
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
					errorPopBox(message || `error`, errorCode);
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
		setLocalBankReceipt,
		setAccountName
	};
};

export default useDepositLocalBank;
