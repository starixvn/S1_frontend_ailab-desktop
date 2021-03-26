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

describe("click page link", () => {
	test("click pageLink, function-clickPageNumber toHaveBeenCalled", () => {
		const fakeData = {
			totalPages: 5,
			currentPage: 1,
			clickPageNumber: jest.fn()
		};
		const { container } = render(<Pagination {...fakeData} />);
		const items = container.getElementsByTagName("a");
		const Page2 = items[2];
		fireEvent.click(Page2);
		expect(fakeData.clickPageNumber).toHaveBeenCalled();
	});

	test("click prev page, function-clickPageNumber toHaveBeenCalled", () => {
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

	test("click next page, function-clickPageNumber toHaveBeenCalled", () => {
		const fakeData = {
			totalPages: 3,
			currentPage: 1,
			clickPageNumber: jest.fn()
		};
		const defaultPageLink = ["prevPage", "nextPage"];
		const { container } = render(<Pagination {...fakeData} />);
		const items = container.getElementsByTagName("a");
		const nextPageLink =
			items[fakeData.totalPages + defaultPageLink.length - 1];
		fireEvent.click(nextPageLink);
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
