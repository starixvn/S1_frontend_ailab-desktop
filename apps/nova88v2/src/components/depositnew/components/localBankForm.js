import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";
import Inputbox from "../../common/inputbox";
import { getUrlParameter, number_format } from "../../common/common";
import ClipboardJS from "../../../lib/clipboard.min";
import path from "../../../router";
import config from "../../../config";

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
	onValidAmount,
	onInputboxKeyDown,
	getLocalBankInfo,
	localBankInfo,
	asyncUploadBankPopBox
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

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const _clipboard = new ClipboardJS(".copyBtn");

		checkUserName();

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

	const formatMinAmount = number_format(formInfo.minAmount);
	const formatMaxAmount = number_format(formInfo.maxAmount);

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
					))}
				</div>
			</div>
			<div className="subModule">
				<div className="subModuleTitle">{t("lbl_BankAccount")}</div>
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

			<div className="subModule">
				<div className="subModuleTitle">
					<i className="txt-blue">*</i>
					{t("lbl_DepositAmount")}
				</div>

				<Inputbox
					className="inputBox-white"
					title={t("lbl_Amount")}
					value={formInfo.amount}
					onChange={e => onChangeAmount(e.target.value)}
					onBlur={() => onValidAmount(formInfo.amount)}
					checked={formInfo?.checked}
					tip={formInfo?.tip}
					_isConvert={_isConvert}
					isAmount={true}
					placeholder={`${t(
						"lbl_MinMaxAmount"
					)} ${formatMinAmount} ~ ${formatMaxAmount}`}
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
	onValidAmount: PropTypes.func.isRequired,
	onInputboxKeyDown: PropTypes.func.isRequired,
	getLocalBankInfo: PropTypes.func.isRequired,
	localBankInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	asyncUploadBankPopBox: PropTypes.func.isRequired
};
export default LocalBankForm;
