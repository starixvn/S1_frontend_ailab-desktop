import React, { useState, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { defActionType } from "./bankInfo.reducer";
import { api_accountStrict_SetCustBankInfo } from "../../service/api/accountStrict";
import { popBoxContext } from "../common/context";
import config from "../../config";
import Inputbox from "../common/inputbox";
import Loading from "../common/loading";
import { defPopBoxType } from "../common/defPopBoxType";

const AccountPanel = ({
	t,
	dispatch,
	bankInfo,
	accountNumber,
	accountName,
	alreadyHasAccountName,
	reload,
	toLastStep,
	custBankList
}) => {
	const { setPopBox } = useContext(popBoxContext);
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

	const clickInfo = col => {
		let _msg =
			col === "accountName"
				? t("lbl_Please_input_your_real_name_as_in_your_ID")
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
		const pattern_punct = new RegExp(
			"[`~!@#$^&*()=|{}':;',ˇˋ˙ˊ\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]"
		);

		let checked = true;
		let message = "";

		const isDuplicateBank = custBankList?.find(
			_selectBank =>
				_selectBank.sysId === bankInfo.sysId &&
				_selectBank.accountNo === val
		);
		if (col === "accountName" && !alreadyHasAccountName) {
			if (!val) {
				message = t("msg_EnterRealName");
				checked = false;
			} else if (pattern_punct.test(val)) {
				message = t("msg_Regex_Punct_Invalid");
				checked = false;
			}
		} else if (col === "accountNumber") {
			if (!val) {
				message = t("msg_NeedAccountNo");
				checked = false;
			} else if (isNaN(val)) {
				message = t("msg_AccountWrongFormat");
				checked = false;
			} else if (isDuplicateBank) {
				message = t("lbl_Prohibited_Duplicate_Bank_Account");
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
						if (res.data.errorCode === 0) {
							reload(!alreadyHasAccountName);
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.Success,
								titleIcon: "icon-library",
								titleText: "lbl_AddBankAccount",
								message1: "lbl_UpdateSuccessful",
								onClickClose: ClickClose,
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-cancel"
											onClick={ClickClose}
										>
											OK
										</button>
									</div>
								)
							});
						} else {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.ErrorMsg,
								message: `[${res.data.errorCode}] ${res.data.message}`,
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-cancel"
											onClick={ClickClose}
										>
											{t("lbl_Close")}
										</button>
									</div>
								)
							});
						}
						setLoading(false);
					}
				},
				() => {
					if (isMountedRef.current) {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: t("msg_ApiServerError"),
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-cancel"
										onClick={ClickClose}
									>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
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
				<div>
					<img
						alt="BankLogo"
						src={`${
							config.imgUrl
						}/common/images/BankLogo/${bankInfo.bankLogo?.toLowerCase()}`}
					/>
				</div>
				<button
					aria-label="toLastStep"
					className="icon icon-arrow-left2"
					onClick={toLastStep}
				>
					{t("lbl_back")}
				</button>
			</div>
			<div className="subModuleList">
				<div className="subModule">
					<form
						className="subModuleBody column"
						onSubmit={clickSubmit}
					>
						{!alreadyHasAccountName ? (
							<>
								<div className="txt-lightgray">
									{t("lbl_RealName")}
								</div>
								<Inputbox
									placeholder={t("lbl_RealName")}
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
									clickInfo={clickInfo.bind(
										this,
										"accountName"
									)}
									checked={status.accountName.checked}
									tip={status.accountName.tip}
								/>
							</>
						) : null}
						<div className="txt-lightgray">
							{t("lbl_AccountNumber")}
						</div>
						<Inputbox
							placeholder="1111 2222 3333 4444"
							value={accountNumber}
							onChange={editField.bind(this, "accountNumber")}
							onBlur={checkAccount.bind(
								this,
								accountNumber,
								"accountNumber"
							)}
							clickInfo={clickInfo.bind(this, "accountNumber")}
							checked={status.accountNumber.checked}
							tip={status.accountNumber.tip}
						/>
						<div className="btnGroup">
							<button className="btn-check" type="submit">
								{t("lbl_add_bank_submit")}
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};
export default AccountPanel;

AccountPanel.defaultProps = {
	custBankList: null
};

AccountPanel.propTypes = {
	t: PropTypes.func.isRequired,
	dispatch: PropTypes.func.isRequired,
	bankInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	accountNumber: PropTypes.string.isRequired,
	accountName: PropTypes.string.isRequired,
	alreadyHasAccountName: PropTypes.bool.isRequired,
	reload: PropTypes.func.isRequired,
	toLastStep: PropTypes.func.isRequired,
	custBankList: PropTypes.arrayOf(PropTypes.any)
};
