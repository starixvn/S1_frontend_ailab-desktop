import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { numFormatToDigits } from "../../common/common";

/**
 * 回饋類表，避免魔術數字
 * @Sports 體育
 * @Casino 賭場
 * @LiveCasino 真人賭場
 * @VirtualSports 虛擬體育
 * @ESports 電子競技
 */
const RebateCategory = Object.freeze({
	Sports: 0,
	Casino: 1,
	LiveCasino: 2,
	VirtualSports: 3,
	ESports: 4
});

const PageEventListVn = ({ currencyId, vipBanner }) => {
	const { t } = useTranslation();

	/**
	 * 將 input 轉為為數字，排除非數字字符串。
	 * 處理 GetVipBanner API 的數據，該數據可能包含混合的字符串和數字。
	 * @param {string | number} input - 可能是字符串或數字。
	 * @returns {string | number} - 更改過後的數字字符串，或未更動過的字串。 */
	const number_format_excludeString = input => {
		// 檢查輸入是否可以轉換為數字
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
							<td key={item.level + item.levelName}>
								{item?.levelName ? item?.levelName : "-"}
							</td>
						);
					})}
				</tr>
				<tr>
					<td>{t("lbl_Vip_Deposit_Priority")}</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td key={item.level + item.levelName}>
							{item?.depositPriority
								? item?.depositPriority
								: "-"}
						</td>
					))}
				</tr>
				<tr>
					<td>{t("lbl_Vip_WithDrawal_Priority")}</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td key={item.level + item.levelName}>
							{item?.withdrawalPriority
								? item?.withdrawalPriority
								: "-"}
						</td>
					))}
				</tr>
				<tr>
					<td>{t("lbl_Vip_Service_Support_At_Date")}</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td key={item.level + item.levelName}>
							{item?.serviceSupport ? item?.serviceSupport : "-"}
						</td>
					))}
				</tr>
				<tr>
					<td>{t("lbl_Vip_Designated_Account_Manager")}</td>
					{/* 目前沒有叉叉 */}
					{vipBanner?.vipBannerData?.map(item => (
						<td key={item.level + item.levelName}>
							{item?.designatedAccountManager && (
								<i className="icon icon-checkmark" />
							)}
						</td>
					))}
				</tr>
				<tr>
					<td>{t("lbl_Vip_Daily_Limit")}</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td key={item.level + item.levelName}>
							{number_format_excludeString(
								item?.withdrawalMax.split(".")[0]
							)}
						</td>
					))}
				</tr>
				<tr>
					<td>{t("lbl_DAILY_TRANSACTIONS_COUNT")}</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td key={item.level + item.levelName}>
							{number_format_excludeString(item?.times)}
						</td>
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
						<td key={item.level + item.levelName}>
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
				{/* Sports */}
				<tr>
					<td>{t("lbl_Vip_Sport_Rebate")}</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td key={item.level + item.levelName}>
							{
								item?.rebateCategory[RebateCategory.Sports]
									.percentage
							}
							%
						</td>
					))}
				</tr>
				{/* LiveCasino */}
				<tr>
					<td>{t("lbl_Vip_Live_Casino_Rebate")}</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td key={item.level + item.levelName}>
							{
								item?.rebateCategory[RebateCategory.LiveCasino]
									.percentage
							}
							%
						</td>
					))}
				</tr>
				{/* Casino */}
				<tr>
					<td>{t("lbl_Vip_Slot_Fishing_Rebate")}</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td key={item.level + item.levelName}>
							{
								item?.rebateCategory[RebateCategory.Casino]
									.percentage
							}
							%
						</td>
					))}
				</tr>
				{/* VirtualSports */}
				<tr>
					<td>{t("lbl_Vip_Virtual_Sport_Rebate")}</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td key={item.level + item.levelName}>
							{
								item?.rebateCategory[
									RebateCategory.VirtualSports
								].percentage
							}
							%
						</td>
					))}
				</tr>
				{/* ESports */}
				<tr>
					<td>{t("lbl_Vip_ESport_Rebate")}</td>
					{vipBanner?.vipBannerData?.map(item => (
						<td key={item.level + item.levelName}>
							{
								item?.rebateCategory[RebateCategory.ESports]
									.percentage
							}
							%
						</td>
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
						<td key={item.level + item.levelName}>
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
						<td key={item.level + item.levelName}>
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
						<td key={item.level + item.levelName}>
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
						<td key={item.level + item.levelName}>
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
						<td key={item.level + item.levelName}>
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
