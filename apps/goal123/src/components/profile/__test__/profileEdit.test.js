import React from "react";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import ProfileEdit from "../profileEdit";
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
	// userInfo: {},
	status: {
		accountName: { checked: null, tip: "" },
		birth: { checked: null, tip: "" },
		phoneNo: { checked: null, tip: "" },
		email: { checked: null, tip: "" }
	},
	clickInfo: jest.fn(),
	onChangeName: jest.fn(),
	onChangeBirth: jest.fn(),
	onChangePhone: jest.fn(),
	onChangeEmail: jest.fn(),
	submitCheck: jest.fn()
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
	userInfo: {
		accountName: null,
		birth_d: "testValue",
		phoneNo: "testValue",
		email: null
	},
	status: {
		accountName: { checked: null, tip: "test-tip" },
		birth: { checked: null, tip: "test-tip" },
		phoneNo: { checked: null, tip: "test-tip" },
		email: { checked: null, tip: "test-tip" }
	},
	clickInfo: jest.fn(),
	onChangeName: jest.fn(),
	onChangeBirth: jest.fn(),
	onChangePhone: jest.fn(),
	onChangeEmail: jest.fn()
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
	test("function-onChangeName toHaveBeenCalled", () => {
		const { container } = render(<ProfileEdit {...fakeData_2} />);
		const allInputs = container.getElementsByTagName("input");
		const accName_Input = allInputs[0];
		// or use ↓
		// const { queryAllByTestId } = render(<ProfileEdit {...fakeData_2} />);
		// const allInputs = queryAllByTestId("input");
		// const accName_Input = allInputs[0];

		fireEvent.change(accName_Input, { target: { value: "testValue" } });
		expect(fakeData_2.onChangeName).toHaveBeenCalled();
	});
	test("function-onChangePhone not toHaveBeenCalled", () => {
		const { container } = render(<ProfileEdit {...fakeData_2} />);
		const allInputs = container.getElementsByTagName("input");
		const accName_Input = allInputs[0];
		fireEvent.change(accName_Input, { target: { value: "testValue" } });
		expect(fakeData_2.onChangePhone).not.toHaveBeenCalled();
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
			"icon-information-solid"
		);
		const accName_infoIcon = allInfoIcons[0];

		fireEvent.click(accName_infoIcon);
		expect(fakeData_2.clickInfo).toHaveBeenCalled();
	});

	test("if click info icon, show tip text", () => {
		const { container } = render(<ProfileEdit {...fakeData_2} />);
		const allInfoIcon = container.getElementsByClassName(
			"icon-information-solid"
		);
		const accName_infoIcon = allInfoIcon[0];

		const allTips = container.getElementsByClassName("tip");
		const accName_tip = allTips[0];

		fireEvent.click(accName_infoIcon);
		expect(accName_tip.classList.contains("active")).toBe(true);
		// or use ↓
		// expect(accName_tip.className.includes("active")).toBe(true);
	});
});

describe("click submit", () => {
	test("if click submit button function-submitCheck toHaveBeenCalled", () => {
		const { container } = render(<ProfileEditWrapper />);
		const submitBtn = container.getElementsByTagName("button")[0];
		fireEvent.click(submitBtn);
		expect(fakeData.submitCheck).toHaveBeenCalled();
	});
});

describe("show tip text", () => {
	test("if click submit but the column value is null, show tip text", () => {
		const { container } = render(<ProfileEdit {...fakeData_2} />);
		const submitBtn = container.getElementsByTagName("button")[0];
		fireEvent.click(submitBtn);
		const accName_tip = container.getElementsByClassName("tip")[0];
		expect(accName_tip.className.includes("active")).toBe(true);
	});
});

describe("show icon-cross", () => {
	const fakeData_checkFalse = {
		userInfo: {
			accountName: null,
			birth_d: "testValue",
			phoneNo: "testValue",
			email: "testValue"
		},
		status: {
			accountName: { checked: false, tip: "test-tip" }
		},
		clickInfo: jest.fn(),
		onChangeName: jest.fn(),
		onChangeBirth: jest.fn(),
		onChangePhone: jest.fn(),
		onChangeEmail: jest.fn()
	};
	test("if click submit and status checked is false, show icon-cross", () => {
		const { container } = render(<ProfileEdit {...fakeData_checkFalse} />);
		const submitBtn = container.getElementsByTagName("button")[0];
		fireEvent.click(submitBtn);
		const allIcon = container.getElementsByClassName("iconModule")[0];
		expect(allIcon.firstChild.className.includes("icon-cross")).toBe(true);
	});
});
