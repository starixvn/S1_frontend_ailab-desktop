import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { capitalizeFirstLetter } from "../../common/common";

const TableInfo = ({ currencyId, vipBanner }) => {
	const { t } = useTranslation();

	return (
		<table className="eventList">
			<tbody>
				<tr className="title">
					<td className="icon icon-nova88">
						{capitalizeFirstLetter(t("lbl_Vip_Service_Support"))}
					</td>
					<td colSpan="6">{t("lbl_Vip_Tier")}</td>
				</tr>
				<tr>
					<td>
						{capitalizeFirstLetter(t("lbl_Vip_Deposit_Priority"))}
					</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td>
							{item?.depositPriority ? (
								<i className="icon icon-checkmark" />
							) : null}
							{item?.depositPriority}
						</td>
					))}
				</tr>
				<tr>
					<td>
						{capitalizeFirstLetter(
							t("lbl_Vip_WithDrawal_Priority")
						)}
					</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td>
							{item?.withdrawalPriority ? (
								<i className="icon icon-checkmark" />
							) : null}
							{item?.withdrawalPriority}
						</td>
					))}
				</tr>
				<tr>
					<td>
						{capitalizeFirstLetter(
							t("lbl_Vip_Service_Support_At_Date")
						)}
					</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td>
							{item?.serviceSupport ? (
								<i className="icon icon-checkmark" />
							) : null}
							{item?.serviceSupport}
						</td>
					))}
				</tr>
				<tr>
					<td>
						{capitalizeFirstLetter(
							t("lbl_Vip_Designated_Account_Manager")
						)}
					</td>
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
					<td>
						{capitalizeFirstLetter(
							t("lbl_DAILY_WITHDRAWAL_LIMITATION")
						)}
					</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td>{item?.withdrawalMax.split(".")[0]}</td>
					))}
				</tr>
				<tr>
					<td>
						{capitalizeFirstLetter(
							t("lbl_DAILY_TRANSACTIONS_COUNT")
						)}
					</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td>{item?.times}</td>
					))}
				</tr>
				<tr className="title">
					<td className="icon icon-nova88">
						{capitalizeFirstLetter(t("lbl_Vip_Exclusive_Bonus"))}
						<span className="txt-orange">
							({t(`Currency_${currencyId}`)})
						</span>
					</td>
					<td colSpan="6" />
				</tr>
				<tr>
					<td>
						{capitalizeFirstLetter(t("lbl_Vip_Tier_UpGrade_Bonus"))}
					</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td>
							{item?.upBonus ? item?.upBonus.split(".")[0] : null}
						</td>
					))}
				</tr>
				<tr className="title">
					<td className="icon icon-nova88">
						{capitalizeFirstLetter(t("lbl_Vip_Special_Rebate"))}
					</td>
					<td colSpan="6" />
				</tr>
				<tr>
					<td>{capitalizeFirstLetter(t("lbl_Vip_Sport_Rebate"))}</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td>{item?.rebateCategory[0]?.percentage}%</td>
					))}
				</tr>
				<tr>
					<td>
						{capitalizeFirstLetter(t("lbl_Vip_Live_Casino_Rebate"))}
					</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td>{item?.rebateCategory[2]?.percentage}%</td>
					))}
				</tr>
				<tr>
					<td>
						{capitalizeFirstLetter(
							t("lbl_Vip_Slot_Fishing_Rebate")
						)}
					</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td>{item?.rebateCategory[1]?.percentage}%</td>
					))}
				</tr>
				<tr>
					<td>
						{capitalizeFirstLetter(
							t("lbl_Vip_Virtual_Sport_Rebate")
						)}
					</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td>{item?.rebateCategory[3]?.percentage}%</td>
					))}
				</tr>
				<tr className="title">
					<td className="icon icon-nova88">
						{capitalizeFirstLetter(
							t("lbl_Vip_Referral_bonus_Program")
						)}
					</td>
					<td colSpan="6" />
				</tr>
				<tr>
					<td>
						{capitalizeFirstLetter(t("lbl_Vip_Referral_bonus"))}
					</td>
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
					<td className="icon icon-nova88">
						{capitalizeFirstLetter(
							t("lbl_Vip_Tire_Upgrade_Requirement")
						)}
						<span className="txt-orange">
							({t(`Currency_${currencyId}`)})
						</span>
					</td>
					<td colSpan="6" />
				</tr>
				<tr>
					<td>
						{capitalizeFirstLetter(
							t("lbl_Vip_Monthly_Minimum_Deposit")
						)}
					</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td>
							{item?.upDeposit
								? item?.upDeposit.split(".")[0]
								: null}
						</td>
					))}
				</tr>
				<tr className="title">
					<td className="icon icon-nova88">
						{capitalizeFirstLetter(
							t("lbl_Vip_Tier_Maintenance_Requirement")
						)}
						<span className="txt-orange">
							({t(`Currency_${currencyId}`)})
						</span>
					</td>
					<td colSpan="6" />
				</tr>
				<tr>
					<td>
						{capitalizeFirstLetter(
							t("lbl_Vip_Minimum_Deposit_Within_Validity_Period")
						)}
					</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td>
							{item?.downDeposit &&
							Number(item?.downDeposit) !== 0
								? item?.downDeposit.split(".")[0]
								: null}
						</td>
					))}
				</tr>
				<tr>
					<td>
						{capitalizeFirstLetter(
							t("lbl_Vip_Minimum_Turnover_Within_Validity_Period")
						)}
					</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td>
							{item?.downTurnover &&
							Number(item?.downTurnover) !== 0
								? item?.downTurnover.split(".")[0]
								: null}
						</td>
					))}
				</tr>
				<tr className="lastTd">
					<td>
						{capitalizeFirstLetter(
							t("lbl_Vip_Ranking_Validity_Membership_renewal")
						)}
					</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td>{item?.rankingValidityMembershipRenewal}</td>
					))}
				</tr>
			</tbody>
		</table>
	);
};

TableInfo.propTypes = {
	currencyId: PropTypes.number.isRequired,
	vipBanner: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default TableInfo;
