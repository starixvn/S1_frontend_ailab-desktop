import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Pagination } from "../../common/pagination";

jest.mock("react-i18next", () => ({
	useTranslation: () => {
		return {
			t: jest.fn()
		};
	}
}));
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
