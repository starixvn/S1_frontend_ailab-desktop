import React from "react";
import PropTypes from "prop-types";
import AutoTransfer from "../common/autoTransfer";

const TransferHeader = ({ t }) => {
	return (
		<div className="inside-title icon icon-icon32px_Funds-transfer">
			<span>{t("lbl_TransferFunds")}</span>
			<AutoTransfer />
		</div>
	);
};

export default TransferHeader;

TransferHeader.propTypes = {
	t: PropTypes.func.isRequired
};
