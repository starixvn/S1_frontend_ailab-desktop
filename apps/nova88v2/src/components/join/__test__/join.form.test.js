import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import JoinForm from "../join.form";

const fakeData = {
	t: jest.fn(),
	openLogin: jest.fn(),
	clickInfo: jest.fn(),
	EditField: jest.fn(),
	checkValue: jest.fn(),
	showPsw: false,
	showPswHandler: jest.fn(),
	siteCurrency: [{ id: 51, displayKey: "Currency_51" }],
	_areaCode: "+84",
	hasRefOrAffCode: null,
	onSelectItem: jest.fn(),
	// clickDropdown: jest.fn(),
	checkboxHandler: jest.fn(),
	configSiteName: "Bwing",
	tandCTerms: "test-link",
	tandCRule: "test-link",
	defaultLangId: "en",
	clickCancel: jest.fn(),
	clickSubmit: jest.fn().mockImplementation(e => e.preventDefault()),
	defaultOption: "test",
	areaCodeOptions: [],
	onSelectAreaCode: jest.fn(),
	isUSDT: false
};

const userValue = {
	username: "",
	password: "",
	email: "",
	currencyIdx: null,
	areaCodeIdx: null,
	phone: "",
	affCode: null,
	ageCheck: false,
	termsCheck: false,
	specialBonusCode: null
};

const tip = {
	username: { checked: null, msg: "testValue" },
	password: { checked: null, msg: "" },
	email: { checked: null, msg: "" },
	currency: { checked: null, msg: "" },
	phone: { checked: null, msg: "" },
	affCode: { checked: null, msg: "" },
	checkbox: { checked: null, msg: "" },
	specialBonusCode: { checked: null, msg: "" }
};

describe("function-openLogin", () => {
	test("if click Login Here, function-openLogin toHaveBeenCalled", () => {
		const { container } = render(
			<JoinForm {...fakeData} tip={tip} userValue={userValue} />
		);
		const button_LoginHere = container.getElementsByTagName("button")[0];
		fireEvent.click(button_LoginHere);
		expect(fakeData.openLogin).toHaveBeenCalled();
	});
});

describe("input onChange", () => {
	test("function-EditField toHaveBeenCalled", () => {
		const { container } = render(
			<JoinForm {...fakeData} tip={tip} userValue={userValue} />
		);
		const allInputs = container.getElementsByTagName("input");
		const first_input = allInputs[0];
		fireEvent.change(first_input, { target: { value: "testValue" } });
		expect(fakeData.EditField).toHaveBeenCalled();
	});
});

describe("click info icon", () => {
	afterEach(cleanup);
	test("if click info icon, function-clickInfo() toHaveBeenCalled", () => {
		const { container } = render(
			<JoinForm {...fakeData} tip={tip} userValue={userValue} />
		);
		const allInfoIcons = container.getElementsByClassName(
			"icon icon-information"
		);
		const accName_infoIcon = allInfoIcons[0];

		fireEvent.click(accName_infoIcon);
		expect(fakeData.clickInfo).toHaveBeenCalled();
	});

	test("if click info icon, show tip text", () => {
		const { container } = render(
			<JoinForm {...fakeData} tip={tip} userValue={userValue} />
		);
		const allInfoIcon = container.getElementsByClassName(
			"icon icon-information"
		);
		const first_infoIcon = allInfoIcon[0];
		const dsiplay_tip = container.getElementsByClassName("tip active")[0];

		fireEvent.click(first_infoIcon);
		expect(dsiplay_tip.className.includes("active")).toBe(true);
	});
});

describe("function-onSelectItem", () => {
	test("if click dropdown, function-clickDropdown toHaveBeenCalled", () => {
		const { container } = render(
			<JoinForm {...fakeData} tip={tip} userValue={userValue} />
		);
		const dropdown = container.getElementsByClassName("dropdown")[0];
		const dropdownContainer =
			container.getElementsByClassName("dropdown-container")[0];
		fireEvent.click(dropdown);
		expect(dropdownContainer.className.includes("active")).toBe(true);
	});
});

describe("function-showPswHandler", () => {
	test("if click eye icon, function-showPswHandler toHaveBeenCalled", () => {
		const { container } = render(
			<JoinForm {...fakeData} tip={tip} userValue={userValue} />
		);
		const iconEye = container.getElementsByClassName(
			"icon icon-eye-blocked"
		)[0];
		fireEvent.click(iconEye);
		expect(fakeData.showPswHandler).toHaveBeenCalled();
	});
});

describe("phone input display", () => {
	const userValue_hasCurrency = {
		username: "",
		password: "",
		email: "",
		currencyIdx: 1, // test this value
		areaCodeIdx: null,
		phone: "",
		affCode: null,
		ageCheck: false,
		termsCheck: false,
		specialBonusCode: null
	};
	test("if currency is filled, phone input will display", () => {
		const { container } = render(
			<JoinForm
				{...fakeData}
				tip={tip}
				userValue={userValue_hasCurrency}
			/>
		);
		const phoneInput = container.getElementsByClassName("phone")[0];
		expect(phoneInput).toBeTruthy();
	});
});

describe("click submit", () => {
	test("if click submit button function-clickSubmit toHaveBeenCalled", () => {
		const { container } = render(
			<JoinForm {...fakeData} tip={tip} userValue={userValue} />
		);
		const btnGroup = container.getElementsByClassName("btnGroup")[0];
		const submitBtn = btnGroup.lastChild;
		fireEvent.click(submitBtn);
		expect(fakeData.clickSubmit).toHaveBeenCalled();
	});
});

describe("click cancel", () => {
	test("if click cancel button function-clickCancel toHaveBeenCalled", () => {
		const { container } = render(
			<JoinForm {...fakeData} tip={tip} userValue={userValue} />
		);
		const btnGroup = container.getElementsByClassName("btnGroup")[0];
		const submitBtn = btnGroup.firstChild;
		fireEvent.click(submitBtn);
		expect(fakeData.clickCancel).toHaveBeenCalled();
	});
});

describe("show icon-cross", () => {
	const tip_false = {
		username: { checked: false, msg: "testValue" },
		password: { checked: false, msg: "testValue" },
		email: { checked: null, msg: "" },
		currency: { checked: null, msg: "" },
		phone: { checked: null, msg: "" },
		affCode: { checked: null, msg: "" },
		checkbox: { checked: null, msg: "" },
		specialBonusCode: { checked: null, msg: "" }
	};
	test("if click submit and status checked is false, show icon-cross", () => {
		const { container } = render(
			<JoinForm {...fakeData} tip={tip_false} userValue={userValue} />
		);

		const submitBtn = container.getElementsByTagName("button")[0];
		const allIcon = container.getElementsByClassName("iconModule")[0];
		fireEvent.click(submitBtn);
		expect(allIcon.firstChild.className.includes("icon-cross")).toBe(true);
	});
});
