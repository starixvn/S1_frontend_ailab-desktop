import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "@reach/router";
import { defMenuLinks, defSubListClassName } from "./header.menu.def";
import { popBoxContext, userInfoContext } from "../common/context";
import defPopBoxType from "../common/defPopBoxType";
import { SET_ENTER_PAGE, Open9WSports } from "../../service/enterPage";
import SubMenuMultiple from "./header.menu.sub.Multiple";
import SubMenuSingle from "./header.menu.sub.single";
import { getCurrencyCode } from "../common/common";
import { useGotoGame, defSpecialSetting } from "../hook/useGotoGame";

export default ({ currentMenuKey, productTpIds }) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);
	const { handleGoToGame } = useGotoGame({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId,
		autoGetData: false
	});

	const clickItem = async ({ tpId, gameId, path, needLogin }) => {
		if (tpId === defSpecialSetting.sports_9w) {
			const result = await handleGoToGame({
				isLogin: userInfo.isLogin,
				langId: userInfo.langId,
				tpId,
				gameId
			});

			const { url, key, userId } = result ?? {};
			Open9WSports({ url, key, userId });
		} else {
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

			return SET_ENTER_PAGE({
				isLogin: userInfo.isLogin,
				langId: userInfo.langId,
				tpId,
				gameId,
				loginCallback: showLoginPopBox
			});
		}
	};

	return Object.keys(defMenuLinks).map(menuKey => {
		const subClassKey = defSubListClassName[menuKey];

		const subClassName = `${subClassKey || ""}${
			subClassKey === defSubListClassName.vip
				? ` vip${userInfo.langId}`
				: ""
		}${menuKey === currentMenuKey ? " active" : ""}`;

		let subMenu = [];

		const isSubMultipleItems = !(
			typeof defMenuLinks[menuKey]?.subMenu == "undefined"
		);

		if (isSubMultipleItems) {
			subMenu = defMenuLinks[menuKey]?.subMenu;
			if (
				subMenu &&
				productTpIds?.length > 0 &&
				defMenuLinks[menuKey].filterByAuth
			) {
				subMenu = subMenu.filter(
					s => s.alwaysShow || productTpIds.includes(s.tpId)
				);
			}

			subMenu = subMenu?.filter(
				s =>
					!s.canSeeOnlyAfterLogin ||
					(s.canSeeOnlyAfterLogin && userInfo.isLogin)
			);
		}

		const _currencyId = userInfo.currencyId
			? userInfo.currencyId
			: getCurrencyCode(userInfo.langId);
		const _defSortMenu = defMenuLinks[menuKey].customSort;
		const isCurrenyInSortDef =
			_defSortMenu &&
			Object.keys(_defSortMenu).includes(_currencyId.toString());

		if (isCurrenyInSortDef) {
			subMenu = subMenu.sort(
				(a, b) =>
					_defSortMenu[_currencyId][a.keyName] -
					_defSortMenu[_currencyId][b.keyName]
			);
		}

		return isSubMultipleItems ? (
			<div className={subClassName} key={`main-key-${menuKey}`}>
				{subMenu?.map(subMenuItem => (
					<SubMenuMultiple
						key={`${subMenuItem.displayKey}-${subMenuItem.tpId}-${subMenuItem.gameId}`}
						subMenuItem={subMenuItem}
						clickItem={clickItem}
						userInfo={userInfo}
						t={t}
						menuKey={menuKey}
						className={subMenuItem.className}
						displayText={subMenuItem.displayText}
						displayKey={subMenuItem.displayKey}
						parameter={subMenuItem.parameter}
					/>
				))}
			</div>
		) : (
			<div className={subClassName} key={`main-key-${menuKey}`}>
				<SubMenuSingle menuKey={menuKey} userInfo={userInfo} t={t} />
			</div>
		);
	});
};
