import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import usePopBox from "../../hook/usePopBox";
import { defPopBoxType } from "../../common/defPopBoxType";
import {
	api_promotion_GetDepositPromotionList,
	api_promotion_SetDepositPromotionQueue
} from "../../../service/api/promotion";
import {
	api_payment_GetDepositInfoRecent,
	api_payment_CheckDepositSpecialCode
} from "../../../service/api/payment";

const useDeposit = ({ isMountedRef, userInfo }) => {
	const { t } = useTranslation();

	const [depositInfoRecentDatas, setDepositInfoRecentDatas] = useState([]);
	const [depositPromoList, setDepositPromoList] = useState([]);

	const { errorPopBox, setPopBox } = usePopBox();

	useEffect(() => {
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
		getDepositPromotionList();
	}, [userInfo.langId]);

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

				errorPopBox(message || `error`, errorCode);
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
		langId,
		receiptInfo = [],
		depositType
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
				receiptInfo,
				resolve,
				depositType
			});
		});

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

	const checkDepositSpecialCode = async specialCode => {
		return api_payment_CheckDepositSpecialCode(specialCode).then(
			res => {
				if (!isMountedRef.current) return;

				const { message, errorCode, data } = res.data;

				// eslint-disable-next-line consistent-return
				if (errorCode === 0) return data.bonusCode;

				errorPopBox(message || "error", errorCode);
			},
			() => {
				if (!isMountedRef.current) return;

				errorPopBox();
			}
		);
	};

	return {
		asyncUploadBankPopBox,
		getDepositInfoRecent,
		depositInfoRecentDatas,
		setDepositInfoRecentDatas,
		depositPromoList,
		setDepositPromotionQueue,
		checkDepositSpecialCode
	};
};

export default useDeposit;
