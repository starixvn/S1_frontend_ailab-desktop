import React from "react";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import ProfileEdit from "../profile.edit";

// jest.mock("react-i18next", () => ({
// 	useTranslation: () => {
// 		return {
// 			t: jest.fn()
// 		};
// 	}
// }));

// if userInfo null => show all input column
const fakeData = {
	t: jest.fn(),
	userInfo: {},
	userValue: { accountName: "", birth: "", phoneNo: "" },
	status: {
		accountName: { checked: null, tip: "" },
		birth: { checked: null, tip: "" },
		phoneNo: { checked: null, tip: "" }
	},
	clickInfo: jest.fn(),
	editField: jest.fn(),
	clickSubmit: jest.fn()
};

// just show "accountName" & "email" input column
const fakeData_2 = {
	t: jest.fn(),
	userInfo: {
		accountName: null,
		birth_d: null,
		phoneNo: "0998987987"
	},
	userValue: { accountName: "", birth: "", phoneNo: "" },
	status: {
		accountName: { checked: null, tip: "test-tip" },
		birth: { checked: null, tip: "test-tip" },
		phoneNo: { checked: null, tip: "test-tip" }
	},
	clickInfo: jest.fn(),
	editField: jest.fn()
};

describe("input element render", () => {
	afterEach(cleanup);
	const inputNum = Object.keys(fakeData.status).length;
	const { container } = render(<ProfileEdit {...fakeData} />);
	test("test number of input element render is correct", () => {
		expect(container.getElementsByTagName("input")).toHaveLength(inputNum);
	});
});

describe("input display status", () => {
	afterEach(cleanup);
	test("if the column value(userinfo) null, the input box displayed", () => {
		const { container } = render(<ProfileEdit {...fakeData_2} />);
		const nullValueColumnNum = Object.values(fakeData_2.userInfo).filter(
			i => i === null
		).length;
		expect(container.getElementsByTagName("input")).toHaveLength(
			nullValueColumnNum
		);
	});
});

describe("input onChange", () => {
	afterEach(cleanup);
	test("function-editField toHaveBeenCalled", () => {
		const { container } = render(<ProfileEdit {...fakeData_2} />);
		const allInputs = container.getElementsByTagName("input");
		const accName_Input = allInputs[0];
		fireEvent.change(accName_Input, { target: { value: "testValue" } });
		expect(fakeData_2.editField).toHaveBeenCalled();
	});
});

describe("birthday column calendar (react dateTime)", () => {
	afterEach(cleanup);
	test("if click birthday input, display calendar popBox", () => {
		const { container } = render(<ProfileEdit {...fakeData} />);
		const rdtElement = container.getElementsByClassName("rdt")[0];
		const input_birth = rdtElement.firstChild;
		fireEvent.click(input_birth);
		expect(rdtElement.className.includes("rdtOpen")).toBe(true);
	});
});

describe("subumit form", () => {
	test("if form has been submit, function-submitCheck toHaveBeenCalled", () => {
		const { container } = render(<ProfileEdit {...fakeData} />);
		const form = container.getElementsByTagName("form")[0];
		fireEvent.submit(form);
		expect(fakeData.clickSubmit).toHaveBeenCalled();
	});
});

describe("show tip text", () => {
	test("if form has been submit, but the column value is null, show tip text", () => {
		const { container } = render(<ProfileEdit {...fakeData_2} />);
		const form = container.getElementsByTagName("form")[0];
		fireEvent.submit(form);
		const accName_tip = container.getElementsByClassName("tip")[0];
		expect(accName_tip.className.includes("active")).toBe(true);
	});
});

describe("show icon-cross", () => {
	const fakeData_checkFalse = {
		t: jest.fn(),
		userValue: { accountName: "", birth: "", phoneNo: "" },
		userInfo: {
			accountName: null,
			birth_d: "testValue",
			phoneNo: "testValue",
			email: "testValue"
		},
		status: {
			accountName: { checked: false, tip: "test-tip" },
			birth: { checked: null, tip: "" },
			phoneNo: { checked: null, tip: "" }
		},
		clickInfo: jest.fn(),
		onChangeName: jest.fn(),
		onChangeBirth: jest.fn(),
		onChangePhone: jest.fn(),
		onChangeEmail: jest.fn(),
		editField: jest.fn()
	};
	test("if form has been submit, and status checked is false, show icon-cross", () => {
		const { container } = render(<ProfileEdit {...fakeData_checkFalse} />);
		const form = container.getElementsByTagName("form")[0];
		fireEvent.submit(form);
		const allIcon = container.getElementsByClassName("iconModule")[0];
		expect(allIcon.firstChild.className.includes("icon-cross")).toBe(true);
	});
});
