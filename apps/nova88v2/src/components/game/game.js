import React, { useContext, useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import { defMenuLinks } from "../header/header.menu.def";
import {
	userInfoContext,
	popBoxContext,
	productTpIdsContext,
	maintainListContext
} from "../common/context";
import defPopBoxType from "../common/defPopBoxType";
import GameBanner from "./game.banner";
import GameList from "./game.list";
import { useGameMenu } from "../hook/useGameMenu";

const Game = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { productTpIds } = useContext(productTpIdsContext);
	const { allMaintainList } = useContext(maintainListContext);
	const [gameSubMenu, setGameSubMenu] = useState([]);
	const { allGameMenu, sortGameMenu } = useGameMenu({ productTpIds });

	const clickItem = ({
		tpId,
		gameId,
		needLogin,
		path,
		isInMaintain,
		tpGameType
	}) => {
		const showLoginPopBox = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		if (isInMaintain) {
			return;
		}
		if (!tpId && !gameId && path) {
			return needLogin && !userInfo.isLogin
				? showLoginPopBox()
				: navigate(`/${userInfo.langId}/${path}`);
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
			} = defMenuLinks.games;

			const menu = sortGameMenu({
				customSort,
				filterByAuth,
				defMenu,
				menuId
			});

			return menu;
		};

		const menu = getSubMenu();

		setGameSubMenu(menu);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productTpIds, userInfo.currencyId, userInfo.isLogin, allGameMenu]);

	return (
		<>
			<GameBanner t={t} />
			<section className="inside">
				<div className="rightModule">
					<GameList
						t={t}
						gameSubMenu={gameSubMenu}
						maintainList={allMaintainList}
						clickItem={clickItem}
					/>
				</div>
			</section>
		</>
	);
};

export default Game;
