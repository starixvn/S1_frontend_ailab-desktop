import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { HeaderLogin } from "../header.login";

const fakeData = {
	t: jest.fn(),
	showPsw: false,
	EditField: jest.fn(),
	handleLogin: jest.fn().mockImplementation(e => e.preventDefault()),
	userValue: {
		username: "",
		password: ""
	},
	langId: "en",
	path: {
		join: {
			root: "join"
		}
	}
};
describe("input onChange", () => {
	test("function-EditField toHaveBeenCalled", () => {
		const { container } = render(<HeaderLogin {...fakeData} />);
		const allInputs = container.getElementsByTagName("input");
		const first_input = allInputs[0];
		fireEvent.change(first_input, { target: { value: "testValue" } });
		expect(fakeData.EditField).toHaveBeenCalled();
	});
});

describe("click login", () => {
	test("if click login link function-handleLogin toHaveBeenCalled", () => {
		const { container } = render(<HeaderLogin {...fakeData} />);
		const loginLink = container.getElementsByTagName("a")[0];
		// expect(loginLink.className).toBe("xxx");
		fireEvent.click(loginLink);
		expect(fakeData.handleLogin).toHaveBeenCalled();
	});
});
