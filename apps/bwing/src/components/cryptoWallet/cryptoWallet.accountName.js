import React, { useState, memo } from "react";
import PropTypes from "prop-types";

const AccountName = ({ t, accountName }) => {
	const [showTip, setShowTip] = useState(false);

	const clickTip = () => setShowTip(!showTip);

	return (
		<>
			<div className="accountName icon icon-icon32px_Profile">
				<span>{t("lbl_BankAccountName")}</span>
				<div>
					<span>{accountName}</span>
					<button className="icon icon-error" onClick={clickTip} />
				</div>
			</div>

			<div className={`tip ${showTip ? "active" : ""}`}>
				{t("lbl_BankAccountHint")}
			</div>
		</>
	);
};

export default memo(AccountName);

AccountName.propTypes = {
	accountName: PropTypes.string.isRequired,
	t: PropTypes.func.isRequired
};
