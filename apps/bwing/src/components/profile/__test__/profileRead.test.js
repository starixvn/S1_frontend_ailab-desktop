import React from "react";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import ProfileRead from "../profileRead";

jest.mock("react-i18next", () => ({
	useTranslation: () => {
		return {
			t: jest.fn()
		};
	}
}));

const fake_dataList = [];
for (let i = 0; i < 9; i++) {
	fake_dataList[i] = {
		label: `label_${i}`,
		value: "value",
		format: i === 2 ? "phone" : null,
		show: true
	};
}

describe("click send OTP button", () => {
	afterEach(cleanup);
	const fakeData = {
		userInfo: {
			accountName: "testValue",
			birth_d: "testValue",
			phoneNo: "testValue",
			email: "testValue"
		},
		sendOTPSMS: jest.fn(),
		dataList: fake_dataList
	};
	test("if click verify button function-sendOTPSMS toHaveBeenCalled", () => {
		const { container } = render(<ProfileRead {...fakeData} />);
		const sendOtpBtn = container.getElementsByTagName("button")[0];
		fireEvent.click(sendOtpBtn);
		expect(fakeData.sendOTPSMS).toHaveBeenCalled();
	});
});

describe("show OTP verify loading", () => {
	afterEach(cleanup);
	const fakeData = {
		userInfo: {
			accountName: "testValue",
			birth_d: "testValue",
			phoneNo: "testValue",
			userName: "testValue"
		},
		sendOTPSMS: jest.fn(),
		mobileVerificationLoading: true,
		dataList: fake_dataList
	};
	test("if props mobileVerificationLoading=true show loading", () => {
		const { container } = render(<ProfileRead {...fakeData} />);
		const sendOtpBtn =
			container.getElementsByClassName("icon-spinner11")[0];
		expect(sendOtpBtn).toBeTruthy();
	});
});

describe("phone is verified", () => {
	afterEach(cleanup);
	const fakeData = {
		userInfo: {
			accountName: "testValue",
			birth_d: "testValue",
			phoneNo: "testValue",
			userName: "testValue",
			phoneVerified: true
		},
		sendOTPSMS: jest.fn(),
		dataList: fake_dataList
	};
	test("if phone is verified show check icon ", () => {
		const { container } = render(<ProfileRead {...fakeData} />);
		const sendOtpBtn = container.getElementsByClassName(
			"icon-icon32px_check"
		)[0];
		expect(sendOtpBtn).toBeTruthy();
	});
});
