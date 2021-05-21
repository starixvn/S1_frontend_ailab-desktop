import React from "react";
import { render, fireEvent } from "@testing-library/react";
import EventTab from "../leaderBoard.content.event";

const fakeData = {
	t: jest.fn(),
	tab: 1,
	rewardList: [
		{ displayRank: "1", reward: "1st", winnersNum: 1 },
		{ displayRank: "2", reward: "2st", winnersNum: 1 },
		{ displayRank: "3", reward: "3st", winnersNum: 1 },
		{ displayRank: "4", reward: "4st", winnersNum: 1 },
		{ displayRank: "5", reward: "5st", winnersNum: 1 }
	],
	userInfo: { isLogin: false, langId: "en", userName: "Guest" },
	rewardTab: 1,
	changeRewardTab: jest.fn(),
	linkToTnc: jest.fn()
};

const rewardListTitle = ["rewardListTitle"];

describe("rewardList num", () => {
	test("is rewardList num corectly?", () => {
		const { container } = render(<EventTab {...fakeData} />);
		const first_tab_div = container.getElementsByClassName(
			"rankingList eventList"
		)[0];
		const first_tab_ul = first_tab_div.children[0].children[0];
		const first_tab_li = first_tab_ul.children;
		expect(first_tab_li.length).toBe(
			rewardListTitle.length + fakeData.rewardList.length
		);
	});
});

describe("changeRewardTab", () => {
	test("if click the tab button, function-changeRewardTab have been called", () => {
		const { container } = render(<EventTab {...fakeData} />);
		const button_groups = container.getElementsByClassName("topTab")[0];
		const button_first = button_groups.firstChild;
		// expect(button_group.firstChild.className).toBe("xxx");
		fireEvent.click(button_first);
		expect(fakeData.changeRewardTab).toHaveBeenCalled();
	});
});

describe("linkToTnc", () => {
	test("if click the more detail, function-linkToTnc have been called", () => {
		const { container } = render(<EventTab {...fakeData} />);
		const button_moreDetails = container.getElementsByClassName("more")[0];
		fireEvent.click(button_moreDetails);
		expect(fakeData.linkToTnc).toHaveBeenCalled();
	});
});
