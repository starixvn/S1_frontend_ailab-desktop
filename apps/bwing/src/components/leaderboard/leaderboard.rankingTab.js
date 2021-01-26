import React, { useEffect } from "react";
import moment from "moment";
import { number_format } from "../common/common";
import { defTabId, currentTopNum, lastTopNum } from "./leaderboard.def";
import DayDropdown from "./leaderboard.dayDropdown";

export default ({
	t,
	tab,
	userInfo,
	rankingData,
	onChangeDays,
	beforeDays
}) => {
	const showUpdateTime = () => {
		const _time = new Date();
		const _convertMin = _time.getMinutes() < 30 ? 0 : 30;
		_time.setMinutes(_convertMin);
		_time.setSeconds(0);
		const displayTime = moment(_time).format("YYYY/MM/DD HH:mm:ss");
		return displayTime;
	};

	useEffect(() => {
		showUpdateTime();
	}, []);

	return (
		<>
			{tab === defTabId.ranking ? (
				<h1 className="title">{t("lbl_Ranking_Top20")}</h1>
			) : (
				<>
					{tab === defTabId.lastEvent ? null : (
						<DayDropdown
							t={t}
							onChangeDays={onChangeDays}
							beforeDays={beforeDays}
						/>
					)}
				</>
			)}
			{rankingData?.length > 0 ? (
				<div className="ranklist">
					<ul>
						<li>
							<div>{t("lbl_Ranking")}</div>
							<div>{t("lbl_Username")}</div>
							<div>{t("lbl_Points")}</div>
						</li>
						<Ranking
							rankingData={rankingData}
							userInfo={userInfo}
							t={t}
							tab={tab}
						/>
					</ul>
				</div>
			) : (
				<div className="icon icon-nodata">{t("lbl_NoData")}</div>
			)}
			{tab === defTabId.lastEvent ? null : (
				<p className="remind">
					{t(`lbl_LastUpdTime`, {
						time: showUpdateTime()
					})}
				</p>
			)}
		</>
	);
};

const Ranking = ({ rankingData, userInfo, tab }) => {
	const isLastEventTab = tab === defTabId.lastEvent;
	const _TopNum = isLastEventTab ? lastTopNum : currentTopNum;
	return rankingData?.map((item, idx) => {
		const liStyle = () => {
			let top3Class = "";
			let myClass = "";
			if (idx < 3) {
				top3Class = `no${idx + 1}`;
			}

			if (item.custRank === "999+") return " myRank";

			if (
				item.userName === userInfo.userName &&
				item.custRank < _TopNum
			) {
				myClass = item.custRank <= 3 ? " myInRank" : "myInRank";
			} else if (item.userName === userInfo.userName) {
				myClass = idx < 3 ? " myRank" : "myRank";
			}

			return top3Class + myClass;
		};

		const getRankingImgUrl = (custRank, scopeIdx, _username) => {
			if (_username === userInfo.userName && custRank <= 3)
				return `../../styles/img/ranking/trophy${item.custRank}.png`;

			if (_username !== userInfo.userName && scopeIdx < 3)
				return `../../styles/img/ranking/trophy${scopeIdx + 1}.png`;

			return `../../styles/img/ranking/trophy4.png`;
		};

		return (
			<li
				key={`leaderboard_item_${item.custId}_${item.custRank}`}
				className={liStyle()}>
				<div>
					<img
						src={getRankingImgUrl(
							item?.custRank,
							idx,
							item?.username
						)}
						alt="ranking_top"
					/>

					{item?.custRank || idx + 1}
				</div>
				<div>{item.userName}</div>
				<div className="point">{number_format(item.wTurnover)}</div>
			</li>
		);
	});
};
