import React, { useState, useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { defActionType } from "./cryptoWallet.reducer";
import { api_accountStrict_SetCustBankInfo } from "../../service/api/accountStrict";
import { popBoxContext } from "../common/context";
import config from "../../config";
import Inputbox from "../common/inputbox";
import defPopBoxType from "../common/defPopBoxType";
import Loading from "../common/loading";

export default ({
	dispatch,
	// bankInfo,
	accountNumber,
	accountName,
	address,
	alreadyHasAccountName,
	reload,
	walletList
}) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const [status, setStatus] = useState({
		accountName: {
			checked: null,
			tip: ""
		},
		nickname_0: {
			checked: null,
			tip: ""
		},
		address_0: {
			checked: null,
			tip: ""
		},
		nickname_1: {
			checked: null,
			tip: ""
		},
		address_1: {
			checked: null,
			tip: ""
		},
		nickname_2: {
			checked: null,
			tip: ""
		},
		address_2: {
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

	const clickClose = () => {
		setPopBox({ isOpen: false });
	};

	const toLastStep = () => {
		dispatch({ type: defActionType.TO_LAST_STEP });
	};

	const clickInfo = col => {
		const getColType = () => {
			let msg;
			if (col === "accountName") {
				msg = t("lbl_BankAccountNameHint");
			} else if (col.indexOf("nickname") !== -1) {
				msg = t("lbl_Wallet_Nickname_Tip");
			} else {
				msg = t("lbl_Wallet_Address_Tip");
			}
			return msg;
		};

		let _msg = getColType();

		console.log(_msg);

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
		if (col === "accountName" && !alreadyHasAccountName) {
			if (!val) {
				message = t("msg_EnterRealName");
				checked = false;
			}
		} else if (col.indexOf("address") !== -1) {
			if (!val) {
				message = t("lbl_Wallet_Address_Required");
				checked = false;
			} else if (isNaN(val)) {
				message = t("msg_AccountWrongFormat");
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

	console.log(status);

	const editField = (_col, e) => {
		let regex = null;
		if (_col.indexOf("address") !== -1) {
			regex = /^[a-zA-Z0-9@$*!%#?&]*$/;
			//  /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
		}
		const val = e.target.value;
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
				AccountNo: accountNumber
				// SysId: bankInfo.sysId
			}).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							reload(!alreadyHasAccountName);
						} else {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.ErrorMsg,
								message: res.data.message,
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-cancel"
											onClick={clickClose}>
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
										onClick={clickClose}>
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

	const inputList = [{ groupId: 0 }, { groupId: 1 }, { groupId: 2 }];
	const fake_walletList = [
		{ nickname: "a", address: null },
		{ nickname: "b", address: "yyy" },
		{ nickname: "c", address: null }
	];

	const inputListLayout = inputList?.map(item => {
		const groupIdx = item.groupId;
		return (
			<span key={groupIdx}>
				<Inputbox
					className="inputBox-white"
					// value={walletList[`nickname_${groupIdx}`]}
					onChange={editField.bind(this, `nickname_${groupIdx}`)}
					onBlur={checkAccount.bind(
						this,
						fake_walletList[groupIdx].nickname,
						`nickname_${groupIdx}`
					)}
					clickInfo={clickInfo.bind(this, `nickname_${groupIdx}`)}
					title={t("lbl_Wallet_Nickname")}
					checked={status[`nickname_${groupIdx}`].checked}
					tip={status[`nickname_${groupIdx}`].tip}
					placeholder="Optional"
				/>

				<Inputbox
					className="inputBox-white"
					// value={walletList[`address_${groupIdx}`]}
					onChange={editField.bind(this, `address_${groupIdx}`)}
					onBlur={checkAccount.bind(
						this,
						fake_walletList[groupIdx].address,
						`address_${groupIdx}`
					)}
					clickInfo={clickInfo.bind(this, `address_${groupIdx}`)}
					title={t("lbl_Wallet_Address")}
					checked={status[`address_${groupIdx}`].checked}
					tip={status[`address_${groupIdx}`].tip}
				/>
			</span>
		);
	});

	return loading ? (
		<Loading />
	) : (
		<>
			<div className="platformName">
				<div className="icon icon-arrow-right2" />
				<div>
					<div>{t("lbl_EnterWalletNumber")}</div>
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
						{inputListLayout}
						<div className="tip active">
							{t("lbl_Crypto_Wallet_Submit_Note")}
						</div>
						<div className="btnGroup">
							<button className="btn-check" type="submit">
								{t("lbl_Submit")}
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};
