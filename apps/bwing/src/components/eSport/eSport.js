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
import EsportBanner from "./eSport.banner";
import EsportList from "./eSport.list";

const Esport = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { productTpIds } = useContext(productTpIdsContext);
	const { allMaintainList } = useContext(maintainListContext);

	const clickItem = ({ tpId, gameId, isInMaintain, tpGameType, betType }) => {
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
			tpGameType,
			betType
		});
	};

	const getSubMenu = () => {
		let { subMenu } = defMenuLinks.eSport;

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
					<EsportBanner langId={userInfo.langId} />

					<div className="esportlobbyList">
						<EsportList
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

export default Esport;
