import React from "react";
import { render, fireEvent } from "@testing-library/react";
import RankingContent from "../leaderBoard.content";

const fakeData = {
	t: jest.fn(),
	userInfo: {
		isLogin: true,
		langId: "en",
		userName: "mayo2021"
	},
	rewardList: [
		{ displayRank: "Champion", reward: "123,123,000" },
		{ displayRank: "1st Runner Up", reward: "88,123,000" }
	],
	rankingData: [
		{ custId: 1001, date: "2021-05-14T00:00:00", userName: "name01" },
		{ custId: 1002, date: "2021-05-14T00:00:00", userName: "name02" },
		{ custId: 1003, date: "2021-05-14T00:00:00", userName: "name03" }
	],
	periodId: 2,
	onChangePeriod: jest.fn(),
	beforeDays: 3,
	onChangeDays: jest.fn(),
	defTopNum: 6,
	showUpdateTime: jest.fn()
};

describe("onChangePeriod", () => {
	const _tab = 2;
	test("if click the period buttons, function-onChangePeriod have been called", () => {
		const { container } = render(
			<RankingContent {...fakeData} tab={_tab} />
		);
		const button_groups = container.getElementsByClassName(
			"dateSelector"
		)[0];
		const button_first = button_groups.firstChild;
		fireEvent.click(button_first);
		expect(fakeData.onChangePeriod).toHaveBeenCalled();
	});
});

describe("onChangeDays", () => {
	const _tab = 4;
	test("if click the day buttons, function-onChangeDays have been called", () => {
		const { container } = render(
			<RankingContent {...fakeData} tab={_tab} />
		);
		const button_groups = container.getElementsByClassName(
			"dateSelector"
		)[0];
		const button_first = button_groups.firstChild;
		fireEvent.click(button_first);
		expect(fakeData.onChangeDays).toHaveBeenCalled();
	});
});

describe("self rank style", () => {
	const rankingData = [
		{
			date: "2021-01-24T00:00:00",
			lbCategoryId: 0,
			lbCategoryName: null,
			custId: 122182,
			userName: "Us******82",
			wTurnove: 200
		},
		{
			date: "2021-01-24T00:00:00",
			lbCategoryId: 0,
			lbCategoryName: null,
			custId: 119429,
			userName: "Us******29",
			wTurnove: 100
		},
		{
			date: "2021-01-24T00:00:00",
			lbCategoryId: 0,
			lbCategoryName: null,
			custId: 121428,
			userName: "Us******28",
			wTurnove: 80
		},
		{ userName: "selfUser", wTurnover: 0, rank: "999+" }
	];
	const _tab = 2;
	test("if self rank is 999+, show customized style", () => {
		const { container } = render(
			<RankingContent
				{...fakeData}
				tab={_tab}
				rankingData={rankingData}
			/>
		);
		const self_items = container.getElementsByClassName("mine")[0];
		expect(self_items).toBeTruthy();
	});
});

describe("self rank style", () => {
	const rankingData = [
		{
			date: "2021-01-24T00:00:00",
			lbCategoryId: 0,
			lbCategoryName: null,
			custId: 122182,
			userName: "Us******82",
			wTurnove: 150
		},
		{
			date: "2021-01-24T00:00:00",
			lbCategoryId: 0,
			lbCategoryName: null,
			custId: 119429,
			userName: "Us******29",
			wTurnove: 100
		},
		{
			date: "2021-01-24T00:00:00",
			lbCategoryId: 0,
			lbCategoryName: null,
			custId: 121428,
			userName: "Us******28",
			wTurnove: 50
		},
		{ userName: "selfUser", wTurnover: 130, custRank: "2" }
	];
	const _tab = 2;
	test("if self rank in ranking top, hide customized style", () => {
		const { container } = render(
			<RankingContent
				{...fakeData}
				tab={_tab}
				rankingData={rankingData}
			/>
		);
		const self_items = container.getElementsByClassName("mineInner")[0];
		expect(self_items).toBeUndefined();
	});
});
