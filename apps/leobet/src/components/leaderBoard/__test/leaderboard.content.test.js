import React from "react";
import { render } from "@testing-library/react";
import RankingContent from "../leaderBoard.content";

const fakeData = {
	t: jest.fn(),
	showUpdateTime: jest.fn(),
	tab: 2,
	onChangeDays: jest.fn(),
	beforeDays: 3,
	onChangeGameType: jest.fn(),
	gameType: 0,
	onChangePeriod: jest.fn(),
	periodId: 1,
	periodList: []
};

describe("self rank style", () => {
	const rankingData = [
		{
			date: "2021-01-24T00:00:00",
			lbCategoryId: 0,
			lbCategoryName: null,
			custId: 122182,
			userName: "Us******82",
			wTurnove: 200,
			status: 1
		},
		{
			date: "2021-01-24T00:00:00",
			lbCategoryId: 0,
			lbCategoryName: null,
			custId: 119429,
			userName: "Us******29",
			wTurnove: 100,
			status: -1
		},
		{
			date: "2021-01-24T00:00:00",
			lbCategoryId: 0,
			lbCategoryName: null,
			custId: 121428,
			userName: "Us******28",
			wTurnove: 80,
			status: 0
		},
		{ userName: "selfUser", status: 0, wTurnover: 0, rank: "999+" }
	];

	test("if self item , show customized style", () => {
		const { container } = render(
			<RankingContent {...fakeData} rankingData={rankingData} />
		);
		const self_items = container.getElementsByClassName("userRank")[0];
		expect(self_items).toBeTruthy();
	});
});

describe("display arrow up icon by status", () => {
	const rankingData = [
		{
			date: "2021-01-24T00:00:00",
			lbCategoryId: 0,
			lbCategoryName: null,
			custId: 122182,
			userName: "Us******82",
			wTurnove: 200,
			status: 1
		}
	];
	test("if status=1, show arrow up icon", () => {
		const { container } = render(
			<RankingContent {...fakeData} rankingData={rankingData} />
		);
		const icon_arrow_up = container.getElementsByClassName(
			"icon icon-arrow_drop_up"
		)[0];
		expect(icon_arrow_up).toBeTruthy();
	});
});

describe("display arrow down icon by status", () => {
	const rankingData = [
		{
			date: "2021-01-24T00:00:00",
			lbCategoryId: 0,
			lbCategoryName: null,
			custId: 122182,
			userName: "Us******82",
			wTurnove: 200,
			status: -1
		}
	];
	test("if status=1, show arrow down icon", () => {
		const { container } = render(
			<RankingContent {...fakeData} rankingData={rankingData} />
		);
		const icon_arrow_down = container.getElementsByClassName(
			"icon icon-arrow_drop_down"
		)[0];
		expect(icon_arrow_down).toBeTruthy();
	});
});
