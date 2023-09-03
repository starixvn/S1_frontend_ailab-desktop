import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default function HistoryTagNav({
	t,
	pathname,
	defHistoryNav,
	selectedTagId,
	setSelectedTagId,
	resetPage,
	currencyId
}) {
	return (
		<div className="btnGroup historyTag">
			{defHistoryNav
				.filter(item =>
					item.allowCurrencies
						? item.allowCurrencies.includes(currencyId)
						: true
				)
				.map(item => (
					<button
						key={`history-tag-nav-${item.id}`}
						onClick={() => {
							setSelectedTagId(item.id);
							resetPage();
							window.history.replaceState(
								{},
								"",
								`${pathname}?kind=${item.id}`
							);
						}}
						className={classNames({
							active: selectedTagId === item.id
						})}>
						{t(item.displayKey)}
					</button>
				))}
		</div>
	);
}

HistoryTagNav.propTypes = {
	t: PropTypes.func.isRequired,
	pathname: PropTypes.string.isRequired,
	defHistoryNav: PropTypes.arrayOf(PropTypes.any).isRequired,
	selectedTagId: PropTypes.string.isRequired,
	setSelectedTagId: PropTypes.func.isRequired,
	resetPage: PropTypes.func.isRequired,
	currencyId: PropTypes.number.isRequired
};
