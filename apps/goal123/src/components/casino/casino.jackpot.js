import React from "react";
import PropTypes from "prop-types";
import { getCurrencyCode } from "../common/common";
import useJackPotTick from "../hook/useJackPotTick";

const CasinoJackpot = ({ t, userInfo }) => {
	const currencyId = userInfo.currencyId ?? getCurrencyCode(userInfo.langId);

	const { isJackPotLoaded } = useJackPotTick({ currencyId });

	return isJackPotLoaded ? (
		<div className="slotjpot">
			<div>
				<div>{t(`Currency_${currencyId}`)}</div>
				<span id="jpot-id" />
			</div>
		</div>
	) : null;
};

export default CasinoJackpot;

CasinoJackpot.propTypes = {
	t: PropTypes.func.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};
