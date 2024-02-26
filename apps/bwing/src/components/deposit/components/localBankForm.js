import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Inputbox from "../../common/inputbox";
import {
	getUrlParameter,
	number_format,
	checkAmount
} from "../../common/common";
import ClipboardJS from "../../../lib/clipboard.min";
import config from "../../../config";

import PromotionSelect from "./PromotionSelect";

const LocalBankForm = ({
	t,
	userInfo,
	depositType,
	_isConvert,
	localBankGroupList,
	formInfo,
	setFormInfo,
	onInputboxKeyDown,
	getLocalBankInfo,
	localBankInfo,
	asyncUploadBankPopBox,
	depositPromoList,
	isGroupListFetchDone,
	onChangePromotion,
	setSelectedBankId
}) => {
	const parameterSysId = Number(getUrlParameter("sysId"));

	const [sysIdForRecord, setSysIdForRecord] = useState(parameterSysId);
	const [userAccountName, setUserAccountName] = useState({
		value: "",
		checked: null,
		tip: ""
	});

	const [infoActive, setInfoActive] = useState({
		upload: false
	});

	const clickInfo = col =>
		setInfoActive(prev => ({
			...prev,
			[col]: !prev[col]
		}));

	const onChangeAccountName = val => {
		const error = validate({
			userAccountName: val
		});

		setUserAccountName({
			value: val,
			checked: !error.userAccountName,
			tip: error.userAccountName
		});

		setFormInfo(prev => ({
			...prev,
			accountName: val
		}));
	};

	const validate = datas => {
		const errors = {};

		if (!datas.userAccountName) {
			errors.userAccountName = t("lbl_NameRequired");
		}

		return errors;
	};

	const onChangeBankInfo = item => {
		window.history.replaceState(
			{},
			"",
			`${window.location.pathname}?type=${depositType}&sysId=${item.sysId}`
		);
		setSelectedBankId(item.bankId);
		setSysIdForRecord(item.sysId);
		getLocalBankInfo({ sysId: item.sysId });
		setFormInfo(prev => ({ ...prev, ...item }));
	};

	const onOpenUploadBankPopBox = async () => {
		const { bankName, accountNo, accountName, bankSite, code } =
			localBankInfo;

		const { imgFile, refId, time } = formInfo;

		const uploadPopBoxResult = await asyncUploadBankPopBox({
			formInfo: {
				imgFile,
				refId,
				time
			},
			localBankInfo: {
				bankName,
				bankSite,
				accountNo,
				accountName,
				code
			},
			_isConvert,
			langId: userInfo.langId
		});

		if (uploadPopBoxResult.success) {
			const {
				datas: { depositTime, depositRefNo, depositImgFiles }
			} = uploadPopBoxResult;

			setFormInfo(prev => ({
				...prev,
				time: depositTime.value,
				refId: depositRefNo.value,
				imgFile: depositImgFiles.file
			}));
		}
	};

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const _clipboard = new ClipboardJS(".copyBtn");

		if (isGroupListFetchDone) {
			if (
				localBankGroupList.some(item => item.sysId === sysIdForRecord)
			) {
				const gIdx = localBankGroupList.findIndex(
					item => item.sysId === sysIdForRecord
				);

				onChangeBankInfo(localBankGroupList[gIdx]);
			} else if (localBankGroupList.length > 0) {
				onChangeBankInfo(localBankGroupList[0]);
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isGroupListFetchDone]);

	if (localBankGroupList.length <= 0) return null;

	const formatMinAmount = number_format({
		number: formInfo.minAmount,
		digits: 0
	});
	const formatMaxAmount = number_format({
		number: formInfo.maxAmount,
		digits: 0
	});

	const onChangeAmount = _amount => {
		let amount = String(_amount).replace(/^(0+)|[^\d]+/g, "");

		if (amount.includes(".")) {
			amount = amount.replace(/\.{2,}/g, ".");
			amount = amount
				.replace(".", "$#$")
				.replace(/\./g, "")
				.replace("$#$", ".");
			amount = amount.replace(/^(-)*(\d+)\.(\d\d\d).*$/, "$1$2.$3");
		}
		const result = checkAmount({
			amount,
			minAmount: formInfo.minAmount,
			maxAmount: formInfo.maxAmount,
			formatRequired: false,
			t,
			digits: 3
		});

		setFormInfo(prev => ({
			...prev,
			amount: {
				val: amount,
				checked: result.status === 0,
				tip: result.msg
			}
		}));
	};

	const QRCodeObj = localBankGroupList?.find(
		obj => obj.bankName === localBankInfo.bankName
	);

	return (
		<>
			<div className="subModuleTitle">
				<span>
					<i className="txt-blue">*</i>
					{t("lbl_SelectBank")}
				</span>
				{_isConvert && (
					<div className="info">
						{t("Label_Deposit_AdditionalInfo")}
					</div>
				)}
			</div>
			<div className="subModule">
				<div>
					{localBankGroupList.map(item => (
						<button
							key={`deposit-localPay-group-${item.sysId}}`}
							className={`${
								item.sysId === sysIdForRecord ? "active" : ""
							} ${item.canSubmit ? "" : "pending"}`}
							onClick={() => onChangeBankInfo(item)}
						>
							<div>
								<img
									src={`${
										config.cloudImgUrl
									}/${item.bankLogo?.toLowerCase()}`}
									alt={item.bankName}
								/>
								<i className="icon icon-checkmark" />
								{item.canSubmit ? "" : <div className="mask" />}
							</div>

							<div className="bank">
								<div>{item.bankName}</div>

								<div>{`${number_format({
									number: item.minAmount,
									formatRequired: false,
									digits: 0
								})}~${number_format({
									number: item.maxAmount,
									formatRequired: false,
									digits: 0
								})}`}</div>
							</div>
						</button>
					))}
				</div>
			</div>

			<div className="subModuleTitle">
				<span>
					<i className="txt-blue">*</i>
					{t("lbl_BankAccount")}
				</span>
			</div>

			<div className="subModule bankQR">
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

						{localBankInfo?.code && (
							<>
								<ul className="remark">
									<li>{t("Label_Remark")}</li>
									<li>{localBankInfo.code}</li>
									<button
										className="icon icon-files-empty copyBtn"
										data-clipboard-text={localBankInfo.code}
									/>
								</ul>

								<div className="tip active">
									{t("Label_Deposit_RemarkHint")}
								</div>
							</>
						)}
					</div>
				</div>
				{QRCodeObj?.qrCodeUrl && (
					<div className="qrCode">
						<img
							src={`${config.cloudImgUrl}${QRCodeObj?.qrCodeUrl}`}
							alt={QRCodeObj?.bankName}
						/>
					</div>
				)}
			</div>

			{!userInfo.accountName ? (
				<>
					<div className="subModuleTitle">
						<span>
							<i className="txt-blue">*</i>
							{t("lbl_RealName")}
						</span>
					</div>

					<div className="subModule">
						<div className="row">
							<Inputbox
								className="inputBox-white"
								value={userAccountName.value}
								onChange={e =>
									onChangeAccountName(e.target.value)
								}
								checked={userAccountName?.checked}
								onBlur={e =>
									onChangeAccountName(e.target.value)
								}
								tip={userAccountName?.tip}
								placeholder={t(
									"lbl_DepositAccountNamePlaceholder"
								)}
							/>
						</div>
					</div>
				</>
			) : null}

			<div className="subModuleTitle">
				<span>
					<i className="txt-blue">*</i>
					{t("lbl_DepositAmount")}
					{t("lbl_DepositAmountNote")}
				</span>
			</div>

			<div className="subModule">
				<div className="column">
					<Inputbox
						className="inputBox-white"
						value={formInfo.amount?.val}
						onChange={e => onChangeAmount(e.target.value)}
						onBlur={e => onChangeAmount(e.target.value)}
						checked={formInfo.amount?.checked}
						tip={formInfo.amount?.tip}
						_isConvert={_isConvert}
						isAmount={true}
						placeholder={`${t(
							"lbl_MinMaxAmount"
						)} ${formatMinAmount} / ${formatMaxAmount}`}
						onKeyDown={onInputboxKeyDown}
					/>
				</div>
			</div>

			<div className="subModuleTitle">
				<span>
					<i className="txt-blue">*</i>
					{t("lbl_SubmitProof")}
				</span>
			</div>
			<div className="subModule">
				<div className="btnGroup">
					<button className="blue" onClick={onOpenUploadBankPopBox}>
						{t("lbl_UploadReceipt")}
					</button>
				</div>
				<i
					className="icon icon-information-solid"
					onClick={() => clickInfo("upload")}
				/>
				<div className={`tip${infoActive.upload ? " active" : ""}`}>
					{t("lbl_DepositProvideBankSlip")}
				</div>
			</div>

			{depositPromoList?.length > 0 && (
				<>
					<div className="subModuleTitle">
						<span>
							<i className="txt-blue" />
							{t("lbl_Select_Bonus")}
						</span>
					</div>

					<PromotionSelect
						value={formInfo?.depositPromo ?? {}}
						amount={Number(formInfo.amount)}
						depositPromoList={depositPromoList}
						onSelectItem={onChangePromotion}
					/>
				</>
			)}
		</>
	);
};

LocalBankForm.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	formInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	t: PropTypes.func.isRequired,
	depositType: PropTypes.string.isRequired,
	_isConvert: PropTypes.bool.isRequired,
	localBankGroupList: PropTypes.arrayOf(PropTypes.any).isRequired,
	setFormInfo: PropTypes.func.isRequired,
	onInputboxKeyDown: PropTypes.func.isRequired,
	getLocalBankInfo: PropTypes.func.isRequired,
	localBankInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	asyncUploadBankPopBox: PropTypes.func.isRequired,
	depositPromoList: PropTypes.arrayOf(PropTypes.any).isRequired,
	isGroupListFetchDone: PropTypes.bool.isRequired,
	onChangePromotion: PropTypes.func.isRequired,
	setSelectedBankId: PropTypes.func.isRequired
};
export default LocalBankForm;
