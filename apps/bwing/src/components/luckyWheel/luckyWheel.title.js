import React, { memo } from "react";
import PropTypes from "prop-types";

const LuckyWheelTitle = ({ t }) => {
	return <div className="title">{t("lbl_LuckyWheel_title")}</div>;
};

LuckyWheelTitle.propTypes = {
	t: PropTypes.func.isRequired
};

export default memo(LuckyWheelTitle);
