import React from "react";
import { defTabId, defDayOptions, defPeriodOptions } from "./leaderBoard.def";

export default ({
	t,
	tab,
	onChangePeriod,
	periodId,
	onChangeDays,
	beforeDays
}) => {
	const isFinalTab = tab === defTabId.second;
	return (
		<BtnBar
			t={t}
			btnList={isFinalTab ? defPeriodOptions : defDayOptions}
			onClick={isFinalTab ? onChangePeriod : onChangeDays}
			selected={isFinalTab ? periodId : beforeDays}
			tab={tab}
		/>
	);
};

const BtnBar = ({ t, btnList, onClick, selected, tab }) => {
	const rows = btnList.map(item => {
		return (
			<button
				key={`leaderboard-btn-${item.id}`}
				className={`${item.id === selected ? " active" : ""}`}
				onClick={onClick.bind(this, item.id, tab)}
			>
				{t(item.displayKey)}
			</button>
		);
	});
	return <div className="btnGroup">{rows}</div>;
};
