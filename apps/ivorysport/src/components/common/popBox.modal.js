import React from "react";
import PropTypes from "prop-types";

const PopBoxModule = ({ content, className, ...rest }) => {
	return (
		<div className="pop">
			<div className="Success active">{content}</div>
		</div>
	);
};

export default PopBoxModule;

PopBoxModule.defaultProps = {
	content: null
};

PopBoxModule.propTypes = {
	content: PropTypes.node
};
