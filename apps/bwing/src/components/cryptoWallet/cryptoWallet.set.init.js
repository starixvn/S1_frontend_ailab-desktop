import React from "react";
import PropTypes from "prop-types";

const InitPanel = ({ t, numberOfAccount, addCryptoWallet }) => {
	return (
		<div className="walletModule">
			<div className="addBank bankselect">
				{numberOfAccount === 3 ? (
					<div className="addBankName noBank">
						<div className="icon icon-warning" />
						<div>{t("lbl_Wallet_Is_Full")}</div>
					</div>
				) : (
					<div className="btnGroup" onClick={addCryptoWallet}>
						<button className="btn-check">
							{t("lbl_Add_Crypto_Wallet")}
						</button>
					</div>
				)}
				<div className="txt-blue15">
					Crypto Account
					<div className="remainder">
						{t("lbl_Number_Of_Wallet")}:{numberOfAccount}/3
					</div>
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
