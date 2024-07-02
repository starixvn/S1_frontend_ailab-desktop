import { useTranslation } from "react-i18next";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
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

	/** 本月倒數時間 */
	const [timeLeft, setTimeLeft] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	});

	const { rank, point } = userRank || {};
	const { days, hours, minutes, seconds } = timeLeft || {};

	const hasRankList = rankList.length > 0;

	const { onClickProductItem } = useMenu();
	const { userInfo } = useContext(userInfoContext);

	/** 前三名會有獎牌，其餘名次則顯示排名 */
	const randerRank = () => {
		const numberRank = Number(rank);
		const isTop3 = numberRank <= 3;
		return isTop3 ? (
			<div className="order">
				<img
					src={`${bannerImgUrl}/h5/img/home-page/leaderboard/winner-${numberRank}.png`}
					alt="user-themselves"
				/>
			</div>
		) : (
			<div className="order">{rank}</div>
		);
	};

	/** 計算離本月結算的倒數時間 */
	useEffect(() => {
		const calculateTimeLeft = () => {
			const now = moment();
			const endOfMonth = moment().endOf("month");
			const diff = endOfMonth.diff(now);
			const calSeconds = Math.floor((diff / 1000) % 60);
			const calMinutes = Math.floor((diff / 1000 / 60) % 60);
			const calHours = Math.floor((diff / (1000 * 60 * 60)) % 24);
			const calDays = Math.floor(diff / (1000 * 60 * 60 * 24));

			setTimeLeft({
				days: calDays,
				hours: calHours,
				minutes: calMinutes,
				seconds: calSeconds
			});
		};
		const interval = setInterval(calculateTimeLeft, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="leaderboard-ranking">
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
					onClick={() => onClickProductItem(products.Soccer)}
					className="btn-bet"
				>
					{t("lbl_BetNow")}
				</button>
			</div>
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
								<i className="icon-cash" />
								<span>${numFormatToDigits(point, 0)}</span>
							</div>
						</div>
					)}
				</div>
				<div className="board-refresh">
					{t("lbl_Leaderboard_Last_Update_On")}
					<span className="data">
						{getFormattedUpdateTime()}
					</span>{" "}
					{t("lbl_Leaderboard_Update_Every_30_Minutes")}
				</div>
			</div>
		</div>
	);
};

export default LeaderBoardRanking;
