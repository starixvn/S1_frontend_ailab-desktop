import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import { defMenuLinks } from "../layout/header.menu.def";

import {
	userInfoContext,
	popBoxContext,
	productTpIdsContext
} from "../common/context";
import { defPopBoxType } from "../common/popBox";
import LivecasinoBanner from "./livecasino.banner";
import LivecasinoList from "./livecasino.list";

const Livecasino = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { productTpIds } = useContext(productTpIdsContext);

	const clickItem = ({ tpId, gameId }) => {
		const loginCallback = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		SET_ENTER_PAGE({
			isLogin: userInfo.isLogin,
			langId: userInfo.langId,
			tpId,
			gameId,
			loginCallback
		});
	};

	const getSubMenu = () => {
		let { subMenu } = defMenuLinks().liveCasino;

		if (subMenu && productTpIds?.length > 0) {
			subMenu = subMenu.filter(s => productTpIds.includes(s.tpId));
		}

		return subMenu;
	};

	const subMenu = getSubMenu();

	const slideImgList = [`123-livelobby-banner-${userInfo.langId}.jpg`];

	return (
		<>
			<LivecasinoBanner slideImgList={slideImgList} />

			<section className="inside">
				<div className="rightModule">
					<div className="infoModule">
						<LivecasinoList
							subMenu={subMenu}
							clickItem={clickItem}
							t={t}
						/>
					</div>
				</div>
			</section>
		</>
	);
};

export default Livecasino;
