import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const PageEventListTh = ({ currencyId }) => {
	const { t } = useTranslation();
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
					<td>
						<i className="icon icon-checkmark" />
					</td>
					<td>
						<i className="icon icon-checkmark" />
					</td>
					<td>{t("lbl_Vip_High")}</td>
					<td>{t("lbl_Vip_High")}</td>
					<td>{t("lbl_Vip_High")}</td>
					<td>{t("lbl_Vip_High")}</td>
				</tr>
				<tr>
					<td>{t("lbl_Vip_WithDrawal_Priority")}</td>
					<td>
						<i className="icon icon-checkmark" />
					</td>
					<td>
						<i className="icon icon-checkmark" />
					</td>
					<td>{t("lbl_Vip_High")}</td>
					<td>{t("lbl_Vip_High")}</td>
					<td>{t("lbl_Vip_High")}</td>
					<td>{t("lbl_Vip_High")}</td>
				</tr>
				<tr>
					<td>{t("lbl_Vip_Service_Support_At_Date")}</td>
					<td>
						<i className="icon icon-checkmark" />
					</td>
					<td>
						<i className="icon icon-checkmark" />
					</td>
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
					<td>{t("lbl_Vip_Unlimited_Withdrawal_amount")}</td>
					<td>{t("lbl_Vip_Status1")}</td>
					<td>{t("lbl_Vip_Status1")}</td>
					<td>{t("lbl_Vip_Status1")}</td>
					<td>{t("lbl_Vip_Status1")}</td>
					<td>{t("lbl_Vip_Status1")}</td>
					<td>{t("lbl_Vip_Status1")}</td>
				</tr>
				<tr className="title">
					<td className="icon icon-nova88">
						{t("lbl_Vip_Exclusive_Bonus")}{" "}
						<span className="txt-orange">
							({t(`Currency_${currencyId}`)})
						</span>
					</td>
					<td colSpan="6">{t("lbl_Vip_Tier")}</td>
				</tr>
				<tr>
					<td>{t("lbl_Vip_Tier_UpGrade_Bonus")}</td>
					<td />
					<td>1,500.00</td>
					<td>2,500.00</td>
					<td>5,000.000</td>
					<td>10,000.00</td>
					<td>{t("lbl_Vip_Invisible")}</td>
				</tr>

				<tr className="title">
					<td className="icon icon-nova88">
						{t("lbl_Vip_Special_Rebate")}
					</td>
					<td colSpan="6">{t("lbl_Vip_Tier")}</td>
				</tr>
				<tr>
					<td>{t("lbl_Vip_Sport_Rebate")}</td>
					<td>0.5%</td>
					<td>0.6%</td>
					<td>0.7%</td>
					<td>0.8%</td>
					<td>0.9%</td>
					<td>1%</td>
				</tr>
				<tr>
					<td>{t("lbl_Vip_Live_Casino_Rebate")}</td>
					<td>0.5%</td>
					<td>0.6%</td>
					<td>0.7%</td>
					<td>0.8%</td>
					<td>0.9%</td>
					<td>1%</td>
				</tr>
				<tr>
					<td>{t("lbl_Vip_Slot_Fishing_Rebate")}</td>
					<td>0.8%</td>
					<td>1%</td>
					<td>1.2%</td>
					<td>1.3%</td>
					<td>1.5%</td>
					<td>1.7%</td>
				</tr>
				<tr>
					<td>{t("lbl_Vip_Virtual_Sport_Rebate")}</td>
					<td>0.8%</td>
					<td>1%</td>
					<td>1.2%</td>
					<td>1.3%</td>
					<td>1.5%</td>
					<td>1.7%</td>
				</tr>
				<tr className="title">
					<td className="icon icon-nova88">
						{t("lbl_Vip_Referral_bonus_Program")}
					</td>
					<td colSpan="6">{t("lbl_Vip_Tier")}</td>
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
					<td colSpan="6">{t("lbl_Vip_Tier")}</td>
				</tr>
				<tr>
					<td>{t("lbl_Vip_Monthly_Minimum_Deposit")}</td>
					<td />
					<td>300,000.00</td>
					<td>800,000.00</td>
					<td>2,800,000.00</td>
					<td>4,800,000.00</td>
					<td>7,800,000.00</td>
				</tr>
				<tr className="title">
					<td className="icon icon-nova88">
						{t("lbl_Vip_Tier_Maintenance_Requirement")}{" "}
						<span className="txt-orange">
							({t(`Currency_${currencyId}`)})
						</span>
					</td>
					<td colSpan="6">{t("lbl_Vip_Tier")}</td>
				</tr>
				<tr>
					<td>{t("lbl_Vip_Accumulated_Deposit_Within_3_Months")}</td>
					<td />
					<td />
					<td>380,000.00</td>
					<td>1,300,000.00</td>
					<td>2,300,000.00</td>
					<td>3,800,000.00</td>
				</tr>
				<tr>
					<td>{t("lbl_Vip_Accumulated_Turnover_Within_3_Months")}</td>
					<td />
					<td />
					<td>3,800,000.00</td>
					<td>13,000,000.00</td>
					<td>23,000,000.00</td>
					<td>38,000,000.00</td>
				</tr>
				<tr className="lastTd">
					<td>{t("lbl_Vip_Ranking_Validity_Membership_renewal")}</td>
					<td>{t("lbl_Vip_Normal")}</td>
					<td>{t("lbl_Vip_Lifetime")}</td>
					<td>3 {t("lbl_Vip_Months")}</td>
					<td>3 {t("lbl_Vip_Months")}</td>
					<td>3 {t("lbl_Vip_Months")}</td>
					<td>3 {t("lbl_Vip_Months")}</td>
				</tr>
			</tbody>
		</table>
	);
};

PageEventListTh.propTypes = {
	currencyId: PropTypes.number.isRequired
};

export default PageEventListTh;
