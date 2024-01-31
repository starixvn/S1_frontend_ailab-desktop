import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "@reach/router";
import { useTranslation } from "react-i18next";
import {
	loadingContext,
	userInfoContext,
	popBoxContext
} from "../common/context";
import { defDepositType } from "./deposit.def";
import defPopBoxType from "../common/defPopBoxType";
import path from "../../router";

import {
	checkAmount,
	isConvert,
	setLocalStorage,
	getLocalStorage,
	removeLocalStorage,
	number_format,
	defCurrencyList
} from "../common/common";
import usePopBox from "../hook/usePopBox";

import {
	useDeposit,
	useDepositCryptoPay,
	useDepositLocalBank,
	useDepositMobilePay,
	useDepositOnline,
	useDepositEffect,
	useAutoDeposit,
	useDepositLinePay
} from "./hooks";

import config from "../../config";

import DepositInfoMoule from "./deposit.infoMoule";
import DepositRecentHistory from "./deposit.recentHistory";
import MobileForm from "./components/mobileForm";
import OnlineBankForm from "./components/onlineBankForm";
import LocalBankForm from "./components/localBankForm";
import CryptoPayForm from "./components/cryptoPayForm";
import AutoDepositForm from "./components/autoDepositForm";
import { DepositKyc } from "./deposit.kyc";

import {
	api_cashier_DepositReqMobilePay,
	api_cashier_DepositReqOnlineBanking,
	api_cashier_DepositReqCryptoPay,
	api_cashier_DepositReqCryptoLocalPay
} from "../../service/api/cashier";
import { api_payment_DepositReqLocalPay } from "../../service/api/payment";

const isOTPVerified = ({
	phoneVerified,
	accountName,
	birth_d,
	birth_m,
	birth_y
}) => Boolean(phoneVerified && accountName && birth_d && birth_m && birth_y);

const Deposit = () => {
	const { t } = useTranslation();
	const isMountedRef = useRef(null);
	const { loading, setLoading } = useContext(loadingContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox, closePopBox } = usePopBox();
	const _isConvert = isConvert(userInfo.currencyId);
	const depositInfoStorage = getLocalStorage(
		`${userInfo.userName}-ivorysportdepositquery`
	);

	const [processingDescriptionActive, setProcessingDescriptionActive] =
		useState(false);

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
			requiredAmount: null,
			specialCode: null
		}
	});

	const [isInitDataDone, setIsInitDataDone] = useState(false);

	const [saveInfoChecked, setSaveInfoChecked] = useState(false);

	const [localBankChecked, setLocalBankChecked] = useState(true);

	const [selectedBankId, setSelectedBankId] = useState(0);

	const localBankChannelError = {
		checked: null,
		tip: ""
	};
	const localBankBankInfoErrpr = {
		checked: null,
		tip: ""
	};

	const {
		kycStatus,
		asyncUploadBankPopBox,
		getDepositInfoRecent,
		depositInfoRecentDatas,
		setDepositInfoRecentDatas,
		depositPromoList,
		setDepositPromotionQueue,
		checkDepositSpecialCode,
		checkKyc
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

	const { getLinePayLink, linePayLink } = useDepositLinePay({
		isMountedRef,
		currencyId: userInfo.currencyId
	});

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

	const submitHandle = () => {
		setIsGroupListFetchDone(false);
	};

	useEffect(async () => {
		await getLocalBankGroupList();
		setIsGroupListFetchDone(true);
	}, [isGroupListFetchDone, formInfo]);

	const {
		getCryptoPayGroupList,
		getCryptoPayInfo,
		cryptoPayGroupList,
		cryptoPayInfo
	} = useDepositCryptoPay({ isMountedRef });

	const { autoDepositGroupList, getAutoDepositGroupList } = useAutoDeposit({
		isMountedRef
	});

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
		setFormInfo(prev => ({ ...prev, amount }));
	};

	const onReset = () => {
		setLocalBankChecked(true);

		setFormInfo(prev => ({
			...prev,
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
			},
			payAccount: { value: "", tip: "", checked: null }
		}));
	};

	const openVerificationPopBox = bonusCode =>
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.OTPHint,
			btnBar: (
				<div className="btnGroup">
					<button className="btn-cancel" onClick={closePopBox}>
						{t("lbl_Later")}
					</button>

					<Link
						className="btn-check"
						to={`/${userInfo.langId}/${path.profile.root}?prevPage=${path.deposit.root}&BonusCode=${bonusCode}`}>
						{t("lbl_UpdatePersonalDetail")}
					</Link>
				</div>
			)
		});

	const onChangePromotion = (idx, data) => {
		const isSelectType = Boolean(data.bonusCode);

		if (isSelectType && !isOTPVerified(userInfo)) {
			openVerificationPopBox(data.bonusCode);

			return;
		}

		setFormInfo(prev => ({
			...prev,
			depositPromo: {
				idx,
				bonusCode: data.bonusCode,
				requiredAmount: data.requiredAmount,
				specialCode: data.specialCode
			}
		}));
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
				`${userInfo.userName}-ivorysportdepositquery`,
				localStoragePath
			);
		};

		const asyncModalPopBox = () =>
			new Promise(resolve =>
				setPopBox({
					isOpen: true,
					closePopBox: () => {
						closePopBox();
						resolve(false);
					},
					content: (
						<div className="Success active">
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
						</div>
					)
				})
			);

		const checkPayAccount = () => {
			if (
				userInfo.currencyId === defCurrencyList.INR &&
				formInfo?.groupName === "UPI" &&
				formInfo?.payName === "TenPay" &&
				!formInfo?.payAccount?.value
			) {
				setFormInfo(prev => ({
					...prev,
					payAccount: {
						value: "",
						tip: t("lbl_PleaseEnterUPI"),
						checked: false
					}
				}));

				return false;
			}

			return true;
		};

		if (
			formInfo.checked &&
			typeof window !== "undefined" &&
			checkPayAccount()
		) {
			const { sysId, payId, channelId, amount, depositPromo, groupId } =
				formInfo;
			let { bonusCode } = formInfo?.depositPromo;
			const resultAmount = _isConvert
				? Math.floor(amount * 1000)
				: Number(amount);

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
					`${userInfo.userName}-ivorysportdepositquerySavedChecked`
				);
				removeLocalStorage(
					`${userInfo.userName}-ivorysportdepositquery`
				);
			}

			if (depositPromo.specialCode) {
				bonusCode = await checkDepositSpecialCode(
					depositPromo.specialCode
				);

				if (!bonusCode) return;
			}
			if (depositType === defDepositType.autoDeposit) {
				const params = [
					`sysId=${sysId || 0}`,
					`Amount=${resultAmount}`,
					bonusCode ? `BonusCode=${bonusCode}` : ""
				]
					.filter(Boolean)
					.join("&");

				const baseUrl = `${config.openURL}/${userInfo.langId}/Cashier/DepositReqBankAutoChannel`;

				window.open(`${baseUrl}?${params}`);
			} else if (depositType === defDepositType.mobile) {
				setLoading(true);

				const params = [
					`ChannelId=${channelId}`,
					`Amount=${resultAmount}`,
					bonusCode && `BonusCode=${bonusCode}`,
					formInfo?.payAccount?.value &&
						`PayAccount=${formInfo?.payAccount?.value}`
				]
					.filter(Boolean)
					.join("&");

				if (formInfo.channelId === -1) {
					try {
						const res = await api_payment_DepositReqLocalPay({
							groupId: formInfo.groupId,
							amount: resultAmount,
							bonusCode: formInfo.depositPromo.bonusCode
						});

						const { data, errorCode } = res.data;
						if (errorCode === 0) {
							setPopBox({
								channelName: formInfo.channelName,
								isOpen: true,
								popBoxType: defPopBoxType.BankQR,
								onClickClose: () => {
									setPopBox({ isOpen: false });
									window.location.reload();
								},
								qrUrl: data.returnUrl,
								amount: formatAmount(resultAmount)
							});
						} else {
							errorPopBox(
								res.data.message || "error",
								res.data.errorCode
							);
						}
					} catch (err) {
						errorPopBox();
					}
				} else if (formInfo.mode === 3) {
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

				setLoading(true);

				const transId = await postLocalBankReqWireTransfer({
					amount: resultAmount,
					sysId: formInfo.sysId,
					fromChannel: formInfo.fromChannel,
					fromSysId: formInfo.fromSysId,
					fromAccountNum: formInfo.fromAccountNum,
					hasPromotion: Boolean(bonusCode),
					bankId: selectedBankId
				});

				if (transId) {
					try {
						const result = await Promise.all([
							!formInfo.imgFile ||
								uploadLocalBankReceipt({
									transId,
									imgFile: formInfo.imgFile
								}),

							!bonusCode ||
								setDepositPromotionQueue({
									transId,
									bonusCode
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
				setLoading(true);

				const params = [
					`sysId=${sysId || 0}`,
					`payId=${payId}`,
					`ChannelId=${channelId}`,
					`Amount=${resultAmount}`,
					bonusCode ? `BonusCode=${bonusCode}` : ""
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
				setLoading(true);
				const params = [
					`ChannelId=${channelId}`,
					`Amount=${resultAmount}`,
					bonusCode && `BonusCode=${bonusCode}`
				]
					.filter(Boolean)
					.join("&");
				if (formInfo.mode === 3) {
					// groupId===-1表示是自營的crypto wallet
					if (groupId === -1) {
						const paramsUrl = [
							`ChannelId=${channelId}`,
							`Amount=${amount}`,
							bonusCode && `BonusCode=${bonusCode}`
						]
							.filter(Boolean)
							.join("&");
						await api_cashier_DepositReqCryptoLocalPay({
							langId: userInfo.langId,
							paramsUrl
						}).then(
							res => {
								if (res.data.errorCode === 0) {
									setPopBox({
										isOpen: true,
										title: t("lbl_DepositType8"),
										popBoxType: defPopBoxType.PaymentQR,
										depositAmount:
											res.data.data.formData
												?.DepositAmount,
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
											res.data.data.formData?.Token ??
											null,
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
										},
										currencyName: formInfo?.currencyName
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
									if (
										res.data.data.formData?.Promotion ===
										"1"
									) {
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
											res.data.data.formData
												?.PromotionRate
										).toFixed(2)}%`;

										promoContent.Promotion =
											res.data.data.formData?.Promotion;
									}

									setPopBox({
										isOpen: true,
										title: t("lbl_DepositType4"),
										popBoxType: defPopBoxType.PaymentQR,
										depositAmount:
											res.data.data.formData
												?.DepositAmount,
										cashbackAmount:
											promoContent.cashbackAmount,
										receivedAmount:
											promoContent.receivedAmount,
										PromotionRate:
											promoContent.PromotionRate,
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
											res.data.data.formData?.Token ??
											null,
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
										},
										currencyName: formInfo?.currencyName
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
					}
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
			setFormInfo(prev => ({
				...prev,
				checked: false,
				tip: result.msg
			}));
		} else {
			setFormInfo(prev => ({
				...prev,
				checked: true,
				tip: ""
			}));
		}

		return result.status === 0;
	};

	const formatAmount = _val => number_format(_val, _isConvert, 0);

	useDepositEffect({
		t,
		userInfo,
		formInfo,
		isMountedRef,
		depositOptions,
		depositInfoStorage,
		isInitDataDone,
		autoDepositGroupList,
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
		getCryptoPayGroupList,
		getAutoDepositGroupList,
		getLinePayLink,
		linePayLink,
		checkKyc
	});

	if (loading || !isInitDataDone) return null;

	const isPending = depositInfoRecentDatas.some(item => item.status === 1);

	return (
		<>
			{/* 上傳後直接跳過，所以只判斷需要上傳的狀態 */}
			{kycStatus === "kycUpload" ? (
				<DepositKyc kycStatus={kycStatus} checkKyc={checkKyc} />
			) : (
				<DepositInfoMoule
					t={t}
					langId={userInfo.langId}
					currencyId={userInfo.currencyId}
					depositType={depositType}
					depositOptions={depositOptions}
					saveInfoChecked={saveInfoChecked}
					checked={!!formInfo.checked && localBankChecked}
					processingDescriptionActive={processingDescriptionActive}
					onReset={onReset}
					onSubmit={onSubmit}
					setDepositType={onChangeDepositType}
					setSaveInfoChecked={setSaveInfoChecked}
					setPopBox={setPopBox}
					userName={userInfo.userName}
					canSubmit={formInfo.canSubmit}
					submitHandle={submitHandle}>
					{depositType === defDepositType.autoDeposit && (
						<AutoDepositForm
							t={t}
							userInfo={userInfo}
							_isConvert={_isConvert}
							formatAmount={formatAmount}
							depositType={depositType}
							autoDepositGroupList={autoDepositGroupList}
							formInfo={formInfo}
							depositPromoList={depositPromoList}
							onChangePromotion={onChangePromotion}
							setFormInfo={setFormInfo}
							onChangeAmount={onChangeAmount}
							onInputboxKeyDown={onInputboxKeyDown}
						/>
					)}

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
							onChangePromotion={onChangePromotion}
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
							onChangePromotion={onChangePromotion}
							setFormInfo={setFormInfo}
							getBankInfo={getBankInfo}
							setLocalBankChecked={setLocalBankChecked}
							getLocalBankInfo={getLocalBankInfo}
							onInputboxKeyDown={onInputboxKeyDown}
							asyncUploadBankPopBox={asyncUploadBankPopBox}
							depositInfoStorage={depositInfoStorage}
							setSelectedBankId={setSelectedBankId}
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
							onChangePromotion={onChangePromotion}
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
							isPending={isPending}
							defPopBoxType={defPopBoxType}
							_isConvert={_isConvert}
							formatAmount={formatAmount}
							cryptoPayGroupList={cryptoPayGroupList}
							formInfo={formInfo}
							depositPromoList={depositPromoList}
							cryptoPayInfo={cryptoPayInfo}
							isGroupListFetchDone={isGroupListFetchDone}
							getCryptoPayInfo={getCryptoPayInfo}
							onChangePromotion={onChangePromotion}
							setFormInfo={setFormInfo}
							onChangeAmount={onChangeAmount}
							onValidAmount={onValidAmount}
							onInputboxKeyDown={onInputboxKeyDown}
							onSubmit={onSubmit}
						/>
					)}
				</DepositInfoMoule>
			)}

			<DepositRecentHistory
				asyncUploadBankPopBox={asyncUploadBankPopBox}
				getDepositInfoRecent={getDepositInfoRecent}
				depositInfoRecentDatas={depositInfoRecentDatas}
				setDepositInfoRecentDatas={setDepositInfoRecentDatas}
				uploadLocalBankReceipt={uploadLocalBankReceipt}
				submitHandle={submitHandle}
			/>
		</>
	);
};

export default Deposit;
