import React, { useState, memo } from "react";
import PropTypes from "prop-types";

const AccountName = ({ t, accountName }) => {
	const [showTip, setShowTip] = useState(false);

	const clickTip = () => setShowTip(!showTip);

	return (
		<div className="accountName">
			{t("lbl_BankAccountName")}
			<span>{accountName}</span>
			<button className="icon icon-error" onClick={clickTip} />

			<div className={`tip ${showTip ? "active" : ""}`}>
				{t("lbl_PreferredCurrencyToolTip")}
			</div>
		</div>
	);
};

export default memo(AccountName);

AccountName.propTypes = {
	accountName: PropTypes.string.isRequired
};
