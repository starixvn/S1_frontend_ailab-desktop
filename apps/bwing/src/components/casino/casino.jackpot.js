import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { getCurrencyCode } from "../common/common";

const CasinoJackpot = ({ t, userInfo }) => {
	const currencyId = userInfo.currencyId ?? getCurrencyCode(userInfo.langId);
	const [jPotSuccess, setJPotSuccess] = useState(false);

	useEffect(() => {
		const jackpotCurrency = t(`Currency_${currencyId}`);

		(() => {
			try {
				const ticker = new Ticker({
					info: 2,
					casino: "hotspin88am",
					currency: String(jackpotCurrency).toLowerCase()
				});

				if (ticker) {
					setJPotSuccess(true);
				}

				ticker.attachToTextBox("jpot-id");
				ticker.SetCurrencySign("");
				ticker.tick();
			} catch (e) {
				// eslint-disable-next-line no-console
				console.log(e);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currencyId]);

	return jPotSuccess ? (
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
