import React from "react";
import PropTypes from "prop-types";
import { number_format } from "../common/common";
import ReloadSpin from "../common/reloadSpin";

const walletIcon = [
	"icon-icon32px_Main-Wallet",
	"icon-icon32px_Sportsbook-Wallet"
];

const defWalletMode = {
	Normal: 1,
	Special: 2
};

const ShowWallet = props => {
	const walletCardList = props.walletInfo
		?.filter(item => item.balance !== null)
		.map(item => (
			<div className="walletBalanceModule" key={`wallets-${item.id}`}>
				<span
					className={`icon ${
						item.id === 0 ? walletIcon[0] : walletIcon[1]
					}`}
				>
					{item.displayText ?? props.i18n(item.displayKey)}
				</span>
				<span>
					{number_format(item.balance ?? 0, props._isConvert)}
				</span>
				<div className="btnGroup">
					{item?.walletMode === defWalletMode.Special ? (
						<button
							data-testid={`showWallet_manual_${item.id}`}
							className="red"
							onClick={props.clickManual.bind(this, item.id)}
						>
							{props.i18n("lbl_Manual")}
						</button>
					) : (
						<button
							data-testid={`showWallet_restoreAll_${item.id}`}
							className="orange"
							onClick={props.restoreAll.bind(this, item.id)}
						>
							{props.i18n("lbl_RestoreAll")}
						</button>
					)}
				</div>
			</div>
		));

	return (
		<div className="walletModule">
			<div className="walletType">{walletCardList}</div>
			<ReloadSpin btnActive={false} func={props.getAllWalletData} />
		</div>
	);
};

export default ShowWallet;

ShowWallet.defaultProps = {
	clickManual: () => null
};

ShowWallet.propTypes = {
	i18n: PropTypes.func.isRequired,
	_isConvert: PropTypes.bool.isRequired,
	restoreAll: PropTypes.func.isRequired,
	getAllWalletData: PropTypes.func.isRequired,
	walletInfo: PropTypes.arrayOf(PropTypes.any).isRequired,
	clickManual: PropTypes.func
};
