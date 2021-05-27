import React, { Children } from "react";
import PropTypes from "prop-types";

const createUuid = () => {
	let dt = new Date().getTime();
	const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
		/[xy]/g,
		function (c) {
			// eslint-disable-next-line no-bitwise
			const r = (dt + Math.random() * 16) % 16 | 0;
			dt = Math.floor(dt / 16);
			// eslint-disable-next-line no-bitwise
			return (c == "x" ? r : (r && 0x3) | 0x8).toString(16);
		}
	);
	return uuid;
};

const HistoryTable = ({ t, dataSource, columns, children }) => {
	const header = columns?.map(colItem => {
		if (!colItem.dataIndex) return null;

		return <div key={`history-header-${colItem.key}`}>{colItem.title}</div>;
	});

	const body = dataSource?.map((item, index) => {
		console.log(dataSource);
		return (
			<div key={`history-table-${createUuid()}`}>
				{columns?.map(colItem => {
					if (
						colItem.dataIndex &&
						(Object.keys(item).includes(colItem.dataIndex) ||
							Object.keys(colItem).includes("render"))
					)
						return typeof colItem.render === "function" ? (
							<div key={`key-${colItem.key}`}>
								{colItem.render(item, index)}
							</div>
						) : (
							<div key={`key-${colItem.key}`}>
								{item[colItem.dataIndex]}
							</div>
						);

					return null;
				})}
			</div>
		);
	});

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
	columns: []
};

HistoryTable.propTypes = {
	t: PropTypes.func.isRequired,
	dataSource: PropTypes.arrayOf(PropTypes.any),
	columns: PropTypes.arrayOf(PropTypes.any)
};

const CustomizeRow = ({ children }) => children;

HistoryTable.CustomizeRow = CustomizeRow;

export default HistoryTable;
