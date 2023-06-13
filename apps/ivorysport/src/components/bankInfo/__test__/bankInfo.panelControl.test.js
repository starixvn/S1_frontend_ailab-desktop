import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PanelControl from "../bankInfo.panelControl";

jest.mock("react-i18next", () => ({
	useTranslation: () => {
		return {
			t: jest.fn()
		};
	}
}));

// ---------- ↓↓ test component:<bankinfo.set.bank> ----------
const fakeData_bankPanel = {
	t: jest.fn(),
	defModule: {
		AccountPanel: "AccountPanel",
		BankPanel: "BankPanel",
		InitPanel: "InitPanel"
	},
	currentModule: "BankPanel",
	dispatch: jest.fn(),
	toLastStep: jest.fn(),
	bankList: [
		{
			sysId: 1,
			currencyId: 51,
			bankCode: "ACB",
			bankName: "Asia Commercial Bank",
			bankLogo: "ACB.png",
			bankSite: "https://online.acb.com.vn/acbib"
		},
		{
			sysId: 2,
			currencyId: 51,
			bankCode: "BIDV",
			bankName: "BIDV",
			bankLogo: "BIDV.png",
			bankSite: "https://www.bidv.com.vn/"
		}
	],
	selectBank: jest.fn()
};

describe("click back button", () => {
	test("if click back button function-toLastStep toHaveBeenCalled", () => {
		const { container } = render(<PanelControl {...fakeData_bankPanel} />);
		// const back_btn = container.getElementsByClassName("icon icon-arrow-left2")[0];
		const back_btn = container.getElementsByTagName("button")[0];
		fireEvent.click(back_btn);
		expect(fakeData_bankPanel.toLastStep).toHaveBeenCalled();
	});
});

describe("click bank logo", () => {
	test("if click logo button function-selectBank toHaveBeenCalled", () => {
		const { container } = render(<PanelControl {...fakeData_bankPanel} />);
		const logo_btn_first = container.getElementsByTagName("a")[0];
		fireEvent.click(logo_btn_first);
		expect(fakeData_bankPanel.selectBank).toHaveBeenCalled();
	});
});

// ---------- ↓↓ test component:<bankinfo.set.account> ----------
const fakeData_accountPanel = {
	t: jest.fn(),
	defModule: {
		AccountPanel: "AccountPanel",
		BankPanel: "BankPanel",
		InitPanel: "InitPanel"
	},
	currentModule: "AccountPanel",
	dispatch: jest.fn(),
	toLastStep: jest.fn(),
	bankList: [
		{
			sysId: 1,
			currencyId: 51,
			bankCode: "ACB",
			bankName: "Asia Commercial Bank",
			bankLogo: "ACB.png",
			bankSite: "https://online.acb.com.vn/acbib"
		},
		{
			sysId: 2,
			currencyId: 51,
			bankCode: "BIDV",
			bankName: "BIDV",
			bankLogo: "BIDV.png",
			bankSite: "https://www.bidv.com.vn/"
		}
	],
	bankIdx: 1,
	bankInfo: {
		sysId: 2,
		currencyId: 51,
		bankCode: "BIDV",
		bankName: "BIDV",
		bankLogo: "BIDV.png",
		bankSite: "https://www.bidv.com.vn/"
	},
	numberOfAccount: 0,
	accountNumber: null,
	accountName: null,
	alreadyHasAccountName: false,
	reload: jest.fn()
};

describe("click back button", () => {
	test("if click back button function-toLastStep toHaveBeenCalled", () => {
		const { container } = render(
			<PanelControl {...fakeData_accountPanel} />
		);
		// const back_btn = container.getElementsByClassName("icon icon-arrow-left2")[0];
		const back_btn = container.getElementsByTagName("button")[0];
		fireEvent.click(back_btn);
		expect(fakeData_accountPanel.toLastStep).toHaveBeenCalled();
	});
});

describe("accountName input onChange", () => {
	test("if onChange accountName input, trigger dispatch ", () => {
		const { container } = render(
			<PanelControl {...fakeData_accountPanel} />
		);
		const accName_Input = container.getElementsByTagName("input")[0];
		fireEvent.change(accName_Input, { target: { value: "testName" } });
		expect(fakeData_accountPanel.dispatch).toHaveBeenCalled();
	});
});

describe("accountNumber input onChange", () => {
	test("if onChange accountNumber input, trigger dispatch ", () => {
		const { container } = render(
			<PanelControl {...fakeData_accountPanel} />
		);
		const accNumber_Input = container.getElementsByTagName("input")[1];
		fireEvent.change(accNumber_Input, {
			target: { value: "1111222233334444" }
		});
		expect(fakeData_accountPanel.dispatch).toHaveBeenCalled();
	});
});
