import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { number_format } from "../../common/common";

const PageEventListTh = ({ currencyId, isConvert }) => {
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
					<td>{number_format(1500, isConvert)}</td>
					<td>{number_format(2500, isConvert)}</td>
					<td>{number_format(5000, isConvert)}</td>
					<td>{number_format(10000, isConvert)}</td>
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
					<td>0.55%</td>
					<td>0.6%</td>
					<td>0.7%</td>
					<td>0.8%</td>
					<td>0.9%</td>
					<td>1%</td>
				</tr>
				<tr>
					<td>{t("lbl_Vip_Live_Casino_Rebate")}</td>
					<td>0.5%</td>
					<td>0.55%</td>
					<td>0.6%</td>
					<td>0.7%</td>
					<td>0.8%</td>
					<td>1.00%</td>
				</tr>
				<tr>
					<td>{t("lbl_Vip_Slot_Fishing_Rebate")}</td>
					<td>0.8%</td>
					<td>0.9%</td>
					<td>1.0%</td>
					<td>1.1%</td>
					<td>1.3%</td>
					<td>1.5%</td>
				</tr>
				<tr>
					<td>{t("lbl_Vip_Virtual_Sport_Rebate")}</td>
					<td>0.8%</td>
					<td>0.9%</td>
					<td>1.1%</td>
					<td>1.3%</td>
					<td>1.5%</td>
					<td>1.7%</td>
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
					<td>{number_format(300000, isConvert)}</td>
					<td>{number_format(800000, isConvert)}</td>
					<td>{number_format(2500000, isConvert)}</td>
					<td>{number_format(4500000, isConvert)}</td>
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
					<td>{number_format(400000, isConvert)}</td>
					<td>{number_format(1300000, isConvert)}</td>
					<td>{number_format(2300000, isConvert)}</td>
					<td>{t("lbl_Vip_ByInvitation")}</td>
				</tr>
				<tr>
					<td>
						{t("lbl_Vip_Minimum_Turnover_Within_Validity_Period")}
					</td>
					<td />
					<td />
					<td>{number_format(4000000, isConvert)}</td>
					<td>{number_format(13000000, isConvert)}</td>
					<td>{number_format(23000000, isConvert)}</td>
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

PageEventListTh.propTypes = {
	currencyId: PropTypes.number.isRequired,
	isConvert: PropTypes.bool.isRequired
};

export default PageEventListTh;
