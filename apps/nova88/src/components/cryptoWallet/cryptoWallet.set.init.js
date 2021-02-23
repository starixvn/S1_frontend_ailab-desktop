import React from "react";
import { useTranslation } from "react-i18next";
import { defActionType } from "./cryptoWallet.reducer";

export default ({ dispatch, numberOfAccount }) => {
	const { t } = useTranslation();
	const toNextStep = () => {
		dispatch({ type: defActionType.TO_NEXT_STEP });
	};

	return (
		<div className="walletModule">
			<div className="addBank">
				{numberOfAccount < 10 ? (
					<div className="addBankName noBank" onClick={toNextStep}>
						<div className="icon icon-plus" />
						<div>{t("lbl_Add_Crypto_Wallet")}</div>
					</div>
				) : (
					<div className="addBankName noBank">
						<div className="icon icon-warning" />
						<div>{t("lbl_Wallet_Is_Full")}</div>
					</div>
				)}

				<div className="remainder">
					{t("lbl_Number_Of_Wallet")}: {numberOfAccount || 0}/3
				</div>
			</div>
		</div>
	);
};
