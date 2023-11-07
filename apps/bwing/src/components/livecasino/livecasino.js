import React, { useContext } from "react";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import { defMenuLinks, defMenuType } from "../layout/header.menu.def";
import {
	userInfoContext,
	popBoxContext,
	productTpIdsContext,
	maintainListContext
} from "../common/context";
import { defPopBoxType } from "../common/defPopBoxType";
import LivecasinoBanner from "./livecasino.banner";
import LivecasinoList from "./livecasino.list";
import { useGotoGame } from "../hook/useGotoGame";

const Livecasino = () => {
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { productTpIds } = useContext(productTpIdsContext);
	const { handleGoToGame } = useGotoGame({ autoGetData: false });
	const { allMaintainList } = useContext(maintainListContext);

	const clickItem = ({
		tpId,
		gameId,
		menuType,
		isInMaintain,
		tpGameType
	}) => {
		const loginCallback = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		if (isInMaintain) {
			return;
		}

		if (menuType === defMenuType.useGoToGame) {
			handleGoToGame({
				isLogin: userInfo.isLogin,
				langId: userInfo.langId,
				tpId,
				gameId,
				tpGameType
			});
		} else {
			SET_ENTER_PAGE({
				isLogin: userInfo.isLogin,
				langId: userInfo.langId,
				tpId,
				gameId,
				loginCallback,
				tpGameType
			});
		}
	};

	const getSubMenu = () => {
		let { subMenu } = defMenuLinks.liveCasino;

		if (subMenu && productTpIds?.length > 0) {
			subMenu = subMenu.filter(s => productTpIds.includes(s.tpId));
		}

		return subMenu;
	};

	const subMenu = getSubMenu();

	return (
		<>
			<LivecasinoBanner langId={userInfo.langId} />
			<div className="wrapper mt-5">
				<div className="col-12">
					<div className="lobby-products">
						<LivecasinoList
							subMenu={subMenu}
							clickItem={clickItem}
							maintainList={allMaintainList}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Livecasino;
