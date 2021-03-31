import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { TransactionHistory } from "../../deposit/deposit.historyResult";
import "@testing-library/jest-dom";

jest.mock("react-i18next", () => ({
	useTranslation: () => {
		return {
			t: jest.fn()
		};
	}
}));

const fakeData = {
	createTime: "2021-02-02T08:33:52+00:00",
	amount: 1000,
	idx: 1,
	depositType: 3, // must be 3
	status: 1, // must be 1 or 7
	transId: "WD1763",
	ClickCancel: jest.fn(),
	SubmitProof: jest.fn()
};
describe("click submit bank slip button", () => {
	test("click submit bank slip button, function-ClickCancel toHaveBeenCalled", () => {
		const { container } = render(<TransactionHistory {...fakeData} />);
		const bankSlipBtn = container.getElementsByTagName("button")[0];
		fireEvent.click(bankSlipBtn);
		expect(fakeData.SubmitProof).toHaveBeenCalled();
	});
});

describe("click cancel button", () => {
	test("click cancel button, function-ClickCancel toHaveBeenCalled", () => {
		const { container } = render(<TransactionHistory {...fakeData} />);
		const cancelBtn = container.getElementsByTagName("button")[1];
		fireEvent.click(cancelBtn);
		expect(fakeData.ClickCancel).toHaveBeenCalled();
	});
});
