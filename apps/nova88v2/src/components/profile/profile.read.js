import React from "react";
import { DisplayRow } from "./profile.data";

export default ({
	t,
	infoList,
	mobileVerificationLoading,
	areaCodeVal,
	sendOTPSMS
}) => {
	const arr = infoList?.map(item => {
		// console.log(infoList);
		// console.log(mobileVerificationLoading);
		// console.log(areaCodeVal);
		let displayValue = item.content;

		if (item.format) {
			displayValue = item.format(item.content, item.bindingData);
		}

		return item.show ? (
			<DisplayRow
				key={`profile-${item.displayKey}`}
				t={t}
				displayKey={item.displayKey}
				content={displayValue}
				mobileVerificationLoading={mobileVerificationLoading}
				areaCode={areaCodeVal}
				sendOTPSMS={sendOTPSMS}
			/>
		) : null;
	});
	return <div className="profile">{arr}</div>;
};
