import React from "react";

const enMonthList = {
	1: "Jan",
	2: "Feb",
	3: "Mar",
	4: "Apr",
	5: "May",
	6: "Jun",
	7: "Jul",
	8: "Aug",
	9: "Sep",
	10: "Oct",
	11: "Nov",
	12: "Dec"
};

export default (t, langId, props, month) => {
	if (langId === "vn") {
		return <td {...props}>{`${t("lbl_Month")} ${month + 1}`}</td>;
	}
	return <td {...props}>{`${enMonthList[month + 1]}`}</td>;
};

export const changeLocale = langId => {
	return langId === "vn" ? "vi" : "en-au";
};
