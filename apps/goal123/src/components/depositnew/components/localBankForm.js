import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Inputbox from "../../common/inputbox";
import { getUrlParameter, number_format } from "../../common/common";
import ClipboardJS from "../../../lib/clipboard.min";
import config from "../../../config";

const LocalBankForm = ({
	t,
	userInfo,
	_isConvert,
	localBankGroupList,
	infoData,
	setInfoData,
	onChangeAmount,
	onValidAmount,
	onInputboxKeyDown,
	getLocalBankInfo,
	localBankInfo,
	openUploadBankPopBox
}) => {
	const parameterSysId = Number(getUrlParameter("sysId"));

	const [sysIdForRecord, setSysIdForRecord] = useState(parameterSysId);

	const [userAccountName, setUserAccountName] = useState({
		value: "",
		checked: null,
		tip: ""
	});

	const onChangeAccountName = val => {
		const error = validate({
			userAccountName: val
		});

		setUserAccountName({
			value: val,
			checked: !error.userAccountName,
			tip: error.userAccountName
		});

		setInfoData(prev => {
			return {
				...prev,
				accountName: val
			};
		});
	};

	const validate = datas => {
		const errors = {};

		if (!datas.userAccountName) {
			errors.userAccountName = t("lbl_NameRequired");
		}

		return errors;
	};

	const onChangeBankInfo = item => {
		// navigate(
		// 	`/${userInfo.langId}/${path.deposit.root}?type=${depositType}&sysId=${item.sysId}`
		// );

		setSysIdForRecord(item.sysId);
		getLocalBankInfo({ sysId: item.sysId });
		setInfoData(item);
	};

	const onOpenUploadBankPopBox = () => {
		const { bankName, accountNo, accountName } = localBankInfo;

		openUploadBankPopBox({
			bankName,
			accountNo,
			accountName,
			from: "new"
		});
	};

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const _clipboard = new ClipboardJS(".copyBtn");

		if (localBankGroupList.some(item => item.sysId === sysIdForRecord)) {
			const gIdx = localBankGroupList.findIndex(
				item => item.sysId === sysIdForRecord
			);

			onChangeBankInfo(localBankGroupList[gIdx]);
		} else if (localBankGroupList.length > 0) {
			onChangeBankInfo(localBankGroupList[0]);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (localBankGroupList.length <= 0) return null;

	const formatMinAmount = number_format(infoData.minAmount);
	const formatManAmount = number_format(infoData.maxAmount);

	return (
		<>
			<div className="subModule">
				<div className="subModuleTitle">
					<i className="txt-blue">*</i>
					{t("lbl_SelectBank")}
				</div>
				<div>
					{localBankGroupList.map(item => (
						<button
							key={`deposit-localPay-group-${item.sysId}}`}
							className={
								item.sysId === sysIdForRecord ? "active" : ""
							}
							onClick={() => onChangeBankInfo(item)}>
							<div>
								<img
									src={`${config.imgUrl}/common/images/BankLogo/${item.bankLogo}`}
									alt={item.bankName}
								/>
								<i className="icon icon-checkmark" />
							</div>
						</button>
					))}
				</div>
			</div>
			<div className="subModule">
				<div className="subModuleTitle">
					<i className="txt-blue">*</i>
					{t("lbl_BankAccount")}
				</div>
				<div className="bankAccount">
					{t("lbl_DepositProcessingDescription")}
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

			{!userInfo.accountName ? (
				<div className="subModule">
					<div className="subModuleTitle">
						<i className="txt-blue">*</i>
						{t("lbl_RealName")}
					</div>
					<Inputbox
						className="inputBox-white"
						value={userAccountName.value}
						onChange={e => onChangeAccountName(e.target.value)}
						onBlur={e => onChangeAccountName(e.target.value)}
						tip={userAccountName?.tip}
						placeholder={t("lbl_DepositAccountNamePlaceholder")}
					/>
				</div>
			) : null}

			<div className="subModule">
				<div className="subModuleTitle">
					<i className="txt-blue">*</i>
					{t("lbl_DepositAmount")}
				</div>
				<Inputbox
					className="inputBox-white"
					value={infoData.amount}
					onChange={e => onChangeAmount(e.target.value)}
					onBlur={() => onValidAmount(infoData.amount)}
					checked={infoData?.checked}
					tip={infoData?.tip}
					_isConvert={_isConvert}
					isAmount={true}
					placeholder={`${t(
						"lbl_MinMaxAmount"
					)} ${formatMinAmount} / ${formatManAmount}`}
					onKeyDown={onInputboxKeyDown}
				/>
			</div>
			<div className="subModule">
				<div className="subModuleTitle">
					<i className="txt-blue">*</i>
					{t("lbl_SubmitProof")}
				</div>
				<div className="btnGroup">
					<button className="blue" onClick={onOpenUploadBankPopBox}>
						{t("lbl_UploadReceipt")}
					</button>
				</div>
				<i className="icon icon-information-solid" />
				<div
					className={`tip${
						infoData.infoDataReceiptImgFile?.type.includes("image")
							? ""
							: " active"
					}`}>
					{t("lbl_DepositProvideBankSlip")}
				</div>
			</div>

			<div className="subModule">
				<div className="subModuleTitle important">IMPORTANT NOTES</div>
				<div className="subModuleContent">
					<ol>
						<li>{t("lbl_DepositLocalBankNotes1")}</li>
						<li>{t("lbl_DepositLocalBankNotes2")}</li>
						<li>{t("lbl_DepositLocalBankNotes3")}</li>
						<li>{t("lbl_DepositLocalBankNotes4")}</li>
					</ol>
				</div>
			</div>
		</>
	);
};

LocalBankForm.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	infoData: PropTypes.objectOf(PropTypes.any).isRequired,
	t: PropTypes.func.isRequired,
	_isConvert: PropTypes.bool.isRequired,
	localBankGroupList: PropTypes.arrayOf(PropTypes.any).isRequired,
	setInfoData: PropTypes.func.isRequired,
	onChangeAmount: PropTypes.func.isRequired,
	onValidAmount: PropTypes.func.isRequired,
	onInputboxKeyDown: PropTypes.func.isRequired,
	getLocalBankInfo: PropTypes.func.isRequired,
	localBankInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	openUploadBankPopBox: PropTypes.func.isRequired
};
export default LocalBankForm;
