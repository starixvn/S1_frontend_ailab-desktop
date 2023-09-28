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
					number: info.lossAmount,
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
							<span>
								{number_format({
									number: totalLossAmount,
									...formatRule
								})}
							</span>
						</td>
					</tr>
					<tr>
						<td colSpan="4">
							{t("lbl_MinNetLossRequired")}：
							<span>
								{number_format({
									number: minLossAmount,
									...formatRule
								})}
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
								{number_format({
									number: originalTotalBonus,
									...formatRule
								})}
							</span>
						</td>
					</tr>
					<tr>
						<td colSpan="4">
							{t("lbl_MaxBonus")}：
							<span>
								{number_format({
									number: maxBonus,
									...formatRule
								})}
							</span>
						</td>
					</tr>
					<tr>
						<td colSpan="4">
							{t("lbl_TotalBonusClaimable")}：
							<span>
								{number_format({
									number: totalBonus,
									...formatRule
								})}
							</span>
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
