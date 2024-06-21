import React from "react";
import { useTranslation } from "react-i18next";
import { useLeaderBoard } from "@ailab-desktop/common";
import { numFormatToDigits } from "../common/common";

const LeaderBoardInfoAndTerm = () => {
	const { t } = useTranslation();
	const { leaderBoardSettingResponseData } = useLeaderBoard();

	const { leaderboardPointCalculation = {} } =
		leaderBoardSettingResponseData ?? {};

	const { liveCasinoTurnover, slotTurnover, sportTurnover } =
		leaderboardPointCalculation ?? {};

	return (
		<div className="leaderboard-info">
			<div className="info-point">
				<div className="title">
					{t("lbl_Leaderboard_Point_Conversion")}
				</div>
				<div className="table-content">
					<div className="table-thead">
						<div className="list">
							{t("lbl_Leaderboard_Category")}
						</div>
						<div className="list">
							{t("lbl_Leaderboard_Valid_Turnover")}
						</div>
						<div className="list">{t("lbl_Leaderboard_Point")}</div>
					</div>
					<div className="table-inner">
						<div className="list">{t("lbl_LiveCasino")}</div>
						<div className="list">
							{numFormatToDigits(liveCasinoTurnover, 0)} VNĐ
						</div>
						<div className="list">
							1 {t("lbl_Leaderboard_Point")}
						</div>
					</div>
					<div className="table-inner">
						<div className="list">{t("lbl_Slots")}</div>
						<div className="list">
							{numFormatToDigits(slotTurnover, 0)} VNĐ
						</div>
						<div className="list">
							1 {t("lbl_Leaderboard_Point")}
						</div>
					</div>
					<div className="table-inner">
						<div className="list">{t("lbl_Leaderboard_Sport")}</div>
						<div className="list">
							{numFormatToDigits(sportTurnover, 0)} VNĐ
						</div>
						<div className="list">
							1 {t("lbl_Leaderboard_Point")}
						</div>
					</div>
				</div>
			</div>
			<div className="info-term">
				<div className="title">
					{t("lbl_Leaderboard_Significant_Conditions")}
				</div>
				<div className="term-content">
					<ul>
						<li>{t("lbl_Leaderboard_Significant_Conditions_1")}</li>
						<li>{t("lbl_Leaderboard_Significant_Conditions_2")}</li>
						<li>{t("lbl_Leaderboard_Significant_Conditions_3")}</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default LeaderBoardInfoAndTerm;
