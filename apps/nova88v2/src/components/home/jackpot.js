import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import path from "../../router";
import useInterval from "../hook/useInterval";

import Jackpot from "../Jackpot/Jackpot";

const ANIMATION_LOOP_MILLISECOND = 2000;

const DELAY_MILLISECOND = 800;

export default function HomeJackpot({ t, userInfo }) {
	const ref = useRef();

	const [currentText, setCurrentText] = useState("");
	const [jPotSuccess, setJPotSuccess] = useState(false);

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
				if (ticker) {
					setJPotSuccess(true);
				}
				ticker.attachToTextBox("jpot-id");
				ticker.tick();
			} catch (e) {
				// eslint-disable-next-line no-console
				console.log("jpotError", e);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currencyId]);

	useInterval(() => {
		if (jPotSuccess) {
			const [_currentText] = String(ref.current.innerText).split(" ");

			setCurrentText(_currentText);
		}
	}, ANIMATION_LOOP_MILLISECOND + DELAY_MILLISECOND);

	return (
		<div className="jpotModule">
			<div className="moduleTitle">{t("lbl_homeJackpotTitle")}</div>

			<span style={{ display: "none" }} id="jpot-id" ref={ref} />

			<Jackpot
				value={currentText}
				label={t(`Currency_${currencyId}`)}
				langId={userInfo.langId}
				animationLoopMillisecond={ANIMATION_LOOP_MILLISECOND}
				onClick={() =>
					navigate(`/${userInfo.langId}/${path.casino.root}`)
				}
				jPotSuccess={jPotSuccess}
			/>
		</div>
	);
	// );
}

HomeJackpot.propTypes = {
	t: PropTypes.func.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};
