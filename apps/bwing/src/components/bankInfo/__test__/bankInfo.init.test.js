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
	test("if bank num <3 ,display add bank button", () => {
		const { container } = render(<InitPanel {...fakeData_one_bank} />);
		const add_btn = container.getElementsByClassName("btn-check")[0];
		expect(add_btn).toBeTruthy();
	});

	test("if click addBank, function-toNextStep  toHaveBeenCalled", () => {
		const { container } = render(<InitPanel {...fakeData_one_bank} />);
		const add_btn = container.getElementsByClassName("btn-check")[0];
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
	test("if full bank ,display bank card is full", () => {
		const { container } = render(<InitPanel {...fakeData_full_bank} />);
		const full_btn = container.getElementsByClassName("btn-cancel")[0];
		expect(full_btn).toBeTruthy();
	});
});
