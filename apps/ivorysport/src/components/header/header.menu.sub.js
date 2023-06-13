import React, { useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import {
	defMenuLinks,
	defSubListClassName,
	defMenuType
} from "./header.menu.def";
import { popBoxContext, userInfoContext } from "../common/context";
import defPopBoxType from "../common/defPopBoxType";
import { SET_ENTER_PAGE, Open9WSports } from "../../service/enterPage";
import SubMenuMultiple from "./header.menu.sub.Multiple";
import SubMenuSingle from "./header.menu.sub.single";
import { useGotoGame, defSpecialSetting } from "../hook/useGotoGame";
import { useGameMenu } from "../hook/useGameMenu";

export default ({ currentMenuKey, productTpIds, maintainList }) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const { sortGameMenu } = useGameMenu({ productTpIds });

	const isMountedRef = useRef(null);

	const { handleGoToGame } = useGotoGame({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId,
		autoGetData: false
	});

	const { isLogin, langId } = userInfo;

	const showLoginPopBox = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Login
		});
	};

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const clickItem = async ({
		tpId,
		gameId,
		path,
		needLogin,
		menuType,
		tpGameType,
		betType
	}) => {
		if (tpId === defSpecialSetting.sports_9w) {
			const result = await handleGoToGame({
				isLogin: userInfo.isLogin,
				langId: userInfo.langId,
				tpId,
				gameId,
				tpGameType
			});

			if (userInfo.isLogin) {
				const { url, key, userId } = result ?? {};
				Open9WSports({ url, key, userId });
			}
		} else {
			if (!tpId && !gameId && path) {
				return needLogin && !userInfo.isLogin
					? showLoginPopBox()
					: navigate(`/${userInfo.langId}/${path}`);
			}

			if (menuType === defMenuType.useGoToGame) {
				handleGoToGame({
					isLogin,
					langId,
					tpId,
					gameId,
					tpGameType
				});
			} else {
				return SET_ENTER_PAGE({
					isLogin: userInfo.isLogin,
					langId: userInfo.langId,
					tpId,
					gameId,
					loginCallback: showLoginPopBox,
					tpGameType,
					betType
				});
			}
		}
		return true;
	};

	return Object.keys(defMenuLinks).map(menuKey => {
		const subClassKey = defSubListClassName[menuKey];

		const subClassName = [
			subClassKey,
			subClassKey === defSubListClassName.vip && `vip${userInfo.langId}`,
			menuKey === currentMenuKey && "active"
		]
			.filter(Boolean)
			.join(" ");

		if (defMenuLinks[menuKey]?.subMenu) {
			const {
				filterByAuth,
				customSort,
				subMenu: defMenu,
				checkBeforeLogin
			} = defMenuLinks[menuKey];

			const subMenu = sortGameMenu({
				defMenu,
				customSort,
				filterByAuth,
				checkBeforeLogin
			});

			return (
				<div className={subClassName} key={`main-key-${menuKey}`}>
					{subMenu?.map(subMenuItem => (
						<SubMenuMultiple
							key={`${subMenuItem.displayKey}-${subMenuItem.tpId}-${subMenuItem.gameId}-${subMenuItem.path}`}
							subMenuItem={subMenuItem}
							clickItem={clickItem}
							userInfo={userInfo}
							t={t}
							menuKey={menuKey}
							className={subMenuItem.className}
							displayText={subMenuItem.displayText}
							displayKey={subMenuItem.displayKey}
							parameter={subMenuItem.parameter}
							maintainList={maintainList}
							showLoginPopBox={showLoginPopBox}
						/>
					))}
				</div>
			);
		}

		return (
			<SubMenuSingle
				key={`main-key-${menuKey}`}
				subClassName={subClassName}
				menuKey={menuKey}
				userInfo={userInfo}
				t={t}
				maintainList={maintainList}
			/>
		);
	});
};
