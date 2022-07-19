import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const PageEventListVn = ({ currencyId }) => {
	const { t } = useTranslation();

	const currencyFormat = amount => amount.toLocaleString("en-US");

	return (
		<table className="eventList">
			<tbody>
				<tr className="title">
					{/* <!--icon設計中,只要是class="icon icon-nova88"都會在過完年更改class名稱--> */}
					<td className="icon icon-nova88">
						{t("lbl_Vip_Service_Support")}
					</td>
					<td colSpan="6">{t("lbl_Vip_Tier")}</td>
				</tr>
				<tr>
					<td>{t("lbl_Vip_Deposit_Priority")}</td>
					<td />
					<td />
					<td>{t("lbl_Vip_High")}</td>
					<td>{t("lbl_Vip_High")}</td>
					<td>{t("lbl_Vip_High")}</td>
					<td>{t("lbl_Vip_High")}</td>
				</tr>
				<tr>
					<td>{t("lbl_Vip_WithDrawal_Priority")}</td>
					<td />
					<td />
					<td>{t("lbl_Vip_High")}</td>
					<td>{t("lbl_Vip_High")}</td>
					<td>{t("lbl_Vip_High")}</td>
					<td>{t("lbl_Vip_High")}</td>
				</tr>
				<tr>
					<td>{t("lbl_Vip_Service_Support_At_Date")}</td>
					<td />
					<td />
					<td>{t("lbl_Vip_High")}</td>
					<td>{t("lbl_Vip_High")}</td>
					<td>{t("lbl_Vip_High")}</td>
					<td>{t("lbl_Vip_High")}</td>
				</tr>
				<tr>
					<td>{t("lbl_Vip_Designated_Account_Manager")}</td>
					<td />
					<td />
					<td />
					<td>
						<i className="icon icon-checkmark" />
					</td>
					<td>
						<i className="icon icon-checkmark" />
					</td>
					<td>
						<i className="icon icon-checkmark" />
					</td>
				</tr>
				<tr>
					<td>{t("lbl_Vip_Daily_Limit")}</td>
					<td>{currencyFormat(200000000)}</td>
					<td>{currencyFormat(300000000)}</td>
					<td>{currencyFormat(500000000)}</td>
					<td>{currencyFormat(1000000000)}</td>
					<td>{currencyFormat(2000000000)}</td>
					<td>{t("lbl_Vip_ByInvitation")}</td>
				</tr>
				<tr>
					<td>{t("lbl_DAILY_TRANSACTIONS_COUNT")}</td>
					<td>10</td>
					<td>10</td>
					<td>15</td>
					<td>15</td>
					<td>20</td>
					<td>{t("lbl_Unlimited")}</td>
				</tr>
				{/* <tr>
					<td>{t("lbl_Vip_Unlimited_Withdrawal_amount")}</td>
					<td>{t("lbl_Vip_Status1")}</td>
					<td>{t("lbl_Vip_Status1")}</td>
					<td>{t("lbl_Vip_Status1")}</td>
					<td>{t("lbl_Vip_Status1")}</td>
					<td>{t("lbl_Vip_Status1")}</td>
					<td>{t("lbl_Vip_Status1")}</td>
				</tr> */}
				<tr className="title">
					<td className="icon icon-nova88">
						{t("lbl_Vip_Exclusive_Bonus")}{" "}
						<span className="txt-orange">
							({t(`Currency_${currencyId}`)})
						</span>
					</td>
					<td colSpan="6" />
				</tr>
				<tr>
					<td>{t("lbl_Vip_Tier_UpGrade_Bonus")}</td>
					<td />
					<td>{currencyFormat(388888)}</td>
					<td>{currencyFormat(538888)}</td>
					<td>{currencyFormat(1188888)}</td>
					<td>{currencyFormat(2388888)}</td>
					<td>{t("lbl_Vip_ByInvitation")}</td>
				</tr>
				<tr className="title">
					<td className="icon icon-nova88">
						{t("lbl_Vip_Special_Rebate")}
					</td>
					<td colSpan="6" />
				</tr>
				<tr>
					<td>{t("lbl_Vip_Sport_Rebate")}</td>
					<td>0.60%</td>
					<td>0.70%</td>
					<td>0.80%</td>
					<td>0.90%</td>
					<td>1.00%</td>
					<td>1.10%</td>
				</tr>
				<tr>
					<td>{t("lbl_Vip_Live_Casino_Rebate")}</td>
					<td>0.25%</td>
					<td>0.30%</td>
					<td>0.35%</td>
					<td>0.40%</td>
					<td>0.45%</td>
					<td>0.50%</td>
				</tr>
				<tr>
					<td>{t("lbl_Vip_Slot_Fishing_Rebate")}</td>
					<td>0.20%</td>
					<td>0.25%</td>
					<td>0.30%</td>
					<td>0.35%</td>
					<td>0.40%</td>
					<td>0.45%</td>
				</tr>
				<tr>
					<td>{t("lbl_Vip_Virtual_Sport_Rebate")}</td>
					<td>0.70%</td>
					<td>0.80%</td>
					<td>0.90%</td>
					<td>1.10%</td>
					<td>1.20%</td>
					<td>1.50%</td>
				</tr>
				<tr className="title">
					<td className="icon icon-nova88">
						{t("lbl_Vip_Referral_bonus_Program")}
					</td>
					<td colSpan="6" />
				</tr>
				<tr>
					<td>{t("lbl_Vip_Referral_bonus")}</td>
					<td>
						<i className="icon icon-checkmark" />
					</td>
					<td>
						<i className="icon icon-checkmark" />
					</td>
					<td>
						<i className="icon icon-checkmark" />
					</td>
					<td>
						<i className="icon icon-checkmark" />
					</td>
					<td>
						<i className="icon icon-checkmark" />
					</td>
					<td>
						<i className="icon icon-checkmark" />
					</td>
				</tr>
				<tr className="title">
					<td className="icon icon-nova88">
						{t("lbl_Vip_Tire_Upgrade_Requirement")}{" "}
						<span className="txt-orange">
							({t(`Currency_${currencyId}`)})
						</span>
					</td>
					<td colSpan="6" />
				</tr>
				<tr>
					<td>{t("lbl_Vip_Monthly_Minimum_Deposit")}</td>
					<td />
					<td>{currencyFormat(200000000)}</td>
					<td>{currencyFormat(600000000)}</td>
					<td>{currencyFormat(1500000000)}</td>
					<td>{currencyFormat(3000000000)}</td>
					<td>{t("lbl_Vip_ByInvitation")}</td>
				</tr>
				<tr className="title">
					<td className="icon icon-nova88">
						{t("lbl_Vip_Tier_Maintenance_Requirement")}{" "}
						<span className="txt-orange">
							({t(`Currency_${currencyId}`)})
						</span>
					</td>
					<td colSpan="6" />
				</tr>
				<tr>
					<td>
						{t("lbl_Vip_Minimum_Deposit_Within_Validity_Period")}
					</td>
					<td />
					<td />
					<td>{currencyFormat(300000000)}</td>
					<td>{currencyFormat(750000000)}</td>
					<td>{currencyFormat(3000000000)}</td>
					<td>{t("lbl_Vip_ByInvitation")}</td>
				</tr>
				<tr>
					<td>
						{t("lbl_Vip_Minimum_Turnover_Within_Validity_Period")}
					</td>
					<td />
					<td />
					<td>{currencyFormat(3000000000)}</td>
					<td>{currencyFormat(7500000000)}</td>
					<td>{currencyFormat(30000000000)}</td>
					<td>{t("lbl_Vip_ByInvitation")}</td>
				</tr>
				<tr className="lastTd">
					<td>{t("lbl_Vip_Ranking_Validity_Membership_renewal")}</td>
					<td>{t("lbl_Vip_Normal")}</td>
					<td>{t("lbl_Vip_Lifetime")}</td>
					<td>{t("lbl_Vip_3Months")}</td>
					<td>{t("lbl_Vip_3Months")}</td>
					<td>{t("lbl_Vip_3Months")}</td>
					<td>{t("lbl_Vip_3Months")}</td>
				</tr>
			</tbody>
		</table>
	);
};

PageEventListVn.propTypes = {
	currencyId: PropTypes.number.isRequired
};

export default PageEventListVn;
