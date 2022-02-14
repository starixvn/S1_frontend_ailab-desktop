import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import path from "../../router";
import { defNav } from "../casino/casino.def";

import { getCurrencyCode } from "../common/common";

const Jackpot = ({ t, userInfo }) => {
	const currencyId = userInfo.currencyId ?? getCurrencyCode(userInfo.langId);

	useEffect(() => {
		const jackpotCurrency = t(`Currency_${currencyId}`);

		(() => {
			try {
				const ticker = new Ticker({
					info: 2,
					casino: "hotspin88am",
					currency: String(jackpotCurrency).toLowerCase()
				});

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

	return (
		<div
			className="bannerS"
			onClick={() =>
				navigate(
					`/${userInfo.langId}/${path.casino.root}?tab=${defNav.PROMO.key}`
				)
			}>
			<div className="jpot">
				<div>
					<div>{t(`Currency_${currencyId}`)}</div>

					<span id="jpot-id" />
				</div>
			</div>
		</div>
	);
};

export default Jackpot;

Jackpot.propTypes = {
	t: PropTypes.func.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};
