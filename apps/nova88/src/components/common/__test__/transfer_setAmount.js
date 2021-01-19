import React from "react";
import { render, fireEvent } from "@testing-library/react";
// import TransferFunds from "../../transferFunds/transferFunds";
import SetAmount from "../../transferFunds/setAmount";
import { isConvert } from "../common.js";

jest.mock("react-i18next", () => ({
	useTranslation: () => {
		return {
			t: jest.fn()
		};
	}
}));

describe("open dropdown ", () => {
	test("The dropdown menu can be opened/closed correctly", () => {
		const fake_data = {
			i18n: jest.fn(),
			onSelectWallet: jest.fn(),
			fomOptions: [{ id: 0, displayKey: "lbl_MainWallet", balance: 200 }],
			toOptions: [
				{ id: 1, displayKey: "lbl_TpWallet_1", balance: 50 },
				{ id: 21, displayKey: "lbl_TpWallet_21", balance: 320 }
			],
			clickSubmit: jest.fn(),
			mainKey: `from_wallet`
		};

		const { getByTestId } = render(<SetAmount {...fake_data} />);

		//click to open ↓
		fireEvent.click(getByTestId(`dropdown_${fake_data.mainKey}`));
		expect(
			getByTestId(
				`dropdown_container_${fake_data.mainKey}`
			).className.includes("active")
		).toBe(true);

		//click to close ↓
		fireEvent.click(getByTestId(`dropdown_${fake_data.mainKey}`));
		expect(
			getByTestId(
				`dropdown_container_${fake_data.mainKey}`
			).className.includes("active")
		).toBe(false);
	});
});

describe("render wallet dropdown items", () => {
	test("render dropdown items num correct", () => {
		const fake_data = {
			i18n: jest.fn(),
			onSelectWallet: jest.fn(),
			fomOptions: [
				{ id: 0, displayKey: "lbl_MainWallet", balance: 200 },
				{ id: 1, displayKey: "lbl_TpWallet_1", balance: 50 },
				{ id: 21, displayKey: "lbl_TpWallet_21", balance: 320 }
			],
			toOptions: [
				{ id: 0, displayKey: "lbl_MainWallet", balance: 200 },
				{ id: 1, displayKey: "lbl_TpWallet_1", balance: 50 },
				{ id: 21, displayKey: "lbl_TpWallet_21", balance: 320 }
			],
			clickSubmit: jest.fn()
		};

		const { container } = render(<SetAmount {...fake_data} />);

		expect(container.getElementsByClassName("dropdown-item").length).toBe(
			fake_data.fomOptions.length + fake_data.toOptions.length
		);
	});
});

describe("test function: onSelectWallet()", () => {
	test("onchange function have been called", () => {
		const fake_data = {
			i18n: jest.fn(),
			useTranslation: () => {
				return {
					t: jest.fn()
				};
			},
			onSelectWallet: jest.fn(),
			fomOptions: [{ id: 0, displayKey: "lbl_MainWallet", balance: 200 }],
			toOptions: [
				{ id: 1, displayKey: "lbl_TpWallet_1", balance: 50 },
				{ id: 21, displayKey: "lbl_TpWallet_21", balance: 320 }
			],
			selectedFromIdx: -1,
			selectedToIdx: -1,
			clickSubmit: jest.fn()
		};
		const { getByTestId } = render(<SetAmount {...fake_data} />);
		fireEvent.click(getByTestId(`dropdown-item-lbl_TpWallet_1`));

		expect(fake_data.onSelectWallet).toHaveBeenCalled();
	});

	// not render test:
	test("selected the dropdown item parameter correctly", () => {
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

// not render test:
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

describe("input value", () => {
	test("input value passing corectly", () => {
		const fake_data = {
			i18n: jest.fn(),
			useTranslation: () => {
				return {
					t: jest.fn()
				};
			},
			onSelectWallet: jest.fn(),
			fomOptions: [{ id: 0, displayKey: "lbl_MainWallet", balance: 200 }],
			toOptions: [
				{ id: 1, displayKey: "lbl_TpWallet_1", balance: 50 },
				{ id: 21, displayKey: "lbl_TpWallet_21", balance: 320 }
			],
			EditAmount: jest.fn(),
			onChange: jest.fn(),
			amount: "100"
		};
		const { getByTestId } = render(<SetAmount {...fake_data} />);
		const input = getByTestId("input");

		fireEvent.change(input, { target: { value: fake_data.amount } });
		// expect(fake_data.EditAmount).toHaveBeenCalled();
		expect(input.value).toBe(fake_data.amount);
	});
});

describe("test function: clickSubmit", () => {
	test("clickSubmit() has been called ", () => {
		const fake_data = {
			i18n: jest.fn(),
			useTranslation: () => {
				return {
					t: jest.fn()
				};
			},
			onSelectWallet: jest.fn(),
			fomOptions: [{ id: 0, displayKey: "lbl_MainWallet", balance: 200 }],
			toOptions: [
				{ id: 1, displayKey: "lbl_TpWallet_1", balance: 50 },
				{ id: 21, displayKey: "lbl_TpWallet_21", balance: 320 }
			],
			clickSubmit: jest.fn()
		};
		const { getByTestId } = render(<SetAmount {...fake_data} />);
		fireEvent.click(getByTestId(`setAmount_submit`));
		expect(fake_data.clickSubmit).toHaveBeenCalled();
	});

	// not render test:
	test("transfer post parameter correctly", () => {
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
