import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import Swiper from "react-id-swiper";
import PropTypes from "prop-types";
import moment from "moment";
import classNames from "classnames";
import { defTpGameType } from "@ailab-desktop/common";
import { userInfoContext } from "../common/context";
import { SPORT_LIST } from "./def";
import { SetPathParameter } from "../common/swipperBanner";
import path from "../../router";
import { defMainMenuIcon, isShowEventIcon } from "../layout/header.menu.newDef";

const hotMatchIcon = Object.freeze({
	[defMainMenuIcon.newTag]: "tag-new-pop"
});

const HomeMatch = ({ hotEventList, maintainList, handleClickHomeProduct }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	const hotEventSwiperParams = {
		spaceBetween: 50,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		}
	};

	const sportsSwiperParams = {
		slidesPerView: 3,
		spaceBetween: 15,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev"
		}
	};

	const switchHotMatchIcon = iconType => {
		return hotMatchIcon[iconType] || null;
	};

	const hdpSymbol = hdp => {
		if (hdp === 0) return hdp;
		return `${hdp < 0 ? "" : "+"} ${hdp}`;
	};

	const handleGoToBet = ({ tpId, gameId, matchId }) => {
		const parameters = SetPathParameter({
			urlRouter: path.sports.root,
			tpId,
			gameId,
			matchId
		});

		navigate(`/${userInfo.langId}/${path.sports.root}${parameters}`);
	};

	const combinePairs = array => {
		const result = [];
		for (let i = 0; i < array.length; i += 2) {
			const item1 = array[i] || {};
			const item2 = array[i + 1] || {};
			const combineItem = (
				<div key={item1.matchId}>
					<div className="home-match-item">
						<div className="home-match-league">
							{item1.sportLeaguesTitle}
						</div>
						<div className="home-match-content">
							<div className="home-match-team left">
								<img
									src={item1.homeTeamPic}
									alt={item1.homeTeamName}
								/>
								<div className="name">{item1.homeTeamName}</div>
							</div>
							<div className="home-match-time">
								<div>
									{moment(item1.battleTime).format(
										"MM/DD HH:mm"
									)}
								</div>
							</div>
							<div className="home-match-team right">
								<img
									src={item1.awayTeamPic}
									alt={item1.awayTeamName}
								/>
								<div className="name">{item1.awayTeamName}</div>
							</div>
						</div>
						<div className="home-match-odds">
							<div>
								<span>{hdpSymbol(item1.handicap)}</span>
								<span>{item1.homeOdds}</span>
							</div>
							<button
								onClick={() =>
									handleGoToBet({
										tpId: item1.tpId,
										gameId: item1.gameId,
										matchId: item1.matchId
									})
								}>
								<span>{t("lbl_BetNow")}</span>
							</button>
							<div>
								<span>{hdpSymbol(-item1.handicap)}</span>
								<span>{item1.awayOdds}</span>
							</div>
						</div>
					</div>
					<div className="home-match-item">
						<div className="home-match-league">
							{item2.sportLeaguesTitle}
						</div>
						<div className="home-match-content">
							<div className="home-match-team left">
								<img
									src={item2.homeTeamPic}
									alt={item2.homeTeamName}
								/>
								<div className="name">{item2.homeTeamName}</div>
							</div>
							<div className="home-match-time">
								<div>
									{" "}
									{moment(item2.battleTime).format(
										"MM/DD HH:mm"
									)}
								</div>
							</div>
							<div className="home-match-team right">
								<img
									src={item2.awayTeamPic}
									alt={item2.awayTeamName}
								/>
								<div className="name">{item2.awayTeamName}</div>
							</div>
						</div>
						<div className="home-match-odds">
							<div>
								<span>{hdpSymbol(item2.handicap)}</span>
								<span>{item2.homeOdds}</span>
							</div>
							<button
								onClick={() =>
									handleGoToBet({
										tpId: item2.tpId,
										gameId: item2.gameId,
										matchId: item2.matchId
									})
								}>
								<span>{t("lbl_BetNow")}</span>
							</button>
							<div>
								<span>{hdpSymbol(-item2.handicap)}</span>
								<span>{item2.awayOdds}</span>
							</div>
						</div>
					</div>
				</div>
			);
			result.push(combineItem);
		}
		return result;
	};

	return (
		<>
			<div className="col-12">
				<div className="home-title">
					<i className="icon-soccer" />
					{t("lbl_Fabulous_Sports_Experience")}
				</div>
			</div>
			<div className="col-4">
				<div className="home-match">
					<Swiper {...hotEventSwiperParams}>
						{combinePairs(hotEventList)}
					</Swiper>
				</div>
			</div>
			<div className="col-8">
				<div className="home-sports">
					<Swiper {...sportsSwiperParams}>
						{SPORT_LIST[userInfo.langId].map(sportItem => {
							const {
								tpId,
								tpGameType,
								tpGameIdNo,
								displayText,
								img
							} = sportItem || {};

							const { iconType, iconStartTime, iconEndTime } =
								sportItem?.icon || {};

							// * 靜態遊戲 所以串 isMaintain
							const isInMaintain = maintainList?.some(
								m =>
									m.tpId === tpId &&
									(m.tpGameType === tpGameType ||
										m.tpGameType === defTpGameType.All)
							);

							const icon =
								(isShowEventIcon(iconStartTime, iconEndTime) &&
									switchHotMatchIcon(iconType)) ||
								null;

							return (
								<button
									key={`sports-${tpGameIdNo}`}
									onClick={() => {
										handleClickHomeProduct({
											...sportItem,
											isInMaintain
										});
									}}>
									<div
										className={classNames({
											maintain: isInMaintain
										})}>
										<div className={icon} />
										<img
											key={`sport-${displayText}`}
											src={img}
											alt={displayText}
										/>

										{isInMaintain && (
											<div className="tag-maintain">
												{t("lbl_underMaintenance")}
											</div>
										)}
									</div>
								</button>
							);
						})}
					</Swiper>
				</div>
			</div>
		</>
	);
};
HomeMatch.defaultProps = {
	hotEventList: [],
	maintainList: []
};

HomeMatch.propTypes = {
	hotEventList: PropTypes.arrayOf(PropTypes.any),
	maintainList: PropTypes.arrayOf(PropTypes.any),
	handleClickHomeProduct: PropTypes.func.isRequired
};

export default HomeMatch;
