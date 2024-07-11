import React, { useState, useRef, useEffect } from "react";
import { useLeaderBoard } from "@ailab-desktop/common";
import { useTranslation } from "react-i18next";
import classNames from "classnames";

/** 月份 i18n */
const LEADER_BOARD_MONTHS = Object.freeze({
	1: "lbl_General_Jan",
	2: "lbl_General_Feb",
	3: "lbl_General_Mar",
	4: "lbl_General_Apr",
	5: "lbl_General_May",
	6: "lbl_General_Jun",
	7: "lbl_General_Jul",
	8: "lbl_General_Aug",
	9: "lbl_General_Sep",
	10: "lbl_General_Oct",
	11: "lbl_General_Nov",
	12: "lbl_General_Dec"
});

/** 日期選擇 */
const LeaderboardDateSelection = () => {
	const { t } = useTranslation();
	// =================== 上下文 ===================
	const {
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

	// =================== Ref ===================

	/** yearRef */
	const yearRef = useRef(null);

	/** monthRef */
	const monthRef = useRef(null);

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

	/** 點擊外部時收合選單 */
	const handleClickOutside = event => {
		/**
		 * 檢查是否點擊在 ref 外部
		 * @param ref 需要檢查的 ref
		 * @returns  如果點擊在 ref 外部，return true；否則 return false */
		const isOutsideClick = ref =>
			ref.current && !ref.current.contains(event.target);

		// 如果點擊在年份選擇框外部，關閉年份選擇框
		if (isOutsideClick(yearRef)) {
			setIsShowYearSelect(false);
		}

		// 如果點擊在月份選擇框外部，關閉月份選擇框
		if (isOutsideClick(monthRef)) {
			setIsShowMonthSelect(false);
		}
	};

	/** 監聽滑鼠點擊 */
	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="board-top">
			<div className="title">{t("lbl_Ranking")}</div>
			<div className="select-period">
				<div className="select-years" ref={yearRef}>
					<div
						className={classNames("select-btn", {
							active: isShowYearSelect
						})}
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
				<div className="select-month" ref={monthRef}>
					<div
						className={classNames("select-btn", {
							active: isShowMonthSelect
						})}
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
