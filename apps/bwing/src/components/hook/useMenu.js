import { useContext } from "react";
import { useMenuData } from "@ailab-desktop/common";
import { navigate } from "gatsby";
import { userInfoContext, popBoxContext } from "../common/context";
import { defPopBoxType } from "../common/defPopBoxType";
import { getCurrencyCode } from "../common/common";
import { defMenuObj, defMenuType } from "../layout/header.menu.newDef";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import { useGotoGame } from "./useGotoGame";
import { siteId } from "../../config";

const useMenu = () => {
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);

	const showLoginPopBox = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Login
		});
	};

	const menuData = useMenuData({
		siteId,
		currencyId: userInfo?.currencyId ?? getCurrencyCode(userInfo.langId)
	});

	// * 塞入前端相關參數
	const mergedMenus = menuData?.map(mainMenuItem => {
		const { lobbyCategoryId } = mainMenuItem || {};
		const defMainMenuItem = defMenuObj[String(lobbyCategoryId)];

		const {
			data = [],
			subMenu = [],
			...rest
		} = { ...mainMenuItem, ...(defMainMenuItem && defMainMenuItem) };

		const subMenus = data.map(subMenuItem => {
			// * subMenu 是插入的相關資料 因此不會影響順序
			subMenu.forEach(defSubItem => {
				if (subMenuItem.tpGameIdNo === defSubItem.tpGameIdNo) {
					Object.assign(subMenuItem, defSubItem);
				}
			});

			return { ...subMenuItem };
		});

		return { ...rest, data: subMenus };
	});

	const { handleGoToGame } = useGotoGame({
		isLogin: userInfo.isLogin,
		langId: userInfo.langId,
		autoGetData: false
	});

	const onClickProductItem = product => {
		if (!product || product?.isInMaintain) return;

		const {
			tpId,
			gameId,
			menuType,
			tpGameType,
			noPlay,
			parameter,
			path,
			isNeedLogin,
			slotCategory // * 目前只有 jackpot 需要(屬於遊戲中的一個類別)
		} = product || {};

		// * bwing 沒有直播主功能
		if (noPlay) return;

		if (isNeedLogin && !userInfo?.isLogin) {
			showLoginPopBox();
			return;
		}

		const redirectAction = () => {
			const linkMethod = () => {
				// * 特例首頁 jackpot
				if (slotCategory) {
					navigate(
						`/${userInfo.langId}/${path}?page=${slotCategory}`
					);
					return;
				}

				if (parameter) {
					const searchParams = new URLSearchParams(parameter);
					navigate(
						`/${
							userInfo?.langId
						}/${path}?${searchParams.toString()}`
					);
				} else {
					navigate(`/${userInfo?.langId}/${path}`);
				}
			};
			const enterPageMethod = () => {
				return SET_ENTER_PAGE({
					tpId,
					tpGameType,
					gameId,
					isLogin: userInfo.isLogin,
					langId: userInfo.langId,
					loginCallback: showLoginPopBox
				});
			};
			const goToGameMethod = () => {
				return handleGoToGame({
					isLogin: userInfo?.isLogin,
					langId: userInfo?.langId,
					tpId,
					gameId,
					tpGameType
				});
			};

			const switchMethod = {
				[defMenuType.Link]: linkMethod,
				[defMenuType.entPage]: enterPageMethod,
				[defMenuType.useGoToGame]: goToGameMethod,

				// * 靜態遊戲 enterPage 走 Default
				default: () => enterPageMethod()
				// * 目前沒有動態的 openWindow 方式(Affiliates 是靜態menu ) 如果有可以加在這 ↓
			};

			return (switchMethod[menuType] || switchMethod.default)();
		};

		redirectAction();
	};

	return { menuList: mergedMenus, onClickProductItem };
};

export default useMenu;
