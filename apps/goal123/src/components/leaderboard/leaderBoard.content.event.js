import React from "react";
import PropTypes from "prop-types";
import { number_format } from "../common/common";
import config from "../../config";
import { defTabId, defImgRankId, defRewardTabId } from "./leaderboard.def";

const LeaderBoardEventContent = ({
	t,
	tab,
	rewardList,
	userInfo,
	changeRewardTab,
	rewardTab
}) => {
	const rows = rewardList?.map((item, idx) => {
		return (
			<li key={`leaderboard_item_${item.displayRank}`}>
				<div>
					<img
						alt={`img-${item.displayRank}`}
						src={require(`../../styles/img/${
							idx <= 2 ? defImgRankId[idx + 1] : `nbadge`
						}.png`)}
					/>
					{rewardList[idx].displayRank}
				</div>
				<div>{`VND ${number_format(item.reward)}`}</div>
			</li>
		);
	});

	const linkToTnc = () => {
		window.open(
			`${config.t_and_cURL}/SiteSkin/${config.siteName}/Ranking/${userInfo.langId}4.html`
		);
	};

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
									{t("lbl_Stage")} 1<div>4/13 - 5/12</div>
								</div>
							</div>
							<div>
								{t("lbl_Jun")}
								<div>
									{t("lbl_Stage")} 2<div>5/13 - 6/12</div>
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
	rewardTab: PropTypes.number.isRequired
};

export default LeaderBoardEventContent;
