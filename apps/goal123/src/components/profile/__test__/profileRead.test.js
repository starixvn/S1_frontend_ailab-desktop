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

const fake_dataList = [
	{
		label: "testValue-1",
		value: "testValue",
		show: true
	},
	{
		label: "testValue-2",
		value: "testValue",
		format: "normal",
		show: true
	},
	{
		label: "testValue-3",
		value: "testValue",
		format: "phone",
		show: true
	},
	{
		label: "testValue-4",
		value: "testValue",
		show: true
	},
	{
		label: "testValue-5",
		value: "testValue",
		show: true
	},
	{
		label: "testValue-6",
		value: "testValue",
		show: true
	},
	{
		label: "testValue-7",
		value: "testValue",
		show: true
	},
	{
		label: "testValue-8",
		value: "testValue",
		show: true
	}
];

describe("send OTP button", () => {
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
			userName: "testValue",
			country: "testValue",
			email: "testValue",
			regTime: "testValue",
			lastLogin: "testValue"
		},
		sendOTPSMS: jest.fn(),
		mobileVerificationLoading: true
	};
	test("if click verify button show loading", () => {
		const { container } = render(<ProfileRead {...fakeData} />);
		const sendOtpBtn = container.getElementsByClassName("otpLoading")[0];
		expect(sendOtpBtn).toBeTruthy();
	});
});
