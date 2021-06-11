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

describe("click info icon", () => {
	afterEach(cleanup);
	test("if click info icon, function-clickInfo() toHaveBeenCalled", () => {
		const { container } = render(<ResetPasswordForm {...fakeData} />);
		const icon_btn = container.getElementsByClassName(
			"icon icon-information-solid"
		)[0];
		fireEvent.click(icon_btn);
		expect(fakeData.clickInfo).toHaveBeenCalled();
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

const fakeData_showError = {
	t: jest.fn(),
	newPsw: "",
	editField: jest.fn(),
	checkPswHandler: jest.fn(),
	showPsw: false,
	showPswHandler: jest.fn(),
	status: { checked: false, msg: "" },
	clickInfo: jest.fn(),
	clickSubmit: jest.fn().mockImplementation(e => e.preventDefault())
};

describe("show icon-cross", () => {
	test("if status checked is false, show icon-cross", () => {
		const { container } = render(
			<ResetPasswordForm {...fakeData_showError} />
		);
		const error_icon = container.getElementsByClassName(
			"icon icon-cross"
		)[0];
		expect(error_icon).toBeTruthy();
	});
});
