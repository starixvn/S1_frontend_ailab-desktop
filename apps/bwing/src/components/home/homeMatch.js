import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import Swiper from "react-id-swiper";
import PropTypes from "prop-types";
import moment from "moment";
import { navigate } from "gatsby";
import { popBoxContext, userInfoContext } from "../common/context";
import { defPopBoxType } from "../common/defPopBoxType";
import { SPORT_LIST } from "./def";
import productList, { defTpGameType } from "../../datas/productList";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import { defMenuType } from "../layout/header.menu.def";
import { bannerImgUrl } from "../../config";
import { useGotoGame } from "../hook/useGotoGame";
import { SetPathParameter } from "../common/swipperBanner";
import path from "../../router";

const HomeMatch = ({ hotEventList, maintainList, classNameType }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { handleGoToGame } = useGotoGame({ autoGetData: false });

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

	const hdpSymbol = hdp => {
		if (hdp === 0) return hdp;
		return `${hdp < 0 ? "" : "+"} ${hdp}`;
	};

	const handleItemClick = ({
		tpId,
		gameId,
		menuType,
		_subPath,
		isMaintain,
		tpGameType,
		afterLogin
	}) => {
		const loginCallback = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};
		if (isMaintain) {
			return;
		}
		if (menuType === defMenuType.useGoToGame) {
			handleGoToGame({
				isLogin: userInfo.isLogin,
				langId: userInfo.langId,
				tpId,
				gameId,
				tpGameType
			});
		} else if (_subPath) {
			if (afterLogin && !userInfo.isLogin) {
				loginCallback();
			} else {
				navigate(`/${userInfo.langId}/${_subPath}`);
			}
		} else {
			SET_ENTER_PAGE({
				isLogin: userInfo.isLogin,
				langId: userInfo.langId,
				tpId,
				gameId,
				loginCallback,
				tpGameType
			});
		}
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
				<div>
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
								}
							>
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
								}
							>
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
						{SPORT_LIST.map(
							({
								displayText,
								img,
								tpId,
								gameId,
								tpGameType,
								parameter,
								eventIcons,
								subPath,
								menuType,
								afterLogin
							}) => {
								const isMaintain = maintainList?.some(
									m =>
										m.tpId === tpId &&
										(m.tpGameType === tpGameType ||
											m.tpGameType === defTpGameType.All)
								);

								let params = null;
								if (parameter) {
									params = Object.keys(parameter).map(
										_key => `${_key}=${parameter[_key]}`
									);
								}

								const _urlParams =
									params !== null
										? `?${params.join("&")}`
										: "";

								let _iconClassName = "";
								if (eventIcons) {
									let iconStrings = "";
									for (
										let i = 0;
										i < eventIcons.length;
										i++
									) {
										if (eventIcons[i] !== "") {
											iconStrings += `${eventIcons[i]}`;
										}
									}
									_iconClassName = `${iconStrings}`;
								}

								let showIcon = null;
								if (_iconClassName.length > 0) {
									if (_iconClassName === "tag-new") {
										showIcon = "tag-new";
									} else {
										showIcon = _iconClassName;
									}
								}

								let _subPath;
								if (subPath) {
									if (tpId === productList.sportSaba.tpId) {
										_subPath = `${subPath}?game=${parameter?.name}`;
									} else {
										_subPath = `${subPath}`;
									}
								}

								if (menuType === defMenuType.Link) {
									return (
										<a
											key={`sports-${tpId}-${tpGameType}-${gameId}`}
											className={`${showIcon ?? ""} ${
												isMaintain ? "maintain" : ""
											}`}
											href={`/${userInfo.langId}/${_urlParams}`}
										>
											<img
												src={`${bannerImgUrl}/desktop/img/4.0/dropdown/${img}`}
												alt=""
											/>

											<div className="title">
												{displayText}
											</div>
											{isMaintain ? (
												<div className="tag-maintain">
													{t("lbl_underMaintenance")}
												</div>
											) : null}
										</a>
									);
								}

								return (
									<a
										key={`sports-${tpId}-${tpGameType}-${gameId}`}
										onClick={() =>
											handleItemClick({
												tpId,
												gameId,
												menuType,
												_subPath,
												isMaintain,
												tpGameType,
												afterLogin
											})
										}
									>
										<div
											className={
												isMaintain ? "maintain" : ""
											}
										>
											<img
												key={`${tpId}_${gameId}`}
												src={img}
												alt=""
											/>
											{isMaintain && (
												<div className="tag-maintain">
													{t("lbl_underMaintenance")}
												</div>
											)}
										</div>
									</a>
								);
							}
						)}
					</Swiper>
				</div>
			</div>
		</>
	);
};
HomeMatch.defaultProps = {
	hotEventList: [],
	maintainList: [],
	classNameType: "home"
};

HomeMatch.propTypes = {
	hotEventList: PropTypes.arrayOf(PropTypes.any),
	maintainList: PropTypes.arrayOf(PropTypes.any),
	classNameType: PropTypes.string
};

export default HomeMatch;
