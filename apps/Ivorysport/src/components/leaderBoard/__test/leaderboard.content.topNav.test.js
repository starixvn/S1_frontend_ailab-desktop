import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ButtonGroups from "../leaderBoard.content.topNav";

const fakeData = {
	t: jest.fn(),
	onChangePeriod: jest.fn(),
	periodId: 2,
	onChangeDays: jest.fn(),
	beforeDays: 3,
	onChangeGameType: jest.fn(),
	gameType: 3,
	periodList: [
		{
			id: 1,
			displayKey: "lbl_Aug",
			startDate: "2021-08-01",
			endDate: "2021-08-30"
		},
		{
			id: 2,
			displayKey: "lbl_Aug",
			year: "2021",
			startDate: "2021-09-01",
			endDate: "2021-09-30"
		}
	]
};

describe("onChangeDays", () => {
	const _tab = 2;
	test("if click the period buttons, function-onChangeDays have been called", () => {
		const { container } = render(<ButtonGroups {...fakeData} tab={_tab} />);
		const button = container.getElementsByTagName("button");
		const button_first = button[0];
		fireEvent.click(button_first);
		expect(fakeData.onChangeDays).toHaveBeenCalled();
	});
});

describe("onChangeGameType", () => {
	const _tab = 3;
	test("if click the day buttons, function-onChangeGameType have been called", () => {
		const { container } = render(<ButtonGroups {...fakeData} tab={_tab} />);
		const button = container.getElementsByTagName("button");
		const button_first = button[0];
		fireEvent.click(button_first);
		expect(fakeData.onChangeGameType).toHaveBeenCalled();
	});
});
