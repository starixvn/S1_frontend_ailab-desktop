import { useContext } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "../common/context";
import {
	OCCUPATION_OPTIONS,
	SOURCE_OF_INCOME_OPTIONS
} from "../common/join.data";

export const initValue = {
	accountName: "",
	birth: "",
	phoneNo: "",
	areaCodeIdx: null,
	addressLineFirst: "",
	addressLineSecond: "",
	addressCity: "",
	addressPostCode: "",
	addressState: "",
	occupation: "",
	aaoccupation: "",
	sourceOfIncome: ""
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
	},
	occupation: {
		checked: null,
		tip: ""
	},
	sourceOfIncome: {
		checked: null,
		tip: ""
	}
};

// const CountryFormat = (value, dataList) => {
// 	return dataList.find(x => x.code === value)?.countryName || value;
// };

export const getOccupationOptions = getTranslation => [
	{ id: 0, displayText: getTranslation("lbl_SelfEmployed"), value: 1 },
	{ id: 1, displayText: getTranslation("lbl_Employed"), value: 2 },
	{ id: 2, displayText: getTranslation("lbl_Retired"), value: 3 },
	{ id: 3, displayText: getTranslation("lbl_Others"), value: 4 }
];

export const getIncomeSourceOptions = getTranslation => [
	{ id: 0, displayText: getTranslation("lbl_OwnSaving"), value: 1 },
	{ id: 1, displayText: getTranslation("lbl_Loan"), value: 2 },
	{ id: 2, displayText: getTranslation("lbl_Others"), value: 3 }
];

export const occupationEnum = {
	1: "lbl_SelfEmployed",
	2: "lbl_Employed",
	3: "lbl_Retired",
	4: "lbl_Others"
};

export const incomeSourceEnum = {
	1: "lbl_OwnSaving",
	2: "lbl_Loan",
	3: "lbl_Others"
};

export const InfoList = ({ countryList }) => {
	const { userInfo } = useContext(userInfoContext);

	const { t } = useTranslation();

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
			displayKey: "lbl_CurrentAddress",
			content:
				// * addressCity 為必填，因此只判斷 addressCity 是否有值
				userInfo.addressCity
					? `${userInfo.addressLineFirst}, ${
							userInfo.addressCity
					  } ${t("lbl_City")} ${userInfo.addressPostCode}, ${
							userInfo.addressCountry
					  }`
					: userInfo?.currentAddress || "-",
			show: Boolean(userInfo.currentAddress)
		},
		{
			displayKey: "lbl_Nationality",
			content: userInfo.addressCountry || userInfo.nationality || "-",
			show: Boolean(userInfo.nationality)
		},
		{
			displayKey: "lbl_Occupation",
			content:
				t(
					OCCUPATION_OPTIONS.find(
						item => item.value === userInfo?.occupation
					)?.displayKey
				) || "-",
			show: true
		},

		{
			displayKey: "lbl_SourceOfIncome",
			content:
				t(
					SOURCE_OF_INCOME_OPTIONS.find(
						item => item.value === userInfo?.sourceOfIncome
					)?.displayKey
				) || "-",
			show: true
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
