import React from "react";
import PropTypes from "prop-types";
import { navigate } from "gatsby";
import path from "../../../router";
import { defNav } from "../../casino/casino.def";
import { getCurrencyCode } from "../../common/common";
import { bannerImgUrl } from "../../../config";
import useJackPotTick from "../../hook/useJackPotTick";

const Jackpot = ({ t, userInfo }) => {
	const currencyId = userInfo.currencyId ?? getCurrencyCode(userInfo.langId);

	const { isJackPotLoaded } = useJackPotTick({ currencyId });

	return (
		<div>
			<div className="title">
				<i className="icon icon-slots" />

				{t("lbl_homeJackpotTitle")}
			</div>

			<div
				className={`indexJackpot${isJackPotLoaded ? "" : " active"}`}
				onClick={() =>
					navigate(
						`/${userInfo.langId}/${path.casino.root}?tab=${defNav.PROMO.key}`
					)
				}
			>
				<img
					src={`${bannerImgUrl}/desktop/img/jackpotbg.png`}
					alt="imgJackpotBg"
				/>
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
