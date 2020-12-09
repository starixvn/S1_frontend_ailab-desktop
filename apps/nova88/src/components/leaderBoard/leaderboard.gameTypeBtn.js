import React from "react";
import { defTabList, defTabId } from "./leaderboard.def";

export default ({ t, onChangeGameType, categoryID }) => {
	let btnOptions = [defTabId.sports, defTabId.liveCasino, defTabId.slots];
	let gameTypeBtnList = defTabList.filter(tab => btnOptions.includes(tab.id));

	let rows = gameTypeBtnList.map(item => {
		return (
			<button
				key={`leaderboard-gameType-btn-${item.id}`}
				className={`orange ${item.id === categoryID ? "active" : ""}`}
				onClick={onChangeGameType.bind(this, item.id)}>
				{t(item.displayKey)}
			</button>
		);
	});

	return <div className="btnGroup">{rows}</div>;
};
