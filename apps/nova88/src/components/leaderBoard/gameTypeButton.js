import React from "react";
import { defTabList } from "./leaderBoard.def";

export default ({ t, onChangeGameType, categoryID }) => {
	let rows = defTabList.slice(1, 4).map(item => {
		return (
			<button
				key={`leaderBoard-gameType-btn-${item.id}`}
				className={`orange ${item.id === categoryID ? "active" : ""}`}
				onClick={onChangeGameType.bind(this, item.id)}>
				{t(item.displayKey)}
			</button>
		);
	});

	return <div className="btnGroup">{rows}</div>;
};
