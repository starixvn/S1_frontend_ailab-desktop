import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { number_format, currencyIdToTimeZone } from "../common/common";

const statusClassName = {
	1: "pending",
	2: "paid",
	3: "approved",
	4: "reject",
	5: "cancel"
};

export const TransactionHistory = props => {
	const { t } = useTranslation();
	let actionContent = null;
	if (props.depositType === 3 && (props.status === 1 || props.status === 7)) {
		actionContent = (
			<>
				<button
					className="orange icon icon-pencil"
					onClick={props.SubmitProof}>
					{t("lbl_SubmitProof")}
				</button>
				<button className="gray" onClick={props.ClickCancel}>
					{t("lbl_Cancel")}
				</button>
			</>
		);
	}

	return (
		props.currencyId && (
			<div>
				<div>{props.idx}</div>
				<div>
					{moment(props.createTime, "YYYY-MM-DDThh:mm:ssZ")
						.zone(currencyIdToTimeZone[props.currencyId])
						.format("MM/DD/YYYY")}
					<span className="txt-blue">
						{moment(props.createTime, "YYYY-MM-DDThh:mm:ssZ")
							.zone(currencyIdToTimeZone[props.currencyId])
							.format("hh:mm:ss A")}
					</span>
				</div>
				<div>{props.transId}</div>
				<div>{t(`lbl_DepositType${props.depositType}`)}</div>
				<div>{number_format(props.amount, props._isConvert)}</div>
				<div className={statusClassName[props.status]}>
					{t(`lbl_DepositStatus${props.status}`)}
				</div>
				<div className="btnGroup">
					{actionContent}
					{props.thirdId}
				</div>
			</div>
		)
	);
};

TransactionHistory.defaultProps = {
	thirdId: null,
	currencyId: null
};

TransactionHistory.propTypes = {
	depositType: PropTypes.number.isRequired,
	SubmitProof: PropTypes.func.isRequired,
	ClickCancel: PropTypes.func.isRequired,
	thirdId: PropTypes.string,
	idx: PropTypes.number.isRequired,
	createTime: PropTypes.string.isRequired,
	transId: PropTypes.string.isRequired,
	amount: PropTypes.number.isRequired,
	_isConvert: PropTypes.bool.isRequired,
	status: PropTypes.number.isRequired,
	currencyId: PropTypes.number
};
