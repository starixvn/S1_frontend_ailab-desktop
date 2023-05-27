import { useState } from "react";
import { useTranslation } from "react-i18next";

import useInterval from "./useInterval";

const useJackPotTick = ({ currencyId }) => {
	const { t } = useTranslation();

	const [isJackPotLoaded, setIsJackPotLoaded] = useState(false);

	useInterval(() => {
		try {
			const jackpotCurrency = t(`Currency_${currencyId}`);
			const ticker = new Ticker({
				info: 2,
				casino: "hotspin88am",
				currency: String(jackpotCurrency).toLowerCase()
			});
			if (isJackPotLoaded) return;
			if (ticker) {
				setIsJackPotLoaded(true);
				ticker.attachToTextBox("jpot-id");
				ticker.sign = "";
				ticker.tick();
			}
		} catch (e) {
			// eslint-disable-next-line no-console
			console.log(e);
			setIsJackPotLoaded(false);
		}
	}, 1000);

	return { isJackPotLoaded };
};

export default useJackPotTick;
