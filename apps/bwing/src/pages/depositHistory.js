import React, { useEffect, useState, useRef, useContext } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import {
	api_payment_GetDepositInfoHistory,
	api_payment_SetDepositCancel
} from "../service/api/payment";
import { userInfoContext, popBoxContext } from "../components/common/context";
import { TransactionHistory } from "../components/deposit/deposit.historyResult";
import { defPopBoxType } from "../components/common/defPopBoxType";
import { Pagination } from "../components/common/pagination";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Filter from "../components/common/historyFilter";
import LeftMenu from "../components/common/leftMenu";
import { isConvert } from "../components/common/common";
import Loading from "../components/common/loading";
import ReloadSpin from "../components/common/reloadSpin";

import useDeposit from "../components/deposit/hook/useDeposit";
import useDepositLocalBank from "../components/deposit/hook/useDepositLocalBank";

export default () => (
	<Wrapper afterLogin={true}>
		<Layout showFooter={true}>
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

const Content = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [getHistory, setGetHistory] = useState(null);
	const [processing, setProcessing] = useState(false);
	const [filterData, setFilterData] = useState(null);
	const [keepData, setKeepData] = useState(null);
	const [pagination, setPagination] = useState({
		totalPages: 0,
		currentPage: 1
	});
	const [loading, setLoading] = useState(false);
	const isMountedRef = useRef(null);
	const _isConvert = isConvert(userInfo.currencyId);

	const { asyncUploadBankPopBox } = useDeposit({ isMountedRef, userInfo });

	const { setLocalBankReceipt, uploadLocalBankReceipt } = useDepositLocalBank(
		{ isMountedRef }
	);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const ClickClose = () => {
		setPopBox({ isOpen: false });
	};

	const GetDepositInfoHistory = (transactionData, pageNumber) => {
		setLoading(true);
		api_payment_GetDepositInfoHistory({
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
										onClick={ClickClose}>
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
									onClick={ClickClose}>
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

	const updateHistoryList = (startDate, endDate, isUnix, quickPick) => {
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
			GetDepositInfoHistory(transactionData, 1);
		}
	};

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
		const { bankName, bankSite } = bankInfo || {};
		const { accountName, accountNo } = depositRep || {};

		const uploadPopBoxResult = await asyncUploadBankPopBox({
			formInfo: {
				imgFile: {
					name: picFileName
				},
				refId: historyRefId,
				time: historyDepositTime
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
				datas: { depositTime, depositRefNo, depositImgFiles }
			} = uploadPopBoxResult;

			const isSameRefId = historyRefId === depositRefNo.value;

			const isSameDepositTime = moment(depositTime.value).isSame(
				moment(historyDepositTime)
			);

			if (depositImgFiles.file) {
				await uploadLocalBankReceipt({
					imgFile: depositImgFiles.file,
					transId
				});
			}

			if (!isSameDepositTime || !isSameRefId) {
				await setLocalBankReceipt({
					transId,
					depositTime: depositTime.value,
					fefNo: depositRefNo.value
				});
			}

			if (depositImgFiles.file || !isSameDepositTime || !isSameRefId) {
				const transactionData = {
					StartDate: filterData.StartDate,
					EndDate: filterData.EndDate
				};
				setFilterData(transactionData);
				setKeepData({
					startDate: filterData.StartDate,
					endDate: filterData.EndDate
				});
				GetDepositInfoHistory(transactionData, pagination.currentPage);
			}
		}
	};

	const ClickCancel = transId => {
		const ClickConfirm = () => {
			setLoading(true);
			setPopBox({ isOpen: false });

			api_payment_SetDepositCancel(transId).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setGetHistory(prevState => {
								const newD = [...prevState];
								const idx = newD.findIndex(
									x => x.transId === transId
								);
								newD[idx].status = 5;
								return newD;
							});
						} else {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.ErrorMsg,
								message: `[${res.data.errorCode}] ${res.data.message}`,
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-cancel"
											onClick={ClickClose}>
											{t("lbl_Close")}
										</button>
									</div>
								)
							});
						}
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
										onClick={ClickClose}>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
						setLoading(false);
					}
				}
			);
		};

		const ClosePopBox = () => {
			setPopBox({ isOpen: false });
		};

		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Cancel,
			onClickClose: ClosePopBox,
			btnBar: (
				<div className="btnGroup">
					<button className="btn-cancel" onClick={ClickConfirm}>
						{t("lbl_Yes")}
					</button>
					<button className="btn-check" onClick={ClosePopBox}>
						{t("lbl_No")}
					</button>
				</div>
			)
		});
	};

	const clickPageNumber = page => {
		if (!processing) {
			const transactionData = filterData;
			setProcessing(true);
			setPagination(prev => ({ ...prev, currentPage: page }));
			GetDepositInfoHistory(transactionData, page);
		}
	};

	const arr = getHistory?.map((item, i) => (
		<TransactionHistory
			key={`depositHistory-${item.transId}`}
			idx={i + 1}
			createTime={item.createTime}
			transId={item.transId}
			depositType={item.depositType}
			status={item.status}
			amount={item.amount}
			ClickCancel={ClickCancel.bind(this, item.transId)}
			SubmitProof={SubmitProof.bind(
				this,
				item.bankInfo,
				item.depositRep,
				item.amount,
				item.transId,
				item.picFileName,
				item.refId,
				item.depositTime,
				item.depositReceipt
			)}
			depositMessageDetail={item.depositMessageDetail}
		/>
	));

	return loading ? (
		<Loading />
	) : (
		<div className="infoModule">
			<div className="inside-title">
				<span>{t("lbl_DepositHistory")}</span>
			</div>
			<Filter submitHandler={updateHistoryList} keepData={keepData} />

			{getHistory ? (
				<div className="list history">
					<div className="tip active">{t("msg_AmountFormatTip")}</div>
					<div className="listHeader">
						<div>{t("lbl_NO")}</div>
						<div>{t("lbl_Date")} (+07:00)</div>
						<div>{t("lbl_ID")}</div>
						<div>{t("lbl_Method")}</div>
						<div>{t("lbl_Amount")}</div>
						<div>{t("lbl_Status")}</div>
						<div>
							{t("lbl_Action")}
							<ReloadSpin
								func={updateHistoryList.bind(
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
						<div className="nodata">{t("msg_NoData")}</div>
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
