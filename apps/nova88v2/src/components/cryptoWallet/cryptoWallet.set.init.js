import React from "react";
import PropTypes from "prop-types";
import { defActionType } from "./cryptoWallet.reducer";

const InitPanel = ({ dispatch, t, numberOfAccount }) => {
	const toNextStep = () => {
		dispatch({ type: defActionType.TO_NEXT_STEP });
	};

	return (
		<div className="walletModule">
			<div className="addBank">
				{numberOfAccount === 0 ? (
					<div className="addBankName noBank" onClick={toNextStep}>
						<div className="icon icon-plus" />
						<div>{t("lbl_Add_Crypto_Wallet")}</div>
					</div>
				) : null}
				{/* <div className="remainder">
					{t("lbl_Number_Of_Wallet")}:{numberOfAccount ?? 0}/
					{numberOfAccount === 0 ? "3" : numberOfAccount}
				</div> */}
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
	dispatch: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
	numberOfAccount: PropTypes.func.isRequired
};

export default InitPanel;
