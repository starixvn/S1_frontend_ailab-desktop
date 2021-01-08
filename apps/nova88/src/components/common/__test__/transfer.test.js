// onSelectWallet  v
// checkSelectWallet
// checkAmount
// clickSubmit
// Restore all
// Transfer
import React from "react";
import { create } from "react-test-renderer";
// import shallow from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";
import { render, cleanup, fireEvent } from "@testing-library/react";
import ShowWallets from "../../transferFunds/ShowWallets";
import TransferFunds from "../../transferFunds/transferFunds";
import { checkAmount } from "../../transferFunds/transferFunds";

describe("showWallet", () => {
	afterEach(cleanup);
	test("render correctly", () => {
		const fake_walletInfo = [
			{ id: 0, displayKey: "lbl_MainWallet", balance: 500 },
			{ id: 1, displayKey: "lbl_TpWallet_1", balance: 100 }
		];
		const tree = renderer
			.create(<ShowWallets {...fake_walletInfo} />)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

describe("onSelectWallet()", () => {
	test("selected item correctly", () => {
		let col = "from";
		let value = { id: 0 };
		let oppsCol = col === "from" ? "to" : "from";

		let result = {
			[col]: value.id,
			[oppsCol]: value.id === 0 && oppsCol === 0 ? null : oppsCol
		};

		expect(result[col]).toBe(0);
		expect(result[oppsCol]).toBe("to");
	});
});

// describe("checkSelectWallet()", () => {
// 	const selectedTpId = {
// 		from: null,
// 		to: null
// 	};
// 	const i18n = {
// 		lbl_please_select_from_wallet: "Please select from wallet",
// 		lbl_please_select_to_wallet: "Please select to wallet"
// 	};
// 	test("if select wallet is null show error tip", () => {
// 		let message =
// 			selectedTpId.from === null
// 				? i18n.lbl_please_select_from_wallet
// 				: i18n.lbl_please_select_to_wallet;

// 		expect(message).toBe(i18n.lbl_please_select_from_wallet);
// 	});
// 	test("if select wallet is null return false", () => {
// 		let checkPass = true;
// 		if (selectedTpId.from === null || selectedTpId.to === null) {
// 			checkPass = false;
// 		}
// 		expect(checkPass).toBe(false);
// 	});
// });

// describe("checkAmount()", () => {
// test("amount > 0 ,return true", () => {
// 	let result = checkAmount(100);
// 	expect(result).toBe(true);
// });
// test("amount < 0,return false", () => {
// 	let result = checkAmount(-50);
// 	expect(result).toBe(true);
// });

// const component = create(<TransferFunds />);
// const instance = component.getInstance();
// let result = instance.checkAmount();
// expect(result).toBe(true);

// const wrapper = ShallowRenderer(<TransferFunds />);
// expect(wrapper.instance().checkAmount(100)).toBe(true);
// });

// describe("clickSubmit", () => {
// 	test("clickSubmit do transfer", () => {
// 		let selectedTpId = {
// 			from: 0
// 		};
// 		let amount = 100;
// 		const defDirection = {
// 			MainToTp: 1,
// 			TpToMain: 2
// 		};

// 		let _direction =
// 			selectedTpId.from === 0
// 				? defDirection.MainToTp
// 				: defDirection.TpToMain;

// 		let real_amount = _isConvert ? Number(amount) * 1000 : Number(amount);

// 		let _wallet =
// 			_direction === defDirection.MainToTp
// 				? selectedTpId.to
// 				: selectedTpId.from;

// 		expect(_direction).toBe(defDirection.MainToTp);
// 		expect(real_amount).toBe(100);
// 		expect(_wallet).toBe(selectedTpId.to);
// 	});
// });

const axios = require("axios");

const getAllGoods = () => {
	return axios.get("url/allGoods").then(resp => {
		return resp.data;
	});
};

jest.mock("axios");

test("showWallet card with api", () => {
	const fake_walletInfo = {
		getAllWalletData: jest.fn(),
		i18n: jest.fn(),
		restoreAll: jest.fn(),
		walletInfo: [
			{ id: 0, displayKey: "lbl_MainWallet", balance: 500 },
			{ id: 1, displayKey: "lbl_TpWallet_1", balance: 100 }
		],
		isConvert: false
	};
	const res = { data: fake_walletInfo };
	axios.get.mockResolvedValue(res);

	return getAllGoods().then(resp => {
		// expect(resp[0].displayKey).toEqual("lbl_MainWallet")
		const { Container } = render(<ShowWallets {...fake_walletInfo} />);
		expect(
			Container.getElementsByClassName("walletBalanceModule")
		).toHaveLength(2);
	});
});
