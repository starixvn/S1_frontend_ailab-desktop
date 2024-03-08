import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import { navigate } from "gatsby";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { useTranslation } from "react-i18next";
import { api_hotEvent_GetDataList } from "../../../service/api/hotEvent";
import { userInfoContext } from "../../common/context";
import { bannerImgUrl } from "../../../config";

const HomeSportMatches = () => {
	const [activeTab, setActiveTab] = useState("1"); // 1: football, 2: basketball
	const [apiData, setApiData] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const langId = userInfo?.langId;

	useEffect(() => {
		const getHotEventDataList = () => {
			api_hotEvent_GetDataList({ langId }).then(res => {
				const { errorCode, data } = res.data;
				if (errorCode === 0 && data) {
					setApiData(data);
				}
			});
		};
		getHotEventDataList();
	}, []);

	useEffect(() => {
		// 根據activeTab從apiData中過濾賽事數據
		const filtered = apiData.filter(item => item.gameId === activeTab);
		setFilteredData(filtered);
	}, [apiData, activeTab]);

	const handleTabClick = (event, tab) => {
		event.preventDefault();
		setActiveTab(tab);
	};

	const filteredApiData = apiData.filter(item => {
		const gameIdForActiveTab = activeTab === "1" ? "1" : "2";
		return item.gameId === gameIdForActiveTab;
	});

	const params = {
		slidesPerView: 4.05,
		spaceBetween: 2,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		}
	};

	const onClickEvent = (gameId, matchId) => {
		const gameType = gameId === "1" ? "Soccer" : "basketball";
		const queryParams = new URLSearchParams({
			game: gameType,
			matchId
		}).toString();

		const targetUrl = `/${userInfo.langId}/sports?${queryParams}`;

		navigate(targetUrl);
	};

	return (
		<div className="home-sports">
			<div>
				<div className="home-title">Sports</div>
				<div className="sports-menu">
					<a
						href="#"
						className={activeTab === "1" ? "active" : ""}
						onClick={e => handleTabClick(e, "1")}>
						Football
					</a>
					<a
						href="#"
						className={activeTab === "2" ? "active" : ""}
						onClick={e => handleTabClick(e, "2")}>
						Basketball
					</a>
				</div>
			</div>
			<div className="ambassador">
				<img
					src={`${bannerImgUrl}/desktop/img/home-page/hotmatches-bg.png`}
					alt=""
				/>
				<span>Brand Ambassador 2023-2024 </span>
				<span>Michael Ballack</span>
			</div>
			<div className="video-content">
				<div
					style={{
						position: "relative",
						width: "100%",
						height: "0px",
						paddingBottom: "56.250%"
					}}>
					<iframe
						allowFullScreen
						allow="fullscreen"
						height="100%"
						src="https://streamable.com/e/vmq4q3?nocontrols=1"
						width="100%"
						style={{
							border: "none",
							width: "100%",
							height: "100%",
							position: "absolute",
							left: "0px",
							top: "0px",
							overflow: "hidden"
						}}
					/>
				</div>
			</div>
			<Swiper
				className="sports-hotmatches"
				modules={[Navigation]}
				{...params}>
				<div className="swiper-wrapper">
					{filteredApiData &&
						filteredApiData.map((item, index) => {
							return (
								<SwiperSlide className="swiper-slide">
									<div className="sports-item" key={index}>
										<div className="title">
											{item?.sportLeaguesTitle}
										</div>
										<div className="date">
											<span>
												{moment(
													item?.battleTime
												).format("YYYY-MM-DD HH:mm")}
											</span>
										</div>
										<div className="team-content">
											<div className="team-item">
												<img
													src={item?.homeTeamPic}
													alt=""
												/>
												<div className="team-name">
													{item?.homeTeamName}
												</div>
												<div className="odds">
													<div className="handicap">
														{item?.handicap}
													</div>
													<div>{item?.homeOdds}</div>
												</div>
											</div>
											<div className="team-item">
												<img
													src={item?.awayTeamPic}
													alt=""
												/>
												<div className="team-name">
													{item?.awayTeamName}
												</div>
												<div className="odds">
													<div className="handicap">
														{item?.handicap * -1}
													</div>
													<div>{item?.awayOdds}</div>
												</div>
											</div>
										</div>
										<button
											className="btn-bet"
											onClick={() =>
												onClickEvent(
													item.gameId,
													item.matchId
												)
											}>
											{t("lbl_BetNow")}
										</button>
									</div>
								</SwiperSlide>
							);
						})}
				</div>
				<div className="swiper-button-next" />
				<div className="swiper-button-prev" />
			</Swiper>
		</div>
	);
};

export default HomeSportMatches;
