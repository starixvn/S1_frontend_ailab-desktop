import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import path from "../../router";
import { userInfoContext } from "../common/context";
import { isConvert, number_format } from "../common/common";

const ReferralStatus = ({ referralSum }) => {
	const {
		userInfo: { currencyId }
	} = useContext(userInfoContext);
	const { t } = useTranslation();
	const _isConvert = isConvert(currencyId);

	return (
		<div className="refer-status">
			<div className="title">
				{String(t("lbl_ReferralStatus")).toUpperCase()}
				<a href={path.referralHistory.root}>
					{String(t("lbl_History")).toUpperCase()}
				</a>
			</div>
			<div className="refer-status-item">
				<div className="card">
					{String(t("lbl_NoOfAchievements")).toUpperCase()}
					<div>{referralSum?.referralCount ?? 0}</div>
				</div>
				<div className="card">
					{t("lbl_Referral_AccumulateRewardAmount")}
					<div>
						<span>{t(`Currency_${currencyId}`)}</span>
						{number_format({
							number: referralSum?.amountSum ?? 0,
							formatRequired: _isConvert
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReferralStatus;

ReferralStatus.propTypes = {
	referralSum: PropTypes.objectOf(PropTypes.any).isRequired
};
