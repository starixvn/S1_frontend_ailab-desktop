import React from "react";
import { number_format, isConvert } from "../common/common";
import ReloadSpin from "../common/reloadSpin";
import { defPromotionType, promoStatus } from "./promotion.def";

export default ({
	custRollOver,
	custTurnOver,
	isJoin,
	t,
	currencyId,
	refreshProcessBar,
	hideReloadBtn,
	promotionType,
	status,
	fullFillType
}) => {
	if (
		isJoin &&
		status !== promoStatus.Fulfill &&
		status !== promoStatus.Canceled &&
		promotionType !== defPromotionType.cashback &&
		promotionType !== defPromotionType.rebate
	) {
		const _isConvert = isConvert(currencyId);
		const percentage =
			custTurnOver >= custRollOver
				? 100
				: ((custTurnOver / custRollOver) * 100).toFixed(2);

		return (
			<div className="progressBarModule">
				<div className="bounsName">
					{fullFillType === 2
						? t("lbl_WinOverAccumulated")
						: t("lbl_TurnoverAccumulated")}
				</div>
				<div className="turnover">
					<span>
						{t(`Currency_${currencyId}`)}{" "}
						{number_format(custTurnOver, _isConvert)}
					</span>{" "}
					({t("lbl_Req")} {t(`Currency_${currencyId}`)}{" "}
					{number_format(custRollOver, _isConvert)})
					{hideReloadBtn ? null : (
						<ReloadSpin func={refreshProcessBar} />
					)}
				</div>
				<div className="progressBar">
					<div className="bar">
						<div
							className="progress"
							style={{ width: `${percentage}%` }}
						/>
					</div>
					<div className="percentage">{percentage}%</div>
				</div>
			</div>
		);
	}

	return null;
};
