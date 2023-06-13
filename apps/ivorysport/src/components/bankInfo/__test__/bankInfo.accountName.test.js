import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import AccountNamePanel from "../bankInfo.accountName";

const fakeData_hideTip = {
	t: jest.fn(),
	accountName: "test-name",
	clickTip: jest.fn(),
	showTip: false
};

describe("click info icon", () => {
	afterEach(cleanup);
	test("if click info icon, function-clickTip() toHaveBeenCalled", () => {
		const { container } = render(
			<AccountNamePanel {...fakeData_hideTip} />
		);
		const submitBtn = container.getElementsByTagName("button")[0];
		fireEvent.click(submitBtn);
		expect(fakeData_hideTip.clickTip).toHaveBeenCalled();
	});
});

const fakeData_showTip = {
	t: jest.fn(),
	accountName: "test-name",
	clickTip: jest.fn(),
	showTip: true
};

test("if click info icon, display tip", () => {
	const { container } = render(<AccountNamePanel {...fakeData_showTip} />);
	const display_tip = container.getElementsByClassName("tip active")[0];
	expect(display_tip).toBeTruthy();
});
