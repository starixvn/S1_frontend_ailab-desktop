import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { LoginForm } from "../popBox.login";

const fakeData = {
	t: jest.fn(),
	clickCancel: jest.fn(),
	userInfo: { username: "" },
	openJoin: jest.fn(),
	handleLogin: jest.fn().mockImplementation(e => e.preventDefault()),
	userValue: {
		username: "",
		password: ""
	},
	EditField: jest.fn(),
	checkValue: jest.fn(),
	clickInfo: jest.fn(),
	tip: {
		username: { checked: null, msg: "testValue" },
		password: { checked: null, msg: "" }
	},
	showPsw: false,
	showPswHandler: jest.fn()
};

describe("click close", () => {
	test("if click close button function-clickCancel toHaveBeenCalled", () => {
		const { container } = render(<LoginForm {...fakeData} />);
		const btnClose = container.getElementsByClassName("icon icon-close")[0];
		fireEvent.click(btnClose);
		expect(fakeData.clickCancel).toHaveBeenCalled();
	});
});

describe("link to join", () => {
	test("if click join now link, function-openJoin toHaveBeenCalled", () => {
		const { container } = render(<LoginForm {...fakeData} />);
		const joinLink = container.getElementsByTagName("a")[0];
		fireEvent.click(joinLink);
		expect(fakeData.openJoin).toHaveBeenCalled();
	});
});

describe("click info icon", () => {
	afterEach(cleanup);
	test("if click info icon, function-clickInfo() toHaveBeenCalled", () => {
		const { container } = render(<LoginForm {...fakeData} />);
		const first_InfoIcon = container.getElementsByClassName(
			"icon icon-information-solid"
		)[0];
		fireEvent.click(first_InfoIcon);
		expect(fakeData.clickInfo).toHaveBeenCalled();
	});

	test("if click info icon, show tip text", () => {
		const { container } = render(<LoginForm {...fakeData} />);
		const allInfoIcon = container.getElementsByClassName(
			"icon icon-information-solid"
		);
		const first_infoIcon = allInfoIcon[0];
		fireEvent.click(first_infoIcon);

		const dsiplay_tip = container.getElementsByClassName("tip active")[0];
		expect(dsiplay_tip.className.includes("active")).toBe(true);
	});
});

describe("input onChange", () => {
	test("function-EditField toHaveBeenCalled", () => {
		const { container } = render(<LoginForm {...fakeData} />);
		const allInputs = container.getElementsByTagName("input");
		const first_input = allInputs[0];
		fireEvent.change(first_input, { target: { value: "testValue" } });
		expect(fakeData.EditField).toHaveBeenCalled();
	});
});

describe("function-showPswHandler", () => {
	test("if click eye icon, function-showPswHandler toHaveBeenCalled", () => {
		const { container } = render(<LoginForm {...fakeData} />);
		const iconEye = container.getElementsByClassName(
			"icon icon-eye-blocked"
		)[0];
		fireEvent.click(iconEye);
		expect(fakeData.showPswHandler).toHaveBeenCalled();
	});
});

describe("click submit", () => {
	test("if click submit button function-handleLogin toHaveBeenCalled", () => {
		const { container } = render(<LoginForm {...fakeData} />);
		const btnGroup = container.getElementsByClassName("btnGroup")[0];
		const submitBtn = btnGroup.lastChild;
		fireEvent.click(submitBtn);
		expect(fakeData.handleLogin).toHaveBeenCalled();
	});
});
