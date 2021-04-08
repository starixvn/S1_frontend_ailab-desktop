import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "@reach/router";
import { defMenuLinks, defSubListClassName } from "./header.menu.def";
import { popBoxContext, userInfoContext } from "../common/context";
import defPopBoxType from "../common/defPopBoxType";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import SubMenuMultiple from "./header.menu.sub.Multiple";
import SubMenuSingle from "./header.menu.sub.single";

export default ({ currentMenuKey, productTpIds }) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { userInfo } = useContext(userInfoContext);

	const clickItem = ({ tpId, gameId, needLogin, _path }) => {
		const handleCallBack = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		if (_path)
			return needLogin && !userInfo.isLogin
				? handleCallBack()
				: navigate(`/${userInfo.langId}/${_path}`);

		return SET_ENTER_PAGE({
			isLogin: userInfo.isLogin,
			langId: userInfo.langId,
			tpId,
			gameId,
			loginCallback: handleCallBack
		});
	};

	const clickToPage = (_needLogin, _path) => {
		const handleCallBack = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		if (_path)
			return _needLogin && !userInfo.isLogin
				? handleCallBack()
				: navigate(`/${userInfo.langId}/${_path}`);
	};

	return Object.keys(defMenuLinks).map(menuKey => {
		const subClassKey = defSubListClassName[menuKey];

		const subClassName = `${subClassKey || ""}${
			subClassKey === defSubListClassName.vip
				? ` vip${userInfo.langId}`
				: ""
		}${menuKey === currentMenuKey ? " active" : ""}`;

		let subMenu = [];

		const isSubWithManyItems = !(
			typeof defMenuLinks[menuKey]?.subMenu == "undefined"
		);

		if (isSubWithManyItems) {
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
					userInfo.isLogin !== true ||
					!s.allowCurrency ||
					s.allowCurrency.includes(userInfo.currencyId)
			);
		}

		return isSubWithManyItems ? (
			<div className={subClassName} key={`main-key-${menuKey}`}>
				{subMenu?.map(subMenuItem => (
					<SubMenuMultiple
						key={`${subMenuItem.displayKey}-${subMenuItem.tpId}-${subMenuItem.gameId}`}
						subMenuItem={subMenuItem}
						clickItem={clickItem}
						clickToPage={clickToPage}
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
