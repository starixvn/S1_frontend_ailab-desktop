import React, { useState } from "react";
import usePopBox from "../../hook/usePopBox";
import { defPopBoxType } from "../../common/popBox";

import {
	api_payment_GetLoadCardPayGroupList,
	api_payment_GetLoadCardPayInfoList
} from "../../../service/api/payment";
import { api_cashier_DepositReqLoadCardPay } from "../../../service/api/cashier";

const useDepositLoadCardForm = ({ isMountedRef }) => {
	const [loadCardPayGroupList, setLoadCardPayGroupList] = useState([]);
	const [loadCardPayInfoList, setLoadCardPayInfoList] = useState([]);

	const { errorPopBox, setPopBox, closePopBox } = usePopBox();

	const getLoadCardPayGroupList = async () => {
		await api_payment_GetLoadCardPayGroupList().then(res => {
			if (!isMountedRef.current) return;

			const { data, message, errorCode } = res.data;
			const success = errorCode === 0;

			if (success) {
				setLoadCardPayGroupList(data);
			} else {
				errorPopBox(message || `[${errorCode}] error`, errorCode);
			}
		});
	};

	const getLoadCardPayInfoList = gId =>
		api_payment_GetLoadCardPayInfoList(Number(gId)).then(res => {
			if (!isMountedRef.current) return;

			const { data, message, errorCode } = res.data;
			const success = errorCode === 0;

			if (success) {
				setLoadCardPayInfoList(data);
				return data;
			}

			errorPopBox(message || `[${errorCode}] error`, errorCode);
		});

	const getReqLoadCardPay = ({
		langId,
		cardSerial,
		cardCode,
		channelId,
		amount,
		bonusCode
	}) =>
		api_cashier_DepositReqLoadCardPay({
			langId,
			cardSerial,
			cardCode,
			channelId,
			amount,
			bonusCode
		}).then(res => {
			if (!isMountedRef.current) return;

			const { data, message, errorCode } = res.data;
			const success = errorCode === 0;

			if (success) {
				setPopBox({
					isOpen: true,
					popBoxType: defPopBoxType.Success,
					icon: "icon icon-bell",
					description: <div>{data.formData.Message}</div>,
					btnBar: (
						<div className="btnGroup">
							<button
								className="btn-cancel"
								onClick={closePopBox}>
								OK
							</button>
						</div>
					)
				});
			} else {
				errorPopBox(message || `[${errorCode}] error`, errorCode);
			}
		});

	return {
		loadCardPayGroupList,
		loadCardPayInfoList,
		getLoadCardPayGroupList,
		getLoadCardPayInfoList,
		setLoadCardPayInfoList,
		getReqLoadCardPay
	};
};

export default useDepositLoadCardForm;
