import React from "react";
import { defDayOptions } from "./leaderboard.def";

export default ({ t, onChangeDays, beforeDays }) => {
	let rows = defDayOptions.map(item => {
		return (
			<button
				key={`leaderboard-before-day-${item.beforeDayNum}`}
				className={`orange ${
					item.beforeDayNum === beforeDays ? "active" : ""
				}`}
				onClick={onChangeDays.bind(this, item.beforeDayNum)}>
				{t(item.displayKey)}
			</button>
		);
	});

	return <div className="btnGroup">{rows}</div>;
};
