import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import { defMenuLinks, defMenuType } from "../header/header.menu.def";
import {
	userInfoContext,
	popBoxContext,
	productTpIdsContext,
	maintainListContext,
	productTpGameTypeSettingListContext
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
	const { tpGameTypeSettingList } = useContext(
		productTpGameTypeSettingListContext
	);

	const [subMenu, setSubMenu] = useState([]);
	const { sortGameMenu } = useGameMenu({ productTpIds });

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
		tpGameType,
		noPlay = false
	}) => {
		const showLoginPopBox = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		if (noPlay) {
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
			return;
		}

		if (!tpId && !gameId && path) {
			needLogin && !userInfo.isLogin
				? showLoginPopBox()
				: navigate(`/${userInfo.langId}/${path}`);
			return;
		}

		if (menuType === defMenuType.useGoToGame) {
			handleGoToGame({
				isLogin: userInfo.isLogin,
				langId: userInfo.langId,
				tpId,
				gameId,
				tpGameType
			});
			return;
		}

		SET_ENTER_PAGE({
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
				checkBeforeLogin
			} = defMenuLinks.casino;

			const menu = sortGameMenu({
				customSort,
				filterByAuth,
				defMenu,
				checkBeforeLogin
			}).filter(subMenuItem => subMenuItem?.lobbyPage);

			return menu;
		};

		const menu = getSubMenu();

		setSubMenu(menu);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productTpIds, userInfo.currencyId, userInfo.isLogin, userInfo.langId]);

	return (
		<>
			<LivecasinoNewBanner t={t} langId={userInfo.langId} />

			<section className="inside">
				<div className="rightModule">
					<div className="livecasino newDesign">
						<LivecasinoNewList
							listData={subMenu}
							maintainList={allMaintainList}
							tpGameTypeSettingList={tpGameTypeSettingList}
							clickItem={clickItem}
							t={t}
						/>
					</div>
				</div>
			</section>
		</>
	);
};
