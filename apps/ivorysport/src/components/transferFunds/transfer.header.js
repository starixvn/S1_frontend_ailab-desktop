import React from "react";
import PropTypes from "prop-types";
import AutoTransfer from "../common/autoTransfer";

const TransferHeader = ({ t }) => (
	<div className="inside-title">
		<span className="icon icon-icon32px_Funds-transfer">
			{t("lbl_TransferFunds")}
		</span>
		<AutoTransfer />
	</div>
);

export default TransferHeader;

TransferHeader.propTypes = {
	t: PropTypes.func.isRequired
};
