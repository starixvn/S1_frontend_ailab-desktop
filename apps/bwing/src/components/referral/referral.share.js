import React from "react";
import { number_format, isConvert } from "../common/common";
import config from "../../config";

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
							{currency}{" "}
							{number_format({
								number: bonusAmount,
								formatRequired: _isConvert
							})}
						</span>
					</div>
					<div>
						{t("lbl_ValidBet")}{" "}
						<span>
							{currency}{" "}
							{number_format({
								number: vaildBet,
								formatRequired: _isConvert
							})}
						</span>
					</div>
					<div>
						{t("lbl_Deposit")}{" "}
						<span>
							{currency}{" "}
							{number_format({
								number: deposit,
								formatRequired: _isConvert
							})}
						</span>
					</div>
					<a
						className="moreBtn"
						href={`${config.t_and_cURL}/Static/Bwing/Static/${langId}/ReferralConditions.html`}
						target="_blank"
						rel="noreferrer">
						{t("lbl_MoreDetails")}
					</a>
				</div>
			</div>
		</div>
	);
};
