import React from "react";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import ProfileEdit from "../profileEdit";

jest.mock("react-i18next", () => ({
	useTranslation: () => {
		return {
			t: jest.fn()
		};
	}
}));

describe("input element", () => {
	afterEach(cleanup);
	const fakeData = {
		userInfo: {},
		status: {
			accountName: { checked: null, tip: "" },
			birth: { checked: null, tip: "" },
			phoneNo: { checked: null, tip: "" },
			email: { checked: null, tip: "" }
		},
		clickInfo: jest.fn()
	};
	const inputNum = Object.keys(fakeData.status).length;
	const { container } = render(<ProfileEdit {...fakeData} />);

	test("test number of input element is correct", () => {
		expect(container.getElementsByTagName("input")).toHaveLength(inputNum);
	});
});

describe("input display status", () => {
	afterEach(cleanup);
	const fakeData = {
		userInfo: {
			accountName: "testValue",
			birth_d: "testValue",
			phoneNo: null,
			email: null
		},
		status: {
			accountName: { checked: null, tip: "" },
			birth: { checked: null, tip: "" },
			phoneNo: { checked: null, tip: "" },
			email: { checked: null, tip: "" }
		},
		emailValue: "testValue",
		onChangeEmail: jest.fn(),
		clickInfo: jest.fn()
	};
	const { container } = render(<ProfileEdit {...fakeData} />);

	const nullValueColumnNum = Object.values(fakeData.userInfo).filter(
		i => i === null
	).length;

	// screen.debug();

	test("When the column value is null, the input box displayed", () => {
		expect(container.getElementsByTagName("input")).toHaveLength(
			nullValueColumnNum
		);
	});
});

describe("input onChange", () => {
	afterEach(cleanup);
	const fakeData = {
		userInfo: {},
		status: {
			accountName: { checked: null, tip: "" },
			birth: { checked: null, tip: "" },
			phoneNo: { checked: null, tip: "" },
			email: { checked: null, tip: "" }
		},
		checked: true,
		clickInfo: jest.fn(),
		onChangeName: jest.fn(),
		onChangePhone: jest.fn()
	};

	const { container } = render(<ProfileEdit {...fakeData} />);
	const allInput = container.getElementsByTagName("input");
	const accName_Input = allInput[0];

	//  another way ↓
	// const { queryAllByTestId } = render(<ProfileEdit {...fakeData} />);
	// const allInput = queryAllByTestId("input");
	// const accName_Input = allInput[0];

	test("function:onChangeName toHaveBeenCalled", () => {
		fireEvent.change(accName_Input, { target: { value: "testValue" } });
		expect(fakeData.onChangeName).toHaveBeenCalled();
	});

	test("function:onChangePhone not toHaveBeenCalled", () => {
		fireEvent.change(accName_Input, { target: { value: "testValue" } });
		expect(fakeData.onChangePhone).not.toHaveBeenCalled();
	});
});

describe("click info", () => {
	afterEach(cleanup);
	const fakeData = {
		userInfo: {
			accountName: null,
			birth_d: "testValue",
			phoneNo: "testValue",
			email: "testValue"
		},
		status: {
			accountName: { checked: null, tip: "" },
			birth: { checked: null, tip: "" },
			phoneNo: { checked: null, tip: "" },
			email: { checked: null, tip: "" }
		},
		checked: true,
		clickInfo: jest.fn(),
		onChangeName: jest.fn()
	};

	test("test click info", () => {
		const { container } = render(<ProfileEdit {...fakeData} />);
		const allInfoIcon = container.getElementsByClassName(
			"icon icon-information-solid"
		);
		const accName_infoIcon = allInfoIcon[0];
		fireEvent.click(accName_infoIcon);
		expect(fakeData.clickInfo).toHaveBeenCalled();
	});
});
