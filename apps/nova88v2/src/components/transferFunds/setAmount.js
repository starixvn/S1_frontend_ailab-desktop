import React from "react";
import PropTypes from "prop-types";
import Inputbox from "../common/inputbox";
import Dropdown from "../common/dropdown";

const SetAmount = ({
	walletOptions,
	selectedFromIdx,
	selectedToIdx,
	onSelectWallet,
	clickSubmit,
	amount,
	onChange,
	onBlur,
	clickInfo,
	checked,
	tip,
	_isConvert,
	t
}) => {
	return (
		<div className="subModuleList">
			<div className="walletTransfer">
				<div className="walletModule transferModule">
					<div className="inputBox-org">
						<Dropdown
							i18n={t}
							mainKey="from_wallet"
							options={walletOptions}
							selectedIdx={selectedFromIdx}
							onSelectItem={onSelectWallet.bind(this, "from")}
							title={t("lbl_From")}
						/>
					</div>
					<div className="inputBox-blue">
						<Dropdown
							i18n={t}
							mainKey="to_wallet"
							options={walletOptions}
							selectedIdx={selectedToIdx}
							onSelectItem={onSelectWallet.bind(this, "to")}
							title={t("lbl_To")}
						/>
					</div>
				</div>
				<form className="inputModuleRow" onSubmit={clickSubmit}>
					<Inputbox
						className="inputBox-white"
						title={t("lbl_Amount")}
						value={amount}
						onChange={onChange}
						onBlur={onBlur}
						clickInfo={clickInfo}
						checked={checked}
						tip={tip}
						_isConvert={_isConvert}
						isAmount={true}
					/>
					<div className="btnGroup">
						<button
							className="btn-check"
							type="submit"
							data-testid="setAmount_submit">
							{t("lbl_Submit")}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

SetAmount.defaultProps = {
	checked: null
};

SetAmount.propTypes = {
	walletOptions: PropTypes.arrayOf(PropTypes.any).isRequired,
	selectedFromIdx: PropTypes.number.isRequired,
	selectedToIdx: PropTypes.number.isRequired,
	onSelectWallet: PropTypes.func.isRequired,
	clickSubmit: PropTypes.func.isRequired,
	amount: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func.isRequired,
	clickInfo: PropTypes.func.isRequired,
	checked: PropTypes.bool,
	tip: PropTypes.string.isRequired,
	_isConvert: PropTypes.bool.isRequired,
	t: PropTypes.func.isRequired
};

export default SetAmount;
