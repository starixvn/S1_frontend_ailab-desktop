import { useState } from "react";
import { useTranslation } from "react-i18next";
import usePopBox from "../../hook/usePopBox";
import { defPopBoxType } from "../../common/popBox";
import {
	api_promotion_GetDepositPromotionList,
	api_promotion_SetDepositPromotionQueue
} from "../../../service/api/promotion";
import { api_payment_GetDepositInfoRecent } from "../../../service/api/payment";

const useDeposit = ({ isMountedRef, userInfo }) => {
	const { t } = useTranslation();

	const [depositInfoRecentDatas, setDepositInfoRecentDatas] = useState([]);
	const [depositPromoList, setDepositPromoList] = useState([]);

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

	const getDepositPromotionList = async () => {
		await api_promotion_GetDepositPromotionList({
			langId: userInfo.langId
		}).then(
			({ data: { data, message, errorCode } }) => {
				if (!isMountedRef.current) return;

				const success = errorCode === 0;
				if (success) {
					const noneOption = {
						id: null,
						displayKey: "lbl_None"
					};

					const newDtata = data.reduce(
						(arr, cur) => [
							...arr,
							{
								...cur,
								id: cur.bonusCode,
								displayText: cur.title
							}
						],
						[]
					);

					setDepositPromoList([noneOption, ...newDtata]);
				} else errorPopBox(message || "error", errorCode);
			},
			() => {
				if (!isMountedRef.current) return;

				errorPopBox();
			}
		);
	};

	const setDepositPromotionQueue = async ({ transId, bonusCode }) => {
		let success = false;

		await api_promotion_SetDepositPromotionQueue({
			langId: userInfo.langId,
			transId,
			bonusCode
		}).then(
			({ data: { message, errorCode } }) => {
				if (!isMountedRef.current) return;

				success = errorCode === 0;

				if (!success) {
					errorPopBox(message || "error", errorCode);
				}
			},
			() => {
				if (!isMountedRef.current) return;

				errorPopBox();
			}
		);
		return success;
	};

	return {
		asyncUploadBankPopBox,
		getDepositInfoRecent,
		depositInfoRecentDatas,
		setDepositInfoRecentDatas,
		depositPromoList,
		getDepositPromotionList,
		setDepositPromotionQueue
	};
};

export default useDeposit;
