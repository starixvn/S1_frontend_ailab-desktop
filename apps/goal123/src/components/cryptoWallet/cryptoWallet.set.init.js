import React, { useState } from "react";
import PropTypes from "prop-types";

const MAX_LIMIT = 3;

const InitPanel = ({ t, numberOfAccount, addCryptoWallet }) => {
	const [showTip, setShowTip] = useState(false);

	const clickTip = () => setShowTip(!showTip);

	const isFull = numberOfAccount === MAX_LIMIT;

	const onAddCryptoWallet = () => {
		if (isFull) return;

		addCryptoWallet();
	};

	const AddButtonText = isFull
		? t("lbl_Wallet_Is_Full")
		: t("lbl_Add_Crypto_Wallet");

	const tipClassName = ["tip", "blue", showTip && "active"]
		.filter(Boolean)
		.join(" ");

	return (
		<div className="walletModule">
			<div className="addBank">
				<div className="addBankName noBank" onClick={onAddCryptoWallet}>
					{!isFull && <div className="icon icon-plus" />}

					<div className="txt-yellow">{AddButtonText}</div>
				</div>

				<div className="remainder">
					{t("lbl_NumberOfBankAccounts")}: {numberOfAccount}/3
					<i className="icon icon-error" onClick={clickTip} />
				</div>

				<div className={tipClassName}>
					{t("lbl_Crypto_Wallet_Submit_Note")}
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
