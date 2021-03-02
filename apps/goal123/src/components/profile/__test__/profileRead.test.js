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

const fakeData = {
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
	sendOTPSMS: jest.fn()
};

describe("send OTP button", () => {
	afterEach(cleanup);
	test("if click verify button function-sendOTPSMS toHaveBeenCalled", () => {
		const { container } = render(<ProfileRead {...fakeData} />);
		const sendOtpBtn = container.getElementsByTagName("button")[0];
		fireEvent.click(sendOtpBtn);
		expect(fakeData.sendOTPSMS).toHaveBeenCalled();
	});

	test("if click verify button show loading", () => {
		const { container } = render(<ProfileRead {...fakeData} />);
		const sendOtpBtn = container.getElementsByTagName("button")[0];
		fireEvent.click(sendOtpBtn);
		expect(container.getElementsByClassName("otpLoading").className).toBe(
			"otpLoading"
		);
	});
});
