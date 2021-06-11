import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import ChangePasswordForm from "../changePassword.form";

const fakeData = {
	t: jest.fn(),
	clickSubmit: jest.fn().mockImplementation(e => e.preventDefault()),
	userPsw: {
		oldPsw: "",
		newPsw: ""
	},
	editField: jest.fn(),
	checkPswHandler: jest.fn(),
	showPsw: {
		oldPsw: false,
		newPsw: false
	},
	showPswHandler: jest.fn(),
	status: {
		oldPsw: { checked: null, msg: "" },
		newPsw: { checked: null, msg: "" }
	},
	clickInfo: jest.fn()
};

describe("input onChange", () => {
	test("function-EditField toHaveBeenCalled", () => {
		const { container } = render(<ChangePasswordForm {...fakeData} />);
		const first_input = container.getElementsByTagName("input")[0];
		fireEvent.change(first_input, { target: { value: "testValue" } });
		expect(fakeData.editField).toHaveBeenCalled();
	});
	test("function-EditField toHaveBeenCalled", () => {
		const { container } = render(<ChangePasswordForm {...fakeData} />);
		const second_input = container.getElementsByTagName("input")[1];
		fireEvent.change(second_input, { target: { value: "testValue" } });
		expect(fakeData.editField).toHaveBeenCalled();
	});
});

describe("click info icon", () => {
	afterEach(cleanup);
	test("if click info icon, function-clickInfo() toHaveBeenCalled", () => {
		const { container } = render(<ChangePasswordForm {...fakeData} />);
		const icon_btn = container.getElementsByClassName(
			"icon icon-information-solid"
		)[0];
		fireEvent.click(icon_btn);
		expect(fakeData.clickInfo).toHaveBeenCalled();
	});
});

describe("click eye icon", () => {
	afterEach(cleanup);
	test("if click eye icon, function-showPswHandler() toHaveBeenCalled", () => {
		const { container } = render(<ChangePasswordForm {...fakeData} />);
		const eye_icon = container.getElementsByClassName(
			"icon icon-eye-blocked"
		)[0];
		fireEvent.click(eye_icon);
		expect(fakeData.showPswHandler).toHaveBeenCalled();
	});
});

describe("click submit", () => {
	test("if click submit button function-clickSubmit toHaveBeenCalled", () => {
		const { container } = render(<ChangePasswordForm {...fakeData} />);
		const btnGroup = container.getElementsByClassName("btnGroup")[0];
		const submitBtn = btnGroup.lastChild;
		fireEvent.click(submitBtn);
		expect(fakeData.clickSubmit).toHaveBeenCalled();
	});
});

const fakeData_showError = {
	t: jest.fn(),
	clickSubmit: jest.fn().mockImplementation(e => e.preventDefault()),
	userPsw: {
		oldPsw: "",
		newPsw: ""
	},
	editField: jest.fn(),
	checkPswHandler: jest.fn(),
	showPsw: {
		oldPsw: false,
		newPsw: false
	},
	showPswHandler: jest.fn(),
	status: {
		oldPsw: { checked: false, msg: "" },
		newPsw: { checked: null, msg: "" }
	},
	clickInfo: jest.fn()
};

describe("show icon-cross", () => {
	test("if status checked is false, show icon-cross", () => {
		const { container } = render(
			<ChangePasswordForm {...fakeData_showError} />
		);
		const error_icon = container.getElementsByClassName(
			"icon icon-cross"
		)[0];
		expect(error_icon).toBeTruthy();
	});
});
