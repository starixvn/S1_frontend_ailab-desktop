import { useContext } from "react";
import moment from "moment";
import { userInfoContext } from "../common/context";

export const initValue = {
	accountName: "",
	birth: "",
	phoneNo: "",
	email: "",
	areaCodeIdx: null,
	addressLineFirst: "",
	addressLineSecond: "",
	addressCity: "",
	addressPostCode: "",
	addressState: "",
	addressCountry: ""
};

export const initStatus = {
	accountName: {
		checked: null,
		tip: ""
	},
	birth: {
		checked: null,
		tip: ""
	},
	phoneNo: {
		checked: null,
		tip: ""
	},
	email: {
		checked: "profile-email",
		tip: ""
	},
	addressLineFirst: {
		checked: null,
		tip: "",
		type: "addr"
	},
	addressLineSecond: {
		checked: null,
		tip: "",
		type: "addr"
	},
	addressCity: {
		checked: null,
		tip: "",
		type: "addr"
	},
	addressPostCode: {
		checked: null,
		tip: "",
		type: "addr"
	},
	addressState: {
		checked: null,
		tip: "",
		type: "addr"
	},
	addressCountry: {
		checked: null,
		tip: "",
		type: "addr"
	}
};

// const CountryFormat = (value, dataList) => {
// 	return dataList.find(x => x.code === value)?.countryName || value;
// };

export const InfoList = ({ countryList }) => {
	const { userInfo } = useContext(userInfoContext);

	const infoList = [
		{
			displayKey: "lbl_RealName",
			content: userInfo?.accountName,
			show: Boolean(userInfo.accountName)
		},
		{
			displayKey: "lbl_Birthday",
			content: `${userInfo?.birth_d}/${userInfo?.birth_m}/${userInfo?.birth_y}`,
			show:
				Boolean(userInfo.birth_d) &&
				Boolean(userInfo.birth_m) &&
				Boolean(userInfo.birth_y)
		},
		{
			displayKey: "lbl_Username",
			content: userInfo.userName,
			show: Boolean(userInfo.userName)
		},
		// {
		// 	displayKey: "lbl_Country",
		// 	content: userInfo.perCountry,
		// 	show: Boolean(userInfo.perCountry),
		// 	format: CountryFormat,
		// 	bindingData: countryList
		// },
		{
			displayKey: "lbl_Phone",
			content: userInfo?.phoneNo,
			show: Boolean(userInfo.phoneNo)
		},
		{
			displayKey: "lbl_Email",
			content: userInfo?.email,
			show: Boolean(userInfo.email)
		},
		{
			displayKey: "lbl_RegisterTime",
			content: moment(userInfo.regTime).format("DD/MM/YYYY HH:mm:ss"),
			show: Boolean(userInfo.regTime)
		},
		{
			displayKey: "lbl_LastLogin",
			content: moment(userInfo.lastLogin).format("DD/MM/YYYY HH:mm:ss"),
			show: Boolean(userInfo.lastLogin)
		},
		{
			displayKey: "lbl_Line_1",
			content: userInfo?.addressLineFirst,
			show: Boolean(userInfo.addressLineFirst),
			code: "addressLineFirst"
		},
		{
			displayKey: "lbl_Line_2",
			content: userInfo?.addressLineSecond,
			show: Boolean(userInfo.addressLineSecond),
			code: "addressLineSecond"
		},
		{
			displayKey: "lbl_City",
			content: userInfo?.addressCity,
			show: Boolean(userInfo.addressCity),
			code: "addressCity"
		},
		{
			displayKey: "lbl_PostCode",
			content: userInfo?.addressPostCode,
			show: Boolean(userInfo.addressPostCode),
			code: "addressPostCode"
		},
		{
			displayKey: "lbl_State",
			content: userInfo?.addressState,
			show: Boolean(userInfo.addressState),
			code: "addressState"
		},
		{
			displayKey: "lbl_Country",
			content: userInfo?.addressCountry,
			show: Boolean(userInfo.addressCountry),
			code: "addressCountry"
		}
	];

	return infoList;
};
