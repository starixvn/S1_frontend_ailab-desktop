import { useState } from "react";
import { useTranslation } from "react-i18next";
import usePopBox from "../../hook/usePopBox";
import { defPopBoxType } from "../../common/popBox";

import { api_payment_GetDepositInfoRecent } from "../../../service/api/payment";

const useDeposit = ({ isMountedRef }) => {
	const { t } = useTranslation();

	const [depositInfoRecentDatas, setDepositInfoRecentDatas] = useState([]);

	const { errorPopBox, setPopBox } = usePopBox();

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

	const asyncUploadBankPopBox = async ({
		formInfo,
		localBankInfo,
		_isConvert,
		langId
	}) =>
		new Promise(resolve => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.DepositUploadBankSlip,
				t,
				setPopBox,
				langId,
				_isConvert,
				formInfo,
				localBankInfo,
				resolve
			});
		});

	return {
		asyncUploadBankPopBox,
		getDepositInfoRecent,
		depositInfoRecentDatas,
		setDepositInfoRecentDatas
	};
};

export default useDeposit;
