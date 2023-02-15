import React, { Children, useContext } from "react";
import PropTypes from "prop-types";
import defPopBoxType from "../common/defPopBoxType";
import { defWithdrawalStatusClassName, defDepositStatusClassName } from "./def";
import { popBoxContext } from "../common/context";

const createUuid = () => {
	let dt = new Date().getTime();
	const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
		// eslint-disable-next-line no-bitwise
		const r = (dt + Math.random() * 16) % 16 | 0;
		dt = Math.floor(dt / 16);
		// eslint-disable-next-line no-bitwise
		return (c === "x" ? r : (r && 0x3) | 0x8).toString(16);
	});
	return uuid;
};

const HistoryTable = ({ t, dataSource, columns, children, selectedTagId }) => {
	const { setPopBox } = useContext(popBoxContext);
	const header = columns?.map(colItem => {
		if (!colItem.dataIndex) return null;

		return <div key={`history-header-${colItem.key}`}>{colItem.title}</div>;
	});

	const body = dataSource?.map((item, index) => (
		<div key={`history-table-${createUuid()}`}>
			{selectedTagId === "withdrawal"
				? columns?.map(colItem => {
						const handleClickInfoBtn = () => {
							setPopBox({
								isOpen: true,
								transId: item.transId,
								withdrawalMessageDetail:
									item.withdrawalMessageDetail,
								popBoxType: defPopBoxType.WithdrawalMsg
							});
						};

						if (
							colItem.dataIndex &&
							(Object.keys(item).includes(colItem.dataIndex) ||
								Object.keys(colItem).includes("render"))
						) {
							if (colItem.dataIndex === "status") {
								return (
									<div
										className={
											defWithdrawalStatusClassName[
												item.status
											]
										}>
										{t(
											`lbl_WithdrawalStatus${item.status}`
										)}
										{item.withdrawalMessageDetail &&
										item.withdrawalMessageDetail.length >
											0 ? (
											<button
												className="infobtn"
												onClick={handleClickInfoBtn}
											/>
										) : null}
									</div>
								);
							}
							if (typeof colItem.render === "function") {
								return (
									<div key={`key-${colItem.key}`}>
										{colItem.render(item, index)}
									</div>
								);
							}
							return (
								<div key={`key-${colItem.key}`}>
									{item[colItem.dataIndex] ?? null}
								</div>
							);
						}
						return null;
				  })
				: columns?.map(colItem => {
						const handleClickInfoBtn = () => {
							setPopBox({
								isOpen: true,
								transId: item.transId,
								depositMessageDetail: item.depositMessageDetail,
								popBoxType: defPopBoxType.DepositMsg
							});
						};
						if (
							colItem.dataIndex &&
							(Object.keys(item).includes(colItem.dataIndex) ||
								Object.keys(colItem).includes("render"))
						) {
							if (colItem.dataIndex === "status") {
								return (
									<div
										className={
											defDepositStatusClassName[
												item.status
											]
										}>
										{t(`lbl_DepositStatus${item.status}`)}
										{item.depositMessageDetail &&
										item.depositMessageDetail.length > 0 ? (
											<button
												className="infobtn"
												onClick={handleClickInfoBtn}
											/>
										) : null}
									</div>
								);
							}
							if (typeof colItem.render === "function") {
								return (
									<div key={`key-${colItem.key}`}>
										{colItem.render(item, index)}
									</div>
								);
							}
							return (
								<div key={`key-${colItem.key}`}>
									{item[colItem.dataIndex] ?? null}
								</div>
							);
						}
						return null;
				  })}
		</div>
	));

	const childrenCount = Children.count(children);
	const tableDatasCount = Children.count(body);

	return (
		<div className="list history">
			{tableDatasCount > 0 && (
				<>
					<div className="listHeader">{header}</div>
					<div className="listBody">{body}</div>
				</>
			)}

			{children}

			{tableDatasCount <= 0 && childrenCount <= 0 && (
				<div className="nodata icon icon-nodata">
					<div>{t("lbl_NoData")}</div>
				</div>
			)}
		</div>
	);
};

HistoryTable.defaultProps = {
	dataSource: [],
	columns: [],
	children: null
};

HistoryTable.propTypes = {
	t: PropTypes.func.isRequired,
	dataSource: PropTypes.arrayOf(PropTypes.any),
	columns: PropTypes.arrayOf(PropTypes.any),
	children: PropTypes.node,
	selectedTagId: PropTypes.string.isRequired
};

const CustomizeRow = ({ children }) => children;

HistoryTable.CustomizeRow = CustomizeRow;

export default HistoryTable;
