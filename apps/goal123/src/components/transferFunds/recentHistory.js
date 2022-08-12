import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Link } from "gatsby";
import { userInfoContext } from "../common/context";
import { TransactionHistory } from "./historyResult";
import path from "../../router";
import ReloadSpin from "../common/reloadSpin";

const transferDirection = (
	direction,
	displayMainWallet,
	displayAdjustment,
	isAdjustment,
	tpName
) => {
	let startWallet = "";
	let endWallet = "";
	if (direction === 1) {
		if (isAdjustment) {
			startWallet = tpName;
			endWallet = displayAdjustment;
		} else {
			startWallet = displayMainWallet;
			endWallet = tpName;
		}
	} else if (isAdjustment) {
		startWallet = tpName;
		endWallet = displayAdjustment;
	} else {
		startWallet = tpName;
		endWallet = displayMainWallet;
	}
	return { startWallet, endWallet };
};

const History = props => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	const arr = props.getHistory?.map((item, i) => {
		const _transferDirection = transferDirection(
			item.direction,
			t("lbl_MainWallet"),
			t("lbl_Adjustment"),
			item.isAdjustment,
			item.tpName
		);
		const _status = item.status === 0 ? t("lbl_Success") : t("lbl_Fail");
		const _statusColor = item.status === 0 ? "approved" : "cancel";
		return (
			<TransactionHistory
				key={`transfer-recent-${item.transId}`}
				idx={i + 1}
				createTime={item.createTime}
				transId={item.transId}
				amount={item.amount}
				startWallet={_transferDirection.startWallet}
				endWallet={_transferDirection.endWallet}
				status={_status}
				statusColor={_statusColor}
				t={t}
			/>
		);
	});

	return (
		<>
			<div className="list">
				<div className="tip active">{t("msg_AmountFormatTip")}</div>
				<div className="listHeader">
					<div>{t("lbl_NO")}</div>
					<div>{t("lbl_Date")} (+07:00)</div>
					<div>{t("lbl_ID")}</div>
					<div>{t("lbl_Direction")}</div>
					<div>{t("lbl_Amount")}</div>
					<div>
						{t("lbl_Status")}
						<ReloadSpin func={props.getTransferRecent} />
					</div>
				</div>
				{props.getHistory?.length > 0 ? (
					<div className="listBody">{arr}</div>
				) : (
					<div className="nodata icon icon-nodata">
						{t("lbl_NoData")}
					</div>
				)}
			</div>
			<Link
				to={`/${userInfo.langId}/${path.transferHistory.root}`}
				className="icon icon-books"
			/>
		</>
	);
};

History.defaultProps = {
	getHistory: null,
	getTransferRecent: () => null
};

History.propTypes = {
	getHistory: PropTypes.arrayOf(PropTypes.any),
	getTransferRecent: PropTypes.func
};

export default History;
