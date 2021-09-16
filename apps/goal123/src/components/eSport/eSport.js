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
import EsportBanner from "./eSport.banner";
import EsportList from "./eSport.list";

const Esport = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { productTpIds } = useContext(productTpIdsContext);
	const { allMaintainList } = useContext(maintainListContext);

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
		let { entryList } = defMenuLinks().eSport;

		if (entryList && productTpIds?.length > 0) {
			entryList = entryList.filter(s => productTpIds.includes(s.tpId));
		}

		return entryList;
	};

	const entryList = getSubMenu();

	return (
		<>
			<EsportBanner langId={userInfo.langId} />
			<section className="inside">
				<div className="rightModule">
					<div className="infoModule">
						<div className="esportslobbyList">
							<EsportList
								t={t}
								subMenu={entryList}
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

export default Esport;
