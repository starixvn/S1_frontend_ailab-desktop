import React from "react";
import PropTypes from "prop-types";
import InitPanel from "./bankInfo.set.init";
import BankPanel from "./bankInfo.set.bank";
import AccountPanel from "./bankInfo.set.account";

const PanelControl = ({
	t,
	defModule,
	currentModule,
	dispatch,
	toNextStep,
	toLastStep,
	bankList,
	selectBank,
	bankIdx,
	numberOfAccount,
	accountNumber,
	accountName,
	alreadyHasAccountName,
	reload,
	custBankList
}) => {
	let displayModule;
	switch (currentModule) {
		case defModule.InitPanel:
			displayModule = (
				<InitPanel
					t={t}
					numberOfAccount={numberOfAccount}
					toNextStep={toNextStep}
				/>
			);
			break;

		case defModule.BankPanel:
			displayModule = (
				<BankPanel
					t={t}
					dispatch={dispatch}
					bankList={bankList}
					toLastStep={toLastStep}
					selectBank={selectBank}
				/>
			);
			break;

		case defModule.AccountPanel:
			displayModule = (
				<AccountPanel
					t={t}
					dispatch={dispatch}
					bankInfo={bankList[bankIdx]}
					accountNumber={accountNumber}
					accountName={accountName}
					alreadyHasAccountName={alreadyHasAccountName}
					reload={reload}
					toLastStep={toLastStep}
					custBankList={custBankList}
				/>
			);
			break;

		default:
			break;
	}

	return displayModule;
};

export default PanelControl;

PanelControl.defaultProps = {
	toNextStep: undefined,
	bankList: null,
	selectBank: undefined,
	bankIdx: null,
	numberOfAccount: undefined,
	accountNumber: null,
	accountName: null,
	alreadyHasAccountName: undefined,
	reload: undefined,
	custBankList: null
};

PanelControl.propTypes = {
	t: PropTypes.func.isRequired,
	defModule: PropTypes.objectOf(PropTypes.any).isRequired,
	currentModule: PropTypes.string.isRequired,
	dispatch: PropTypes.func.isRequired,
	toNextStep: PropTypes.func,
	toLastStep: PropTypes.func.isRequired,
	bankList: PropTypes.arrayOf(PropTypes.any),
	selectBank: PropTypes.func,
	bankIdx: PropTypes.number,
	numberOfAccount: PropTypes.number,
	accountNumber: PropTypes.string,
	accountName: PropTypes.string,
	alreadyHasAccountName: PropTypes.bool,
	reload: PropTypes.func,
	custBankList: PropTypes.arrayOf(PropTypes.any)
};
