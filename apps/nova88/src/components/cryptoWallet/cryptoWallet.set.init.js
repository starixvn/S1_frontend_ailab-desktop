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
				{numberOfAccount < 3 ? (
					<div className="addBankName noBank" onClick={toNextStep}>
						<div className="icon icon-plus" />
						<div>{t("lbl_AddCryptoWallet")}</div>
					</div>
				) : (
					<div className="addBankName noBank">
						<div className="icon icon-warning" />
						<div>{t("lbl_WalletisFull")}</div>
					</div>
				)}

				<div className="remainder">
					{t("lbl_NumberOfWallet")}: {numberOfAccount || 0}/3
				</div>
			</div>
		</div>
	);
};
