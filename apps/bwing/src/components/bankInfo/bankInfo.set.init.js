import React from "react";

export default ({ t, numberOfAccount, toNextStep }) => {
	return (
		<div className="walletModule">
			<div className="addBank bankselect">
				{numberOfAccount < 3 ? (
					<div className="btnGroup">
						<button onClick={toNextStep} className="btn-check">
							{t("lbl_AddBankAccount")}
						</button>
					</div>
				) : (
					<div className="btnGroup">
						<button className="btn-cancel" disabled>
							{t("lbl_BankCardsFull")}
						</button>
					</div>
				)}
			</div>
		</div>
	);
};
