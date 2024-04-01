import React, { useState, useRef, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import Nav from "./casino.nav";
import SearchBox from "./casino.searchBox";
import GameList from "./casino.gamelist";
import { defBannerType } from "../../service/api/site";
import { api_account_SetFavoriteGame } from "../../service/api/account";
import {
	popBoxContext,
	userInfoContext,
	maintainListContext,
	loadingContext,
	productTpGameTypeSettingListContext
} from "../common/context";
import defPopBoxType from "../common/defPopBoxType";
import { defRowsPerPage, defSearchColumn } from "./casino.def";
import SwipperBanner from "../common/swipperBanner";
import TopQuickLink from "./casino.topQuickLink";
import CasinoJackpot from "./casino.jackpot";
import { api_game_GetSlotGamePage } from "../../service/api/game";
import { SET_CASINO_ENTER_PAGE } from "../../service/enterPage";
import { defSpecialSetting, useGotoGame } from "../hook/useGotoGame";
import useDelayFunc from "../hook/useDelayFunc";
import {
	defCategory,
	defSlotTpGameType,
	defTpGameType
} from "../../datas/productList";
import { getUrlParameter } from "../common/common";

export default () => {
	const { t } = useTranslation();
	const [imgUrl, setImgUrl] = useState("");
	const [allGames, setAllGames] = useState([]);
	const [tpOptions] = useState([]);
	const [displayGames, setDisplayGames] = useState([]);
	const [pageInfo, setPageInfo] = useState({ currentPage: 1, totalPages: 1 });
	const [allCategoryList, setAllCategoryList] = useState([]);
	const [categoryList, setCategoryList] = useState([]);
	const [activeCategory, setActiveCategory] = useState(null);
	const [providerList, setProviderList] = useState([]);
	const [activeProvider, setActiveProvider] = useState({});
	const [searchInfo, setSearchInfo] = useState({
		[defSearchColumn.searchText]: "",
		[defSearchColumn.provider]: { idx: 0, value: null }
	});
	const [favoriteStr, setFavoriteStr] = useState(
		localStorage.getItem("favorite")
	);
	const isMountedRef = useRef(null);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const { allMaintainList } = useContext(maintainListContext);
	const { tpGameTypeSettingList } = useContext(
		productTpGameTypeSettingListContext
	);
	const [isProcessing, setIsProcessing] = useState(false);
	const { loading, setLoading } = useContext(loadingContext);
	const { handleGoToGame } = useGotoGame({ autoGetData: false });
	const { throttle } = useDelayFunc();
	const urlTpId = getUrlParameter("tpId");
	const urlProvider = getUrlParameter("provider");
	const urlProviderTpId = Object.values(defSlotTpGameType).find(
		el => el.name === urlProvider
	)?.tpId;

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (Object.keys(activeProvider).length > 0) {
			const filterList = allCategoryList.filter(
				obj =>
					Object.keys(obj)[0] === "myFavorite" ||
					Object.values(obj)[0].filter(
						i => i.tpId === activeProvider.tpId
					).length > 0
			);
			const miniItem = allCategoryList.find(
				obj => Object.keys(obj)[0] === "mini"
			);

			if (
				miniItem &&
				Object.values(miniItem)[0].some(
					({ tpId }) => tpId === activeProvider.tpId
				)
			) {
				filterList.splice(2, 0, miniItem);
				filterList.pop();
			}

			let totalData = [];
			filterList.forEach(item => {
				if (Object.keys(item)[0] === "all") {
					totalData = Object.values(item)[0].filter(
						i => i.tpId === activeProvider.tpId
					);
				}
			});

			if (totalData.length > 0) {
				setCategoryList(filterList);
				setActiveCategory("all");
			} else {
				setCategoryList([]);
				setActiveCategory(null);
			}
		} else if (
			Object.keys(activeProvider).length === 0 &&
			tpGameTypeSettingList &&
			tpGameTypeSettingList.length > 0
		) {
			const uniqueTpIds = Array.from(
				new Set(
					tpGameTypeSettingList.map(item => {
						if (item.categoryId === defCategory.Slots) {
							return item.tpId;
						}
					})
				)
			);
			const unLimitTpGameTypeList = allCategoryList.filter(
				categoryObj => {
					const found = Object.values(categoryObj)[0].find(
						({ tpId }) => !uniqueTpIds.includes(tpId)
					);
					return found !== undefined;
				}
			);
			setCategoryList(unLimitTpGameTypeList);
		} else {
			setCategoryList(allCategoryList);
		}
	}, [activeProvider]);

	useEffect(() => {
		setLoading(true);
		!isProcessing && getSlotData();
		if (!userInfo.isLogin) {
			localStorage.setItem("favorite", "");
			setFavoriteStr("");
		}
	}, [userInfo.isLogin]);

	useEffect(() => {
		onChangeCategory(activeCategory);
	}, [activeCategory, activeProvider]);

	useEffect(() => {
		if (
			!(
				Object.keys(activeProvider).length === 0 &&
				activeCategory === "all"
			)
		) {
			onChangeCategory(activeCategory);
		}
	}, [favoriteStr]);

	const loadMore = () => {
		if (allGames && pageInfo.totalPages > pageInfo.currentPage) {
			setPageInfo(prev => ({
				...prev,
				currentPage: prev.currentPage + 1
			}));
		}
	};

	const clickClose = () => {
		setPopBox({ isOpen: false });
	};

	const randomArray = array => array.sort(() => Math.random() - 0.5);

	const onChangeCategory = categoryName => {
		let _displayGames = categoryList.filter(
			item => Object.keys(item)[0] === categoryName
		);
		if (categoryName === "myFavorite") {
			const storageStr = favoriteStr ?? "";
			const storageList = storageStr.split("&") ?? [];
			_displayGames = allGames.filter(item =>
				storageList.includes(`${item.tpId}_${item.gameId}`)
			);
		} else if (
			categoryName === "all" &&
			Object.keys(activeProvider).length === 0
		) {
			_displayGames = randomArray(_displayGames[0]?.[activeCategory]);
		} else {
			_displayGames = _displayGames[0]?.[activeCategory];
		}
		const _totalPages =
			_displayGames?.length === 0
				? 1
				: Math.ceil(_displayGames?.length / defRowsPerPage);

		const _currentPage =
			pageInfo.currentPage > _totalPages
				? _totalPages
				: pageInfo.currentPage;

		if (
			tpGameTypeSettingList &&
			tpGameTypeSettingList.length > 0 &&
			_displayGames &&
			_displayGames.length > 0
		) {
			const uniqueTpIds = Array.from(
				new Set(
					tpGameTypeSettingList.map(item => {
						if (item.categoryId === defCategory.Slots) {
							return item.tpId;
						}
					})
				)
			);
			_displayGames = _displayGames.filter(
				({ tpId }) => !uniqueTpIds.includes(tpId)
			);
		}
		setDisplayGames(_displayGames);
		setPageInfo(prevS => ({
			...prevS,
			currentPage: _currentPage,
			totalPages: _totalPages
		}));
	};

	const onSetFavorite = (tpId, gameId) => {
		const key = `${tpId}_${gameId}`;
		const storageStr = favoriteStr ?? "";
		const storageList = storageStr.split("&") ?? [];

		const handleIsFavorite = () => storageList?.includes(key);
		const _isFavorite = handleIsFavorite();
		const isRemove = _isFavorite;
		const storageFavList = storageStr
			.split("&")
			.filter(str => !(str === ""));
		let filterList;
		if (_isFavorite) {
			filterList = storageFavList.filter(item => item !== key);
			localStorage.setItem("favorite", filterList.join("&"));
			setFavoriteStr(filterList.join("&"));
		} else {
			localStorage.setItem(
				"favorite",
				`${storageStr ?? ""}${
					storageStr === "" ? "" : "&"
				}${tpId}_${gameId}`
			);
			setFavoriteStr(
				`${storageStr ?? ""}${
					storageStr === "" ? "" : "&"
				}${tpId}_${gameId}`
			);
		}
		if (userInfo.isLogin) {
			setIsProcessing(true);
			api_account_SetFavoriteGame(tpId, gameId, isRemove).then(
				res => {
					if (isMountedRef.current) {
						const { errorCode, message } = res.data;
						setIsProcessing(false);
						if (errorCode !== 0) {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.ErrorMsg,
								message: `[${errorCode}] ${message}`,
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-check"
											onClick={clickClose}>
											{t("lbl_Close")}
										</button>
									</div>
								)
							});
						}
					}
				},
				() => {
					if (isMountedRef.current) {
						setIsProcessing(false);
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: t("msg_ApiServerError"),
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-check"
										onClick={clickClose}>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
					}
				}
			);
		}
	};

	const editSearchField = (column, value) => {
		if (column === defSearchColumn.searchText) {
			setSearchInfo(prevS => ({ ...prevS, [column]: value }));
		} else {
			setSearchInfo(prevS => ({
				...prevS,
				[column]: { idx: value, value: tpOptions[value].id }
			}));
		}
	};
	const getSlotData = async () => {
		setIsProcessing(true);
		api_game_GetSlotGamePage({
			currencyId: userInfo.currencyId
		}).then(
			res => {
				const success = res.data.errorCode === 0;
				if (success) {
					setLoading(false);
					const categoryObj = res.data.data;
					const excludeList = ["imgUrl", "providerList"];
					const tempList = [];
					Object.entries(categoryObj).forEach(item => {
						if (!excludeList.includes(item[0])) {
							(item[1].length || item[0] === "myFavorite") &&
								tempList.push([item[0], item[1]]);
							if (item[0] === "all") {
								setAllGames(item[1]);
							}
							if (item[0] === "myFavorite") {
								if (userInfo.isLogin) {
									if (localStorage.getItem("favorite")) {
										const storageStr =
											localStorage.getItem("favorite");
										const storageList =
											storageStr.split("&");
										const addList = [];
										item[1].forEach(obj => {
											!storageList.includes(
												`${obj.tpId}_${obj.gameId}`
											) &&
												addList.push(
													`${obj.tpId}_${obj.gameId}`
												);
										});

										const mergeList = [
											...storageList,
											...addList
										];
										localStorage.setItem(
											"favorite",
											mergeList.join("&")
										);
									} else {
										const addList = [];
										item[1].forEach(obj => {
											addList.push(
												`${obj.tpId}_${obj.gameId}`
											);
										});
										localStorage.setItem(
											"favorite",
											addList.join("&")
										);
									}
								}
							}
						} else if (item[0] === "providerList") {
							const tempPList = item[1];
							if (urlProviderTpId || urlTpId) {
								const activeTpId = urlProviderTpId ?? urlTpId;
								const _activeProvider = tempPList.find(
									obj => obj.tpId === Number(activeTpId)
								);
								if (_activeProvider) {
									const filterPList = tempPList.filter(
										obj => obj.tpId !== Number(activeTpId)
									);
									filterPList.splice(11, 0, _activeProvider);
									setProviderList(filterPList);
									const _tempList =
										filterPList.find(
											obj =>
												obj.tpId === Number(activeTpId)
										) ?? {};
									setActiveProvider(_tempList);
								} else {
									setProviderList(tempPList);
								}
							} else {
								setProviderList(tempPList);
							}
						} else if (item[0] === "imgUrl") {
							setImgUrl(item[1]);
						}
					});

					const randomItem = tempList.filter(
						item => item[0] === "random"
					)[0];
					let tempItemList = tempList.filter(
						item => item[0] !== "random"
					);
					tempItemList.unshift(randomItem);

					const _list = [];
					tempItemList.forEach(item =>
						_list.push({ [item[0]]: item[1] })
					);
					setAllCategoryList(_list);

					const activeTpId = urlProviderTpId ?? urlTpId;
					const _activeProvider = categoryObj.providerList.find(
						obj => obj.tpId === Number(activeTpId)
					);
					tempItemList = tempItemList.filter(
						item =>
							(item[1].length > 0 &&
								(_activeProvider?.tpId
									? item[1].filter(
											i =>
												i.tpId === _activeProvider?.tpId
									  ).length > 0
									: true)) ||
							item[0] === "myFavorite"
					);

					const miniItem = tempItemList.find(
						item => item[0] === "mini"
					);

					if (
						miniItem &&
						miniItem[1].some(
							el => el?.tpId === _activeProvider?.tpId
						)
					) {
						tempItemList.splice(2, 0, miniItem);
						tempItemList.pop();
					}

					const resultList = [];
					tempItemList.forEach(item =>
						resultList.push({ [item[0]]: item[1] })
					);
					setCategoryList(resultList);
					setActiveCategory(
						activeCategory ?? Object.keys(resultList[1])[0]
					);
					setIsProcessing(false);
				} else {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.ErrorMsg,
						message: `[${res.data.errorCode}] ${res.data.message}`,
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-check"
									onClick={clickClose}>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
				}
			},
			() => {
				if (isMountedRef.current) {
					setIsProcessing(false);
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.ErrorMsg,
						message: t("msg_ApiServerError"),
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-check"
									onClick={clickClose}>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
				}
			}
		);
	};

	const onClickPlay = ({
		tpId,
		gameId,
		isFree,
		delay,
		isInMaintain,
		tpGameType
	}) => {
		if (isInMaintain) {
			return;
		}

		const loginCallback = () =>
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		if (userInfo.isLogin ) {
			throttle(
				() =>
					SET_CASINO_ENTER_PAGE({
						tpId,
						gameId,
						isFree,
						langId: userInfo.langId,
						execFunction:
							tpId === defSpecialSetting.playTech
								? handleGoToGame.bind(this, {
										langId: userInfo.langId,
										tpId,
										gameId,
										isFun: isFree,
										tpGameType
								  })
								: null,
						tpGameType
					}),
				delay
			);
		} else loginCallback();
	};
	const startIdx = 0;
	const endIdx = pageInfo.currentPage * defRowsPerPage;
	const filterJudge = g => {
		if (activeProvider.tpId) {
			return (
				activeProvider.tpId === g.tpId &&
				Object.values(g.gameName).find(obj =>
					obj
						.toLowerCase()
						.includes(searchInfo.searchText.toLowerCase())
				)
			);
		}
		return Object.values(g.gameName).find(obj =>
			obj.toLowerCase().includes(searchInfo.searchText.toLowerCase())
		);
	};
	const getTpGameType = g =>
		Object.values(defSlotTpGameType).find(obj => obj.tpId === g.tpId) ?? {};
	const getIsInMaintain = g =>
		allMaintainList?.some(
			item =>
				item.tpId === g.tpId &&
				(item.tpGameType ===
					Object.values(defSlotTpGameType).find(
						obj => obj.tpId === g.tpId
					).tpGameType ||
					item.tpGameType === defTpGameType.All)
		);

	const handleCategoryChange = category => {
		if (category === "random") {
			const randomList = allGames?.filter(g => filterJudge(g));

			const index = Math.floor(Math.random() * randomList.length);
			const target = randomList[index];
			target &&
				onClickPlay({
					tpId: target.tpId,
					gameId: target.gameId,
					isFree: false,
					delay: 5000,
					isInMaintain: getIsInMaintain(target),
					tpGameType: getTpGameType(target)
				});
		} else {
			!isProcessing && setActiveCategory(category);
		}
	};
	const handleProviderChange = provider => {
		let noSelect = false;
		if (tpGameTypeSettingList && tpGameTypeSettingList.length > 0) {
			tpGameTypeSettingList.forEach(settingItem => {
				if (settingItem.tpId === provider.tpId && settingItem.noPlay) {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.Success,
						icon: "icon icon-bell",
						description: (
							<div style={{ color: "red" }}>
								{t("lbl_InaccessibleWithoutPermission")}
							</div>
						),
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-check"
									onClick={() => {
										setPopBox({ isOpen: false });
									}}>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
					noSelect = true;
				}
			});
		}
		if (!isProcessing && !noSelect) {
			setActiveProvider(provider);
		}
	};

	return loading ? null : (
		<>
			<SwipperBanner
				ImgFolder={[defBannerType.Slots]}
				openInBlank={true}
				className="swiper-casino"
			/>
			<section className="inside">
				<div className="rightModule">
					<CasinoJackpot t={t} userInfo={userInfo} />

					<div className="infoModule">
						<TopQuickLink
							lobbyImgList={providerList}
							activeProvider={activeProvider}
							onChange={handleProviderChange}
							langId={userInfo.langId}
						/>
						<div className="casinoSelect">
							<Nav
								categoryList={categoryList}
								activeCategory={activeCategory}
								onChange={handleCategoryChange}
								t={t}
								isProcessing={isProcessing}
								memberType={userInfo.memberType}
							/>
							<SearchBox
								t={t}
								searchInfo={searchInfo}
								editSearchField={editSearchField}
							/>
						</div>
						<GameList
							t={t}
							imgUrl={imgUrl}
							displayGames={displayGames}
							providerList={providerList}
							activeProvider={activeProvider}
							langId={userInfo.langId}
							currentPage={pageInfo.currentPage}
							onSetFavorite={isProcessing ? null : onSetFavorite}
							onLoadMore={loadMore}
							searchText={searchInfo.searchText}
							isProcessing={isProcessing}
							onClickPlay={onClickPlay}
							filterJudge={filterJudge}
							startIdx={startIdx}
							endIdx={endIdx}
							getIsInMaintain={getIsInMaintain}
							getTpGameType={getTpGameType}
							activeCategory={activeCategory}
							favoriteStr={favoriteStr ?? ""}
						/>
					</div>
				</div>
			</section>
		</>
	);
};
