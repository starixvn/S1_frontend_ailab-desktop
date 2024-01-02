import React from "react";
import PropTypes from "prop-types";
import useClickOutSide from "../hook/useClickOutSide";

const PopBoxModule = ({ closePopBox, content, className }) => {
	const ref = useClickOutSide(() => closePopBox());

	return (
		<div ref={ref} className={className}>
			{content}
		</div>
	);
};

export default PopBoxModule;

PopBoxModule.defaultProps = {
	content: null,
	className: "",
	closePopBox: () => null
};

PopBoxModule.propTypes = {
	closePopBox: PropTypes.func,
	content: PropTypes.node,
	className: PropTypes.string
};
