import React from "react";
import { render, fireEvent } from "@testing-library/react";
import BankAccountCard from "../bankInfo.set.bankCard";

const fakeData = {
	custBankList: [
		{
			bankName: "Techcom Bank",
			bankLogo: "TCB.png",
			bankSite: "https://ib.techcombank.com.vn/servlet/BrowserServlet",
			sysId: 5,
			accountNo: "51595959595959"
		},
		{
			bankName: "BIDV",
			bankLogo: "BIDV.png",
			bankSite: "https://www.bidv.com.vn/",
			sysId: 2,
			accountNo: "0022151544354"
		},
		{
			bankName: "LienViet Post Bank",
			bankLogo: "lpb.png",
			bankSite: null,
			sysId: 36,
			accountNo: "2222444444441111"
		}
	],
	delBankAccount: jest.fn(),
	loading: false
};

describe("bank card num", () => {
	test("is dosplay bank card num corectly?", () => {
		const { container } = render(<BankAccountCard {...fakeData} />);
		const card = container.getElementsByClassName("addBankName");
		expect(card.length).toBe(fakeData.custBankList.length);
	});
});

describe("click delete button", () => {
	test("if click delete button function-delBankAccount toHaveBeenCalled", () => {
		const { container } = render(<BankAccountCard {...fakeData} />);
		const delete_btn = container.getElementsByTagName("button")[0];
		fireEvent.click(delete_btn);
		expect(fakeData.delBankAccount).toHaveBeenCalled();
	});
});
