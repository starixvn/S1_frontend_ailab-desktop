import React from "react";
import PropTypes from "prop-types";

const TransferHeader = ({ t, onChangeAutoTransfer, isAutoTransfer }) => {
	return (
		<div className="inside-title icon icon-icon32px_Funds-transfer">
			<span>{t("lbl_TransferFunds")}</span>
			<div className="swithModule">
				{t("lbl_Main_Wallet_Auto_Transfer")}
				<button
					className={`switchBtn ${isAutoTransfer ? " active" : ""}`}
					onClick={onChangeAutoTransfer}>
					<span>ON</span>
					<span>OFF</span>
					<div className={isAutoTransfer ? "active" : ""} />
				</button>
			</div>
		</div>
	);
};

export default TransferHeader;

TransferHeader.propTypes = {
	t: PropTypes.func.isRequired,
	isAutoTransfer: PropTypes.bool.isRequired,
	onChangeAutoTransfer: PropTypes.func.isRequired
};
