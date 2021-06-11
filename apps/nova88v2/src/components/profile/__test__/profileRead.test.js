import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import ProfileRead from "../profile.read";
import * as ct from "../../common/context";

jest.mock("react-i18next", () => ({
	useTranslation: () => {
		return {
			t: jest.fn()
		};
	}
}));

const fakeData = {
	t: jest.fn(),
	infoList: [
		{
			content: "test-realname",
			displayKey: "lbl_RealName",
			show: true
		},
		{ content: "18/04/2000", displayKey: "lbl_Birthday", show: true },
		{
			content: "test-username",
			displayKey: "lbl_Username",
			show: true
		},
		{
			content: "0123",
			displayKey: "lbl_Phone",
			show: true
		},
		{
			content: "abc@abc.abc",
			displayKey: "lbl_Email",
			show: true
		}
	],
	sendOTPSMS: jest.fn(),
	mobileVerificationLoading: false,
	areaCodeVal: "+60"
};

describe("click send OTP button", () => {
	const userInfo = {
		accountName: "testValue",
		birth_d: "testValue",
		phoneNo: "testValue",
		userName: "testValue",
		phoneVerified: false
	};
	const ProfileReadWrapper_phoneNotVerified = () => (
		<ct.userInfoContext.Provider
			value={{ userInfo, setUserInfo: jest.fn() }}>
			<ProfileRead {...fakeData} userInfo={userInfo} />
		</ct.userInfoContext.Provider>
	);
	afterEach(cleanup);
	test("if click verify button function-sendOTPSMS toHaveBeenCalled", () => {
		const { container } = render(<ProfileReadWrapper_phoneNotVerified />);
		const sendOtpBtn = container.getElementsByTagName("button")[0];
		fireEvent.click(sendOtpBtn);
		expect(fakeData.sendOTPSMS).toHaveBeenCalled();
	});
});

describe("phone is verified", () => {
	const userInfo = {
		accountName: "testValue",
		birth_d: "testValue",
		phoneNo: "testValue",
		userName: "testValue",
		phoneVerified: true
	};
	const ProfileReadWrapper_phoneVerified = () => (
		<ct.userInfoContext.Provider
			value={{ userInfo, setUserInfo: jest.fn() }}>
			<ProfileRead {...fakeData} userInfo={userInfo} />
		</ct.userInfoContext.Provider>
	);
	test("if phone is verified show check icon ", () => {
		const { container } = render(
			<ProfileReadWrapper_phoneVerified {...fakeData} />
		);
		const sendOtpBtn = container.getElementsByClassName(
			"icon-checkmark"
		)[0];
		expect(sendOtpBtn).toBeTruthy();
	});
});
