import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "gatsby";
import StepBar from "./stepBar";
import path from "../../router";
import { userInfoContext } from "../common/context";

export default ({ step, children }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	return (
		<div className="infoModule">
			<div className="inside-title icon icon-icon32px_deposit">
				<span>{t("lbl_Deposit")}</span>
				<div>{t("lbl_DepositOptionHint")}</div>
				<Link
					className="icon icon-friend"
					to={`/${userInfo.langId}/${path.referral.root}`}>
					<span>{t("lbl_Refer_friends_rewards")}</span>
				</Link>
			</div>
			<StepBar step={step} />
			{children}
		</div>
	);
};
