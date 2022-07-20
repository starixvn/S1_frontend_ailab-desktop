import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { number_format } from "../common/common";

const Content = props => {
	const { t } = useTranslation();
	return (
		<div key={`referral-${props.idx}-${props.custId}`}>
			<div>{props.idx}</div>
			<div>{props.userName}</div>
			<div>
				{moment(props.registerDate, "YYYY-MM-DDThh:mm:ssZ")
					.zone("+07:00")
					.format("DD/MM/YYYY")}
				<span className="txt-blue2">
					{moment(props.registerDate, "YYYY-MM-DDThh:mm:ssZ")
						.zone("+07:00")
						.format("HH:mm:ss")}
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

Content.defaultProps = {
	custId: null,
	userName: null,
	registerDate: null,
	currencyId: null,
	totalDeposit: null,
	depositC: null,
	totalBet: null,
	vaildBetC: null,
	bonusAmount: null,
	status: null
};

Content.propTypes = {
	custId: PropTypes.string,
	idx: PropTypes.number.isRequired,
	userName: PropTypes.string,
	registerDate: PropTypes.string,
	currencyId: PropTypes.number,
	totalDeposit: PropTypes.number,
	depositC: PropTypes.number,
	totalBet: PropTypes.number,
	vaildBetC: PropTypes.number,
	bonusAmount: PropTypes.number,
	status: PropTypes.number
};

export default Content;
