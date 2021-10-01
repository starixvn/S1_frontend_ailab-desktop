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
	let allDatas = state.tpWallets;
	const newValue = {
		displayText: action.displayText,
		tpId: action.tpId,
		balance: action.balance
	};
	const idx = allDatas.findIndex(tp => tp.tpId === newValue.tpId);
	const { tpId, balance, isHideBalance, lastTransaction } = action;
	switch (action.type) {
		case defAction.GET_TP_WALLETS:
			if (idx === -1) {
				allDatas = [...allDatas, newValue];
			} else {
				allDatas[idx] = newValue;
			}
			return { ...state, tpWallets: allDatas };

		case defAction.GET_MAIN_WALLETS:
			return {
				...state,
				mainWallet: {
					tpId,
					balance,
					lastTransaction
				},
				isHideBalance
			};

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
	dispatch
}) => {
	if (!isLogin) return;
	api_account_GetTpWalletList(ListType, langId).then(res => {
		if (res.data.errorCode === 0 && res.data.data) {
			res.data.data.forEach(tpInfo => {
				GetTpWalletBalance({
					displayText: tpInfo.tpName,
					tpId: tpInfo.tpId,
					dispatch
				});
			});
		}
	});
};

const GetTpWalletBalance = ({ tpId, dispatch, displayText }) => {
	api_account_GetTpWalletBalance(tpId).then(res => {
		if (res.data.errorCode === 0 && res.data.data) {
			const { tpId: _tpId, balance } = res.data.data;
			dispatch({
				type: defAction.GET_TP_WALLETS,
				tpId: _tpId,
				balance,
				displayText
			});
		}
	});
};

const GetMainWalet = ({ isLogin, dispatch }) => {
	if (!isLogin) return;
	api_account_GetWalletBalance().then(res => {
		if (res.data.errorCode === 0) {
			dispatch({
				type: defAction.GET_MAIN_WALLETS,
				balance: res.data.data.balance,
				isHideBalance: res.data.data.isHideBalance,
				lastTransaction: res.data.data.lastTransaction
			});
		}
	});
};

export const handleIsHideBalance = ({ value, dispatch }) => {
	dispatch({ type: defAction.HANDLE_HIDE_BALANCE, value });
	api_account_SetHideBalance({ value });
};

const GetBonusWallets = ({ isLogin, dispatch }) => {
	if (!isLogin) return;
	api_account_GetCustBonusWallet().then(res => {
		if (res.data.errorCode === 0) {
			dispatch({
				type: defAction.GET_BONUS_WALLETS,
				value: res.data.data
			});
		}
	});
};

export const GetAllWallets = ({
	langId,
	isLogin,
	dispatch,
	ListType = defListType.transferred
}) => {
	if (!isLogin) return;
	GetMainWalet({ isLogin, dispatch });
	GetBonusWallets({ isLogin, dispatch });
	GetTpWallets({ langId, isLogin, ListType, dispatch });
};

const useGetWalletInfo = ({ langId, isLogin }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		GetAllWallets({ isLogin, langId, dispatch });
	}, [isLogin, langId]);

	return { state, dispatch };
};

export default useGetWalletInfo;
