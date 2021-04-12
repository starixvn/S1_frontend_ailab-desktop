import React from "react";
import { render } from "@testing-library/react";
import ReferralShare from "../referral.share";
import "@testing-library/jest-dom";
import { number_format } from "../../common/common";

describe("referral share - days vlaue", () => {
	const fakeData = {
		referralSettingData: {
			periodDays: 10,
			bonusAmount: 10,
			vaildBet: 10,
			deposit: 10
		},
		t: jest.fn(),
		langId: "en",
		currencyId: "51"
	};
	test("is days vlaue corectly", () => {
		const { container } = render(<ReferralShare {...fakeData} />);
		const span_perioday = container.getElementsByTagName("span")[0];
		expect(span_perioday).toHaveTextContent(
			fakeData.referralSettingData.periodDays
		);
		// expect(span_perioday.textContent).toBe("xx");
	});
});

describe("referral share - bonus, vaildbet, deposit value", () => {
	const fakeData = {
		referralSettingData: {
			periodDays: 15,
			bonusAmount: 20,
			vaildBet: 30,
			deposit: 50
		},
		t: jest.fn(),
		langId: "en",
		currencyId: "51"
	};

	const bonus_numberFormat = number_format(
		fakeData.referralSettingData.bonusAmount,
		true
	);

	const vaildBet_numberFormat = number_format(
		fakeData.referralSettingData.vaildBet,
		true
	);

	const deposit_numberFormat = number_format(
		fakeData.referralSettingData.deposit,
		true
	);

	test("is bonusAmount vlaue corectly", () => {
		const { container } = render(<ReferralShare {...fakeData} />);
		const span_bonus = container.getElementsByTagName("span")[1];
		expect(span_bonus).toHaveTextContent(bonus_numberFormat);
		// expect(span_bonus.textContent).toBe(testNumber);
	});

	test("is vaildBet vlaue corectly", () => {
		const { container } = render(<ReferralShare {...fakeData} />);
		const span_vailBet = container.getElementsByTagName("span")[2];
		expect(span_vailBet).toHaveTextContent(vaildBet_numberFormat);
		// expect(span_vailBet.textContent).toBe(vaildBet_numberFormat);
	});

	test("is deposit vlaue corectly", () => {
		const { container } = render(<ReferralShare {...fakeData} />);
		const span_deposit = container.getElementsByTagName("span")[3];
		expect(span_deposit).toHaveTextContent(deposit_numberFormat);
		// expect(span_deposit.textContent).toBe(deposit_numberFormat);
	});
});
