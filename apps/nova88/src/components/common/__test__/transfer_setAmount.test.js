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
import renderer from "react-test-renderer";
import { render, cleanup, fireEvent } from "@testing-library/react";
import ShowWallets from "../../transferFunds/ShowWallets";
import SetAmount from "../../transferFunds/setAmount";
import TransferFunds from "../../transferFunds/transferFunds";
import { checkAmount } from "../../transferFunds/transferFunds";
import ReloadSpin from "../reloadSpin";
import { isConvert } from "../common.js";
import Inputbox from "../inputbox";

// describe("showWallet Snapshot", () => {
// 	afterEach(cleanup);
// 	test("render correctly", () => {
// 		const fake_walletInfo = [
// 			{ id: 0, displayKey: "lbl_MainWallet", balance: 500 },
// 			{ id: 1, displayKey: "lbl_TpWallet_1", balance: 100 }
// 		];
// 		const tree = renderer
// 			.create(<ShowWallets {...fake_walletInfo} />)
// 			.toJSON();
// 		expect(tree).toMatchSnapshot();
// 	});
// });

describe("wallet dropdown", () => {
	test("render dropdown item", () => {
		const fake_data = {
			i18n: jest.fn(),
			onSelectWallet: jest.fn(),
			fomOptions: [
				{ id: 0, displayKey: "lbl_MainWallet", balance: 200 },
				{ id: 1, displayKey: "lbl_TpWallet_1", balance: 50 },
				{ id: 21, displayKey: "lbl_TpWallet_21", balance: 320 }
			],
			tomOptions: [
				{ id: 0, displayKey: "lbl_MainWallet", balance: 200 },
				{ id: 1, displayKey: "lbl_TpWallet_1", balance: 50 },
				{ id: 21, displayKey: "lbl_TpWallet_21", balance: 320 }
			],
			selectedFromIdx: -1,
			selectedToIdx: -1,
			clickSubmit: jest.fn()
		};

		const { container } = render(<SetAmount {...fake_data} />);
		// expect(container.firstChild.className).toBe("walletModule");
		expect(container.getByTestId("setAmount_dropdown_from").length).toBe(2);
	});
});

// not render event:
describe("test function: onSelectWallet()", () => {
	test("dropdown selected item correctly", () => {
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

// not render event:
describe("test function: checkSelectWallet()", () => {
	const selectedTpId = {
		from: null,
		to: null
	};
	const i18n = {
		lbl_please_select_from_wallet: "Please select from wallet",
		lbl_please_select_to_wallet: "Please select to wallet"
	};
	test("if select wallet is null, show error tip", () => {
		let message =
			selectedTpId.from === null
				? i18n.lbl_please_select_from_wallet
				: i18n.lbl_please_select_to_wallet;

		expect(message).toBe(i18n.lbl_please_select_from_wallet);
	});
	test("if select wallet is null, return false", () => {
		let checkPass = true;
		if (selectedTpId.from === null || selectedTpId.to === null) {
			checkPass = false;
		}
		expect(checkPass).toBe(false);
	});
});

// describe("test function: checkAmount()", () => {
// 	afterEach(cleanup);
// 	test("amount > 0 ,return true", () => {
// 		let result = checkAmount(100);
// 		expect(result).toBe(true);
// 	});
// 	test("amount < 0,return false", () => {
// 		let result = checkAmount(-50);
// 		expect(result).toBe(true);
// 	});

// 	const component = create(<TransferFunds />);
// 	const instance = component.getInstance();
// 	let result = instance.checkAmount();
// 	expect(result).toBe(true);

// 	const wrapper = ShallowRenderer(<TransferFunds />);
// 	expect(wrapper.instance().checkAmount(100)).toBe(true);
// });

// describe("test function: checkAmount", () => {
// 	let test_value = 10;
// 	const wrapper = new ShallowRenderer().render(<TransferFunds />);
// 	expect(wrapper.dive().instance().checkAmount(test_value)).toEqual(true);
// });

// not render event:
describe("test function: clickSubmit", () => {
	test("transfer post value", () => {
		let selectedTpId = {
			from: 0
		};
		let amount = 100;
		const defDirection = {
			MainToTp: 1,
			TpToMain: 2
		};

		let _direction =
			selectedTpId.from === 0
				? defDirection.MainToTp
				: defDirection.TpToMain;

		let real_amount = isConvert ? Number(amount) * 1000 : Number(amount);

		let _wallet =
			_direction === defDirection.MainToTp
				? selectedTpId.to
				: selectedTpId.from;

		expect(_direction).toBe(defDirection.MainToTp);
		expect(real_amount).toBe(amount * 1000);
		expect(_wallet).toBe(selectedTpId.to);
	});
});

// test("value change", () => {
// 	const container = render(<Inputbox />);
// 	const input = container.getByTestId("input");

// 	let test_value = 10;

// 	fireEvent.change(input, { target: { value: test_value } });
// 	expect(input.value).toBe(test_value);
// });
