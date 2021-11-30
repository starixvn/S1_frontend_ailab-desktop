import React, { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { navigate } from "@reach/router";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import { defMenuLinks } from "../header/header.menu.def";
import {
	userInfoContext,
	popBoxContext,
	productTpIdsContext,
	maintainListContext
} from "../common/context";
import { getCurrencyCode } from "../common/common";
import defPopBoxType from "../common/defPopBoxType";
import LotteryBanner from "./lottery.banner";
import LotterySwiper from "./lottery.swiper";
import { defTpGameType } from "../../datas/productList";

const Lottery = () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { productTpIds } = useContext(productTpIdsContext);
	const { allMaintainList } = useContext(maintainListContext);
	const [lotterySubMenu, setLotterySubMenu] = useState([]);

	const clickItem = ({
		tpId,
		gameId,
		needLogin,
		path,
		isInMaintain,
		tpGameType
	}) => {
		const showLoginPopBox = () => {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.Login
			});
		};

		if (isInMaintain) {
			return;
		}
		if (!tpId && !gameId && path) {
			return needLogin && !userInfo.isLogin
				? showLoginPopBox()
				: navigate(`/${userInfo.langId}/${path}`);
		}

		return SET_ENTER_PAGE({
			isLogin: userInfo.isLogin,
			langId: userInfo.langId,
			tpId,
			gameId,
			loginCallback: showLoginPopBox,
			tpGameType
		});
	};

	useEffect(() => {
		const getSubMenu = () => {
			const { filterByAuth } = defMenuLinks.lottery;
			let { subMenu } = defMenuLinks.lottery;

			const _currencyId = userInfo.currencyId
				? userInfo.currencyId
				: getCurrencyCode(userInfo.langId);

			const haveToCheckTpId = productTpIds?.length > 0 && filterByAuth;

			subMenu = subMenu.filter(s => {
				let result =
					!s.canSeeOnlyAfterLogin ||
					(s.canSeeOnlyAfterLogin && userInfo.isLogin);

				if (result && s?.allowCurrencies) {
					result = s?.allowCurrencies.includes(_currencyId);
				}

				if (result && haveToCheckTpId) {
					result = s.alwaysShow || productTpIds.includes(s.tpId);
				}

				return result;
			});

			subMenu = subMenu.map(s => {
				const isInMaintain = allMaintainList.some(
					item =>
						item.tpId === s.tpId &&
						(item.tpGameType === s.tpGameType ||
							item.tpGameType === defTpGameType.All)
				);
				return { ...s, isInMaintain };
			});

			setLotterySubMenu(subMenu);
		};

		getSubMenu();
	}, [productTpIds, userInfo.currencyId, userInfo.isLogin]);

	return (
		<>
			<LotteryBanner t={t} />

			<section className="inside">
				<div className="rightModule">
					<LotterySwiper
						t={t}
						lotterySubMenu={lotterySubMenu}
						clickItem={clickItem}
					/>
				</div>
			</section>
		</>
	);
};

export default Lottery;
