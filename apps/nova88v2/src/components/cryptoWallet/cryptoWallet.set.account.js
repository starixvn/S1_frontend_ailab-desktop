import React, { useState, useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
	defActionType,
	defStatus,
} from "./cryptoWallet.reducer";
import { api_account_SetCustUSDTInfoBatch } from "../../service/api/accountStrict";
import { popBoxContext } from "../common/context";
import Inputbox from "../common/inputbox";
import defPopBoxType from "../common/defPopBoxType";
import Loading from "../common/loading";

export default ({
	dispatch,
	accountName,
	setAccountName,
	alreadyHasAccountName,
	reload
}) => {
	const { t } = useTranslation();
	const { setPopBox } = useContext(popBoxContext);
	const [status, setStatus] = useState(defStatus);
	const [loading, setLoading] = useState(false);
	const isMountedRef = useRef(null);
	const [walletDatas, setWalletDatas] = useState({
		nickname_1: "",
		address_1: "",
		nickname_2: "",
		address_2: "",
		nickname_3: "",
		address_3: ""
	});

	const colType = {
		accountName: "accountName",
		nickName: "nickName",
		address: "address"
	};

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

	const clickInfo = (col, _colType) => {
		const getMsg = () => {
			let msg;
			if (_colType === colType.accountName) {
				msg = t("lbl_BankAccountNameHint");
			} else if (_colType === colType.nickName) {
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

	const editField = (_col, _colType, e) => {
		const val = e.target.value;
		let regex = null;
		if (_colType === colType.accountName) {
			setAccountName(val);
		}
		if (_colType === colType.address) {
			regex = /^[a-zA-Z0-9@$*!%#?&]*$/;
		}
		if (val === "" || regex === null || (regex && regex.test(val))) {
			setWalletDatas(prev => ({
				...prev,
				[_col]: val
			}));
		}
	};

	const checkInput = (_col, _colType, _val) => {
		let checked = null;
		let message = "";

		if (_colType === colType.accountName && !alreadyHasAccountName) {
			if (!_val) {
				message = t("msg_EnterRealName");
				checked = false;
			}
		} else if (_val && _colType === colType.nickname) {
			checked = true;
		} else if (_colType === colType.address) {
			const addressRegex = /^[a-zA-Z0-9@$*!%#?&]*$/;
			if (_val) {
				if (!addressRegex.test(_val)) {
					message = t("msg_AccountWrongFormat");
					checked = false;
				} else {
					checked = true;
				}
			} else if (
				(_col === "address_1" && !_val) ||
				(_col === "address_2" && walletDatas.nickname_2.length > 0) ||
				(_col === "address_3" && walletDatas.nickname_3.length > 0)
			) {
				message = t("lbl_Wallet_Address_Required");
				checked = false;
			}
		}
		setStatus(prev => ({
			...prev,
			[_col]: {
				checked,
				tip: message
			}
		}));
		return { checked, message };
	};

	const checkBeforeSubmit = () => {
		let finalResult = false;
		const _accountNameResult = checkInput(
			"accountName",
			colType.accountName,
			accountName
		).checked;

		const _addressResultList = [];
		Object.values(walletDatas)
			.filter((_address, _index) => (_index + 1) % 2 === 0)
			.forEach((_val, idx) => {
				const check = checkInput(
					`address_${idx + 1}`,
					colType.address,
					_val
				).checked;
				_addressResultList.push(check);
			});

		if (
			_accountNameResult === false ||
			_addressResultList.includes(false)
		) {
			finalResult = false;
		} else {
			finalResult = true;
		}
		return finalResult;
	};

	const combineUsdtData = () => {
		const combineArr = [
			{
				NickName: walletDatas.nickname_1,
				USDTAddress: walletDatas.address_1
			},
			{
				NickName: walletDatas.nickname_2,
				USDTAddress: walletDatas.address_2
			},
			{
				NickName: walletDatas.nickname_2,
				USDTAddress: walletDatas.address_3
			}
		];
		const filterArr = combineArr.filter(item => item.USDTAddress !== "");
		return filterArr;
	};

	const clickSubmit = e => {
		e.preventDefault();
		checkBeforeSubmit();

		const payload = {
			AccountName: accountName,
			USDTInfo: combineUsdtData()
		};

		if (checkBeforeSubmit()) {
			setLoading(true);
			api_account_SetCustUSDTInfoBatch(payload).then(
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
						{alreadyHasAccountName ? null : (
							<Inputbox
								className="inputBox-white"
								value={accountName}
								onChange={editField.bind(
									this,
									"accountName",
									colType.accountName
								)}
								onBlur={checkInput.bind(
									this,
									"accountName",
									colType.accountName,
									accountName
								)}
								title={t("lbl_RealName")}
								clickInfo={clickInfo.bind(
									this,
									"accountName",
									colType.accountName
								)}
								checked={status.accountName.checked}
								tip={status.accountName.tip}
							/>
						)}
						<Inputbox
							className="inputBox-white"
							value={walletDatas.nickname_1}
							onChange={editField.bind(
								this,
								"nickname_1",
								colType.nickName
							)}
							onBlur={checkInput.bind(
								this,
								"nickname_1",
								colType.nickName,
								walletDatas.nickname_1
							)}
							title={t("lbl_Wallet_Nickname")}
							clickInfo={clickInfo.bind(
								this,
								"nickname_1",
								colType.nickName
							)}
							checked={status.nickname_1.checked}
							tip={status.nickname_1.tip}
							placeholder={t("lbl_Optional")}
						/>
						<Inputbox
							className="inputBox-white"
							value={walletDatas.address_1}
							onChange={editField.bind(
								this,
								"address_1",
								colType.address
							)}
							onBlur={checkInput.bind(
								this,
								"address_1",
								colType.address,
								walletDatas.address_1
							)}
							title={t("lbl_Wallet_Address")}
							clickInfo={clickInfo.bind(
								this,
								"address_1",
								colType.address
							)}
							checked={status.address_1.checked}
							tip={status.address_1.tip}
							placeholder={t("lbl_Please_Enter_Wallet_Address")}
						/>
						<Inputbox
							className="inputBox-white"
							value={walletDatas.nickname_2}
							onChange={editField.bind(
								this,
								"nickname_2",
								colType.nickName
							)}
							onBlur={checkInput.bind(
								this,
								"nickname_2",
								colType.nickName,
								walletDatas.nickname_2
							)}
							title={t("lbl_Wallet_Nickname")}
							clickInfo={clickInfo.bind(
								this,
								"nickname_2",
								colType.nickName
							)}
							checked={status.nickname_2.checked}
							tip={status.nickname_2.tip}
							placeholder={t("lbl_Optional")}
						/>
						<Inputbox
							className="inputBox-white"
							value={walletDatas.address_2}
							onChange={editField.bind(
								this,
								"address_2",
								colType.address
							)}
							onBlur={checkInput.bind(
								this,
								"address_2",
								colType.address,
								walletDatas.address_2
							)}
							title={t("lbl_Wallet_Address")}
							clickInfo={clickInfo.bind(
								this,
								"address_2",
								colType.address
							)}
							checked={status.address_2.checked}
							tip={status.address_2.tip}
							placeholder={t("lbl_Please_Enter_Wallet_Address")}
						/>
						<Inputbox
							className="inputBox-white"
							value={walletDatas.nickname_3}
							onChange={editField.bind(
								this,
								"nickname_3",
								colType.nickName
							)}
							onBlur={checkInput.bind(
								this,
								"nickname_3",
								colType.nickName,
								walletDatas.nickname_3
							)}
							title={t("lbl_Wallet_Nickname")}
							clickInfo={clickInfo.bind(
								this,
								"nickname_3",
								colType.nickName
							)}
							checked={status.nickname_3.checked}
							tip={status.nickname_3.tip}
							placeholder={t("lbl_Optional")}
						/>
						<Inputbox
							className="inputBox-white"
							value={walletDatas.address_3}
							onChange={editField.bind(
								this,
								"address_3",
								colType.address
							)}
							onBlur={checkInput.bind(
								this,
								"address_3",
								colType.address,
								walletDatas.address_3
							)}
							title={t("lbl_Wallet_Address")}
							clickInfo={clickInfo.bind(
								this,
								"address_3",
								colType.address
							)}
							checked={status.address_3.checked}
							tip={status.address_3.tip}
							placeholder={t("lbl_Please_Enter_Wallet_Address")}
						/>
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
