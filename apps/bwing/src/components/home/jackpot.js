import React from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import path from "../../router";
import { getCurrencyCode } from "../common/common";
import useJackPotTick from "../hook/useJackPotTick";

const Jackpot = ({ t, userInfo }) => {
	const currencyId = userInfo.currencyId ?? getCurrencyCode(userInfo.langId);
	const { isJackPotLoaded } = useJackPotTick({ currencyId });

	return (
		<div className={`col-6 mb-6 ${!isJackPotLoaded ? "maintain" : ""}`}>
			<div className="home-jackpot">
				<div className="home-jackpot-title">{t("lbl_TotalAmount")}</div>
				<div
					className="home-jackpot-btn"
					onClick={() =>
						navigate(
							`/${userInfo.langId}/${path.casino.root}?page=jackpot`
						)
					}>
					<button>{t("lbl_PlayNow")}</button>
				</div>
				<div className="home-jackpot-number">
					<div>
						<span id="jpot-id" />
					</div>
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
