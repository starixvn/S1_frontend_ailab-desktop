import React, { useState, useEffect } from "react";
import { Link, navigate } from "@reach/router";
import PropTypes from "prop-types";
import Inputbox from "../../common/inputbox";
import Dropdown from "../../common/dropdown";
import ShortcutAmountList from "./shortcutAmountList";
import { getUrlParameter, number_format } from "../../common/common";
import { defDepositChannel, defDepositChannelIdList } from "../depositnew.def";
import ClipboardJS from "../../../lib/clipboard.min";
import path from "../../../router";
import config from "../../../config";

const bankStatus = {
	open: 1,
	suspend: 2
};

const LocalBankForm = ({
	t,
	userInfo,
	setPopBox,
	depositType,
	defPopBoxType,
	_isConvert,
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
		const _clipboard = new ClipboardJS(".copyBtn");

		if (localBankGroupList.some(item => item.sysId === sysIdForRecord)) {
			const gIdx = localBankGroupList.findIndex(
				item => item.sysId === sysIdForRecord
			);

			onChangeBankInfo(localBankGroupList[gIdx]);
		} else if (localBankGroupList.length > 0) {
			onChangeBankInfo(localBankGroupList[0]);
		}

		const checkUserName = () => {
			const { isLogin, accountName, phoneNo, email } = userInfo;

			if (
				isLogin &&
				((!accountName && accountName !== undefined) ||
					(!phoneNo && phoneNo !== undefined) ||
					(!email && email !== undefined))
			) {
				setPopBox({
					isOpen: true,
					popBoxType: defPopBoxType.UpdateProfile,
					title: t("lbl_ImportantNote"),
					content: t("lbl_UpdatePersonalInfoDeposit"),
					btnBar: (
						<div className="btnGroup">
							<Link
								className="btn-check"
								to={`/${userInfo.langId}/${path.profile.root}?prevPage=${path.deposit.root}`}>
								{t("lbl_UpdatePersonalDetail")}
							</Link>
						</div>
					)
				});
			}
		};

		getBankInfo();
		checkUserName();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (localBankGroupList.length <= 0) return null;

	const formatMinAmount = number_format(formInfo.minAmount, _isConvert);
	const formatMaxAmount = number_format(formInfo.maxAmount, _isConvert);

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

						if (item.status === bankStatus.suspend) {
							className.push("close");
						}

						if (item.status === bankStatus.open) {
							className.push("open");
						}
						className = className.join(" ");

						return (
							<button
								key={`deposit-localPay-group-${item.sysId}}`}
								className={className}
								onClick={() => onChangeBankInfo(item)}>
								<div>
									<img
										src={`${config.cloudImgUrl}/SiteSkin/img/BankLogo/${bankLogo}`}
										alt={item.bankName}
									/>
									<i className="icon icon-icon32px_check" />
								</div>

								<div className="bank">
									<div>{item.bankName}</div>

									<div>
										<div>
											{`${t("lbl_Min")}: ${number_format(
												item.minAmount,
												_isConvert
											)}`}
										</div>
										<div>
											{`${t("lbl_Max")}: ${number_format(
												item.maxAmount,
												_isConvert
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
					_isConvert={_isConvert}
					isAmount={true}
					placeholder={`${t(
						"lbl_MinMaxAmount"
					)} ${formatMinAmount} ~ ${formatMaxAmount}`}
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
				<div className="inputBox-blue">
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
									fromChannel: item.id
								};

								delete newState.fromSysId;
								delete newState.fromAccountNum;

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
						localBankChannelError.checked ? "" : " active"
					}`}>
					{localBankChannelError.tip}
				</div>
			</div>

			{(formInfo.fromChannel === defDepositChannelIdList.OnlineBanking ||
				formInfo.fromChannel === defDepositChannelIdList.ATM) && (
				<>
					<div className="subModuleTitle">
						<i className="txt-blue">*</i>
						{t("lbl_BankDetails")}
					</div>

					<div className="subModule">
						<div className="inputBox-blue">
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
								localBankBankInfoErrpr.checked ? "" : " active"
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
					className="icon icon-information"
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
	defPopBoxType: PropTypes.objectOf(PropTypes.any).isRequired,
	t: PropTypes.func.isRequired,
	setPopBox: PropTypes.func.isRequired,
	_isConvert: PropTypes.bool.isRequired,
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
