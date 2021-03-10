import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import ButtonGroups from "./leaderBoard.btnGroups";
import { defTabId, defPeriodId, defPeriodList } from "./leaderBoard.def";
import { number_format } from "../common/common";

const leaderBoardContent = ({
	t,
	showUpdateTime,
	tab,
	rewardList,
	rankingData,
	onChangePeriod,
	onChangeDays,
	beforeDays,
	periodId
}) => {
	const ContentTopLayout = () => {
		if (tab === defTabId.second) {
			return (
				<>
					<div className="rankTag">
						<div>{t("lbl_Tournament")}</div>
						<ButtonGroups
							t={t}
							onChangePeriod={onChangePeriod}
							periodId={periodId}
							onChangeDays={onChangeDays}
							beforeDays={beforeDays}
							tab={tab}
						/>
					</div>
					<button
						className={`finalTour ${
							periodId === defPeriodId.period4 ? " active" : ""
						}`}
						onClick={onChangePeriod.bind(
							this,
							defPeriodId.period4,
							tab
						)}>
						{t("lbl_EURO_2020_Final")}
					</button>
				</>
			);
		}
		if (tab === defTabId.third) {
			return <div className="txt">{t("lbl_Sport_LiveCasino_Slots")}</div>;
		}
		if (tab === defTabId.fourth) {
			return (
				<div className="rankTag">
					<div>{t("lbl_Date")}</div>
					<ButtonGroups
						t={t}
						onChangeButton={onChangePeriod}
						periodId={periodId}
						onChangeDays={onChangeDays}
						beforeDays={beforeDays}
						tab={tab}
					/>
				</div>
			);
		}
		return null;
	};

	const Ranking = () =>
		rankingData?.map((item, idx) => {
			const { rank } = item;
			return (
				<li
					key={`leaderboard_item_${item.userName}`}
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
						{rank || idx + 1}
					</div>
					<div>{item.userName}</div>
					<div>{number_format(item.wTurnover)}</div>
				</li>
			);
		});

	// const periodStart = new Date(defPeriodList[periodId].startDate);
	// const periodStartFormat = moment(periodStart).format("DD MMM YYYY");

	// const periodEnd = new Date(defPeriodList[periodId].endDate);
	// const periodEndFormat = moment(periodEnd).format("DD MMM YYYY");

	const currentStartMonth = defPeriodList[periodId].StartMonth;
	const currentEndMonth = defPeriodList[periodId].StartMonth;

	return (
		<div
			className={
				tab === defTabId.second ? "lastevent active" : "champion active"
			}>
			<ContentTopLayout />
			<div className="highest">
				{tab === defTabId.third ? (
					<div>
						* {t("lbl_Current_tournament_schedule")} : 13{" "}
						{t(`${currentStartMonth}`)} 2021 ~ 12{" "}
						{t(`${currentEndMonth}`)} 2021
					</div>
				) : null}
				<img src="https://image.n88media.com/SiteSkin/img/champion.png" />
				<div className="mwt_border">
					<span className="arrow_t_int" />
					<span className="arrow_t_out" />
					<div>{t("lbl_HighestWinningRecord")}</div>
					{/* <div>(Last 7 Days) ******kboy</div> */}
					<div className="txt-yellow">{rewardList[0].reward}</div>
				</div>
			</div>
			<div className="rankModule">
				{rankingData?.length > 0 ? (
					<div className="rankList">
						<ul>
							<li>
								<div>{t("lbl_Ranking")}</div>
								<div>{t("lbl_Username")}</div>
								<div>{t("lbl_Points")}</div>
							</li>
							<Ranking />
						</ul>
					</div>
				) : (
					<div className="icon icon-nodata">{t("lbl_NoData")}</div>
				)}
				{tab === defTabId.second ? null : (
					<div className="lastUpdate">
						{t(`lbl_LastUpdTime`, {
							time: showUpdateTime()
						})}
					</div>
				)}
			</div>
		</div>
	);
};

leaderBoardContent.propTypes = {
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
export default leaderBoardContent;
