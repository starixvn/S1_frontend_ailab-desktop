import React from "react";
import { defTabList, defTabId } from "./leaderboard.def";
import { defDayOptions } from "./leaderboard.def";

export default ({
	t,
	onChangeDays,
	beforeDays,
	tab,
	updateStateOnly = false
}) => {
	return (
		<div className="rankTag">
			<BtnBar
				t={t}
				title={t("lbl_Date")}
				btnList={defDayOptions}
				onClick={onChangeDays}
				selected={beforeDays}
			/>
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
				className={`dropdown-container`}
				onClick={onClick.bind(this, item.id, updateStateOnly)}>
				{t(item.displayKey)}
			</button>
		);
	});
	return (
		<div className="quickSelect">
			<div>
				<div class="txt-blue15">Data</div>
				<div class="dropdown">
					<button class="btn txt-orange">
						Today<i class="icon icon-arrow_drop_down"></i>
					</button>
					<div class="dropdown-container">
						<div class="dropdown-item">Today</div>
						<div class="dropdown-item">last 2 day</div>
						<div class="dropdown-item">last 3 day</div>
					</div>
				</div>
			</div>
		</div>
	);
};
