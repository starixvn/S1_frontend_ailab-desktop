import React, { useContext, useEffect, useRef, useState } from "react";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import { useLazyGetDepositQuickTransferQuery } from "@ailab-desktop/service";
import {
	loadingContext,
	userInfoContext,
	popBoxContext
} from "../common/context";
import { defDepositType, defDepositOptions } from "./deposit.def";
import { defPopBoxType } from "../common/popBox";
import { checkAmount, isConvert, getUrlParameter } from "../common/common";
import useDeposit from "./hook/useDeposit";
import useDepositOnline from "./hook/useDepositOnline";
import useDepositMobilePay from "./hook/useDepositMobilePay";
import useDepositLocalBank from "./hook/useDepositLocalBank";
import useDepositLoadCard from "./hook/useDepositLoadCard";
import useDepositCryptoPay from "./hook/useDepositCryptoPay";
import useDepositQRPay from "./hook/useDepositQRPay";
import path from "../../router";
import config from "../../config";
import MobileForm from "./components/mobileForm";
import OnlineBankForm from "./components/onlineBankForm";
import LocalBankForm from "./components/localBankForm";
import CryptoPayForm from "./components/cryptoPayForm";
import LoadCardForm from "./components/loadCardForm";
import QRPayForm from "./components/qrPayForm";
import QuickTransferForm from "./components/quickTransferForm";
import DepositInfoMoule from "./deposit.infoMoule";
import DepositRecentHistory from "./deposit.recentHistory";
import {
	api_cashier_DepositReqCryptoPay,
	api_cashier_DepositReqCryptoLocalPay
} from "../../service/api/cashier";
import usePopBox from "../hook/usePopBox";
import { api_payment_DepositReqLocalPay } from "../../service/api/payment";

const isOTPVerified = ({
	phoneVerified,
	accountName,
	birth_d,
	birth_m,
	birth_y
}) => Boolean(phoneVerified && accountName && birth_d && birth_m && birth_y);

const Deposit = () => {
	const parameterDefaultType = getUrlParameter("type");
	const isDepositTypeIncludes =
		Object.values(defDepositType).includes(parameterDefaultType);

	const { t } = useTranslation();

	const isMountedRef = useRef(null);

	const { loading, setLoading } = useContext(loadingContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	const [depositType, setDepositType] = useState(
		isDepositTypeIncludes ? parameterDefaultType : defDepositType.mobile
	);

	const [isGroupListFetchDone, setIsGroupListFetchDone] = useState(true);

	const [formInfo, setFormInfo] = useState({
		imgFile: null,
		amount: {
			val: "",
			checked: null,
			tip: ""
		},
		cardCode: {
			val: "",
			checked: null,
			tip: ""
		},
		cardSerial: {
			val: "",
			checked: null,
			tip: ""
		},
		depositPromo: {
			idx: 0,
			bonusCode: null,
			requiredAmount: null,
			specialCode: null
		}
	});

	const [cardCodeInfoIconActive, setCardCodeInfoIconActive] = useState(false);

	const [isInitDataDone, setIsInitDataDone] = useState(false);

	const [selectedBankId, setSelectedBankId] = useState(0);

	const _isConvert = isConvert(userInfo.currencyId);

	const { errorPopBox, closePopBox } = usePopBox();

	const [getDepositQuickTransfer, { data: depositQuickTransferResponse }] =
		useLazyGetDepositQuickTransferQuery();
	const quickTransferGroupList =
		depositQuickTransferResponse?.data?.QuickTransfer?.data || [];

	const {
		asyncUploadBankPopBox,
		getDepositInfoRecent,
		depositInfoRecentDatas,
		setDepositInfoRecentDatas,
		depositPromoList,
		setDepositPromotionQueue,
		checkDepositSpecialCode
	} = useDeposit({
		isMountedRef,
		userInfo
	});

	const {
		getMobilePayGroupList,
		getMobilePayInfoList,
		mobilePayGourpList,
		mobilePayInfoList
	} = useDepositMobilePay({ isMountedRef });

	const {
		getLocalBankGroupList,
		getLocalBankInfo,
		localBankGroupList,
		localBankInfo,
		postLocalBankReqWireTransfer,
		uploadLocalBankReceipt,
		setAccountName
	} = useDepositLocalBank({ isMountedRef });

	const submitHandle = () => {
		setIsGroupListFetchDone(false);
	};

	useEffect(async () => {
		await getLocalBankGroupList();
		setIsGroupListFetchDone(true);
	}, [isGroupListFetchDone, depositType]);

	const {
		getCryptoPayGroupList,
		getCryptoPayInfo,
		cryptoPayGroupList,
		cryptoPayInfo
	} = useDepositCryptoPay({ isMountedRef });

	const { autoChannelBankGroupList, getAutoChannelBankGroupList } =
		useDepositOnline({ isMountedRef });

	const {
		loadCardPayGroupList,

		getLoadCardPayGroupList,
		getLoadCardPayInfoList,
		getReqLoadCardPay
	} = useDepositLoadCard({
		isMountedRef
	});

	const {
		getQRPayGroupList,
		getQRPayInfoList,
		QRPayGroupList,
		QRPayInfoList
	} = useDepositQRPay({ isMountedRef });

	const onChangeDepositType = async type => {
		setDepositType(type);

		setIsGroupListFetchDone(false);

		navigate(`/${userInfo.langId}/${path.deposit.root}?type=${type}`);

		if (type === defDepositType.mobile) {
			await getMobilePayGroupList();
		} else if (type === defDepositType.localBank) {
			await getLocalBankGroupList();
		} else if (type === defDepositType.onlineBank) {
			await getAutoChannelBankGroupList();
		}

		setIsGroupListFetchDone(true);
	};

	const onChangeForm = (val, col) => {
		let checked = true;
		let tip = "";
		let _val = val;

		if (col === "amount") {
			_val = String(_val).replace(/^(0+)|[^\d]+/g, "");

			const amountResult = onValidAmount(_val);

			checked = amountResult.checked;
			tip = amountResult.tip;
		}

		if (col === "cardCode") {
			if (_val === "") {
				checked = false;
				tip = t("msg_PleaseEnterCardCode");
			}
		}

		if (col === "cardSerial") {
			if (_val === "") {
				checked = false;
				tip = t("msg_PleaseEnterCardSerial");
			}
		}

		setFormInfo(prev => ({
			...prev,
			[col]: { val: _val, checked, tip }
		}));
	};

	const onValidAmount = _val => {
		const result = checkAmount({
			amount: _val,
			minAmount: formInfo.minAmount,
			maxAmount: formInfo.maxAmount,
			formatRequired: false,
			t,
			digits: 0
		});

		return {
			checked: result.status === 0,
			tip: result.msg
		};
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

					<button
						className="btn-check"
						onClick={() =>
							navigate(
								`/${userInfo.langId}/${path.profile.root}?prevPage=${path.deposit.root}&BonusCode=${bonusCode}`
							)
						}>
						{t("lbl_UpdatePersonalDetail")}
					</button>
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
		const resetForm = () => {
			setFormInfo(prev => ({
				...prev,
				imgFile: null,
				amount: { val: "", checked: null, tip: "" },
				cardCode: {
					val: "",
					checked: null,
					tip: ""
				},
				cardSerial: {
					val: "",
					checked: null,
					tip: ""
				}
			}));
		};

		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

		if (typeof window !== "undefined") {
			const {
				sysId,
				payId,
				channelId,
				amount,
				mode,
				cardCode,
				cardSerial,
				depositPromo,
				groupId,
				groupName
			} = formInfo;

			let { bonusCode } = formInfo?.depositPromo;

			const resultAmount = _isConvert ? amount.val * 1000 : amount.val;

			if (depositPromo.specialCode) {
				bonusCode = await checkDepositSpecialCode(
					depositPromo.specialCode
				);

				if (!bonusCode) return;
			}

			setLoading(true);

			if (depositType === defDepositType.localBank) {
				if (loading || (!userInfo.accountName && !formInfo.accountName))
					return;

				const asyncAccountNameConfirm = () =>
					new Promise(resolve => {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ProfileConfirmCheck,
							accountName: formInfo.accountName,
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-cancel"
										onClick={() => resolve(false)}>
										{t("lbl_ReModify")}
									</button>
									<button
										className="btn-check"
										onClick={() => resolve(true)}>
										{t("lbl_Confirm")}
									</button>
								</div>
							)
						});
					});

				if (formInfo.accountName) {
					const success = await asyncAccountNameConfirm();

					closePopBox();

					if (!success) return;

					await setAccountName(formInfo.accountName);
				}

				const transId = await postLocalBankReqWireTransfer({
					amount: resultAmount,
					sysId,
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
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.Success,
								icon: "icon icon-library",
								description: (
									<>
										<div>{t("lbl_UpdateSuccessful")}</div>
										<div>
											{t("lbl_UpdateSuccessWillProcess")}
										</div>
									</>
								),
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
						}
					} catch (e) {
						errorPopBox();
					}
				}
			} else if (depositType === defDepositType.mobile) {
				if (channelId === -1) {
					// channelId === -1 代表是自建的假渠道，使用彈窗顯示 qrCode
					try {
						const res = await api_payment_DepositReqLocalPay({
							groupId,
							amount: resultAmount,
							bonusCode: bonusCode ?? ""
						});
						const { data, errorCode } = res.data;
						const {
							amount: popBoxAmount,
							code,
							returnUrl,
							transId
						} = data;
						if (errorCode === 0) {
							setPopBox({
								title: t("lbl_MobileDeposit"),
								isOpen: true,
								popBoxType: defPopBoxType.BankQR,
								onClose: () => {
									setPopBox({ isOpen: false });
									window.location.reload();
								},
								qrCodeUrl: returnUrl,
								amount: popBoxAmount,
								bankLogo: `${groupName?.toLowerCase()}.png`,
								code,
								transId
							});
						}
					} catch (e) {
						errorPopBox();
					}
				} else {
					const baseUrl = `${config.openURL}/${userInfo.langId}/Cashier/DepositReqMobilePay`;

					const params = [
						`ChannelId=${channelId}`,
						`Amount=${resultAmount}`,
						bonusCode ? `BonusCode=${bonusCode}` : ""
					]
						.filter(Boolean)
						.join("&");

					window.open(`${baseUrl}?${params}`);

					await delay(1000);
				}
			} else if (depositType === defDepositType.onlineBank) {
				const baseUrl = `${config.openURL}/${userInfo.langId}/Cashier/DepositReqBankAutoChannel`;

				const params = [
					`sysId=${sysId || 0}`,

					`Amount=${resultAmount}`,
					bonusCode ? `BonusCode=${bonusCode}` : ""
				]
					.filter(Boolean)
					.join("&");

				window.open(`${baseUrl}?${params}`);

				await delay(1000);
			} else if (depositType === defDepositType.loadCard) {
				if (mode === 3) {
					getReqLoadCardPay({
						langId: userInfo.langId,
						channelId,
						cardCode: cardCode.val,
						cardSerial: cardSerial.val,
						amount: resultAmount,
						bonusCode
					});
				} else {
					const baseUrl = `${config.openURL}/${userInfo.langId}/Cashier/DepositReqLoadCardPay`;

					const params = [
						`ChannelId=${channelId}`,
						`Code=${cardCode.val}`,
						`Serial=${cardSerial.val}`,
						`Amount=${resultAmount}`,
						bonusCode ? `BonusCode=${bonusCode}` : ""
					]
						.filter(Boolean)
						.join("&");

					window.open(`${baseUrl}?${params}`);
					await delay(1000);
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
					// groupId===-1表示是自營的crypto wallet
					if (groupId === -1) {
						const paramsUrl = [
							`ChannelId=${channelId}`,
							`Amount=${resultAmount}`,
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
						}).then(res => {
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
									},
									currencyName: formInfo.currencyName
								});
							}
						});
					}
				} else {
					const baseUrl = `${config.openURL}/${userInfo.langId}/Cashier/DepositReqCryptoPay`;

					window.open(`${baseUrl}?${params}`);
				}
			} else if (depositType === defDepositType.QRPay) {
				if (channelId === -1) {
					// channelId === -1 代表是自建的假渠道，使用彈窗顯示 qrCode
					try {
						const res = await api_payment_DepositReqLocalPay({
							groupId,
							amount: resultAmount,
							bonusCode: bonusCode ?? ""
						});
						const { data, errorCode } = res.data;
						const {
							amount: popBoxAmount,
							bankLogo,
							code,
							returnUrl,
							transId,
							generateQr
						} = data;
						if (errorCode === 0) {
							setPopBox({
								title: t("lbl_DepositType6"),
								isOpen: true,
								popBoxType: defPopBoxType.BankQR,
								onClose: () => {
									setPopBox({ isOpen: false });
									window.location.reload();
								},
								qrCodeUrl: returnUrl,
								amount: popBoxAmount,
								bankLogo,
								code,
								transId,
								generateQr
							});
						}
					} catch (e) {
						errorPopBox();
					}
				} else {
					const baseUrl = `${config.openURL}/${userInfo.langId}/Cashier/DepositReqQRPay`;

					const params = [
						`ChannelId=${channelId}`,
						`Amount=${resultAmount}`,
						bonusCode ? `BonusCode=${bonusCode}` : ""
					]
						.filter(Boolean)
						.join("&");

					window.open(`${baseUrl}?${params}`);
				}
				await delay(1000);
			} else if (depositType === defDepositType.quickTransfer) {
				const params = [
					`sysId=${sysId || 0}`,
					`payId=${payId}`,
					`ChannelId=${channelId}`,
					`Amount=${resultAmount}`,
					bonusCode ? `BonusCode=${bonusCode}` : ""
				]
					.filter(Boolean)
					.join("&");

				const baseUrl = `${config.openURL}/${userInfo.langId}/Cashier/DepositReq`;
				window.open(`${baseUrl}?${params}`);

				await delay(1000);
			}

			setLoading(false);
			resetForm();
		}
	};

	const onInputboxKeyDown = event => {
		if (event.key === "Enter") {
			onSubmit();
		}
	};

	useEffect(() => {
		const getData = async () => {
			setLoading(true);
			try {
				await Promise.all([
					getMobilePayGroupList(),
					getLocalBankGroupList(),
					getAutoChannelBankGroupList(),
					getLoadCardPayGroupList(),
					getCryptoPayGroupList(),
					getQRPayGroupList(),
					getDepositQuickTransfer()
				]);

				setIsInitDataDone(true);
			} catch (e) {
				errorPopBox();
			}

			setLoading(false);
		};

		getData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	if (loading || !isInitDataDone) return null;

	const depositOptions = defDepositOptions({
		mobilePayGourpList,
		autoChannelBankGroupList,
		localBankGroupList,
		loadCardPayGroupList,
		cryptoPayGroupList,
		QRPayGroupList,
		quickTransferGroupList
	});

	const filterDepositOptions = depositOptions.filter(item => !item.isHide);

	if (!filterDepositOptions.length) return null;

	// const defaultDepositOption = depositOptions.find(
	// 	option => option.type === parameterDefaultType
	// );

	// if (!isDepositTypeIncludes || defaultDepositOption.isHide) {
	// 	onChangeDepositType(filterDepositOptions[0].type);
	// }

	let checked = formInfo?.amount?.checked;

	if (depositType === defDepositType.loadCard) {
		checked =
			checked &&
			formInfo?.cardCode?.checked &&
			formInfo?.cardSerial?.checked;
	} else if (depositType === defDepositType.localBank) {
		checked = checked && (userInfo.accountName || formInfo.accountName);
	}

	return (
		<>
			<DepositInfoMoule
				t={t}
				langId={userInfo.langId}
				depositOptions={filterDepositOptions}
				depositType={depositType}
				checked={!!checked}
				onSubmit={onSubmit}
				setDepositType={onChangeDepositType}
				canSubmit={formInfo.canSubmit}
				submitHandle={submitHandle}>
				{depositType === defDepositType.quickTransfer && (
					<QuickTransferForm
						quickTransferGroupList={quickTransferGroupList}
						depositType={depositType}
						_isConvert={_isConvert}
						formInfo={formInfo}
						depositPromoList={depositPromoList}
						isGroupListFetchDone={isGroupListFetchDone}
						onChangeForm={onChangeForm}
						onChangePromotion={onChangePromotion}
						setFormInfo={setFormInfo}
						onInputboxKeyDown={onInputboxKeyDown}
					/>
				)}
				{depositType === defDepositType.mobile && (
					<MobileForm
						t={t}
						depositType={depositType}
						_isConvert={_isConvert}
						mobilePayGourpList={mobilePayGourpList}
						getMobilePayInfoList={getMobilePayInfoList}
						mobilePayInfoList={mobilePayInfoList}
						formInfo={formInfo}
						depositPromoList={depositPromoList}
						isGroupListFetchDone={isGroupListFetchDone}
						setFormInfo={setFormInfo}
						onChangeForm={onChangeForm}
						onChangePromotion={onChangePromotion}
						onInputboxKeyDown={onInputboxKeyDown}
					/>
				)}

				{depositType === defDepositType.localBank && (
					<LocalBankForm
						t={t}
						userInfo={userInfo}
						depositType={depositType}
						_isConvert={_isConvert}
						localBankGroupList={localBankGroupList}
						formInfo={formInfo}
						setFormInfo={setFormInfo}
						onChangePromotion={onChangePromotion}
						onInputboxKeyDown={onInputboxKeyDown}
						getLocalBankInfo={getLocalBankInfo}
						localBankInfo={localBankInfo}
						asyncUploadBankPopBox={asyncUploadBankPopBox}
						depositPromoList={depositPromoList}
						isGroupListFetchDone={isGroupListFetchDone}
						setSelectedBankId={setSelectedBankId}
					/>
				)}

				{depositType === defDepositType.onlineBank && (
					<OnlineBankForm
						t={t}
						depositType={depositType}
						_isConvert={_isConvert}
						autoChannelBankGroupList={autoChannelBankGroupList}
						formInfo={formInfo}
						depositPromoList={depositPromoList}
						isGroupListFetchDone={isGroupListFetchDone}
						onChangeForm={onChangeForm}
						onChangePromotion={onChangePromotion}
						setFormInfo={setFormInfo}
						onInputboxKeyDown={onInputboxKeyDown}
					/>
				)}

				{depositType === defDepositType.loadCard && (
					<LoadCardForm
						t={t}
						formInfo={formInfo}
						_isConvert={_isConvert}
						depositType={depositType}
						cardCodeInfoIconActive={cardCodeInfoIconActive}
						setFormInfo={setFormInfo}
						loadCardPayGroupList={loadCardPayGroupList}
						depositPromoList={depositPromoList}
						isGroupListFetchDone={isGroupListFetchDone}
						onChangeForm={onChangeForm}
						onChangePromotion={onChangePromotion}
						getLoadCardPayInfoList={getLoadCardPayInfoList}
						setCardCodeInfoIconActive={setCardCodeInfoIconActive}
					/>
				)}

				{depositType === defDepositType.cryptoPay && (
					<CryptoPayForm
						t={t}
						userInfo={userInfo}
						depositType={depositType}
						defPopBoxType={defPopBoxType}
						_isConvert={_isConvert}
						cryptoPayGroupList={cryptoPayGroupList}
						formInfo={formInfo}
						depositPromoList={depositPromoList}
						cryptoPayInfo={cryptoPayInfo}
						isGroupListFetchDone={isGroupListFetchDone}
						getCryptoPayInfo={getCryptoPayInfo}
						setFormInfo={setFormInfo}
						onChangeForm={onChangeForm}
						onInputboxKeyDown={onInputboxKeyDown}
						onChangePromotion={onChangePromotion}
					/>
				)}

				{depositType === defDepositType.QRPay && (
					<QRPayForm
						t={t}
						depositType={depositType}
						_isConvert={_isConvert}
						QRPayGroupList={QRPayGroupList}
						getQRPayInfoList={getQRPayInfoList}
						QRPayInfoList={QRPayInfoList}
						formInfo={formInfo}
						depositPromoList={depositPromoList}
						isGroupListFetchDone={isGroupListFetchDone}
						setFormInfo={setFormInfo}
						onChangeForm={onChangeForm}
						onChangePromotion={onChangePromotion}
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
				submitHandle={submitHandle}
			/>
		</>
	);
};

export default Deposit;
