import React, { useContext, useEffect, useState, useRef } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Link } from "@reach/router";
import { userInfoContext, popBoxContext } from "../common/context";
import { TransactionHistory } from "./deposit.historyResult";
import {
	api_payment_GetDepositInfoRecent,
	api_payment_SetDepositCancel
} from "../../service/api/payment";
import { isConvert } from "../common/common";
import defPopBoxType from "../common/defPopBoxType";
import ReloadSpin from "../common/reloadSpin";
import path from "../../router";

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const _isConvert = isConvert(userInfo.currencyId);
	const [getHistory, setGetHistory] = useState(null);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		GetRecentDatas();
	}, []);

	const GetRecentDatas = () => {
		api_payment_GetDepositInfoRecent().then(res => {
			if (isMountedRef.current) {
				if (res.data.errorCode === 0) {
					setGetHistory(res.data.data);
				} else {
					alert(res.data.message);
				}
			}
		});
	};

	const ClosePopBox = () => {
		setPopBox({ isOpen: false });
	};

	const SubmitProof = (
		bankInfo,
		depositRep,
		amount,
		transId,
		picFileName,
		refId
	) => {
		const { currencyId, ...restBankInfo } = bankInfo;
		const { accountName, accountNo } = depositRep;
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.UploadBankSlip,
			depositTime: `${moment().format("yyyy-MM-DD ")}${moment().format(
				"hh:mm A"
			)}`,
			...restBankInfo,
			transId,
			accountNo,
			accountName,
			isOpen: true,
			amount,
			picFileName,
			refId,
			refreshDatas: GetRecentDatas,
			_isConvert
		});
	};

	const ClickCancel = transId => {
		const ClickConfirm = () => {
			setPopBox({ isOpen: false });
			api_payment_SetDepositCancel(transId).then(res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setGetHistory(prevState => {
							const newD = [...prevState];
							const idx = newD.findIndex(
								x => x.transId === transId
							);
							newD[idx].status = 5;
							return newD;
						});
					}
				}
			});
		};

		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Cancel,
			btnBar: (
				<div className="btnGroup">
					<button className="gray" onClick={ClickConfirm}>
						{t("lbl_Yes")}
					</button>
					<button className="orange" onClick={ClosePopBox}>
						{t("lbl_No")}
					</button>
				</div>
			)
		});
	};

	const arr = getHistory?.map((item, i) => {
		return (
			<TransactionHistory
				key={`deposit-recent-${item.transId}`}
				{...item}
				_isConvert={_isConvert}
				idx={i + 1}
				ClickCancel={ClickCancel.bind(this, item.transId)}
				SubmitProof={SubmitProof.bind(
					this,
					item.bankInfo,
					item.depositRep,
					item.amount,
					item.transId,
					item.picFileName,
					item.refId
				)}
			/>
		);
	});

	return (
		<>
			<div className="list">
				<div className="listHeader">
					<div>{t("lbl_NO")}</div>
					<div>
						{t("lbl_Date")} ({moment().format("Z")})
					</div>
					<div>{t("lbl_ID")}</div>
					<div>{t("lbl_Method")}</div>
					<div>{t("lbl_Amount")}</div>
					<div>{t("lbl_Status")}</div>
					<div>
						{t("lbl_Action")}
						<ReloadSpin func={GetRecentDatas} />
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
				to={`/${userInfo.langId}/${path.depositHistory.root}`}
				className="icon icon-books"
			/>
		</>
	);
};
