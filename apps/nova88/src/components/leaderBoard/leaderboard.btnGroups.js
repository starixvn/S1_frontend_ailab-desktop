import React from "react";
import {
	defTabList,
	defTabId,
	defDayOptions,
	defPeriodId,
	defButtonOptions
} from "./leaderBoard.def";

export default ({
	t,
	onChangeButton,
	buttonID,
	onChangeDays,
	beforeDays,
	tab,
	updateStateOnly = false
}) => {
	// const buttonOptions = [
	// 	defPeriodId.period1,
	// 	defPeriodId.period2,
	// 	defPeriodId.period3
	// ];
	// const gameTypeBtnList = defTabList.filter(_tab =>
	// 	buttonOptions.includes(_tab.id)
	// );
	// console.log(gameTypeBtnList);

	// console.log(defTabId);
	// console.log(tab);

	return (
		<>
			{tab === defTabId.second ? (
				<BtnBar
					t={t}
					title={t("lbl_Game_type")}
					btnList={defButtonOptions}
					onClick={onChangeButton}
					selected={buttonID}
					tab={tab}
					updateStateOnly={updateStateOnly}
				/>
			) : (
				<BtnBar
					t={t}
					title={t("lbl_Date")}
					btnList={defDayOptions}
					onClick={onChangeDays}
					selected={beforeDays}
					tab={tab}
				/>
			)}
		</>
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
		// console.log("item--", item);
		// console.log("selected--", selected);
		return (
			<button
				key={`leaderboard-btn-${item.id}`}
				className={`${item.id === selected ? " active" : ""}`}
				onClick={onClick.bind(this, item.id, tab)}>
				{t(item.displayKey)}
			</button>
		);
	});
	return <div className="btnGroup">{rows}</div>;
};
