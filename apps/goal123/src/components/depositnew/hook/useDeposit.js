import { useState, useContext } from "react";
import moment from "moment";
import { userInfoContext } from "../../common/context";
import usePopBox from "../../hook/usePopBox";
import {
	api_payment_GetBankInfoOffList,
	api_payment_GetMobilePayGroupList,
	api_payment_GetMobilePayInfoList,
	api_payment_GetOnlinePaymentList,
	api_payment_GetOnlineBankInfoSysList,
	api_payment_GetLocalBankInfo,
	api_payment_DepositReqWireTransfer,
	api_payment_SetDepositReceipt,
	api_payment_UploadReceipt,
	api_payment_GetDepositInfoRecent
} from "../../../service/api/payment";

import { api_accountStrict_SetAccountName } from "../../../service/api/accountStrict";

const useDeposit = ({ isMountedRef }) => {
	const { setUserInfo } = useContext(userInfoContext);

	const [mobilePayGourpList, setMobilePayGourpList] = useState([]);
	const [mobilePayInfoList, setMobilePayInfoList] = useState([]);

	const [onlineBankGroupList, setOnlineBankGroupList] = useState([]);
	const [onlineBankInfoList, setOnlineBankInfoList] = useState([]);

	const [localBankGroupList, setLocalBankGroupList] = useState([]);
	const [localBankInfo, setLocalBankInfo] = useState({});

	const [depositInfoRecentDatas, setDepositInfoRecentDatas] = useState([]);

	const { errorPopBox } = usePopBox();

	const getMobilePayGroupList = async () => {
		await api_payment_GetMobilePayGroupList().then(res => {
			if (!isMountedRef.current) return;

			const { data, message, errorCode } = res.data;
			const success = errorCode === 0;

			if (success) {
				setMobilePayGourpList(data);
			} else {
				errorPopBox(message || `[${errorCode}] error`, errorCode);
			}
		});
	};

	const getMobilePayInfoList = async gId => {
		const datas = await api_payment_GetMobilePayInfoList(Number(gId)).then(
			res => {
				if (!isMountedRef.current) return;

				const { data, message, errorCode } = res.data;
				const success = errorCode === 0;

				if (success) {
					setMobilePayInfoList(data);
					return data;
				}

				errorPopBox(message || `[${errorCode}] error`, errorCode);
			}
		);
		return datas || [];
	};

	const getOnlineBankGroupList = async () => {
		await api_payment_GetOnlinePaymentList().then(
			res => {
				if (!isMountedRef.current) return;

				const { data, message, errorCode } = res.data;
				const success = errorCode === 0;

				if (success && data.length > 0) {
					setOnlineBankGroupList(data);
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

	const getOnlineBankInfoList = async pId => {
		const datas = await api_payment_GetOnlineBankInfoSysList({
			payId: Number(pId)
		}).then(
			res => {
				if (!isMountedRef.current) return;

				const { data, message, errorCode } = res.data;
				const success = errorCode === 0;

				if (success && data.length > 0) {
					setOnlineBankInfoList(data);
					return data;
				}

				errorPopBox(message || `[${errorCode}] error`, errorCode);
			},
			() => {
				if (!isMountedRef.current) return;

				errorPopBox();
			}
		);

		return datas || [];
	};

	const getLocalBankGroupList = async () => {
		await api_payment_GetBankInfoOffList().then(
			res => {
				if (!isMountedRef.current) return;

				const { data, message, errorCode } = res.data;
				const success = errorCode === 0;

				if (success && data.length > 0) {
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
		const formData = new FormData();

		formData.append("TransId", transId);
		formData.append("Receipt", imgFile);

		await api_payment_UploadReceipt(formData).then(
			res => {
				if (!isMountedRef.current) return;

				const { message, errorCode } = res.data;
				const success = errorCode === 0;

				if (!success)
					errorPopBox(message || `[${errorCode}] error`, errorCode);
			},
			() => {
				if (!isMountedRef.current) return;

				errorPopBox();
			}
		);
	};

	const setLocalBankReceipt = async ({ transId, depositTime, fefNo }) => {
		await api_payment_SetDepositReceipt(
			transId,
			moment(depositTime).unix(),
			fefNo
		).then(
			res => {
				if (!isMountedRef.current) return;

				const { message, errorCode } = res.data;
				const success = errorCode === 0;

				if (!success)
					errorPopBox(message || `[${errorCode}] error`, errorCode);
			},
			() => {
				if (!isMountedRef.current) return;

				errorPopBox();
			}
		);
	};

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
				}

				errorPopBox(message || `[${errorCode}] error`, errorCode);
			},
			() => {
				if (!isMountedRef.current) return;

				errorPopBox();
			}
		);
	};

	return {
		getMobilePayGroupList,
		getMobilePayInfoList,
		setMobilePayInfoList,
		mobilePayGourpList,
		mobilePayInfoList,

		getOnlineBankGroupList,
		getOnlineBankInfoList,
		setOnlineBankInfoList,
		onlineBankGroupList,
		onlineBankInfoList,

		getLocalBankGroupList,
		getLocalBankInfo,
		localBankGroupList,
		localBankInfo,
		postLocalBankReqWireTransfer,
		uploadLocalBankReceipt,
		setLocalBankReceipt,
		setAccountName,

		getDepositInfoRecent,
		depositInfoRecentDatas,
		setDepositInfoRecentDatas
	};
};

export default useDeposit;
