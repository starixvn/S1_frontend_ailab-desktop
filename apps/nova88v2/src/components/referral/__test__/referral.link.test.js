import React from "react";
import { render } from "@testing-library/react";
import ReferralLinks from "../referral.links";
// import "@testing-library/jest-dom";

HTMLCanvasElement.prototype.getContext = () => {
	// return whatever getContext has to return
};

describe("referral link", () => {
	const fakeData = {
		referralCode: "testReferralCode",
		t: jest.fn(),
		langId: "en"
	};
	test("referral link contains referralCode", () => {
		const { container } = render(<ReferralLinks {...fakeData} />);
		const span_referralLink = container.getElementsByTagName("span")[0];
		// expect(span_referralLink).toHaveTextContent(fakeData.referralCode);
		expect(span_referralLink.textContent).toContain(fakeData.referralCode);
	});
});
