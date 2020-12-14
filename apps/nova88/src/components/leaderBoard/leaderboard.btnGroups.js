import React from "react";
import { defTabList, defTabId } from "./leaderboard.def";
import { defDayOptions } from "./leaderboard.def";

export default ({
	t,
	onChangeGameType,
	categoryID,
	onChangeDays,
	beforeDays,
	tab,
	updateStateOnly = false
}) => {
	const btnOptions = [defTabId.sports, defTabId.liveCasino, defTabId.slots];
	const gameTypeBtnList = defTabList.filter(tab =>
		btnOptions.includes(tab.id)
	);

	return (
		<div className="rankTag">
			<BtnBar
				t={t}
				title={t("lbl_Game_type")}
				btnList={gameTypeBtnList}
				onClick={onChangeGameType}
				selected={categoryID}
				tab={tab}
				updateStateOnly={updateStateOnly}
			/>
			{tab === defTabId.event ? null : (
				<BtnBar
					t={t}
					title={t("lbl_Date")}
					btnList={defDayOptions}
					onClick={onChangeDays}
					selected={beforeDays}
				/>
			)}
		</div>
	);
};

const BtnBar = ({
	t,
	title,
	btnList,
	onClick,
	selected,
	tab,
	updateStateOnly
}) => {
	const rows = btnList.map(item => {
		return (
			<button
				key={`leaderboard-gameType-btn-${item.id}`}
				className={`orange ${item.id === selected ? "active" : ""}`}
				onClick={onClick.bind(this, item.id, updateStateOnly)}>
				{t(item.displayKey)}
			</button>
		);
	});
	return (
		<>
			{tab === defTabId.event ? null : <div>{title}</div>}
			<div className="btnGroup">{rows}</div>
		</>
	);
};
