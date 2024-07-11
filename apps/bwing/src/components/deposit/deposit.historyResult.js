import React, { useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useTranslation } from "react-i18next";
import {
	AllowUploadReceiptType,
	WithReceiptInfoType
} from "@ailab-desktop/common";
import { defPopBoxType } from "../common/defPopBoxType";
import { number_format } from "../common/common";
import { popBoxContext } from "../common/context";

const statusClassName = {
	1: "pending",
	2: "paid",
	3: "approved",
	4: "reject",
	5: "cancel"
};

export const TransactionHistory = props => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const isShowReceiptInfo = WithReceiptInfoType.includes(props.depositType);

	let btnGroup = null;
	if (
		// 存款方式
		AllowUploadReceiptType.includes(props.depositType) &&
		// 存款狀態
		(props.status === 1 || props.status === 7)
	) {
		btnGroup = (
			<>
				<button
					className="orange icon icon-pencil"
					onClick={() => props.SubmitProof(isShowReceiptInfo)}>
					{t("lbl_SubmitProof")}
				</button>
				<button className="gray" onClick={props.ClickCancel}>
					{t("lbl_Cancel")}
				</button>
			</>
		);
	}

	const handleClickInfoBtn = () => {
		setPopBox({
			isOpen: true,
			transId: props.transId,
			depositMessageDetail: props.depositMessageDetail,
			popBoxType: defPopBoxType.DepositMsg
		});
	};

	return (
		<div>
			<div>{props.idx}</div>
			<div>
				{moment(props.createTime, "YYYY-MM-DDThh:mm:ssZ")
					.zone("+07:00")
					.format("MM/DD/YYYY")}
				<span className="txt-blue">
					{moment(props.createTime, "YYYY-MM-DDThh:mm:ssZ")
						.zone("+07:00")
						.format("hh:mm:ss A")}
				</span>
			</div>
			<div>{props.transId}</div>
			<div>{t(`lbl_DepositType${props.depositType}`)}</div>
			<div>
				{number_format({
					number: props.amount,
					formatRequired: props._isConvert
				})}
			</div>
			<div className={statusClassName[props.status]}>
				{t(`lbl_DepositStatus${props.status}`)}
				{props.depositMessageDetail &&
					props.depositMessageDetail.length > 0 && (
						<button
							className="infobtn"
							onClick={handleClickInfoBtn}
						/>
					)}
			</div>
			<div className="btnGroup">
				{btnGroup}

				{props.thirdId}
			</div>
		</div>
	);
};

TransactionHistory.defaultProps = {
	thirdId: null,
	depositMessageDetail: []
};

TransactionHistory.propTypes = {
	depositType: PropTypes.number.isRequired,
	ClickCancel: PropTypes.func.isRequired,
	thirdId: PropTypes.string,
	idx: PropTypes.number.isRequired,
	createTime: PropTypes.string.isRequired,
	transId: PropTypes.string.isRequired,
	amount: PropTypes.number.isRequired,
	_isConvert: PropTypes.bool.isRequired,
	status: PropTypes.number.isRequired,
	SubmitProof: PropTypes.func.isRequired,
	depositMessageDetail: PropTypes.arrayOf(PropTypes.any)
};
