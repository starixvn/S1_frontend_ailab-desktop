import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import ShowWallets from "../showWallets";

// describe("showWallet Snapshot", () => {
// 	afterEach(cleanup);
// 	test("render correctly", () => {
// 		const fakeData = {
// 			i18n: jest.fn(),
// 			_isConvert: false,
// 			restoreAll: jest.fn(),
// 			getAllWalletData: jest.fn(),
// 			walletInfo: [
// 				{ id: 0, displayKey: "lbl_MainWallet", balance: 500 },
// 				{ id: 1, displayKey: "lbl_TpWallet_1", balance: 100 }
// 			]
// 		};
// 		const tree = render(<ShowWallets {...fakeData} />);
// 		expect(tree).toMatchSnapshot();
// 	});
// });

describe("render showWallet", () => {
	const axios = require("axios");
	const getData = () => {
		return axios.get("url/apiData").then(resp => {
			return resp.data;
		});
	};
	jest.mock("axios");

	test("render showWallet card with fake api", () => {
		const fakeData = {
			i18n: jest.fn(),
			_isConvert: false,
			restoreAll: jest.fn(),
			getAllWalletData: jest.fn(),
			walletInfo: [
				{ id: 0, displayKey: "lbl_MainWallet", balance: 500 },
				{ id: 1, displayKey: "lbl_TpWallet_1", balance: 100 }
			]
		};
		const res = { data: fakeData };
		axios.get.mockResolvedValue(res);

		return getData().then(() => {
			const { container } = render(<ShowWallets {...fakeData} />);
			// expect(container.firstChild.className).toBe("walletModule");
			expect(
				container.getElementsByClassName("walletBalanceModule").length
			).toBe(fakeData.walletInfo.length);
		});
	});
});

describe("restore all button", () => {
	test("click restoreAll button will trigger function - restoreAll()", () => {
		const fakeData = {
			i18n: jest.fn(),
			_isConvert: false,
			restoreAll: jest.fn(),
			getAllWalletData: jest.fn(),
			walletInfo: [
				{ id: 0, displayKey: "lbl_MainWallet", balance: 500 },
				{ id: 1, displayKey: "lbl_TpWallet_1", balance: 100 }
			]
		};

		const { getByTestId } = render(<ShowWallets {...fakeData} />);
		fireEvent.click(
			getByTestId(`showWallet_restoreAll_${fakeData.walletInfo[0].id}`)
		);
		expect(fakeData.restoreAll).toHaveBeenCalled();
	});
});

describe("test click reload spin icon(beside showWallet)", () => {
	afterEach(cleanup);
	const fakeData = {
		i18n: jest.fn(),
		_isConvert: false,
		restoreAll: jest.fn(),
		getAllWalletData: jest.fn(),
		walletInfo: [
			{ id: 0, displayKey: "lbl_MainWallet", balance: 500 },
			{ id: 1, displayKey: "lbl_TpWallet_1", balance: 100 }
		]
	};
	test("default reload spin not active", () => {
		const { getByLabelText } = render(<ShowWallets {...fakeData} />);
		expect(getByLabelText("clickSpin").classList.contains("active")).toBe(
			false
		);
	});

	test("click reload spin will active", () => {
		const { getByLabelText } = render(<ShowWallets {...fakeData} />);
		fireEvent.click(getByLabelText("clickSpin"));
		expect(getByLabelText("clickSpin").classList.contains("active")).toBe(
			true
		);
	});
});
