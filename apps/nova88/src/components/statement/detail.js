import React, { useState, useContext, useEffect, useRef } from "react";
import { Link } from "@reach/router";
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

import { numberSumReducer } from "./helper";
import StatementTitle from "./statement.title";
import { Breadcrumb } from "../../components/common/breadcrumb";
import { defPageSize, quickPickList } from "./statement.searchBox";
import StatementTable from "./statement.table";
import { Pagination } from "../../components/common/pagination";
import { api_payment_GetCustTpBetRecordDetailListbyGameType } from "../../service/api/payment";

export default () => {
	const { t } = useTranslation();
	const { errorPopBox } = usePopBox();

	const isMountedRef = useRef(null);

	const initQuickPickType = Number(getUrlParameter("quickpicktype"));
	const initByDaySettledDate = getUrlParameter("bydaysettleddate");
	const initCategorySettledDate = getUrlParameter("categorysettleddate");
	const initCategoryId = getUrlParameter("categoryid");
	const initGameSettledDate = getUrlParameter("gamesettleddate");
	const initGameTypeId = Number(getUrlParameter("gametypeid"));

	const [detailListbyGameTypeInfo, setDetailListbyGameTypeInfo] = useState({
		SelDate: initGameSettledDate,
		gameTypeId: initGameTypeId,
		PageNumber: 1,
		PageSize: defPageSize
	});
	const [totalPage, setTotalPage] = useState(0);
	const [detailListbyGameTypeDatas, setDetailListbyGameTypeDatas] = useState(
		[]
	);

	const { userInfo } = useContext(userInfoContext);
	const { loading, setLoading } = useContext(loadingContext);

	const _isConvert = isConvert(userInfo.currencyId);
	const currentlyDisplayKey = quickPickList[initQuickPickType].displayKey;

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		getCustTpBetRecordDetailListbyGameType();
	}, []);

	const onChangeCurrentPage = page => {
		setDetailListbyGameTypeInfo(prev => ({
			...prev,
			PageNumber: page
		}));
		getCustTpBetRecordDetailListbyGameType(page);
	};

	const getCustTpBetRecordDetailListbyGameType = (pageNumber = 1) => {
		setLoading(true);
		return api_payment_GetCustTpBetRecordDetailListbyGameType({
			...detailListbyGameTypeInfo,
			PageNumber: pageNumber
		}).then(
			res => {
				setLoading(false);
				if (!isMountedRef.current) return;
				if (res.data.errorCode === 0) {
					setDetailListbyGameTypeInfo(prev => ({
						...prev,
						PageNumber: pageNumber
					}));

					setDetailListbyGameTypeDatas(res.data.data);
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
			title: t("lbl_TransId"),
			dataIndex: "transId",
			key: "transId"
		},
		{
			title: t("lbl_BonusId"),
			dataIndex: "bonusId",
			key: "bonusId"
		},
		{
			title: t("lbl_BonusCode"),
			dataIndex: "bonusCode",
			key: "bonusCode"
		},
		{
			title: t("lbl_TurnOver"),
			dataIndex: "turnOver",
			key: "turnOver",
			render: value => number_format(value.turnOver, _isConvert)
		},
		{
			title: t("lbl_ValidBet"),
			dataIndex: "validBet",
			key: "validBet",
			render: value => number_format(value.validBet, _isConvert)
		},
		{
			title: t("lbl_WinlostAmount"),
			dataIndex: "winlostAmount",
			key: "winlostAmount",
			render: value => number_format(value.winlostAmount, _isConvert)
		},
		{
			title: t("lbl_TransTime"),
			dataIndex: "transTime",
			key: "transTime",
			render: value => moment(value).format("YYYY-MM-DD hh:mm:ss")
		},
		{
			title: t("lbl_SettledTime"),
			dataIndex: "settledTime",
			key: "settledTime",
			render: value => moment(value).format("YYYY-MM-DD hh:mm:ss")
		}
	];

	let turnOverTotal = number_format(
		numberSumReducer(detailListbyGameTypeDatas, "turnOver"),
		_isConvert
	);

	let winlostAmountTotal = number_format(
		numberSumReducer(detailListbyGameTypeDatas, "winlostAmount"),
		_isConvert
	);

	return (
		!loading && (
			<div className="infoModule">
				<StatementTitle t={t} />

				<StatementBreadcrumb
					t={t}
					userInfo={userInfo}
					initCategoryId={initCategoryId}
					initQuickPickType={initQuickPickType}
					initByDaySettledDate={initByDaySettledDate}
					initCategorySettledDate={initCategorySettledDate}
					currentlyDisplayKey={currentlyDisplayKey}
				/>

				<StatementTable
					t={t}
					dataSource={detailListbyGameTypeDatas}
					columns={columns}>
					<StatementTable.CustomizeRow>
						<div className="total">
							{t("lbl_TurnOverTotal")}：
							<span>{turnOverTotal}</span>
							&nbsp;&nbsp; {t("lbl_WinlostAmountTotal")}：
							<span>{winlostAmountTotal}</span>
						</div>
					</StatementTable.CustomizeRow>
				</StatementTable>

				<Pagination
					totalPages={totalPage}
					currentPage={detailListbyGameTypeInfo.PageNumber}
					clickPageNumber={onChangeCurrentPage}
				/>
			</div>
		)
	);
};

const StatementBreadcrumb = ({
	t,
	userInfo,
	initCategoryId,
	initQuickPickType,
	initByDaySettledDate,
	initCategorySettledDate,
	currentlyDisplayKey
}) => {
	const toByQuickPick = `/${userInfo.langId}/${routerFlattenToPath(
		path.statement,
		2
	)}?quickpicktype=${initQuickPickType}`;

	const toByCategoryWithoutDay = `/${userInfo.langId}/${routerFlattenToPath(
		path.statement,
		4
	)}?quickpicktype=${initQuickPickType}&bydaysettleddate=${initByDaySettledDate}&categorysettleddate=${initCategorySettledDate}&categoryid=${initCategoryId}`.replace(
		`/${path.statement.sub.quickPick.sub.byday.root}`,
		""
	);

	const toByDay = `/${userInfo.langId}/${routerFlattenToPath(
		path.statement,
		3
	)}?quickpicktype=${initQuickPickType}&bydaysettleddate=${initByDaySettledDate}`;

	const toByCategory = `/${userInfo.langId}/${routerFlattenToPath(
		path.statement,
		4
	)}?quickpicktype=${initQuickPickType}&bydaysettleddate=${initByDaySettledDate}&categorysettleddate=${initCategorySettledDate}&categoryid=${initCategoryId}`;

	return (
		<Breadcrumb>
			<Breadcrumb.Item>
				<Link to={toByQuickPick}>{t("lbl_QuickPick")}</Link>
			</Breadcrumb.Item>

			{currentlyDisplayKey === "lbl_YesterDay" ||
			currentlyDisplayKey === "lbl_Today" ? (
				<>
					<Breadcrumb.Item>
						<Link to={toByCategoryWithoutDay}>
							{t("lbl_Category")}
						</Link>
					</Breadcrumb.Item>
				</>
			) : (
				<>
					<Breadcrumb.Item>
						<Link to={toByDay}>{t("lbl_Byday")}</Link>
					</Breadcrumb.Item>

					<Breadcrumb.Item>
						<Link to={toByCategory}>{t("lbl_Category")}</Link>
					</Breadcrumb.Item>
				</>
			)}

			<Breadcrumb.Item>{t("lbl_Detail")}</Breadcrumb.Item>
		</Breadcrumb>
	);
};
