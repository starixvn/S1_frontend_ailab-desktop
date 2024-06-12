import React, { useState, useRef, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import {
	products,
	defTpGameType,
	defLoginGameType
} from "@ailab-desktop/common";
import Nav from "./casino.nav";
import SearchBox from "./casino.searchBox";
import GameList from "./casino.gamelist";
import { defBannerType } from "../../service/api/site";
import { api_account_SetFavoriteGame } from "../../service/api/account";
import {
	popBoxContext,
	userInfoContext,
	maintainListContext,
	loadingContext
} from "../common/context";
import defPopBoxType from "../common/defPopBoxType";
import { defRowsPerPage, defSearchColumn } from "./casino.def";
import TopQuickLink from "./casino.topQuickLink";
import CasinoJackpot from "./casino.jackpot";
import { BannerSwipper } from "../common/customSwipper";
import { api_game_GetSlotGamePage } from "../../service/api/game";
import { SET_CASINO_ENTER_PAGE } from "../../service/enterPage";
import { useGotoGame } from "../hook/useGotoGame";
import useDelayFunc from "../hook/useDelayFunc";
import { getUrlParameter, langAndCurrMapping } from "../common/common";

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
	const [initialSlide, setInitialSlide] = useState(9);
	const [favoriteStr, setFavoriteStr] = useState(
		localStorage.getItem("favorite")
	);
	const isMountedRef = useRef(null);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const { allMaintainList } = useContext(maintainListContext);
	const [isProcessing, setIsProcessing] = useState(false);
	const { loading, setLoading } = useContext(loadingContext);
	const { handleGoToGame } = useGotoGame({ autoGetData: false });
	const { throttle } = useDelayFunc();
	const urlTpId = getUrlParameter("tpId");
	const urlProvider = getUrlParameter("provider");
	const urlProviderTpId = urlProvider ? Number(urlProvider) : undefined;
	const urlJackpotPage = getUrlParameter("page");

	const slidesPerViewNum = 9;
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (urlProviderTpId || urlTpId) {
			const activeTpId = urlProviderTpId ?? urlTpId;
			const targetProvider = providerList.find(
				provider => provider.tpId === activeTpId
			);

			if (targetProvider) {
				setActiveProvider(
					targetProvider.tpId === activeProvider.tpId
						? {}
						: targetProvider
				);
			}
		}
	}, [urlProviderTpId, urlTpId]);

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
		} else {
			setCategoryList(allCategoryList);
		}
	}, [activeProvider, allCategoryList]);

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

	useEffect(() => {
		if (activeProvider.index !== undefined) {
			const newInitialSlide =
				Object.keys(activeProvider).length === 0
					? slidesPerViewNum
					: activeProvider.index - 2;
			setInitialSlide(newInitialSlide);
		}
	}, [activeProvider]);

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
											onClick={clickClose}
										>
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
										onClick={clickClose}
									>
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
			currencyId: langAndCurrMapping[userInfo.langId]
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
									const index = tempPList.findIndex(
										providerObj =>
											providerObj.tpId ===
											Number(activeTpId)
									);
									Object.assign(_activeProvider, {
										index
									});
									setActiveProvider(_activeProvider);
								}
								setProviderList(tempPList || []);
							} else {
								setProviderList(tempPList || []);
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
					tempItemList = tempItemList.filter(
						item =>
							(item[1].length > 0 &&
								(activeProvider.tpId
									? item[1].filter(
											i => i.tpId === activeProvider?.tpId
									  ).length > 0
									: true)) ||
							item[0] === "myFavorite"
					);
					const resultList = [];
					tempItemList.forEach(item =>
						resultList.push({ [item[0]]: item[1] })
					);
					setCategoryList(resultList);
					if (urlJackpotPage && urlJackpotPage === "jackpot") {
						setActiveCategory("jackpot");
						navigate(window.location.pathname, { replace: true });
					} else {
						setActiveCategory(
							activeCategory ?? Object.keys(resultList[1])[0]
						);
					}

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
									onClick={clickClose}
								>
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
									onClick={clickClose}
								>
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
		if (userInfo.isLogin) {
			throttle(
				() =>
					SET_CASINO_ENTER_PAGE({
						tpId,
						gameId,
						isFree,
						langId: userInfo.langId,
						execFunction:
							tpId === products.PGSoft.tpId
								? handleGoToGame.bind(this, {
										langId: userInfo.langId,
										tpId,
										gameId,
										isFun: isFree,
										tpGameType,
										loginGameType:
											defLoginGameType.returnHtml
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
		Object.values(providerList)?.find(obj => obj.tpId === g.tpId) ?? {};
	const getIsInMaintain = g =>
		allMaintainList?.some(
			item =>
				item.tpId === g.tpId &&
				(item.tpGameType ===
					Object.values(providerList)?.find(
						obj => obj.tpId === g.tpId
					)?.tpGameType ||
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
					tpGameType: getTpGameType(target).tpGameType
				});
		} else {
			!isProcessing && setActiveCategory(category);
		}
	};
	const handleProviderChange = provider => {
		if (!isProcessing) {
			setActiveProvider(provider);
		}
	};

	return loading ? null : (
		<>
			<div className="lobby-top-banner">
				<BannerSwipper
					ImgFolder={[defBannerType.Slots]}
					withBtn={true}
					withPagination={true}
				/>
			</div>

			<CasinoJackpot t={t} userInfo={userInfo} />

			<section className="inside">
				<div className="rightModule">
					<div className="infoModule">
						<TopQuickLink
							lobbyImgList={providerList}
							activeProvider={activeProvider}
							onChange={handleProviderChange}
							langId={userInfo.langId}
							initialSlide={initialSlide}
							slidesPerViewNum={slidesPerViewNum}
						/>
						<div className="casinoSelect modifier">
							<Nav
								categoryList={categoryList}
								activeCategory={activeCategory}
								onChange={handleCategoryChange}
								t={t}
								isProcessing={isProcessing}
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
