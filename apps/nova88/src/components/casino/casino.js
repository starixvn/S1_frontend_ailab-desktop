import React, { useState, useRef, useEffect, useContext } from "react";
import Nav from "./casino.nav";
import SearchBox from "./casino.searchBox";
import GameList from "./casino.gamelist";
import { api_site_GetGamelist } from "../../service/api/site";
import {
	api_account_SetFavoriteGame,
	api_account_GetFavoriteGame
} from "../../service/api/account";
import {
	popBoxContext,
	userInfoContext,
	loadingContext
} from "../common/context";
import { defPopBoxType } from "../common/popBox";
import { useTranslation } from "react-i18next";
import {
	defNav,
	defRowsPerPage,
	defSearchColumn,
	defCategoryId,
	defCategoryList
} from "./casino.def";
import { getUrlParameter } from "../common/common";
import { Pagination } from "../common/pagination";
import SwipperBanner from "../common/swipperBanner";

const matchKeyword = (name, _keyword) => {
	let keyword = _keyword.toLowerCase();
	return (
		Object.keys(name)?.filter(key => {
			return name[key].toLowerCase().indexOf(keyword) !== -1;
		}).length > 0
	);
};

export default () => {
	const { t } = useTranslation();
	const [selNav, setSelNav] = useState(defNav.ALLGAMES.key);
	const [favorite, setFavorite] = useState([]);
	const [tpList, setTpList] = useState({});
	const [gameDatas, setGameDatas] = useState([]);
	const [tpOptions, setTpOptions] = useState([]);
	const [displayGames, setDisplayGames] = useState([]);
	const [pageInfo, setPageInfo] = useState({ currentPage: 1, totalPages: 1 });

	const [searchInfo, setSearchInfo] = useState({
		[defSearchColumn.searchText]: "",
		[defSearchColumn.provider]: { idx: 0, value: null }
	});

	const [categoryOptions, setCategoryOptions] = useState([]);
	const [category, setCategory] = useState({
		category: { idx: 0, value: null }
	});

	const isMountedRef = useRef(null);
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const { loading, setLoading } = useContext(loadingContext);
	const urlTpId = getUrlParameter("tpId");

	const clickClose = () => {
		setPopBox({ isOpen: false });
	};

	const clickPageNumber = page => {
		setPageInfo(prevS => ({
			...prevS,
			currentPage: page
		}));
	};

	const onSelectNav = navKey => {
		if (navKey !== selNav) {
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
		let _gameDatas = initGameDatas ?? gameDatas;
		let _tpList = initTpList ?? tpList;
		let tpId = _searchInfo.provider.value;
		let searchText = _searchInfo.searchText;

		let _categoryId = _category.category.idx;
		let doNotFilterCategory = _categoryId === 0;

		const matchFilter = (tpId, g, _categoryId, notFilterCategory) => {
			let matchNav =
				(_nav === defNav.PROMO.key && g.promotion === 1) ||
				(_nav === defNav.FEATURED.key && g.featured === true) ||
				(_nav === defNav.FAVOURITE.key &&
					_favorite.includes(`${tpId}_${g.gameId}`)) ||
				_nav === defNav.ALLGAMES.key;
			return (
				matchNav &&
				(searchText === "" || matchKeyword(g.name, searchText)) &&
				(doNotFilterCategory ||
					g.category1 === defCategoryList[_categoryId])
			);
		};

		return _gameDatas?.filter(g => {
			let tp = _tpList[g.tpId];
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
		let _displayGames = FilterGames(
			_searchInfo,
			_category,
			_selNav,
			_gameDatas,
			_tpList,
			_favorite
		);

		let _totalPages =
			_displayGames.length === 0
				? 1
				: Math.ceil(_displayGames.length / defRowsPerPage);

		let _currentPage =
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
		let key = `${tpId}_${gameId}`;
		let isRemove = favorite?.includes(key);
		let newFav = isRemove
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
			api_account_SetFavoriteGame(tpId, gameId, isRemove);
		}
	};

	const EditSearchField = (column, value, pressEnter) => {
		let _searchInfo = searchInfo;
		if (column === defSearchColumn.searchText) {
			setSearchInfo(prevS => {
				_searchInfo = { ...prevS, [column]: value };
				return _searchInfo;
			});
			if (pressEnter) {
				SubmitSearch(_searchInfo);
			}
		} else {
			setSearchInfo(prevS => {
				_searchInfo = {
					...prevS,
					[column]: { idx: value, value: tpOptions[value].id }
				};
				return _searchInfo;
			});

			SetGames({
				_searchInfo: _searchInfo,
				_category: category,
				_selNav: selNav,
				_gameDatas: gameDatas,
				_tpList: tpList
			});
		}
	};

	const onChangeCategory = (column, value) => {
		let _category = category;
		setCategory(prevS => {
			_category = {
				...prevS,
				[column]: {
					idx: value,
					value: categoryOptions[value].id
				}
			};
			return _category;
		});

		SetGames({
			_searchInfo: searchInfo,
			_category: _category,
			_selNav: selNav,
			_gameDatas: gameDatas,
			_tpList: tpList
		});
	};

	const SubmitSearch = _searchInfo => {
		SetGames({
			_searchInfo: searchInfo,
			_category: category,
			_selNav: selNav,
			_gameDatas: gameDatas,
			_tpList: tpList
		});
	};

	useEffect(() => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});

	useEffect(() => {
		setLoading(true);
		api_site_GetGamelist().then(
			res => {
				const success = res.data.errorCode === 0;
				const { data } = res.data;

				if (success) {
					let _tpList = {};
					let _tpOptions = [{ displayText: "All", id: null }];
					let _categoryOptions = [{ displayText: "All", id: 0 }];
					let games = [];

					data.forEach(gameInfo => {
						_tpList[gameInfo.value] = { ...gameInfo };
						_tpOptions.push({
							displayText: gameInfo.displayText,
							id: gameInfo.value
						});

						if (gameInfo?.gameList?.data) {
							gameInfo.gameList.data.forEach(list => {
								games.push({
									tpId: gameInfo.value,
									...list
								});

								_categoryOptions.push({
									displayText: list.category1,
									id: defCategoryId[list.category1]
								});

								let filterRepeaCategories = Array.from(
									new Set(
										_categoryOptions.map(JSON.stringify)
									)
								).map(JSON.parse);

								let pickCategoryItem = filterRepeaCategories.filter(
									item =>
										item.id === defCategoryId.All ||
										item.id === defCategoryId.Slots ||
										item.id === defCategoryId.Table
								);
								_categoryOptions = pickCategoryItem;
							});
						}
					});

					if (games.length) {
						for (let index = 0; index < games.length; index++) {
							let idx = Math.floor(Math.random() * games.length);
							let tempEle1 = games[index];
							let tempEle2 = games[idx];

							games[index] = tempEle2;
							games[idx] = tempEle1;
						}
					}

					if (isMountedRef.current) {
						setTpList(_tpList);
						setGameDatas(games);
						setTpOptions(_tpOptions);
						setCategoryOptions(_categoryOptions);

						let _searchInfo = searchInfo;
						let _category = category;

						if (urlTpId) {
							let idx = _tpOptions.findIndex(
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
						api_account_GetFavoriteGame().then(res => {
							if (res.data.errorCode === 0 && res.data.data) {
								let fav = res.data.data.map(f => {
									return `${f.providerId}_${f.gameId}`;
								});
								if (isMountedRef.current) {
									setFavorite(fav);
								}
							}
						});
					}
					setLoading(false);
				}
			},
			err => {
				if (isMountedRef.current) {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.ErrorMsg,
						message: t("msg_ApiServerError"),
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-cancel"
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

	return loading ? (
		<></>
	) : (
		<>
			<SwipperBanner
				ImgFolder="Casino"
				withBtn={false}
				openInBlank={true}
				className="swiper-casino"
			/>
			<section className="inside">
				<div className="rightModule">
					<div className="infoModule">
						<div className="inside-title icon icon-ow-casino">
							<span>{t("lbl_Casino")}</span>
						</div>
						<div className="casinoSelect">
							<Nav
								selNav={selNav}
								onSelectNav={onSelectNav}
								t={t}
							/>
							<SearchBox
								t={t}
								submitSearch={SubmitSearch.bind(
									this,
									searchInfo
								)}
								tpOptions={tpOptions}
								onChangeCategory={onChangeCategory}
								searchInfo={searchInfo}
								categoryOptions={categoryOptions}
								category={category}
								EditSearchField={EditSearchField}
							/>
						</div>
						<GameList
							t={t}
							displayGames={displayGames}
							tpList={tpList}
							langId={userInfo.langId}
							isLogin={userInfo.isLogin}
							currentPage={pageInfo.currentPage}
							favorite={favorite}
							onSetFavorite={onSetFavorite}
						/>
						)
						<Pagination
							totalPages={pageInfo.totalPages}
							currentPage={pageInfo.currentPage}
							clickPageNumber={clickPageNumber}
						/>
					</div>
				</div>
			</section>
		</>
	);
};
