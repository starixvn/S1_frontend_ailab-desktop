import React from "react";
import { number_format } from "../common/common";
import PropTypes from "prop-types";
import ReloadSpin from "../common/reloadSpin";

const walletIcon = [
	"icon-icon32px_Main-Wallet",
	"icon-icon32px_Sportsbook-Wallet"
];

const ShowWallet = props => {
	const getWalletCardList = () => {
		try {
			return props.walletInfo.map(item => {
				return (
					<div
						className="walletBalanceModule"
						key={`wallets-${item.id}`}>
						<span
							className={`icon ${
								item.id === 0 ? walletIcon[0] : walletIcon[1]
							}`}>
							{props.i18n(item.displayKey)}
						</span>
						<span>
							{number_format(item.balance ?? 0, props._isConvert)}
						</span>
						<div className="btnGroup">
							<button
								className="orange"
								onClick={props.restoreAll.bind(this, item.id)}>
								{props.i18n("lbl_RestoreAll")}
							</button>
						</div>
					</div>
				);
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="walletModule">
			{getWalletCardList()}
			<ReloadSpin btnActive={false} func={props.getAllWalletData} />
		</div>
	);
};

export default ShowWallet;

ShowWallet.propTypes = {
	i18n: PropTypes.func.isRequired,
	_isConvert: PropTypes.bool.isRequired,
	restoreAll: PropTypes.func.isRequired,
	getAllWalletData: PropTypes.func.isRequired
};

// import React from "react";
// import { number_format } from "../common/common";
// import PropTypes from "prop-types";
// import ReloadSpin from "../common/reloadSpin";

// const ShowWallet = props => {
// 	let arr = props.getWalletInfo.map((item, idx) => {
// 		return (
// 			<div className="walletBalanceModule" key={`wallets-${item.id}`}>
// 				<span className="icon icon-balance">
// 					{props.i18n(item.displayKey)}
// 				</span>
// 				<span>{number_format(item.balance, false)}</span>
// 				<div className="btnGroup">
// 					<button
// 						className="btn-check"
// 						onClick={props.restoreAll.bind(this, idx)}>
// 						{props.i18n("lbl_RestoreAll")}
// 					</button>
// 				</div>
// 			</div>
// 		);
// 	});
// 	return (
// 		<>
// 			<div className="walletModule">
// 				{arr}
// 				<ReloadSpin func={props.GetWalletInfo} />
// 			</div>
// 			<div className="tip active">
// 				{props.i18n("lbl_restore_all_hint")}
// 			</div>
// 		</>
// 	);
// };

// export default ShowWallet;

// ShowWallet.propTypes = {
// 	getWalletInfo: PropTypes.array.isRequired,
// 	i18n: PropTypes.func.isRequired,
// 	_isConvert: PropTypes.bool.isRequired,
// 	restoreAll: PropTypes.func.isRequired,
// 	GetWalletInfo: PropTypes.func.isRequired
// };
