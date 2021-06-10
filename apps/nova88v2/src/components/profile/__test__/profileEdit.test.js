import React from "react";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import ProfileEdit from "../profile.edit";
import * as ct from "../../common/context";

jest.mock("react-i18next", () => ({
	useTranslation: () => {
		return {
			t: jest.fn()
		};
	}
}));

// if userInfo null => show all input column
const fakeData = {
	t: jest.fn(),
	userValue: { accountName: "testValue" },
	status: {
		accountName: { checked: null, tip: "" },
		birth: { checked: null, tip: "" },
		phoneNo: { checked: null, tip: "" }
	},
	areaCodeOptions: [
		{ id: 0, displayText: "+1" },
		{ id: 1, displayText: "+1-242" },
		{ id: 2, displayText: "+1-246" },
		{ id: 3, displayText: "+1-264" }
	],
	isUSDT: false,
	onSelectAreaCode: jest.fn(),
	editField: jest.fn(),
	clickInfo: jest.fn(),
	onChangeBirth: jest.fn(),
	onChangePhone: jest.fn(),
	onChangeEmail: jest.fn(),
	clickSubmit: jest.fn().mockImplementation(e => e.preventDefault())
};

const userInfo = {
	AreaCode: "+84",
	accountName: null,
	email: null,
	langId: "en",
	userName: "mayo031601"
};

const ProfileEditWrapper = () => (
	<ct.userInfoContext.Provider value={{ userInfo, setUserInfo: jest.fn() }}>
		<ProfileEdit {...fakeData} userInfo={userInfo} />
	</ct.userInfoContext.Provider>
);

// just show "accountName" & "email" input column
const fakeData_2 = {
	t: jest.fn(),
	userInfo: {
		userName: null,
		birth_d: null,
		phoneNo: "testValue",
		email: "testValue"
	},
	userValue: { accountName: null },
	status: {
		accountName: { checked: null, tip: "test-tip" },
		birth: { checked: null, tip: "test-tip" },
		phoneNo: { checked: null, tip: "test-tip" },
		email: { checked: null, tip: "test-tip" }
	},
	editField: jest.fn(),
	clickInfo: jest.fn(),
	clickSubmit: jest.fn().mockImplementation(e => e.preventDefault())
};

describe("input element render", () => {
	afterEach(cleanup);
	const inputNum = Object.keys(fakeData.status).length;
	const { container } = render(<ProfileEditWrapper />);
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
		// or use ↓
		// const { queryAllByTestId } = render(<ProfileEdit {...fakeData_2} />);
		// const allInputs = queryAllByTestId("input");
		// const accName_Input = allInputs[0];

		fireEvent.change(accName_Input, { target: { value: "testValue" } });
		expect(fakeData_2.editField).toHaveBeenCalled();
	});
});

describe("birthday column calendar (react dateTime)", () => {
	afterEach(cleanup);
	test("if click birthday input, display calendar popBox", () => {
		const { container } = render(<ProfileEditWrapper />);
		const rdtElement = container.getElementsByClassName("rdt")[0];
		const input_birth = rdtElement.firstChild;
		fireEvent.click(input_birth);
		expect(rdtElement.className.includes("rdtOpen")).toBe(true);
	});
});

describe("click info icon", () => {
	afterEach(cleanup);
	test("if click info icon, function-clickInfo() toHaveBeenCalled", () => {
		const { container } = render(<ProfileEdit {...fakeData_2} />);
		const allInfoIcons = container.getElementsByClassName(
			"icon icon-information"
		);
		const accName_infoIcon = allInfoIcons[0];

		fireEvent.click(accName_infoIcon);
		expect(fakeData_2.clickInfo).toHaveBeenCalled();
	});

	test("if click info icon, show tip text", () => {
		const { container } = render(<ProfileEdit {...fakeData_2} />);
		const allInfoIcon = container.getElementsByClassName(
			"icon icon-information"
		);
		const accName_infoIcon = allInfoIcon[0];
		const accName_tip = container.getElementsByClassName(
			"tip active txt-red"
		)[0];
		fireEvent.click(accName_infoIcon);
		// expect(accName_tip.textContent).toBe(fakeData_2.status.accountName.tip);
		expect(accName_tip).toBeTruthy();
	});
});

describe("click submit", () => {
	test("if click submit button function-clickSubmit toHaveBeenCalled", () => {
		const { container } = render(<ProfileEditWrapper />);
		const btnGroup = container.getElementsByClassName("btnGroup")[0];
		const submitBtn = btnGroup.firstChild;
		fireEvent.click(submitBtn);
		expect(fakeData.clickSubmit).toHaveBeenCalled();
	});
});

describe("show tip text", () => {
	test("if click submit but the column value is null, show tip text", () => {
		const { container } = render(<ProfileEdit {...fakeData_2} />);
		const btnGroup = container.getElementsByClassName("btnGroup")[0];
		const submitBtn = btnGroup.firstChild;
		fireEvent.click(submitBtn);
		const accName_tip = container.getElementsByClassName(
			"tip active txt-red"
		)[0];
		// expect(accName_tip.textContent).toBe(fakeData_2.status.accountName.tip);
		expect(accName_tip).toBeTruthy();
	});
});

describe("show icon-cross", () => {
	const fakeData_checkFalse = {
		t: jest.fn(),
		userInfo: {
			accountName: "",
			birth_d: "testValue",
			phoneNo: "testValue",
			email: "testValue"
		},
		status: {
			accountName: { checked: false, tip: "" },
			birth: { checked: null, tip: "" },
			phoneNo: { checked: null, tip: "" },
			email: { checked: null, tip: "" }
		},
		userValue: { accountName: "testValue" },
		editField: jest.fn(),
		clickInfo: jest.fn(),
		clickSubmit: jest.fn().mockImplementation(e => e.preventDefault())
	};
	test("if click submit and status checked is false, show icon-cross", () => {
		const { container } = render(<ProfileEdit {...fakeData_checkFalse} />);
		const btnGroup = container.getElementsByClassName("btnGroup")[0];
		const submitBtn = btnGroup.firstChild;
		fireEvent.click(submitBtn);
		const allIcon = container.getElementsByClassName("iconModule")[0];
		expect(allIcon.firstChild.className.includes("icon icon-cross")).toBe(
			true
		);
	});
});
