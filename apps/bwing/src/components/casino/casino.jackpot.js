import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import useInterval from "../hook/useInterval";

const ANIMATION_LOOP_MILLISECOND = 2000;

const DELAY_MILLISECOND = 800;

export default function CasinoJackpot({ t, userInfo }) {
	const ref = useRef();

	const [currentText, setCurrentText] = useState("");

	const { currencyId } = userInfo;

	useEffect(() => {
		if (currencyId) {
			const jackpotCurrency =
				currencyId === 13
					? "cny"
					: t(`Currency_${currencyId}`)?.toLowerCase();

			try {
				const ticker = new Ticker({
					info: 2,
					casino: "hotspin88am",
					currency: jackpotCurrency
				});

				ticker.attachToTextBox("jpot-id");
				ticker.tick();
			} catch (e) {
				// eslint-disable-next-line no-console
				console.log(e);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currencyId]);

	useInterval(() => {
		const [_currentText] = String(ref.current.innerText).split(" ");

		setCurrentText(_currentText);
	}, ANIMATION_LOOP_MILLISECOND + DELAY_MILLISECOND);

	return (
		<div className="slotJpot">
			<span style={{ display: "none" }} id="jpot-id" ref={ref} />
		</div>
	);
}

CasinoJackpot.propTypes = {
	t: PropTypes.func.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};
