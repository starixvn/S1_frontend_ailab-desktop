import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { number_format } from "../../common/common";

const PageEventListMyr = ({ currencyId, isConvert }) => {
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
					<td>{number_format(200, isConvert, 0)}</td>
					<td>{number_format(300, isConvert, 0)}</td>
					<td>{number_format(600, isConvert, 0)}</td>
					<td>{number_format(1200, isConvert, 0)}</td>
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
					<td>0.55%</td>
					<td>0.60%</td>
					<td>0.80%</td>
					<td>0.90%</td>
					<td>1.00%</td>
				</tr>
				<tr>
					<td>{t("lbl_Vip_Live_Casino_Rebate")}</td>
					<td>0.50%</td>
					<td>0.50%</td>
					<td>0.60%</td>
					<td>0.70%</td>
					<td>0.80%</td>
					<td>1.00%</td>
				</tr>
				<tr>
					<td>{t("lbl_Vip_Slot_Fishing_Rebate")}</td>
					<td>0.80%</td>
					<td>0.90%</td>
					<td>0.90%</td>
					<td>1.00%</td>
					<td>1.10%</td>
					<td>1.20%</td>
				</tr>
				<tr>
					<td>{t("lbl_Vip_Virtual_Sport_Rebate")}</td>
					<td>0.80%</td>
					<td>0.90%</td>
					<td>0.90%</td>
					<td>1.00%</td>
					<td>1.10%</td>
					<td>1.20%</td>
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
					<td>{number_format(50000, isConvert, 0)}</td>
					<td>{number_format(150000, isConvert, 0)}</td>
					<td>{number_format(450000, isConvert, 0)}</td>
					<td>{number_format(800000, isConvert, 0)}</td>
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
					<td>{number_format(200000, isConvert, 0)}</td>
					<td>{number_format(500000, isConvert, 0)}</td>
					<td>{number_format(800000, isConvert, 0)}</td>
					<td>{number_format(1000000, isConvert, 0)}</td>
					{/* <td>{t("lbl_Vip_ByInvitation")}</td> */}
				</tr>
				<tr>
					<td>
						{t("lbl_Vip_Minimum_Turnover_Within_Validity_Period")}
					</td>
					<td />
					<td />
					<td>{number_format(2000000, isConvert, 0)}</td>
					<td>{number_format(5000000, isConvert, 0)}</td>
					<td>{number_format(8000000, isConvert, 0)}</td>
					<td>{number_format(10000000, isConvert, 0)}</td>
				</tr>
				<tr className="lastTd">
					<td>{t("lbl_Vip_Ranking_Validity_Membership_renewal")}</td>
					<td>{t("lbl_Vip_Normal")}</td>
					<td>{t("lbl_Vip_Lifetime")}</td>
					<td>{t("lbl_Vip_3Months")}</td>
					<td>{t("lbl_Vip_3Months")}</td>
					<td>{t("lbl_Vip_3Months")}</td>
					<td>{t("lbl_Vip_ByInvitation")}</td>
				</tr>
			</tbody>
		</table>
	);
};

PageEventListMyr.propTypes = {
	currencyId: PropTypes.number.isRequired,
	isConvert: PropTypes.bool.isRequired
};

export default PageEventListMyr;
