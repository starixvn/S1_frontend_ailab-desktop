import React from "react";
import { render, fireEvent } from "@testing-library/react";
import InitPanel from "../bankInfo.set.init";

const fakeData_one_bank = {
	t: jest.fn(),
	dispatch: jest.fn(),
	numberOfAccount: 1,
	toNextStep: jest.fn()
};
describe("if bank num <3", () => {
	test("if bank num <3 ,display plus icon", () => {
		const { container } = render(<InitPanel {...fakeData_one_bank} />);
		const icon_plus = container.getElementsByClassName("icon icon-plus")[0];
		expect(icon_plus).toBeTruthy();
	});

	test("if click addBank, function-toNextStep  toHaveBeenCalled", () => {
		const { container } = render(<InitPanel {...fakeData_one_bank} />);
		const add_btn = container.getElementsByClassName(
			"addBankName noBank"
		)[0];
		fireEvent.click(add_btn);
		expect(fakeData_one_bank.toNextStep).toHaveBeenCalled();
	});
});

const fakeData_full_bank = {
	t: jest.fn(),
	dispatch: jest.fn(),
	numberOfAccount: 3,
	toNextStep: jest.fn()
};

describe("if full bank", () => {
	test("if full bank ,display warning icon", () => {
		const { container } = render(<InitPanel {...fakeData_full_bank} />);
		const icon_warning = container.getElementsByClassName(
			"icon icon-warning"
		)[0];
		expect(icon_warning).toBeTruthy();
	});
});
