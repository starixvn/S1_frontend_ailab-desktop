import React, { useEffect, useState, useRef, useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { popBoxContext } from "../components/common/context";
import { number_format } from "../components/common/common";
import { Pagination } from "../components/common/pagination";
import Wrapper from "../components/common/wrapper";
import { api_payment_GetStatement } from "../service/api/payment";
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
	const [loading] = useState(false);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const GetStatement = (transactionData, pageNumber) => {
		const ClickClose = () => {
			setPopBox({ isOpen: false });
		};

		api_payment_GetStatement({
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
			GetStatement(transactionData, 1);
		}
	};

	const clickPageNumber = page => {
		if (!processing) {
			setProcessing(true);
			const transactionData = filterData;
			setPagination(prev => ({ ...prev, currentPage: page }));

			GetStatement(transactionData, page);
		}
	};

	const arr = getHistory?.map((item, i) => (
		<TansactionHistory
			key={`statement-${item.refTransId}-${item.typeName}`}
			idx={i + 1}
			createTime={item.createTime}
			refTransId={item.refTransId}
			typeName={item.typeName}
			changeAmount={item.changeAmount}
			beforeAmount={item.beforeAmount}
			afterAmount={item.afterAmount}
		/>
	));

	return loading ? (
		<Loading />
	) : (
		<div className="infoModule">
			<div className="inside-title icon icon-icon32px_History">
				<span>{t("lbl_FinancialLog")}</span>
			</div>
			<Filter submitHandler={clickDateSubmit} keepData={keepData} />

			{getHistory ? (
				<div className="list history">
					<div className="tip active">{t("msg_AmountFormatTip")}</div>
					<div className="listHeader">
						<div>{t("lbl_NO")}</div>
						<div>{t("lbl_Date")} (+07:00)</div>
						<div>{t("lbl_RefTransId")}</div>
						<div>{t("lbl_TypeName")}</div>
						<div>{t("lbl_ChangeAmount")}</div>
						<div>{t("lbl_BeforeAmount")}</div>
						<div>
							{t("lbl_AfterAmount")}
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

const TansactionHistory = props => (
	<div>
		<div>{props.idx}</div>
		<div>
			{moment(props.createTime, "YYYY-MM-DDThh:mm:ssZ")
				.zone("+07:00")
				.format("DD/MM/YYYY")}
			<span className="txt-blue2">
				{moment(props.createTime, "YYYY-MM-DDThh:mm:ssZ")
					.zone("+07:00")
					.format("HH:mm:ss")}
			</span>
		</div>
		<div>{props.refTransId}</div>
		<div>{props.typeName}</div>
		<div>{number_format({ number: props.changeAmount })}</div>
		<div>{number_format({ number: props.beforeAmount })}</div>
		<div>{number_format({ number: props.afterAmount })}</div>
	</div>
);

TansactionHistory.defaultProps = {
	idx: null,
	createTime: null,
	refTransId: null,
	typeName: null,
	changeAmount: null,
	beforeAmount: null,
	afterAmount: null
};

TansactionHistory.propTypes = {
	idx: PropTypes.number,
	createTime: PropTypes.string,
	refTransId: PropTypes.string,
	typeName: PropTypes.string,
	changeAmount: PropTypes.number,
	beforeAmount: PropTypes.number,
	afterAmount: PropTypes.number
};
