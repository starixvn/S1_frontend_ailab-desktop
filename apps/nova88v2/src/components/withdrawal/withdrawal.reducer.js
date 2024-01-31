export const defActionType = {
	GET_BALANCE: "GET_BALANCE",
	GET_CUST_BANKINFO: "GET_CUST_BANKINFO",
	GET_CUST_E_WALLET_INFO: "GET_CUST_E_WALLET_INFO",
	SELECT_ACCOUNT: "SELECT_ACCOUNT",
	EDIT_AMOUNT: "EDIT_AMOUNT",
	CHECK_AMOUNT: "CHECK_AMOUNT",
	TO_OTHER_PANEL: "TO_OTHER_PANEL",
	SET_INIT_STATE: "SET_INIT_STATE",
	GET_RECENT_HISTORY: "GET_RECENT_HISTORY",
	SET_KYC_STATUS: "SET_KYC_STATUS",
	SET_KYC_DATA: "SET_KYC_DATA",
	SET_LOADING: "SET_LOADING",
	SET_WITHDRAWAL_AMOUNT_LIMIT: "SET_WITHDRAWAL_AMOUNT_LIMIT",
	SET_WITHDRAWAL_TYPE: "SET_WITHDRAWAL_TYPE",
	GET_WITHDRAWAL_SETTING_TYPE: "GET_WITHDRAWAL_SETTING_TYPE"
};

export const defPanel = {
	amount: "amount",
	confirm: "confirm"
};

export const initState = {
	balanceData: {},
	custBankInfo: {},
	custEWalletInfo: [],
	selectedAccount: {},
	kycStatus: "normal",
	loading: true,
	redirectPath: null,
	panel: defPanel.amount,
	withdrawalMin: 0,
	withdrawalMax: 0,
	receiveUSDT: null,
	withdrawalType: null,
	maxTimes: 0,
	withdrawalTimes: 0,
	eWalletWithdrawalMin: 0,
	eWalletStatus: false
};

export function reducer(state, action) {
	switch (action.type) {
		case defActionType.GET_BALANCE:
			return {
				...state,
				balanceData: action.balanceData
			};

		case defActionType.GET_CUST_BANKINFO:
			return {
				...state,
				custBankInfo: action.custBankInfo
			};
		case defActionType.GET_CUST_E_WALLET_INFO:
			return {
				...state,
				custEWalletInfo: action.custEWalletInfo
			};
		case defActionType.SELECT_ACCOUNT:
			return {
				...state,
				selectedAccount: action.selectedAccount,
				withdrawalType: action.withdrawalType
			};

		case defActionType.EDIT_AMOUNT:
			return {
				...state,
				amount: action.amount
			};

		case defActionType.CHECK_AMOUNT:
			return {
				...state,
				checked: action.checked,
				tip: action.tip
			};

		case defActionType.TO_OTHER_PANEL:
			return {
				...state,
				panel: action.panel
			};

		case defActionType.SET_INIT_STATE:
			return {
				...initState
			};

		case defActionType.GET_RECENT_HISTORY:
			return {
				...state,
				recentHistory: action.recentHistory
			};

		case defActionType.SET_KYC_STATUS:
			return {
				...state,
				kycStatus: action.kycStatus
			};

		case defActionType.SET_KYC_DATA:
			return {
				...state,
				kycData: action.kycData
			};

		case defActionType.SET_LOADING:
			return {
				...state,
				loading: action.loading
			};

		case defActionType.SET_WITHDRAWAL_AMOUNT_LIMIT:
			return {
				...state,
				withdrawalMin: action.withdrawalMin,
				withdrawalMax: action.withdrawalMax,
				unlimited: action.unlimited,
				usdtList: action.usdtList,
				maxTimes: action.maxTimes,
				withdrawalTimes: action.withdrawalTimes,
				eWalletWithdrawalMin: action.eWalletWithdrawalMin,
				eWalletStatus: action.eWalletStatus,
				eWalletWithdrawalAvailableAmount:
					action.eWalletWithdrawalAvailableAmount
			};

		default:
			return state;
	}
}
