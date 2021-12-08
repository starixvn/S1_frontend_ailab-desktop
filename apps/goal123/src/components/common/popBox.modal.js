import React from "react";
import PropTypes from "prop-types";
import useClickOutSide from "../hook/useClickOutSide";

const PopBoxModule = ({ closePopBox, content }) => {
	const ref = useClickOutSide(() => closePopBox());

	return <div ref={ref}>{content}</div>;
};

export default PopBoxModule;

PopBoxModule.defaultProps = {
	closePopBox: () => null,
	content: null
};

PopBoxModule.propTypes = {
	closePopBox: PropTypes.func,
	content: PropTypes.node
};
