import React from "react";
import { render } from "@testing-library/react";
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
			amount: 300,
			bankInfo: { sysId: 35, currencyId: 2 },
			createTime: "2021-05-27T08:09:33+00:00",
			depositRep: {
				ver: 1,
				sysId: 35,
				accountName: "Superman",
				accountNo: "53432424",
				currencyId: 2
			},
			depositTime: null,
			depositType: 3,
			picFileName: null,
			refId: null,
			status: 1,
			thirdId: null,
			transId: "DD173443"
		}
	],
	columns: [
		{
			title: "NO.",
			dataIndex: "no",
			key: "no"
		},
		{
			title: "Date",
			dataIndex: "createTime",
			key: "createTime"
		},
		{
			title: "ID",
			dataIndex: "transId",
			key: "transId"
		},
		{
			title: "Method",
			dataIndex: "depositType",
			key: "depositType"
		},
		{
			title: "Amount",
			dataIndex: "amount",
			key: "amount"
		},
		{
			title: "Status",
			dataIndex: "status",
			key: "status"
		},
		{ dataIndex: "action", key: "action" }
	]
};

describe("test deposit table render item", () => {
	test("test deposit table render item", () => {
		const { container } = render(<HistoryTable {...fakeData} />);
		const listBody = container.getElementsByClassName("list history")[0];
		expect(listBody.children.length).toBe(fakeData.dataSource.length);
	});
});
