import React from "react";
import PropTypes from "prop-types";

const StatementTable = ({ t, dataSource, columns, children }) => {
	const header = columns.map(colItem => {
		if (!colItem.dataIndex) return null;

		const zone =
			colItem.key === "settledDate" || colItem.key === "settledTime"
				? "(+07:00)"
				: "";
		return <div key={colItem.key}>{`${colItem.title} ${zone}`}</div>;
	});

	const body = dataSource?.map(item => (
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
	));

	return (
		<>
			<div className="list history">
				<div className="listHeader">{header}</div>
				<div className="listBody">{body}</div>

				{children}
			</div>

			{Array.isArray(dataSource) && !dataSource.length && (
				<div className="list history">
					<div className="nodata icon icon-nodata">
						{t("lbl_NoData")}
					</div>
				</div>
			)}
		</>
	);
};

StatementTable.defaultProps = {
	dataSource: [],
	children: null
};

StatementTable.propTypes = {
	t: PropTypes.func.isRequired,
	dataSource: PropTypes.arrayOf(PropTypes.any),
	columns: PropTypes.arrayOf(PropTypes.any).isRequired,
	children: PropTypes.node
};

// eslint-disable-next-line react/jsx-no-useless-fragment
const CustomizeRow = ({ children }) => <>{children}</>;

StatementTable.CustomizeRow = CustomizeRow;

CustomizeRow.propTypes = {
	children: PropTypes.node.isRequired
};

export default StatementTable;
