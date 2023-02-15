import React, { useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { number_format } from "../common/common";
import { popBoxContext } from "../common/context";
import { defPopBoxType } from "../common/popBox";

const statusClassName = {
	1: "pending",
	2: "pending",
	3: "approved",
	4: "reject",
	5: "cancel"
};

export const withdrawalStatus = {
	pending: 1,
	onHold: 2,
	verify: 3,
	process: 4,
	cancelled: 5,
	approved: 6,
	rejected: 7,
	toKyc: 8
};

export const TransactionHistory = props => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);

	let btnGroup = null;
	if (
		props.canCancel !== false &&
		(props.status === withdrawalStatus.pending ||
			props.status === withdrawalStatus.toKyc)
	) {
		btnGroup = (
			<button className="btn-cancel" onClick={props.ClickCancel}>
				{t("lbl_Cancel")}
			</button>
		);
	}

	const handleClickInfoBtn = () => {
		setPopBox({
			isOpen: true,
			transId: props.transId,
			withdrawalMessageDetail: props.withdrawalMessageDetail,
			popBoxType: defPopBoxType.WithdrawalMsg
		});
	};

	return (
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
			<div>{number_format({ number: props.amount })}</div>
			<div className={statusClassName[props.status]}>
				{props.status === 8
					? ""
					: t(`lbl_WithdrawalStatus${props.status}`)}
				{props.withdrawalMessageDetail &&
					props.withdrawalMessageDetail.length > 0 && (
						<button
							className="infobtn"
							onClick={handleClickInfoBtn}
						/>
					)}
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
	status: PropTypes.number.isRequired,
	canCancel: PropTypes.bool.isRequired,
	withdrawalMessageDetail: PropTypes.arrayOf(PropTypes.any).isRequired
};
