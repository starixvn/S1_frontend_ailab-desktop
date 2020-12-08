import React from "react";
import { defTabList } from "./leaderBoard.def";

export default ({ t, onChangeTab, tab }) => {
	let rows = defTabList.map(item => {
		return (
			<button
				key={`leaderBoard-tab-${item.id}`}
				className={item.id === tab ? "active" : ""}
				onClick={onChangeTab.bind(this, item.id)}>
				{t(item.displayKey)}
			</button>
		);
	});

	return <div className="btnGroup">{rows}</div>;
};
