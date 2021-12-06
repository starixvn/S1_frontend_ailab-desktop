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
import { getCurrencyCode } from "../common/common";
import defPopBoxType from "../common/defPopBoxType";
import GameBanner from "./game.banner";
import GameList from "./game.list";

const Game = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { productTpIds } = useContext(productTpIdsContext);
	const { allMaintainList } = useContext(maintainListContext);

	const [gameSubMenu, setGameSubMenu] = useState([]);

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
			const { filterByAuth } = defMenuLinks.games;
			let { subMenu } = defMenuLinks.games;

			const _currencyId = userInfo.currencyId
				? userInfo.currencyId
				: getCurrencyCode(userInfo.langId);

			const haveToCheckTpId = productTpIds?.length > 0 && filterByAuth;

			subMenu = subMenu.filter(s => {
				let result =
					!s.canSeeOnlyAfterLogin ||
					(s.canSeeOnlyAfterLogin && userInfo.isLogin);

				if (result && s?.allowCurrencies) {
					result = s?.allowCurrencies.includes(_currencyId);
				}

				if (result && haveToCheckTpId) {
					result = s.alwaysShow || productTpIds.includes(s.tpId);
				}

				return result;
			});
			setGameSubMenu(subMenu);
		};

		getSubMenu();
	}, [productTpIds, userInfo.currencyId, userInfo.isLogin]);

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
