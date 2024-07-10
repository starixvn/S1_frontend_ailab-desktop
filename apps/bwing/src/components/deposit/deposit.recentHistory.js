import React, { useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { Link } from "gatsby";
import { defPopBoxType } from "../common/defPopBoxType";
import { userInfoContext, popBoxContext } from "../common/context";
import { isConvert } from "../common/common";
import { TransactionHistory } from "./deposit.historyResult";
import { api_payment_SetDepositCancel } from "../../service/api/payment";
import ReloadSpin from "../common/reloadSpin";
import path from "../../router";
import usePopBox from "../hook/usePopBox";

const DepositRecentHistory = ({
	asyncUploadBankPopBox,
	getDepositInfoRecent,
	depositInfoRecentDatas,
	setDepositInfoRecentDatas,
	uploadLocalBankReceipt,
	setLocalBankReceipt,
	submitHandle
}) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox } = usePopBox();
	const _isConvert = isConvert(userInfo.currencyId);
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

	const SubmitProof = async (
		bankInfo,
		depositRep,
		amount,
		transId,
		picFileName,
		historyRefId,
		historyDepositTime,
		depositReceipt = [],
		depositType
	) => {
		const { bankName, bankSite } = bankInfo || {};
		const { accountName, accountNo, code } = depositRep || {};

		const uploadPopBoxResult = await asyncUploadBankPopBox({
			formInfo: {
				imgFile: {
					name: picFileName
				},
				refId: historyRefId,
				time: historyDepositTime
			},
			localBankInfo: {
				bankName,
				bankSite,
				accountNo,
				accountName,
				transId,
				amount,
				code
			},
			_isConvert,
			langId: userInfo.langId,
			receiptInfo: depositReceipt,
			depositType
		});

		if (uploadPopBoxResult.success) {
			const {
				datas: { depositTime, depositRefNo, depositImgFiles }
			} = uploadPopBoxResult;

			const isSameRefId = historyRefId === depositRefNo.value;

			const isSameDepositTime = moment(depositTime.value).isSame(
				moment(historyDepositTime)
			);

			if (depositImgFiles.file) {
				await uploadLocalBankReceipt({
					imgFile: depositImgFiles.file,
					transId
				});
			}

			if (!isSameDepositTime || !isSameRefId) {
				await setLocalBankReceipt({
					transId,
					depositTime: depositTime.value,
					fefNo: depositRefNo.value
				});
			}

			if (depositImgFiles.file || !isSameDepositTime || !isSameRefId)
				getDepositInfoRecent();
		}
	};

	const ClickCancel = transId => {
		const ClickConfirm = async () => {
			await setPopBox({ isOpen: false });
			api_payment_SetDepositCancel(transId).then(
				res => {
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
						} else {
							errorPopBox(
								res.data.message || "error",
								res.data.errorCode
							);
						}
					}
				},
				() => {
					errorPopBox();
				}
			);
		};

		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.Cancel,
			onClickClose: ClosePopBox,
			btnBar: (
				<div className="btnGroup">
					<button
						className="gray"
						onClick={async () => {
							await ClickConfirm();
							submitHandle();
						}}>
						{t("lbl_Yes")}
					</button>
					<button className="orange" onClick={ClosePopBox}>
						{t("lbl_No")}
					</button>
				</div>
			)
		});
	};

	const arr = depositInfoRecentDatas?.map((item, i) => (
		<TransactionHistory
			key={`deposit-recent-${item.transId}`}
			{...item}
			idx={i + 1}
			ClickCancel={ClickCancel.bind(this, item.transId)}
			SubmitProof={SubmitProof.bind(
				this,
				item.bankInfo,
				item.depositRep,
				item.amount,
				item.transId,
				item.picFileName,
				item.refId,
				item.depositTime,
				item.depositReceipt,
				item.depositType
			)}
			depositMessageDetail={item.depositMessageDetail}
		/>
	));

	return (
		<>
			<div className="list">
				<div className="tip active">{t("msg_AmountFormatTip")}</div>
				<div className="listHeader">
					<div>{t("lbl_NO")}</div>
					<div>{t("lbl_Date")} (+07:00)</div>
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

DepositRecentHistory.propTypes = {
	asyncUploadBankPopBox: PropTypes.func.isRequired,
	getDepositInfoRecent: PropTypes.func.isRequired,
	depositInfoRecentDatas: PropTypes.arrayOf(PropTypes.any).isRequired,
	setDepositInfoRecentDatas: PropTypes.func.isRequired,
	uploadLocalBankReceipt: PropTypes.func.isRequired,
	setLocalBankReceipt: PropTypes.func.isRequired,
	submitHandle: PropTypes.func.isRequired
};
export default DepositRecentHistory;
