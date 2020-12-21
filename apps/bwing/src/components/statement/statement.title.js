import React from "react";
import PropTypes from "prop-types";

const BatListTitle = ({ t }) => {
	return <div className="inside-title">{t("lbl_Statement")}</div>;
};

BatListTitle.propTypes = {
	t: PropTypes.func.isRequired
};

export default BatListTitle;
