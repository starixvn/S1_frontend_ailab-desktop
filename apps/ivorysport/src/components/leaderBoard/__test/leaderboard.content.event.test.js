import React from "react";
import { render, fireEvent } from "@testing-library/react";
import EventTab from "../leaderBoard.content.event";

const fakeData = {
	t: jest.fn(),
	tab: 1,
	rewardList: {
		section1: [
			{ turnover: "100", point: "1" },
			{ turnover: "500", point: "1" },
			{ turnover: "1000", point: "1" }
		],
		section2: [
			{
				rank: "RankChampion",
				deposit: "300,000",
				point: "30,000",
				bonus: "10,000"
			},
			{
				rank: "Rank1",
				deposit: "250,000",
				point: "25,000",
				bonus: "8,000"
			}
		]
	},
	linkToTnc: jest.fn()
};

describe("linkToTnc", () => {
	test("if click the button tnc, function-linkToTnc have been called", () => {
		const { container } = render(<EventTab {...fakeData} />);
		const button_tnc = container.getElementsByTagName("button")[0];
		fireEvent.click(button_tnc);
		expect(fakeData.linkToTnc).toHaveBeenCalled();
	});
});
