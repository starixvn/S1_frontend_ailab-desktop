import React, { useEffect, useState, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { api_account_GetRefFriendList } from "../service/api/account";
import { isConvert } from "../components/common/common";
import { popBoxContext } from "../components/common/context";
import { Pagination } from "../components/common/pagination";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Filter from "../components/common/historyFilter";
import LeftMenu from "../components/common/leftMenu";
import { defPopBoxType } from "../components/common/defPopBoxType";
import ReferralHistory from "../components/referral/historyResult";

export default () => {
	return (
		<Wrapper afterLogin={true}>
			<Layout>
				<main>
					<section className="inside">
						<LeftMenu />
						<div className="rightModule">
							<Content />
						</div>
					</section>
				</main>
			</Layout>
		</Wrapper>
	);
};

const initPagination = {
	totalPages: 0,
	currentPage: 1
};

const Content = () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const [historyData, setHistoryData] = useState(null);
	const [processing, setProcessing] = useState(false);
	const [filterData, setFilterData] = useState(null);
	const [keepData, setKeepData] = useState(null);
	const [pagination, setPagination] = useState(initPagination);
	const isMountedRef = useRef(null);
	const _pageSize = 10;

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

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
			<ReferralHistory
				key={`referral-${idx + 1}-${item.custId}`}
				idx={idx + 1}
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
			<Filter submitHandler={clickDateSubmit} keepData={keepData} />
			{historyData ? (
				<div className="list history">
					<div className="listHeader">
						<div>{t("lbl_NO")}</div>
						<div>{t("lbl_Username")}</div>
						<div>
							{t("lbl_RegisterDate")} ({moment().format("Z")})
						</div>
						<div>{t("lbl_Currency")}</div>
						<div>{t("lbl_TotalDeposit")}</div>
						<div>{t("lbl_TotalBet")}</div>
						<div>{t("lbl_BonusAmount")}</div>
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
		</div>
	);
};
