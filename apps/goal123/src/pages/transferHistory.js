import React, { useState, useEffect, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { api_tp_GetTransferHistory } from "../service/api/tp";
import { popBoxContext } from "../components/common/context";
import { TransactionHistory } from "../components/transferFunds/historyResult";
import { Pagination } from "../components/common/pagination";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import HomeFooter from "../components/footer/HomeFooter";
import Filter from "../components/common/historyFilter";
import LeftMenu from "../components/common/leftMenu";
import Loading from "../components/common/loading";
import { defPopBoxType } from "../components/common/popBox";
import ReloadSpin from "../components/common/reloadSpin";

export default () => (
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
			<HomeFooter />
		</Layout>
	</Wrapper>
);

const transferDirection = (
	direction,
	displayMainWallet,
	displayAdjustment,
	isAdjustment,
	tpName
) => {
	let startWallet = "";
	let endWallet = "";
	if (direction === 1) {
		if (isAdjustment) {
			startWallet = tpName;
			endWallet = displayAdjustment;
		} else {
			startWallet = displayMainWallet;
			endWallet = tpName;
		}
	} else if (isAdjustment) {
		startWallet = tpName;
		endWallet = displayAdjustment;
	} else {
		startWallet = tpName;
		endWallet = displayMainWallet;
	}
	return { startWallet, endWallet };
};

const initPagination = {
	totalPages: 0,
	currentPage: 1
};

const Content = () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const [getHistory, setGetHistory] = useState(null);
	const [filterData, setFilterData] = useState(null);
	const [keepData, setKeepData] = useState(null);
	const [processing, setProcessing] = useState(false);
	const [loading, setLoading] = useState(false);
	const [pagination, setPagination] = useState(initPagination);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const GetTransferHistory = (transactionData, pageNumber) => {
		const ClickClose = () => {
			setPopBox({ isOpen: false });
		};

		setLoading(true);
		api_tp_GetTransferHistory({
			...transactionData,
			PageNumber: pageNumber
		}).then(
			res => {
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
										onClick={ClickClose}
									>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
					}
					setProcessing(false);
					setLoading(false);
				}
			},
			() => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.ErrorMsg,
						message: t("msg_ApiServerError"),
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-cancel"
									onClick={ClickClose}
								>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
					setProcessing(false);
					setLoading(false);
				}
			}
		);
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
			GetTransferHistory(transactionData, 1);
		}
	};

	const clickPageNumber = page => {
		if (!processing) {
			setProcessing(true);
			const transactionData = filterData;
			setPagination(prev => ({ ...prev, currentPage: page }));
			GetTransferHistory(transactionData, page);
		}
	};

	const arr = getHistory?.map((item, i) => {
		const _transferDirection = transferDirection(
			item.direction,
			t("lbl_MainWallet"),
			t("lbl_Adjustment"),
			item.isAdjustment,
			item.tpName
		);
		const _status = item.status === 0 ? t("lbl_Success") : t("lbl_Fail");
		const _statusColor = item.status === 0 ? "approved" : "cancel";

		return (
			<TransactionHistory
				key={`transfer-${item.transId}`}
				idx={i + 1}
				createTime={item.createTime}
				transId={item.transId}
				amount={item.amount}
				startWallet={_transferDirection.startWallet}
				endWallet={_transferDirection.endWallet}
				status={_status}
				statusColor={_statusColor}
				t={t}
			/>
		);
	});

	return loading ? (
		<Loading />
	) : (
		<div className="infoModule">
			<div className="inside-title icon icon-icon32px_History">
				<span>{t("lbl_TransferHistory")}</span>
			</div>
			<Filter submitHandler={clickDateSubmit} keepData={keepData} />

			{getHistory ? (
				<div className="list history">
					<div className="tip active">{t("msg_AmountFormatTip")}</div>
					<div className="listHeader">
						<div>{t("lbl_NO")}</div>
						<div>{t("lbl_Date")} (+07:00)</div>
						<div>{t("lbl_ID")}</div>
						<div>{t("lbl_Direction")}</div>
						<div>{t("lbl_Amount")}</div>
						<div>
							{t("lbl_Status")}
							<ReloadSpin
								func={clickDateSubmit.bind(
									this,
									filterData?.StartDate,
									filterData?.EndDate
								)}
							/>
						</div>
					</div>

					{getHistory?.length > 0 ? (
						<div className="listBody">{arr}</div>
					) : (
						<div className="nodata icon icon-nodata">
							{t("lbl_NoData")}
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
