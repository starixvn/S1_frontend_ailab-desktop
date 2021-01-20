import React from "react";
import { defTabList } from "./leaderboard.def";

export default ({ t, onChangeTab, tab }) => {
	const rows = defTabList.map(item => {
		return (
			<button
				key={`leaderboard-tab-${item.id}`}
				className={item.id === tab ? "active" : ""}
				onClick={onChangeTab.bind(this, item.id)}>
				{t(item.displayKey).toUpperCase()}
			</button>
		);
	});

	return <div className="rankBotton">{rows}</div>;
};
