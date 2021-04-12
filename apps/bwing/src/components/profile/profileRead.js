import React from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";

export default props => {
	const { t } = useTranslation();

	const showColumn = props.dataList?.filter(item => item.show);

	const MobileVerifiy = ({ item }) => {
		if (item.format !== "phone") return null;

		if (props.mobileVerificationLoading)
			return <div className="icon icon-spinner11" />;

		if (props.userInfo.phoneVerified)
			return (
				<button>
					<span>{t("lbl_Verified")}</span>
					<span className="icon icon-icon32px_check" />
				</button>
			);

		return (
			<button className="notVer" onClick={props.sendOTPSMS}>
				<span>{t("lbl_Unverified")}</span>
				<span className="icon icon-error" />
			</button>
		);
	};

	const layout = showColumn?.map(item => {
		return (
			<div key={`profileRead-${item.label}`}>
				<div>{item.label}</div>
				<div>{item.value}</div>
				<MobileVerifiy item={item} props={props} t={t} />
			</div>
		);
	});

	return <div className="profile">{layout}</div>;
};
