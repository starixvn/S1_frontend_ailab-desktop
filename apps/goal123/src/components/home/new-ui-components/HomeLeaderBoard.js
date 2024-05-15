import React from "react";
import { useTranslation } from "react-i18next";
import useTopWinnerList from "../hooks/useWinnerList";
import { number_format } from "../../common/common";
import { bannerImgUrl } from "../../../config";

const HomeLeaderBoard = () => {
	const { winnerList } = useTopWinnerList();
	const { t } = useTranslation();

	// 左側api之共用元件

	const TopThreeWinner = ({ winner, src }) => {
		return (
			<div className="item">
				<img src={src} alt="leaderboard-top3-background" />
				<div className="user-data">
					<span>{winner?.userName || ""}</span>
					<span>
						{winner
							? `$${number_format({ number: winner.wTurnover })}`
							: ""}
					</span>
				</div>
			</div>
		);
	};


	// 目前api只有前三名 這邊測試用 之後刪除

	// const dummyData = [
	// 	{
	// 		custId: 1,
	// 		userName: "test1",
	// 		wTurnover: 100
	// 	},
	// 	{
	// 		custId: 2,
	// 		userName: "test2",
	// 		wTurnover: 200
	// 	},
	// 	{
	// 		custId: 3,
	// 		userName: "test3",
	// 		wTurnover: 300
	// 	},
	// 	{
	// 		custId: 4,
	// 		userName: "test4",
	// 		wTurnover: 400
	// 	},
	// 	{
	// 		custId: 5,
	// 		userName: "test5",
	// 		wTurnover: 500
	// 	},
	// 	{
	// 		custId: 6,
	// 		userName: "test6",
	// 		wTurnover: 600
	// 	},
	// 	{
	// 		custId: 7,
	// 		userName: "test7",
	// 		wTurnover: 700
	// 	},
	// 	{
	// 		custId: 8,
	// 		userName: "test8",
	// 		wTurnover: 800
	// 	},
	// 	{
	// 		custId: 9,
	// 		userName: "test9",
	// 		wTurnover: 900
	// 	},
	// 	{
	// 		custId: 10,
	// 		userName: "test10",
	// 		wTurnover: 1000
	// 	}
	// ];

	return (
		<div className="home-leaderboard">
			<div className="home-leaderboard-wrapper">
				<div className="home-title">
					{t("lbl_Home_Product_Top_1st")}
				</div>
				<div className="winner">
					<div className="winner-left">
						<div className="inner">
							<TopThreeWinner
								src={`${bannerImgUrl}/desktop/img/home-page/leaderboard/1st.png`}
								winner={winnerList[0]} // 第一名
							/>
							<TopThreeWinner
								src={`${bannerImgUrl}/desktop/img/home-page/leaderboard/2nd.png`}
								winner={winnerList[1]} // 第二名
							/>
							<TopThreeWinner
								src={`${bannerImgUrl}/desktop/img/home-page/leaderboard/3rd.png`}
								winner={winnerList[2]} // 第三名
							/>
						</div>
					</div>
					<div className="winner-right">
						<div className="user-ranking">
							{winnerList.slice(3).map((winner, index) => (
								<div className="user-list" key={winner.custId}>
									<div className="left">
										<div className="order">{index + 4}</div>
										<div className="user-id">
											{winner.userName}
										</div>
									</div>
									<div className="right">
										<i className="icon-cash" />
										<span>
											{number_format({
												number: winner.wTurnover
											})}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeLeaderBoard;
