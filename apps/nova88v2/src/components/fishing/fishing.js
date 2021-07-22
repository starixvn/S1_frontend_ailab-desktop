import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "@reach/router";
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
import FishingBanner from "./fishing.banner";
import FishingList from "./fishing.list";
import { defTpCategoryId } from "../../datas/productList";

const SLIDE_IMG_LIST = ["fishmainbanner.jpg"];

const Fishing = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { productTpIds } = useContext(productTpIdsContext);
	const { allMaintainList } = useContext(maintainListContext);
	const maintainList = allMaintainList?.filter(
		item =>
			item.tpCategoryId === defTpCategoryId.fishing ||
			item.tpCategoryId === defTpCategoryId.all
	);

	const clickItem = ({ tpId, gameId, needLogin, path }) => {
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
	};

	const getSubMenu = () => {
		const { filterByAuth, customSort } = defMenuLinks.fishing;
		let { subMenu } = defMenuLinks.fishing;

		if (subMenu && productTpIds?.length > 0 && filterByAuth) {
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

		const _currencyId = userInfo.currencyId
			? userInfo.currencyId
			: getCurrencyCode(userInfo.langId);

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

	return (
		<>
			<FishingBanner slideImgList={SLIDE_IMG_LIST} />
			<section className="inside">
				<div className="rightModule">
					<FishingList
						subMenu={subMenu}
						maintainList={maintainList}
						clickItem={clickItem}
						t={t}
					/>
				</div>
			</section>
		</>
	);
};

export default Fishing;
