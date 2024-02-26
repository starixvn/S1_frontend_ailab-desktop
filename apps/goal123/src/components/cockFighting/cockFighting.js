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
import CockFightingBanner from "./cockFighting.banner";
import CockFightingList from "./cockFighting.list";

const CockFighting = () => {
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

	const getSubMenu = () => {
		let { subMenu } = defMenuLinks().cockFighting;

		if (subMenu && productTpIds?.length > 0) {
			subMenu = subMenu.filter(s => productTpIds.includes(s.tpId));
		}

		return subMenu;
	};

	const subMenu = getSubMenu();

	return (
		<main className="cocklobby">
			<CockFightingBanner langId={userInfo.langId} />
			<section className="inside">
				<div className="rightModule">
					<div className="infoModule">
						<div className="cocklobbyList">
							<CockFightingList
								t={t}
								subMenu={subMenu}
								allMaintainList={allMaintainList}
								clickItem={clickItem}
							/>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
};

export default CockFighting;
