import React from "react";
import PropTypes from "prop-types";

const InitPanel = ({ t, numberOfAccount, addCryptoWallet }) => {
	return (
		<div className="walletModule">
			<div className="addBank">
				{numberOfAccount === 3 ? (
					<div className="addBankName noBank">
						<div className="icon icon-warning" />
						<div>{t("lbl_Wallet_Is_Full")}</div>
					</div>
				) : (
					<div
						className="addBankName noBank"
						onClick={addCryptoWallet}>
						<div className="icon icon-plus" />
						<div>{t("lbl_Add_Crypto_Wallet")}</div>
					</div>
				)}
				<div className="remainder">
					{t("lbl_Number_Of_Wallet")}:{numberOfAccount}/3
				</div>
				<div className="tip active">
					{t("lbl_Crypto_Wallet_Submit_Note")}
					<br />
					{t("lbl_Modification_Please_Contact_CSD")}
				</div>
			</div>
		</div>
	);
};

InitPanel.propTypes = {
	t: PropTypes.func.isRequired,
	numberOfAccount: PropTypes.number.isRequired
};

export default InitPanel;
