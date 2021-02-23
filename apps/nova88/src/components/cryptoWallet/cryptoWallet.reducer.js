export const defActionType = {
	TO_NEXT_STEP: "TO_NEXT_STEP",
	TO_LAST_STEP: "TO_LAST_STEP",
	GET_CUST_BANK_INFO: "GET_CUST_BANK_INFO",
	SET_BANKLIST: "SET_BANKLIST",
	// SELECT_BANK: "SELECT_BANK",
	EDIT_FIELD: "EDIT_FIELD"
};

const defStepModule = {
	1: "InitPanel",
	// 2: "BankPanel",
	2: "AccountPanel"
};

export const defStatus = {
	accountName: {
		checked: null,
		tip: ""
	},
	nickname_1: {
		checked: null,
		tip: ""
	},
	address_1: {
		checked: null,
		tip: ""
	},
	nickname_2: {
		checked: null,
		tip: ""
	},
	address_2: {
		checked: null,
		tip: ""
	},
	nickname_3: {
		checked: null,
		tip: ""
	},
	address_3: {
		checked: null,
		tip: ""
	}
};

export const defColType = {
	accountName: "accountName",
	nickname: "nickname",
	address: "address"
};

export const defColList = [
	{ groupId: 1, nickname: "nickname_1", address: "address_1" },
	{ groupId: 2, nickname: "nickname_2", address: "address_2" },
	{ groupId: 3, nickname: "nickname_3", address: "address_3" }
];

export const defModule = {
	[defStepModule[1]]: "InitPanel",
	[defStepModule[2]]: "AccountPanel"
};

export const initState = {
	displayModule: defModule.InitPanel,
	step: 1
};

export function reducer(state, action) {
	let newStep = 1;

	switch (action.type) {
		case defActionType.TO_NEXT_STEP:
			newStep = state.step + 1;
			return {
				...state,
				step: newStep,
				displayModule: defStepModule[newStep]
			};

		case defActionType.TO_LAST_STEP:
			newStep = state.step - 1;
			return {
				...state,
				step: newStep,
				displayModule: defStepModule[newStep]
			};

		case defActionType.GET_CUST_BANK_INFO: {
			newStep = 1;
			let _accountName = "";
			let _custBankList = [];
			if (action.datas) {
				_accountName = action.datas.accountName;
				_custBankList = action.datas.bankInfoDetail;
			}

			return {
				...state,
				accountName: _accountName,
				custBankList: _custBankList,
				step: newStep,
				displayModule: defStepModule[newStep]
			};
		}

		case defActionType.SET_BANKLIST:
			return {
				...state,
				bankList: action.bankList
			};

		// case defActionType.SELECT_BANK:
		// 	newStep = state.step + 1;
		// 	return {
		// 		...state,
		// 		accountNumber: "",
		// 		accountName: "",
		// 		bankIdx: action.bankIdx,
		// 		step: newStep,
		// 		displayModule: defStepModule[newStep]
		// 	};

		case defActionType.EDIT_FIELD:
			return {
				...state,
				[action.col]: action.value
			};

		default:
			console.log("this action type is not exists");
			return state;
	}
}
