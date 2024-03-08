import React from "react";
import { useTranslation } from "react-i18next";
import useTopWinnerList from "../hooks/useWinnerList";
import { number_format } from "../../common/common";
import { bannerImgUrl } from "../../../config";

const HomeLeaderBoard = () => {
	const winnerList = useTopWinnerList();
	const { t } = useTranslation();

	// 尚在等product top list api資料
	return (
		<div className="home-leaderboard">
			<div className="home-leaderboard-wrapper">
				<div className="win-products">
					<div className="home-title">Products top List</div>
					<div className="inner">
						<div className="item sports">
							<img
								src={`${bannerImgUrl}/desktop/img/home-page/leaderboard/sports-top1.png`}
								alt=""
							/>
							<div className="title">{t("lbl_Sports")}</div>
							<div className="user-data">
								<span>Lo*****98</span>
								<span>$999,999,999.99</span>
							</div>
						</div>
						<div className="item casino">
							<img
								src={`${bannerImgUrl}/desktop/img/home-page/leaderboard/casino-top1.png`}
								alt=""
							/>
							<div className="title">{t("lbl_Casino")}</div>
							<div className="user-data">
								<span>Lo*****98</span>
								<span>$999,999,999.99</span>
							</div>
						</div>
						<div className="item slots">
							<img
								src={`${bannerImgUrl}/desktop/img/home-page/leaderboard/slots-top1.png`}
								alt=""
							/>
							<div className="title">{t("lbl_Slots")}</div>
							<div className="user-data">
								<span>Lo*****98</span>
								<span>$999,999.99</span>
							</div>
						</div>
					</div>
				</div>
				<div className="win-total">
					<div className="home-title">Total top 10</div>
					<div className="user-ranking">
						{winnerList.map((winner, index) => (
							<div className="user-list top" key={index}>
								<div className="left">
									<div className="order">
										{index < 3 ? (
											<img
												src={`${bannerImgUrl}/desktop/img/home-page/leaderboard/winner-${
													index + 1
												}st.png`}
												alt=""
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
