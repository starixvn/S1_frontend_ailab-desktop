import React from "react";
import PropTypes from "prop-types";

const TransferHeader = ({ t, onChangeAutoTransfer, isAutoTransfer }) => {
	return (
		<div className="inside-title icon icon-icon32px_Funds-transfer">
			<span>{t("lbl_TransferFunds")}</span>
			<div className="checkbox autotransfer">
				<input
					id="auto-transfer"
					type="checkbox"
					onChange={onChangeAutoTransfer}
					checked={isAutoTransfer}
				/>
				<label
					htmlFor="auto-transfer"
					className="icon icon-checkbox-checked"
				/>
				{t("lbl_Main_Wallet_Auto_Transfer")}
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
