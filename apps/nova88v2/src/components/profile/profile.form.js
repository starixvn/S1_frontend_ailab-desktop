import React from "react";
import PropTypes from "prop-types";
import DisplayRow from "./profile.form.row";

const ProfileForm = ({
	t,
	infoList,
	mobileVerificationLoading,
	areaCodeVal,
	sendOTPSMS,
	userInfo,
	userValue,
	status,
	editField,
	valueCheck,
	phoneCheck,
	emailCheck,
	clickInfo,
	clickSubmit,
	isUSDT,
	areaCodeOptions,
	onSelectAreaCode,
	sendEmailOtp
}) => {
	const arr = infoList?.map(item => {
		let displayValue = item.content;

		if (item.format) {
			displayValue = item.format(item.content, item.bindingData);
		}

		return (
			<DisplayRow
				key={`profile-${item.displayKey}`}
				t={t}
				displayKey={item.displayKey}
				content={displayValue}
				mobileVerificationLoading={mobileVerificationLoading}
				areaCode={areaCodeVal}
				sendOTPSMS={sendOTPSMS}
				userInfo={userInfo}
				userValue={userValue}
				status={status}
				editField={editField}
				valueCheck={valueCheck}
				phoneCheck={phoneCheck}
				emailCheck={emailCheck}
				clickInfo={clickInfo}
				clickSubmit={clickSubmit}
				isUSDT={isUSDT}
				areaCodeOptions={areaCodeOptions}
				onSelectAreaCode={onSelectAreaCode}
				sendEmailOtp={sendEmailOtp}
			/>
		);
	});
	return <div className="profile">{arr}</div>;
};

export default ProfileForm;

ProfileForm.propTypes = {
	t: PropTypes.func.isRequired,
	infoList: PropTypes.arrayOf(PropTypes.any).isRequired,
	mobileVerificationLoading: PropTypes.bool.isRequired,
	areaCodeVal: PropTypes.string.isRequired,
	sendOTPSMS: PropTypes.func.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	userValue: PropTypes.objectOf(PropTypes.any).isRequired,
	status: PropTypes.objectOf(PropTypes.any).isRequired,
	editField: PropTypes.func.isRequired,
	valueCheck: PropTypes.func.isRequired,
	phoneCheck: PropTypes.func.isRequired,
	emailCheck: PropTypes.func.isRequired,
	clickInfo: PropTypes.func.isRequired,
	clickSubmit: PropTypes.func.isRequired,
	isUSDT: PropTypes.bool.isRequired,
	areaCodeOptions: PropTypes.arrayOf(PropTypes.any).isRequired,
	onSelectAreaCode: PropTypes.func.isRequired,
	sendEmailOtp: PropTypes.func.isRequired
};
