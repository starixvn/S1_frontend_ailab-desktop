import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ProfileForm from "../profile.form";
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
		{ content: null, displayKey: "lbl_RealName", show: false },
		{ content: "null/null/null", displayKey: "lbl_Birthday", show: false }
	],
	mobileVerificationLoading: false,
	sendOTPSMS: jest.fn(),
	userValue: { accountName: "", areaCodeIdx: null, birth: "", phoneNo: "" },
	status: {
		accountName: { checked: null, tip: "test-tip" },
		birth: { checked: null, tip: "" }
	},
	editField: jest.fn(),
	valueCheck: jest.fn(),
	phoneCheck: jest.fn(),
	clickInfo: jest.fn(),
	isUSDT: false,
	clickSubmit: jest.fn(),
	areaCodeOptions: [
		{ id: 0, displayText: "+1" },
		{ id: 1, displayText: "+1-242" },
		{ id: 2, displayText: "+1-246" },
		{ id: 3, displayText: "+1-264" }
	],
	onSelectAreaCode: jest.fn(),
	disableSubmit: false
};

const userInfo = {
	accountName: null,
	areaCode: "+60",
	birth_d: null,
	birth_m: null,
	birth_y: null,
	country: null,
	currencyId: 2,
	email: "mayo062405@m.m",
	isLogin: true,
	langId: "en",
	lastLogin: "2021-06-24T06:04:43-04:00",
	perCountry: "MY",
	phoneNo: "62405",
	phoneVerified: false,
	regTime: "2021-06-24T06:04:43-04:00",
	userLevel: 1,
	userName: "mayo062405"
};

const ProfileWrapper = () => (
	<ct.userInfoContext.Provider value={{ userInfo, setUserInfo: jest.fn() }}>
		<ProfileForm {...fakeData} userInfo={userInfo} />
	</ct.userInfoContext.Provider>
);

describe("click submit", () => {
	test("if click submit button function-clickSubmit toHaveBeenCalled", () => {
		const { container } = render(<ProfileWrapper />);
		const btnGroup = container.getElementsByClassName("btnGroup")[0];
		const submitBtn = btnGroup.firstChild;
		fireEvent.click(submitBtn);
		expect(fakeData.clickSubmit).toHaveBeenCalled();
	});
});
