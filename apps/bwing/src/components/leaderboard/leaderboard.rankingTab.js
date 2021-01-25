import React, { useEffect } from "react";
import moment from "moment";
import { number_format } from "../common/common";
import { defTabId, defTopWinnerNum } from "./leaderboard.def";
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

const Ranking = ({ rankingData, t, userInfo }) =>
	rankingData?.map((item, idx) => {
		const liStyle = () => {
			let top3Class = "";
			let myClass = "";
			if (idx < 3) {
				top3Class = `no${idx + 1}`;
			}

			if (item.userName === userInfo.userName && idx < defTopWinnerNum) {
				myClass = idx < 3 ? " myInRank" : "myInRank";
			} else if (item.userName === userInfo.userName) {
				myClass = idx < 3 ? " myRank" : "myRank";
			}

			return top3Class + myClass;
		};

		return (
			<li key={`leaderboard_item_${item.custId}`} className={liStyle()}>
				<div>
					<img
						src={
							idx < 3
								? require(`../../styles/img/ranking/trophy${
										idx + 1
								  }.png`)
								: require(`../../styles/img/ranking/trophy4.png`)
						}
						alt="ranking_top"
					/>
					{item.userName === userInfo.userName &&
					rankingData.length > defTopWinnerNum
						? item.custRank
						: idx + 1}
				</div>
				<div>{item.userName}</div>
				<div className="point">{number_format(item.wTurnover)}</div>
			</li>
		);
	});
