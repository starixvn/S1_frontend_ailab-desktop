import { useContext } from "react";
import { navigate } from "gatsby";
import { useMenuData } from "@ailab-desktop/common";
import { popBoxContext, userInfoContext } from "../common/context";
import { getCurrencyCode } from "../common/common";
import { useGotoGame } from "./useGotoGame";
import { defMenuType, defMenuObj } from "../layout/header.menu.newDef";
import { SET_ENTER_PAGE } from "../../service/enterPage";
import { defPopBoxType } from "../common/popBox";
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

	const { handleGoToGame } = useGotoGame({ autoGetData: false });

	// * 點擊 subMenuItem 的邏輯
	/** @Param product -- 該遊戲所有資訊 (包含已塞入的前台資訊 ex:menuType parameter)
	 */
	const onClickProductItem = async product => {
		if (!product || product?.isInMaintain) return;

		const {
			tpId,
			gameId,
			menuType,
			tpGameType,
			noPlay,
			parameter,
			path,
			isNeedLogin
		} = product || {};

		// * goal 沒有直播主功能
		if (noPlay) return;

		if (isNeedLogin && !userInfo?.isLogin) {
			showLoginPopBox();
			return;
		}

		const redirectAction = () => {
			const switchMethod = {
				[defMenuType.Link]: () => {
					if (parameter) {
						const searchParams = new URLSearchParams(parameter);
						navigate(
							`/${
								userInfo?.langId
							}/${path}?${searchParams.toString()}`
						);
						return;
					}

					navigate(`/${userInfo?.langId}/${path}`);
				},
				[defMenuType.entPage]: () =>
					SET_ENTER_PAGE({
						tpId,
						tpGameType,
						gameId,
						isLogin: userInfo.isLogin,
						langId: userInfo.langId,
						loginCallback: showLoginPopBox
					}),
				[defMenuType.useGoToGame]: () => {
					return handleGoToGame({
						isLogin: userInfo?.isLogin,
						langId: userInfo?.langId,
						tpId,
						gameId,
						tpGameType
					});
				},
				// * 靜態遊戲是 enterPage 走 Default
				default: () =>
					SET_ENTER_PAGE({
						tpId,
						tpGameType,
						gameId,
						isLogin: userInfo.isLogin,
						langId: userInfo.langId,
						loginCallback: showLoginPopBox
					})
				// * 目前沒有動態的 openWindow 方式(Affiliates 是靜態menu ) 如果有可以加在這 ↓
			};

			return (switchMethod[menuType] || switchMethod.default)();
		};

		redirectAction();
	};

	return { menuList: mergedMenus, onClickProductItem };
};

export default useMenu;
