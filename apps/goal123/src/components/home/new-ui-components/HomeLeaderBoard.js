import React from "react";
import { useTranslation } from "react-i18next";
import useTopWinnerList from "../hooks/useWinnerList";
import { numFormatToDigits } from "../../common/common";
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
							? `$${numFormatToDigits(winner.wTurnover, 0)}`
							: ""}
					</span>
				</div>
			</div>
		);
	};

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
											{numFormatToDigits(
												winner.wTurnover,
												0
											)}
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
