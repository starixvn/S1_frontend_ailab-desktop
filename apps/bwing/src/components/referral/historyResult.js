import React from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { number_format } from "../common/common";

export default props => {
	const { t } = useTranslation();
	return (
		<div key={`referral-${props.idx}`}>
			<div>{props.idx + 1}</div>
			<div>{props.userName}</div>
			<div>
				{moment(props.createTime).format("DD/MM/YYYY")}
				<span className="txt-blue2">
					{moment(props.createTime).format("HH:mm:ss")}
				</span>
			</div>
			<div>{t(`Currency_${props.currencyId}`)}</div>
			<div>
				{number_format(props.totalDeposit, _isConvert)} /{" "}
				{number_format(props.depositC, _isConvert)}
			</div>
			<div>
				{number_format(props.totalBet, _isConvert)} /{" "}
				{number_format(props.vaildBetC, _isConvert)}
			</div>
			<div>{number_format(props.bonusAmount, _isConvert)}</div>
			<div>{t(`lbl_ReferralStatus${props.status}`)}</div>
		</div>
	);
};
