import React from "react";
import PropTypes from "prop-types";

const StatementTable = ({ t, dataSource, columns, children }) => {
	let header = columns.map(colItem => {
		if (!colItem.dataIndex) return null;

		return <div key={colItem.key}>{colItem.title}</div>;
	});

	let body = dataSource.map(item => {
		return (
			<div key={`key-${item.settledDate || item.settledTime}`}>
				{columns.map(colItem => {
					if (
						colItem.dataIndex &&
						(Object.keys(item).includes(colItem.dataIndex) ||
							Object.keys(colItem).includes("render"))
					)
						return typeof colItem.render === "function" ? (
							<div key={`key-${colItem.key}`}>
								{colItem.render(item)}
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

	return (
		<>
			<div className="listHeader">{header}</div>
			<div className="listBody">{body}</div>

			{children}

			{Array.isArray(dataSource) && dataSource.length ? null : (
				<div class="list history">
					<div class="nodata">{t("lbl_NoData")}</div>
				</div>
			)}
		</>
	);
};

StatementTable.propTypes = {
	t: PropTypes.func.isRequired,
	dataSource: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired
};

const CustomizeRow = ({ children }) => <>{children}</>;

StatementTable.CustomizeRow = CustomizeRow;

export default StatementTable;
