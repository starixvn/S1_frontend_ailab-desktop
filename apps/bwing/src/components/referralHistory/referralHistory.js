import React, { useEffect, useState, useRef, useContext } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useLazyGetRefFriendDetailQuery } from "@ailab-desktop/service";
import Filter from "../common/historyFilter";
import { Pagination } from "../common/pagination";
import { isConvert } from "../common/common";
import HistoryResult from "../referral/historyResult";
import { defPopBoxType } from "../common/defPopBoxType";
import { popBoxContext } from "../common/context";
import { api_account_GetRefFriendList } from "../../service/api/account";
import ReferralDetail from "./referralDetail";

const initPagination = {
	totalPages: 0,
	currentPage: 1
};

const useReferralDetail = () => {
	const [refFriendDetailPayload, setRefFriendDetailPayload] = useState({});

	const [getRefFriendDetail, { data: { data: referralDetail = [] } = {} }] =
		useLazyGetRefFriendDetailQuery();

	const [detailPagination, setDetailPagination] = useState({
		totalPages: 0,
		currentPage: 1
	});

	const handleRefFriendDetail = async ({
		startDate,
		endDate,
		pageNumber,
		pageSize
	}) => {
		const { totalPages } = await getRefFriendDetail({
			startDate,
			endDate,
			pageNumber,
			pageSize
		}).unwrap();
		setRefFriendDetailPayload({ startDate, endDate, pageNumber, pageSize });
		setDetailPagination(prev => ({ ...prev, totalPages }));
	};

	return {
		refFriendDetailPayload,
		setRefFriendDetailPayload,
		referralDetail,
		handleRefFriendDetail,
		detailPagination
	};
};

const ReferralHistory = () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const [historyData, setHistoryData] = useState(null);
	const [processing, setProcessing] = useState(false);
	const [filterData, setFilterData] = useState(null);
	const [keepData, setKeepData] = useState(null);
	const [pagination, setPagination] = useState(initPagination);
	const isMountedRef = useRef(null);
	const [selectedStep, setSelectedStep] = useState(1);

	const _pageSize = 10;

	const {
		refFriendDetailPayload,
		referralDetail,
		handleRefFriendDetail,
		detailPagination
	} = useReferralDetail();

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const onChangeSelectedStep = step => {
		setSelectedStep(step);
	};

	const clickDateSubmit = (startDate, endDate, isUnix, quickPick) => {
		if (!processing) {
			setProcessing(true);
			let transactionData = filterData;
			if (!isUnix) {
				transactionData = {
					StartDate: moment(startDate).unix(),
					EndDate: moment(endDate).endOf("day").unix()
				};
				setFilterData(transactionData);
				setKeepData({
					startDate,
					endDate,
					quickPick
				});
			} else {
				transactionData = {
					StartDate: moment(startDate).zone("+07:00"),
					EndDate: moment(endDate).endOf("day").zone("+07:00")
				};
				setFilterData(transactionData);

				setKeepData({
					startDate,
					endDate,
					quickPick
				});
			}
			setPagination(prev => ({ ...prev, currentPage: 1 }));
			GetData(transactionData, 1);
		}
	};

	const clickPageNumber = page => {
		if (!processing) {
			setProcessing(true);
			const transactionData = filterData;
			setPagination(prev => ({ ...prev, currentPage: page }));
			GetData(transactionData, page);
		}
	};

	const GetData = (transactionData, pageNumber) => {
		const clickClose = () => {
			setPopBox({ isOpen: false });
		};

		api_account_GetRefFriendList({
			...transactionData,
			PageNumber: pageNumber,
			PageSize: _pageSize
		}).then(res => {
			if (isMountedRef.current) {
				if (res.data.errorCode === 0) {
					setHistoryData(res.data.data);
					setPagination(prev => ({
						...prev,
						totalPages: res.data.totalPages
					}));
				} else {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.ErrorMsg,
						message: `[${res.data.errorCode}] ${res.data.message}`,
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-cancel"
									onClick={clickClose}>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
				}
				setProcessing(false);
			}
		});
	};

	const arr = historyData?.map((item, idx) => {
		const _isConvert = isConvert(item.currencyId);
		return (
			<HistoryResult
				key={`referral-${idx + 1}-${item.custId}`}
				idx={idx + 1}
				onChangeSelectedStep={onChangeSelectedStep}
				onRefFriendDetail={handleRefFriendDetail}
				_isConvert={_isConvert}
				{...item}
			/>
		);
	});

	return (
		<div className="infoModule">
			<div className="inside-title icon icon-icon32px_History">
				<span>{t("lbl_ReferralHistory")}</span>
			</div>

			{selectedStep === 1 && (
				<>
					<Filter
						submitHandler={clickDateSubmit}
						keepData={keepData}
					/>
					{historyData ? (
						<div className="list history">
							<div className="listHeader">
								<div>{t("lbl_NO")}</div>
								<div>{t("lbl_Date")} (+07:00)</div>
								<div>{t("lbl_TotalDeposit")}</div>
								<div>{t("lbl_RewardAmount")}</div>
								<div>{t("lbl_Status")}</div>
							</div>
							{historyData?.length > 0 ? (
								<div className="listBody">{arr}</div>
							) : (
								<div className="nodata icon icon-nodata">
									<div>{t("lbl_NoData")}</div>
								</div>
							)}
						</div>
					) : null}
					{pagination.totalPages !== 0 ? (
						<Pagination
							totalPages={pagination.totalPages}
							currentPage={pagination.currentPage}
							clickPageNumber={clickPageNumber}
						/>
					) : null}
				</>
			)}

			{selectedStep === 2 && (
				<>
					<ReferralDetail
						referralDetail={referralDetail}
						onChangeSelectedStep={onChangeSelectedStep}
					/>

					{pagination.totalPages !== 0 ? (
						<Pagination
							totalPages={detailPagination.totalPages}
							currentPage={detailPagination.currentPage}
							clickPageNumber={page => {
								handleRefFriendDetail({
									...refFriendDetailPayload,
									pageNumber: page
								});
							}}
						/>
					) : null}
				</>
			)}
		</div>
	);
};

export default ReferralHistory;
