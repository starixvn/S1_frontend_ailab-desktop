import { useContext } from "react";
import { navigate } from "gatsby";
import { useGetRecentlyViewedQuery } from "@ailab-desktop/service";
import { defCategory, products, defLoginGameType } from "@ailab-desktop/common";
import { defMenuObj } from "../layout/header.menu.newDef";
import usePopBox from "./usePopBox";
import { popBoxContext, userInfoContext } from "../common/context";
import { SET_CASINO_ENTER_PAGE, SET_ENTER_PAGE } from "../../service/enterPage";
import { useGotoGame } from "./useGotoGame";
import useDelayFunc from "./useDelayFunc";
import { defDeviceType } from "../../service/api/base";
import { defPopBoxType } from "../common/defPopBoxType";

const useRecentlyViewed = () => {
	const { closePopBox } = usePopBox();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { throttle } = useDelayFunc();

	const { data: recentlyViewedList = [] } = useGetRecentlyViewedQuery(
		{
			deviceType: defDeviceType.Desktop,
			currencyId: userInfo?.currencyId
		},
		{
			skip: !userInfo?.isLogin,
			selectFromResult: response => {
				const { data } = response;
				return { data: data?.data?.recentlyViewedList };
			}
		}
	);

	const showLoginPopBox = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Login
		});
	};

	const showMaintenancePopBox = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.UnderMaintain,
			clickClose: closePopBox
		});
	};

	const { handleGoToGame } = useGotoGame({ autoGetData: false });

	const mergedProducts = () => {
		const allDefProducts = Object.values(defMenuObj).flatMap(
			mainMenuItem => mainMenuItem?.subMenu
		);

		return recentlyViewedList.map(gameItem => {
			const defMenuProduct = allDefProducts.find(
				defGameItem => defGameItem.tpGameIdNo === gameItem.tpGameIdNo
			);
			// * 只選相關參數插入 避免前後端參數權責混淆
			const { menuType, parameter, path } = defMenuProduct || {};

			return { ...gameItem, menuType, parameter, path };
		});
	};

	const onClickRecentlyViewedProductItem = async product => {
		if (!product) return;

		const {
			tpId,
			gameId,
			tpGameType,
			betType,
			isMaintain,
			path: lobbyPath,
			parameter,
			categoryId,
			isNeedLogin = false
		} = product || {};

		if (isMaintain) {
			showMaintenancePopBox();
			return;
		}

		// * 目前只有 Sport 的 SBO
		if (isNeedLogin && !userInfo?.isLogin) {
			showLoginPopBox();
			return;
		}

		// * Jira 4839 的需求 點擊直接進入該遊戲(Slot 是直接進遊戲) 若有大廳則導轉到大廳
		switch (true) {
			case categoryId === defCategory.Slots:
				throttle(
					() =>
						SET_CASINO_ENTER_PAGE({
							tpId,
							gameId,
							isFree: false,
							langId: userInfo.langId,
							execFunction:
								tpId === products.PGSoft.tpId
									? handleGoToGame.bind(this, {
											langId: userInfo.langId,
											tpId,
											gameId,
											isFun: false,
											tpGameType,
											loginGameType:
												defLoginGameType.returnHtml
									  })
									: null,
							tpGameType
						}),
					5000
				);

				break;
			case !!lobbyPath: {
				if (parameter) {
					const searchParams = new URLSearchParams(parameter);

					await navigate(
						`/${
							userInfo?.langId
						}/${lobbyPath}?${searchParams.toString()}`
					);
					break;
				}
				await navigate(`/${userInfo?.langId}/${lobbyPath}`);
				break;
			}
			default:
				SET_ENTER_PAGE({
					langId: userInfo.langId,
					isLogin: userInfo.isLogin,
					tpId,
					gameId,
					loginCallback: showLoginPopBox,
					betType,
					tpGameType,
					currencyId: userInfo?.currencyId
				});
				break;
		}
	};

	return {
		recentlyViewedList: mergedProducts(),
		onClickRecentlyViewedProductItem
	};
};

export default useRecentlyViewed;
