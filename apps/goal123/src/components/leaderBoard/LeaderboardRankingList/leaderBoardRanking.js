import { useTranslation } from "react-i18next";
import moment from "moment";
import React, { useContext } from "react";
import { CountdownTimer } from "@ailab-desktop/components";
import { products, useLeaderBoard } from "@ailab-desktop/common";
import useMenu from "../../hook/useMenu";
import { bannerImgUrl } from "../../../config";
import { userInfoContext } from "../../common/context";
import LeaderboardDateCountdown from "./leaderboardDateSelection";
import LeaderboardItem from "./LeaderboardItem";
import { numFormatToDigits } from "../../common/common";

const LeaderBoardRanking = () => {
	const { t } = useTranslation();
	const { getFormattedUpdateTime, userRank, rankList } = useLeaderBoard();
	const { custRank, point } = userRank || {};
	const hasRankList = rankList.length > 0;
	/** 每月的最後一天 ISO 格式 */
	const endOfMonthISO = moment().endOf("month").toISOString();

	const { onClickProductItem } = useMenu();
	const { userInfo } = useContext(userInfoContext);

	/** 前三名會有獎牌，其餘名次則顯示排名 */
	const randerRank = () => {
		const numberRank = Number(custRank);
		const isTop3 = numberRank <= 3;
		return isTop3 ? (
			<div className="order">
				<img
					src={`${bannerImgUrl}/h5/img/home-page/leaderboard/winner-${numberRank}.png`}
					alt="user-themselves"
				/>
			</div>
		) : (
			<div className="order">{custRank}</div>
		);
	};

	return (
		<div className="leaderboard-ranking">
			<CountdownTimer
				endTime={endOfMonthISO}
				renderHTMLCallback={timeLeft => {
					const { days, hours, minutes, seconds } = timeLeft;
					return (
						<div className="countdown">
							<div className="countdown-item">
								<div className="title">
									{t("lbl_Leaderboard_Remaining_Time")}
								</div>
								<div className="countdown-time">
									<div className="list">
										<span>{days}</span>
										{t("lbl_Days")}
									</div>
									<div className="list">
										<span>{hours}</span>
										{t("lbl_Hours")}
									</div>
									<div className="list">
										<span>{minutes}</span>
										{t("lbl_Minutes")}
									</div>
									<div className="list">
										<span>{seconds}</span>
										{t("lbl_Seconds")}
									</div>
								</div>
							</div>
							<button
								onClick={() =>
									onClickProductItem(products.Soccer)
								}
								className="btn-bet"
							>
								{t("lbl_BetNow")}
							</button>
						</div>
					);
				}}
			/>
			<div className="board">
				<LeaderboardDateCountdown />
				<div className="winner-total">
					<LeaderboardItem />
					{userInfo?.isLogin && hasRankList && (
						<div className="user-themselves">
							<div className="left">
								<i className="icon-arrow" />
								{randerRank()}
								<div className="user-id">
									{userInfo.userName}
								</div>
							</div>
							<div className="right">
								<span>{numFormatToDigits(point, 0)}</span>
							</div>
						</div>
					)}
				</div>
				<div className="board-refresh">
					{t("lbl_Leaderboard_Last_Update_On")}&nbsp;&nbsp;
					<span className="data">{getFormattedUpdateTime()}</span>
					&nbsp;{t("lbl_Leaderboard_Update_Every_30_Minutes")}
				</div>
			</div>
		</div>
	);
};

export default LeaderBoardRanking;
