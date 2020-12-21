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
	isConvert,
	number_format,
	getUrlParameter,
	routerFlattenToPath
} from "../../components/common/common";

import StatementTitle from "./statement.title";
import { Breadcrumb } from "../../components/common/breadcrumb";
import { defPageSize, quickPickList } from "./statement.searchBox";
import StatementTable from "./statement.table";
import { Pagination } from "../../components/common/pagination";

import { api_payment_GetCustTpBetRecordListbyCategoryId } from "../../service/api/payment";

export default () => {
	const { t } = useTranslation();
	const { errorPopBox } = usePopBox();

	const isMountedRef = useRef(null);

	const initQuickPickType = Number(getUrlParameter("quickpicktype"));
	const initByDaySettledDate = getUrlParameter("bydaysettleddate");
	const initCategorySettledDate = getUrlParameter("categorysettleddate");
	const initCategoryId = Number(getUrlParameter("categoryid"));

	const [recordListbyCategoryInfo, setRecordListbyCategoryInfo] = useState({
		SelDate: initCategorySettledDate,
		CategoryId: initCategoryId,
		PageNumber: 1,
		PageSize: defPageSize
	});
	const [totalPage, setTotalPage] = useState(0);
	const [recordListbyCategoryDatas, setRecordListbyCategoryDatas] = useState(
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
		getCustTpBetRecordListbyCategoryId();
	}, []);

	const onChangeCurrentPage = page => {
		setRecordListbyCategoryInfo(prev => ({
			...prev,
			PageNumber: page
		}));
		getCustTpBetRecordListbyCategoryId(page);
	};

	const onRoutePush = ({ gameSettledDate, gameTypeId }) => {
		let formatDate = moment(gameSettledDate).format("YYYY-MM-DD");

		const toByDetailWithoutDay = `/${userInfo.langId}/${routerFlattenToPath(
			path.statement,
			5
		)}?quickpicktype=${initQuickPickType}&categorysettleddate=${initCategorySettledDate}&categoryid=${initCategoryId}&gamesettleddate=${formatDate}&gametypeid=${gameTypeId}`.replace(
			`/${path.statement.sub.quickPick.sub.byday.root}`,
			""
		);

		const toByDetail = `/${userInfo.langId}/${routerFlattenToPath(
			path.statement,
			5
		)}?quickpicktype=${initQuickPickType}&bydaysettleddate=${initByDaySettledDate}&categorysettleddate=${initCategorySettledDate}&categoryid=${initCategoryId}&gamesettleddate=${formatDate}&gametypeid=${gameTypeId}`;

		if (
			currentlyDisplayKey === "lbl_YesterDay" ||
			currentlyDisplayKey === "lbl_Today"
		)
			return navigate(toByDetailWithoutDay);

		return navigate(toByDetail);
	};

	const getCustTpBetRecordListbyCategoryId = (pageNumber = 1) => {
		setLoading(true);
		return api_payment_GetCustTpBetRecordListbyCategoryId({
			...recordListbyCategoryInfo,
			PageNumber: pageNumber
		}).then(
			res => {
				setLoading(false);
				if (!isMountedRef.current) return;
				if (res.data.errorCode === 0) {
					setRecordListbyCategoryInfo(prev => ({
						...prev,
						PageNumber: pageNumber
					}));

					setRecordListbyCategoryDatas(res.data.data);
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
			title: t("lbl_GameTypeName"),
			dataIndex: "gameTypeName",
			key: "gameTypeName"
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
			title: t("lbl_Action"),
			dataIndex: "action",
			key: "action",
			render: value => (
				<div>
					<a
						onClick={() =>
							onRoutePush({
								gameSettledDate: value.settledDate,
								gameTypeId: value.gameTypeID
							})
						}>
						{t("lbl_Details")}
					</a>
				</div>
			)
		}
	];

	return (
		!loading && (
			<div className="infoModule">
				<StatementTitle t={t} />
				<div className="list history">
					<StatementBreadcrumb
						t={t}
						userInfo={userInfo}
						initQuickPickType={initQuickPickType}
						initByDaySettledDate={initByDaySettledDate}
						currentlyDisplayKey={currentlyDisplayKey}
					/>

					<StatementTable
						t={t}
						dataSource={recordListbyCategoryDatas}
						columns={columns}
					/>
				</div>

				<Pagination
					totalPages={totalPage}
					currentPage={recordListbyCategoryInfo.PageNumber}
					clickPageNumber={onChangeCurrentPage}
				/>
			</div>
		)
	);
};

const StatementBreadcrumb = ({
	t,
	userInfo,
	initQuickPickType,
	initByDaySettledDate,
	currentlyDisplayKey
}) => {
	const toByQuickPick = `/${userInfo.langId}/${routerFlattenToPath(
		path.statement,
		2
	)}?quickpicktype=${initQuickPickType}`;

	const toByDay = `/${userInfo.langId}/${routerFlattenToPath(
		path.statement,
		3
	)}?quickpicktype=${initQuickPickType}&bydaysettleddate=${initByDaySettledDate}`;
	return (
		<Breadcrumb>
			<Breadcrumb.Item>
				<Link to={toByQuickPick}>{t("lbl_QuickPick")}</Link>
			</Breadcrumb.Item>

			{currentlyDisplayKey === "lbl_YesterDay" ||
			currentlyDisplayKey === "lbl_Today" ? null : (
				<Breadcrumb.Item>
					<Link to={toByDay}>{t("lbl_Byday")}</Link>
				</Breadcrumb.Item>
			)}

			<Breadcrumb.Item>{t("lbl_Category")}</Breadcrumb.Item>
		</Breadcrumb>
	);
};
