import React from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import path from "../../router";
import { defNav } from "../casino/casino.def";
import { getCurrencyCode } from "../common/common";
import useJackPotTick from "../hook/useJackPotTick";

const Jackpot = ({ t, userInfo }) => {
	const currencyId = userInfo.currencyId ?? getCurrencyCode(userInfo.langId);
	const { isJackPotLoaded } = useJackPotTick({ currencyId });

	return (
		<div
			className="bannerS"
			onClick={() =>
				navigate(
					`/${userInfo.langId}/${path.casino.root}?tab=${defNav.PROMO.key}`
				)
			}
		>
			<div className={`jpot${isJackPotLoaded ? "" : " active"}`}>
				<div>
					<div>{t(`Currency_${currencyId}`)}</div>

					<span id="jpot-id" />
				</div>
				{!isJackPotLoaded && (
					<div className="under">{t("lbl_underMaintenance")}</div>
				)}
			</div>
		</div>
	);
};

export default Jackpot;

Jackpot.propTypes = {
	t: PropTypes.func.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};
