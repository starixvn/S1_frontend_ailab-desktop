import React from "react";
import PropTypes from "prop-types";
import AutoTranfer from "../common/autoTransfer";

const TransferHeader = ({ t }) => {
	return (
		<div className="inside-title icon icon-icon32px_Funds-transfer">
			<span>{t("lbl_TransferFunds")}</span>
			<AutoTranfer />
		</div>
	);
};

export default TransferHeader;

TransferHeader.propTypes = {
	t: PropTypes.func.isRequired
};
