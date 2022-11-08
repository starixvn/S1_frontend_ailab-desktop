import React from "react";
import PropTypes from "prop-types";
import { countryEnum, currencyToAreacode } from "./join.def";

const FeaturePanel = ({ currencyId, t }) => (
	<div className="features">
		<div className="title">
			<span className="icon icon-star-full" />
			{t("lbl_FEATURES")}
		</div>
		<div className="title">{t("lbl_MEMBERS_BENEFITS")}</div>
		<ul>
			<li>{t("lbl_MemberBenefits_1")}</li>
			<li>{t("lbl_MemberBenefits_2")}</li>
			<li>{t("lbl_MemberBenefits_3")}</li>
			<li>
				{t(`lbl_MemberBenefits_4`, {
					rebate: countryEnum[currencyToAreacode[currencyId]]
				})}
			</li>
		</ul>
		<div className="title">
			{t("lbl_ENJOY_NOVA88_VIP_EXCLUSIVE_BONUS_REBATES")}
		</div>
		<ul>
			<li>{t("lbl_Multiple_product_platforms_with_better_odds")}</li>
			<li>{t("lbl_Speedy_deposit_and_withdrawal")}</li>
		</ul>
	</div>
);

FeaturePanel.propTypes = {
	t: PropTypes.func.isRequired,
	currencyId: PropTypes.number.isRequired
};

export default FeaturePanel;
