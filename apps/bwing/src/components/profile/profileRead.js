import React from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";

export default props => {
	const { t } = useTranslation();
	const birth = `${props.userInfo.birth_d}/${props.userInfo.birth_m}/${props.userInfo.birth_y}`;

	const dataList = [
		{
			label: t("lbl_RealName"),
			value: props.userInfo.accountName,
			show: !!props.userInfo.accountName
		},
		{
			label: t("lbl_Birthday"),
			value: birth,
			format: "normal",
			show: !!props.userInfo.birth_d
		},
		{
			label: t("lbl_Phone"),
			value: `(${props.userInfo.AreaCode})${props.userInfo.phoneNo}`,
			format: "phone",
			show: !!props.userInfo.phoneNo
		},
		{
			label: t("lbl_Username"),
			value: props.userInfo.userName,
			show: true
		},
		{
			label: t("lbl_Country"),
			value: props.userInfo.country,
			show: true
		},
		{
			label: t("lbl_Email"),
			value: props.userInfo.email,
			show: !!props.userInfo.email
		}
		// ,
		// {
		// 	label: t("lbl_RegisterTime"),
		// 	value: moment(props.userInfo.regTime).format("DD/MM/YYYY HH:mm:ss"),
		// 	show: true
		// },
		// {
		// 	label: t("lbl_LastLogin"),
		// 	value: moment(props.userInfo.lastLogin).format(
		// 		"DD/MM/YYYY HH:mm:ss"
		// 	),
		// 	show: true
		// }
	];

	const showColumn = dataList?.filter(item => item.show);

	const MobileVerifiy = ({ item, props: _props, t: _t }) => {
		if (item.format !== "phone") return null;

		if (_props.mobileVerificationLoading)
			return <div className="icon icon-spinner11" />;

		if (_props.userInfo.phoneVerified)
			return (
				<button>
					<span>{_t("lbl_Verified")}</span>
					<span className="icon icon-icon32px_check" />
				</button>
			);

		return (
			<button className="notVer" onClick={_props.sendOTPSMS}>
				<span>{_t("lbl_Unverified")}</span>
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

	return layout;
};
