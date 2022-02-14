import React from "react";
import PropTypes from "prop-types";
import { number_format } from "../common/common";
import { defTabId, defImgRankId, defRewardTabId } from "./leaderboard.def";

const LeaderBoardEventContent = ({
	t,
	tab,
	rewardList,
	userInfo,
	changeRewardTab,
	rewardTab,
	linkToTnc
}) => {
	const rows = rewardList?.map((item, idx) => {
		return (
			<li key={`leaderboard_item_${item.displayRank}`}>
				<div>
					<img
						alt={`img-${item.displayRank}`}
						src={
							require(`../../styles/img/${
								idx <= 2 ? defImgRankId[idx + 1] : `nbadge`
							}.png`).default
						}
					/>
					{rewardList[idx].displayRank}
				</div>
				<div>{`VND ${number_format({ number: item.reward })}`}</div>
			</li>
		);
	});

	return (
		<div
			className={`rank_content ${
				tab === defTabId.first ? "active" : ""
			}`}>
			<div className="right">
				<div className="title">
					{t("lbl_leaderboardTitle_1")}
					<br />
					{t("lbl_leaderboardTitle_2")}
				</div>
				<div className="titleGroup" />
				<div className="topTab">
					<button
						className={
							rewardTab === defRewardTabId.final ? "active" : ""
						}
						onClick={() => changeRewardTab(defRewardTabId.final)}>
						{t("lbl_EURO_2020_Final")}
					</button>
					<button
						className={
							rewardTab === defRewardTabId.monthly ? "active" : ""
						}
						onClick={() => changeRewardTab(defRewardTabId.monthly)}>
						{t("lbl_Monthly_Tournament")}
					</button>
				</div>
				<div className="rankingList eventList">
					<div
						className={
							rewardTab === defRewardTabId.final ? "active" : ""
						}>
						<ul>
							<li>
								<div>{t("lbl_Ranking")}</div>
								<div>{t("lbl_Prizes")}</div>
							</li>

							{rows}
						</ul>
					</div>
					<div
						className={
							rewardTab === defRewardTabId.monthly ? "active" : ""
						}>
						<div className="stitle">
							{t("lbl_Monthly_Deposit_Turnover_Race_Tournament")}
						</div>
						<div className="timeLine">
							<div>{t("lbl_Apr")}</div>
							<div>
								{t("lbl_May")}

								<div>
									{t("lbl_Stage")} 1<div>13/04 - 12/05</div>
								</div>
							</div>
							<div>
								{t("lbl_Jun")}
								<div>
									{t("lbl_Stage")} 2<div>13/05 - 12/06</div>
								</div>
							</div>
						</div>
						<ul>
							<li>
								<div>{t("lbl_Ranking")}</div>
								<div>{t("lbl_Bonus_credit")}</div>
							</li>

							{rows}
						</ul>
					</div>
				</div>

				<button className="more" onClick={linkToTnc}>
					{t("lbl_MoreDetails")}
				</button>
			</div>
		</div>
	);
};

LeaderBoardEventContent.propTypes = {
	t: PropTypes.func.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	tab: PropTypes.number.isRequired,
	rewardList: PropTypes.arrayOf(PropTypes.object).isRequired,
	changeRewardTab: PropTypes.func.isRequired,
	rewardTab: PropTypes.number.isRequired,
	linkToTnc: PropTypes.func.isRequired
};

export default LeaderBoardEventContent;
