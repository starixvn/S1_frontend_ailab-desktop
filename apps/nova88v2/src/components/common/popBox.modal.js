import React from "react";
import PropTypes from "prop-types";
import useClickOutSide from "../hook/useClickOutSide";

const PopBoxModule = ({ icon, title, closePopBox, content }) => {
	const ref = useClickOutSide(() => closePopBox());

	return (
		<div ref={ref} className="Success active">
			{icon && <div className={`icon ${icon}`} />}

			{title && <div className="title">{title}</div>}

			{content}
		</div>
	);
};

export default PopBoxModule;

PopBoxModule.defaultProps = {
	icon: "",
	title: "",
	closePopBox: () => null,
	content: null
};

PopBoxModule.propTypes = {
	icon: PropTypes.string,
	title: PropTypes.string,
	closePopBox: PropTypes.func,
	content: PropTypes.node
};
