import React from "react";
import PropTypes from "prop-types";
import ReloadSpin from "../common/reloadSpin";
import { number_format } from "../common/common";

const walletIcon = [
	"icon-icon32px_Main-Wallet",
	"icon-icon32px_Sportsbook-Wallet"
];

const ShowWallet = props => {
	const walletCardList = props.walletInfo
		?.filter(item => item.balance !== null)
		.map(item => {
			return (
				<div className="walletBalanceModule" key={`wallets-${item.id}`}>
					<span
						className={`icon ${
							item.id === 0 ? walletIcon[0] : walletIcon[1]
						}`}>
						{item.displayText ?? props.i18n(item.displayKey)}
					</span>
					<span>{number_format({ number: item.balance ?? 0 })}</span>
					<div className="btnGroup">
						<button
							data-testid={`showWallet_restoreAll_${item.id}`}
							className="btn-check"
							onClick={props.restoreAll.bind(this, item.id)}>
							{props.i18n("lbl_RestoreAll")}
						</button>
					</div>
				</div>
			);
		});

	return (
		<div className="walletModule">
			<div className="walletType">{walletCardList}</div>
			<ReloadSpin btnActive={false} func={props.getAllWalletData} />
		</div>
	);
};

export default ShowWallet;

ShowWallet.propTypes = {
	i18n: PropTypes.func.isRequired,
	restoreAll: PropTypes.func.isRequired,
	getAllWalletData: PropTypes.func.isRequired
};
