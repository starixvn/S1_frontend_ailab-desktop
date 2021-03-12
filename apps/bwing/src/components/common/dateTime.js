import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import DateTime from "react-datetime";
import "moment/locale/vi";
import "moment/locale/en-au";
import { userInfoContext } from "./context";

export default props => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

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

	const renderCustomizeMonths = (pluginData, pluginMonth) => {
		if (userInfo.langId === "vn") {
			return (
				<td {...pluginData}>
					{`${t("lbl_Month")} ${pluginMonth + 1}`}
				</td>
			);
		}
		return <td {...pluginData}>{`${enMonthList[pluginMonth + 1]}`}</td>;
	};

	const changeLocale = langId => {
		return langId === "vn" ? "vi" : "en-au";
	};

	return (
		<DateTime
			renderMonth={renderCustomizeMonths.bind(this)}
			locale={`${changeLocale(userInfo.langId)}`}
			{...props}
		/>
	);
};
