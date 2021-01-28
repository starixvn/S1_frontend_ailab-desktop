import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import * as ct from "../../common/context";
import RecentHistory from "../recentHistory";

jest.mock("react-i18next", () => ({
	useTranslation: () => {
		return {
			t: jest.fn()
		};
	}
}));

const RecentHistoryWrapper = ({ userInfo, getHistory, getTransferRecent }) => (
	<ct.userInfoContext.Provider value={{ userInfo, setUserInfo: jest.fn() }}>
		<RecentHistory
			getHistory={getHistory}
			getTransferRecent={getTransferRecent}
		/>
	</ct.userInfoContext.Provider>
);

describe("test click reload spin icon(beside recent history)", () => {
	afterEach(cleanup);
	const getHistory = [{ amount: 100 }, { amount: 200 }];
	const getTransferRecent = jest.fn();
	const userInfo = {
		currencyId: 2,
		langId: "en"
	};
	test("default reload spin not active", () => {
		const { getByLabelText } = render(
			<RecentHistoryWrapper
				getHistory={getHistory}
				getTransferRecent={getTransferRecent}
				userInfo={userInfo}
			/>
		);
		expect(getByLabelText("clickSpin").classList.contains("active")).toBe(
			false
		);
	});
	test("click reload spin will active", () => {
		const { getByLabelText } = render(
			<RecentHistoryWrapper
				getHistory={getHistory}
				getTransferRecent={getTransferRecent}
				userInfo={userInfo}
			/>
		);
		fireEvent.click(getByLabelText(`clickSpin`));
		expect(getByLabelText(`clickSpin`).className.includes("active")).toBe(
			true
		);
	});
});

describe("recentHistory array item render ", () => {
	const getTransferRecent = jest.fn();
	const userInfo = {
		currencyId: 2,
		langId: "en"
	};
	test("if getHistory length > 0 ,table body class show`listBody` ", () => {
		const getHistory = [{ amount: 100 }, { amount: 200 }];
		const { container } = render(
			<RecentHistoryWrapper
				getHistory={getHistory}
				getTransferRecent={getTransferRecent}
				userInfo={userInfo}
			/>
		);
		expect(container.getElementsByClassName("listBody").length).toBe(1);
	});

	test("if getHistory length = 0 ,table body class show`no-data` ", () => {
		const getHistory = [];
		const { container } = render(
			<RecentHistoryWrapper
				getHistory={getHistory}
				getTransferRecent={getTransferRecent}
				userInfo={userInfo}
			/>
		);

		expect(container.getElementsByClassName("nodata").length).toBe(1);
	});
});
