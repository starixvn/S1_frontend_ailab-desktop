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
import { defPopBoxType } from "../common/popBox";
import FishingBanner from "./fishing.banner";
import FishingList from "./fishing.list";
import imgFishingbanner from "../../styles/img/fishing/fishingbanner.jpg";
import { defTpCategoryId } from "../../datas/productList";

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
		let { subMenu } = defMenuLinks().fishing;

		if (subMenu && productTpIds?.length > 0) {
			subMenu = subMenu.filter(s => productTpIds.includes(s.tpId));
		}

		return subMenu;
	};

	const subMenu = getSubMenu();

	return (
		<>
			<FishingBanner langId={userInfo.langId} />
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
