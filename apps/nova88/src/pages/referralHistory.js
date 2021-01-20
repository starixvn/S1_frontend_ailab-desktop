import React, { useEffect, useState, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { api_account_GetRefFriendList } from "../service/api/account";
import { number_format, isConvert } from "../components/common/common";
import { popBoxContext } from "../components/common/context";
import { Pagination } from "../components/common/pagination";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Filter from "../components/common/historyFilter";
import LeftMenu from "../components/common/leftMenu";
import defPopBoxType from "../components/common/defPopBoxType";
import SideBarQuickLink from "../components/home/sideBarQuickLink";

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
					<SideBarQuickLink />
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
	const [getHistory, setGetHistory] = useState(null);
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
					setGetHistory(res.data.data);
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

	const arr = getHistory?.map((item, idx) => {
		const _isConvert = isConvert(item.currencyId);
		return (
			<div key={`referral-${idx}`}>
				<div>{idx + 1}</div>
				<div>{item.userName}</div>
				<div>
					{moment(item.createTime).format("DD/MM/YYYY")}
					<span className="txt-blue2">
						{moment(item.createTime).format("HH:mm:ss")}
					</span>
				</div>
				<div>{t(`Currency_${item.currencyId}`)}</div>
				<div>
					{number_format(item.totalDeposit, _isConvert)} /{" "}
					{number_format(item.depositC, _isConvert)}
				</div>
				<div>
					{number_format(item.totalBet, _isConvert)} /{" "}
					{number_format(item.vaildBetC, _isConvert)}
				</div>
				<div>{number_format(item.bonusAmount, _isConvert)}</div>
				<div>{t(`lbl_ReferralStatus${item.status}`)}</div>
			</div>
		);
	});

	return (
		<div className="infoModule">
			<div className="inside-title icon icon-icon32px_History">
				<span>{t("lbl_ReferralHistory")}</span>
			</div>
			<Filter submitHandler={clickDateSubmit} keepData={keepData} />
			{getHistory ? (
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
					{getHistory?.length > 0 ? (
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
