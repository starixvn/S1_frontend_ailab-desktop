import React, { useRef } from "react";
import PropTypes from "prop-types";
import Jackpot from "../Jackpot/Jackpot";
import {
	useJackPotTick,
	ANIMATION_LOOP_MILLISECOND
} from "../hook/useJackPotTick";

export default function CasinoJackpot({ t, userInfo }) {
	const ref = useRef();
	const { currencyId } = userInfo;
	const { currentText } = useJackPotTick({ ref, currencyId });

	return (
		<div className="slotJpot">
			<span style={{ display: "none" }} id="jpot-id" ref={ref} />

			<Jackpot
				label={t(`Currency_${currencyId}`)}
				value={currentText}
				langId={userInfo.langId}
				animationLoopMillisecond={ANIMATION_LOOP_MILLISECOND}
			/>
		</div>
	);
}

CasinoJackpot.propTypes = {
	t: PropTypes.func.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};
