import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import {
	userInfoContext,
	popBoxContext,
	productTpIdsContext,
	maintainListContext
} from "../common/context";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import { defMenuLinks } from "../layout/header.menu.def";
import LotteryBanner from "./lottery.banner";
import LotteryList from "./lottery.list";

const LotteryLobby = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { productTpIds } = useContext(productTpIdsContext);
	const { allMaintainList } = useContext(maintainListContext);

	const clickItem = ({ tpId, gameId, isInMaintain, tpGameType }) => {
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
			loginCallback,
			tpGameType
		});
	};

	let lotteryMenu = defMenuLinks(userInfo.langId).lottery.subMenu;
	if (lotteryMenu && productTpIds?.length > 0) {
		lotteryMenu = lotteryMenu.filter(item =>
			productTpIds.includes(item.tpId)
		);
	}

	return (
		<>
			<LotteryBanner langId={userInfo.langId} />
			<section className="inside">
				<div className="rightModule">
					<div className="infoModule">
						<div className="lotterylobbyList">
							<LotteryList
								t={t}
								subMenu={lotteryMenu}
								allMaintainList={allMaintainList}
								clickItem={clickItem}
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default LotteryLobby;
