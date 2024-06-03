import React, { useContext } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import Swiper from "react-id-swiper";
import { userInfoContext } from "../common/context";
import useRecentlyViewed from "../hook/useRecentlyViewed";

const RecentlyViewed = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	const { recentlyViewedList = [], onClickRecentlyViewedProductItem } =
		useRecentlyViewed();

	const swiperParams = {
		slidesPerView: 5.2,
		spaceBetween: 30
	};

	return (
		recentlyViewedList.length !== 0 && (
			<div className="col-12">
				<div className="home-title">
					<i className="icon-star-outline" />
					{t("lbl_Recently_Viewed")}
				</div>
				<div className="home-recently mb-6">
					<Swiper {...swiperParams}>
						{recentlyViewedList.map(recentlyViewedGameItem => {
							const {
								gameLogo,
								gameName,
								tpId,
								tpGameType,
								isMaintain,
								gameId
							} = recentlyViewedGameItem;
							return (
								<div key={`${tpId}${tpGameType}${gameId}`}>
									<a
										className={classNames(
											"home-recently-item",
											{ maintain: isMaintain }
										)}
										style={{ cursor: "pointer" }}
										onClick={() =>
											onClickRecentlyViewedProductItem(
												recentlyViewedGameItem
											)
										}>
										<div
											className="home-recently-img"
											style={{
												backgroundImage: `url("${
													gameLogo[userInfo.langId] ??
													gameLogo.en
												}")`
											}}
										/>
										<div className="home-recently-info">
											<span>
												{gameName[userInfo.langId] ??
													gameName.en}
											</span>
										</div>
										{isMaintain && (
											<div className="tag-maintain">
												{t("lbl_underMaintenance")}
											</div>
										)}
									</a>
								</div>
							);
						})}
					</Swiper>
				</div>
			</div>
		)
	);
};
RecentlyViewed.defaultProps = {
	recentlyViewedGames: []
};

RecentlyViewed.propTypes = {
	recentlyViewedGames: PropTypes.arrayOf(PropTypes.any)
};

export default RecentlyViewed;
