import React from "react";
import PropTypes from "prop-types";

const BatListTitle = ({ t }) => (
	<div className="inside-title">
		<span className="icon icon-icon32px_History">{t("lbl_Statement")}</span>
	</div>
);

BatListTitle.propTypes = {
	t: PropTypes.func.isRequired
};

export default BatListTitle;
