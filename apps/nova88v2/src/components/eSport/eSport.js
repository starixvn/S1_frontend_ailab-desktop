import React, { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "gatsby";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import { defMenuLinks } from "../header/header.menu.def";
import {
	userInfoContext,
	popBoxContext,
	productTpIdsContext,
	maintainListContext,
	productTpGameTypeSettingListContext
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
	const { tpGameTypeSettingList } = useContext(
		productTpGameTypeSettingListContext
	);
	const [eSportsSubMenu, setESportsSubMenu] = useState([]);
	const { sortGameMenu } = useGameMenu({ productTpIds });

	const clickItem = ({
		tpId,
		gameId,
		needLogin,
		path,
		betType,
		noPlay = false,
		tpGameType
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

		SET_ENTER_PAGE({
			isLogin: userInfo.isLogin,
			langId: userInfo.langId,
			tpId,
			gameId,
			loginCallback: showLoginPopBox,
			tpGameType,
			betType
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
					<div className="esport">
						<ESportSwiper
							t={t}
							subMenu={eSportsSubMenu}
							tpGameTypeSettingList={tpGameTypeSettingList}
							clickItem={clickItem}
						/>
					</div>
				</div>
			</section>
		</>
	);
};

export default Esport;
