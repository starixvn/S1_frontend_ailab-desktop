import React, { useContext, useEffect, useRef, useState } from "react";
import { navigate, useLocation } from "@reach/router";
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
} from "./depositnew.def";
import defPopBoxType from "../common/defPopBoxType";
import {
	checkAmount,
	isConvert,
	getUrlParameter,
	setLocalStorage,
	getLocalStorage,
	removeLocalStorage
} from "../common/common";
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
	const { t } = useTranslation();
	const depositInfoStorage = getLocalStorage("nova88depositquery");
	const parameterType = getUrlParameter("type");
	const location = useLocation();

	const isMountedRef = useRef(null);

	const { loading, setLoading } = useContext(loadingContext);
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	const [
		processingDescriptionActive,
		setProcessingDescriptionActive
	] = useState(false);

	const [depositType, setDepositType] = useState(() => {
		const isDepositTypeIncludes = type =>
			Object.values(defDepositType).includes(type);

		if (isDepositTypeIncludes(depositInfoStorage?.type))
			return depositInfoStorage?.type;

		if (isDepositTypeIncludes(parameterType)) return parameterType;

		return defDepositType.mobile;
	});

	const [formInfo, setFormInfo] = useState({
		imgFile: null,
		// refId: null,
		// time: moment(),
		amount: null,
		checked: null,
		tip: ""
	});

	const [isInitDataDone, setIsInitDataDone] = useState(false);

	const [saveInfoChecked, setSaveInfoChecked] = useState(false);

	const [localBankChecked, setLocalBankChecked] = useState(true);

	const [localBankChannelError, setLocalBankChannelError] = useState({
		checked: true,
		tip: ""
	});
	const [localBankBankInfoErrpr, setLocalBankBankInfoErrpr] = useState({
		checked: true,
		tip: ""
	});

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

		if (saveInfoChecked) {
			setLocalStorage("nova88depositquery", localStoragePath);
		}
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

			if (saveInfoChecked) {
				saveInfoToLocalStorage();
			} else {
				removeLocalStorage("nova88depositquerySavedChecked");
				removeLocalStorage("nova88depositquery");
			}

			if (depositType === defDepositType.mobile) {
				window.open(
					`${config.openURL}/${userInfo.langId}/Cashier/DepositReqMobilePay?ChannelId=${formInfo.channelId}&Amount=${resultAmount}`
				);
				await delay(1000);

				resetForm();
			} else if (depositType === defDepositType.localBank) {
				if (
					loading ||
					!localBankChecked
					// !formInfo?.imgFile?.type.includes("image")
				)
					return;

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

				setLoading(false);

				resetForm();
			} else if (depositType === defDepositType.onlineBank) {
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

				resetForm();
			}
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
		const onValidAmount = _amount => {
			const result = checkAmount(
				_amount,
				formInfo.minAmount,
				formInfo.maxAmount,
				_isConvert,
				t
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

		onValidAmount(formInfo.amount);

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

				if (!datas?.fromChannel) {
					errors.fromChannel = t("lbl_DepositChannelTip");
				}

				if (
					(datas?.fromChannel ===
						defDepositChannelIdList.OnlineBanking ||
						datas?.fromChannel === defDepositChannelIdList.ATM) &&
					!datas?.fromAccountNum
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

			setLocalBankChannelError({
				checked: !errors.fromChannel,
				tip: errors.fromChannel
			});

			setLocalBankBankInfoErrpr({
				checked: !errors.fromAccountNum,
				tip: errors.fromAccountNum
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formInfo]);

	useEffect(() => {
		const checkRemoveStorage = () => {
			const savedCheck = getLocalStorage(
				"nova88depositquerySavedChecked"
			);

			if (!savedCheck) {
				removeLocalStorage("nova88depositquery");
				removeLocalStorage("nova88depositquerySavedChecked");
			}
		};

		const checkLocalStorageUpdateForm = () => {
			const savedCheck = getLocalStorage(
				"nova88depositquerySavedChecked"
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
					getOnlineBankGroupList()
				]);
				setIsInitDataDone(true);
			} catch (e) {
				errorPopBox();
			}

			window.addEventListener("beforeunload", checkRemoveStorage);
			setLoading(false);
		};
		getData();
		checkLocalStorageUpdateForm();

		return () => {
			checkRemoveStorage();

			window.removeEventListener("beforeunload", checkRemoveStorage);
		};

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
		option => option.type === parameterType
	);

	if (
		location.pathname === `/${userInfo.langId}/${path.deposit.root}` &&
		depositOptions?.length > 0 &&
		(defaultDepositOption?.isHide || !defaultDepositOption)
	) {
		onChangeDepositType(filterDepositOptions[0].type);
	}

	return (
		<>
			<DepositnewInfoMoule
				t={t}
				langId={userInfo.langId}
				depositOptions={filterDepositOptions}
				depositType={depositType}
				checked={!!formInfo.checked && localBankChecked}
				onSubmit={onSubmit}
				saveInfoChecked={saveInfoChecked}
				setSaveInfoChecked={setSaveInfoChecked}
				processingDescriptionActive={processingDescriptionActive}
				setDepositType={onChangeDepositType}
				setLocalBankChecked={setLocalBankChecked}
				setFormInfo={setFormInfo}>
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
						onInputboxKeyDown={onInputboxKeyDown}
						getLocalBankInfo={getLocalBankInfo}
						localBankInfo={localBankInfo}
						asyncUploadBankPopBox={asyncUploadBankPopBox}
						getBankInfo={getBankInfo}
						custBankInfoList={custBankInfoList}
						localBankChannelError={localBankChannelError}
						localBankBankInfoErrpr={localBankBankInfoErrpr}
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
