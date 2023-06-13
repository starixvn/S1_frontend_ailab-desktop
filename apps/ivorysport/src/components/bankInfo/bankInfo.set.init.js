import React from "react";

export default ({ t, numberOfAccount, toNextStep }) => {
	return (
		<div className="walletModule">
			<div className="addBank">
				{numberOfAccount < 3 ? (
					<div className="addBankName noBank" onClick={toNextStep}>
						<div className="icon icon-plus" />
						<div>{t("lbl_AddBankAccount")}</div>
					</div>
				) : (
					<div className="addBankName noBank">
						<div className="icon icon-warning" />
						<div>{t("lbl_BankCardsFull")}</div>
					</div>
				)}

				<div className="remainder">
					{t("lbl_NumberOfBankAccounts")}: {numberOfAccount || 0}/3
				</div>
			</div>
		</div>
	);
};
