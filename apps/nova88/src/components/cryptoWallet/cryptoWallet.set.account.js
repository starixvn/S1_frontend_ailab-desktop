import React, { useState, useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
	defActionType,
	defStatus,
	defColType,
	defColList
} from "./cryptoWallet.reducer";
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
	const [status, setStatus] = useState(defStatus);
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
		const getMsg = () => {
			let msg;
			if (col === defColType.accountName) {
				msg = t("lbl_BankAccountNameHint");
			} else if (col.indexOf(defColType.nickname) !== -1) {
				msg = t("lbl_Wallet_Nickname_Tip");
			} else {
				msg = t("lbl_Wallet_Address_Tip");
			}
			return msg;
		};
		let _msg = getMsg();
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

	const checkInput = (val, col) => {
		// console.log("val:", val, " ----", "col:", col);
		let checked = null;
		let message = "";
		const addressRegex = /^[a-zA-Z0-9@$*!%#?&]*$/;
		if (col === "accountName" && !alreadyHasAccountName) {
			if (!val) {
				message = t("msg_EnterRealName");
				checked = false;
			}
		} else if (val && col.indexOf(defColType.nickname) !== -1) {
			checked = true;
		} else if (col.indexOf(defColType.address) !== -1) {
			if (val) {
				if (!addressRegex.test(val)) {
					message = t("msg_AccountWrongFormat");
					checked = false;
				} else {
					checked = true;
				}
			} else if (
				(col === defColList[0].address && !val) ||
				(col === defColList[1]?.address &&
					fake_walletList[1]?.nickname?.length > 0) ||
				(col === defColList[2]?.address &&
					fake_walletList[2]?.nickname?.length > 0)
			) {
				message = t("lbl_Wallet_Address_Required");
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

	const editField = (col, e) => {
		let regex = null;
		if (col.indexOf(defColType.address) !== -1) {
			regex = /^[a-zA-Z0-9@$*!%#?&]*$/;
		}
		const val = e.target.value;
		if (val === "" || regex === null || (regex && regex.test(val))) {
			dispatch({
				type: defActionType.EDIT_FIELD,
				col,
				value: val
			});
		}
	};

	const fake_walletList = [
		{ nickname: null, address: "asd5as1d51" },
		{ nickname: "asdas", address: null },
		{ nickname: "asdas", address: null }
	];

	const checkBeforeSubmit = () => {
		let finalResult = false;
		const _accountNameResult = checkInput(accountName, "accountName")
			.checked;

		const _nickNameResultList = [];
		fake_walletList.forEach((item, idx) => {
			const check = checkInput(item.nickname, `nickname_${[idx + 1]}`)
				.checked;
			_nickNameResultList.push(check);
		});

		const _addressResultList = [];
		fake_walletList.forEach((item, idx) => {
			const check = checkInput(item.address, `address_${[idx + 1]}`)
				.checked;
			_addressResultList.push(check);
		});

		if (
			_accountNameResult === false ||
			_nickNameResultList.includes(false) ||
			_addressResultList.includes(false)
		) {
			finalResult = false;
		}
		// else if (_nickNameResultList[1] && _addressResultList[1] === null) {
		// 	setStatus(prev => ({
		// 		...prev,
		// 		address_2: {
		// 			checked: false,
		// 			tip: t("lbl_Wallet_Address_Required")
		// 		}
		// 	}));
		// 	finalResult = false;
		// } else if (_nickNameResultList[2] && _addressResultList[2] === null) {
		// 	setStatus(prev => ({
		// 		...prev,
		// 		address_3: {
		// 			checked: false,
		// 			tip: t("lbl_Wallet_Address_Required")
		// 		}
		// 	}));
		// 	finalResult = false;
		// }
		else {
			finalResult = true;
		}
		console.log("finalResult -> ", finalResult);
		return finalResult;
	};

	const clickSubmit = e => {
		e.preventDefault();
		checkBeforeSubmit();
		// if (checkBeforeSubmit()) {
		// 	setLoading(true);
		// 	api_accountStrict_SetCustBankInfo({
		// 		AccountName: accountName,
		// 		AccountNo: accountNumber
		// 		// SysId: bankInfo.sysId
		// 	}).then(
		// 		res => {
		// 			if (isMountedRef.current) {
		// 				if (res.data.errorCode === 0) {
		// 					reload(!alreadyHasAccountName);
		// 				} else {
		// 					setPopBox({
		// 						isOpen: true,
		// 						popBoxType: defPopBoxType.ErrorMsg,
		// 						message: res.data.message,
		// 						btnBar: (
		// 							<div className="btnGroup">
		// 								<button
		// 									className="btn-cancel"
		// 									onClick={clickClose}>
		// 									{t("lbl_Close")}
		// 								</button>
		// 							</div>
		// 						)
		// 					});
		// 				}
		// 				setLoading(false);
		// 			}
		// 		},
		// 		() => {
		// 			if (isMountedRef.current) {
		// 				setPopBox({
		// 					isOpen: true,
		// 					popBoxType: defPopBoxType.ErrorMsg,
		// 					message: t("msg_ApiServerError"),
		// 					btnBar: (
		// 						<div className="btnGroup">
		// 							<button
		// 								className="btn-cancel"
		// 								onClick={clickClose}>
		// 								{t("lbl_Close")}
		// 							</button>
		// 						</div>
		// 					)
		// 				});
		// 				setLoading(false);
		// 			}
		// 		}
		// 	);
		// }
	};

	const inputListLayout = defColList?.map(item => {
		const groupIdx = item.groupId;
		return (
			<span key={groupIdx}>
				<Inputbox
					className="inputBox-white"
					value={fake_walletList[groupIdx - 1]?.nickname}
					onChange={editField.bind(this, item.nickname)}
					onBlur={checkInput.bind(
						this,
						fake_walletList[groupIdx - 1]?.nickname,
						item.nickname
					)}
					clickInfo={clickInfo.bind(this, item.nickname)}
					title={t("lbl_Wallet_Nickname")}
					checked={status[item.nickname].checked}
					tip={status[item.nickname].tip}
					placeholder={t("lbl_Optional")}
				/>

				<Inputbox
					className="inputBox-white"
					value={fake_walletList[groupIdx - 1]?.address}
					onChange={editField.bind(this, item.address)}
					onBlur={checkInput.bind(
						this,
						fake_walletList[groupIdx - 1]?.address,
						item.address
					)}
					clickInfo={clickInfo.bind(this, item.address)}
					title={t("lbl_Wallet_Address")}
					checked={status[item.address].checked}
					tip={status[item.address].tip}
					placeholder={t("lbl_Please_Enter_Wallet_Address")}
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
					<div>{t("lbl_Enter_Wallet_Address")}</div>
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
						{!alreadyHasAccountName ? (
							<Inputbox
								className="inputBox-white"
								value={accountName}
								onChange={editField.bind(this, "accountName")}
								onBlur={checkInput.bind(
									this,
									accountName,
									"accountName"
								)}
								title={t("lbl_RealName")}
								clickInfo={clickInfo.bind(this, "accountName")}
								checked={status.accountName.checked}
								tip={status.accountName.tip}
							/>
						) : null}
						{inputListLayout}
						<div className="tip active">
							{t("lbl_Crypto_Wallet_Submit_Note")}
							<br />
							{t("lbl_Modification_Please_Contact_CSD")}
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
