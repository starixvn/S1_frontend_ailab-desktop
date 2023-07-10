import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { navigate } from "gatsby";
import { useTranslation } from "react-i18next";
import { api_game_GetRecentlyViewed } from "../../service/api/game";
import { popBoxContext, userInfoContext } from "../common/context";
import usePopBox from "../hook/usePopBox";
import { defMenuLinks, defMenuType } from "../header/header.menu.def";
import { defSpecialSetting, useGotoGame } from "../hook/useGotoGame";
import {
	Open9WSports,
	SET_CASINO_ENTER_PAGE,
	SET_ENTER_PAGE
} from "../../service/enterPage";
import defPopBoxType from "../common/defPopBoxType";
import { defCategory } from "../../datas/productList";
import useDelayFunc from "../hook/useDelayFunc";

const RecentlyViewedGameList = () => {
	const [recentlyViewedGames, setRecentlyViewedGames] = useState([]);
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox } = usePopBox();
	const { t } = useTranslation();
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
			path,
			needLogin,
			menuType,
			tpGameType,
			betType
		}) => {
			if (tpId === defSpecialSetting.sports_9w) {
				const result = await handleGoToGame({
					isLogin: userInfo.isLogin,
					langId: userInfo.langId,
					tpId,
					gameId,
					tpGameType
				});

				if (userInfo.isLogin) {
					const { url, key, userId } = result ?? {};
					Open9WSports({ url, key, userId });
				}
			} else {
				if (!tpId && !gameId && path) {
					return needLogin && !userInfo.isLogin
						? () =>
								setPopBox({
									isOpen: true,
									popBoxType: defPopBoxType.Login
								})
						: navigate(`/${userInfo.langId}/${path}`);
				}

				if (menuType === defMenuType.useGoToGame) {
					handleGoToGame({
						isLogin: userInfo.isLogin,
						langId: userInfo.langId,
						tpId,
						gameId,
						tpGameType
					});
				} else {
					return SET_ENTER_PAGE({
						isLogin: userInfo.isLogin,
						langId: userInfo.langId,
						tpId,
						gameId,
						loginCallback: () =>
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.Login
							}),
						tpGameType,
						betType
					});
				}
			}
			return true;
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
								selectedTpId === defSpecialSetting.playTech
									? handleGoToGame.bind(this, {
											langId: userInfo.langId,
											tpId: selectedTpId,
											gameId: selectedGameId,
											isFun: false,
											tpGameType: selectedTpGameType
									  })
									: null,
							tpGameType: selectedTpGameType
						}),
					5000
				);
			} else {
				navigate(`/${userInfo.langId}/${pathLink}${_urlParams}`);
			}
		} else if (targetItem.menuType === defMenuType.DirectUrl) {
			window.open(pathLink, "_blank");
		} else if (targetItem.menuType === defMenuType.LinkNoImg) {
			navigate(`/${userInfo.langId}/${pathLink}`);
		} else {
			handleOpenGame({
				tpId: targetItem.tpId,
				gameId: gameItems.productInfo?.gameId,
				path: gameItems.path,
				needLogin: false,
				menuType: targetItem.menuType,
				tpGameType: targetItem.tpGameType,
				betType: targetItem.betType
			});
		}
	};

	useEffect(() => {
		const getRecentlyViewedGames = async () => {
			try {
				const res = await api_game_GetRecentlyViewed({
					currencyId: userInfo.currencyId
				});
				if (res.data.errorCode === 0) {
					const { recentlyViewedList } = res.data.data;
					setRecentlyViewedGames(recentlyViewedList);
				}
			} catch (error) {
				errorPopBox(error);
			}
		};
		getRecentlyViewedGames();
	}, []);

	const params = {
		spaceBetween: 22,
		slidesPerView: 5.8
	};

	if (!recentlyViewedGames || recentlyViewedGames.length === 0) {
		return null;
	}
	return (
		<>
			<div className="moduleTitle ">{t("lbl_Recently_Viewed")}</div>
			<Swiper
				className="recently"
				modules={[Navigation]}
				navigation
				{...params}
			>
				<div className="swiper-wrapper">
					{recentlyViewedGames &&
						recentlyViewedGames.map(
							({
								gameLogo,
								tpLogo,
								gameName,
								tpId,
								tpGameType,
								isMaintain,
								categoryId,
								gameId
							}) => (
								<SwiperSlide
									key={`recently-game-${tpId}-${tpGameType}`}
								>
									<div
										className="swiper-slide"
										onClick={() =>
											handleGoToRecentlyViewedGame({
												selectedTpId: tpId,
												selectedTpGameType: tpGameType,
												selectedCategoryId: categoryId,
												selectedGameId: gameId,
												isMaintain
											})
										}
									>
										<div
											className={`recently-game ${
												isMaintain ? "active" : ""
											}`}
										>
											<div>
												<img
													className="recently-image"
													src={
														gameLogo[
															userInfo.langId
														] ?? gameLogo.en
													}
													alt=""
												/>
												<img
													className="recently-brand"
													src={tpLogo}
													alt=""
												/>
												<div className="recently-title">
													{gameName[
														userInfo.langId
													] ?? gameName.en}
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
							)
						)}
				</div>
			</Swiper>
		</>
	);
};

export default RecentlyViewedGameList;
