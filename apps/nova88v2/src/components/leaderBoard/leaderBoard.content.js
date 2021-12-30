import React from "react";
import PropTypes from "prop-types";
import { defTabId } from "./leaderBoard.def";
import { number_format } from "../common/common";
import ContentTopNav from "./leaderBoard.content.topNav";

const leaderBoardContent = ({
	t,
	showUpdateTime,
	tab,
	rankingData,
	onChangeDays,
	beforeDays,
	onChangeGameType,
	gameType,
	onChangePeriod,
	periodId,
	periodList
}) => {
	const Ranking = () =>
		rankingData?.map((item, idx) => {
			const { rank } = item;

			const displayStatus = _status => {
				if (tab === defTabId.fourth) {
					return null;
				}

				let result = <div className="icon icon-minus" />;
				if (_status > 0) {
					result = <div className="icon icon-arrow_drop_up" />;
				} else if (_status < 0) {
					result = <div className="icon icon-arrow_drop_down" />;
				}
				return result;
			};

			return (
				<li
					key={`leaderboard_item_${item.custId}_${item.Turnover}`}
					className={rank ? "userRank" : null}>
					<div>
						{idx < 3 ? (
							<img
								src={require(`../../styles/img/no${
									idx + 1
								}.png`)}
								alt="ranking_top_three"
							/>
						) : (
							<img
								src={require(`../../styles/img/gold.png`)}
								alt="ranking_gold"
							/>
						)}
						{`TOP ${rank || idx + 1}`}
					</div>
					<div>{item.userName}</div>
					{displayStatus(item.status)}
					<div>{number_format(item.wTurnover)}</div>
				</li>
			);
		});

	return (
		<div
			className={
				tab === defTabId.third ? "champion active" : "lastevent active"
			}>
			<ContentTopNav
				t={t}
				tab={tab}
				onChangeDays={onChangeDays}
				beforeDays={beforeDays}
				onChangeGameType={onChangeGameType}
				gameType={gameType}
				onChangePeriod={onChangePeriod}
				periodId={periodId}
				periodList={periodList}
			/>
			<div className="rankModule">
				{rankingData?.length > 0 ? (
					<div className="rankList">
						<ul>
							<li>
								<div>{t("lbl_Ranking")}</div>
								<div>{t("lbl_Username")}</div>
								{tab === defTabId.fourth ? null : (
									<div>{t("lbl_Status")}</div>
								)}
								<div>{t("lbl_Points")}</div>
							</li>
							<Ranking />
						</ul>
					</div>
				) : (
					<div className="icon icon-nodata">{t("lbl_NoData")}</div>
				)}
				{tab === defTabId.fourth ? null : (
					<>
						<div className="lastUpdate">
							{t(`lbl_LastUpdTime`, {
								time: showUpdateTime()
							})}
						</div>
						<div
							className="lastUpdate"
							style={{ color: "#f1d5b6", fontWeight: 600 }}>
							{t("lbl_Ranking_EndDate")}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

leaderBoardContent.defaultProps = {
	periodId: null
};

leaderBoardContent.propTypes = {
	t: PropTypes.func.isRequired,
	tab: PropTypes.number.isRequired,
	rankingData: PropTypes.arrayOf(PropTypes.any).isRequired,
	showUpdateTime: PropTypes.func.isRequired,
	onChangeDays: PropTypes.func.isRequired,
	beforeDays: PropTypes.number.isRequired,
	onChangeGameType: PropTypes.func.isRequired,
	gameType: PropTypes.number.isRequired,
	onChangePeriod: PropTypes.func.isRequired,
	periodId: PropTypes.number,
	periodList: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default leaderBoardContent;
