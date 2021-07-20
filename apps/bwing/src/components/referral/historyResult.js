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
				{number_format({ number: props.totalDeposit })} /{" "}
				{number_format({ number: props.depositC })}
			</div>
			<div>
				{number_format({ number: props.totalBet })} /{" "}
				{number_format({ number: props.vaildBetC })}
			</div>
			<div>{number_format({ number: props.bonusAmount })}</div>
			<div>{t(`lbl_ReferralStatus${props.status}`)}</div>
		</div>
	);
};
