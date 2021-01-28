import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";
import * as ct from "../context";
import RecentHistory from "../../transferFunds/recentHistory";

jest.mock("react-i18next", () => ({
	useTranslation: () => {
		return {
			t: jest.fn()
		};
	}
}));

const recentHistoryWrapper = ({ userInfo }) => (
	<ct.userInfoContext.Provider value={{ userInfo, setUserInfo: jest.fn() }}>
		<RecentHistory />
	</ct.userInfoContext.Provider>
);

describe("test click reload spin icon(beside recent history)", () => {
	afterEach(cleanup);
	const getHistory = [];
	const getTransferRecent = jest.fn();

	test("default reload spin not active", () => {
		const { getByLabelText } = render(
			<RecentHistory
				getHistory={getHistory}
				getTransferRecent={getTransferRecent}
			/>
		);
		expect(getByLabelText("clickSpin").classList.contains("active")).toBe(
			false
		);
	});
	test("click reload spin will active", () => {
		const { getByLabelText } = render(
			<RecentHistory
				getHistory={getHistory}
				getTransferRecent={getTransferRecent}
			/>
		);
		fireEvent.click(getByLabelText(`clickSpin`));
		expect(getByLabelText(`clickSpin`).className.includes("active")).toBe(
			true
		);
	});
});

describe("recentHistory array item render ", () => {
	test("if getHistory length > 0 ,table body class show`listBody` ", () => {
		const getHistory = [{ amount: 100 }, { amount: 200 }];
		const getTransferRecent = jest.fn();
		const { container } = render(
			<RecentHistory
				getHistory={getHistory}
				getTransferRecent={getTransferRecent}
			/>
		);
		expect(container.getElementsByClassName("listBody").length).toBe(1);
	});

	test("if getHistory length = 0 ,table body class show`no-data` ", () => {
		const getHistory = [];
		const getTransferRecent = jest.fn();
		const { container } = render(
			<RecentHistory
				getHistory={getHistory}
				getTransferRecent={getTransferRecent}
			/>
		);

		expect(
			container.getElementsByClassName("nodata icon icon-nodata").length
		).toBe(1);
	});
});
