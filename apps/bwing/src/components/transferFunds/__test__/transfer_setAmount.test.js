import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SetAmount from "../setAmount";

jest.mock("react-i18next", () => ({
	useTranslation: () => {
		return {
			t: jest.fn()
		};
	}
}));

describe("open dropdown ", () => {
	test("The dropdown menu can be opened/closed correctly", () => {
		const fakeData = {
			t: jest.fn(),
			onSelectWallet: jest.fn(),
			fomOptions: [],
			walletOptions: [
				{ id: 0, displayKey: "lbl_MainWallet", balance: 200 },
				{ id: 1, displayKey: "lbl_TpWallet_1", balance: 50 },
				{ id: 21, displayKey: "lbl_TpWallet_21", balance: 320 }
			],
			mainKey: `from_wallet`,
			onChange: jest.fn(),
			clickSubmit: jest.fn(),
			_isConvert: true,
			clickInfo: jest.fn(),
			onBlur: jest.fn(),
			tip: "tip",
			amount: "",
			selectedToIdx: 1,
			selectedFromIdx: 2
		};
		const { container } = render(<SetAmount {...fakeData} />);
		const dopdown_from = container.getElementsByClassName(
			"dropdown-container"
		)[0];
		// click to open ↓
		fireEvent.click(dopdown_from);
		expect(dopdown_from.className.includes("active")).toBe(true);
		// click to close ↓
		fireEvent.click(dopdown_from);
		expect(dopdown_from.className.includes("active")).toBe(false);
	});
});

describe("render wallet dropdown items", () => {
	test("render dropdown items num correct", () => {
		const fakeData = {
			t: jest.fn(),
			onSelectWallet: jest.fn(),
			walletOptions: [
				{ id: 0, displayKey: "lbl_MainWallet", balance: 200 },
				{ id: 1, displayKey: "lbl_TpWallet_1", balance: 50 },
				{ id: 21, displayKey: "lbl_TpWallet_21", balance: 320 }
			],
			onChange: jest.fn(),
			clickSubmit: jest.fn(),
			_isConvert: true,
			clickInfo: jest.fn(),
			onBlur: jest.fn(),
			tip: "tip",
			amount: "",
			selectedToIdx: 1,
			selectedFromIdx: 2
		};

		const { container } = render(<SetAmount {...fakeData} />);
		expect(container.getElementsByClassName("dropdown-item").length).toBe(
			fakeData.walletOptions.length * 2
		);
	});
});

describe("test function: onSelectWallet()", () => {
	test("onchange function have been called", () => {
		const fakeData = {
			t: jest.fn(),
			useTranslation: () => {
				return {
					t: jest.fn()
				};
			},
			onSelectWallet: jest.fn(),
			walletOptions: [
				{ id: 0, displayKey: "lbl_MainWallet", balance: 200 },
				{ id: 1, displayKey: "lbl_TpWallet_1", balance: 50 },
				{ id: 21, displayKey: "lbl_TpWallet_21", balance: 320 }
			],
			selectedFromIdx: -1,
			selectedToIdx: -1,
			onChange: jest.fn(),
			clickSubmit: jest.fn(),
			_isConvert: true,
			clickInfo: jest.fn(),
			onBlur: jest.fn(),
			tip: "tip",
			amount: ""
		};
		const { container } = render(<SetAmount {...fakeData} />);
		const dopdownItems = container.getElementsByClassName("dropdown-item");
		const dopdownItem_first = dopdownItems[0];
		fireEvent.click(dopdownItem_first);
		expect(fakeData.onSelectWallet).toHaveBeenCalled();
	});
});

describe("input value", () => {
	test("input value passing corectly", () => {
		const fakeData = {
			t: jest.fn(),
			useTranslation: () => {
				return {
					t: jest.fn()
				};
			},
			onSelectWallet: jest.fn(),
			walletOptions: [
				{ id: 0, displayKey: "lbl_MainWallet", balance: 200 },
				{ id: 1, displayKey: "lbl_TpWallet_1", balance: 50 },
				{ id: 21, displayKey: "lbl_TpWallet_21", balance: 320 }
			],
			EditAmount: jest.fn(),
			onChange: jest.fn(),
			amount: "100",
			selectedToIdx: 1,
			selectedFromIdx: 2,
			onBlur: jest.fn(),
			tip: "tip",
			_isConvert: true
		};
		const { container } = render(<SetAmount {...fakeData} />);
		const input = container.getElementsByTagName("input")[0];
		fireEvent.change(input, { target: { value: fakeData.amount } });
		expect(input.value).toBe(fakeData.amount);
	});
});

describe("test function: clickSubmit", () => {
	test("clickSubmit() has been called ", () => {
		const fakeData = {
			t: jest.fn(),
			useTranslation: () => {
				return {
					t: jest.fn()
				};
			},
			onSelectWallet: jest.fn(),
			walletOptions: [
				{ id: 0, displayKey: "lbl_MainWallet", balance: 200 },
				{ id: 1, displayKey: "lbl_TpWallet_1", balance: 50 },
				{ id: 21, displayKey: "lbl_TpWallet_21", balance: 320 }
			],
			onChange: jest.fn(),
			clickSubmit: jest.fn(),
			_isConvert: true,
			clickInfo: jest.fn(),
			onBlur: jest.fn(),
			tip: "tip",
			amount: "1",
			selectedToIdx: 1,
			selectedFromIdx: 2
		};
		const { container } = render(<SetAmount {...fakeData} />);
		const submitButton = container.getElementsByClassName("btn-check")[0];
		fireEvent.submit(submitButton);
		expect(fakeData.clickSubmit).toHaveBeenCalled();
	});
});
