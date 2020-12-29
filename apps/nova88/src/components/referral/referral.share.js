import React from "react";
import config from "../../config";

export default ({ t, langId }) => {
	return (
		<div className="refShare">
			<div className="title">{t("lbl_Share_with_friend")}</div>
			<div className="refBox">
				<div className="active">
					<div>
						{t("lbl_Bonus")} <span>MYR 88</span>
					</div>
					<div>
						{t("lbl_ValidBet")} <span>8x</span>
					</div>
					<div>
						{t("lbl_Deposit")} <span>888</span>
					</div>
					<a
						href={`${config.t_and_cURL}/SiteSkin/${config.siteName}/referral/${langId}.html`}
						target="_blank">
						{t("lbl_MoreDetails")}
					</a>
				</div>
			</div>
		</div>
	);
};
