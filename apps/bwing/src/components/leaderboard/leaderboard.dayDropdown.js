import React from "react";
import { defTabList, defTabId } from "./leaderboard.def";
import { defDayOptions } from "./leaderboard.def";
import Dropdown from "../../components/common/dropdown";

export default ({ t, onChangeDays, beforeDays, updateStateOnly = false }) => {
	return (
		<div className="quickSelect">
			<div>
				<div class="txt-blue15">Data</div>
				<div className="inputBox-blue">
					<Dropdown
						i18n={t}
						mainKey="beforeDay_"
						options={defDayOptions}
						selectedIdx={beforeDays}
						onSelectItem={onChangeDays}
						showDropDownIcon={true}
					/>
				</div>
			</div>
		</div>
	);
};
