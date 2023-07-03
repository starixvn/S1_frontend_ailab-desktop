import React from "react";
import PropTypes from "prop-types";

const AccountNamePanel = ({ t, accountName, clickTip, showTip }) => (
	<>
		{t("lbl_BankAccountName")}
		<span>{accountName}</span>
		<button className="icon icon-error" onClick={clickTip} />
		{showTip ? (
			<div className="tip active">{t("lbl_BankAccountHint")}</div>
		) : null}
	</>
);

AccountNamePanel.propTypes = {
	t: PropTypes.func.isRequired,
	accountName: PropTypes.string.isRequired,
	clickTip: PropTypes.func.isRequired,
	showTip: PropTypes.bool.isRequired
};

export default AccountNamePanel;
