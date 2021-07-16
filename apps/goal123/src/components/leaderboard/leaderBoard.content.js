import React from "react";
import PropTypes from "prop-types";

import { number_format } from "../common/common";

import {
	defTabId,
	defDayOptions,
	lastTopNum,
	currentTopNum,
	defImgRankId,
	defPeriodList,
	defPeriodId,
	defPeriodOptions
} from "./leaderboard.def";

const LeaderBoardContent = ({
	t,
	tab,
	periodId,
	rankingData,
	beforeDays,
	rewardList,
	onChangePeriod,
	onChangeDays,
	showUpdateTime
}) => {
	const contentTopLayout = () => {
		if (tab === defTabId.second) {
			return (
				<>
					<div className="dateSelector">
						{defPeriodOptions.map(item => (
							<button
								key={`btn-key-${item.id}`}
								className={periodId === item.id ? "active" : ""}
								onClick={() => onChangePeriod(item.id, tab)}>
								{t(item.displayKey)}
							</button>
						))}
					</div>

					<div className="dateSelector">
						<button
							className={
								periodId === defPeriodId.period4 ? "active" : ""
							}
							onClick={() =>
								onChangePeriod(defPeriodId.period4, tab)
							}>
							{t("lbl_EURO_2020_Final")}
						</button>
					</div>
				</>
			);
		}

		if (tab === defTabId.fourth) {
			return (
				<div className="dateSelector">
					{defDayOptions.map(item => (
						<button
							key={`btn-key-${item.id}`}
							className={beforeDays === item.id ? "active" : ""}
							onClick={() => onChangeDays(item.id)}>
							{t(item.displayKey)}
						</button>
					))}
				</div>
			);
		}

		return null;
	};

	const currentStartMonth = defPeriodList[periodId].StartMonth;
	const currentEndMonth = defPeriodList[periodId].EndMonth;

	return (
		<div
			className={`rank_content ${
				tab !== defTabId.first ? "active" : ""
			}`}>
			<div className="top_content">{contentTopLayout()}</div>
			<div className="bottom_content">
				<div className="left">
					{tab === defTabId.third ? (
						<>
							<div className="title">
								{t("lbl_Sport_LiveCasino_Slots")}
							</div>
							<div>
								* {t("lbl_Current_tournament_schedule")} : 13{" "}
								<span>
									{t(currentStartMonth)} 2021 ~ 12{" "}
									{t(currentEndMonth)} 2021
								</span>
							</div>
						</>
					) : null}

					<img
						className="mb-2"
						alt="champion-img"
						src={require("../../styles/img/champion.png")}
					/>
					<div className="highest">
						<span>{`VND ${rewardList[0].reward}`}</span>
					</div>
				</div>

				<div className="right inner">
					<div className="rankingList">
						<ul className="rankScroll">
							<li>
								<div>{t("lbl_Rank")}</div>
								<div>{t("lbl_Username")}</div>
								<div>{t("lbl_Points")}</div>
							</li>

							{rankingData?.length > 0 ? (
								rankingData?.map((item, idx) => {
									return (
										<RankItem
											key={`leaderboard_item_${item.userName}`}
											item={item}
											idx={idx}
											tab={tab}
										/>
									);
								})
							) : (
								<div className="nodata icon icon-nodata">
									{t("lbl_NoData")}
								</div>
							)}
						</ul>
					</div>

					<div className="message">
						{t(`lbl_LastUpdTime`, {
							time: showUpdateTime()
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

const RankItem = ({ item, idx, tab }) => {
	let mineClass = "";

	const isLastEventTab = tab === defTabId.fourth;
	const _TopNum = isLastEventTab ? lastTopNum : currentTopNum;

	if (item.rank) {
		if ((mineClass = item.rank <= _TopNum && item.rank !== 0)) {
			mineClass = "mineInner";
		} else {
			mineClass = "mine";
		}
	} else {
		mineClass = "";
	}

	return (
		<li className={mineClass}>
			<div>
				<img
					alt="nbadge-img"
					src={require(`../../styles/img/${
						idx <= 2 ? defImgRankId[idx + 1] : `nbadge`
					}.png`)}
				/>
				{item?.rank || idx + 1}
			</div>
			<div>{item.userName}</div>
			<div>{number_format({ number: item.wTurnover })}</div>
		</li>
	);
};

RankItem.propTypes = {
	item: PropTypes.objectOf(PropTypes.any).isRequired,
	idx: PropTypes.number.isRequired,
	tab: PropTypes.number.isRequired
};
export default LeaderBoardContent;

LeaderBoardContent.propTypes = {
	t: PropTypes.func.isRequired,
	tab: PropTypes.number.isRequired,
	rewardList: PropTypes.arrayOf(PropTypes.object).isRequired,
	rankingData: PropTypes.arrayOf(PropTypes.object).isRequired,
	onChangePeriod: PropTypes.func.isRequired,
	showUpdateTime: PropTypes.func.isRequired,
	onChangeDays: PropTypes.func.isRequired,
	beforeDays: PropTypes.number.isRequired,
	periodId: PropTypes.number.isRequired
};
