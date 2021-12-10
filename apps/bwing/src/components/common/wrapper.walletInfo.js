import { useEffect, useReducer } from "react";
import {
	api_account_GetTpWalletList,
	api_account_GetTpWalletBalance,
	api_account_GetCustBonusWallet,
	api_account_GetWalletBalance,
	api_account_SetHideBalance
} from "../../service/api/account";

export const defListType = {
	all: 0,
	transferred: 1
};

const defAction = {
	GET_BONUS_WALLETS: "GET_BONUS_WALLETS",
	GET_MAIN_WALLETS: "GET_MAIN_WALLETS",
	GET_TP_WALLETS: "GET_TP_WALLETS",
	HANDLE_HIDE_BALANCE: "HANDLE_HIDE_BALANCE",
	REFRESH_ALL_WALLETS: "REFRESH_ALL_WALLETS"
};

const initialState = {
	isHideBalance: true,
	bonusWallets: [],
	tpWallets: [],
	mainWallet: {}
};

function reducer(state, action) {
	switch (action.type) {
		case defAction.GET_TP_WALLETS: {
			let allDatas = state.tpWallets;
			const newValue = {
				displayText: action.displayText,
				tpId: action.tpId,
				balance: action.balance
			};
			const idx = allDatas.findIndex(tp => tp.tpId === newValue.tpId);
			if (idx === -1) {
				allDatas = [...allDatas, newValue];
			} else {
				allDatas[idx] = newValue;
			}
			return { ...state, tpWallets: allDatas };
		}

		case defAction.GET_MAIN_WALLETS: {
			const { tpId, balance, isHideBalance, lastTransaction } = action;
			return {
				...state,
				mainWallet: {
					tpId,
					balance,
					lastTransaction
				},
				isHideBalance
			};
		}

		case defAction.HANDLE_HIDE_BALANCE:
			return { ...state, isHideBalance: action.value };

		case defAction.GET_BONUS_WALLETS:
			return { ...state, bonusWallets: action.value };

		default:
			throw new Error();
	}
}

const GetTpWallets = ({
	langId,
	isLogin,
	ListType = defListType.transferred,
	dispatch,
	errorPopBox
}) => {
	if (!isLogin) return;
	api_account_GetTpWalletList(ListType, langId).then(
		res => {
			if (res.data.errorCode === 0 && res.data.data) {
				res.data.data.forEach(tpInfo => {
					GetTpWalletBalance({
						displayText: tpInfo.tpName,
						tpId: tpInfo.tpId,
						dispatch,
						errorPopBox
					});
				});
			} else if (res.data.errorCode !== 0) {
				errorPopBox(res.data.message || "error", res.data.errorCode);
			}
		},
		() => {
			errorPopBox();
		}
	);
};

const GetTpWalletBalance = ({ tpId, displayText, dispatch, errorPopBox }) => {
	api_account_GetTpWalletBalance(tpId).then(
		res => {
			if (res.data.errorCode === 0 && res.data.data) {
				const { tpId: _tpId, balance } = res.data.data;
				dispatch({
					type: defAction.GET_TP_WALLETS,
					tpId: _tpId,
					balance,
					displayText
				});
			} else if (res.data.errorCode !== 0) {
				errorPopBox(res.data.message || "error", res.data.errorCode);
			}
		},
		() => {
			errorPopBox();
		}
	);
};

const GetMainWalet = ({ isLogin, dispatch, errorPopBox }) => {
	if (!isLogin) return;
	api_account_GetWalletBalance().then(
		res => {
			if (res.data.errorCode === 0) {
				dispatch({
					type: defAction.GET_MAIN_WALLETS,
					balance: res.data.data.balance,
					isHideBalance: res.data.data.isHideBalance,
					lastTransaction: res.data.data.lastTransaction
				});
			} else {
				errorPopBox(res.data.message || "error", res.data.errorCode);
			}
		},
		() => {
			errorPopBox();
		}
	);
};

export const handleIsHideBalance = ({ value, dispatch, errorPopBox }) => {
	dispatch({ type: defAction.HANDLE_HIDE_BALANCE, value });
	api_account_SetHideBalance({ value }).then(
		res => {
			const { errorCode, message } = res.data;
			if (errorCode !== 0) {
				errorPopBox(message || "error", errorCode);
			}
		},
		() => {
			errorPopBox();
		}
	);
};

const GetBonusWallets = ({ isLogin, dispatch, errorPopBox }) => {
	if (!isLogin) return;
	api_account_GetCustBonusWallet().then(
		res => {
			if (res.data.errorCode === 0) {
				dispatch({
					type: defAction.GET_BONUS_WALLETS,
					value: res.data.data
				});
			} else {
				errorPopBox(res.data.message || "error", res.data.errorCode);
			}
		},
		() => {
			errorPopBox();
		}
	);
};

export const GetAllWallets = ({
	langId,
	isLogin,
	dispatch,
	ListType = defListType.transferredm,
	errorPopBox
}) => {
	if (!isLogin) return;
	GetMainWalet({ isLogin, dispatch, errorPopBox });
	GetBonusWallets({ isLogin, dispatch, errorPopBox });
	GetTpWallets({ langId, isLogin, ListType, dispatch, errorPopBox });
};

const useGetWalletInfo = ({ langId, isLogin, errorPopBox }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		GetAllWallets({ langId, isLogin, dispatch, errorPopBox });
	}, [langId, isLogin]);

	return { state, dispatch };
};

export default useGetWalletInfo;
