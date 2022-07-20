import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { number_format } from "../common/common";

export const TransactionHistory = props => (
	<div>
		<div>{props.idx}</div>
		<div>
			{moment(props.createTime, "YYYY-MM-DDThh:mm:ssZ")
				.zone(props.timeZone)
				.format("DD/MM/YYYY")}
			<span className="txt-blue">
				{moment(props.createTime, "YYYY-MM-DDThh:mm:ssZ")
					.zone(props.timeZone)
					.format("HH:mm:ss")}
			</span>
		</div>
		<div>{props.transId}</div>
		<div>
			<span className="txt-blue">{props.startWallet}</span>
			<i className="icon icon-keyboard_arrow_right" />
			{props.endWallet}
		</div>
		<div>{number_format(props.amount, props._isConvert)}</div>
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
	_isConvert: PropTypes.bool.isRequired,
	status: PropTypes.number.isRequired,
	timeZone: PropTypes.string.isRequired,
	startWallet: PropTypes.string,
	endWallet: PropTypes.string,
	statusColor: PropTypes.string
};
