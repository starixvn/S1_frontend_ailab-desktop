import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { defHistoryIdList, defColumns } from "../def";
import HistoryTable from "../historyTable";

const fakeData = {
	t: jest.fn(),
	dataSource: [
		{
			createTime: "2021-05-27T08:09:44+00:00",
			depositType: 3,
			transId: "DD173444",
			amount: 300,
			status: 1,
			depositRep: {
				accountNo: "1887787878"
			},
			bankInfo: {
				sysId: 37
			}
		},
		{
			createTime: "2021-05-27T08:09:20+00:00",
			depositType: 1,
			transId: "DD173442",
			amount: 100,
			status: 1,
			depositRep: null,
			bankInfo: null
		}
	],
	columns,
	children
};

describe("click cancel button", () => {
	test("click cancel button, function-ClickCancel toHaveBeenCalled", () => {
		const { container } = render(<HistoryTable {...fakeData} />);
		const cancelBtn = container.getElementsByClassName("btn-cancel")[0];
		fireEvent.click(cancelBtn);
		expect(fakeData.ClickCancel).toHaveBeenCalled();
	});
});
