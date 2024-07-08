import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { useTranslation } from "react-i18next";
import path from "../../router";
import { rankMap } from "./def";
import { numFormatToDigits } from "../common/common";
import { bannerImgUrl } from "../../config";
import { userInfoContext } from "../common/context";

const TopWinner = ({ leaderBoardList }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	return (
		<>
			<div className="col-12">
				<div className="home-title row-align-center txt-bigger">
					{t("lbl_Top_Winner_Description")}
				</div>
			</div>
			<div className="col-6 mt-4 mb-6">
				<Link to={`/${userInfo.langId}/${path.leaderboard.root}`}>
					<div className="home-topwinner">
						<div className="title">{t("lbl_Top10winners")}</div>
						<div className="home-topwinner-content">
							{leaderBoardList.map(
								({ userName, wTurnover, custId }, index) => (
									<div
										key={custId}
										className="home-topwinner-item"
									>
										<div>
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
											{numFormatToDigits(wTurnover)}
										</div>
									</div>
								)
							)}
							{/*
						<div class="col-6 mt-4 mb-6">
                    <div class="home-topwinner">
                        <div class="title">TOP winners</div>
                        <div class="home-topwinner-content">
                            <div class="home-topwinner-item">
                                <div><img src="https://banner.bw88.io/desktop/img/4.0/topwinner/1st.png" alt=""></div>
                                <div>Wi******96</div>
                                <div>1,225,498.33</div>
                                <!-- 第四項先不做 -->
                                <!-- <div>-</div> -->
                            </div>
                            <div class="home-topwinner-item">
                                <div><img src="https://banner.bw88.io/desktop/img/4.0/topwinner/2nd.png" alt=""></div>
                                <div>Tr****i8</div>
                                <div>1,041,851.69</div>
                                <!-- 第四項先不做 -->
                                <!-- <div><img src="https://banner.bw88.io/desktop/img/4.0/topwinner/up.png" alt="" /></div> -->
                            </div>
                            <div class="home-topwinner-item">
                                <div><img src="https://banner.bw88.io/desktop/img/4.0/topwinner/3rd.png" alt=""></div>
                                <div>ng*********89</div>
                                <div>816,382.45</div>
                                <!-- 第四項先不做 -->
                                <!-- <div><img src="https://banner.bw88.io/desktop/img/4.0/topwinner/down.png" alt="" /></div> -->
                            </div>
                            <div class="home-topwinner-item">
                                <div>4</div>
                                <div>Du**************99</div>
                                <div>816,382.45</div>
                                <!-- 第四項先不做 -->
                                <!-- <div><img src="https://banner.bw88.io/desktop/img/4.0/topwinner/up.png" alt="" /></div> -->
                            </div>
                            <div class="home-topwinner-item">
                                <div>5</div>
                                <div>Wi******96</div>
                                <div>400,338.25</div>
                                <!-- 第四項先不做 -->
                                <!-- <div><img src="https://banner.bw88.io/desktop/img/4.0/topwinner/down.png" alt="" /></div> -->
                            </div>
                            <div class="home-topwinner-item">
                                <div>6</div>
                                <div>Wi******96</div>
                                <div>400,338.25</div>
                                <!-- 第四項先不做 -->
                                <!-- <div><img src="https://banner.bw88.io/desktop/img/4.0/topwinner/down.png" alt="" /></div> -->
                            </div>
                            <div class="home-topwinner-item">
                                <div>7</div>
                                <div>Wi******96</div>
                                <div>293,613.98</div>
                                <!-- 第四項先不做 -->
                                <!-- <div>-</div> -->
                            </div>
                            <div class="home-topwinner-item">
                                <div>8</div>
                                <div>Wi******96</div>
                                <div>293,613.98</div>
                                <!-- 第四項先不做 -->
                                <!-- <div><img src="https://banner.bw88.io/desktop/img/4.0/topwinner/up.png" alt="" /></div> -->
                            </div>
                            <div class="home-topwinner-item">
                                <div>9</div>
                                <div>Wi******96</div>
                                <div>293,613.98</div>
                                <!-- 第四項先不做 -->
                                <!-- <div>-</div> -->
                            </div>
                            <div class="home-topwinner-item">
                                <div>10</div>
                                <div>Wi******96</div>
                                <div>293,613.98</div>
                                <!-- 第四項先不做 -->
                                <!-- <div>-</div> -->
                            </div>
                        </div>
                    </div>
                </div>
						*/}
						</div>
					</div>
				</Link>
			</div>
		</>
	);
};
TopWinner.defaultProps = {
	leaderBoardList: []
};

TopWinner.propTypes = {
	leaderBoardList: PropTypes.arrayOf(PropTypes.any)
};

export default TopWinner;
