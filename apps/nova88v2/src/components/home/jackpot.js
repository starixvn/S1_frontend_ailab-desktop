import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { navigate } from "@reach/router";
import path from "../../router";
import { defNav } from "../casino/casino.def";
import useInterval from "../hook/useInterval";
import { getCurrencyCode } from "../common/common";

import Jackpot from "../Jackpot/Jackpot";

const ANIMATION_LOOP_MILLISECOND = 2000;

const DELAY_MILLISECOND = 800;

export default function HomeJackpot({ t, userInfo }) {
	const ref = useRef();

	const [currentText, setCurrentText] = useState("");

	let currencyId = null;

	if (userInfo.isLogin) {
		currencyId = userInfo.currencyId;
	} else if (userInfo.isLogin === false) {
		currencyId = getCurrencyCode(userInfo.langId);
	}

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
		<div className="jpotModule">
			<div className="moduleTitle icon icon-ow-casino">
				{t("lbl_homeJackpotTitle")}
			</div>

			<span style={{ display: "none" }} id="jpot-id" ref={ref} />

			<Jackpot
				value={currentText}
				label={t(`Currency_${currencyId}`)}
				langId={userInfo.langId}
				animationLoopMillisecond={ANIMATION_LOOP_MILLISECOND}
				onClick={() =>
					navigate(
						`/${userInfo.langId}/${path.casino.root}?tab=${defNav.PROMO.key}`
					)
				}
			/>
		</div>
	);
}

HomeJackpot.propTypes = {
	t: PropTypes.func.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};
