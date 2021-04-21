import React, { useEffect, useState, useRef, useContext } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { popBoxContext, userInfoContext } from "../components/common/context";
import { TransactionHistory } from "../components/depositnew/deposit.historyResult";
import { defPopBoxType } from "../components/common/popBox";
import { Pagination } from "../components/common/pagination";
import Wrapper from "../components/common/wrapper";
import Layout from "../components/common/layout";
import Filter from "../components/common/historyFilter";
import LeftMenu from "../components/common/leftMenu";
import Loading from "../components/common/loading";
import ReloadSpin from "../components/common/reloadSpin";
import {
	api_payment_GetDepositInfoHistory,
	api_payment_SetDepositCancel
} from "../service/api/payment";

import useDeposit from "../components/depositnew/hook/useDeposit";
import useDepositLocalBank from "../components/depositnew/hook/useDepositLocalBank";

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

const Content = () => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const [getHistory, setGetHistory] = useState(null);
	const [processing, setProcessing] = useState(false);
	const [filterData, setFilterData] = useState(null);
	const [keepData, setKeepData] = useState(null);
	const [pagination, setPagination] = useState({
		totalPages: 0,
		currentPage: 1
	});

	const { userInfo } = useContext(userInfoContext);

	const [loading, setLoading] = useState(false);
	const isMountedRef = useRef(null);

	const { asyncUploadBankPopBox } = useDeposit({ isMountedRef });

	const { uploadLocalBankReceipt } = useDepositLocalBank({ isMountedRef });

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const ClickClose = () => {
		setPopBox({ isOpen: false });
	};

	const GetDepositInfoHistory = (transactionData, pageNumber) =>
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
							message: res.data.message,
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
				}
			}
		);

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
			}

			setPagination(prev => ({ ...prev, currentPage: 1 }));
			GetDepositInfoHistory(transactionData, 1);
		}
	};

	const SubmitProof = async (bankInfo, depositRep, transId, picFileName) => {
		const { bankName } = bankInfo;
		const { accountName, accountNo } = depositRep;

		const uploadPopBoxResult = await asyncUploadBankPopBox({
			formInfo: {
				imgFile: {
					name: picFileName
				}
			},
			localBankInfo: {
				bankName,
				accountNo,
				accountName,
				transId
			},
			langId: userInfo.langId
		});

		if (uploadPopBoxResult.success) {
			const {
				datas: { depositImgFiles }
			} = uploadPopBoxResult;

			if (!depositImgFiles.file) return;

			await uploadLocalBankReceipt({
				imgFile: depositImgFiles.file,
				transId
			});

			updateHistoryList(filterData?.StartDate, filterData?.EndDate, true);
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
						}
						setLoading(false);
					}
				},
				err => {
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

	const arr = getHistory?.map((item, i) => {
		return (
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
					item.transId,
					item.picFileName
				)}
			/>
		);
	});

	return loading ? (
		<Loading />
	) : (
		<div className="infoModule">
			<div className="inside-title icon icon-icon32px_History">
				<span>{t("lbl_DepositHistory")}</span>
			</div>
			<Filter submitHandler={updateHistoryList} keepData={keepData} />

			{getHistory ? (
				<div className="list history">
					<div className="tip active">{t("msg_AmountFormatTip")}</div>
					<div className="listHeader">
						<div>{t("lbl_NO")}</div>
						<div>
							{t("lbl_Date")} ({moment().format("Z")})
						</div>
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
