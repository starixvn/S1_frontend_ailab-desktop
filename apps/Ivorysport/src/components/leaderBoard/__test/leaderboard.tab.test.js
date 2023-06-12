import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LeaderboardTabs from "../leaderBoard.tabs";

const defTabId = {
	first: 1,
	second: 2,
	third: 3,
	fourth: 4
};

const fakeData = {
	t: jest.fn(),
	onChangeTab: jest.fn(),
	tab: 1,
	defTabList: [
		{
			id: defTabId.first,
			displayKey: "first"
		},
		{
			id: defTabId.second,
			displayKey: "second"
		},
		{
			id: defTabId.third,
			displayKey: "third"
		},
		{
			id: defTabId.fourth,
			displayKey: "fourth"
		}
	]
};

describe("tab num", () => {
	test("is tab item num = defTabList.length ", () => {
		const { container } = render(<LeaderboardTabs {...fakeData} />);
		const allITabs = container.getElementsByTagName("button");
		expect(allITabs.length).toBe(fakeData.defTabList.length);
	});
});

describe("input onChange", () => {
	test("if click tab ,function-onChangeTab toHaveBeenCalled", () => {
		const { container } = render(<LeaderboardTabs {...fakeData} />);
		const allITabs = container.getElementsByTagName("button");
		const secondTab = allITabs[1];
		fireEvent.click(secondTab);
		expect(fakeData.onChangeTab).toHaveBeenCalled();
	});
});
