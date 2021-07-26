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
	custBankList,
	selectBank,
	bankIdx,
	numberOfAccount,
	accountNumber,
	accountName,
	IFSCCode,
	alreadyHasAccountName,
	reload,
	currencyId
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
					IFSCCode={IFSCCode}
					alreadyHasAccountName={alreadyHasAccountName}
					reload={reload}
					toLastStep={toLastStep}
					custBankList={custBankList}
					currencyId={currencyId}
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
	custBankList: null,
	selectBank: undefined,
	bankIdx: null,
	numberOfAccount: undefined,
	accountNumber: null,
	accountName: null,
	IFSCCode: null,
	alreadyHasAccountName: undefined,
	reload: undefined,
	currencyId: null
};

PanelControl.propTypes = {
	t: PropTypes.func.isRequired,
	defModule: PropTypes.objectOf(PropTypes.any).isRequired,
	currentModule: PropTypes.string.isRequired,
	dispatch: PropTypes.func.isRequired,
	toNextStep: PropTypes.func,
	toLastStep: PropTypes.func.isRequired,
	bankList: PropTypes.arrayOf(PropTypes.any),
	custBankList: PropTypes.arrayOf(PropTypes.any),
	selectBank: PropTypes.func,
	bankIdx: PropTypes.number,
	numberOfAccount: PropTypes.number,
	accountNumber: PropTypes.string,
	accountName: PropTypes.string,
	IFSCCode: PropTypes.string,
	alreadyHasAccountName: PropTypes.bool,
	reload: PropTypes.func,
	currencyId: PropTypes.number
};
