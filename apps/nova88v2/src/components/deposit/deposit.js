import React, { useContext, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	loadingContext,
	userInfoContext,
	popBoxContext
} from "../common/context";
import { defDepositType } from "./deposit.def";
import defPopBoxType from "../common/defPopBoxType";
import {
	checkAmount,
	isConvert,
	setLocalStorage,
	getLocalStorage,
	removeLocalStorage,
	number_format
} from "../common/common";
import usePopBox from "../hook/usePopBox";

import {
	useDeposit,
	useDepositCryptoPay,
	useDepositLocalBank,
	useDepositMobilePay,
	useDepositOnline,
	useDepositEffect
} from "./hooks";

import config from "../../config";

import DepositInfoMoule from "./deposit.infoMoule";
import DepositRecentHistory from "./deposit.recentHistory";
import MobileForm from "./components/mobileForm";
import OnlineBankForm from "./components/onlineBankForm";
import LocalBankForm from "./components/localBankForm";
import CryptoPayForm from "./components/cryptoPayForm";

import {
	api_cashier_DepositReqMobilePay,
	api_cashier_DepositReqOnlineBanking,
	api_cashier_DepositReqCryptoPay
} from "../../service/api/cashier";

const Deposit = () => {
	const { t } = useTranslation();
	const isMountedRef = useRef(null);
	const { loading, setLoading } = useContext(loadingContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox, closePopBox } = usePopBox();
	const _isConvert = isConvert(userInfo.currencyId);
	const depositInfoStorage = getLocalStorage(
		`${userInfo.userName}-nova88depositquery`
	);

	const [
		processingDescriptionActive,
		setProcessingDescriptionActive
	] = useState(false);

	const [depositOptions, setDepositOptions] = useState([]);

	const [depositType, setDepositType] = useState(null);

	const [isGroupListFetchDone, setIsGroupListFetchDone] = useState(true);

	const [formInfo, setFormInfo] = useState({
		imgFile: null,
		amount: null,
		fromChannel: null,
		fromAccountNum: null,
		checked: null,
		tip: "",
		depositPromo: {
			idx: 0,
			bonusCode: null,
			requiredAmount: null
		}
	});

	const [isInitDataDone, setIsInitDataDone] = useState(false);

	const [saveInfoChecked, setSaveInfoChecked] = useState(false);

	const [localBankChecked, setLocalBankChecked] = useState(true);

	const [localBankChannelError, setLocalBankChannelError] = useState({
		checked: null,
		tip: ""
	});
	const [localBankBankInfoErrpr, setLocalBankBankInfoErrpr] = useState({
		checked: null,
		tip: ""
	});

	const {
		asyncUploadBankPopBox,
		getDepositInfoRecent,
		depositInfoRecentDatas,
		setDepositInfoRecentDatas,
		depositPromoList,
		setDepositPromotionQueue
	} = useDeposit({
		isMountedRef,
		userInfo
	});

	const {
		getMobilePayGroupList,
		getMobilePayInfoList,
		setMobilePayInfoList,
		mobilePayGourpList,
		mobilePayInfoList
	} = useDepositMobilePay({ isMountedRef });

	const {
		getOnlineBankGroupList,
		getOnlineBankInfoList,
		setOnlineBankInfoList,
		onlineBankGroupList,
		onlineBankInfoList
	} = useDepositOnline({ isMountedRef });

	const {
		getLocalBankGroupList,
		getLocalBankInfo,
		localBankGroupList,
		localBankInfo,
		postLocalBankReqWireTransfer,
		uploadLocalBankReceipt,
		getBankInfo,
		custBankInfoList
		// setLocalBankReceipt
	} = useDepositLocalBank({
		isMountedRef,
		userInfo,
		setUserInfo
	});

	const {
		getCryptoPayGroupList,
		getCryptoPayInfo,
		cryptoPayGroupList,
		cryptoPayInfo
	} = useDepositCryptoPay({ isMountedRef });

	const onChangeDepositType = async type => {
		const resetInfoList = () => {
			setMobilePayInfoList([]);
			setOnlineBankInfoList([]);
		};

		setDepositType(type);

		resetInfoList();

		setIsGroupListFetchDone(false);

		if (type === defDepositType.mobile) {
			await getMobilePayGroupList();
		} else if (type === defDepositType.localBank) {
			await getLocalBankGroupList();
		} else if (type === defDepositType.onlineBank) {
			await getOnlineBankGroupList();
		} else if (type === defDepositType.cryptoPay) {
			await getCryptoPayGroupList();
		}

		setIsGroupListFetchDone(true);
	};

	const onChangeAmount = _amount => {
		const amount = String(_amount).replace(/^(0+)|[^\d]+/g, "");
		setFormInfo(prev => {
			return { ...prev, amount };
		});
	};

	const onReset = () => {
		setLocalBankChecked(true);

		setFormInfo(prev => {
			return {
				...prev,
				imgFile: null,
				// refId: null,
				// time: moment(),
				amount: null,
				fromChannel: null,
				fromAccountNum: null,
				checked: null,
				tip: ""
			};
		});
	};

	const onSubmit = async () => {
		const saveInfoToLocalStorage = () => {
			const localStoragePath = {
				amount: formInfo.amount,
				search: window.location.search,
				type: depositType
			};

			if (formInfo.fromChannel) {
				localStoragePath.localBankChannel = {
					fromChannel: formInfo.fromChannel,
					fromSysId: formInfo?.fromSysId,
					fromAccountNum: formInfo?.fromAccountNum
				};
			}

			setLocalStorage(
				`${userInfo.userName}-nova88depositquery`,
				localStoragePath
			);
		};

		const asyncModalPopBox = () =>
			new Promise(resolve =>
				setPopBox({
					isOpen: true,
					popBoxType: defPopBoxType.Modal,
					closePopBox: () => {
						closePopBox();
						resolve(false);
					},
					content: (
						<>
							<div className="icon icon-bell" />

							<div className="title">{t("lbl_Information")}</div>

							<div>{t("lbl_Deposit_Promotion_Pop_Msg1")}</div>

							<div className="btnGroup">
								<button
									className="btn-red"
									onClick={() => {
										closePopBox();
										resolve(true);
									}}>
									{t("lbl_Deposit_Promotion_Button_Proceed")}
								</button>
								<button
									className="btn-org"
									onClick={() => {
										closePopBox();
										resolve(false);
									}}>
									{t("lbl_Deposit_Promotion_Button_Back")}
								</button>
							</div>
						</>
					)
				})
			);

		if (formInfo.checked && typeof window !== "undefined") {
			const { sysId, payId, channelId, amount, depositPromo } = formInfo;
			const resultAmount = _isConvert ? amount * 1000 : Number(amount);

			if (
				userInfo.phoneVerified &&
				depositPromo.requiredAmount &&
				resultAmount < depositPromo.requiredAmount
			) {
				const success = await asyncModalPopBox();

				if (!success) return;
			}

			if (saveInfoChecked) {
				saveInfoToLocalStorage();
			} else {
				removeLocalStorage(
					`${userInfo.userName}-nova88depositquerySavedChecked`
				);
				removeLocalStorage(`${userInfo.userName}-nova88depositquery`);
			}

			setLoading(true);

			if (depositType === defDepositType.mobile) {
				const params = [
					`ChannelId=${channelId}`,
					`Amount=${resultAmount}`,
					depositPromo?.bonusCode &&
						`BonusCode=${depositPromo.bonusCode}`
				]
					.filter(Boolean)
					.join("&");

				if (formInfo.mode === 3) {
					await api_cashier_DepositReqMobilePay({
						langId: userInfo.langId,
						paramsUrl: params
					}).then(
						res => {
							if (res.data.errorCode === 0) {
								setPopBox({
									isOpen: true,
									title: t("lbl_DepositType2"),
									popBoxType: defPopBoxType.PaymentQR,
									depositAmount:
										res.data.data.formData?.DepositAmount,
									amount: resultAmount,
									currencyId: userInfo.currencyId,
									imgUrl: res.data.data.url,
									handlePopBox: () => {
										setPopBox(prevState => ({
											...prevState,
											isOpen: false
										}));
									}
								});
							} else {
								errorPopBox(
									res.data.message || "error",
									res.data.errorCode
								);
							}
						},
						() => {
							errorPopBox();
						}
					);
				} else {
					const baseUrl = `${config.openURL}/${userInfo.langId}/Cashier/DepositReqMobilePay`;

					window.open(`${baseUrl}?${params}`);
				}
			} else if (depositType === defDepositType.localBank) {
				if (!localBankChecked) return;

				const transId = await postLocalBankReqWireTransfer({
					amount: resultAmount,
					sysId: formInfo.sysId,
					fromChannel: formInfo.fromChannel,
					fromSysId: formInfo.fromSysId,
					fromAccountNum: formInfo.fromAccountNum
				});

				if (transId) {
					try {
						const result = await Promise.all([
							!formInfo.imgFile ||
								uploadLocalBankReceipt({
									transId,
									imgFile: formInfo.imgFile
								}),

							!formInfo?.depositPromo?.bonusCode ||
								setDepositPromotionQueue({
									transId,
									bonusCode: formInfo.depositPromo.bonusCode
								})
						]);

						if (result.every(res => res)) {
							setProcessingDescriptionActive(true);
						}
					} catch (e) {
						errorPopBox();
					}
				}
			} else if (depositType === defDepositType.onlineBank) {
				const params = [
					`sysId=${sysId || 0}`,
					`payId=${payId}`,
					`ChannelId=${channelId}`,
					`Amount=${resultAmount}`,
					depositPromo?.bonusCode
						? `BonusCode=${depositPromo.bonusCode}`
						: ""
				]
					.filter(Boolean)
					.join("&");

				if (formInfo.mode === 3) {
					await api_cashier_DepositReqOnlineBanking({
						langId: userInfo.langId,
						paramsUrl: params
					}).then(
						res => {
							const {
								data: {
									errorCode,
									message,
									data: {
										url,
										formData: {
											DepositAmount: depositAmount,
											BankName: bankName,
											AccountNumber: accountNumber,
											AccountName: accountName
										},
										thirdId
									}
								}
							} = res;

							if (errorCode === 0) {
								setPopBox({
									isOpen: true,
									title: t("lbl_DepositType1"),
									popBoxType: defPopBoxType.PaymentQR,
									depositAmount,
									amount: resultAmount,
									currencyId: userInfo.currencyId,
									imgUrl: url,
									bankName: bankName ?? null,
									accountNumber: accountNumber ?? null,
									accountName: accountName ?? null,
									thirdId,
									handlePopBox: () => {
										setPopBox(prevState => ({
											...prevState,
											isOpen: false
										}));
									}
								});
							} else {
								errorPopBox(message || "error", errorCode);
							}
						},
						() => {
							errorPopBox();
						}
					);
				} else {
					const baseUrl = `${config.openURL}/${userInfo.langId}/Cashier/DepositReqOnlineBanking`;

					window.open(`${baseUrl}?${params}`);
				}
			} else if (depositType === defDepositType.cryptoPay) {
				const params = [
					`ChannelId=${channelId}`,
					`Amount=${resultAmount}`,
					depositPromo?.bonusCode &&
						`BonusCode=${depositPromo.bonusCode}`
				]
					.filter(Boolean)
					.join("&");
				if (formInfo.mode === 3) {
					await api_cashier_DepositReqCryptoPay({
						langId: userInfo.langId,
						paramsUrl: params
					}).then(
						res => {
							if (res.data.errorCode === 0) {
								const promoContent = {
									cashbackAmount: null,
									receivedAmount: null,
									PromotionRate: null,
									Promotion: null
								};
								if (res.data.data.formData?.Promotion === "1") {
									promoContent.cashbackAmount =
										res.data.data.formData?.PromotionAmount;
									promoContent.receivedAmount =
										Number(
											res.data.data.formData
												?.PromotionAmount
										) +
										Number(
											res.data.data.formData
												?.DepositAmount
										);
									promoContent.PromotionRate = `${Number(
										res.data.data.formData?.PromotionRate
									).toFixed(2)}%`;

									promoContent.Promotion =
										res.data.data.formData?.Promotion;
								}

								setPopBox({
									isOpen: true,
									title: t("lbl_DepositType4"),
									popBoxType: defPopBoxType.PaymentQR,
									depositAmount:
										res.data.data.formData?.DepositAmount,
									cashbackAmount: promoContent.cashbackAmount,
									receivedAmount: promoContent.receivedAmount,
									PromotionRate: promoContent.PromotionRate,
									promoContent: promoContent.Promotion,
									rate:
										parseFloat(
											res.data.data.formData?.Rate
										) ?? null,
									requestAmount:
										parseFloat(
											res.data.data.formData
												?.RequestAmount
										) ?? null,
									token:
										res.data.data.formData?.Token ?? null,
									amount: resultAmount,
									currencyId: userInfo.currencyId,
									imgUrl: res.data.data.url,
									thirdId: res.data.data.thirdId ?? null,
									depositType: defDepositType.cryptoPay,
									handlePopBox: () => {
										setPopBox(prevState => ({
											...prevState,
											isOpen: false
										}));
									}
								});
							} else {
								errorPopBox(
									res.data.message || "error",
									res.data.errorCode
								);
							}
						},
						() => {
							errorPopBox();
						}
					);
				} else {
					const baseUrl = `${config.openURL}/${userInfo.langId}/Cashier/DepositReqCryptoPay`;

					window.open(`${baseUrl}?${params}`);
				}
			}

			await getDepositInfoRecent();

			setLoading(false);

			if (!saveInfoChecked) {
				onReset();
			}
		}
	};

	const onInputboxKeyDown = event => {
		if (event.key === "Enter") {
			onSubmit();
		}
	};

	const onValidAmount = _amount => {
		const result = checkAmount({
			amount: _amount,
			minAmount: formInfo.minAmount,
			maxAmount: formInfo.maxAmount,
			_isConvert,
			t,
			digits: 0
		});

		if (result.status !== 0) {
			setFormInfo(prev => {
				return {
					...prev,
					checked: false,
					tip: result.msg
				};
			});
		} else {
			setFormInfo(prev => {
				return {
					...prev,
					checked: true,
					tip: ""
				};
			});
		}

		return result.status === 0;
	};

	const formatAmount = _val => {
		return number_format(_val, _isConvert, 0);
	};

	useDepositEffect({
		t,
		userInfo,
		formInfo,
		isMountedRef,
		depositOptions,
		depositInfoStorage,
		isInitDataDone,
		mobilePayGourpList,
		onlineBankGroupList,
		localBankGroupList,
		cryptoPayGroupList,
		setLoading,
		onValidAmount,
		setDepositType,
		setIsInitDataDone,
		setDepositOptions,
		setSaveInfoChecked,
		onChangeAmount,
		getMobilePayGroupList,
		getLocalBankGroupList,
		getOnlineBankGroupList,
		getCryptoPayGroupList
	});

	if (loading || !isInitDataDone) return null;

	return (
		<>
			<DepositInfoMoule
				t={t}
				langId={userInfo.langId}
				depositType={depositType}
				depositOptions={depositOptions}
				saveInfoChecked={saveInfoChecked}
				checked={!!formInfo.checked && localBankChecked}
				processingDescriptionActive={processingDescriptionActive}
				onReset={onReset}
				onSubmit={onSubmit}
				setDepositType={onChangeDepositType}
				setSaveInfoChecked={setSaveInfoChecked}
				userName={userInfo.userName}>
				{depositType === defDepositType.mobile && (
					<MobileForm
						t={t}
						userInfo={userInfo}
						_isConvert={_isConvert}
						formatAmount={formatAmount}
						depositType={depositType}
						mobilePayGourpList={mobilePayGourpList}
						mobilePayInfoList={mobilePayInfoList}
						formInfo={formInfo}
						depositPromoList={depositPromoList}
						isGroupListFetchDone={isGroupListFetchDone}
						setFormInfo={setFormInfo}
						onChangeAmount={onChangeAmount}
						onInputboxKeyDown={onInputboxKeyDown}
						getMobilePayInfoList={getMobilePayInfoList}
					/>
				)}

				{depositType === defDepositType.localBank && (
					<LocalBankForm
						t={t}
						userInfo={userInfo}
						setPopBox={setPopBox}
						depositType={depositType}
						defPopBoxType={defPopBoxType}
						_isConvert={_isConvert}
						formatAmount={formatAmount}
						localBankGroupList={localBankGroupList}
						isGroupListFetchDone={isGroupListFetchDone}
						formInfo={formInfo}
						depositPromoList={depositPromoList}
						localBankInfo={localBankInfo}
						custBankInfoList={custBankInfoList}
						localBankChannelError={localBankChannelError}
						localBankBankInfoErrpr={localBankBankInfoErrpr}
						setFormInfo={setFormInfo}
						getBankInfo={getBankInfo}
						setLocalBankChecked={setLocalBankChecked}
						onChangeAmount={onChangeAmount}
						getLocalBankInfo={getLocalBankInfo}
						onInputboxKeyDown={onInputboxKeyDown}
						asyncUploadBankPopBox={asyncUploadBankPopBox}
						depositInfoStorage={depositInfoStorage}
					/>
				)}

				{depositType === defDepositType.onlineBank && (
					<OnlineBankForm
						t={t}
						userInfo={userInfo}
						_isConvert={_isConvert}
						formatAmount={formatAmount}
						depositType={depositType}
						onlineBankGroupList={onlineBankGroupList}
						onlineBankInfoList={onlineBankInfoList}
						formInfo={formInfo}
						depositPromoList={depositPromoList}
						isGroupListFetchDone={isGroupListFetchDone}
						setFormInfo={setFormInfo}
						onChangeAmount={onChangeAmount}
						onInputboxKeyDown={onInputboxKeyDown}
						setOnlineBankInfoList={setOnlineBankInfoList}
						getOnlineBankInfoList={getOnlineBankInfoList}
					/>
				)}

				{depositType === defDepositType.cryptoPay && (
					<CryptoPayForm
						t={t}
						userInfo={userInfo}
						depositType={depositType}
						defPopBoxType={defPopBoxType}
						_isConvert={_isConvert}
						formatAmount={formatAmount}
						cryptoPayGroupList={cryptoPayGroupList}
						formInfo={formInfo}
						depositPromoList={depositPromoList}
						cryptoPayInfo={cryptoPayInfo}
						isGroupListFetchDone={isGroupListFetchDone}
						getCryptoPayInfo={getCryptoPayInfo}
						setFormInfo={setFormInfo}
						onChangeAmount={onChangeAmount}
						onValidAmount={onValidAmount}
						onInputboxKeyDown={onInputboxKeyDown}
					/>
				)}
			</DepositInfoMoule>

			<DepositRecentHistory
				asyncUploadBankPopBox={asyncUploadBankPopBox}
				getDepositInfoRecent={getDepositInfoRecent}
				depositInfoRecentDatas={depositInfoRecentDatas}
				setDepositInfoRecentDatas={setDepositInfoRecentDatas}
				uploadLocalBankReceipt={uploadLocalBankReceipt}
			/>
		</>
	);
};

export default Deposit;
