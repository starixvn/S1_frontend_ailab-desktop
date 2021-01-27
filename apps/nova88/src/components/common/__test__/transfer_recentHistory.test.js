import React from "react";
import renderer from "react-test-renderer";
import { render, cleanup, fireEvent } from "@testing-library/react";
import RecentHistory from "../../transferFunds/recentHistory";
import ReloadSpin from "../reloadSpin";

jest.mock("react-i18next", () => ({
	useTranslation: () => {
		return {
			t: jest.fn()
		};
	}
}));

describe("test click reload spin icon(beside showWallet)", () => {
	afterEach(cleanup);
	const fake_data = {
		getHistory: jest.fn(),
		getTransferRecent: jest.fn()
	};
	test("default reload spin not active", () => {
		const { getByTestId } = render(<RecentHistory {...fake_data} />);
		fireEvent.click(getByTestId(`reloadSpin`));
		expect(container.firstChild.classList.contains("active")).toBe(false);
	});

	test("click reload spin will active", () => {
		const { getByTestId } = render(<RecentHistory {...fake_data} />);
		fireEvent.click(getByTestId(`reloadSpin`));
		expect(container.firstChild.classList.contains("active")).toBe(true);
	});
});
