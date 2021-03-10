import React, { useContext, useEffect, useRef, useState } from "react";
import { navigate } from "@reach/router";
import moment from "moment";
import { useTranslation } from "react-i18next";
import {
	loadingContext,
	userInfoContext,
	popBoxContext
} from "../common/context";
import { defDepositType } from "./depositnew.def";
import { defPopBoxType } from "../common/popBox";
import {
	checkAmount,
	isConvert,
	getUrlParameter,
	getAmountTip
} from "../common/common";

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

	const onChangeDepositType = type => {
		setDepositType(type);
		navigate(`/${userInfo.langId}/${path.deposit.root}?type=${type}`);
		getData(type);

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

				setLoading(true);

				if (infoData.accountName) {
					await setAccountName(infoData.accountName);
				}

				const transId = await postLocalBankReqWireTransfer({
					amount: resultAmount,
					sysId: infoData.sysId
				});

				if (transId) {
					await Promise.all([
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
				}

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

	const getData = async type => {
		setLoading(true);

		if (type === defDepositType.mobile) {
			await getMobilePayGroupList();
		} else if (type === defDepositType.localBank) {
			await getLocalBankGroupList();
		} else if (type === defDepositType.onlineBank) {
			await getOnlineBankGroupList();
		}

		setLoading(false);
	};

	const resetDepositForm = () => {
		setMobilePayInfoList([]);
		setOnlineBankInfoList([]);
	};

	const clickInfo = () => {
		const _msg =
			tip === "" ? getAmountTip(infoData.minAmount, _isConvert, t) : "";

		setInfoData(prev => {
			return { ...prev, checked: null, tip: _msg };
		});
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
		if (!isDepositTypeIncludes) {
			navigate(
				`/${userInfo.langId}/${path.deposit.root}?type=${defDepositType.mobile}`
			);
		}

		getData(depositType);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

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
				depositType={depositType}
				checked={!!checked}
				onSubmit={onSubmit}
				setDepositType={onChangeDepositType}>
				{depositType === defDepositType.mobile && (
					<MobileForm
						t={t}
						langId={userInfo.langId}
						_isConvert={_isConvert}
						mobilePayGourpList={mobilePayGourpList}
						getMobilePayInfoList={getMobilePayInfoList}
						mobilePayInfoList={mobilePayInfoList}
						infoData={infoData}
						depositType={depositType}
						setInfoData={setInfoData}
						onChangeAmount={onChangeAmount}
						onValidAmount={onValidAmount}
						onInputboxKeyDown={onInputboxKeyDown}
						clickInfo={clickInfo}
					/>
				)}

				{depositType === defDepositType.localBank && (
					<LocalBankForm
						t={t}
						userInfo={userInfo}
						_isConvert={_isConvert}
						localBankGroupList={localBankGroupList}
						depositType={depositType}
						infoData={infoData}
						setInfoData={setInfoData}
						onChangeAmount={onChangeAmount}
						onValidAmount={onValidAmount}
						clickInfo={clickInfo}
						onInputboxKeyDown={onInputboxKeyDown}
						getLocalBankInfo={getLocalBankInfo}
						localBankInfo={localBankInfo}
						openUploadBankPopBox={openUploadBankPopBox}
					/>
				)}

				{depositType === defDepositType.onlineBank && (
					<OnlineBankForm
						t={t}
						langId={userInfo.langId}
						_isConvert={_isConvert}
						onlineBankGroupList={onlineBankGroupList}
						getOnlineBankInfoList={getOnlineBankInfoList}
						onlineBankInfoList={onlineBankInfoList}
						infoData={infoData}
						depositType={depositType}
						onChangeAmount={onChangeAmount}
						onValidAmount={onValidAmount}
						setInfoData={setInfoData}
						setOnlineBankInfoList={setOnlineBankInfoList}
						onInputboxKeyDown={onInputboxKeyDown}
						clickInfo={clickInfo}
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
