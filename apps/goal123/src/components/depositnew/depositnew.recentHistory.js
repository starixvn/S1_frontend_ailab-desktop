import React, { useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Link } from "@reach/router";
import { userInfoContext, popBoxContext } from "../common/context";
import { TransactionHistory } from "./deposit.historyResult";
import { api_payment_SetDepositCancel } from "../../service/api/payment";
import { defPopBoxType } from "../common/popBox";
import ReloadSpin from "../common/reloadSpin";
import path from "../../router";

const DepositnewRecentHistory = ({
	asyncUploadBankPopBox,
	getDepositInfoRecent,
	depositInfoRecentDatas,
	setDepositInfoRecentDatas,
	uploadLocalBankReceipt
}) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		getDepositInfoRecent();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const ClosePopBox = () => {
		setPopBox({ isOpen: false });
	};

	const SubmitProof = async (bankInfo, depositRep, transId, picFileName) => {
		const { bankName } = bankInfo;
		const { accountName, accountNo } = depositRep;

		const uploadPopBoxResult = await asyncUploadBankPopBox({
			formInfo: {
				imgFile: {
					name: picFileName
				}
			},
			localBankInfo: {
				bankName,
				accountNo,
				accountName,
				transId
			},
			langId: userInfo.langId
		});

		if (uploadPopBoxResult.success) {
			const {
				datas: { depositImgFiles }
			} = uploadPopBoxResult;

			if (!depositImgFiles.file) return;

			await uploadLocalBankReceipt({
				imgFile: depositImgFiles.file,
				transId
			});

			getDepositInfoRecent();
		}
	};

	const ClickCancel = transId => {
		const ClickConfirm = () => {
			setPopBox({ isOpen: false });
			api_payment_SetDepositCancel(transId).then(res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						setDepositInfoRecentDatas(prevState => {
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

	const arr = depositInfoRecentDatas?.map((item, i) => {
		return (
			<TransactionHistory
				key={`deposit-recent-${item.transId}`}
				{...item}
				idx={i + 1}
				ClickCancel={ClickCancel.bind(this, item.transId)}
				SubmitProof={SubmitProof.bind(
					this,
					item.bankInfo,
					item.depositRep,
					item.transId,
					item.picFileName
				)}
			/>
		);
	});

	return (
		<>
			<div className="list">
				<div className="tip active">{t("msg_AmountFormatTip")}</div>
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
						<ReloadSpin func={getDepositInfoRecent} />
					</div>
				</div>
				{depositInfoRecentDatas?.length > 0 ? (
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

DepositnewRecentHistory.propTypes = {
	asyncUploadBankPopBox: PropTypes.func.isRequired,
	getDepositInfoRecent: PropTypes.func.isRequired,
	depositInfoRecentDatas: PropTypes.arrayOf(PropTypes.any).isRequired,
	setDepositInfoRecentDatas: PropTypes.func.isRequired,
	uploadLocalBankReceipt: PropTypes.func.isRequired
};
export default DepositnewRecentHistory;
