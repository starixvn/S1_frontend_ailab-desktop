import React, { useEffect } from "react";
import { number_format } from "../common/common";
import {
	defTabId,
	defDayOptions,
	defDayNum,
	defImgRankId
} from "./leaderboard.def";
import LeaderboardRightMoudle from "./leaderboard.rightMoudle";
import LeaderboardLeftMoudle from "./leaderboard.leftMoudle";

export default ({
	t,
	tab,
	userInfo,
	beforeDays,
	updatedTime,
	rankingData,
	setBeforeDays,
	selfRankingData,
	getLeaderboardData,
	getSelfLeaderboardData
}) => {
	if (tab !== defTabId.records) return null;

	useEffect(() => {
		fetchData(defDayNum.yesterDay);
	}, []);

	const fetchData = beforeDays => {
		setBeforeDays(beforeDays);
		getLeaderboardData(beforeDays);
		getSelfLeaderboardData(beforeDays);
	};

	return (
		<div
			className={`rank_content ${
				tab === defTabId.records ? "active" : ""
			}`}>
			<LeaderboardLeftMoudle>
				<div className="dateSelector">
					{defDayOptions.map(item => (
						<button
							key={`btn-key-${item.id}`}
							className={beforeDays === item.id ? "active" : ""}
							onClick={() => fetchData(item.id)}>
							{t(item.displayKey)}
						</button>
					))}
				</div>
			</LeaderboardLeftMoudle>

			<LeaderboardRightMoudle
				t={t}
				updatedTime={updatedTime}
				titleDisplayKey={"lbl_Records"}>
				{[
					...rankingData,
					{
						type: "mine",
						userName: userInfo.userName,
						custRank: selfRankingData.custRank,
						point: selfRankingData.point
					}
				]?.map((item, idx) => {
					if (item.custRank > 0 && item.custRank <= 20) return null;

					if (item.type === "mine")
						return (
							<CustItem
								key={`leaderboard_item_${item.custRank}`}
								item={item}
							/>
						);

					return (
						<RankItem
							key={`leaderboard_item_${item.custId}`}
							item={item}
							idx={idx}
						/>
					);
				})}
			</LeaderboardRightMoudle>
		</div>
	);
};

const CustItem = ({ item }) => (
	<li className="mine">
		<div>
			<img src={require("../../styles/img/nbadge.png")} />
			{item.custRank > 999 || item.custRank === 0
				? "999+"
				: `${item.custRank}th`}
		</div>
		<div>{item.userName}</div>
		<div>{item.point}</div>
	</li>
);

const RankItem = ({ item, idx }) => {
	let label = idx <= 2 ? `TOP ${idx + 1}` : `${idx + 1}th`;

	return (
		<li>
			<div>
				<img
					src={require(`../../styles/img/${
						idx <= 2 ? defImgRankId[idx + 1] : `nbadge`
					}.png`)}
				/>
				{label}
			</div>
			<div>{item.userName}</div>
			<div>{item.wTurnover}</div>
		</li>
	);
};
