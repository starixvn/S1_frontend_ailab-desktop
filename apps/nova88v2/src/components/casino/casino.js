import React, { useState, useRef, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import Nav from "./casino.nav";
import SearchBox from "./casino.searchBox";
import GameList from "./casino.gamelist";
import {
	api_site_GetGameListByDevice,
	defBannerType
} from "../../service/api/site";
import {
	api_account_SetFavoriteGame,
	api_account_GetFavoriteGame
} from "../../service/api/account";
import {
	popBoxContext,
	userInfoContext,
	maintainListContext,
	loadingContext
} from "../common/context";
import defPopBoxType from "../common/defPopBoxType";
import {
	defNav,
	defRowsPerPage,
	defSearchColumn,
	defCategory,
	defCategoryList,
	defLobbyImgList
} from "./casino.def";
import { getUrlParameter, getCurrencyCode } from "../common/common";
import SwipperBanner from "../common/swipperBanner";
import TopQuickLink from "./casino.topQuickLink";
import CasinoJackpot from "./casino.jackpot";

const matchKeyword = (name, _keyword) => {
	const keyword = _keyword.toLowerCase();
	return (
		Object.keys(name)?.filter(key => {
			return name[key].toLowerCase().indexOf(keyword) !== -1;
		}).length > 0
	);
};

export default () => {
	const { t } = useTranslation();
	const urlTpId = getUrlParameter("tpId");
	const urlTab = getUrlParameter("tab");

	const isSomeTab = Object.values(defNav).some(item => item.key === urlTab);

	const [selNav, setSelNav] = useState(
		isSomeTab ? urlTab : defNav.FEATURED.key
	);

	const [favorite, setFavorite] = useState([]);
	const [imgUrl, setImgUrl] = useState("");
	const [tpList, setTpList] = useState({});
	const [gameDatas, setGameDatas] = useState([]);
	const [tpOptions, setTpOptions] = useState([]);
	const [lobbyImgList, setLobbyImgList] = useState(defLobbyImgList);
	const [displayGames, setDisplayGames] = useState([]);
	const [pageInfo, setPageInfo] = useState({ currentPage: 1, totalPages: 1 });

	const [searchInfo, setSearchInfo] = useState({
		[defSearchColumn.searchText]: "",
		[defSearchColumn.provider]: { idx: 0, value: null }
	});

	const [category, setCategory] = useState({
		category: { idx: 0, value: null }
	});

	const isMountedRef = useRef(null);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const { allMaintainList } = useContext(maintainListContext);

	const { loading, setLoading } = useContext(loadingContext);

	const _currencyId = userInfo.currencyId
		? userInfo.currencyId
		: getCurrencyCode(userInfo.langId);

	const loadMore = () => {
		if (gameDatas && pageInfo.totalPages > pageInfo.currentPage) {
			setPageInfo(prev => ({
				...prev,
				currentPage: prev.currentPage + 1
			}));
		}
	};

	const clickClose = () => {
		setPopBox({ isOpen: false });
	};

	const onSelectNav = navKey => {
		if (navKey !== selNav) {
			window.history.replaceState(
				{},
				"",
				`${window.location.pathname}?tab=${navKey}`
			);

			setSelNav(navKey);
			SetGames({
				_searchInfo: searchInfo,
				_category: category,
				_selNav: navKey,
				_gameDatas: gameDatas,
				_tpList: tpList
			});
		}
	};

	const FilterGames = (
		_searchInfo,
		_category,
		_nav,
		initGameDatas,
		initTpList,
		_favorite
	) => {
		const _gameDatas = initGameDatas ?? gameDatas;
		const _tpList = initTpList ?? tpList;
		const tpId = _searchInfo.provider.value;
		const { searchText } = _searchInfo;
		const _categoryId = _category.category.idx;
		const doNotFilterCategory = _categoryId === 0;

		const matchFilter = (_tpId, g, categoryId, notFilterCategory) => {
			const matchNav =
				(_nav === defNav.PROMO.key && g.promotion === 1) ||
				(_nav === defNav.FEATURED.key && g.featured === true) ||
				(_nav === defNav.NEW.key && g.new) ||
				(_nav === defNav.FAVOURITE.key &&
					_favorite.includes(`${_tpId}_${g.gameId}`)) ||
				_nav === defNav.ALLGAMES.key;
			return (
				matchNav &&
				(searchText === "" || matchKeyword(g.name, searchText)) &&
				(doNotFilterCategory ||
					g.category1 === defCategoryList[categoryId])
			);
		};

		return _gameDatas?.filter(g => {
			const tp = _tpList[g.tpId];
			return (
				(tpId === null || tp.value === tpId) &&
				matchFilter(tp.value, g, _categoryId, doNotFilterCategory)
			);
		});
	};

	const SetGames = ({
		_searchInfo,
		_category,
		_selNav,
		_gameDatas,
		_tpList,
		_favorite = favorite
	}) => {
		const _displayGames = FilterGames(
			_searchInfo,
			_category,
			_selNav,
			_gameDatas,
			_tpList,
			_favorite
		);

		const _totalPages =
			_displayGames.length === 0
				? 1
				: Math.ceil(_displayGames.length / defRowsPerPage);

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
		const isRemove = favorite?.includes(key);
		const newFav = isRemove
			? favorite?.filter(f => f !== key)
			: [...favorite, key];
		setFavorite(newFav);
		SetGames({
			_searchInfo: searchInfo,
			_category: category,
			_selNav: selNav,
			_gameDatas: gameDatas,
			_tpList: tpList,
			_favorite: newFav
		});
		if (userInfo.isLogin) {
			api_account_SetFavoriteGame(tpId, gameId, isRemove).then(
				res => {
					if (isMountedRef.current) {
						const { errorCode, message } = res.data;
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

	const EditSearchField = (column, value) => {
		let _searchInfo = searchInfo;
		let _result = {
			[defSearchColumn.searchText]: "",
			[defSearchColumn.provider]: { idx: 0, value: null }
		};
		if (column === defSearchColumn.searchText) {
			_result = {
				[defSearchColumn.searchText]: value,
				[defSearchColumn.provider]:
					_searchInfo[defSearchColumn.provider]
			};
			setSearchInfo(prevS => {
				_searchInfo = { ...prevS, [column]: value };
				return _searchInfo;
			});
		} else {
			_result = {
				[defSearchColumn.searchText]:
					_searchInfo[defSearchColumn.searchText],
				[defSearchColumn.provider]: {
					idx: value,
					value: tpOptions[value].id
				}
			};
			setSearchInfo(prevS => {
				_searchInfo = {
					...prevS,
					[column]: { idx: value, value: tpOptions[value].id }
				};
				return _searchInfo;
			});
		}
		SetGames({
			_searchInfo: _result,
			_category: category,
			_selNav: selNav,
			_gameDatas: gameDatas,
			_tpList: tpList
		});
	};

	const clickLobbyProvider = _providerId => {
		const _optionsIdx = tpOptions.findIndex(
			_options => _options.id === _providerId
		);

		const _result = {
			...searchInfo,
			[defSearchColumn.provider]:
				searchInfo[defSearchColumn.provider].value === _providerId
					? { idx: 0, value: null }
					: {
							idx: _optionsIdx,
							value: _providerId
					  }
		};

		setSearchInfo(_result);
		SetGames({
			_searchInfo: _result,
			_category: category,
			_selNav: selNav,
			_gameDatas: gameDatas,
			_tpList: tpList
		});
	};

	const onChangeCategory = (column, value) => {
		let _category = category;
		setCategory(prevS => {
			_category = {
				...prevS,
				[column]: {
					idx: value,
					value: defCategory[value].id
				}
			};
			return _category;
		});

		SetGames({
			_searchInfo: searchInfo,
			_category,
			_selNav: selNav,
			_gameDatas: gameDatas,
			_tpList: tpList
		});
	};

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		setLoading(true);
		api_site_GetGameListByDevice().then(
			res => {
				const success = res.data.errorCode === 0;

				if (success) {
					const { imgUrl: _imgUrl, providerList } = res.data.data;
					const _tpList = {};
					const _tpOptions = [
						{ displayKey: "lbl_AllProvider", id: null }
					];
					const games = [];

					setImgUrl(_imgUrl);

					providerList?.forEach(gameInfo => {
						_tpList[gameInfo.value] = { ...gameInfo };
						_tpOptions.push({
							displayText: gameInfo.displayText,
							id: gameInfo.value
						});

						if (gameInfo?.gameList?.data) {
							gameInfo.gameList.data.forEach(list => {
								games.push({
									tpId: gameInfo.value,
									tpName: gameInfo.name,
									...list
								});
							});
						}
					});

					const providerIdList = providerList?.map(
						item => item.value
					);

					const filterLobbyImgList = defLobbyImgList.filter(
						_img =>
							providerIdList.includes(_img.providerId) &&
							(_img.allowCurrencies
								? _img.allowCurrencies.includes(_currencyId)
								: true)
					);

					setLobbyImgList(filterLobbyImgList);

					if (games.length) {
						for (let index = 0; index < games.length; index++) {
							const idx = Math.floor(
								Math.random() * games.length
							);
							const tempEle1 = games[index];
							const tempEle2 = games[idx];

							games[index] = tempEle2;
							games[idx] = tempEle1;
						}
					}

					if (isMountedRef.current) {
						setTpList(_tpList);
						setGameDatas(games);
						setTpOptions(_tpOptions);

						let _searchInfo = searchInfo;
						const _category = category;

						if (urlTpId) {
							const idx = _tpOptions.findIndex(
								x => x.id === Number(urlTpId)
							);

							if (idx !== -1) {
								setSearchInfo(prevS => {
									_searchInfo = {
										...prevS,
										provider: {
											idx,
											value: _tpOptions[idx].id
										}
									};
									return _searchInfo;
								});
							}
						}

						SetGames({
							_searchInfo,
							_category,
							_selNav: selNav,
							_gameDatas: games,
							_tpList
						});
					}

					if (userInfo.isLogin) {
						api_account_GetFavoriteGame().then(resFav => {
							if (
								resFav.data.errorCode === 0 &&
								resFav.data.data
							) {
								const fav = resFav.data.data.map(f => {
									return `${f.providerId}_${f.gameId}`;
								});
								if (isMountedRef.current) {
									setFavorite(fav);
								}
							} else if (resFav.data.errorCode !== 0) {
								setPopBox({
									isOpen: true,
									popBoxType: defPopBoxType.ErrorMsg,
									message: `[${resFav.data.errorCode}] ${resFav.data.message}`,
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
						});
					}
					setLoading(false);
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
					setLoading(false);
				}
			}
		);
	}, [userInfo.isLogin, urlTpId]);

	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);

		if (!isSomeTab) {
			searchParams.set("tab", defNav.FEATURED.key);

			window.history.replaceState(
				{},
				"",
				`${window.location.pathname}?${searchParams.toString()}`
			);
		}
	}, [isSomeTab]);

	return loading ? (
		<></>
	) : (
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
							lobbyImgList={lobbyImgList}
							clickLobbyProvider={clickLobbyProvider}
							activeProviderId={searchInfo.provider?.value}
							langId={userInfo.langId}
						/>
						<div className="casinoSelect">
							<Nav
								selNav={selNav}
								onSelectNav={onSelectNav}
								t={t}
							/>
							<SearchBox
								t={t}
								tpOptions={tpOptions}
								onChangeCategory={onChangeCategory}
								searchInfo={searchInfo}
								categoryOptions={defCategory}
								category={category}
								EditSearchField={EditSearchField}
							/>
						</div>
						<GameList
							t={t}
							imgUrl={imgUrl}
							displayGames={displayGames}
							tpList={tpList}
							langId={userInfo.langId}
							isLogin={userInfo.isLogin}
							currentPage={pageInfo.currentPage}
							favorite={favorite}
							onSetFavorite={onSetFavorite}
							onLoadMore={loadMore}
							maintainList={allMaintainList}
						/>
					</div>
				</div>
			</section>
		</>
	);
};
