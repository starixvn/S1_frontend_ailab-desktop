import React from "react";
import PropTypes from "prop-types";

const AccountNamePanel = ({ t, accountName, clickTip, showTip }) => (
	<div className="accountName">
		{t("lbl_BankAccountName")}
		<span>{accountName}</span>
		<button className="icon icon-error" onClick={clickTip} />
		{showTip ? (
			<div className="tip active">{t("lbl_BankAccountHint")}</div>
		) : null}
	</div>
);

AccountNamePanel.propTypes = {
	t: PropTypes.func.isRequired,
	accountName: PropTypes.string.isRequired,
	clickTip: PropTypes.func.isRequired,
	showTip: PropTypes.bool.isRequired
};

export default AccountNamePanel;
