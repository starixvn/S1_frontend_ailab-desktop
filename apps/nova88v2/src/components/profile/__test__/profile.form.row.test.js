import React from "react";
import { render, cleanup, fireEvent, screen } from "@testing-library/react";
import ProfileRow from "../profile.form.row";
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
	content: "",
	areaCode: "+60",
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
	areaCodeOptions: [
		{ id: 0, displayText: "+1" },
		{ id: 1, displayText: "+1-242" },
		{ id: 2, displayText: "+1-246" },
		{ id: 3, displayText: "+1-264" }
	],
	onSelectAreaCode: jest.fn()
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

const ProfileWrapper_realName = () => (
	<ct.userInfoContext.Provider value={{ userInfo, setUserInfo: jest.fn() }}>
		<ProfileRow
			{...fakeData}
			userInfo={userInfo}
			displayKey="lbl_RealName"
		/>
	</ct.userInfoContext.Provider>
);

const ProfileWrapper_birth = () => (
	<ct.userInfoContext.Provider value={{ userInfo, setUserInfo: jest.fn() }}>
		<ProfileRow
			{...fakeData}
			userInfo={userInfo}
			displayKey="lbl_Birthday"
		/>
	</ct.userInfoContext.Provider>
);

describe("input element render", () => {
	test("if realName value is null , show input element", () => {
		const { container } = render(<ProfileWrapper_realName />);
		const input_element = container.getElementsByTagName("input");
		expect(input_element).toBeTruthy();
	});
});

describe("input onChange", () => {
	afterEach(cleanup);
	test("if onchamge realName input function-editField toHaveBeenCalled", () => {
		const { container } = render(<ProfileWrapper_realName />);
		const input_realName = container.getElementsByTagName("input")[0];
		fireEvent.change(input_realName, { target: { value: "testValue" } });
		expect(fakeData.editField).toHaveBeenCalled();
	});
});

describe("click info icon", () => {
	afterEach(cleanup);
	test("if click info icon, function-clickInfo() toHaveBeenCalled", () => {
		const { container } = render(<ProfileWrapper_realName />);
		const icon_first = container.getElementsByClassName(
			"icon icon-information"
		)[0];
		fireEvent.click(icon_first);
		expect(fakeData.clickInfo).toHaveBeenCalled();
	});

	test("if click info icon, show tip text", () => {
		const { container } = render(<ProfileWrapper_realName />);
		const icon_first = container.getElementsByClassName(
			"icon icon-information"
		)[0];
		fireEvent.click(icon_first);
		const tip_first = container.getElementsByClassName(
			"tip active txt-red"
		)[0];
		expect(tip_first).toBeTruthy();
	});
});

describe("birthday column calendar (react dateTime)", () => {
	afterEach(cleanup);
	test("if click birthday input, display calendar popBox", () => {
		const { container } = render(<ProfileWrapper_birth />);
		const rdtElement = container.getElementsByClassName("rdt")[0];
		const input_birth = rdtElement.firstChild;
		fireEvent.click(input_birth);
		expect(rdtElement.className.includes("rdtOpen")).toBe(true);
	});
});
