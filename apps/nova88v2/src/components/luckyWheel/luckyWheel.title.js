import React, { memo } from "react";
import PropTypes from "prop-types";

const LuckyWheelTitle = ({ t }) => {
	return (
		<div className="eventTitleBg">
			<div className="eventTitle">{t("luckyWheel.lbl_title")}</div>
		</div>
	);
};

LuckyWheelTitle.propTypes = {
	t: PropTypes.func.isRequired
};

export default memo(LuckyWheelTitle);
