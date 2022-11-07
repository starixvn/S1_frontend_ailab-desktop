import React from "react";
import PropTypes from "prop-types";
import { number_format } from "../common/common";

const CashBackInfo = ({ cashBackDetails, t }) => {
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
	const formatRule = { isConvertRequired: false, digits: 0 };

	const rows = cashBackDetail?.map(info => (
		<tr key={`CashBackInfo-${info.tpName}`}>
			<td>{info.tpName}</td>
			<td>
				{number_format({
					number: info.lossAmountWithBonus,
					...formatRule
				})}
			</td>
			<td>
				{number_format({
					number: Math.abs(info.lossAmount),
					...formatRule
				})}
			</td>
		</tr>
	));

	return (
		<div className="cashBack">
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
							{number_format({
								number: totalLossAmount,
								...formatRule
							})}
						</td>
					</tr>
					<tr>
						<td colSpan="4">
							{t("lbl_MinNetLossRequired")}：
							{number_format({
								number: minLossAmount,
								...formatRule
							})}
						</td>
					</tr>
					<tr>
						<td colSpan="4">
							{t("lbl_Percentage")}：{percentage}
						</td>
					</tr>
					<tr>
						<td colSpan="4">
							{t("lbl_TotalBonus")}：
							{number_format({
								number: originalTotalBonus,
								...formatRule
							})}
						</td>
					</tr>
					<tr>
						<td colSpan="4">
							{t("lbl_MaxBonus")}：
							{number_format({
								number: maxBonus,
								...formatRule
							})}
						</td>
					</tr>
					<tr>
						<td colSpan="4">
							{t("lbl_TotalBonusClaimable")}：
							{number_format({
								number: totalBonus,
								...formatRule
							})}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

CashBackInfo.defaultProps = {
	cashBackDetails: null
};

CashBackInfo.propTypes = {
	cashBackDetails: PropTypes.objectOf(PropTypes.any),
	t: PropTypes.func.isRequired
};

export default CashBackInfo;
