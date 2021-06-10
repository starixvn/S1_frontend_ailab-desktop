import React, { useState, useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { defActionType } from "./bankInfo.reducer";
import { api_accountStrict_SetCustBankInfo } from "../../service/api/accountStrict";
import { popBoxContext } from "../common/context";
import usePopBox from "../hook/usePopBox";
import config from "../../config";
import Inputbox from "../common/inputbox";
import Loading from "../common/loading";

export default ({
	dispatch,
	bankInfo,
	accountNumber,
	accountName,
	alreadyHasAccountName,
	reload,
	custBankList
}) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox } = usePopBox();
	const [status, setStatus] = useState({
		accountName: {
			checked: null,
			tip: ""
		},
		accountNumber: {
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

	const ClickClose = () => {
		setPopBox({ isOpen: false });
	};

	const toLastStep = () => {
		dispatch({ type: defActionType.TO_LAST_STEP });
	};

	const clickInfo = col => {
		let _msg =
			col === "accountName"
				? t("lbl_BankAccountNameHint")
				: t("lbl_BankNumber");

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

		if (col === "accountName" && !alreadyHasAccountName) {
			if (!val) {
				message = t("msg_EnterRealName");
				checked = false;
			}
		} else if (col === "accountNumber") {
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
		if (_col === "accountNumber") {
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
		const _accountName = checkAccount(accountName, "accountName");
		const _accountNumber = checkAccount(accountNumber, "accountNumber");

		if (_accountNumber.checked && _accountName.checked) {
			setLoading(true);
			api_accountStrict_SetCustBankInfo({
				AccountName: accountName,
				AccountNo: accountNumber,
				SysId: bankInfo.sysId
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
						{!alreadyHasAccountName ? (
							<div className="inputModuleRow">
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
										"accountName"
									)}
									onBlur={checkAccount.bind(
										this,
										accountName,
										"accountName"
									)}
									title={t("lbl_RealName")}
									clickInfo={clickInfo.bind(
										this,
										"accountName"
									)}
									checked={status.accountName.checked}
									tip={status.accountName.tip}
								/>
							</div>
						) : null}
						<div className="inputModuleRow">
							<Inputbox
								className={`inputBox-white${
									!status.accountNumber.checked &&
									status.accountNumber.tip !== ""
										? " error"
										: ""
								}`}
								value={accountNumber}
								onChange={editField.bind(this, "accountNumber")}
								onBlur={checkAccount.bind(
									this,
									accountNumber,
									"accountNumber"
								)}
								clickInfo={clickInfo.bind(
									this,
									"accountNumber"
								)}
								title={t("lbl_BankNumber")}
								checked={status.accountNumber.checked}
								tip={status.accountNumber.tip}
							/>
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
