import { useContext, useEffect, useRef } from "react";
import { getCurrencyCode } from "../common/common";
import { userInfoContext } from "../common/context";

const useGameMenu = ({ productTpIds }) => {
	const { userInfo } = useContext(userInfoContext);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const sortGameMenu = ({
		defMenu,
		customSort,
		filterByAuth,
		checkBeforeLogin
	}) => {
		let newMenu = defMenu;
		const _currencyId = userInfo.currencyId
			? userInfo.currencyId
			: getCurrencyCode(userInfo.langId);
		const haveToCheckTpId = productTpIds?.length > 0 && filterByAuth;

		newMenu = newMenu.filter(s => {
			let result =
				!s.canSeeOnlyAfterLogin ||
				(s.canSeeOnlyAfterLogin && userInfo.isLogin);

			if (checkBeforeLogin && result && s?.allowCurrencies) {
				result = s?.allowCurrencies.includes(_currencyId);
			} else if (result && s?.allowCurrencies && userInfo.isLogin) {
				result = s?.allowCurrencies.includes(_currencyId);
			}

			if (result && haveToCheckTpId) {
				result = s.alwaysShow || productTpIds?.includes(s.tpId);
			}

			return result;
		});

		if (
			customSort &&
			Object.keys(customSort).includes(_currencyId?.toString())
		) {
			newMenu = newMenu.sort(
				(a, b) =>
					customSort[_currencyId][a.keyName] -
					customSort[_currencyId][b.keyName]
			);
		}

		return newMenu;
	};

	return { sortGameMenu };
};

export { useGameMenu };
