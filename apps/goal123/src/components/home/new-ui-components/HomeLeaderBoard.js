import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useLeaderBoard } from "@ailab-desktop/common";
import { Link } from "gatsby";
import path from "../../../router";
import { numFormatToDigits } from "../../common/common";
import { bannerImgUrl } from "../../../config";

const HomeLeaderBoard = () => {
	const { t } = useTranslation();
	const { homeRankList, langId } = useLeaderBoard();

	// 左側api之共用元件
	const TopThreeWinner = ({ winner, src }) => {
		const { userName, wTurnover } = winner;
		return (
			<div className="item">
				<img src={src} alt="leaderboard-top3-background" />
				<div className="user-data">
					<span>{userName || ""}</span>
					<span>
						{wTurnover ? `${numFormatToDigits(wTurnover, 0)}` : ""}
					</span>
				</div>
			</div>
		);
	};

	TopThreeWinner.propTypes = {
		winner: PropTypes.shape({
			userName: PropTypes.string,
			wTurnover: PropTypes.number
		}),
		src: PropTypes.string.isRequired
	};

	TopThreeWinner.defaultProps = {
		winner: {
			userName: "",
			wTurnover: 0
		}
	};

	return (
		<div className="home-leaderboard">
			<div className="home-leaderboard-wrapper">
				<div className="home-title">
					{t("lbl_Home_Product_Top_1st")}
				</div>
				<Link to={`/${langId}/${path.leaderBoard.root}`}>
					<div className="winner">
						<div className="winner-left">
							<div className="inner">
								<TopThreeWinner
									src={`${bannerImgUrl}/desktop/img/home-page/leaderboard/1st.png`}
									winner={homeRankList[0]} // 第一名
								/>
								<TopThreeWinner
									src={`${bannerImgUrl}/desktop/img/home-page/leaderboard/2nd.png`}
									winner={homeRankList[1]} // 第二名
								/>
								<TopThreeWinner
									src={`${bannerImgUrl}/desktop/img/home-page/leaderboard/3rd.png`}
									winner={homeRankList[2]} // 第三名
								/>
							</div>
						</div>
						<div className="winner-right">
							<div className="user-ranking">
								{homeRankList &&
									homeRankList
										.slice(3)
										.map(
											(
												{ userName, wTurnover },
												index
											) => (
												<div
													className="user-list"
													key={`${userName}${wTurnover}`}
												>
													<div className="left">
														<div className="order">
															{index + 4}
														</div>
														<div className="user-id">
															{userName}
														</div>
													</div>
													<div className="right">
														<span>
															{numFormatToDigits(
																wTurnover,
																0
															)}
														</span>
													</div>
												</div>
											)
										)}
							</div>
						</div>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default HomeLeaderBoard;
