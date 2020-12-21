import React from "react";
import PropTypes from "prop-types";

const BatListTitle = ({ t }) => {
	return (
		<div className="inside-title icon icon-icon32px_History">
			<span>{t("lbl_Statement")}</span>
		</div>
	);
};

BatListTitle.propTypes = {
	t: PropTypes.func.isRequired
};

export default BatListTitle;
