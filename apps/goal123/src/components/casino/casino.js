import React, { useState, useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Nav from "./casino.nav";
import {
	api_account_SetFavoriteGame,
	api_account_GetFavoriteGame
} from "../../service/api/account";
import {
	api_site_GetGameListByDevice,
	defBannerType
} from "../../service/api/site";
import { userInfoContext, maintainListContext } from "../common/context";
import {
	defNav,
	defRowsPerPage,
	defSearchColumn,
	defLobbyImgList
} from "./casino.def";
import GameList from "./casino.gamelist";
import { BannerSwipper } from "../common/customSwipper";
import { getUrlParameter } from "../common/common";
import SearchBox from "./casino.searchBox";
import Loading from "../common/loading";
import { defCasinoProviders } from "../../datas/productList";
import CasinoJackpot from "./casino.jackpot";
import CasinoTopQuickLink from "./casino.topQuickLink";
import usePopBox from "../hook/usePopBox";

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
	const { userInfo } = useContext(userInfoContext);
	const urlTab = getUrlParameter("tab");
	const { errorPopBox } = usePopBox();

	const isSomeTab = Object.values(defNav).some(item => item.key === urlTab);

	const [selNav, setSelNav] = useState(
		isSomeTab ? urlTab : defNav.ALLGAMES.key
	);

	const [favorite, setFavorite] = useState([]);
	const [imgUrl, setImgUrl] = useState("");
	const [tpList, setTpList] = useState({});
	const [tpOptions, setTpOptions] = useState([]);
	const [lobbyImgList, setLobbyImgList] = useState(defLobbyImgList);
	const [gameDatas, setGameDatas] = useState(null);
	const [pageInfo, setPageInfo] = useState({ currentPage: 1, totalPages: 1 });
	const [displayGames, setDisplayGames] = useState([]);
	const [searchInfo, setSearchInfo] = useState({
		[defSearchColumn.searchText]: "",
		[defSearchColumn.provider]: null
	});
	const isMountedRef = useRef(null);
	const provider = getUrlParameter("provider");
	const tpId = defCasinoProviders[provider]?.tpId;
	const [loading, setLoading] = useState(true);
	const { allMaintainList } = useContext(maintainListContext);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		setDisplayGames([]);
		api_site_GetGameListByDevice().then(
			res => {
				if (res.data.errorCode === 0) {
					const { providerList } = res.data.data;
					const imgUrlData = res.data.data.imgUrl;
					const _tpList = {};
					const _tpOptions = [
						{ displayKey: "lbl_AllProvider", id: null }
					];
					const games = [];

					setImgUrl(imgUrlData);

					let hasPromo = false;
					let hasFeature = false;

					providerList?.forEach(tp => {
						_tpList[tp.value] = { ...tp };
						_tpOptions.push({
							displayText: tp.displayText,
							id: tp.value
						});

						if (tp?.gameList?.data) {
							tp.gameList.data.forEach(g => {
								hasPromo =
									hasPromo === false
										? g.promotion === 1
										: hasPromo;
								hasFeature =
									hasFeature === false
										? g.featured === true
										: hasFeature;

								games.push({
									tpId: tp.value,
									tpName: tp.name,
									...g
								});
							});
						}
					});

					const providerIdList = providerList?.map(
						item => item.value
					);

					const filterLobbyImgList = defLobbyImgList.filter(item =>
						providerIdList.includes(item.providerId)
					);

					setLobbyImgList(filterLobbyImgList);

					if (games.length) {
						for (let i = 0; i < games.length; i++) {
							const idx = Math.floor(
								Math.random() * games.length
							);
							const tempEle1 = games[i];
							const tempEle2 = games[idx];

							games[i] = tempEle2;
							games[idx] = tempEle1;
						}
					}

					if (isMountedRef.current) {
						setTpList(_tpList);
						setGameDatas(games);
						setTpOptions(_tpOptions);

						let _searchInfo = searchInfo;

						if (tpId) {
							const idx = _tpOptions.findIndex(
								x => x.id === Number(tpId)
							);

							if (idx !== -1) {
								setSearchInfo(prevS => {
									_searchInfo = {
										...prevS,
										provider: _tpOptions[idx].id
									};
									return _searchInfo;
								});
							}
						}

						SetGames({
							_searchInfo,
							_selNav: selNav,
							_gameDatas: games,
							_tpList
						});
					}
				} else {
					errorPopBox(
						res.data.message || "error",
						res.data.errorCode
					);
				}
				setLoading(false);
			},
			() => {
				setLoading(false);
				errorPopBox();
			}
		);

		if (userInfo.isLogin) {
			api_account_GetFavoriteGame().then(
				res => {
					if (res.data.errorCode === 0 && res.data.data) {
						const fav = res.data.data.map(f => {
							return `${f.providerId}_${f.gameId}`;
						});
						if (isMountedRef.current) {
							setFavorite(fav);
						}
					} else if (res.data.errorCode !== 0) {
						errorPopBox(
							res.data.message || "error",
							res.data.errorCode
						);
					}
				},
				() => {
					if (isMountedRef.current) {
						errorPopBox();
					}
				}
			);
		}
	}, [userInfo.isLogin, tpId]);

	const loadMore = () => {
		if (gameDatas && pageInfo.totalPages > pageInfo.currentPage) {
			setPageInfo(prev => ({
				...prev,
				currentPage: prev.currentPage + 1
			}));
		}
	};

	const FilterGames = (
		_searchInfo,
		_nav,
		initGameDatas,
		initTpList,
		_favorite
	) => {
		const _gameDatas = initGameDatas ?? gameDatas;
		const _tpList = initTpList ?? tpList;
		const _tpId = _searchInfo.provider;
		const { searchText } = _searchInfo;

		const matchFilter = (tpIdVal, g) => {
			const matchNav =
				(_nav === defNav.PROMO.key && g.promotion === 1) ||
				(_nav === defNav.FEATURED.key && g.featured === true) ||
				(_nav === defNav.NEW.key && g.new) ||
				(_nav === defNav.FAVOURITE.key &&
					_favorite.includes(`${tpIdVal}_${g.gameId}`)) ||
				_nav === defNav.ALLGAMES.key;
			return (
				matchNav &&
				(searchText === "" || matchKeyword(g.name, searchText))
			);
		};

		return _gameDatas?.filter(g => {
			const tp = _tpList[g.tpId];
			return (
				(_tpId === null || tp.value === _tpId) &&
				matchFilter(tp.value, g)
			);
		});
	};

	const SetGames = ({
		_searchInfo,
		_selNav,
		_gameDatas,
		_tpList,
		_favorite = favorite
	}) => {
		const _displayGames = FilterGames(
			_searchInfo,
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
				_selNav: navKey,
				_gameDatas: gameDatas,
				_tpList: tpList
			});
		}
	};

	const onSetFavorite = (_tpId, gameId) => {
		const key = `${_tpId}_${gameId}`;
		const isRemove = favorite?.includes(key);
		const newFav = isRemove
			? favorite?.filter(f => f !== key)
			: [...favorite, key];

		setFavorite(newFav);
		SetGames({
			_searchInfo: searchInfo,
			_selNav: selNav,
			_gameDatas: gameDatas,
			_tpList: tpList,
			_favorite: newFav
		});
		if (userInfo.isLogin) {
			api_account_SetFavoriteGame(_tpId, gameId, isRemove).then(
				res => {
					if (isMountedRef.current) {
						const { errorCode, message } = res.data;
						if (errorCode !== 0) {
							errorPopBox(message || "error", errorCode);
						}
					}
				},
				() => {
					if (isMountedRef.current) {
						errorPopBox();
					}
				}
			);
		}
	};

	const EditSearchField = (column, value, providerId) => {
		if (column === defSearchColumn.searchText) {
			setSearchInfo(prevS => {
				const _searchInfo = { ...prevS, [column]: value };
				SetGames({
					_searchInfo,
					_selNav: selNav,
					_gameDatas: gameDatas,
					_tpList: tpList
				});

				return _searchInfo;
			});
		} else {
			setSearchInfo(prevS => {
				const _providerId =
					prevS.provider !== providerId ? providerId : null;

				const _searchInfo = {
					...prevS,
					[column]: _providerId
				};

				SetGames({
					_searchInfo,
					_selNav: selNav,
					_gameDatas: gameDatas,
					_tpList: tpList
				});
				return _searchInfo;
			});
		}
	};

	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search);

		if (!isSomeTab) {
			searchParams.set("tab", defNav.ALLGAMES.key);

			window.history.replaceState(
				{},
				"",
				`${window.location.pathname}?${searchParams.toString()}`
			);
		}
	}, [isSomeTab]);

	return loading ? (
		<Loading />
	) : (
		<>
			<BannerSwipper
				ImgFolder={[defBannerType.Slots]}
				withBtn={true}
				withPagination={true}
			/>

			<CasinoJackpot t={t} userInfo={userInfo} />

			<section className="inside">
				<div className="rightModule">
					<div className="infoModule">
						<CasinoTopQuickLink
							lobbyImgList={lobbyImgList}
							editSearchField={EditSearchField}
							activeProviderId={searchInfo.provider}
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
								EditSearchField={EditSearchField}
								searchInfo={searchInfo}
								activeProviderId={searchInfo.provider}
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
