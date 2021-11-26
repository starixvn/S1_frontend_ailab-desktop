import React from "react";
import PropTypes from "prop-types";

const InitPanel = ({ t, numberOfAccount, addCryptoWallet }) => {
	if (numberOfAccount === 3) return null;

	return (
		<div className="walletModule">
			<div className="addBank bankselect">
				<div className="btnGroup">
					<button onClick={addCryptoWallet} className="btn-check">
						{t("lbl_Add_Crypto_Wallet")}
					</button>
				</div>
			</div>
		</div>
	);
};

InitPanel.propTypes = {
	t: PropTypes.func.isRequired,
	numberOfAccount: PropTypes.number.isRequired,
	addCryptoWallet: PropTypes.func.isRequired
};

export default InitPanel;
