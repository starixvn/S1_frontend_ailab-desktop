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
import { userInfoContext } from "../common/context";
import { defNav, defRowsPerPage, defSearchColumn } from "./casino.def";
import GameList from "./casino.gamelist";
import { BannerSwipper } from "../common/customSwipper";
import { Pagination } from "../common/pagination";
import { getUrlParameter } from "../common/common";
import SearchBox from "./casino.searchBox";
import Loading from "../common/loading";
import { defCasinoProviders } from "../../datas/productList";

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
	const [selNav, setSelNav] = useState(defNav.ALLGAMES.key);
	const [favorite, setFavorite] = useState([]);
	const [imgUrl, setImgUrl] = useState("");
	const [tpList, setTpList] = useState({});
	const [tpOptions, setTpOptions] = useState([]);
	const [gameDatas, setGameDatas] = useState(null);
	const [pageInfo, setPageInfo] = useState({ currentPage: 1, totalPages: 1 });
	const [displayGames, setDisplayGames] = useState([]);
	const [searchInfo, setSearchInfo] = useState({
		[defSearchColumn.searchText]: "",
		[defSearchColumn.provider]: { idx: 0, value: null }
	});
	const isMountedRef = useRef(null);
	const provider = getUrlParameter("provider");
	const tpId = defCasinoProviders[provider]?.tpId;
	const [loading, setLoading] = useState(true);

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
							_selNav: selNav,
							_gameDatas: games,
							_tpList
						});
					}
				}
				setLoading(false);
			},
			() => {
				setLoading(false);
			}
		);

		if (userInfo.isLogin) {
			api_account_GetFavoriteGame().then(res => {
				if (res.data.errorCode === 0 && res.data.data) {
					const fav = res.data.data.map(f => {
						return `${f.providerId}_${f.gameId}`;
					});
					if (isMountedRef.current) {
						setFavorite(fav);
					}
				}
			});
		}
	}, [userInfo.isLogin, tpId]);

	const FilterGames = (
		_searchInfo,
		_nav,
		initGameDatas,
		initTpList,
		_favorite
	) => {
		const _gameDatas = initGameDatas ?? gameDatas;
		const _tpList = initTpList ?? tpList;
		const _tpId = _searchInfo.provider.value;
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
			setSelNav(navKey);
			SetGames({
				_searchInfo: searchInfo,
				_selNav: navKey,
				_gameDatas: gameDatas,
				_tpList: tpList
			});
		}
	};

	const clickPageNumber = page => {
		setPageInfo(prevS => ({
			...prevS,
			currentPage: page
		}));
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
			api_account_SetFavoriteGame(_tpId, gameId, isRemove);
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
				_searchInfo,
				_selNav: selNav,
				_gameDatas: gameDatas,
				_tpList: tpList
			});
		}
	};

	const SubmitSearch = _searchInfo => {
		SetGames({
			_searchInfo: searchInfo,
			_selNav: selNav,
			_gameDatas: gameDatas,
			_tpList: tpList
		});
	};

	return loading ? (
		<Loading />
	) : (
		<div className="infoModule">
			<BannerSwipper
				ImgFolder={[defBannerType.Slots]}
				withBtn={true}
				withPagination={true}
			/>

			<div className="inside-title icon icon-ow-casino">
				<span>{t("lbl_Slots")}</span>
			</div>
			<div className="casinoSelect">
				<Nav selNav={selNav} onSelectNav={onSelectNav} t={t} />
				<SearchBox
					t={t}
					tpOptions={tpOptions}
					EditSearchField={EditSearchField}
					searchInfo={searchInfo}
					submitSearch={SubmitSearch.bind(this, searchInfo)}
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
			/>
			<Pagination
				totalPages={pageInfo.totalPages}
				currentPage={pageInfo.currentPage}
				clickPageNumber={clickPageNumber}
			/>
		</div>
	);
};
