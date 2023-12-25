import React from "react";
import PropTypes from "prop-types";
import { defTabId, defRankKey } from "./leaderBoard.def";
import { bannerImgUrl } from "../../config";
import { number_format } from "../common/common";

const leaderBoardEventContent = ({
	t,
	tab,
	linkToTnc,
	leaderBoardEventData
}) => {
	const { leaderboardPointCalculation, leaderboardRankingBonus = [] } =
		leaderBoardEventData ?? {};

	const {
		sportTurnover = 0,
		slotTurnover = 0,
		liveCasinoTurnover = 0
	} = leaderboardPointCalculation ?? {};

	const rows2 = leaderboardRankingBonus?.map((item, idx) => (
		<li key={`leaderBoard-event-${item.ranking}`}>
			<div>
				{idx + 1 < 4 ? (
					<img
						src={`${bannerImgUrl}/desktop/img/ranking/no${
							idx + 1
						}.png`}
						alt="top_ranking"
					/>
				) : (
					<img
						src={`${bannerImgUrl}/desktop/img/ranking/gold.png`}
						alt="top_ranking"
					/>
				)}
				{t(defRankKey[item.ranking] ?? "")}
			</div>
			<div>{number_format(item.minPoint, false, 0)}</div>
			<div>{number_format(item.bonus, false, 0)}</div>
		</li>
	));

	return (
		<div className={`eventRule ${tab === defTabId.first ? "active" : ""}`}>
			<div className="title">
				{t("lbl_leaderboardTitle_1")}
				<div>{t("lbl_leaderboardTitle_2")}</div>
			</div>
			<div className="rankList">
				<div className="title">{t("lbl_POINT_CALCULATION")}</div>
				<ul>
					<li>
						<div>{t("lbl_PRODUCT")}</div>
						<div>{t("lbl_VALID_TURNOVER")}</div>
						<div>{t("lbl_POINT")}</div>
					</li>
					<li>
						<div>
							<img
								src={`${bannerImgUrl}/desktop/img/ranking/ball.png`}
								alt="sports"
							/>
							{String(t("lbl_Sports")).toUpperCase()}
						</div>
						<div>{number_format(sportTurnover, false, 0)}</div>
						{/* 異動 api 後 point 全部都改成 1 */}
						<div>1</div>
					</li>
					<li>
						<div>
							<img
								src={`${bannerImgUrl}/desktop/img/ranking/slot.png`}
								alt="slots"
							/>
							{String(t("lbl_Slots")).toUpperCase()}
						</div>
						<div>{number_format(slotTurnover, false, 0)}</div>
						<div>1</div>
					</li>
					<li>
						<div>
							<img
								src={`${bannerImgUrl}/desktop/img/ranking/casino.png`}
								alt="live_casino"
							/>
							{String(t("lbl_LiveCasino")).toUpperCase()}
						</div>
						<div>{number_format(liveCasinoTurnover, false, 0)}</div>
						<div>1</div>
					</li>
				</ul>
				<div className="title">{t("lbl_Monthly_Tournament")}</div>
				<ul>
					<li>
						<div>{t("lbl_Ranking")}</div>
						<div>{t("lbl_MIN_POINT")}</div>
						<div>{t("lbl_Bonus_credit")}</div>
					</li>
					{rows2}
				</ul>
				<button onClick={linkToTnc}>{t("lbl_Terms&Conditions")}</button>
			</div>
		</div>
	);
};

leaderBoardEventContent.propTypes = {
	t: PropTypes.func.isRequired,
	tab: PropTypes.number.isRequired,
	linkToTnc: PropTypes.func.isRequired,
	leaderBoardEventData: PropTypes.object.isRequired
};

export default leaderBoardEventContent;
