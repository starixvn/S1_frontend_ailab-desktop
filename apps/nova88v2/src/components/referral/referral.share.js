import React from "react";
import { number_format, isConvert } from "../common/common";
import { cloudImgUrl } from "../../config";

export default ({ t, langId, currencyId, referralSettingData }) => {
	const { periodDays, bonusAmount, vaildBet, deposit } = referralSettingData;
	const currency = t(`Currency_${currencyId}`);
	const _isConvert = isConvert(currencyId);

	return (
		<div className="refShare">
			<div className="title">{t("lbl_Share_with_friend")}</div>
			<div className="refBox">
				<div>
					<div>
						{t("lbl_ValidPeriod")}{" "}
						<span>{`${periodDays} ${t("lbl_Days")}`}</span>
					</div>
					<div>
						{t("lbl_Bonus")}{" "}
						<span>
							{currency} {number_format(bonusAmount, _isConvert)}
						</span>
					</div>
					<div>
						{t("lbl_ValidBet")}{" "}
						<span>
							{currency} {number_format(vaildBet, _isConvert)}
						</span>
					</div>
					<div>
						{t("lbl_Deposit")}{" "}
						<span>
							{currency} {number_format(deposit, _isConvert)}
						</span>
					</div>
					<a
						href={`${cloudImgUrl}/NovaPromotion/referral/${langId.toUpperCase()}.html`}
						target="_blank">
						{t("lbl_MoreDetails")}
					</a>
				</div>
			</div>
		</div>
	);
};
