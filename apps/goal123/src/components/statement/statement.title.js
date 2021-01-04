import React from "react";
import PropTypes from "prop-types";

const StatementTitle = ({ t }) => {
	return (
		<div className="inside-title icon icon-icon32px_History">
			<span>{t("lbl_Statement")}</span>
		</div>
	);
};

StatementTitle.propTypes = {
	t: PropTypes.func.isRequired
};

export default StatementTitle;
