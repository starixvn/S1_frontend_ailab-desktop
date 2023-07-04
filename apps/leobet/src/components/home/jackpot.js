import React, { useRef } from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import path from "../../router";
import Jackpot from "../Jackpot/Jackpot";
import {
	useJackPotTick,
	ANIMATION_LOOP_MILLISECOND
} from "../hook/useJackPotTick";

export default function HomeJackpot({ t, userInfo }) {
	const ref = useRef();
	const { currencyId } = userInfo;
	const { isJackPotLoaded, currentText } = useJackPotTick({
		ref,
		currencyId
	});

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
				jPotSuccess={isJackPotLoaded}
			/>
		</div>
	);
	// );
}

HomeJackpot.propTypes = {
	t: PropTypes.func.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};
