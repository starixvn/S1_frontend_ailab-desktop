import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { numFormatToDigits } from "../../common/common";

const PageEventListVn = ({ currencyId, vipBanner }) => {
	const { t } = useTranslation();

	// * 因 GetVipBanner response 裡有參雜 string number 故須額外判斷與顯示
	const number_format_excludeString = input => {
		if (!isNaN(Number(input))) {
			return numFormatToDigits(Number(input), 0);
		}

		return input;
	};

	return (
		<table className="vip-list">
			<tbody>
				<tr className="title title-head">
					{/* <!--icon設計中,只要是class="icon icon-nova88"都會在過完年更改class名稱--> */}
					<td className="emphasize">
						{t("lbl_Vip_Service_Support")}
					</td>
					{vipBanner?.vipBannerData?.map(item => {
						return (
							<td>{item?.levelName ? item?.levelName : "-"}</td>
						);
					})}
				</tr>
				<tr>
					<td>{t("lbl_Vip_Deposit_Priority")}</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td>
							{item?.depositPriority
								? item?.depositPriority
								: "-"}
						</td>
					))}
				</tr>
				<tr>
					<td>{t("lbl_Vip_WithDrawal_Priority")}</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td>
							{item?.withdrawalPriority
								? item?.withdrawalPriority
								: "-"}
						</td>
					))}
				</tr>
				<tr>
					<td>{t("lbl_Vip_Service_Support_At_Date")}</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td>
							{item?.serviceSupport ? item?.serviceSupport : "-"}
						</td>
					))}
				</tr>
				<tr>
					<td>{t("lbl_Vip_Designated_Account_Manager")}</td>
					{/* 目前沒有叉叉 */}
					{vipBanner?.vipBannerData?.map(item => (
						<td>
							{item?.designatedAccountManager && (
								<i className="icon icon-checkmark" />
							)}
						</td>
					))}
				</tr>
				<tr>
					<td>{t("lbl_Vip_Daily_Limit")}</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td>
							{number_format_excludeString(
								item?.withdrawalMax.split(".")[0]
							)}
						</td>
					))}
				</tr>
				<tr>
					<td>{t("lbl_DAILY_TRANSACTIONS_COUNT")}</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td>{number_format_excludeString(item?.times)}</td>
					))}
				</tr>
				<tr className="title">
					<td className="emphasize">
						{t("lbl_Vip_Exclusive_Bonus")}{" "}
						<span className="txt-orange">
							({t(`Currency_${currencyId}`)})
						</span>
					</td>
					<td />
					<td />
					<td />
					<td />
					<td />
					<td />
				</tr>
				<tr>
					<td>{t("lbl_Vip_Tier_UpGrade_Bonus")}</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td>
							{item?.upBonus
								? number_format_excludeString(
										item?.upBonus.split(".")[0]
								  )
								: "-"}
						</td>
					))}
				</tr>
				<tr className="title">
					<td className="emphasize">{t("lbl_Vip_Special_Rebate")}</td>
					<td />
					<td />
					<td />
					<td />
					<td />
					<td />
				</tr>
				<tr>
					<td>{t("lbl_Vip_Sport_Rebate")}</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td>{item?.rebateCategory[0].percentage}%</td>
					))}
				</tr>
				<tr>
					<td>{t("lbl_Vip_Live_Casino_Rebate")}</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td>{item?.rebateCategory[2].percentage}%</td>
					))}
				</tr>
				<tr>
					<td>{t("lbl_Vip_Slot_Fishing_Rebate")}</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td>{item?.rebateCategory[1].percentage}%</td>
					))}
				</tr>
				<tr>
					<td>{t("lbl_Vip_Virtual_Sport_Rebate")}</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td>{item?.rebateCategory[3].percentage}%</td>
					))}
				</tr>
				<tr className="title">
					<td className="emphasize">
						{t("lbl_Vip_Referral_bonus_Program")}
					</td>
					<td />
					<td />
					<td />
					<td />
					<td />
					<td />
				</tr>
				<tr>
					<td>{t("lbl_Vip_Referral_bonus")}</td>
					{/* 沒有叉叉 */}
					{vipBanner?.vipBannerData?.map(item => (
						<td>
							{item?.referralBonus && (
								<i className="icon icon-checkmark" />
							)}
						</td>
					))}
				</tr>
				<tr className="title">
					<td className="emphasize">
						{t("lbl_Vip_Tire_Upgrade_Requirement")}
						<span className="txt-orange">
							({t(`Currency_${currencyId}`)})
						</span>
					</td>
					<td />
					<td />
					<td />
					<td />
					<td />
					<td />
				</tr>
				<tr>
					<td>{t("lbl_Vip_Monthly_Minimum_Deposit")}</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td>
							{item?.upDeposit
								? number_format_excludeString(
										item?.upDeposit.split(".")[0]
								  )
								: "-"}
						</td>
					))}
				</tr>
				<tr className="title">
					<td className="emphasize">
						{t("lbl_Vip_Tier_Maintenance_Requirement")}{" "}
						<span className="txt-orange">
							({t(`Currency_${currencyId}`)})
						</span>
					</td>
					<td />
					<td />
					<td />
					<td />
					<td />
					<td />
				</tr>
				<tr>
					<td>
						{t("lbl_Vip_Minimum_Deposit_Within_Validity_Period")}
					</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td>
							{item?.downDeposit &&
							Number(item?.downDeposit) !== 0
								? number_format_excludeString(
										item?.downDeposit.split(".")[0]
								  )
								: "-"}
						</td>
					))}
				</tr>
				<tr>
					<td>
						{t("lbl_Vip_Minimum_Turnover_Within_Validity_Period")}
					</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td>
							{item?.downTurnover &&
							Number(item?.downTurnover) !== 0
								? number_format_excludeString(
										item?.downTurnover.split(".")[0]
								  )
								: "-"}
						</td>
					))}
				</tr>
				<tr className="last">
					<td className="emphasize">
						{t("lbl_Vip_Ranking_Validity_Membership_renewal")}
					</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td>
							{item?.rankingValidityMembershipRenewal
								? item?.rankingValidityMembershipRenewal
								: "-"}
						</td>
					))}
				</tr>
			</tbody>
		</table>
	);
};

PageEventListVn.propTypes = {
	currencyId: PropTypes.number.isRequired,
	vipBanner: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default PageEventListVn;
