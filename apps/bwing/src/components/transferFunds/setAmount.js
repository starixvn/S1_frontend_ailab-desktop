import React from "react";
import Inputbox from "../common/inputbox";
import Dropdown from "../common/dropdown";
import { useTranslation } from "react-i18next";

export default props => {
	const { t } = useTranslation();

	return (
		<div className="subModuleList">
			<div className="walletTransfer">
				<div className="walletModule">
					<div className="walletBalanceModule from">
						{/* <span>{props.i18n("lbl_From")}</span> */}
						<div className="inputBox-blue">
							<Dropdown
								i18n={t}
								mainKey={`from_wallet`}
								options={props.fomOptions}
								selectedIdx={props.selectedFromIdx}
								onSelectItem={props.onSelectWallet.bind(
									this,
									"from"
								)}
								title={t("lbl_From")}
							/>
						</div>
					</div>
					<div className="walletBalanceModule to">
						{/* <span>{props.i18n("lbl_To")}</span> */}
						<div className="inputBox-blue">
							<Dropdown
								i18n={t}
								mainKey={`to_wallet`}
								options={props.toOptions}
								selectedIdx={props.selectedToIdx}
								onSelectItem={props.onSelectWallet.bind(
									this,
									"to"
								)}
								title={t("lbl_To")}
							/>
						</div>
					</div>
				</div>
				<form className="inputModuleRow" onSubmit={props.clickSubmit}>
					<Inputbox
						title={props.i18n("lbl_Amount")}
						value={props.amount}
						onChange={props.onChange}
						onBlur={props.onBlur}
						clickInfo={props.clickInfo}
						checked={props.checked}
						textRight={true}
					/>
					<div className="btnGroup">
						<button className="btn-check" type="submit">
							{props.i18n("lbl_Submit")}
						</button>
					</div>
				</form>
				<div className={`tip${props.tip ? " active" : ""}`}>
					{props.tip}
				</div>
			</div>
		</div>
	);
};

// import React from "react";
// import Inputbox from "../common/inputbox";

// export default props => {
// 	return (
// 		<div className="subModuleList">
// 			<div className="walletTransfer">
// 				<div className="walletModule">
// 					<div className="walletBalanceModule from">
// 						<span>{props.i18n("lbl_From")}</span>
// 						<span className="active">
// 							{props.i18n(props.transferFrom)}
// 						</span>
// 					</div>
// 					<button
// 						aria-label="changeDirection"
// 						className="icon icon-loop active"
// 						onClick={props.changeDirection}>
// 						{/* <span>{props.i18n("lbl_Exchange")}</span> */}
// 					</button>
// 					<div className="walletBalanceModule to">
// 						<span>{props.i18n("lbl_To")}</span>
// 						<span className="active">
// 							{props.i18n(props.transferTo)}
// 						</span>
// 					</div>
// 				</div>
// 				<form className="inputModuleRow" onSubmit={props.clickSubmit}>
// 					<Inputbox
// 						title={props.i18n("lbl_Amount")}
// 						value={props.amount}
// 						onChange={props.onChange}
// 						onBlur={props.onBlur}
// 						clickInfo={props.clickInfo}
// 						checked={props.checked}
// 						textRight={true}
// 						// tip={props.tip}
// 					/>
// 					<div className="btnGroup">
// 						<button className="btn-check" type="submit">
// 							{props.i18n("lbl_transfer_submit")}
// 						</button>
// 					</div>
// 				</form>
// 				<div className={`tip${props.tip ? " active" : ""}`}>
// 					{props.tip}
// 				</div>
// 			</div>
// 		</div>
// 	);
// };
