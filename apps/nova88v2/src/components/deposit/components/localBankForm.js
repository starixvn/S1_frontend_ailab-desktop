import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Inputbox from "../../common/inputbox";
import ShortcutAmountList from "./shortcutAmountList";
import { defCurrencyList, getUrlParameter } from "../../common/common";
import PromotionSelect from "./promotionSelect";
import ClipboardJS from "../../../lib/clipboard.min";
import { paymentImgUrl } from "../../../config";
import { currencyCode } from "../../../datas/countryCode";
import { useSyncRouteQuery } from "../hooks";

const LocalBankForm = ({
	t,
	userInfo,
	depositType,
	_isConvert,
	formatAmount,
	localBankGroupList,
	formInfo,
	depositPromoList,
	onChangePromotion,
	setFormInfo,
	onInputboxKeyDown,
	getLocalBankInfo,
	localBankInfo,
	asyncUploadBankPopBox,
	getBankInfo,
	setLocalBankChecked,
	isGroupListFetchDone,
	setSelectedBankId
}) => {
	const parameterSysId = Number(getUrlParameter("sysId"));
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
		setSelectedBankId(item.bankId);
		setSysIdForRecord(item.sysId);
		getLocalBankInfo({ sysId: item.sysId });
		setFormInfo(prev => ({ ...prev, ...item }));
	};

	const onChangeAmount = _amount => {
		let amount = String(_amount).replace(/^(0+)|[^\d]+/g, "");

		if (amount.includes(".")) {
			amount = amount.replace(/\.{2,}/g, ".");
			amount = amount
				.replace(".", "$#$")
				.replace(/\./g, "")
				.replace("$#$", ".");

			if (userInfo.currencyId === defCurrencyList.IDR) {
				amount = amount.replace(/^(-)*(\d+)\.(\d\d\d).*$/, "$1$2.$3");
			} else {
				amount = amount.replace(/^(-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
			}
		}
		setFormInfo(prev => ({ ...prev, amount }));
	};
	const onOpenUploadBankPopBox = async () => {
		const { bankName, accountNo, accountName, bankSite, code } =
			localBankInfo;
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
				accountName,
				code
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

			setFormInfo(prev => ({
				...prev,
				// time: depositTime.value,
				// refId: depositRefNo.value,
				imgFile: depositImgFiles.file
			}));
		}
	};

	useSyncRouteQuery({
		type: depositType,
		sysId: sysIdForRecord
	});

	useEffect(() => {
		const _clipboard = new ClipboardJS(".copyBtn");
		_clipboard.on("success", () => 0);
		_clipboard.on("error", () => 0);

		return () => {
			_clipboard.destroy();
		};
	});

	useEffect(() => {
		const validate = datas => {
			const errors = {};

			if (
				userInfo.currencyId === currencyCode.TH &&
				!datas.imgFile?.type.includes("image")
			) {
				errors.imgFile = "error";
			}

			return errors;
		};

		const errors = validate({
			imgFile: formInfo.imgFile
		});

		const isValid = Object.keys(errors).length === 0;

		setLocalBankChecked(isValid);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [formInfo]);

	useEffect(() => {
		if (isGroupListFetchDone) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			// const _clipboard = new ClipboardJS(".copyBtn");
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

			getBankInfo();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isGroupListFetchDone]);

	if (localBankGroupList.length <= 0) return null;

	const placeHolderText = `${t("lbl_MinMaxAmount")} ${
		_isConvert ? formInfo.minAmount / 1000 : formInfo.minAmount
	} ~ ${_isConvert ? formInfo.maxAmount / 1000 : formInfo.maxAmount}`;

	const qrCodeObj = localBankGroupList?.find(
		obj => obj.bankLogo === localBankInfo.bankLogo
	);

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
								className={`${className} ${
									item.canSubmit ? "" : "pending"
								}`}
								onClick={() => onChangeBankInfo(item)}
							>
								<div>
									<img
										src={`${paymentImgUrl}/square/${bankLogo}`}
										alt={item.bankName}
									/>
									<i className="icon icon-icon32px_check" />
									{item.canSubmit ? (
										""
									) : (
										<div className="mask" />
									)}
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
				{qrCodeObj?.qrCodeUrl && (
					<div className="qrCode">
						<img
							src={`${paymentImgUrl}${qrCodeObj?.qrCodeUrl}`}
							alt={qrCodeObj?.bankName}
						/>
					</div>
				)}
			</div>

			<div className="subModuleTitle">
				<i className="txt-blue">*</i>
				{t("lbl_DepositAmount")}
				{userInfo.currencyId === defCurrencyList.IDR &&
					t("lbl_DepositAmountNote")}
			</div>

			<div className="subModule">
				<Inputbox
					className="inputBox-white"
					// title={t("lbl_Amount")}
					value={formInfo.amount}
					onChange={e => onChangeAmount(e.target.value)}
					checked={formInfo?.checked}
					tip={formInfo?.tip}
					_isConvert={_isConvert}
					isAmount={true}
					placeholder={placeHolderText}
					onKeyDown={onInputboxKeyDown}
					format={userInfo.currencyId === defCurrencyList.IDR}
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

			<PromotionSelect
				value={formInfo?.depositPromo ?? {}}
				amount={Number(formInfo.amount)}
				depositPromoList={depositPromoList}
				onSelectItem={onChangePromotion}
			/>
		</>
	);
};

LocalBankForm.defaultProps = {
	onChangePromotion: () => null
};

LocalBankForm.propTypes = {
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	formInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	depositPromoList: PropTypes.arrayOf(PropTypes.any).isRequired,
	depositType: PropTypes.string.isRequired,
	t: PropTypes.func.isRequired,
	_isConvert: PropTypes.bool.isRequired,
	formatAmount: PropTypes.func.isRequired,
	localBankGroupList: PropTypes.arrayOf(PropTypes.any).isRequired,
	setFormInfo: PropTypes.func.isRequired,
	onInputboxKeyDown: PropTypes.func.isRequired,
	getLocalBankInfo: PropTypes.func.isRequired,
	setLocalBankChecked: PropTypes.func.isRequired,
	localBankInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	asyncUploadBankPopBox: PropTypes.func.isRequired,
	getBankInfo: PropTypes.func.isRequired,
	isGroupListFetchDone: PropTypes.bool.isRequired,
	onChangePromotion: PropTypes.func,
	setSelectedBankId: PropTypes.func.isRequired
};
export default LocalBankForm;
