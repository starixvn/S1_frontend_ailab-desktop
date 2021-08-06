import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TransferHeader from "../transfer.header";

const fakeData = {
	t: jest.fn(),
	onChangeAutoTransfer: jest.fn(),
	isAutoTransfer: true
};

describe("click switch button", () => {
	test("if click switch button function-onChangeAutoTransfer toHaveBeenCalled", () => {
		const { container } = render(<TransferHeader {...fakeData} />);
		const switch_btn = container.getElementsByTagName("button")[0];
		fireEvent.click(switch_btn);
		expect(fakeData.onChangeAutoTransfer).toHaveBeenCalled();
	});
});

describe("click switch button", () => {
	test("if isAutoTransfer is true switch button class name has active ", () => {
		const { container } = render(<TransferHeader {...fakeData} />);
		const switch_btn = container.getElementsByTagName("button")[0];
		expect(switch_btn.classList.contains("active")).toBe(true);
	});
});
