import React, { useContext, useEffect, useRef, useState } from "react";
import { navigate } from "@reach/router";
import moment from "moment";
import { useTranslation } from "react-i18next";
import {
	loadingContext,
	userInfoContext,
	popBoxContext
} from "../common/context";
import { defDepositType, defDepositOptions } from "./depositnew.def";
import defPopBoxType from "../common/defPopBoxType";
import { checkAmount, isConvert, getUrlParameter } from "../common/common";
import usePopBox from "../hook/usePopBox";

import useDeposit from "./hook/useDeposit";
import useDepositMobilePay from "./hook/useDepositMobilePay";
import useDepositOnline from "./hook/useDepositOnline";
import useDepositLocalBank from "./hook/useDepositLocalBank";

import { currencyCode } from "../../datas/countryCode";
import path from "../../router";
import config from "../../config";

import DepositnewInfoMoule from "./depositnew.infoMoule";
import DepositnewRecentHistory from "./depositnew.recentHistory";
import MobileForm from "./components/mobileForm";
import OnlineBankForm from "./components/onlineBankForm";
import LocalBankForm from "./components/localBankForm";

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

	const [
		processingDescriptionActive,
		setProcessingDescriptionActive
	] = useState(false);

	const [depositType, setDepositType] = useState(
		isDepositTypeIncludes ? parameterDefaultType : defDepositType.mobile
	);
	const [formInfo, setFormInfo] = useState({
		imgFile: null,
		// refId: null,
		// time: moment(),
		amount: null,
		checked: null,
		tip: ""
	});

	const [isInitDataDone, setIsInitDataDone] = useState(false);

	const _isConvert = isConvert(userInfo.currencyId);

	const { errorPopBox } = usePopBox();

	const {
		asyncUploadBankPopBox,
		getDepositInfoRecent,
		depositInfoRecentDatas,
		setDepositInfoRecentDatas
	} = useDeposit({
		isMountedRef
	});

	let localBankChecked = true;

	if (userInfo.currencyId === currencyCode.TH) {
		localBankChecked = formInfo?.imgFile?.type.includes("image");
	}

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
		uploadLocalBankReceipt
		// setLocalBankReceipt
	} = useDepositLocalBank({ isMountedRef });

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
		const isInteger = true;
		const result = checkAmount(
			_amount,
			formInfo.minAmount,
			formInfo.maxAmount,
			_isConvert,
			t,
			isInteger
		);

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

	const onSubmit = async () => {
		const resetForm = () => {
			setFormInfo(prev => {
				return {
					...prev,
					// refId: null,
					// time: moment(),
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
			const resultAmount = _isConvert ? amount * 1000 : Number(amount);
			setLoading(true);

			if (depositType === defDepositType.localBank) {
				if (!localBankChecked) return;

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
							// !formInfo.refId ||
							// 	setLocalBankReceipt({
							// 		transId,
							// 		depositTime: formInfo.time || moment(),
							// 		fefNo: formInfo.refId
							// 	})
						]);

						if (result.every(res => res)) {
							setProcessingDescriptionActive(true);
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
					getOnlineBankGroupList()
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
		onlineBankGroupList,
		localBankGroupList
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
		checked = formInfo.checked && localBankChecked;
		// formInfo?.imgFile?.type.includes("image");
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
				processingDescriptionActive={processingDescriptionActive}
				setDepositType={onChangeDepositType}>
				{depositType === defDepositType.mobile && (
					<MobileForm
						t={t}
						_isConvert={_isConvert}
						depositType={depositType}
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
						setPopBox={setPopBox}
						depositType={depositType}
						defPopBoxType={defPopBoxType}
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
						_isConvert={_isConvert}
						depositType={depositType}
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
			</DepositnewInfoMoule>

			<DepositnewRecentHistory
				asyncUploadBankPopBox={asyncUploadBankPopBox}
				getDepositInfoRecent={getDepositInfoRecent}
				depositInfoRecentDatas={depositInfoRecentDatas}
				setDepositInfoRecentDatas={setDepositInfoRecentDatas}
				uploadLocalBankReceipt={uploadLocalBankReceipt}
				// setLocalBankReceipt={setLocalBankReceipt}
			/>
		</>
	);
};

export default Depositnew;
