import React from "react";
import PropTypes from "prop-types";

import { defNav } from "./casino.def";

const Nav = ({ categoryList, activeCategory, onChange, t, isProcessing }) => {
	const rows = categoryList.map(item => {
		let _key = Object.keys(item)[0];
		_key = _key.charAt(0).toUpperCase() + _key.slice(1);
		const _nav = defNav[_key];
		return (
			<button
				key={`casino-nav-${Object.keys(item)[0]}`}
				className={
					activeCategory === Object.keys(item)[0]
						? "btn-check"
						: "blueBorder"
				}
				onClick={() => {
					!isProcessing && onChange(Object.keys(item)[0]);
				}}
			>
				{t(_nav.displayKey)}
			</button>
		);
	});

	return <div className="btnGroup promoType">{rows}</div>;
};
export default Nav;
Nav.propTypes = {
	categoryList: PropTypes.arrayOf(PropTypes.any).isRequired,
	activeCategory: PropTypes.string.isRequired,
	t: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	isProcessing: PropTypes.bool.isRequired
};
