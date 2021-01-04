import React, { useState, useContext, useEffect, useRef } from "react";
import { navigate, useLocation } from "@reach/router";
import { useTranslation } from "react-i18next";
import moment from "moment";
import path from "../../router";
import {
	userInfoContext,
	loadingContext
} from "../../components/common/context";
import usePopBox from "../../components/hook/usePopBox";
import {
	isConvert,
	number_format,
	getUrlParameter,
	routerFlattenToPath
} from "../../components/common/common";

import { dateTimeFormater } from "./helper";
import StatementTitle from "./statement.title";
import { Breadcrumb } from "../../components/common/breadcrumb";
import StatementSearchBox, {
	defPageSize,
	quickPickList
} from "./statement.searchBox";
import StatementTable from "./statement.table";
import { Pagination } from "../../components/common/pagination";
import {
	api_payment_CustTpBetRecordListDateRange,
	api_payment_GetCustTpBetRecordListOneDay
} from "../../service/api/payment";

export default () => {
	const { t } = useTranslation();
	const location = useLocation();
	const { errorPopBox } = usePopBox();

	const isMountedRef = useRef(null);

	const originQuickPickType = Number(getUrlParameter("quickpicktype"));
	const [initStartDate, initEndDate] = dateTimeFormater(
		quickPickList[originQuickPickType].displayKey
	);

	const [listDateInfo, setListDateInfo] = useState({
		StartDate: initStartDate,
		EndDate: initEndDate,
		PageNumber: 1,
		PageSize: defPageSize
	});
	const [totalPage, setTotalPage] = useState(0);
	const [recordListDateDatas, setRecordListDateDatas] = useState(null);
	const [quickPickType, setQuickPickType] = useState(originQuickPickType);

	const { userInfo } = useContext(userInfoContext);
	const { loading, setLoading } = useContext(loadingContext);

	const currentlyDisplayKey = quickPickList[quickPickType].displayKey;

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		navigate(`${location.pathname}?quickpicktype=${quickPickType}`);
		getDatas();
	}, []);

	const setCurrentDate = id => {
		let currentlyDisplayKey = quickPickList[id].displayKey;
		const [StartDate, EndDate] = dateTimeFormater(currentlyDisplayKey);

		setListDateInfo(prev => ({
			...prev,
			StartDate,
			EndDate
		}));
	};

	const onSetQuickPickType = id => {
		setCurrentDate(id);
		setQuickPickType(id);
	};

	const onChangeCurrentPage = page => {
		setListDateInfo(prev => ({
			...prev,
			PageNumber: page
		}));
		getCustTpBetRecordListDateRange(page);
	};

	const onRoutePush = value => {
		let formatDate = moment(value.settledDate).format("YYYY-MM-DD");

		const toByCategoryWithoutDay = `/${
			userInfo.langId
		}/${routerFlattenToPath(
			path.statement,
			4
		)}?quickpicktype=${quickPickType}&categorysettleddate=${formatDate}&categoryid=${
			value.categoryId
		}`.replace(`/${path.statement.sub.quickPick.sub.byday.root}`, "");

		const toByDay = `/${userInfo.langId}/${routerFlattenToPath(
			path.statement,
			3
		)}?quickpicktype=${quickPickType}&bydaysettleddate=${formatDate}`;

		if (
			currentlyDisplayKey === "lbl_YesterDay" ||
			currentlyDisplayKey === "lbl_Today"
		)
			return navigate(toByCategoryWithoutDay);

		return navigate(toByDay);
	};

	const getDatas = () => {
		navigate(`${location.pathname}?quickpicktype=${quickPickType}`);

		if (
			currentlyDisplayKey === "lbl_YesterDay" ||
			currentlyDisplayKey === "lbl_Today"
		)
			return getCustTpBetRecordListOneDay();

		return getCustTpBetRecordListDateRange();
	};

	const getCustTpBetRecordListDateRange = (pageNumber = 1) => {
		setLoading(true);
		return api_payment_CustTpBetRecordListDateRange({
			...listDateInfo,
			PageNumber: pageNumber
		}).then(
			res => {
				setLoading(false);
				if (!isMountedRef.current) return;
				if (res.data.errorCode === 0) {
					setListDateInfo(prev => ({
						...prev,
						PageNumber: pageNumber
					}));

					setRecordListDateDatas(res.data.data);
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

	const getCustTpBetRecordListOneDay = (pageNumber = 1) => {
		setLoading(true);

		return api_payment_GetCustTpBetRecordListOneDay({
			SelDate: listDateInfo.StartDate,
			PageNumber: pageNumber,
			PageSize: defPageSize
		}).then(
			res => {
				setLoading(false);
				if (!isMountedRef.current) return;
				if (res.data.errorCode === 0) {
					setListDateInfo(prev => ({
						...prev,
						PageNumber: pageNumber
					}));

					setRecordListDateDatas(res.data.data);
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
			dataIndex:
				quickPickList[originQuickPickType].displayKey ===
					"lbl_YesterDay" ||
				quickPickList[originQuickPickType].displayKey === "lbl_Today"
					? "categoryName"
					: null,
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
					<a onClick={() => onRoutePush(value)}>{t("lbl_Details")}</a>
				</div>
			)
		}
	];

	return (
		!loading && (
			<div className="infoModule">
				<StatementTitle t={t} />
				<div className="list history">
					<Breadcrumb>
						<Breadcrumb.Item>{t("lbl_QuickPick")}</Breadcrumb.Item>
					</Breadcrumb>

					<StatementSearchBox
						t={t}
						onSetQuickPickType={onSetQuickPickType}
						quickPickType={quickPickType}
						submitSearch={() => getDatas()}
					/>
					<StatementTable
						t={t}
						dataSource={recordListDateDatas}
						columns={columns}
					/>
				</div>

				<Pagination
					totalPages={totalPage}
					currentPage={listDateInfo.PageNumber}
					clickPageNumber={onChangeCurrentPage}
				/>
			</div>
		)
	);
};
