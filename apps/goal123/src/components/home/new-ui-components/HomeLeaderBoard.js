import React from "react";
import { useTranslation } from "react-i18next";
import useTopWinnerList from "../hooks/useWinnerList";
import { number_format } from "../../common/common";
import { bannerImgUrl } from "../../../config";

const HomeLeaderBoard = () => {
	const { winnerList, sportTopWinner, slotTopWinner, liveCasinoTopWinner } =
		useTopWinnerList();
	const { t } = useTranslation();

	// 左側api之共用元件

	const TopCategoryWinner = ({ itemClass, topWinner, title, src }) => {
		return (
			<div className={itemClass}>
				<img src={src} alt="sports-top1" />
				<div className="title">{title}</div>
				<div className="user-data">
					<span>{topWinner.length > 0 && topWinner[0].userName}</span>
					<span>
						{topWinner.length > 0 &&
							`$${number_format({
								number: topWinner[0].wTurnover
							})}`}
					</span>
				</div>
			</div>
		);
	};

	return (
		<div className="home-leaderboard">
			<div className="home-leaderboard-wrapper">
				<div className="win-products">
					<div className="home-title">
						{t("lbl_Home_Product_Top_1st")}
					</div>
					<div className="inner">
						<TopCategoryWinner
							src={`${bannerImgUrl}/desktop/img/home-page/leaderboard/sports-top1.png`}
							topWinner={sportTopWinner}
							itemClass="item sport"
							title={t("lbl_Sports")}
						/>
						<TopCategoryWinner
							src={`${bannerImgUrl}/desktop/img/home-page/leaderboard/casino-top1.png`}
							topWinner={liveCasinoTopWinner}
							itemClass="item casino"
							title={t("lbl_Casino")}
						/>
						<TopCategoryWinner
							src={`${bannerImgUrl}/desktop/img/home-page/leaderboard/slots-top1.png`}
							topWinner={slotTopWinner}
							itemClass="item slots"
							title={t("lbl_Slots")}
						/>
					</div>
				</div>
				<div className="win-total">
					<div className="home-title">{t("lbl_Home_TotalTop10")}</div>
					<div className="user-ranking">
						{winnerList.map((winner, index) => (
							<div
								className={
									index < 3 ? "user-list top" : "user-list"
								}
								key={winner.custId}>
								<div className="left">
									<div className="order">
										{index < 3 ? (
											<img
												src={`${bannerImgUrl}/desktop/img/home-page/leaderboard/winner-${
													index + 1
												}.png`}
												alt={`img-top${index + 1}`}
											/>
										) : (
											<div className="order">
												{index + 1}
											</div>
										)}
									</div>
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
	);
};

export default HomeLeaderBoard;
