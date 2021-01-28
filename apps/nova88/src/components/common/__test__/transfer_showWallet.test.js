import React from "react";
import renderer from "react-test-renderer";
import { render, cleanup, fireEvent } from "@testing-library/react";
import ShowWallets from "../../transferFunds/showWallets";
import ReloadSpin from "../reloadSpin";

describe("showWallet Snapshot", () => {
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

describe("render showWallet", () => {
	const axios = require("axios");
	const getData = () => {
		return axios.get("url/apiData").then(resp => {
			return resp.data;
		});
	};
	jest.mock("axios");

	test("render showWallet card with fake api", () => {
		const fake_walletInfo = {
			i18n: jest.fn(),
			_isConvert: false,
			restoreAll: jest.fn(),
			getAllWalletData: jest.fn(),
			walletInfo: [
				{ id: 0, displayKey: "lbl_MainWallet", balance: 500 },
				{ id: 1, displayKey: "lbl_TpWallet_1", balance: 100 }
			]
		};
		const res = { data: fake_walletInfo };
		axios.get.mockResolvedValue(res);

		return getData().then(() => {
			const { container } = render(<ShowWallets {...fake_walletInfo} />);
			// expect(container.firstChild.className).toBe("walletModule");
			expect(
				container.getElementsByClassName("walletBalanceModule").length
			).toBe(fake_walletInfo.walletInfo.length);
		});
	});
});

describe("restore all button", () => {
	test("click restoreAll button will trigger function - restoreAll()", () => {
		const fake_walletInfo = {
			i18n: jest.fn(),
			_isConvert: false,
			restoreAll: jest.fn(),
			getAllWalletData: jest.fn(),
			walletInfo: [
				{ id: 0, displayKey: "lbl_MainWallet", balance: 500 },
				{ id: 1, displayKey: "lbl_TpWallet_1", balance: 100 }
			]
		};

		const { getByTestId } = render(<ShowWallets {...fake_walletInfo} />);
		fireEvent.click(
			getByTestId(
				`showWallet_restoreAll_${fake_walletInfo.walletInfo[0].id}`
			)
		);
		expect(fake_walletInfo.restoreAll).toHaveBeenCalled();
	});
});

describe("test click reload spin icon(beside showWallet)", () => {
	afterEach(cleanup);
	test("default reload spin not active", () => {
		const { container } = render(
			<ReloadSpin btnActive={false} func={jest.fn()} />
		);
		expect(container.firstChild.classList.contains("active")).toBe(false);
	});

	test("click reload spin will active", () => {
		const { container } = render(
			<ReloadSpin btnActive={false} func={jest.fn()} />
		);
		fireEvent.click(container.firstChild);
		expect(container.firstChild.classList.contains("active")).toBe(true);
	});
});
