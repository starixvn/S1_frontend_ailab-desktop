import React from "react";
import PropTypes from "prop-types";
import { number_format } from "../common/common";

const CashBackInfo = ({ cashBackDetails, t }) => {
	if (!cashBackDetails) return null;

	const { totalBonus, maxBonus, cashBackDetail } = cashBackDetails;
	const formatRule = { isConvertRequired: false, digits: 0 };

	const rows = cashBackDetail?.map(info => (
		<tr key={`CashBackInfo-${info.tpName}`}>
			<td>{info.tpName}</td>
			<td>
				{number_format({
					number: Math.abs(info.lossAmount),
					...formatRule
				})}
			</td>
			<td>{info.percentageName}</td>
			<td>
				{number_format({
					number: Math.abs(info.bonusAmount),
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
						<td>{t("lbl_LossAmount")}</td>
						<td>{t("lbl_Percentage")}</td>
						<td>{t("lbl_TotalAmount")}</td>
					</tr>
					{rows}
					<tr>
						<td colSpan="4">
							<span>{t("lbl_TotalAmount")}：</span>
							<span>
								{number_format({
									number: totalBonus,
									...formatRule
								})}
							</span>
						</td>
					</tr>
					<tr>
						<td colSpan="4">
							<span>{t("lbl_MaxBonusAmount")}：</span>
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
							<span>{t("lbl_ClaimAmount")}：</span>
							<span>
								{totalBonus > maxBonus
									? number_format({
											number: maxBonus,
											...formatRule
									  })
									: number_format({
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
