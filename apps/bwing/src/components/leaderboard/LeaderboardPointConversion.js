import React from "react";
import { useLeaderBoard } from "./Leaderboard-context";

/** 積分表 */
const LeaderboardPointConversion = () => {
	const { t, leaderBoardSettingResponseData } = useLeaderBoard();

	const { leaderboardPointCalculation = {} } =
		leaderBoardSettingResponseData ?? {};

	const { liveCasinoTurnover, slotTurnover, sportTurnover } =
		leaderboardPointCalculation ?? {};

	/** 固定積分 */
	const POINT = 1;

	/**
	 * 將流水 + vnd 轉換成 i18n 顯示
	 * @param turnover 流水 */
	const getTurnoverI18nText = turnover => {
		return `${turnover} ${t("vnd")}`;
	};

	return (
		<div className="info-point">
			<div className="title">{t("leaderboard_pointConversion")}</div>
			<div className="table-content">
				<div className="table-thead">
					<div className="list">{t("leaderboard_category")}</div>
					<div className="list">{t("leaderboard_validTurnover")}</div>
					<div className="list">{t("lbl_Points")}</div>
				</div>
				<div className="table-inner">
					<div className="list">
						{t("Label_General_CasinoWithLive")}
					</div>
					<div className="list">
						{getTurnoverI18nText(liveCasinoTurnover)}
					</div>
					<div className="list">{`${POINT} ${t("lbl_Points")}`}</div>
				</div>
				<div className="table-inner">
					<div className="list">{t("Label_General_Slots")}</div>
					<div className="list">
						{getTurnoverI18nText(slotTurnover)}
					</div>
					<div className="list">{`${POINT} ${t("lbl_Points")}`}</div>
				</div>
				<div className="table-inner">
					<div className="list">{t("Label_General_Sports")}</div>
					<div className="list">
						{getTurnoverI18nText(sportTurnover)}
					</div>
					<div className="list">{`${POINT} ${t("lbl_Points")}`}</div>
				</div>
			</div>
		</div>
	);
};

/** 積分表 */
export default LeaderboardPointConversion;
