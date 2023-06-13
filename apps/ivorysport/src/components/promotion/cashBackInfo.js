import React from "react";
import PropTypes from "prop-types";
import { number_format, isConvert } from "../common/common";

const CashbackInfo = ({ bonusCode, cashBackDetails, t, currencyId }) => {
	if (!cashBackDetails) return null;

	const {
		totalBonus,
		maxBonus,
		cashBackDetail,
		totalLossAmount,
		minLossAmount,
		percentage,
		originalTotalBonus
	} = cashBackDetails;

	const rows = cashBackDetail?.map(c => (
		<tr key={`CashbackInfo-${bonusCode}-${c.tpName}`}>
			<td>{c.tpName}</td>
			<td>
				{number_format(c.lossAmountWithBonus, isConvert(currencyId))}
			</td>
			<td>{number_format(c.lossAmount, isConvert(currencyId))}</td>
		</tr>
	));

	return (
		<div className="cashBack newStyle">
			<table>
				<tbody>
					<tr>
						<td />
						<td>{t("lbl_LossWithBonus")}</td>
						<td>{t("lbl_NetLoss")}</td>
					</tr>
					{rows}
					<tr>
						<td colSpan="4">
							{t("lbl_TotalNetLoss")}：
							<span>
								{number_format(
									totalLossAmount,
									isConvert(currencyId)
								)}
							</span>
						</td>
					</tr>
					<tr>
						<td colSpan="4">
							{t("lbl_MinNetLossRequired")}：
							<span>
								{number_format(
									minLossAmount,
									isConvert(currencyId)
								)}
							</span>
						</td>
					</tr>
					<tr>
						<td colSpan="4">
							{t("lbl_Percentage")}：<span>{percentage}</span>
						</td>
					</tr>
					<tr>
						<td colSpan="4">
							{t("lbl_TotalBonus")}：
							<span>
								{number_format(
									originalTotalBonus,
									isConvert(currencyId)
								)}
							</span>
						</td>
					</tr>
					<tr>
						<td colSpan="4">
							{t("lbl_MaxBonus")}：
							<span>
								{number_format(maxBonus, isConvert(currencyId))}
							</span>
						</td>
					</tr>
					<tr>
						<td colSpan="4">
							{t("lbl_TotalBonusClaimable")}：
							<span>
								{number_format(
									totalBonus,
									isConvert(currencyId)
								)}
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

CashbackInfo.defaultProps = {
	cashBackDetails: null,
	bonusCode: null,
	currencyId: null
};

CashbackInfo.propTypes = {
	bonusCode: PropTypes.string,
	cashBackDetails: PropTypes.objectOf(PropTypes.any),
	t: PropTypes.func.isRequired,
	currencyId: PropTypes.number
};

export default CashbackInfo;
