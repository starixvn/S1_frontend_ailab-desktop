import { useContext, useEffect, useState, useRef } from "react";
import { getCurrencyCode } from "../common/common";
import { userInfoContext } from "../common/context";
import usePopBox from "./usePopBox";
import { api_site_GetMenuOfGames } from "../../service/api/site";

const useGameMenu = ({ productTpIds }) => {
	const { userInfo } = useContext(userInfoContext);
	const { errorPopBox } = usePopBox();
	const [allGameMenu, setAllGameMenu] = useState([]);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		api_site_GetMenuOfGames().then(
			res => {
				if (isMountedRef.current) {
					const { data, message, errorCode } = res.data;

					if (data && errorCode === 0) {
						setAllGameMenu(data);
					} else if (errorCode !== 0) {
						errorPopBox(message || `error`, errorCode);
					}
				}
			},
			() => {
				if (isMountedRef.current) {
					errorPopBox();
				}
			}
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const sortGameMenu = ({ defMenu, customSort, filterByAuth, menuId }) => {
		let newMenu = defMenu;

		const _currencyId = userInfo.currencyId
			? userInfo.currencyId
			: getCurrencyCode(userInfo.langId);

		const haveToCheckTpId = productTpIds?.length > 0 && filterByAuth;

		const gameMenu = allGameMenu.find(obj => obj.menuId === menuId)
			?.menuItems;

		newMenu = newMenu.filter(s => {
			let result =
				!s.canSeeOnlyAfterLogin ||
				(s.canSeeOnlyAfterLogin && userInfo.isLogin);

			if (result && s?.allowCurrencies && userInfo.isLogin) {
				result = s?.allowCurrencies.includes(_currencyId);
			}

			if (result && haveToCheckTpId) {
				result = s.alwaysShow || productTpIds?.includes(s.tpId);
			}

			return result;
		});

		if (gameMenu && gameMenu?.length > 0) {
			newMenu = newMenu.map(item => {
				const sort = gameMenu.find(
					sortedItem =>
						item.tpId === sortedItem.tpId &&
						item.tpGameType === sortedItem.tpGameType &&
						(!sortedItem.gameId ||
							String(item.gameId) === String(sortedItem.gameId))
				)?.sort;

				return { ...item, sort: sort ?? newMenu.length + 1 };
			});

			newMenu = newMenu.sort((a, b) => a.sort - b.sort);
		} else if (
			customSort &&
			Object.keys(customSort).includes(_currencyId.toString())
		) {
			newMenu = newMenu.sort(
				(a, b) =>
					customSort[_currencyId][a.keyName] -
					customSort[_currencyId][b.keyName]
			);
		}

		return newMenu;
	};

	return { allGameMenu, sortGameMenu };
};

export { useGameMenu };
