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

import defPopBoxType from "../common/defPopBoxType";
import { useGotoGame } from "../hook/useGotoGame";
import { useGameMenu } from "../hook/useGameMenu";

import LivecasinoNewBanner from "./livecasinoNew.banner";
import LivecasinoNewList from "./livecasinoNew.list";

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { productTpIds } = useContext(productTpIdsContext);
	const { allMaintainList } = useContext(maintainListContext);

	const [subMenu, setSubMenu] = useState([]);
	const { allGameMenu, sortGameMenu } = useGameMenu({ productTpIds });

	const { handleGoToGame } = useGotoGame({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId,
		autoGetData: false
	});

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
			const {
				filterByAuth,
				customSort,
				subMenu: defMenu,
				menuId
			} = defMenuLinks.casino;

			const menu = sortGameMenu({
				customSort,
				filterByAuth,
				defMenu,
				menuId
			}).filter(subMenuItem => subMenuItem?.lobbyPage);

			return menu;
		};

		const menu = getSubMenu();

		setSubMenu(menu);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		productTpIds,
		userInfo.currencyId,
		userInfo.isLogin,
		userInfo.langId,
		allGameMenu
	]);

	return (
		<>
			<LivecasinoNewBanner t={t} />

			<section className="inside">
				<div className="rightModule">
					<div className="livecasino newDesign">
						<LivecasinoNewList
							listData={subMenu}
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
