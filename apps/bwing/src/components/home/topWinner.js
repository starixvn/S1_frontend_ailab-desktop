import React from "react";
import { useLeaderBoard } from "@ailab-desktop/common";
import { Link } from "gatsby";
import { useTranslation } from "react-i18next";
import path from "../../router";
import { rankMap } from "./def";
import { numFormatToDigits } from "../common/common";
import { bannerImgUrl } from "../../config";

const TopWinner = () => {
	const { t } = useTranslation();
	const { homeRankList, langId } = useLeaderBoard();
	return (
		<>
			<div className="col-12">
				<div className="home-title row-align-center txt-bigger">
					{t("lbl_Top_Winner_Description")}
				</div>
			</div>
			<div className="col-6 mt-4 mb-6">
				<Link to={`/${langId}/${path.leaderBoard.root}`}>
					<div className="home-topwinner">
						<div className="title">{t("lbl_Top10winners")}</div>
						<div className="home-topwinner-content">
							{homeRankList &&
								homeRankList.map(
									({ userName, wTurnover }, index) => (
										<div
											key={`${userName}${wTurnover}`}
											className="home-topwinner-item"
										>
											<div>
												{/* 渲染前三名 Item，會有獎牌，所以前三名跟其他 Item 處理方式不同 */}
												{index < 3 ? (
													<img
														src={`${bannerImgUrl}/desktop/img/4.0/topwinner/${
															rankMap[index + 1]
														}.png`}
														alt=""
													/>
												) : (
													<div>{index + 1}</div>
												)}
											</div>
											<div>{userName}</div>
											<div>
												{numFormatToDigits(
													wTurnover,
													0
												)}
											</div>
										</div>
									)
								)}
						</div>
					</div>
				</Link>
			</div>
		</>
	);
};

export default TopWinner;
