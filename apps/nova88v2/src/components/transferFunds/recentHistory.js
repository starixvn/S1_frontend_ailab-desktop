import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Link } from "gatsby";
import { userInfoContext } from "../common/context";
import { TransactionHistory } from "./historyResult";
import path from "../../router";
import ReloadSpin from "../common/reloadSpin";
import { isConvert, currencyIdToTimeZone } from "../common/common";
import { defHistoryIdList } from "../history/def";

const transferDirection = (direction, tpName, t) => {
	let startWallet = "";
	let endWallet = "";
	if (direction === 1) {
		startWallet = t("lbl_MainWallet");
		endWallet = tpName;
	} else {
		startWallet = tpName;
		endWallet = t("lbl_MainWallet");
	}
	return { startWallet, endWallet };
};

const History = ({ getHistory, getTransferRecent }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const _isConvert = isConvert(userInfo.currencyId);
	const timeZone = currencyIdToTimeZone[userInfo.currencyId];

	const arr = getHistory?.map((item, i) => {
		const _transferDirection = transferDirection(
			item.direction,
			item.tpName,
			t
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
				_isConvert={_isConvert}
				timeZone={timeZone}
			/>
		);
	});

	return (
		<>
			<div className="list">
				<div className="listHeader">
					<div>{t("lbl_NO")}</div>
					<div>
						{t("lbl_Date")} (
						{currencyIdToTimeZone[userInfo.currencyId]})
					</div>
					<div>{t("lbl_ID")}</div>
					<div>{t("lbl_Direction")}</div>
					<div>{t("lbl_Amount")}</div>
					<div>
						{t("lbl_Status")}
						<ReloadSpin
							btnActive={false}
							func={getTransferRecent}
						/>
					</div>
				</div>
				{getHistory?.length > 0 ? (
					<div className="listBody">{arr}</div>
				) : (
					<div className="nodata icon icon-nodata">
						<div>{t("lbl_NoData")}</div>
					</div>
				)}
			</div>
			<Link
				to={`/${userInfo.langId}/${path.history.root}?kind=${defHistoryIdList.transferId}`}
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
