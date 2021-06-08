import React, { useContext, useEffect, useRef, useState } from "react";
import { navigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import {
	loadingContext,
	userInfoContext,
	popBoxContext
} from "../common/context";
import { api_site_GetSupportDomainList } from "../../service/api/site";
import { defDepositType, defDepositOptions } from "./depositnew.def";
import { defPopBoxType } from "../common/popBox";
import {
	checkAmount,
	isConvert,
	getUrlParameter,
	readCookie
} from "../common/common";

import useDeposit from "./hook/useDeposit";
import useDepositOnline from "./hook/useDepositOnline";
import useDepositMobilePay from "./hook/useDepositMobilePay";
import useDepositLocalBank from "./hook/useDepositLocalBank";
import useDepositLoadCard from "./hook/useDepositLoadCard";

import path from "../../router";
import config from "../../config";

import MobileForm from "./components/mobileForm";
import OnlineBankForm from "./components/onlineBankForm";
import LocalBankForm from "./components/localBankForm";
import LoadCardForm from "./components/loadCardForm";
import DepositnewInfoMoule from "./depositnew.infoMoule";
import DepositnewRecentHistory from "./depositnew.recentHistory";

import usePopBox from "../hook/usePopBox";

const Depositnew = () => {
	const parameterDefaultType = getUrlParameter("type");
	const isDepositTypeIncludes = Object.values(defDepositType).includes(
		parameterDefaultType
	);

	const { t } = useTranslation();

	const isMountedRef = useRef(null);

	const { loading, setLoading } = useContext(loadingContext);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	const [depositType, setDepositType] = useState(
		isDepositTypeIncludes ? parameterDefaultType : defDepositType.mobile
	);
	const [formInfo, setFormInfo] = useState({
		imgFile: null,
		amount: null,
		checked: null,
		tip: ""
	});

	const [isInitDataDone, setIsInitDataDone] = useState(false);

	const _isConvert = isConvert(userInfo.currencyId);

	const { errorPopBox } = usePopBox();
	const closePopBox = () => {
		setPopBox({ isOpen: false });
	};
	const {
		asyncUploadBankPopBox,
		getDepositInfoRecent,
		depositInfoRecentDatas,
		setDepositInfoRecentDatas
	} = useDeposit({
		isMountedRef
	});

	const {
		getMobilePayGroupList,
		getMobilePayInfoList,
		setMobilePayInfoList,
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

	const {
		getOnlineBankGroupList,
		getOnlineBankInfoList,
		setOnlineBankInfoList,
		onlineBankGroupList,
		onlineBankInfoList
	} = useDepositOnline({ isMountedRef });

	const {
		loadCardPayGroupList,
		getLoadCardPayGroupList,
		getLoadCardPayInfoList
	} = useDepositLoadCard({
		isMountedRef
	});

	const onChangeDepositType = async type => {
		setDepositType(type);
		navigate(`/${userInfo.langId}/${path.deposit.root}?type=${type}`);

		if (type === defDepositType.mobile) {
			await getMobilePayGroupList();
		} else if (type === defDepositType.localBank) {
			await getLocalBankGroupList();
		} else if (type === defDepositType.onlineBank) {
			await getOnlineBankGroupList();
		}

		resetDepositForm();
	};

	const onChangeAmount = _amount => {
		const amount = String(_amount).replace(/^(0+)|[^\d]+/g, "");

		onValidAmount(amount);
		setFormInfo(prev => {
			return { ...prev, amount };
		});
	};

	const onValidAmount = _amount => {
		const result = checkAmount({
			amount: _amount,
			minAmount: formInfo.minAmount,
			maxAmount: formInfo.maxAmount,
			formatRequired: false,
			t,
			digits: 0
		});

		if (result.status !== 0) {
			setFormInfo(prev => {
				return { ...prev, checked: false, tip: result.msg };
			});
		} else {
			setFormInfo(prev => {
				return { ...prev, checked: true, tip: "" };
			});
		}
		return result.status === 0;
	};

	const onSubmit = async () => {
		const resetForm = () => {
			setFormInfo(prev => {
				return {
					...prev,
					imgFile: null,
					checked: null,
					amount: null,
					tip: ""
				};
			});
		};

		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

		if (formInfo.checked && typeof window !== "undefined") {
			const { amount } = formInfo;
			const resultAmount = _isConvert ? amount * 1000 : amount;
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
					sysId: formInfo.sysId
				});

				if (transId) {
					try {
						const result = await Promise.all([
							!formInfo.imgFile ||
								uploadLocalBankReceipt({
									transId,
									imgFile: formInfo.imgFile
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
			}

			if (depositType === defDepositType.mobile) {
				window.open(
					`${config.openURL}/${userInfo.langId}/Cashier/DepositReqMobilePay?ChannelId=${formInfo.channelId}&Amount=${resultAmount}`
				);
				await delay(1000);
			}

			if (depositType === defDepositType.onlineBank) {
				window.open(
					`${config.openURL}/${
						userInfo.langId
					}/Cashier/DepositReqOnlineBanking?sysId=${
						formInfo?.sysId || 0
					}&payId=${formInfo.payId}&ChannelId=${
						formInfo.channelId
					}&Amount=${resultAmount}`
				);
				await delay(1000);
			}

			if (depositType === defDepositType.loadCard) {
				window.open(
					`${config.openURL}/${userInfo.langId}/Cashier/DepositReqLoadCardPay?ChannelId=${formInfo.channelId}&Amount=${resultAmount}`
				);
				await delay(1000);
			}

			setLoading(false);
			resetForm();
		}
	};

	const resetDepositForm = () => {
		setMobilePayInfoList([]);
		setOnlineBankInfoList([]);
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
					getOnlineBankGroupList(),
					getLoadCardPayGroupList()
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

	useEffect(() => {
		if (userInfo.isLogin && userInfo.userName) {
			const cookieBackupDomain = `backupDomain_${userInfo.userName}`;
			const isShowBackupDomain = readCookie(cookieBackupDomain) !== "1";

			if (isShowBackupDomain) {
				api_site_GetSupportDomainList().then(res => {
					if (!isMountedRef.current) return;

					if (res.data.errorCode === 0 && res.data.data.length > 0) {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.BackupDomain,
							onClickClose: () => setPopBox({ isOpen: false }),
							linkList: res.data.data
						});
					}
				});
			}
		}
	}, [userInfo.isLogin, userInfo.userName, setPopBox]);

	if (loading || !isInitDataDone) return null;

	const depositOptions = defDepositOptions({
		mobilePayGourpList,
		onlineBankGroupList,
		localBankGroupList,
		loadCardPayGroupList
	});

	const filterDepositOptions = depositOptions.filter(item => !item.isHide);

	if (!filterDepositOptions.length) return null;

	const defaultDepositOption = depositOptions.find(
		option => option.type === parameterDefaultType
	);

	if (!isDepositTypeIncludes || defaultDepositOption.isHide) {
		onChangeDepositType(filterDepositOptions[0].type);
	}

	let checked = false;

	if (depositType === defDepositType.localBank) {
		checked =
			formInfo.checked && (userInfo.accountName || formInfo.accountName);
	} else {
		checked = formInfo.checked;
	}

	return (
		<>
			<DepositnewInfoMoule
				t={t}
				langId={userInfo.langId}
				depositOptions={filterDepositOptions}
				depositType={depositType}
				checked={!!checked}
				onSubmit={onSubmit}
				setDepositType={onChangeDepositType}>
				{depositType === defDepositType.mobile && (
					<MobileForm
						t={t}
						depositType={depositType}
						_isConvert={_isConvert}
						mobilePayGourpList={mobilePayGourpList}
						getMobilePayInfoList={getMobilePayInfoList}
						mobilePayInfoList={mobilePayInfoList}
						formInfo={formInfo}
						setFormInfo={setFormInfo}
						onChangeAmount={onChangeAmount}
						onValidAmount={onValidAmount}
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
						onChangeAmount={onChangeAmount}
						onValidAmount={onValidAmount}
						onInputboxKeyDown={onInputboxKeyDown}
						getLocalBankInfo={getLocalBankInfo}
						localBankInfo={localBankInfo}
						asyncUploadBankPopBox={asyncUploadBankPopBox}
					/>
				)}

				{depositType === defDepositType.onlineBank && (
					<OnlineBankForm
						t={t}
						depositType={depositType}
						_isConvert={_isConvert}
						onlineBankGroupList={onlineBankGroupList}
						getOnlineBankInfoList={getOnlineBankInfoList}
						onlineBankInfoList={onlineBankInfoList}
						formInfo={formInfo}
						onChangeAmount={onChangeAmount}
						onValidAmount={onValidAmount}
						setFormInfo={setFormInfo}
						setOnlineBankInfoList={setOnlineBankInfoList}
						onInputboxKeyDown={onInputboxKeyDown}
					/>
				)}

				{depositType === defDepositType.loadCard && (
					<LoadCardForm
						t={t}
						formInfo={formInfo}
						_isConvert={_isConvert}
						depositType={depositType}
						setFormInfo={setFormInfo}
						loadCardPayGroupList={loadCardPayGroupList}
						getLoadCardPayInfoList={getLoadCardPayInfoList}
						onChangeAmount={onChangeAmount}
						onValidAmount={onValidAmount}
						onInputboxKeyDown={onInputboxKeyDown}
					/>
				)}
			</DepositnewInfoMoule>

			<DepositnewRecentHistory
				asyncUploadBankPopBox={asyncUploadBankPopBox}
				getDepositInfoRecent={getDepositInfoRecent}
				depositInfoRecentDatas={depositInfoRecentDatas}
				setDepositInfoRecentDatas={setDepositInfoRecentDatas}
				uploadLocalBankReceipt={uploadLocalBankReceipt}
			/>
		</>
	);
};

export default Depositnew;
