import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProfileEdit from "../profileEdit";

jest.mock("react-i18next", () => ({
	useTranslation: () => {
		return {
			t: jest.fn()
		};
	}
}));

// describe("input element", () => {
// 	const fakeData = {
// 		userInfo: {},
// 		status: {
// 			accountName: { checked: null, tip: "" },
// 			birth: { checked: null, tip: "" },
// 			phoneNo: { checked: null, tip: "" },
// 			email: { checked: null, tip: "" }
// 		},
// 		clickInfo: jest.fn()
// 	};
// 	const inputNum = Object.keys(fakeData.status).length;
// 	const { container } = render(<ProfileEdit {...fakeData} />);

// 	test("test number of input element is correct", () => {
// 		expect(container.getElementsByTagName("input")).toHaveLength(inputNum);
// 	});
// });

// describe("input display status", () => {
// 	const fakeData = {
// 		userInfo: {
// 			accountName: "testValue",
// 			birth_d: "testValue",
// 			phoneNo: "testValue",
// 			email: null
// 		},
// 		status: {
// 			accountName: { checked: null, tip: "" },
// 			birth: { checked: null, tip: "" },
// 			email: { checked: null, tip: "" },
// 			phoneNo: { checked: null, tip: "" }
// 		},
// 		clickInfo: jest.fn()
// 	};
// 	const { container } = render(<ProfileEdit {...fakeData} />);

// 	const nullValueColumnNum = Object.values(fakeData.userInfo).filter(
// 		i => i === null
// 	).length;

// 	test("When the column value is null, the input box displayed", () => {
// 		expect(container.getElementsByTagName("input")).toHaveLength(
// 			nullValueColumnNum
// 		);
// 	});
// });

describe("click info", () => {
	const fakeData = {
		userInfo: {
			accountName: null,
			birth_d: "testValue",
			phoneNo: "testValue",
			email: "testValue"
		},
		status: {
			accountName: { checked: null, tip: "test-tip" },
			birth: { checked: null, tip: "" },
			phoneNo: { checked: null, tip: "" },
			email: { checked: null, tip: "" }
		},
		checked: true,
		clickInfo: jest.fn()
	};

	test("test click info", () => {
		const { container, getByTestId } = render(
			<ProfileEdit {...fakeData} />
		);
		const infoIcon = container.getElementsByClassName(
			"icon icon-information-solid"
		);

		expect(infoIcon.length).toBe(1);
		// fireEvent.click(infoIcon);
		// expect(fakeData.clickInfo).toHaveBeenCalled();
		// expect(container.getElementsByTagName("input")).toHaveLength(1);
	});
});
