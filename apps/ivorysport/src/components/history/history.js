import React, { useState, useEffect, useRef, useContext } from "react";
import moment from "moment";
import { useLocation } from "@reach/router";
import { useTranslation } from "react-i18next";
import {
	isConvert,
	getUrlParameter,
	currencyIdToTimeZone,
	defCurrencyList
} from "../common/common";
import { popBoxContext, userInfoContext } from "../common/context";

import useDepositHistory from "./hook/useDepositHistory";
import useTransferHistory from "./hook/useTransferHistory";
import useWithdrawaHistory from "./hook/useWithdrawaHistory";
import useFinancialHistory from "./hook/useFinancialHistory";
import useReferralHistory from "./hook/useReferralHistory";

import HistoryTagNav from "./historyTagNav";
import HistoryFilter from "../common/historyFilter";
import HistoryTable from "./historyTable";
import { Pagination } from "../common/pagination";
import { defHistoryIdList, defHistoryNav, defColumns } from "./def";
import { useDeposit, useDepositLocalBank } from "../deposit/hooks";

const History = () => {
	const paramsKindId = getUrlParameter("kind");

	const { t } = useTranslation();
	const location = useLocation();

	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const _isConvert = isConvert(userInfo.currencyId);

	const isMountedRef = useRef(null);

	const [historyDatas, setHistoryDatas] = useState([]);
	const [processing, setProcessing] = useState(false);
	const [filterData, setFilterData] = useState({});
	const [keepData, setKeepData] = useState({});
	const [pagination, setPagination] = useState({
		totalPages: 0,
		currentPage: 1
	});

	const timeZone =
		currencyIdToTimeZone[userInfo.currencyId ?? defCurrencyList.MYR];

	const updateHistoryList = (startDate, endDate, isUnix, quickPick) => {
		if (!processing) {
			setProcessing(true);
			let transactionData = filterData;
			if (!isUnix) {
				transactionData = {
					StartDate: moment(startDate).zone(timeZone).unix(),
					EndDate: moment(endDate).endOf("day").zone(timeZone).unix()
				};
				setFilterData(transactionData);

				setKeepData({
					startDate,
					endDate,
					quickPick
				});
			} else {
				transactionData = {
					StartDate: moment(startDate).zone(timeZone),
					EndDate: moment(endDate).endOf("day").zone(timeZone)
				};
				setFilterData(transactionData);

				setKeepData({
					startDate,
					endDate,
					quickPick
				});
			}

			setPagination(prev => ({ ...prev, currentPage: 1 }));
			getHistory(transactionData, 1);
		}
	};

	const { getTransferHistory, transferDirection } = useTransferHistory({
		isMountedRef,
		_isConvert,
		langId: userInfo.langId,
		pagination,
		t,
		setHistoryDatas,
		setPagination,
		updateHistoryList
	});

	const {
		getDepositHistory,
		depositActivateUploadModal,
		depositActivateCancelConfirmModal
	} = useDepositHistory({
		isMountedRef,
		_isConvert,
		userInfo,
		pagination,
		t,
		setHistoryDatas,
		setPagination,
		updateHistoryList
	});

	const { getWithdrawalInfoHistory, activateWithdrawalCancelConfirmModal } =
		useWithdrawaHistory({
			isMountedRef,
			_isConvert,
			langId: userInfo.langId,
			pagination,
			t,
			setHistoryDatas,
			setPagination,
			updateHistoryList
		});

	const { getStatementHistory } = useFinancialHistory({
		isMountedRef,
		_isConvert,
		langId: userInfo.langId,
		pagination,
		t,
		setHistoryDatas,
		setPagination,
		updateHistoryList
	});

	const { getRefFriendHistory } = useReferralHistory({
		isMountedRef,
		_isConvert,
		langId: userInfo.langId,
		pagination,
		t,
		setHistoryDatas,
		setPagination,
		updateHistoryList
	});

	const [selectedTagId, setSelectedTagId] = useState(paramsKindId);

	const { asyncUploadBankPopBox } = useDeposit({ isMountedRef, userInfo });

	const { uploadLocalBankReceipt } = useDepositLocalBank({ isMountedRef });

	const SubmitProof = async (
		bankInfo,
		depositRep,
		amount,
		transId,
		picFileName,
		historyRefId,
		historyDepositTime,
		depositReceipt
	) => {
		const { bankName, bankSite } = bankInfo;
		const { accountName, accountNo } = depositRep;

		const uploadPopBoxResult = await asyncUploadBankPopBox({
			formInfo: {
				imgFile: {
					name: picFileName
				}
				// refId: historyRefId,
				// time: historyDepositTime
			},
			localBankInfo: {
				bankName,
				bankSite,
				accountNo,
				accountName,
				transId,
				amount
			},
			_isConvert,
			langId: userInfo.langId,
			receiptInfo: depositReceipt
		});

		if (uploadPopBoxResult.success) {
			const {
				datas: { depositImgFiles }
			} = uploadPopBoxResult;

			// const isSameRefId = historyRefId === depositRefNo.value;

			// const isSameDepositTime = moment(depositTime.value).isSame(
			// 	moment(historyDepositTime)
			// );

			if (depositImgFiles.file) {
				await uploadLocalBankReceipt({
					imgFile: depositImgFiles.file,
					transId
				});
			}

			// if (!isSameDepositTime || !isSameRefId) {
			// 	await setLocalBankReceipt({
			// 		transId,
			// 		depositTime: depositTime.value,
			// 		fefNo: depositRefNo.value
			// 	});
			// }

			if (
				depositImgFiles.file
				// || !isSameDepositTime || !isSameRefId
			) {
				const transactionData = {
					StartDate: filterData.StartDate,
					EndDate: filterData.EndDate
				};
				setFilterData(transactionData);
				setKeepData({
					startDate: filterData.StartDate,
					endDate: filterData.EndDate
				});
				getHistory(transactionData, pagination.currentPage);
			}
		}
	};

	const columns = defColumns({
		t,
		_isConvert,
		keepData,

		updateHistoryList,
		transferDirection,

		depositActivateUploadModal,
		depositActivateCancelConfirmModal,

		activateWithdrawalCancelConfirmModal,
		timeZone,
		setPopBox,
		SubmitProof
	})[selectedTagId];

	const clickPageNumber = page => {
		if (!processing) {
			const transactionData = filterData;
			setProcessing(true);
			setPagination(prev => ({ ...prev, currentPage: page }));
			getHistory(transactionData, page);
		}
	};

	const getHistory = (transactionData, pageNumber) => {
		switch (selectedTagId) {
			case defHistoryIdList.depositId:
				getDepositHistory(transactionData, pageNumber);

				break;

			case defHistoryIdList.transferId:
				getTransferHistory(transactionData, pageNumber);

				break;

			case defHistoryIdList.withdrawalId:
				getWithdrawalInfoHistory(transactionData, pageNumber);

				break;

			case defHistoryIdList.financialId:
				getStatementHistory(transactionData, pageNumber);

				break;

			case defHistoryIdList.referralId:
				getRefFriendHistory(transactionData, pageNumber);

				break;

			default:
				break;
		}

		setProcessing(false);
	};

	const resetPage = () => {
		setFilterData({});
		setKeepData({});
		setHistoryDatas([]);
		setPagination({ totalPages: 0, currentPage: 1 });
	};

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		const kindParamsSome = Object.values(defHistoryIdList).some(
			item => item === paramsKindId
		);

		if (!kindParamsSome) {
			window.history.replaceState(
				{},
				"",
				`${location.pathname}?kind=${defHistoryIdList.transferId}`
			);

			setSelectedTagId(defHistoryIdList.transferId);
		}
	}, [paramsKindId, location.pathname]);

	return (
		<div className="infoModule">
			<div className="inside-title">
				<span className="icon icon-icon32px_History">
					{t("lbl_History")}
				</span>
			</div>

			<HistoryTagNav
				t={t}
				pathname={location.pathname}
				defHistoryNav={defHistoryNav}
				resetPage={resetPage}
				selectedTagId={selectedTagId}
				setSelectedTagId={setSelectedTagId}
			/>

			<div className="historyModule active">
				<HistoryFilter
					submitHandler={updateHistoryList}
					keepData={keepData}
				/>

				<HistoryTable
					t={t}
					dataSource={historyDatas}
					columns={columns}
					selectedTagId={selectedTagId}
				/>

				<Pagination
					totalPages={pagination.totalPages}
					currentPage={pagination.currentPage}
					clickPageNumber={clickPageNumber}
				/>
			</div>
		</div>
	);
};

export default History;
