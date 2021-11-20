import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { defActionType } from "./bankInfo.reducer";
import { api_accountStrict_SetCustBankInfo } from "../../service/api/accountStrict";
import usePopBox from "../hook/usePopBox";
import { cloudImgUrl } from "../../config";
import Inputbox from "../common/inputbox";
import Loading from "../common/loading";

const defColumn = {
	accountName: "accountName",
	accountNumber: "accountNumber",
	ifscCode: "ifscCode"
};

const defColumnTipKey = {
	[defColumn.accountName]: "lbl_BankAccountNameHint",
	[defColumn.accountNumber]: "lbl_BankNumber",
	[defColumn.ifscCode]: "msg_PleaseEnterIFSCCode"
};

const AccountPanel = ({
	t,
	dispatch,
	bankInfo,
	accountNumber,
	accountName,
	ifscCode,
	alreadyHasAccountName,
	reload,
	custBankList,
	toLastStep,
	isIfscRequired
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
		ifscCode: {
			checked: null,
			tip: ""
		}
	});
	const [loading, setLoading] = useState(false);
	const isMountedRef = useRef(null);

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

	const editField = (_col, e) => {
		let val = e.target.value;
		if (_col === defColumn.accountNumber) {
			val = val.replace(/[^0-9]+/g, "");
		} else {
			const pattern = new RegExp(/["'`_^+-@#!<>%;)(&$.]/);
			val = val.replace(pattern, "");
		}
		dispatch({
			type: defActionType.EDIT_FIELD,
			col: _col,
			value: val
		});
	};

	const checkAll = (val, col) => {
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
		} else if (col === defColumn.ifscCode && isIfscRequired) {
			if (!val) {
				message = t("msg_PleaseEnterIFSCCode");
				checked = false;
			} else if (val?.length !== 11) {
				message = t("msg_IFSCCodeLength");
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

	const clickSubmit = e => {
		e.preventDefault();
		const _accountName = checkAll(accountName, defColumn.accountName);
		const _accountNumber = checkAll(accountNumber, defColumn.accountNumber);
		const _ifscCode = isIfscRequired
			? checkAll(ifscCode, defColumn.ifscCode)
			: { checked: true };

		if (
			_accountNumber.checked &&
			_accountName.checked &&
			_ifscCode.checked
		) {
			setLoading(true);
			api_accountStrict_SetCustBankInfo({
				AccountName: accountName,
				AccountNo: accountNumber,
				SysId: bankInfo.sysId,
				IFSCCode: isIfscRequired ? ifscCode : null
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
									src={`${cloudImgUrl}/SiteSkin/img/BankLogo/${bankInfo.bankLogo.toLowerCase()}`}
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
									onBlur={checkAll.bind(
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
								onBlur={checkAll.bind(
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
							{isIfscRequired && (
								<Inputbox
									className={`inputBox-white${
										!status.ifscCode.checked &&
										status.ifscCode.tip !== ""
											? " error"
											: ""
									}`}
									value={ifscCode}
									onChange={editField.bind(
										this,
										defColumn.ifscCode
									)}
									onBlur={checkAll.bind(
										this,
										ifscCode,
										defColumn.ifscCode
									)}
									clickInfo={clickInfo.bind(
										this,
										defColumn.ifscCode
									)}
									title={t("lbl_IFSCCode")}
									checked={status.ifscCode.checked}
									tip={status.ifscCode.tip}
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

AccountPanel.propTypes = {
	t: PropTypes.func.isRequired,
	dispatch: PropTypes.func.isRequired,
	toLastStep: PropTypes.func.isRequired,
	bankInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	accountNumber: PropTypes.string.isRequired,
	accountName: PropTypes.string.isRequired,
	ifscCode: PropTypes.string.isRequired,
	alreadyHasAccountName: PropTypes.bool.isRequired,
	reload: PropTypes.func.isRequired,
	custBankList: PropTypes.arrayOf(PropTypes.any).isRequired,
	isIfscRequired: PropTypes.bool.isRequired
};

export default AccountPanel;
