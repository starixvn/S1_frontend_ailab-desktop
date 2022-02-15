import React, { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import { defMenuLinks } from "../header/header.menu.def";
import {
	userInfoContext,
	popBoxContext,
	productTpIdsContext,
	maintainListContext
} from "../common/context";
import defPopBoxType from "../common/defPopBoxType";
import EsportBanner from "./eSport.banner";
import ESportSwiper from "./eSport.swiper";
import { defTpGameType } from "../../datas/productList";
import { useGameMenu } from "../hook/useGameMenu";

const SLIDE_IMG_LIST = ["esport_mainbanner_bg.jpg"];

const Esport = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { productTpIds } = useContext(productTpIdsContext);
	const { allMaintainList } = useContext(maintainListContext);
	const [eSportsSubMenu, setESportsSubMenu] = useState([]);
	const { sortGameMenu } = useGameMenu({ productTpIds });

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

	useEffect(() => {
		const getSubMenu = () => {
			const {
				filterByAuth,
				customSort,
				subMenu: defMenu
			} = defMenuLinks.eSports;

			let menu = sortGameMenu({
				customSort,
				filterByAuth,
				defMenu
			});

			menu = menu.map(s => {
				const isInMaintain = allMaintainList.some(
					item =>
						item.tpId === s.tpId &&
						(item.tpGameType === s.tpGameType ||
							item.tpGameType === defTpGameType.All)
				);
				return { ...s, isInMaintain };
			});

			return menu;
		};

		const menu = getSubMenu();
		setESportsSubMenu(menu);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productTpIds, userInfo.currencyId, userInfo.isLogin]);

	return (
		<>
			<EsportBanner slideImgList={SLIDE_IMG_LIST} />
			<section className="inside">
				<div className="rightModule">
					<ESportSwiper
						t={t}
						subMenu={eSportsSubMenu}
						clickItem={clickItem}
					/>
				</div>
			</section>
		</>
	);
};

export default Esport;
