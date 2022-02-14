import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import * as ct from "../../common/context";
import { DisplayRow } from "../profile.data";

describe("click send OTP button", () => {
	afterEach(cleanup);
	const fakeData = {
		t: jest.fn(),
		displayKey: `lbl_Phone`,
		content: "012345678",
		areaCode: "+60",
		mobileVerificationLoading: false, // false
		sendOTPSMS: jest.fn()
	};
	const userInfo = {
		phoneVerified: false // false
	};
	const ProfileDataWrapper = () => (
		<ct.userInfoContext.Provider
			value={{ userInfo, setUserInfo: jest.fn() }}
		>
			<DisplayRow {...fakeData} />
		</ct.userInfoContext.Provider>
	);

	test("if click verify button function-sendOTPSMS toHaveBeenCalled", () => {
		const { container } = render(<ProfileDataWrapper />);
		const sendOtpBtn = container.getElementsByTagName("button")[0];
		fireEvent.click(sendOtpBtn);
		expect(fakeData.sendOTPSMS).toHaveBeenCalled();
	});
});

describe("show OTP verify loading", () => {
	afterEach(cleanup);
	const fakeData = {
		t: jest.fn(),
		displayKey: `lbl_Phone`,
		content: "012345678",
		areaCode: "+60",
		mobileVerificationLoading: true // true
	};
	const userInfo = {
		phoneVerified: false // false
	};
	const ProfileDataWrapper = () => (
		<ct.userInfoContext.Provider
			value={{ userInfo, setUserInfo: jest.fn() }}
		>
			<DisplayRow {...fakeData} />
		</ct.userInfoContext.Provider>
	);
	test("if props mobileVerificationLoading=true show loading", () => {
		const { container } = render(<ProfileDataWrapper />);
		const sendOtpBtn = container.getElementsByClassName("otpLoading")[0];
		expect(sendOtpBtn).toBeTruthy();
	});
});

describe("phone is verified", () => {
	afterEach(cleanup);
	const fakeData = {
		t: jest.fn(),
		displayKey: `lbl_Phone`,
		content: "012345678",
		areaCode: "+60",
		mobileVerificationLoading: false // false
	};
	const userInfo = {
		phoneVerified: true // false
	};
	const ProfileDataWrapper = () => (
		<ct.userInfoContext.Provider
			value={{ userInfo, setUserInfo: jest.fn() }}
		>
			<DisplayRow {...fakeData} />
		</ct.userInfoContext.Provider>
	);
	test("if phone is verified show check icon ", () => {
		const { container } = render(<ProfileDataWrapper />);
		const verifiedIcon =
			container.getElementsByClassName("icon-checkmark")[0];
		expect(verifiedIcon).toBeTruthy();
	});
});
