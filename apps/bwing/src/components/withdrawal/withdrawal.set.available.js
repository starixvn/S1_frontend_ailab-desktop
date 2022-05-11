import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { number_format } from "../common/common";
import ReloadSpin from "../common/reloadSpin";

export default props => {
	const { t } = useTranslation();

	const [showRealNameHint, setShowRealNameHint] = useState(false);
	const onHandleRealNameHint = () => {
		setShowRealNameHint(prevS => !prevS);
	};

	return (
		<>
			{props.accountName ? (
				<div className="walletBalanceModule">
					<span className="icon icon-icon32px_Profile">
						{props.accountName}
					</span>
					<i
						className="icon icon-error"
						onClick={onHandleRealNameHint}
					/>
					<div className={`tip${showRealNameHint ? " active" : ""}`}>
						{t("lbl_BankAccountHint")}
					</div>
				</div>
			) : null}
			<div className="walletBalanceModule">
				<span className="icon icon-balance">
					{t("lbl_EligibleWithdrawalAmount")}
				</span>
				<span>
					{number_format({
						number: props.availableBalance,
						formatRequired: props._isConvert,
						digits: 0
					})}
				</span>
				<ReloadSpin func={props.refreshAvailableBalance} />
			</div>
		</>
	);
};
