import React, { useState } from "react";
import { useLeaderBoard } from "../Leaderboard-context";

/** 月份 i18n */
const LEADER_BOARD_MONTHS = Object.freeze({
	1: "Label_General_Jan",
	2: "Label_General_Feb",
	3: "Label_General_Mar",
	4: "Label_General_Apr",
	5: "Label_General_May",
	6: "Label_General_Jun",
	7: "Label_General_Jul",
	8: "Label_General_Aug",
	9: "Label_General_Sep",
	10: "Label_General_Otc",
	11: "Label_General_Nov",
	12: "Label_General_Dec"
});

/** 日期選擇 */
const LeaderboardDateSelection = () => {
	// =================== 上下文 ===================
	const {
		t,
		pastMonths,
		pastYears,
		onSelectedDateId,
		currentYear,
		currentMonth
	} = useLeaderBoard();

	// =================== 狀態 ===================
	/** 當前年份 */
	const [selectedYear, setSelectedYear] = useState(currentYear);

	/** 當前月份 */
	const [selectedMonth, setSelectedMonth] = useState(currentMonth);

	/** 是否關閉年份選擇 */
	const [isShowYearSelect, setIsShowYearSelect] = useState(false);

	/** 是否關閉月份選擇 */
	const [isShowMonthSelect, setIsShowMonthSelect] = useState(false);

	// =================== 對內函數 ===================
	/** 處理年份選擇
	 *  @param {number} year 選擇的年份 */
	const handleYearSelectClick = year => {
		setSelectedYear(year);
		const selectedDateId = `${year}-${currentMonth}`;
		onSelectedDateId(selectedDateId);
		setIsShowYearSelect(false);
	};

	/** 處理月份選擇
	 *  @param {number} month 選擇的月份 */
	const handleMonthSelectClick = month => {
		setSelectedMonth(month);
		const selectedDateId = `${selectedYear}-${month}`;
		onSelectedDateId(selectedDateId);
		setIsShowMonthSelect(false);
	};

	return (
		<div className="board-top">
			<div className="title">{t("Label_LeaderBoard_Ranking")}</div>
			<div className="select-period">
				<div className="select-years">
					<div
						className="select-btn"
						onClick={() => setIsShowYearSelect(!isShowYearSelect)}
					>
						{selectedYear}
					</div>
					{isShowYearSelect && (
						<div className="option-menu">
							{pastYears.map(year => (
								<div
									onClick={() => handleYearSelectClick(year)}
									className="option-list"
									key={year}
								>
									{year}
								</div>
							))}
						</div>
					)}
				</div>
				<div className="select-month">
					<div
						className="select-btn active"
						onClick={() => setIsShowMonthSelect(!isShowMonthSelect)}
					>
						{t(LEADER_BOARD_MONTHS[selectedMonth])}
					</div>
					{isShowMonthSelect && (
						<div className="option-menu">
							{pastMonths.map(month => (
								<div
									onClick={() =>
										handleMonthSelectClick(month)
									}
									className="option-list"
									key={month}
								>
									{t(LEADER_BOARD_MONTHS[month])}
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default LeaderboardDateSelection;
