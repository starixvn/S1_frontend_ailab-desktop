import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useInterval from "./useInterval";

const ANIMATION_LOOP_MILLISECOND = 2000;

const DELAY_MILLISECOND = 800;

const useJackPotTick = ({ ref, currencyId }) => {
	const { t } = useTranslation();
	const [currentText, setCurrentText] = useState("");
	const [isJackPotLoaded, setIsJackPotLoaded] = useState(false);

	useEffect(() => {
		try {
			const jackpotCurrency =
				currencyId === 13
					? "cny"
					: t(`Currency_${currencyId}`)?.toLowerCase();

			const ticker = new Ticker({
				info: 2,
				casino: "hotspin88am",
				currency: jackpotCurrency
			});
			if (isJackPotLoaded) return;
			if (ticker) {
				setIsJackPotLoaded(true);
				ticker.attachToTextBox("jpot-id");
				ticker.tick();
			}
		} catch (e) {
			// eslint-disable-next-line no-console
			console.log(e);
			setIsJackPotLoaded(false);
		}
	});

	useInterval(() => {
		const [_currentText] = String(ref.current.innerText).split(" ");

		setCurrentText(_currentText);
	}, ANIMATION_LOOP_MILLISECOND + DELAY_MILLISECOND);

	return { isJackPotLoaded, currentText };
};

export { useJackPotTick, ANIMATION_LOOP_MILLISECOND, DELAY_MILLISECOND };
