export const defActionType = {
	TO_NEXT_STEP: "TO_NEXT_STEP",
	TO_LAST_STEP: "TO_LAST_STEP",
	GET_CUST_BANK_INFO: "GET_CUST_BANK_INFO",
	SET_BANKLIST: "SET_BANKLIST",
	EDIT_FIELD: "EDIT_FIELD"
};

const defStepModule = {
	1: "InitPanel",
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
			let _walletList = [];
			if (action.datas) {
				_accountName = action.datas.accountName;
				_walletList = action.datas.uSDTDetail;
			}

			return {
				...state,
				accountName: _accountName,
				step: newStep,
				displayModule: defStepModule[newStep],
				walletList: _walletList
			};
		}

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
