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
import GamesBanner from "./games.banner";
import GameList from "./game.list";
import { defTpCategoryId } from "../../datas/productList";

const Games = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { productTpIds } = useContext(productTpIdsContext);
	const { allMaintainList } = useContext(maintainListContext);

	const clickItem = ({ tpId, gameId, isInMaintain }) => {
		const loginCallback = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};
		if (isInMaintain) {
			return;
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
		let { subMenu } = defMenuLinks().games;

		if (subMenu && productTpIds?.length > 0) {
			subMenu = subMenu.filter(s => productTpIds.includes(s.tpId));
		}

		return subMenu;
	};

	const subMenu = getSubMenu();

	return (
		<>
			<GamesBanner langId={userInfo.langId} />
			<section className="inside">
				<div className="rightModule">
					<div className="infoModule">
						<div className="lotterylobbyList">
							<GameList
								t={t}
								subMenu={subMenu}
								maintainList={allMaintainList}
								defTpCategoryId={defTpCategoryId}
								clickItem={clickItem}
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Games;
