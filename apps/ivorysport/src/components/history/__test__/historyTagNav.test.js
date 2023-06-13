import React from "react";
import { render, fireEvent } from "@testing-library/react";
import HistoryTagNav from "../historyTagNav";

const fakeData = {
	t: jest.fn(),
	pathname: "",
	selectedTagId: "6602",
	setSelectedTagId: jest.fn(),
	resetPage: jest.fn(),
	defHistoryNav: [
		{
			displayKey: "lbl_Transfer",
			id: "6601"
		},
		{
			displayKey: "lbl_Deposit",
			id: "6602"
		},
		{ displayKey: "lbl_Withdrawal", id: "6603" },
		{ displayKey: "lbl_Financial", id: "6604" },
		{
			displayKey: "lbl_Referral",
			id: "6605"
		}
	]
};

describe("tag num", () => {
	test("is tag item num = defHistoryNav.length ", () => {
		const { container } = render(<HistoryTagNav {...fakeData} />);
		const allITags = container.getElementsByTagName("button");
		expect(allITags.length).toBe(fakeData.defHistoryNav.length);
	});
});

describe("tag onChange", () => {
	test("if click tag ,function-setSelectedTagId toHaveBeenCalled", () => {
		const { container } = render(<HistoryTagNav {...fakeData} />);
		const allITabs = container.getElementsByTagName("button");
		const firstTab = allITabs[0];
		fireEvent.click(firstTab);
		expect(fakeData.setSelectedTagId).toHaveBeenCalled();
	});
});
