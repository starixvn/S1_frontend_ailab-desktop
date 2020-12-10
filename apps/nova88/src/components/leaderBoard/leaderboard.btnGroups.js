import React from "react";
import { defTabList, defTabId } from "./leaderboard.def";
import { defDayOptions } from "./leaderboard.def";

export default ({
	t,
	onChangeGameType,
	categoryID,
	onChangeDays,
	beforeDays
}) => {
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

	let rows2 = defDayOptions.map(item => {
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

	let concatRow = [
		{ title: t("lbl_Game_type"), data: rows },
		{ title: t("lbl_Date"), data: rows2 }
	];

	return (
		<div className="rankTag">
			{concatRow.map(item => {
				return (
					<>
						<div>{item.title}</div>
						<div className="btnGroup">{item.data}</div>
					</>
				);
			})}
		</div>
	);
};
