import React from "react";
import PropTypes from "prop-types";

import { defNav } from "./casino.def";
import { moveItem } from "../../../../../libs/common/src/lib/utils/tools";

const Nav = ({ categoryList, activeCategory, onChange, t, isProcessing }) => {
	// 將featured排序往前
	const newCategoryList = categoryList && moveItem(categoryList, 4, 1);
	const rows = newCategoryList.map(item => {
		let _key = Object.keys(item)[0];
		_key = _key.charAt(0).toUpperCase() + _key.slice(1);
		const _nav = defNav[_key];
		return (
			<div
				key={`casino-nav-${Object.keys(item)[0]}`}
				className={`slots-category-item ${
					activeCategory === Object.keys(item)[0] ? "active" : ""
				}`}
				onClick={() => {
					!isProcessing && onChange(Object.keys(item)[0]);
				}}
			>
				{t(_nav.displayKey)}
			</div>
		);
	});

	return <div className="slots-category-menu">{rows}</div>;
};
export default Nav;
Nav.propTypes = {
	categoryList: PropTypes.arrayOf(PropTypes.any).isRequired,
	activeCategory: PropTypes.string.isRequired,
	t: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	isProcessing: PropTypes.bool.isRequired
};
