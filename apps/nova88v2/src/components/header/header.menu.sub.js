import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "@reach/router";
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
import { getCurrencyCode } from "../common/common";
import { useGotoGame, defSpecialSetting } from "../hook/useGotoGame";

export default ({ currentMenuKey, productTpIds, maintainList }) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);

	const { handleGoToGame } = useGotoGame({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId,
		autoGetData: false
	});

	const { isLogin, langId } = userInfo;

	const clickItem = async ({
		tpId,
		gameId,
		path,
		needLogin,
		menuType,
		tpGameType
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
					tpGameType
				});
			}
		}
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
			let { subMenu } = defMenuLinks[menuKey];

			const _currencyId = userInfo.currencyId
				? userInfo.currencyId
				: getCurrencyCode(userInfo.langId);

			const haveToCheckTpId =
				productTpIds?.length > 0 && defMenuLinks[menuKey].filterByAuth;

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

			const _defSortMenu = defMenuLinks[menuKey].customSort;

			if (
				_defSortMenu &&
				Object.keys(_defSortMenu).includes(_currencyId.toString())
			) {
				subMenu = subMenu.sort(
					(a, b) =>
						_defSortMenu[_currencyId][a.keyName] -
						_defSortMenu[_currencyId][b.keyName]
				);
			}

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
