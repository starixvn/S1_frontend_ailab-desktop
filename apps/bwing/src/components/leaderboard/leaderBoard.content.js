import React from "react";
import PropTypes from "prop-types";
import { number_format } from "../common/common";
import { defTabId, defPeriodOptions, defDayOptions } from "./leaderboard.def";

const LeaderBoardContent = ({
	t,
	tab,
	userInfo,
	rankingData,
	onChangeDays,
	periodId,
	beforeDays,
	onChangePeriod,
	showUpdateTime,
	defTopNum
}) => {
	const contentTopLayout = () => {
		if (tab === defTabId.second || tab === defTabId.fourth) {
			const isFinalTab = tab === defTabId.second;

			const btnList = isFinalTab ? defPeriodOptions : defDayOptions;
			const onBtnClick = isFinalTab ? onChangePeriod : onChangeDays;
			const selected = isFinalTab ? periodId : beforeDays;

			return (
				<div className="rankTag">
					<div className="btnGroup">
						{btnList.map(item => (
							<button
								key={`leaderboard-btn-${item.id}`}
								className={item.id === selected ? "active" : ""}
								onClick={() => onBtnClick(item.id, tab)}>
								{t(item.displayKey)}
							</button>
						))}
					</div>
				</div>
			);
		}

		if (tab === defTabId.third)
			return <h1 className="title">{t("lbl_Tournament_Points")}</h1>;

		return null;
	};

	return (
		<div className="rankInBox">
			{contentTopLayout()}

			<div className="ranklist">
				<ul>
					<li>
						<div>{t("lbl_Ranking")}</div>
						<div>{t("lbl_Username")}</div>
						<div>{t("lbl_Points")}</div>
					</li>

					{rankingData?.length > 0 ? (
						rankingData?.map((item, idx) => (
							<RankItem
								key={`leaderboard_item_${item.userName}`}
								item={item}
								idx={idx}
								tab={tab}
								userName={userInfo.userName}
								defTopNum={defTopNum}
							/>
						))
					) : (
						<div className="icon icon-nodata">
							{t("lbl_NoData")}
						</div>
					)}
				</ul>
			</div>

			<p className="remind">
				{t(`lbl_LastUpdTime`, {
					time: showUpdateTime()
				})}
			</p>
		</div>
	);
};

LeaderBoardContent.propTypes = {
	t: PropTypes.func.isRequired,
	tab: PropTypes.number.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	rankingData: PropTypes.arrayOf(PropTypes.object).isRequired,
	onChangeDays: PropTypes.func.isRequired,
	periodId: PropTypes.number.isRequired,
	beforeDays: PropTypes.number.isRequired,
	onChangePeriod: PropTypes.func.isRequired,
	showUpdateTime: PropTypes.func.isRequired,
	defTopNum: PropTypes.number.isRequired
};

export default LeaderBoardContent;

const RankItem = ({ item, idx, userName, defTopNum }) => {
	const liStyle = () => {
		let top3Class = "";
		let myClass = "";

		if (idx < 3) {
			top3Class = `no${idx + 1}`;
		}

		if (item.custRank === "999+") return " myRank";

		if (item.userName === userName && item.custRank < defTopNum) {
			myClass = item.custRank <= 3 ? " myInRank" : "myInRank";
		} else if (item.userName === userName) {
			myClass = idx < 3 ? " myRank" : "myRank";
		}

		return top3Class + myClass;
	};

	const rankingImgUrl = (custRank, scopeIdx, _username) => {
		if (_username === userName && custRank <= 3)
			return `../../styles/img/ranking/trophy${item.custRank}.png`;

		if (_username !== userName && scopeIdx < 3)
			return `../../styles/img/ranking/trophy${scopeIdx + 1}.png`;

		return `../../styles/img/ranking/trophy4.png`;
	};

	return (
		<li
			key={`leaderboard_item_${item.custId}_${item.custRank}`}
			className={liStyle()}>
			<div>
				<img
					src={rankingImgUrl(item?.custRank, idx, item?.username)}
					alt="ranking_top"
				/>

				{item?.custRank || idx + 1}
			</div>
			<div>{item.userName}</div>
			<div className="point">{number_format(item.wTurnover)}</div>
		</li>
	);
};

RankItem.propTypes = {
	item: PropTypes.objectOf(PropTypes.any).isRequired,
	idx: PropTypes.number.isRequired,
	userName: PropTypes.string.isRequired,
	defTopNum: PropTypes.number.isRequired
};
