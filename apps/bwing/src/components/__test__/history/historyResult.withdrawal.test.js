import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { TransactionHistory } from "../../withdrawal/historyResult";
import "@testing-library/jest-dom";

jest.mock("react-i18next", () => ({
	useTranslation: () => {
		return {
			t: jest.fn()
		};
	}
}));

describe("click cancel button", () => {
	test("click cancel button, function-ClickCancel toHaveBeenCalled", () => {
		const fakeData = {
			createTime: "2021-02-02T08:33:52+00:00",
			amount: 1000,
			idx: 4,
			status: 1, // cancel button only display when status be 1 or 0
			transId: "WD1653",
			ClickCancel: jest.fn()
		};
		const { container } = render(<TransactionHistory {...fakeData} />);
		const cancelBtn = container.getElementsByClassName("btn-cancel")[0];
		fireEvent.click(cancelBtn);
		expect(fakeData.ClickCancel).toHaveBeenCalled();
	});
});
