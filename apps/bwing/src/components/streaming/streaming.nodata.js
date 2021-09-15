import React from "react";
import PropTypes from "prop-types";

import imgNotvicon from "../../styles/img/notvicon.png";

const StreamingNodata = ({ className, t }) => {
	return (
		<div className={`notv ${className}`}>
			<img src={imgNotvicon} alt="imgNotvicon" />
			<p>
				{t("lbl_Streaming_NoData1")} <br />
				{t("lbl_Streaming_NoData2")}
			</p>
		</div>
	);
};

export default StreamingNodata;

StreamingNodata.defaultProps = {
	className: ""
};

StreamingNodata.propTypes = {
	className: PropTypes.string,
	t: PropTypes.func.isRequired
};
