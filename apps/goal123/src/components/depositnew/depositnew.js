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
import { defPopBoxType } from "../common/popBox";
import { checkAmount, isConvert, getUrlParameter } from "../common/common";

import useDeposit from "./hook/useDeposit";
import useDepositOnline from "./hook/useDepositOnline";
import useDepositMobilePay from "./hook/useDepositMobilePay";
import useDepositLocalBank from "./hook/useDepositLocalBank";

import path from "../../router";
import config from "../../config";

import DepositnewInfoMoule from "./depositnew.infoMoule";
import DepositnewRecentHistory from "./depositnew.recentHistory";
import MobileForm from "./components/mobileForm";
import OnlineBankForm from "./components/onlineBankForm";
import LocalBankForm from "./components/localBankForm";
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
	const [infoData, setInfoData] = useState({
		amount: null,
		checked: null,
		tip: ""
	});

	const _isConvert = isConvert(userInfo.currencyId);

	const { errorPopBox } = usePopBox();
	const closePopBox = () => {
		setPopBox({ isOpen: false });
	};
	const {
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
		setLocalBankReceipt,
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
		setInfoData(prev => {
			return { ...prev, amount };
		});
	};

	const onValidAmount = _amount => {
		const result = checkAmount(
			_amount,
			infoData.minAmount,
			infoData.maxAmount,
			false,
			t
		);

		if (result.status !== 0) {
			setInfoData(prev => {
				return { ...prev, checked: false, tip: result.msg };
			});
		} else {
			setInfoData(prev => {
				return { ...prev, checked: true, tip: "" };
			});
		}
		return result.status === 0;
	};

	const onSubmit = async () => {
		const resetForm = () => {
			setInfoData(prev => {
				return { ...prev, checked: null, amount: null, tip: "" };
			});
		};

		const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

		if (infoData.checked && typeof window !== "undefined") {
			const { amount } = infoData;
			const resultAmount = _isConvert ? amount * 1000 : amount;

			if (depositType === defDepositType.mobile) {
				window.open(
					`${config.openURL}/${userInfo.langId}/Cashier/DepositReqMobilePay?ChannelId=${infoData.channelId}&Amount=${resultAmount}`
				);
				await delay(1000);
				resetForm();
			} else if (depositType === defDepositType.localBank) {
				if (
					loading ||
					(!userInfo.accountName && !infoData.accountName) ||
					// !infoData?.infoDataDepositRefNo ||
					!infoData?.infoDataReceiptImgFile?.type.includes("image")
				)
					return;

				const asyncAccountNameConfirm = () =>
					new Promise(resolve => {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ProfileConfirmCheck,
							accountName: infoData.accountName,
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

				if (infoData.accountName) {
					const success = await asyncAccountNameConfirm();

					closePopBox();

					if (!success) return;

					await setAccountName(infoData.accountName);
				}

				setLoading(true);

				const transId = await postLocalBankReqWireTransfer({
					amount: resultAmount,
					sysId: infoData.sysId
				});

				if (transId) {
					try {
						const result = await Promise.all([
							uploadLocalBankReceipt({
								transId,
								imgFile: infoData.infoDataReceiptImgFile
							}),
							setLocalBankReceipt({
								transId,
								depositTime:
									infoData.infoDataDepositTime || moment(),
								fefNo: infoData.infoDataDepositRefNo
							})
						]);

						if (result.every(res => res)) {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.Success,
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

				setLoading(false);
			} else if (depositType === defDepositType.onlineBank) {
				window.open(
					`${config.openURL}/${
						userInfo.langId
					}/Cashier/DepositReqOnlineBanking?sysId=${
						infoData?.sysId || 0
					}&payId=${infoData.payId}&ChannelId=${
						infoData.channelId
					}&Amount=${resultAmount}`
				);
				await delay(1000);
				resetForm();
			}

			await getDepositInfoRecent();
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

	const openUploadBankPopBox = ({
		bankName,
		accountNo,
		accountName,
		transId,
		picFileName,
		refId,
		amount,
		from,
		historyDepositTime
	}) => {
		const {
			infoDataReceiptImgFile,
			infoDataDepositTime,
			infoDataDepositRefNo
		} = infoData;

		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.DepositUploadBankSlip,
			t,
			langId: userInfo.langId,
			localBankInfo: {
				bankName,
				accountNo,
				accountName,
				transId
			},
			infoDataReceiptImgFile,
			infoDataDepositTime,
			infoDataDepositRefNo,
			setPopBox,
			picFileName,
			refId,
			amount,
			from,
			_isConvert,
			historyDepositTime,
			setInfoData,
			uploadLocalBankReceipt,
			getDepositInfoRecent,
			setLocalBankReceipt
		});
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
			} catch (e) {
				errorPopBox();
			}

			setLoading(false);
			//
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

	const depositOptions = defDepositOptions({
		mobilePayGourpList,
		onlineBankGroupList,
		localBankGroupList
	});

	const filterDepositOptions = depositOptions.filter(item => !item.isHide);

	const defaultDepositOption = depositOptions.find(
		option => option.type === parameterDefaultType
	);

	if (filterDepositOptions.length > 0) {
		if (
			!isDepositTypeIncludes ||
			(isDepositTypeIncludes && defaultDepositOption.isHide)
		) {
			onChangeDepositType(filterDepositOptions[0].type);
		}
	}

	if (loading) return null;

	let checked = false;

	if (depositType === defDepositType.localBank) {
		checked =
			infoData.checked &&
			(userInfo.accountName || infoData.accountName) &&
			// infoData?.infoDataDepositRefNo &&
			infoData?.infoDataReceiptImgFile?.type.includes("image");
	} else {
		checked = infoData.checked;
	}

	return (
		<>
			<DepositnewInfoMoule
				t={t}
				langId={userInfo.langId}
				depositOptions={depositOptions}
				depositType={depositType}
				checked={!!checked}
				onSubmit={onSubmit}
				setDepositType={onChangeDepositType}>
				{depositType === defDepositType.mobile && (
					<MobileForm
						t={t}
						_isConvert={_isConvert}
						mobilePayGourpList={mobilePayGourpList}
						getMobilePayInfoList={getMobilePayInfoList}
						mobilePayInfoList={mobilePayInfoList}
						infoData={infoData}
						setInfoData={setInfoData}
						onChangeAmount={onChangeAmount}
						onValidAmount={onValidAmount}
						onInputboxKeyDown={onInputboxKeyDown}
					/>
				)}

				{depositType === defDepositType.localBank && (
					<LocalBankForm
						t={t}
						userInfo={userInfo}
						_isConvert={_isConvert}
						localBankGroupList={localBankGroupList}
						infoData={infoData}
						setInfoData={setInfoData}
						onChangeAmount={onChangeAmount}
						onValidAmount={onValidAmount}
						onInputboxKeyDown={onInputboxKeyDown}
						getLocalBankInfo={getLocalBankInfo}
						localBankInfo={localBankInfo}
						openUploadBankPopBox={openUploadBankPopBox}
					/>
				)}

				{depositType === defDepositType.onlineBank && (
					<OnlineBankForm
						t={t}
						_isConvert={_isConvert}
						onlineBankGroupList={onlineBankGroupList}
						getOnlineBankInfoList={getOnlineBankInfoList}
						onlineBankInfoList={onlineBankInfoList}
						infoData={infoData}
						onChangeAmount={onChangeAmount}
						onValidAmount={onValidAmount}
						setInfoData={setInfoData}
						setOnlineBankInfoList={setOnlineBankInfoList}
						onInputboxKeyDown={onInputboxKeyDown}
					/>
				)}
			</DepositnewInfoMoule>

			<DepositnewRecentHistory
				openUploadBankPopBox={openUploadBankPopBox}
				getDepositInfoRecent={getDepositInfoRecent}
				depositInfoRecentDatas={depositInfoRecentDatas}
				setDepositInfoRecentDatas={setDepositInfoRecentDatas}
			/>
		</>
	);
};

export default Depositnew;
