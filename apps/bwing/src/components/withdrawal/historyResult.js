import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { number_format } from "../common/common";

const statusClassName = {
	1: "pending",
	2: "pending",
	3: "approved",
	4: "reject",
	5: "cancel",
	7: "reject"
};

export const TransactionHistory = props => {
	const { t } = useTranslation();

	let btnGroup = null;
	if (props.status === 1 || props.status === 8) {
		btnGroup = (
			<button className="btn-cancel" onClick={props.ClickCancel}>
				{t("lbl_Cancel")}
			</button>
		);
	}

	return (
		<div>
			<div>{props.idx}</div>
			<div>
				{moment(props.createTime, "YYYY-MM-DDThh:mm:ssZ")
					.zone("+07:00")
					.format("DD/MM/YYYY")}
				<span className="txt-blue15">
					{moment(props.createTime, "YYYY-MM-DDThh:mm:ssZ")
						.zone("+07:00")
						.format("HH:mm:ss")}
				</span>
			</div>
			<div>{props.transId}</div>
			<div>{number_format({ number: props.amount })}</div>
			<div className={statusClassName[props.status]}>
				{t(`lbl_WithdrawalStatus${props.status}`)}
			</div>
			<div className="btnGroup">{btnGroup}</div>
		</div>
	);
};

TransactionHistory.propTypes = {
	ClickCancel: PropTypes.func.isRequired,
	idx: PropTypes.number.isRequired,
	createTime: PropTypes.string.isRequired,
	transId: PropTypes.string.isRequired,
	amount: PropTypes.number.isRequired,
	status: PropTypes.number.isRequired
};
