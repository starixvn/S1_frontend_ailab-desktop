import React, { useContext } from "react";
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
import LivecasinoBanner from "./livecasino.banner";
import LivecasinoList from "./livecasino.list";
import { bannerImgUrl } from "../../config";
import { useGotoGame } from "../hook/useGotoGame";
import { isOldLang } from "../../datas/languageData";
import { defTpCategoryId } from "../../datas/productList";

const Livecasino = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { productTpIds } = useContext(productTpIdsContext);
	const { allMaintainList } = useContext(maintainListContext);
	const maintainList = allMaintainList?.filter(
		item =>
			item.tpCategoryId === defTpCategoryId.liveCasino ||
			item.tpCategoryId === defTpCategoryId.all
	);

	const { handleGoToGame } = useGotoGame({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId,
		autoGetData: false
	});

	const clickItem = ({ tpId, gameId, needLogin, path, menuType }) => {
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
				gameId
			});
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
		const { filterByAuth, customSort } = defMenuLinks.casino;
		let { subMenu } = defMenuLinks.casino;

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

	const slideImgList = [
		`livecasino_mainbanner_${
			userInfo.langId.includes("_en") ? "en" : userInfo.langId
		}.jpg`
	];

	const imgSrc = `${bannerImgUrl}/img/livecasino/livecasinobanner_${
		isOldLang(userInfo.langId) ? userInfo.langId : "en"
	}.jpg`;

	return (
		<>
			<LivecasinoBanner slideImgList={slideImgList} />

			<section className="inside">
				<div className="rightModule">
					<img
						src={imgSrc}
						alt="livecasinobanner"
						className="livecasinobanner"
					/>

					<LivecasinoList
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

export default Livecasino;
