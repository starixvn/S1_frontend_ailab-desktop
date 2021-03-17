import React from "react";
import { render, fireEvent } from "@testing-library/react";
import HistoryFilter from "../historyFilter";
import "@testing-library/jest-dom";
import * as ct from "../context";
import Dropdown from "../dropdown";
import { Pagination } from "../pagination";

jest.mock("react-i18next", () => ({
	useTranslation: () => {
		return {
			t: jest.fn()
		};
	}
}));

const userInfo = {
	langId: "en"
};

const Wrapper = fakeData => (
	<ct.userInfoContext.Provider value={{ userInfo, setUserInfo: jest.fn() }}>
		<HistoryFilter {...fakeData} userInfo={userInfo} />
	</ct.userInfoContext.Provider>
);

// ---------- test component <HistoryFilter> ----------
describe("click quick-pick", () => {
	test("if click quick-pick input, dropdown will open", () => {
		const fakeData = {
			submitHandler: jest.fn(),
			submitTranslation: jest.fn()
		};
		const { container } = render(<Wrapper {...fakeData} />);
		const dropdown = container.getElementsByClassName(
			"dropdown-container"
		)[0];
		fireEvent.click(dropdown);
		expect(dropdown.className.includes("active")).toBe(true);
	});
});

describe("birthday column calendar (react dateTime)", () => {
	test("if click birthday input, display calendar popBox", () => {
		const fakeData = {
			submitHandler: jest.fn(),
			submitTranslation: jest.fn()
		};
		const { container } = render(<Wrapper {...fakeData} />);
		const rdtElement = container.getElementsByClassName("rdt")[0];
		const dateTimeComponent = rdtElement.firstChild;
		fireEvent.click(dateTimeComponent);
		expect(rdtElement.className.includes("rdtOpen")).toBe(true);
	});
});

describe("click submit", () => {
	test("if click submit button function-submitCheck toHaveBeenCalled", () => {
		const fakeData = {
			submitHandler: jest.fn(),
			submitTranslation: jest.fn()
		};
		const { container } = render(<Wrapper {...fakeData} />);
		const submitBtn = container.getElementsByClassName("btn-check")[0];
		fireEvent.click(submitBtn);
		expect(fakeData.submitHandler).toHaveBeenCalled();
	});
});

// ---------- test component <Dropdown> ----------
describe("dropdown item num", () => {
	test("is the number of items in the dropdown correct?", () => {
		const fakeData = {
			i18n: jest.fn(),
			mainKey: "history_",
			options: [
				{ id: 0, displayKey: "lbl_Today" },
				{ id: 1, displayKey: "lbl_YesterDay" },
				{ id: 2, displayKey: "lbl_ThisWeek" },
				{ id: 3, displayKey: "lbl_LastWeek" },
				{ id: 4, displayKey: "lbl_ThisMonth" },
				{ id: 5, displayKey: "lbl_LastMonth" }
			],
			selectedIdx: 0,
			onSelectItem: jest.fn(),
			showDropDownIcon: true
		};
		const { container } = render(<Dropdown {...fakeData} />);
		const items = container.getElementsByClassName("dropdown-item");
		expect(items.length).toBe(fakeData.options.length);
	});
});

// ---------- test component <Pagination> ----------
describe("Pagination items num", () => {
	test("is the number of pagination correct?", () => {
		const fakeData = {
			totalPages: 3,
			currentPage: 1,
			clickPageNumber: jest.fn()
		};
		const controlButtons = ["prevPage", "nextPage"];
		const { container } = render(<Pagination {...fakeData} />);
		const items = container.getElementsByTagName("a");
		expect(items.length).toBe(fakeData.totalPages + controlButtons.length);
	});
});

describe("click prevPageLink", () => {
	test("click prevPageLink, function-clickPageNumber toHaveBeenCalled", () => {
		const fakeData = {
			totalPages: 3,
			currentPage: 2,
			clickPageNumber: jest.fn()
		};
		const { container } = render(<Pagination {...fakeData} />);
		const items = container.getElementsByTagName("a");
		const prevPageLink = items[0];
		fireEvent.click(prevPageLink);
		expect(fakeData.clickPageNumber).toHaveBeenCalled();
	});
});

describe("Pagination current page highlight", () => {
	test("currentPage item has active class style?", () => {
		const fakeData = {
			totalPages: 3,
			currentPage: 1,
			clickPageNumber: jest.fn()
		};
		const { container } = render(<Pagination {...fakeData} />);
		const items = container.getElementsByTagName("a");
		const firstPageLink = items[1];
		expect(firstPageLink.classList.contains("active")).toBe(true);
	});
});
