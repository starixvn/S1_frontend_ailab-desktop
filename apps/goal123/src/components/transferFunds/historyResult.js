import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { number_format } from "../common/common";

export const TransactionHistory = props => (
	<div>
		<div>{props.idx}</div>
		<div>
			{moment(props.createTime, "YYYY-MM-DDThh:mm:ssZ")
				.zone("+07:00")
				.format("DD/MM/YYYY")}
			<span className="txt-blue2">
				{moment(props.createTime, "YYYY-MM-DDThh:mm:ssZ")
					.zone("+07:00")
					.format("HH:mm:ss")}
			</span>
		</div>
		<div>{props.transId}</div>
		<div>
			<span className="txt-blue2">{props.startWallet}</span>
			<i className="icon icon-keyboard_arrow_right" />
			{props.endWallet}
		</div>
		<div>{number_format({ number: props.amount })}</div>
		<div className={props.statusColor}>{props.status}</div>
	</div>
);

TransactionHistory.defaultProps = {
	startWallet: null,
	endWallet: null,
	statusColor: null
};

TransactionHistory.propTypes = {
	idx: PropTypes.number.isRequired,
	createTime: PropTypes.string.isRequired,
	transId: PropTypes.string.isRequired,
	amount: PropTypes.number.isRequired,
	status: PropTypes.number.isRequired,
	startWallet: PropTypes.string,
	endWallet: PropTypes.string,
	statusColor: PropTypes.string
};
