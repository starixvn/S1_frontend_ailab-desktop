import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "@reach/router";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import { defMenuLinks, defMenuType } from "../header/header.menu.def";
import {
	userInfoContext,
	popBoxContext,
	productTpIdsContext,
	maintainListContext
} from "../common/context";
import { getCurrencyCode } from "../common/common";
import defPopBoxType from "../common/defPopBoxType";
import { useGotoGame } from "../hook/useGotoGame";

import LivecasinoNewBanner from "./livecasinoNew.banner";
import LivecasinoNewList from "./livecasinoNew.list";

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { productTpIds } = useContext(productTpIdsContext);
	const { allMaintainList } = useContext(maintainListContext);

	const { handleGoToGame } = useGotoGame({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId,
		autoGetData: false
	});

	const [listData, setListData] = useState([]);

	const clickItem = ({
		tpId,
		gameId,
		needLogin,
		path,
		menuType,
		tpGameType
	}) => {
		const showLoginPopBox = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		if (!tpId && !gameId && path) {
			return needLogin && !userInfo.isLogin
				? showLoginPopBox()
				: navigate(`/${userInfo.langId}/${path}`);
		}

		if (menuType === defMenuType.useGoToGame) {
			return handleGoToGame({
				isLogin: userInfo.isLogin,
				langId: userInfo.langId,
				tpId,
				gameId,
				tpGameType
			});
		}

		return SET_ENTER_PAGE({
			isLogin: userInfo.isLogin,
			langId: userInfo.langId,
			tpId,
			gameId,
			loginCallback: showLoginPopBox,
			tpGameType
		});
	};

	useEffect(() => {
		const getSubMenu = () => {
			const { filterByAuth, customSort } = defMenuLinks.casino;
			let { subMenu } = defMenuLinks.casino;

			const _currencyId = userInfo.currencyId
				? userInfo.currencyId
				: getCurrencyCode(userInfo.langId);

			const haveToCheckTpId = productTpIds?.length > 0 && filterByAuth;

			subMenu = subMenu.filter(s => {
				let result =
					!s.canSeeOnlyAfterLogin ||
					(s.canSeeOnlyAfterLogin && userInfo.isLogin);

				if (result && s?.allowCurrencies && userInfo.isLogin) {
					result = s?.allowCurrencies.includes(_currencyId);
				}

				if (result && haveToCheckTpId) {
					result = s.alwaysShow || productTpIds.includes(s.tpId);
				}

				return result;
			});

			const isCurrenyInSortDef =
				customSort &&
				Object.keys(customSort).includes(_currencyId.toString());

			if (isCurrenyInSortDef) {
				subMenu = subMenu.sort(
					(a, b) =>
						customSort[_currencyId][a.keyName] -
						customSort[_currencyId][b.keyName]
				);
			}
			return subMenu;
		};
		const subMenu = getSubMenu();
		const filterSubMenu = subMenu.filter(
			subMenuItem => subMenuItem?.lobbyPage
		);

		setListData(filterSubMenu);
	}, [productTpIds, userInfo.currencyId, userInfo.isLogin, userInfo.langId]);

	return (
		<>
			<LivecasinoNewBanner t={t} />

			<section className="inside">
				<div className="rightModule">
					<div className="livecasino newDesign">
						<LivecasinoNewList
							listData={listData}
							maintainList={allMaintainList}
							clickItem={clickItem}
							t={t}
						/>
					</div>
				</div>
			</section>
		</>
	);
};
