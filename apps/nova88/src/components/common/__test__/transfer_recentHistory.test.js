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

describe("test click reload spin icon(beside showWallet)", () => {
	afterEach(cleanup);
	const getHistory = [];
	const getTransferRecent = jest.fn();
	const userInfo = {
		isLogin: true,
		currencyId: 1,
		accountName: "",
		phoneNo: "",
		email: "",
		langId: "en"
	};

	test("default reload spin not active", () => {
		const { getByTestId } = render(
			<recentHistoryWrapper
				getHistory={getHistory}
				getTransferRecent={getTransferRecent}
				userInfo={userInfo}
			/>
		);
		const reloadComponent = getByTestId("reloadSpin");
		expect(reloadComponent.classList.contains("active")).toBe(false);
	});

	test("click reload spin will active", () => {
		const { getByTestId } = render(
			<recentHistoryWrapper
				getHistory={getHistory}
				getTransferRecent={getTransferRecent}
				userInfo={userInfo}
			/>
		);
		const reloadComponent = getByTestId("reloadSpin");
		fireEvent.click(reloadComponent);
		expect(reloadComponent.classList.contains("active")).toBe(true);
	});
});

describe("render ", () => {
	test("render history items num correct", () => {
		const getHistory = [
			{
				amount: 204831,
				createTime: "2021-01-11T09:09:54+00:00",
				direction: 1,
				memo: "amount isn't not enough: 204831.0000",
				status: 1,
				tpName: "体育钱包",
				transId: "TD4366"
			},
			{
				amount: 204831,
				createTime: "2021-01-11T09:09:52+00:00",
				direction: 1,
				memo: "amount isn't not enough: 204831.0000",
				status: 1,
				tpName: "918Kiss",
				transId: "TD4365"
			}
		];

		const getTransferRecent = jest.fn();
		const userInfo = {
			isLogin: true,
			currencyId: 1,
			accountName: "",
			phoneNo: "",
			email: "",
			langId: "en"
		};

		const { container } = render(
			<recentHistoryWrapper
				getHistory={getHistory}
				getTransferRecent={getTransferRecent}
				userInfo={userInfo}
			/>
		);
		// const listBody = container.getElementsByClassName("listBody");
		// expect(listBody.children.length).toBe(2);
		// expect(container.getElementsByClassName("listBody").length).toBe(1);
		expect(
			container.getElementsByClassName("nodata icon icon-nodata").length
		).toBe(1);
	});
});
