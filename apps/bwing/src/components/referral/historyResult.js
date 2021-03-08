import React from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { number_format } from "../common/common";

export default props => {
	const { t } = useTranslation();
	return (
		<div key={`referral-${props.idx}-${props.custId}`}>
			<div>{props.idx}</div>
			<div>{props.userName}</div>
			<div>
				{moment(props.registerDate).format("DD/MM/YYYY")}
				<span className="txt-blue2">
					{moment(props.registerDate).format("HH:mm:ss")}
				</span>
			</div>
			<div>{t(`Currency_${props.currencyId}`)}</div>
			<div>
				{number_format(props.totalDeposit, false)} /{" "}
				{number_format(props.depositC, false)}
			</div>
			<div>
				{number_format(props.totalBet, false)} /{" "}
				{number_format(props.vaildBetC, false)}
			</div>
			<div>{number_format(props.bonusAmount, false)}</div>
			<div>{t(`lbl_ReferralStatus${props.status}`)}</div>
		</div>
	);
};
