import React from "react";
import PropTypes from "prop-types";
import { defTabId } from "./leaderBoard.def";
import { bannerImgUrl } from "../../config";

const leaderBoardEventContent = ({ t, tab, rewardList, linkToTnc }) => {
	const rows2 = rewardList?.section2?.map((item, idx) => (
		<li key={`leaderBoard-event-${item.rank}`}>
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
				{item.rank}
			</div>
			<div>{item.point}</div>
			<div>{item.bonus}</div>
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
						<div>{rewardList?.section1[0]?.turnover}</div>
						<div>{rewardList?.section1[0]?.point}</div>
					</li>
					<li>
						<div>
							<img
								src={`${bannerImgUrl}/desktop/img/ranking/slot.png`}
								alt="slots"
							/>
							{String(t("lbl_Slots")).toUpperCase()}
						</div>
						<div>{rewardList?.section1[1]?.turnover}</div>
						<div>{rewardList?.section1[1]?.point}</div>
					</li>
					<li>
						<div>
							<img
								src={`${bannerImgUrl}/desktop/img/ranking/casino.png`}
								alt="live_casino"
							/>
							{String(t("lbl_LiveCasino")).toUpperCase()}
						</div>
						<div>{rewardList?.section1[2]?.turnover}</div>
						<div>{rewardList?.section1[2]?.point}</div>
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
	rewardList: PropTypes.objectOf(PropTypes.any).isRequired,
	linkToTnc: PropTypes.func.isRequired
};

export default leaderBoardEventContent;
