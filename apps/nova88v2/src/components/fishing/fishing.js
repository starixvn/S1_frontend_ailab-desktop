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
import FishingList from "./fishing.list";
import { useGameMenu } from "../hook/useGameMenu";
import { bannerImgUrl } from "../../config";

const Fishing = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { productTpIds } = useContext(productTpIdsContext);
	const { allMaintainList } = useContext(maintainListContext);
	const { tpGameTypeSettingList } = useContext(
		productTpGameTypeSettingListContext
	);
	const [fishingSubMenu, setFishingSubMenu] = useState([]);
	const { sortGameMenu } = useGameMenu({ productTpIds });

	const clickItem = ({
		tpId,
		gameId,
		needLogin,
		path,
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
							}}
						>
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
			} = defMenuLinks.fishing;

			const menu = sortGameMenu({
				customSort,
				filterByAuth,
				defMenu,
				checkBeforeLogin
			});

			return menu;
		};

		const menu = getSubMenu();

		setFishingSubMenu(menu);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productTpIds, userInfo.currencyId, userInfo.isLogin]);

	return (
		<>
			<div className="lobby-banner">
				<div className="swiper-container">
					<div className="swiper-wrapper">
						<div className="swiper-slide">
							<img
								src={`${bannerImgUrl}/desktop/img/4.0/lobby-fishing/fishlobby-bn.png`}
								alt="fishlobby-bn"
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="lobby-content">
				<FishingList
					fishingSubMenu={fishingSubMenu}
					maintainList={allMaintainList}
					tpGameTypeSettingList={tpGameTypeSettingList}
					clickItem={clickItem}
					t={t}
				/>
			</div>
		</>
	);
};

export default Fishing;
