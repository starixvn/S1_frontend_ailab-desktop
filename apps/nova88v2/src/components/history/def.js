import React from "react";
import moment from "moment";
import { number_format } from "../common/common";
import ReloadSpin from "../common/reloadSpin";
import { withdrawalStatus } from "../withdrawal/withdrawal.historyResult";
import allowedCurrencyList from "../../datas/allowedCurrencyList";

export const defDepositStatusClassName = {
	1: "pending",
	2: "paid",
	3: "approved",
	4: "reject",
	5: "cancel"
};

export const defWithdrawalStatusClassName = {
	1: "pending",
	2: "pending",
	3: "approved",
	4: "reject",
	5: "cancel"
};

export const defHistoryIdList = {
	transferId: "transfer",
	depositId: "deposit",
	withdrawalId: "withdrawal",
	financialId: "log",
	referralId: "referral",
	referralDetailId: "referralDetailId"
};

export const defHistoryNav = [
	{
		displayKey: "lbl_Transfer",
		id: defHistoryIdList.transferId,
		allowCurrencies: allowedCurrencyList.transferFunds
	},
	{
		displayKey: "lbl_Deposit",
		id: defHistoryIdList.depositId
	},
	{ displayKey: "lbl_Withdrawal", id: defHistoryIdList.withdrawalId },
	{ displayKey: "lbl_Financial", id: defHistoryIdList.financialId },
	{
		displayKey: "lbl_Referral",
		id: defHistoryIdList.referralId
	}
];
export const defColumns = ({
	t,
	_isConvert,
	keepData,
	updateHistoryList,
	transferDirection,
	depositActivateUploadModal,
	depositActivateCancelConfirmModal,
	activateWithdrawalCancelConfirmModal,
	timeZone,
	SubmitProof,
	handleRefFriendDetail
}) => ({
	[defHistoryIdList.transferId]: [
		{
			title: t("lbl_NO"),
			dataIndex: "no",
			key: "no",
			render: (_, index) => index + 1
		},
		{
			title: `${t("lbl_Date")} (${timeZone})`,
			dataIndex: "createTime",
			key: "createTime",
			render: item => (
				<>
					{moment(item.createTime, "YYYY-MM-DDThh:mm:ssZ")
						.zone(timeZone)
						.format("DD/MM/YYYY")}
					<span className="txt-blue">
						{moment(item.createTime, "YYYY-MM-DDThh:mm:ssZ")
							.zone(timeZone)
							.format("HH:mm:ss")}
					</span>
				</>
			)
		},
		{
			title: t("lbl_ID"),
			dataIndex: "transId",
			key: "transId"
		},
		{
			title: t("lbl_Direction"),
			dataIndex: "direction",
			key: "direction",
			render: item => {
				const { startWallet, endWallet } = transferDirection(
					item.direction,
					t("lbl_MainWallet"),
					t("lbl_Adjustment"),
					item.isAdjustment,
					item.tpName
				);

				return (
					<>
						<span className="txt-blue">{startWallet}</span>
						{item.isAdjustment ? (
							<i>&nbsp;&nbsp;</i>
						) : (
							<i className="icon icon-keyboard_arrow_right" />
						)}
						{endWallet}
					</>
				);
			}
		},
		{
			title: t("lbl_Amount"),
			dataIndex: "amount",
			key: "amount",
			render: item => number_format(item.amount, _isConvert)
		},
		{
			title: (
				<>
					{t("lbl_Status")}

					<ReloadSpin
						func={() =>
							updateHistoryList(
								keepData?.startDate ??
									moment().format("YYYY-MM-DD"),
								keepData?.endDate ??
									moment().format("YYYY-MM-DD"),
								false
							)
						}
					/>
				</>
			),
			dataIndex: "status",
			key: "status",
			render: item => {
				const statusClassName =
					item.status === 0 ? "approved" : "cancel";
				const statusText =
					item.status === 0 ? t("lbl_Success") : t("lbl_Fail");

				return <div className={statusClassName}>{statusText}</div>;
			}
		}
	],
	[defHistoryIdList.depositId]: [
		{
			title: t("lbl_NO"),
			dataIndex: "no",
			key: "no",
			render: (_, index) => index + 1
		},
		{
			title: `${t("lbl_Date")} (${timeZone})`,
			dataIndex: "createTime",
			key: "createTime",
			render: item => (
				<>
					{moment(item.createTime, "YYYY-MM-DDThh:mm:ssZ")
						.zone(timeZone)
						.format("MM/DD/YYYY")}
					<span className="txt-blue">
						{moment(item.createTime, "YYYY-MM-DDThh:mm:ssZ")
							.zone(timeZone)
							.format("hh:mm:ss A")}
					</span>
				</>
			)
		},
		{
			title: t("lbl_ID"),
			dataIndex: "transId",
			key: "transId"
		},
		{
			title: t("lbl_Method"),
			dataIndex: "depositType",
			key: "depositType",
			render: item => t(`lbl_DepositType${item.depositType}`)
		},
		{
			title: t("lbl_Amount"),
			dataIndex: "amount",
			key: "amount",
			render: item => number_format(item.amount, _isConvert)
		},
		{
			title: t("lbl_Status"),
			dataIndex: "status",
			key: "status",
			render: item => {
				const statusClassName = defDepositStatusClassName[item.status];
				const statusText = t(`lbl_DepositStatus${item.status}`);

				return <div className={statusClassName}>{statusText}</div>;
			}
		},
		{
			title: (
				<>
					{t("lbl_Action")}
					<ReloadSpin
						func={() =>
							updateHistoryList(
								keepData?.startDate ??
									moment().format("YYYY-MM-DD"),
								keepData?.endDate ??
									moment().format("YYYY-MM-DD"),
								false
							)
						}
					/>
				</>
			),
			dataIndex: "action",
			key: "action",
			render: item => {
				let result = null;
				if (
					item.depositType === 3 &&
					(item.status === 1 || item.status === 7)
				)
					result = (
						<>
							<button
								className="orange icon icon-pencil"
								onClick={SubmitProof.bind(
									this,
									item.bankInfo,
									item.depositRep,
									item.amount,
									item.transId,
									item.picFileName,
									item.refId,
									item.depositTime,
									item.depositReceipt
								)}>
								{t("lbl_SubmitProof")}
							</button>
							<button
								className="gray"
								onClick={() =>
									depositActivateCancelConfirmModal({
										keepData,
										transId: item.transId
									})
								}>
								{t("lbl_Cancel")}
							</button>
						</>
					);
				return (
					<div className="btnGroup">
						{result}
						{item.thirdId}
					</div>
				);
			}
		}
	],
	[defHistoryIdList.withdrawalId]: [
		{
			title: t("lbl_NO"),
			dataIndex: "no",
			key: "no",
			render: (_, index) => index + 1
		},
		{
			title: `${t("lbl_Date")} (${timeZone})`,
			dataIndex: "createTime",
			key: "createTime",
			render: item => (
				<>
					{moment(item.createTime, "YYYY-MM-DDThh:mm:ssZ")
						.zone(timeZone)
						.format("DD/MM/YYYY")}
					<span className="txt-blue2">
						{moment(item.createTime, "YYYY-MM-DDThh:mm:ssZ")
							.zone(timeZone)
							.format("HH:mm:ss")}
					</span>
				</>
			)
		},
		{
			title: t("lbl_ID"),
			dataIndex: "transId",
			key: "transId"
		},
		{
			title: t("lbl_Amount"),
			dataIndex: "amount",
			key: "amount",
			render: item => number_format(item.amount, false)
		},
		{
			title: t("lbl_Status"),
			dataIndex: "status",
			key: "status",
			render: item => {
				const statusClassName =
					defWithdrawalStatusClassName[item.status];
				const statusText = t(`lbl_WithdrawalStatus${item.status}`);

				return <div className={statusClassName}>{statusText}</div>;
			}
		},
		{
			title: (
				<>
					{t("lbl_Action")}
					<ReloadSpin
						func={() =>
							updateHistoryList(
								keepData?.startDate ??
									moment().format("YYYY-MM-DD"),
								keepData?.endDate ??
									moment().format("YYYY-MM-DD"),
								false
							)
						}
					/>
				</>
			),
			dataIndex: "action",
			key: "action",
			render: item => {
				const showingCancelBtn =
					item.canCancel !== false &&
					(item.status === withdrawalStatus.pending ||
						item.status === withdrawalStatus.toKyc);

				return (
					showingCancelBtn && (
						<div className="btnGroup">
							<button
								className="btn-cancel"
								onClick={() =>
									activateWithdrawalCancelConfirmModal(
										item.transId
									)
								}>
								{t("lbl_Cancel")}
							</button>
						</div>
					)
				);
			}
		}
	],
	[defHistoryIdList.financialId]: [
		{
			title: t("lbl_NO"),
			dataIndex: "no",
			key: "no",
			render: (_, index) => index + 1
		},
		{
			title: `${t("lbl_Date")} (${timeZone})`,
			dataIndex: "createTime",
			key: "createTime",
			render: item => (
				<>
					{moment(item.createTime, "YYYY-MM-DDThh:mm:ssZ")
						.zone(timeZone)
						.format("DD/MM/YYYY")}
					<span className="txt-blue">
						{moment(item.createTime, "YYYY-MM-DDThh:mm:ssZ")
							.zone(timeZone)
							.format("HH:mm:ss")}
					</span>
				</>
			)
		},
		{
			title: t("lbl_RefTransId"),
			dataIndex: "refTransId",
			key: "refTransId"
		},
		{
			title: t("lbl_TypeName"),
			dataIndex: "typeName",
			key: "typeName"
		},
		{
			title: t("lbl_ChangeAmount"),
			dataIndex: "changeAmount",
			key: "changeAmount",
			render: item => number_format(item.changeAmount, _isConvert)
		},
		{
			title: t("lbl_BeforeAmount"),
			dataIndex: "beforeAmount",
			key: "beforeAmount",
			render: item => number_format(item.beforeAmount, _isConvert)
		},
		{
			title: (
				<>
					{t("lbl_AfterAmount")}
					<ReloadSpin
						func={() =>
							updateHistoryList(
								keepData?.startDate ??
									moment().format("YYYY-MM-DD"),
								keepData?.endDate ??
									moment().format("YYYY-MM-DD"),
								false
							)
						}
					/>
				</>
			),
			dataIndex: "afterAmount",
			key: "afterAmount",
			render: item => number_format(item.afterAmount, _isConvert)
		}
	],
	[defHistoryIdList.referralId]: [
		{
			title: t("lbl_NO"),
			dataIndex: "no",
			key: "no",
			render: (_, index) => index + 1
		},
		{
			title: `${t("lbl_Date")} (${timeZone})`,
			dataIndex: "settledDate",
			key: "settledDate",
			render: item =>
				moment(item.settledDate, "YYYY-MM-DDThh:mm:ssZ")
					.zone(timeZone)
					.format("DD/MM/YYYY")
		},
		{
			title: t("lbl_TotalDeposit"),
			dataIndex: "totalDeposit",
			key: "totalDeposit",
			render: item => number_format(item.totalDeposit, _isConvert)
		},
		{
			title: t("lbl_RewardAmount"),
			dataIndex: "rewardAmount",
			key: "rewardAmount",
			render: item => number_format(item.rewardAmount, _isConvert)
		},

		{
			title: (
				<>
					{t("lbl_Status")}
					<ReloadSpin
						func={() =>
							updateHistoryList(
								keepData?.startDate ??
									moment().format("YYYY-MM-DD"),
								keepData?.endDate ??
									moment().format("YYYY-MM-DD"),
								false
							)
						}
					/>
				</>
			),
			dataIndex: "referralStatus",
			key: "referralStatus",
			render: item => (
				<button
					className="txt-blue"
					onClick={() => {
						const payload = {
							startDate: moment(item.settledDate).unix(),
							endDate: moment(item.settledDate)
								.endOf("day")
								.unix(),
							pageNumber: 1,
							pageSize: 10
						};

						handleRefFriendDetail(payload);
					}}
				>
					{t("lbl_Details")}
				</button>
			)
		}
	],
	[defHistoryIdList.referralDetailId]: [
		{
			title: t("lbl_NO"),
			dataIndex: "no",
			key: "no",
			render: (_, index) => index + 1
		},
		{
			title: `${t("lbl_Date")} (${timeZone})`,
			dataIndex: "settledDate",
			key: "settledDate",
			render: item =>
				moment(item.settledDate, "YYYY-MM-DDThh:mm:ssZ")
					.zone(timeZone)
					.format("DD/MM/YYYY")
		},
		{
			title: t("lbl_Username"),
			dataIndex: "userName",
			key: "userName"
		},
		{
			title: t("lbl_TotalDeposit"),
			dataIndex: "totalDeposit",
			key: "totalDeposit",
			render: item => number_format(item.totalDeposit, _isConvert)
		},
		{
			title: t("lbl_RewardAmount"),
			dataIndex: "rewardAmount",
			key: "rewardAmount",
			render: item => number_format(item.rewardAmount, _isConvert)
		}
	]
});
