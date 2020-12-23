import React, { useState, useContext, useEffect, useRef } from "react";
import { navigate, Link } from "@reach/router";
import { useTranslation } from "react-i18next";
import moment from "moment";
import path from "../../router";
import {
	userInfoContext,
	loadingContext
} from "../../components/common/context";
import usePopBox from "../../components/hook/usePopBox";
import {
	number_format,
	getUrlParameter,
	routerFlattenToPath
} from "../../components/common/common";

import StatementTitle from "./statement.title";
import { Breadcrumb } from "../../components/common/breadcrumb";
import { defPageSize } from "./statement.searchBox";
import StatementTable from "./statement.table";
import { Pagination } from "../../components/common/pagination";
import { api_payment_GetCustTpBetRecordListOneDay } from "../../service/api/payment";

export default () => {
	const { t } = useTranslation();
	const { errorPopBox } = usePopBox();

	const isMountedRef = useRef(null);

	const initQuickPickType = Number(getUrlParameter("quickpicktype"));
	const initSettledDatebyday = getUrlParameter("bydaysettleddate");

	const [recordListOneDayInfo, setRecordListOneDayInfo] = useState({
		SelDate: initSettledDatebyday,
		PageNumber: 1,
		PageSize: defPageSize
	});
	const [totalPage, setTotalPage] = useState(0);
	const [recordListOneDayDatas, setRecordListOneDayDatas] = useState(null);

	const { userInfo } = useContext(userInfoContext);
	const { loading, setLoading } = useContext(loadingContext);

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		getCustTpBetRecordListOneDay();
	}, []);

	const onChangeCurrentPage = page => {
		setRecordListOneDayInfo(prev => ({
			...prev,
			PageNumber: page
		}));
		getCustTpBetRecordListOneDay(page);
	};

	const onRoutePush = ({ categorySettledDate, categoryId }) => {
		let formatDate = moment(categorySettledDate).format("YYYY-MM-DD");

		let toByCategory = `/${userInfo.langId}/${routerFlattenToPath(
			path.statement,
			4
		)}?quickpicktype=${initQuickPickType}&bydaysettleddate=${
			recordListOneDayInfo.SelDate
		}&categorysettleddate=${formatDate}&categoryid=${categoryId}`;

		navigate(toByCategory);
	};

	const getCustTpBetRecordListOneDay = (pageNumber = 1) => {
		setLoading(true);
		return api_payment_GetCustTpBetRecordListOneDay({
			...recordListOneDayInfo,
			PageNumber: pageNumber
		}).then(
			res => {
				setLoading(false);
				if (!isMountedRef.current) return;
				if (res.data.errorCode === 0) {
					setRecordListOneDayInfo(prev => ({
						...prev,
						PageNumber: pageNumber
					}));

					setRecordListOneDayDatas(res.data.data);
					setTotalPage(res.data.totalPages);
				} else
					errorPopBox(
						res.data.message || "error",
						res.data.errorCode
					);
			},
			() => {
				setLoading(false);
				if (!isMountedRef.current) return;
				errorPopBox();
			}
		);
	};

	const columns = [
		{
			title: t("lbl_SettledDate"),
			dataIndex: "settledDate",
			key: "settledDate",
			render: value => moment(value.settledDate).format("YYYY-MM-DD")
		},
		{
			title: t("lbl_CategoryName"),
			dataIndex: "categoryName",
			key: "categoryName"
		},
		{
			title: t("lbl_TurnOver"),
			dataIndex: "turnOver",
			key: "turnOver",
			render: value => number_format(value.turnOver)
		},
		{
			title: t("lbl_ValidBet"),
			dataIndex: "validBet",
			key: "validBet",
			render: value => number_format(value.validBet)
		},
		{
			title: t("lbl_WinlostAmount"),
			dataIndex: "winlostAmount",
			key: "winlostAmount",
			render: value => number_format(value.winlostAmount)
		},
		{
			title: t("lbl_Action"),
			dataIndex: "action",
			key: "action",
			render: value => (
				<div>
					<a
						onClick={() =>
							onRoutePush({
								categorySettledDate: value.settledDate,
								categoryId: value.categoryId
							})
						}>
						{t("lbl_Details")}
					</a>
				</div>
			)
		}
	];

	const toByQuickPick = `/${userInfo.langId}/${routerFlattenToPath(
		path.statement,
		2
	)}?quickpicktype=${initQuickPickType}`;

	return (
		!loading && (
			<div className="infoModule">
				<StatementTitle t={t} />
				<div className="list history">
					<Breadcrumb>
						<Breadcrumb.Item>
							<Link to={toByQuickPick}>{t("lbl_QuickPick")}</Link>
						</Breadcrumb.Item>
						<Breadcrumb.Item>{t("lbl_Byday")}</Breadcrumb.Item>
					</Breadcrumb>

					<StatementTable
						t={t}
						dataSource={recordListOneDayDatas}
						columns={columns}
					/>
				</div>

				<Pagination
					totalPages={totalPage}
					currentPage={recordListOneDayInfo.PageNumber}
					clickPageNumber={onChangeCurrentPage}
				/>
			</div>
		)
	);
};
