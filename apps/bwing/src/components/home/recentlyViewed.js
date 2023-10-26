import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import Swiper from "react-id-swiper";
import { defCategory } from "../../datas/productList";
import { popBoxContext, userInfoContext } from "../common/context";
import { SET_CASINO_ENTER_PAGE, SET_ENTER_PAGE } from "../../service/enterPage";
import useDelayFunc from "../hook/useDelayFunc";
import {
	defSpecialSetting,
	useGotoGame,
	defLoginGameType
} from "../hook/useGotoGame";
import { defMenuLinks, defMenuType } from "../layout/header.menu.def";
import { defPopBoxType } from "../common/defPopBoxType";

const RecentlyViewed = ({ recentlyViewedGames }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { throttle } = useDelayFunc();
	const { handleGoToGame } = useGotoGame({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId,
		autoGetData: false
	});

	const handleGoToRecentlyViewedGame = ({
		selectedTpId,
		selectedTpGameType,
		selectedCategoryId,
		selectedGameId,
		isMaintain
	}) => {
		let targetItem;
		const gameItems = Object.values(defMenuLinks).find(itemList => {
			const res = itemList.subMenu?.find(
				({ tpId, tpGameType }) =>
					tpId === selectedTpId && tpGameType === selectedTpGameType
			);
			if (res !== undefined) {
				targetItem = res;
				return true;
			}
			return false;
		});

		let params = null;
		if (targetItem.parameter) {
			params = Object.keys(targetItem.parameter).map(
				keys => `${keys}=${targetItem.parameter[keys]}`
			);
		}
		const _urlParams = params !== null ? `?${params.join("&")}` : "";
		const pathLink = targetItem.path || gameItems.path;

		const handleOpenGame = async ({
			tpId,
			gameId,
			menuType,
			_subPath,
			tpGameType,
			afterLogin
		}) => {
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
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.Login
					});
				} else {
					navigate(`/${userInfo.langId}/${_subPath}`);
				}
			} else {
				SET_ENTER_PAGE({
					isLogin: userInfo.isLogin,
					langId: userInfo.langId,
					tpId,
					gameId,
					loginCallback: () =>
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.Login
						}),
					tpGameType
				});
			}
		};

		if (targetItem.menuType === defMenuType.Link) {
			if (selectedCategoryId === defCategory.Slots) {
				if (isMaintain) {
					return;
				}
				throttle(
					() =>
						SET_CASINO_ENTER_PAGE({
							tpId: selectedTpId,
							gameId: selectedGameId,
							isFree: false,
							langId: userInfo.langId,
							execFunction:
								selectedTpId === defSpecialSetting.PG
									? handleGoToGame.bind(this, {
											langId: userInfo.langId,
											tpId: selectedTpId,
											gameId: selectedGameId,
											isFun: false,
											tpGameType: selectedTpGameType,
											loginGameType:
												defLoginGameType.returnHtml
									  })
									: null,
							tpGameType: selectedTpGameType
						}),
					5000
				);
			} else {
				navigate(`/${userInfo.langId}/${pathLink}${_urlParams}`);
			}
		} else {
			handleOpenGame({
				tpId: targetItem.tpId,
				gameId: gameItems.productInfo?.gameId,
				menuType: targetItem.menuType,
				_subPath: gameItems.path,
				tpGameType: targetItem.tpGameType,
				afterLogin: false
			});
		}
	};

	if (!recentlyViewedGames || !recentlyViewedGames.length) return null;

	const swiperParams = {
		slidesPerView: 5.2,
		spaceBetween: 30
	};

	return (
		<div className="col-12">
			<div className="home-title">
				<i className="icon-star-outline" />
				{t("lbl_Recently_Viewed")}
			</div>
			<div className="home-recently mb-6">
				<Swiper {...swiperParams}>
					{recentlyViewedGames.map(
						({
							gameLogo,
							gameName,
							tpId,
							tpGameType,
							categoryId,
							gameId,
							isMaintain
						}) => (
							<div key={`${tpId}_${tpGameType}_${gameId}`}>
								<a
									className={`home-recently-item ${
										isMaintain ? "maintain" : ""
									}`}
									onClick={() =>
										handleGoToRecentlyViewedGame({
											selectedTpId: tpId,
											selectedTpGameType: tpGameType,
											selectedCategoryId: categoryId,
											selectedGameId: gameId,
											isMaintain
										})
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
						)
					)}
				</Swiper>
			</div>
		</div>
	);
};
RecentlyViewed.defaultProps = {
	recentlyViewedGames: []
};

RecentlyViewed.propTypes = {
	recentlyViewedGames: PropTypes.arrayOf(PropTypes.any)
};

export default RecentlyViewed;
