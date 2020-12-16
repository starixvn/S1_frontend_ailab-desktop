import React, { useEffect } from "react";
import { number_format } from "../common/common";
import config from "../../config";
import { defTabId, defDayNum, defImgRankId } from "./leaderboard.def";
import LeaderboardRightMoudle from "./leaderboard.rightMoudle";
import LeaderboardLeftMoudle from "./leaderboard.leftMoudle";

export default ({ t, tab, rankingData, updatedTime, getLeaderboardData }) => {
	if (tab !== defTabId.ranking) return null;

	useEffect(() => {
		getLeaderboardData(defDayNum.today);
	}, []);

	return (
		<div
			className={`rank_content ${
				tab === defTabId.ranking ? "active" : ""
			}`}>
			<LeaderboardLeftMoudle />

			<LeaderboardRightMoudle
				t={t}
				updatedTime={updatedTime}
				titleDisplayKey={"lbl_Ranking"}>
				{rankingData?.map((item, idx) => {
					let label = idx <= 2 ? `TOP ${idx + 1}` : `${idx + 1}th`;
					return (
						<li key={`leaderboard_item_${item.custId}`}>
							<div>
								<img
									src={require(`../../styles/img/${
										idx <= 2
											? defImgRankId[idx + 1]
											: `nbadge`
									}.png`)}
								/>
								{label}
							</div>
							<div>{item.userName}</div>
							<div className="point">{item.wTurnover}</div>
						</li>
					);
				})}
			</LeaderboardRightMoudle>
		</div>
	);
};
