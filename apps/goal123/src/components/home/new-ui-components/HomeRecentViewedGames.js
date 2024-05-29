import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";
import { Navigation } from "swiper";
import { userInfoContext } from "../../common/context";
import useRecentlyViewed from "../../hook/useRecentlyViewed";

const HomeRecentViewedGames = () => {
	const { userInfo } = useContext(userInfoContext);
	const { t } = useTranslation();

	const { recentlyViewedList = [], onClickRecentlyViewedProductItem } =
		useRecentlyViewed();

	const params = {
		spaceBetween: 22,
		slidesPerView: 4.5,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		}
	};

	if (!recentlyViewedList || recentlyViewedList.length === 0) {
		return null;
	}

	return (
		<div className="home-recently">
			<div className="home-title">{t("lbl_Recently_Viewed")}</div>
			<Swiper className="recently" modules={[Navigation]} {...params}>
				<div className="swiper-wrapper">
					{recentlyViewedList &&
						recentlyViewedList.map(recentlyViewedGameItem => {
							const {
								tpId,
								tpGameType,
								isMaintain,
								gameLogo,
								tpLogo,
								gameName,
								gameId
							} = recentlyViewedGameItem;

							return (
								<SwiperSlide
									key={`${tpId}_${tpGameType}_${gameId}`}>
									<div
										className="swiper-slide"
										onClick={() =>
											onClickRecentlyViewedProductItem(
												recentlyViewedGameItem
											)
										}>
										<div
											className={`recently-game ${
												isMaintain ? "active" : ""
											}`}>
											<div>
												<img
													className="recently-image"
													src={
														gameLogo[
															userInfo.langId
														] ?? gameLogo.en
													}
													alt={gameLogo}
												/>
												<div>
													<img
														className="recently-brand"
														src={tpLogo}
														alt={tpLogo}
													/>
													<div className="recently-title">
														{gameName[
															userInfo.langId
														] ?? gameName.en}
													</div>
												</div>
											</div>
											{isMaintain && (
												<div className="under">
													{t("lbl_underMaintenance")}
												</div>
											)}
										</div>
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

export default HomeRecentViewedGames;
