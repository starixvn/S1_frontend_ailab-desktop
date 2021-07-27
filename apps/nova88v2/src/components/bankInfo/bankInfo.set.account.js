import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { defActionType } from "./bankInfo.reducer";
import { api_accountStrict_SetCustBankInfo } from "../../service/api/accountStrict";
import usePopBox from "../hook/usePopBox";
import config from "../../config";
import Inputbox from "../common/inputbox";
import Loading from "../common/loading";
import { currencyCode } from "../../datas/countryCode";

const defColumn = {
	accountName: "accountName",
	accountNumber: "accountNumber",
	IFSCCode: "IFSCCode"
};

const defColumnTipKey = {
	[defColumn.accountName]: "lbl_BankAccountNameHint",
	[defColumn.accountNumber]: "lbl_BankNumber",
	[defColumn.IFSCCode]: "msg_PleaseEnterIFSCCode"
};

const AccountPanel = ({
	t,
	dispatch,
	bankInfo,
	accountNumber,
	accountName,
	IFSCCode,
	alreadyHasAccountName,
	reload,
	custBankList,
	toLastStep,
	currencyId
}) => {
	const { errorPopBox } = usePopBox();
	const [status, setStatus] = useState({
		accountName: {
			checked: null,
			tip: ""
		},
		accountNumber: {
			checked: null,
			tip: ""
		},
		IFSCCode: {
			checked: null,
			tip: ""
		}
	});
	const [loading, setLoading] = useState(false);
	const isMountedRef = useRef(null);
	const isCurrencyINR = currencyId === currencyCode.INR;

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const clickInfo = col => {
		let _msg = t(defColumnTipKey[col]) ?? "";

		if (status[col].tip === _msg) {
			_msg = "";
		}

		setStatus(prev => ({
			...prev,
			[col]: {
				checked: status[col].checked,
				tip: _msg
			}
		}));
	};

	const checkAccount = (val, col) => {
		let checked = true;
		let message = "";

		const isRepeatAccount =
			custBankList?.filter(
				_selectBank =>
					_selectBank.bankName === bankInfo.bankName &&
					_selectBank.accountNo === val
			).length > 0;

		if (col === defColumn.accountName && !alreadyHasAccountName) {
			if (!val) {
				message = t("msg_EnterRealName");
				checked = false;
			}
		} else if (col === defColumn.accountNumber) {
			if (!val) {
				message = t("msg_NeedAccountNo");
				checked = false;
			} else if (isNaN(val)) {
				message = t("msg_AccountWrongFormat");
				checked = false;
			} else if (isRepeatAccount) {
				message = t("lbl_already_stored_this_information");
				checked = false;
			}
		} else if (col === defColumn.IFSCCode && isCurrencyINR) {
			if (!val) {
				message = t("msg_PleaseEnterIFSCCode");
				checked = false;
			}
		}

		setStatus(prev => ({
			...prev,
			[col]: {
				checked,
				tip: message
			}
		}));

		return { checked, message };
	};

	const editField = (_col, e) => {
		const val = e.target.value;

		let regex = null;
		if (_col === defColumn.accountNumber) {
			regex = /^[0-9]+$/;
		}

		if (val === "" || regex === null || (regex && regex.test(val))) {
			dispatch({
				type: defActionType.EDIT_FIELD,
				col: _col,
				value: val
			});
		}
	};

	const clickSubmit = e => {
		e.preventDefault();
		const _accountName = checkAccount(accountName, defColumn.accountName);
		const _accountNumber = checkAccount(
			accountNumber,
			defColumn.accountNumber
		);
		const _IFSCCode = isCurrencyINR
			? checkAccount(IFSCCode, defColumn.IFSCCode)
			: { checked: true };

		if (
			_accountNumber.checked &&
			_accountName.checked &&
			_IFSCCode.checked
		) {
			setLoading(true);
			api_accountStrict_SetCustBankInfo({
				AccountName: accountName,
				AccountNo: accountNumber,
				SysId: bankInfo.sysId,
				IFSCCode: isCurrencyINR ? IFSCCode : null
			}).then(
				res => {
					if (isMountedRef.current) {
						const { errorCode, message } = res.data;
						if (res.data.errorCode === 0) {
							reload(!alreadyHasAccountName);
						} else {
							errorPopBox(
								message || `[${errorCode}] error`,
								errorCode
							);
						}
						setLoading(false);
					}
				},
				() => {
					if (isMountedRef.current) {
						errorPopBox();
						setLoading(false);
					}
				}
			);
		}
	};

	return loading ? (
		<Loading />
	) : (
		<>
			<div className="platformName">
				<div className="icon icon-arrow-right2" />
				<div>
					<div>{t("lbl_EnterAccountNumber")}</div>
				</div>
				<button
					aria-label="toLastStep"
					className="icon icon-arrow-left2"
					onClick={toLastStep}
				/>
			</div>
			<div className="subModuleList">
				<div className="subModule">
					<form
						className="subModuleBody column"
						onSubmit={clickSubmit}>
						<div>
							<div className="bankName">
								<img
									alt="BankLogo"
									src={`${config.imgUrl}/common/images/BankLogo/${bankInfo.bankLogo}`}
								/>
							</div>
						</div>
						<div className="inputModule">
							{!alreadyHasAccountName ? (
								<Inputbox
									className={`inputBox-white${
										!status.accountName.checked &&
										status.accountName.tip !== ""
											? " error"
											: ""
									}`}
									value={accountName}
									onChange={editField.bind(
										this,
										defColumn.accountName
									)}
									onBlur={checkAccount.bind(
										this,
										accountName,
										defColumn.accountName
									)}
									title={t("lbl_RealName")}
									clickInfo={clickInfo.bind(
										this,
										defColumn.accountName
									)}
									checked={status.accountName.checked}
									tip={status.accountName.tip}
								/>
							) : null}

							<Inputbox
								className={`inputBox-white${
									!status.accountNumber.checked &&
									status.accountNumber.tip !== ""
										? " error"
										: ""
								}`}
								value={accountNumber}
								onChange={editField.bind(
									this,
									defColumn.accountNumber
								)}
								onBlur={checkAccount.bind(
									this,
									accountNumber,
									defColumn.accountNumber
								)}
								clickInfo={clickInfo.bind(
									this,
									defColumn.accountNumber
								)}
								title={t("lbl_BankNumber")}
								checked={status.accountNumber.checked}
								tip={status.accountNumber.tip}
							/>
							{isCurrencyINR && (
								<Inputbox
									className={`inputBox-white${
										!status.IFSCCode.checked &&
										status.IFSCCode.tip !== ""
											? " error"
											: ""
									}`}
									value={IFSCCode}
									onChange={editField.bind(
										this,
										defColumn.IFSCCode
									)}
									onBlur={checkAccount.bind(
										this,
										IFSCCode,
										defColumn.IFSCCode
									)}
									clickInfo={clickInfo.bind(
										this,
										defColumn.IFSCCode
									)}
									title={t("lbl_IFSCCode")}
									checked={status.IFSCCode.checked}
									tip={status.IFSCCode.tip}
								/>
							)}
							<div className="btnGroup">
								<button className="btn-check" type="submit">
									{t("lbl_Submit")}
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

AccountPanel.defaultProps = {
	currencyId: null
};

AccountPanel.propTypes = {
	t: PropTypes.func.isRequired,
	dispatch: PropTypes.func.isRequired,
	toLastStep: PropTypes.func.isRequired,
	bankInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	accountNumber: PropTypes.string.isRequired,
	accountName: PropTypes.string.isRequired,
	IFSCCode: PropTypes.string.isRequired,
	alreadyHasAccountName: PropTypes.bool.isRequired,
	reload: PropTypes.func.isRequired,
	custBankList: PropTypes.arrayOf(PropTypes.any).isRequired,
	currencyId: PropTypes.number
};

export default AccountPanel;
