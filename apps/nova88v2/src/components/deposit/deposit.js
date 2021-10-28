import React, { useContext, useEffect, useRef, useState } from "react";
import { navigate, useLocation, Link } from "@reach/router";
import { useTranslation } from "react-i18next";
import {
	loadingContext,
	userInfoContext,
	popBoxContext
} from "../common/context";
import {
	defDepositType,
	defDepositOptions,
	defDepositChannelIdList
} from "./deposit.def";
import defPopBoxType from "../common/defPopBoxType";
import {
	checkAmount,
	isConvert,
	getUrlParameter,
	setLocalStorage,
	getLocalStorage,
	removeLocalStorage,
	readCookie,
	number_format
} from "../common/common";
import { api_site_GetSupportDomainList } from "../../service/api/site";
import usePopBox from "../hook/usePopBox";

import useDeposit from "./hook/useDeposit";
import useDepositMobilePay from "./hook/useDepositMobilePay";
import useDepositOnline from "./hook/useDepositOnline";
import useDepositLocalBank from "./hook/useDepositLocalBank";
import useDepositCryptoPay from "./hook/useDepositCryptoPay";

import { currencyCode } from "../../datas/countryCode";
import path from "../../router";
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
	const parameterType = getUrlParameter("type");
	const location = useLocation();
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
		setDepositType(type);

		setIsGroupListFetchDone(false);

		navigate(`/${userInfo.langId}/${path.deposit.root}?type=${type}`);

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

		if (saveInfoChecked) {
			setLocalStorage(
				`${userInfo.userName}-nova88depositquery`,
				localStoragePath
			);
		}
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
		const savedCheck = getLocalStorage(
			`${userInfo.userName}-nova88depositquerySavedChecked`
		);

		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

		const asyncModalPopBox = () =>
			new Promise(resolve =>
				setPopBox({
					isOpen: true,
					popBoxType: defPopBoxType.Modal,
					icon: "icon-bell",
					title: t("lbl_Information"),
					closePopBox: () => {
						closePopBox();
						resolve(false);
					},
					content: (
						<>
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

		const RefreshPage = async () => {
			await delay(1000);
			if (!savedCheck) {
				onReset();
			}
		};

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
					api_cashier_DepositReqMobilePay({
						langId: userInfo.langId,
						paramsUrl: params
					}).then(res => {
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
									RefreshPage();
								}
							});
						}
					});
				} else {
					const baseUrl = `${config.openURL}/${userInfo.langId}/Cashier/DepositReqMobilePay`;

					window.open(`${baseUrl}?${params}`);

					RefreshPage();
				}
			} else if (depositType === defDepositType.localBank) {
				if (loading || !localBankChecked) return;

				setLoading(true);

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

				setLoading(false);

				if (!savedCheck) {
					onReset();
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
					api_cashier_DepositReqOnlineBanking({
						langId: userInfo.langId,
						paramsUrl: params
					}).then(res => {
						const {
							data: {
								errorCode,
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
								accountNumber: accountName ?? null,
								accountName: accountName ?? null,
								thirdId,
								handlePopBox: () => {
									setPopBox(prevState => ({
										...prevState,
										isOpen: false
									}));
									RefreshPage();
								}
							});
						}
					});
				} else {
					const baseUrl = `${config.openURL}/${userInfo.langId}/Cashier/DepositReqOnlineBanking`;

					window.open(`${baseUrl}?${params}`);

					RefreshPage();
				}
			} else if (depositType === defDepositType.cryptoPay) {
				setLoading(true);

				const params = [
					`ChannelId=${channelId}`,
					`Amount=${resultAmount}`,
					depositPromo?.bonusCode &&
						`BonusCode=${depositPromo.bonusCode}`
				]
					.filter(Boolean)
					.join("&");

				if (formInfo.mode === 3) {
					api_cashier_DepositReqCryptoPay({
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
										res.data.data.formData?.PromotionAmount
									) +
									Number(
										res.data.data.formData?.DepositAmount
									);
								promoContent.PromotionRate = `${Number(
									res.data.data.formData?.PromotionRate
								).toFixed(2)}%`;

								promoContent.Promotion =
									res.data.data.formData?.Promotion;
							}
							setLoading(false);
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
									parseFloat(res.data.data.formData?.Rate) ??
									null,
								requestAmount:
									parseFloat(
										res.data.data.formData?.RequestAmount
									) ?? null,
								token: res.data.data.formData?.Token ?? null,
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
									RefreshPage();
								}
							});
						}
					});
				} else {
					const baseUrl = `${config.openURL}/${userInfo.langId}/Cashier/DepositReqCryptoPay`;

					window.open(`${baseUrl}?${params}`);

					RefreshPage();
				}
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

	useEffect(() => {
		const handleDepositType = () => {
			const isDepositTypeIncludes = type =>
				Object.values(defDepositType).includes(type);

			if (isDepositTypeIncludes(depositInfoStorage?.type))
				return depositInfoStorage?.type;

			if (isDepositTypeIncludes(parameterType)) return parameterType;

			return defDepositType.mobile;
		};

		if (userInfo.userName) {
			setDepositType(handleDepositType());
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userInfo.userName]);

	useEffect(() => {
		if (formInfo.amount !== null) {
			onValidAmount(formInfo.amount);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formInfo.amount, formInfo.minAmount, formInfo.maxAmount]);

	useEffect(() => {
		if (depositType === defDepositType.localBank) {
			const validate = datas => {
				const errors = {};

				if (
					userInfo.currencyId === currencyCode.TH &&
					!datas.imgFile?.type.includes("image")
				) {
					errors.imgFile = "error";
				}

				if (!datas.fromChannel) {
					errors.fromChannel = t("lbl_DepositChannelTip");
				}

				if (
					(datas?.fromChannel ===
						defDepositChannelIdList.OnlineBanking ||
						datas?.fromChannel === defDepositChannelIdList.ATM) &&
					!datas.fromAccountNum
				) {
					errors.fromAccountNum = t("lbl_LocalBankBankAccountTip");
				}
				return errors;
			};

			const errors = validate({
				imgFile: formInfo.imgFile,
				fromChannel: formInfo.fromChannel,
				fromAccountNum: formInfo.fromAccountNum
			});

			const isValid = Object.keys(errors).length === 0;

			setLocalBankChecked(isValid);

			// setLocalBankChannelError({
			// 	checked: !errors.fromChannel,
			// 	tip: errors.fromChannel
			// });

			// setLocalBankBankInfoErrpr({
			// 	checked: !errors.fromAccountNum,
			// 	tip: errors.fromAccountNum
			// });
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formInfo]);

	useEffect(() => {
		const checkRemoveStorage = () => {
			const savedCheck = getLocalStorage(
				`${userInfo.userName}-nova88depositquerySavedChecked`
			);

			if (!savedCheck) {
				removeLocalStorage(`${userInfo.userName}-nova88depositquery`);
				removeLocalStorage(
					`${userInfo.userName}-nova88depositquerySavedChecked`
				);
			}
		};

		const checkLocalStorageUpdateForm = () => {
			const savedCheck = getLocalStorage(
				`${userInfo.userName}-nova88depositquerySavedChecked`
			);
			if (depositInfoStorage?.amount) {
				onChangeAmount(depositInfoStorage.amount);
			}

			if (
				depositInfoStorage?.search &&
				depositInfoStorage.search !== location.search
			) {
				const { pathname } = location;

				navigate(`${pathname}${depositInfoStorage.search}`);
			}
			if (savedCheck) {
				setSaveInfoChecked(savedCheck);
			}
		};

		const getData = async () => {
			setLoading(true);
			try {
				await Promise.all([
					getMobilePayGroupList(),
					getLocalBankGroupList(),
					getOnlineBankGroupList(),
					getCryptoPayGroupList()
				]);
				setIsInitDataDone(true);
			} catch (e) {
				errorPopBox();
			}

			window.addEventListener("beforeunload", checkRemoveStorage);
			setLoading(false);
		};

		if (userInfo.isLogin) {
			getData();
			checkLocalStorageUpdateForm();
		}

		return () => {
			checkRemoveStorage();

			window.removeEventListener("beforeunload", checkRemoveStorage);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userInfo.currencyId, userInfo.isLogin]);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		let isMounted = true;

		const checkUserInfo = () => {
			const { isLogin, accountName, phoneNo, email } = userInfo;
			if (
				isLogin &&
				((!accountName && accountName !== undefined) ||
					(!phoneNo && phoneNo !== undefined) ||
					(!email && email !== undefined))
			) {
				setPopBox({
					isOpen: true,
					popBoxType: defPopBoxType.UpdateProfile,
					title: t("lbl_ImportantNote"),
					content: t("lbl_UpdatePersonalInfoDeposit"),
					btnBar: (
						<div className="btnGroup">
							<Link
								className="btn-check"
								to={`/${userInfo.langId}/${path.profile.root}?prevPage=${path.deposit.root}`}>
								{t("lbl_UpdatePersonalDetail")}
							</Link>
						</div>
					)
				});
			}
		};

		if (userInfo.isLogin && userInfo.userName) {
			const cookieBackupDomain = `backupDomain_${userInfo.userName}`;
			const isShowBackupDomain = readCookie(cookieBackupDomain) !== "1";
			const closeBackupThenCheckInfo = () => {
				setPopBox({ isOpen: false });
				checkUserInfo();
			};
			if (isShowBackupDomain) {
				api_site_GetSupportDomainList({ langId: userInfo.langId }).then(
					res => {
						if (
							res.data.errorCode === 0 &&
							isMounted &&
							res.data.data.length > 0
						) {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.BackupDomain,
								onClickClose: () => closeBackupThenCheckInfo(),
								linkList: res.data.data
							});
						}
					}
				);
			} else {
				checkUserInfo();
			}
		}

		return () => {
			isMounted = false;
		};
	}, [userInfo.isLogin, userInfo.userName, setPopBox]);

	if (loading || !isInitDataDone) return null;

	const depositOptions = defDepositOptions({
		mobilePayGourpList,
		onlineBankGroupList,
		localBankGroupList,
		cryptoPayGroupList
	});

	const filterDepositOptions = depositOptions.filter(item => !item.isHide);

	if (!filterDepositOptions.length) return null;

	const defaultDepositOption = depositOptions.find(
		option => option.type === parameterType
	);

	if (
		location.pathname === `/${userInfo.langId}/${path.deposit.root}` &&
		depositOptions?.length > 0 &&
		(defaultDepositOption?.isHide || !defaultDepositOption)
	) {
		onChangeDepositType(filterDepositOptions[0].type);
	}

	const formatAmount = _val => {
		return number_format(_val, _isConvert, 0);
	};

	return (
		<>
			<DepositInfoMoule
				t={t}
				langId={userInfo.langId}
				depositType={depositType}
				depositOptions={filterDepositOptions}
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
