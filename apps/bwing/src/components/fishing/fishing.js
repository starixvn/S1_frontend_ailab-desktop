import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import { defMenuLinks } from "../layout/header.menu.def";
import {
	userInfoContext,
	popBoxContext,
	productTpIdsContext,
	maintainListContext
} from "../common/context";
import { defPopBoxType } from "../common/defPopBoxType";
import FishingBanner from "./fishing.banner";
import FishingList from "./fishing.list";
import imgFishingbanner from "../../styles/img/fishinglobby/fishing-banner.jpg";

const SLIDE_IMG_LIST = [imgFishingbanner];

const Fishing = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { productTpIds } = useContext(productTpIdsContext);
	const { maintainList } = useContext(maintainListContext);

	const clickItem = ({ tpId, gameId, isInMaintain }) => {
		const loginCallback = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		if (isInMaintain) {
			return false;
		}

		SET_ENTER_PAGE({
			isLogin: userInfo.isLogin,
			langId: userInfo.langId,
			tpId,
			gameId,
			loginCallback
		});
	};

	const getSubMenu = () => {
		let { subMenu } = defMenuLinks.fishing;

		if (subMenu && productTpIds?.length > 0) {
			subMenu = subMenu.filter(s => productTpIds.includes(s.tpId));
		}

		return subMenu;
	};

	const subMenu = getSubMenu();

	return (
		<>
			<FishingBanner slideImgList={SLIDE_IMG_LIST} />
			<section className="inside">
				<div className="rightModule">
					<div className="infoModule">
						<FishingList
							subMenu={subMenu}
							clickItem={clickItem}
							t={t}
							maintainList={maintainList}
						/>
					</div>
				</div>
			</section>
		</>
	);
};

export default Fishing;
