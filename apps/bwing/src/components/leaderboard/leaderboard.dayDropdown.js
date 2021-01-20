import React from "react";
import { defDayOptions } from "./leaderboard.def";
import Dropdown from "../common/dropdown";

export default ({ t, onChangeDays, beforeDays, updateStateOnly = false }) => {
	return (
		<div className="quickSelect">
			<div>
				<div className="txt-blue15">{t("lbl_Date")}</div>
				<div className="inputBox-blue">
					<Dropdown
						i18n={t}
						mainKey="beforeDay_"
						options={defDayOptions}
						selectedIdx={beforeDays - 1}
						onSelectItem={onChangeDays}
						showDropDownIcon={true}
					/>
				</div>
			</div>
		</div>
	);
};
