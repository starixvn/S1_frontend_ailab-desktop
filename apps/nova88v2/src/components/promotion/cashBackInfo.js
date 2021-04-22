import React from "react";
import { number_format, isConvert } from "../common/common";

const CashbackInfo = ({ bonusCode, cashBackDetails, t, currencyId }) => {
	const { totalBonus, maxBonus, cashBackDetail } = cashBackDetails;

	const rows = cashBackDetail?.map(c => (
		<tr key={`CashbackInfo-${bonusCode}-${c.tpName}`}>
			<td>{c.tpName}</td>
			<td>
				{number_format(Math.abs(c.lossAmount), isConvert(currencyId))}
			</td>
			<td>{c.percentageName}</td>
			<td>{number_format(c.bonusAmount, isConvert(currencyId))}</td>
		</tr>
	));

	return rows?.length > 0 ? (
		<div className="cashBack">
			<table>
				<tbody>
					<tr>
						<td />
						<td>{t("lbl_LossAmount")}</td>
						<td>{t("lbl_Percentage")}</td>
						<td>{t("lbl_BonusAmount")}</td>
					</tr>
					{rows}
					<tr>
						<td colSpan="4">
							<span>{t("lbl_TotalAmount")}：</span>
							<span>
								{number_format(
									totalBonus,
									isConvert(currencyId)
								)}
							</span>
						</td>
					</tr>
					<tr>
						<td colSpan="4">
							<span>{t("lbl_MaxBonusAmount")}：</span>
							<span>
								{number_format(maxBonus, isConvert(currencyId))}
							</span>
						</td>
					</tr>
					<tr>
						<td colSpan="4">
							<span>{t("lbl_ClaimAmount")}：</span>
							<span>
								{totalBonus > maxBonus
									? number_format(
											maxBonus,
											isConvert(currencyId)
									  )
									: number_format(
											totalBonus,
											isConvert(currencyId)
									  )}
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	) : null;
};

export default CashbackInfo;
