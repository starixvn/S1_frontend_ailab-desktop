import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import ResetPasswordForm from "../resetPassword.form";

const fakeData = {
	t: jest.fn(),
	newPsw: "",
	editField: jest.fn(),
	checkPswHandler: jest.fn(),
	showPsw: false,
	showPswHandler: jest.fn(),
	status: { checked: null, msg: "" },
	clickInfo: jest.fn(),
	clickSubmit: jest.fn().mockImplementation(e => e.preventDefault())
};

describe("input onChange", () => {
	test("function-EditField toHaveBeenCalled", () => {
		const { container } = render(<ResetPasswordForm {...fakeData} />);
		const first_input = container.getElementsByTagName("input")[0];
		fireEvent.change(first_input, { target: { value: "testValue" } });
		expect(fakeData.editField).toHaveBeenCalled();
	});
});

describe("click submit", () => {
	test("if click submit button function-clickSubmit toHaveBeenCalled", () => {
		const { container } = render(<ResetPasswordForm {...fakeData} />);
		const btnGroup = container.getElementsByClassName("btnGroup")[0];
		const submitBtn = btnGroup.lastChild;
		fireEvent.click(submitBtn);
		expect(fakeData.clickSubmit).toHaveBeenCalled();
	});
});
