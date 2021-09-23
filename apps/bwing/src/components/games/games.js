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
import GamesBanner from "./games.banner";
import GameList from "./game.list";

const Games = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { productTpIds } = useContext(productTpIdsContext);
	const { allMaintainList } = useContext(maintainListContext);

	const clickItem = ({ tpId, gameId, tpGameType }) => {
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
			loginCallback,
			tpGameType
		});
	};

	const getSubMenu = () => {
		let { subMenu } = defMenuLinks.games;

		if (subMenu && productTpIds?.length > 0) {
			subMenu = subMenu.filter(s => productTpIds.includes(s.tpId));
		}

		return subMenu;
	};

	const subMenu = getSubMenu();

	return (
		<section>
			<div className="rightModule">
				<div className="infoModule">
					<GamesBanner langId={userInfo.langId} />

					<div className="gameslobbyList">
						<GameList
							t={t}
							subMenu={subMenu}
							allMaintainList={allMaintainList}
							clickItem={clickItem}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Games;
