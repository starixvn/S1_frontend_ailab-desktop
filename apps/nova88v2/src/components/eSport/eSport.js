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
import EsportBanner from "./eSport.banner";
import ESportSwiper from "./eSport.swiper";

const SLIDE_IMG_LIST = ["esport_mainbanner_bg.jpg"];

const Esport = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { productTpIds } = useContext(productTpIdsContext);
	const { allMaintainList } = useContext(maintainListContext);

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
		const { filterByAuth, customSort } = defMenuLinks.eSports;
		let { subMenu } = defMenuLinks.eSports;

		const _currencyId = userInfo.currencyId
			? userInfo.currencyId
			: getCurrencyCode(userInfo.langId);

		const haveToCheckTpId = productTpIds?.length > 0 && filterByAuth;

		subMenu = subMenu.filter(s => {
			let result =
				!s.canSeeOnlyAfterLogin ||
				(s.canSeeOnlyAfterLogin && userInfo.isLogin);

			if (result && s?.allowCurrencies && userInfo.isLogin) {
				result = s?.allowCurrencies.includes(_currencyId);
			}

			if (result && haveToCheckTpId) {
				result = s.alwaysShow || productTpIds.includes(s.tpId);
			}

			return result;
		});

		subMenu = subMenu.map(s => {
			const isInMaintain = allMaintainList.some(
				item => item.tpId === s.tpId && item.tpGameType === s.tpGameType
			);
			return { ...s, isInMaintain };
		});

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
			<EsportBanner slideImgList={SLIDE_IMG_LIST} />
			<section className="inside">
				<div className="rightModule">
					<ESportSwiper
						t={t}
						subMenu={subMenu}
						clickItem={clickItem}
					/>
				</div>
			</section>
		</>
	);
};

export default Esport;
