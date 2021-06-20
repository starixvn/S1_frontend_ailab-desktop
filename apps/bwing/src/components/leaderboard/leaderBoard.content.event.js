import React from "react";
import PropTypes from "prop-types";
import { defRewardTabId } from "./leaderboard.def";

const LeaderBoardContentEvent = ({
	t,
	rewardList,
	userInfo,
	rewardTab,
	changeRewardTab,
	linkToTnc
}) => {
	const rows = rewardList?.map((item, idx) => {
		return (
			<li
				key={`leaderBoard-event-${item.displayRank}`}
				className={idx < 3 ? `no${idx + 1}` : null}>
				<div>
					<img
						src={
							idx < 3
								? require(`../../styles/img/ranking/trophy${
										Number(idx) + 1
								  }.png`)
								: require(`../../styles/img/ranking/trophy4.png`)
						}
						alt="ranking_top"
					/>
				</div>
				<div>{item.displayRank}</div>
				<div>{item.reward}</div>
			</li>
		);
	});

	return (
		<div className="rankInBox">
			<div className="rankTag">
				<div className="btnGroup">
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
			</div>

			<div className="ranklist">
				<div
					className={
						rewardTab === defRewardTabId.final ? "active" : ""
					}>
					<ul className="event">
						<li>
							<div />
							<div>{t("lbl_Ranking")}</div>
							<div>{t("lbl_Bonus_credit")}</div>
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
							<div />
							<div>{t("lbl_Ranking")}</div>
							<div>{t("lbl_Prizes")}</div>
						</li>

						{rows}
					</ul>
				</div>
			</div>

			<button className="remind btn" onClick={linkToTnc}>
				{t("lbl_MoreDetails")}
			</button>
		</div>
	);
};

LeaderBoardContentEvent.propTypes = {
	t: PropTypes.func.isRequired,
	rewardList: PropTypes.arrayOf(PropTypes.object).isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	rewardTab: PropTypes.number.isRequired,
	changeRewardTab: PropTypes.func.isRequired,
	linkToTnc: PropTypes.func.isRequired
};

export default LeaderBoardContentEvent;
