import { useEffect, useState } from "react";
import { navigate } from "gatsby";
import { defCurrencyList, GetCurrencyName } from "../common/common";

export const useHandleAllowCurrencies = ({
	allowCurrencies,
	isLogin,
	langId,
	currencyId,
	redirectPath,
	t
}) => {
	const [isAllowCurrency, setIsAllowCurrency] = useState(true);

	useEffect(() => {
		if ((isLogin && currencyId) || isLogin === false) {
			const check = allowCurrencies?.includes(
				defCurrencyList[GetCurrencyName({ langId, currencyId, t })]
			);

			if (check !== isAllowCurrency) {
				setIsAllowCurrency(check);
			}
		}
	}, [langId, isLogin, currencyId, allowCurrencies, t, isAllowCurrency]);

	if (redirectPath && isAllowCurrency === false) {
		navigate(redirectPath);
	}

	return { isAllowCurrency };
};
