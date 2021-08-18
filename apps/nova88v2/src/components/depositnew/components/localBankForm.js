import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import PropTypes from "prop-types";
import Inputbox from "../../common/inputbox";
import Dropdown from "../../common/dropdown";
import ShortcutAmountList from "./shortcutAmountList";
import { getUrlParameter } from "../../common/common";
import { defDepositChannel, defDepositChannelIdList } from "../depositnew.def";
// import ClipboardJS from "../../../lib/clipboard.min";
import path from "../../../router";
import { cloudImgUrl } from "../../../config";

const LocalBankForm = ({
	t,
	userInfo,
	depositType,
	_isConvert,
	formatAmount,
	localBankGroupList,
	formInfo,
	setFormInfo,
	onChangeAmount,
	onInputboxKeyDown,
	getLocalBankInfo,
	localBankInfo,
	asyncUploadBankPopBox,
	getBankInfo,
	custBankInfoList,
	localBankChannelError,
	localBankBankInfoErrpr
}) => {
	const parameterSysId = Number(getUrlParameter("sysId"));

	const [fromChannelIdIdx, setFromChannelIdIdx] = useState(0);
	const [custBankInfoIdx, setCustBankInfoIdx] = useState(0);
	const [sysIdForRecord, setSysIdForRecord] = useState(parameterSysId);
	const [infoActive, setInfoActive] = useState({
		upload: false
	});

	const clickInfo = col =>
		setInfoActive(prev => ({
			...prev,
			[col]: !prev[col]
		}));

	const onChangeBankInfo = item => {
		window.history.replaceState(
			{},
			"",
			`${window.location.pathname}?type=${depositType}&sysId=${item.sysId}`
		);

		setSysIdForRecord(item.sysId);
		getLocalBankInfo({ sysId: item.sysId });
		setFormInfo(prev => ({ ...prev, ...item }));
	};

	const onOpenUploadBankPopBox = async () => {
		const { bankName, accountNo, accountName, bankSite } = localBankInfo;
		const {
			imgFile
			// , refId, time
		} = formInfo;

		const uploadPopBoxResult = await asyncUploadBankPopBox({
			formInfo: {
				imgFile
				// refId,
				// time
			},
			localBankInfo: {
				bankName,
				bankSite,
				accountNo,
				accountName
			},
			_isConvert,
			currencyId: userInfo.currencyId,
			langId: userInfo.langId
		});

		if (uploadPopBoxResult.success) {
			const {
				datas: {
					// depositTime, depositRefNo,
					depositImgFiles
				}
			} = uploadPopBoxResult;

			setFormInfo(prev => {
				return {
					...prev,
					// time: depositTime.value,
					// refId: depositRefNo.value,
					imgFile: depositImgFiles.file
				};
			});
		}
	};

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		// const _clipboard = new ClipboardJS(".copyBtn");
		if (localBankGroupList.some(item => item.sysId === sysIdForRecord)) {
			const gIdx = localBankGroupList.findIndex(
				item => item.sysId === sysIdForRecord
			);

			onChangeBankInfo(localBankGroupList[gIdx]);
		} else if (localBankGroupList.length > 0) {
			onChangeBankInfo(localBankGroupList[0]);
		}
		getBankInfo();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (localBankGroupList.length <= 0) return null;

	const isShowBankDetails =
		formInfo.fromChannel === defDepositChannelIdList.OnlineBanking ||
		formInfo.fromChannel === defDepositChannelIdList.ATM;

	return (
		<>
			<div className="subModuleTitle">
				<i className="txt-blue">*</i>
				{t("lbl_SelectBank")}
			</div>

			<div className="subModule selectBank">
				<div>
					{localBankGroupList.map(item => {
						const bankLogo = String(item.bankLogo).toLowerCase();

						let className = [];
						if (item.sysId === sysIdForRecord) {
							className.push("active");
						}

						className = className.join(" ");

						return (
							<button
								key={`deposit-localPay-group-${item.sysId}}`}
								className={className}
								onClick={() => onChangeBankInfo(item)}>
								<div>
									<img
										src={`${cloudImgUrl}/SiteSkin/img/BankLogo/${bankLogo}`}
										alt={item.bankName}
									/>
									<i className="icon icon-icon32px_check" />
								</div>

								<div className="bank">
									<div>{item.bankName}</div>

									<div>
										<div>
											{`${t("lbl_Min")}: ${formatAmount(
												item.minAmount
											)}`}
										</div>
										<div>
											{`${t("lbl_Max")}: ${formatAmount(
												item.maxAmount
											)}`}
										</div>
									</div>
								</div>
							</button>
						);
					})}
				</div>
			</div>

			<div className="subModuleTitle">
				<i className="txt-blue">*</i>
				{t("lbl_BankAccount")}
			</div>

			<div className="subModule">
				<div className="bankAccount">
					{t("lbl_TransactionHint")}
					<div className="smallList">
						<ul>
							<li>{t("lbl_BankName")}</li>
							<li>{localBankInfo.bankName}</li>
							<li>
								<a
									target="_blank"
									rel="noreferrer"
									href={localBankInfo.bankSite}
									className="icon icon-new-tab"
								/>
							</li>
						</ul>
						<ul>
							<li>{t("lbl_BankAccountName")}</li>
							<li>{localBankInfo.accountName}</li>
							<button
								className="icon icon-files-empty copyBtn"
								data-clipboard-text={localBankInfo.accountName}
							/>
						</ul>
						<ul>
							<li>{t("lbl_BankNumber")}</li>
							<li>{localBankInfo.accountNo}</li>
							<button
								className="icon icon-files-empty copyBtn"
								data-clipboard-text={localBankInfo.accountNo}
							/>
						</ul>
					</div>
				</div>
			</div>

			<div className="subModuleTitle">
				<i className="txt-blue">*</i>
				{t("lbl_DepositAmount")}
			</div>

			<div className="subModule">
				<Inputbox
					className="inputBox-white"
					// title={t("lbl_Amount")}
					value={formInfo.amount}
					onChange={e => onChangeAmount(e.target.value)}
					checked={formInfo?.checked}
					tip={formInfo?.tip}
					_isConvert={false}
					isAmount={true}
					placeholder={`${t("lbl_MinMaxAmount")} ${formatAmount(
						formInfo.minAmount
					)} ~ ${formatAmount(formInfo.maxAmount)}`}
					onKeyDown={onInputboxKeyDown}
				/>

				<ShortcutAmountList
					amount={formInfo.amount}
					minAmount={formInfo.minAmount}
					maxAmount={formInfo.maxAmount}
					onClick={amount => onChangeAmount(amount)}
				/>
			</div>

			<div className="subModuleTitle">
				<i className="txt-blue">*</i>
				{t("lbl_DepositChannel")}
			</div>

			<div className="subModule">
				<div
					className={`inputBox-blue${
						localBankChannelError.checked === false ? " error" : ""
					}`}>
					<Dropdown
						mainKey="deposit-localbank-channel-provider"
						defaultOption={
							formInfo.fromChannel ? null : t("lbl_SelectChannel")
						}
						options={defDepositChannel}
						onSelectItem={(idx, item) => {
							setFormInfo(prev => {
								const newState = {
									...prev,
									fromChannel: item.id,
									fromAccountNum: null,
									fromSysId: null
								};

								const isRemoveBankDetailKeys =
									item.id ===
										defDepositChannelIdList.CashDepositMachine ||
									item.id ===
										defDepositChannelIdList.OverTheCounter;

								if (isRemoveBankDetailKeys) {
									delete newState.fromAccountNum;
									delete newState.fromSysId;
								}

								return newState;
							});
							setFromChannelIdIdx(idx);
						}}
						selectedIdx={fromChannelIdIdx}
						i18n={t}
					/>
				</div>

				<div
					className={`tip${
						localBankChannelError.tip ? " active" : ""
					}`}>
					{localBankChannelError.tip}
				</div>
			</div>

			{isShowBankDetails && (
				<>
					<div className="subModuleTitle">
						<i className="txt-blue">*</i>
						{t("lbl_BankDetails")}
					</div>

					<div className="subModule">
						<div
							className={`inputBox-blue${
								localBankBankInfoErrpr.checked === false
									? " error"
									: ""
							}`}>
							<Dropdown
								mainKey="deposit-localbank-Bank-provider"
								defaultOption={
									formInfo.fromAccountNum
										? null
										: t("lbl_SelectBank")
								}
								options={custBankInfoList}
								onSelectItem={(idx, item) => {
									setFormInfo(prev => {
										return {
											...prev,
											fromSysId: item.sysId,
											fromAccountNum: item.accountNo
										};
									});

									setCustBankInfoIdx(idx);
								}}
								selectedIdx={custBankInfoIdx}
								i18n={t}
							/>
						</div>

						{custBankInfoList?.length < 3 && (
							<div className="btnGroup">
								<button
									onClick={() => navigate(path.bankInfo.root)}
									className="btn-check">
									+
								</button>
							</div>
						)}

						<div
							className={`tip${
								localBankBankInfoErrpr.tip ? " active" : ""
							}`}>
							{localBankBankInfoErrpr.tip}
						</div>
					</div>
				</>
			)}

			<div className="subModuleTitle">
				<i className="txt-blue">*</i>
				{t("lbl_SubmitProof")}
			</div>

			<div className="subModule">
				<div className="btnGroup">
					<button className="blue" onClick={onOpenUploadBankPopBox}>
						{t("lbl_UploadReceipt")}
					</button>
				</div>
				<i
					className="icon icon-warning"
					onClick={() => clickInfo("upload")}
				/>
				<div className={`tip${infoActive.upload ? " active" : ""}`}>
					{t("lbl_DepositProvideBankSlip")}
				</div>
			</div>
		</>
	);
};

LocalBankForm.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	formInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	depositType: PropTypes.string.isRequired,
	t: PropTypes.func.isRequired,
	_isConvert: PropTypes.bool.isRequired,
	formatAmount: PropTypes.func.isRequired,
	localBankGroupList: PropTypes.arrayOf(PropTypes.any).isRequired,
	setFormInfo: PropTypes.func.isRequired,
	onChangeAmount: PropTypes.func.isRequired,
	onInputboxKeyDown: PropTypes.func.isRequired,
	getLocalBankInfo: PropTypes.func.isRequired,
	localBankInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	asyncUploadBankPopBox: PropTypes.func.isRequired,
	getBankInfo: PropTypes.func.isRequired,
	custBankInfoList: PropTypes.arrayOf(PropTypes.any).isRequired,
	localBankChannelError: PropTypes.objectOf(PropTypes.any).isRequired,
	localBankBankInfoErrpr: PropTypes.objectOf(PropTypes.any).isRequired
};
export default LocalBankForm;
