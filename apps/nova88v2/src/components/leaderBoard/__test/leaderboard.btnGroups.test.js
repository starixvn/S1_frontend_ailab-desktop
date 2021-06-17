import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ButtonGroups from "../leaderBoard.btnGroups";

const fakeData = {
	t: jest.fn(),
	periodId: 2,
	onChangePeriod: jest.fn(),
	beforeDays: 3,
	onChangeDays: jest.fn()
};

describe("onChangePeriod", () => {
	const _tab = 2;
	test("if click the period buttons, function-onChangePeriod have been called", () => {
		const { container } = render(<ButtonGroups {...fakeData} tab={_tab} />);
		const button_groups = container.getElementsByTagName("button");
		const button_first = button_groups[0];
		fireEvent.click(button_first);
		expect(fakeData.onChangePeriod).toHaveBeenCalled();
	});
});

describe("onChangeDays", () => {
	const _tab = 4;
	test("if click the day buttons, function-onChangeDays have been called", () => {
		const { container } = render(<ButtonGroups {...fakeData} tab={_tab} />);
		const button_groups = container.getElementsByTagName("button");
		const button_first = button_groups[0];
		fireEvent.click(button_first);
		expect(fakeData.onChangeDays).toHaveBeenCalled();
	});
});
