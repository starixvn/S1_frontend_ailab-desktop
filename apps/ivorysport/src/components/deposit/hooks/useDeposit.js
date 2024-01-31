import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import usePopBox from "../../hook/usePopBox";
import defPopBoxType from "../../common/defPopBoxType";
import {
	api_promotion_GetDepositPromotionList,
	api_promotion_SetDepositPromotionQueue
} from "../../../service/api/promotion";
import {
	api_payment_GetDepositInfoRecent,
	api_payment_CheckDepositSpecialCode,
	api_payment_KycCheck
} from "../../../service/api/payment";

const useDeposit = ({ isMountedRef, userInfo }) => {
	const { t } = useTranslation();

	const [depositInfoRecentDatas, setDepositInfoRecentDatas] = useState([]);
	const [depositPromoList, setDepositPromoList] = useState([]);
	const [kycStatus, setKycStatus] = useState("normal");

	const { errorPopBox, setPopBox } = usePopBox();

	useEffect(() => {
		const getDepositPromotionList = async () => {
			await api_promotion_GetDepositPromotionList({
				langId: userInfo?.langId
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
	}, [userInfo?.langId]);

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
		currencyId,
		langId,
		receiptInfo = []
	}) =>
		new Promise(resolve => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.DepositUploadBankSlip,
				t,
				setPopBox,
				currencyId,
				langId,
				_isConvert,
				formInfo,
				localBankInfo,
				receiptInfo,
				resolve
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

	const checkKyc = async () => {
		await api_payment_KycCheck().then(
			res => {
				if (isMountedRef.current) {
					const { errorCode } = res.data;
					let apiKycStatus = "";
					if (errorCode === 0) {
						apiKycStatus = "normal";
					} else if (errorCode === 1) {
						apiKycStatus = "kycUpload";
					} else if (errorCode === 2) {
						apiKycStatus = "kycPending";
					} else {
						errorPopBox(
							res.data.message || "error",
							res.data.errorCode
						);
					}
					setKycStatus(apiKycStatus);
				}
			},
			() => {
				if (isMountedRef.current) {
					errorPopBox();
				}
			}
		);
	};

	return {
		kycStatus,
		asyncUploadBankPopBox,
		getDepositInfoRecent,
		depositInfoRecentDatas,
		setDepositInfoRecentDatas,
		depositPromoList,
		setDepositPromotionQueue,
		checkDepositSpecialCode,
		checkKyc
	};
};

export { useDeposit };
