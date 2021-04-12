import React from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";

const MobileVerifiy = ({ item, props, t }) => {
	if (item.format !== "phone") return null;

	if (props.mobileVerificationLoading)
		return (
			<div className="otpLoading">
				<i className="icon icon-spinner11" />
			</div>
		);

	if (props.userInfo.phoneVerified)
		return <span className="icon icon-checkmark" />;

	return (
		<button onClick={props.sendOTPSMS}>
			<span className="icon icon-error otp" />
			<span>{t("lbl_MobileVerify")}</span>
		</button>
	);
};

export default props => {
	const { t } = useTranslation();

	const showColumn = props.dataList?.filter(item => item.show);

	const layout = showColumn?.map(item => {
		return (
			<div key={`profileRead-${item.label}`}>
				<div>{item.label}</div>
				<div>
					{item.value}
					<MobileVerifiy item={item} props={props} t={t} />
				</div>
			</div>
		);
	});

	return <div className="profile">{layout}</div>;
};
