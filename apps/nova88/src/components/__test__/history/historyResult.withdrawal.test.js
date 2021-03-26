import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { HistoryResult } from "../../withdrawal/withdrawal.historyResult";
import "@testing-library/jest-dom";

// jest.mock("react-i18next", () => ({
// 	useTranslation: () => {
// 		return {
// 			t: jest.fn()
// 		};
// 	}
// }));

describe("click cancel button", () => {
	test("click cancel button, function-ClickCancel toHaveBeenCalled", () => {
		const fakeData = {
			i18n: jest.fn(),
			createTime: "2021-02-02T08:33:52+00:00",
			amount: 1000,
			idx: 4,
			status: 1, // cancel button only display when status be 1 or 8
			transId: "123",
			ClickCancel: jest.fn(),
			_isConvert: false,
			chargeFee: 0
		};
		const { container } = render(<HistoryResult {...fakeData} />);
		const cancelBtn = container.getElementsByTagName("button")[0];
		fireEvent.click(cancelBtn);
		expect(fakeData.ClickCancel).toHaveBeenCalled();
	});
});
