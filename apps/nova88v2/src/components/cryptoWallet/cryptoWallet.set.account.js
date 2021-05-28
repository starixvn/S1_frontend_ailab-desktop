import React, { useState, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { defActionType, colType } from "./cryptoWallet.reducer";
import { api_account_SetCustUSDTInfoBatch } from "../../service/api/accountStrict";
import { popBoxContext } from "../common/context";
import usePopBox from "../hook/usePopBox";
import Inputbox from "../common/inputbox";
import defPopBoxType from "../common/defPopBoxType";
import Loading from "../common/loading";

const AccountPanel = ({
	dispatch,
	t,
	accountName,
	setAccountName,
	alreadyHasAccountName,
	reload,
	cryptoInputDataList,
	status,
	setStatus,
	walletDatas,
	setWalletDatas
}) => {
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox } = usePopBox();
	const [loading, setLoading] = useState(false);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const toLastStep = () => {
		dispatch({ type: defActionType.TO_LAST_STEP });
	};

	const clickInfo = (col, _colType) => {
		const getMsg = () => {
			let msg;
			if (_colType === colType.accountName) {
				msg = t("lbl_BankAccountNameHint");
			} else if (_colType === colType.nickName) {
				msg = t("lbl_Wallet_NickName_Tip");
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
		const WAValidator = require("multicoin-address-validator");
		const isValidAddress = WAValidator.validate(_val, "eth");

		const _addressList = Object.values(walletDatas).filter(
			(_address, _index) => (_index + 1) % 2 === 0 && _address?.length > 0
		);
		const hasRepeatAddress =
			_addressList.filter(_address => _address === _val).length > 1;

		if (_colType === colType.accountName && !alreadyHasAccountName) {
			if (!_val) {
				message = t("msg_EnterRealName");
				checked = false;
			}
		} else if (_val && _colType === colType.nickname) {
			checked = true;
		} else if (_colType === colType.address) {
			if (_val) {
				if (isValidAddress) {
					if (hasRepeatAddress) {
						message = t("lbl_already_stored_this_information");
						checked = false;
					} else {
						checked = true;
					}
				} else {
					message = t("lbl_NotERC20WalletAddr");
					checked = false;
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

		const clickClose = () => {
			setPopBox({ isOpen: false });
		};

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
											className="btn-check"
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
					setLoading(false);
					if (!isMountedRef.current) return;
					errorPopBox();
				}
			);
		}
	};

	const cryptoInputList = cryptoInputDataList.map(item => {
		return (
			<div>
				<Inputbox
					key={`crypto-wallet-input-${item.nickname.label}`}
					className={`inputBox-white${
						item.nickname.checked === false &&
						item.nickname.tip !== ""
							? " error"
							: ""
					}`}
					value={item.nickname.value}
					onChange={editField.bind(
						this,
						item.nickname.label,
						item.nickname.colType
					)}
					onBlur={checkInput.bind(
						this,
						item.nickname.label,
						item.nickname.colType,
						item.nickname.value
					)}
					title={item.nickname.title}
					clickInfo={clickInfo.bind(
						this,
						item.nickname.label,
						item.nickname.colType
					)}
					checked={item.nickname.checked}
					tip={item.nickname.tip}
					placeholder={
						item.nickname.colType === colType.nickName
							? t("lbl_Optional")
							: ""
					}
				/>
				<br />
				<Inputbox
					key={`crypto-wallet-input-${item.address.label}`}
					className={`inputBox-white${
						item.address.checked === false &&
						item.address.tip !== ""
							? " error"
							: ""
					}`}
					value={item.address.value}
					onChange={editField.bind(
						this,
						item.address.label,
						item.address.colType
					)}
					onBlur={checkInput.bind(
						this,
						item.address.label,
						item.address.colType,
						item.address.value
					)}
					title={item.address.title}
					clickInfo={clickInfo.bind(
						this,
						item.address.label,
						item.address.colType
					)}
					checked={item.address.checked}
					tip={item.address.tip}
					placeholder={
						item.address.colType === colType.nickName
							? t("lbl_Optional")
							: ""
					}
				/>
			</div>
		);
	});

	const hasCheckFalseStatus = Object.values(status)
		.map(item => item.checked)
		.includes(false);
	const firstAddressNotPass = status.address_1.checked !== true;
	const disableSubmit = hasCheckFalseStatus || firstAddressNotPass;

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
							<div>
								<Inputbox
									className={`inputBox-white${
										status.accountName.checked === false &&
										status.accountName.tip !== ""
											? " error"
											: ""
									}`}
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
							</div>
						)}
						{cryptoInputList}
						<div className="tip active">
							{t("lbl_Crypto_Wallet_Submit_Note")}
							<br />
							{t("lbl_Modification_Please_Contact_CSD")}
						</div>
						<div className="btnGroup">
							<button
								className={
									disableSubmit ? "btn-cancel" : "btn-check"
								}
								type="submit">
								{t("lbl_Submit")}
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

AccountPanel.defaultProps = {
	accountName: ""
};

AccountPanel.propTypes = {
	dispatch: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
	accountName: PropTypes.string,
	setAccountName: PropTypes.func.isRequired,
	alreadyHasAccountName: PropTypes.bool.isRequired,
	reload: PropTypes.func.isRequired,
	cryptoInputDataList: PropTypes.arrayOf(PropTypes.any).isRequired,
	status: PropTypes.objectOf(PropTypes.any).isRequired,
	setStatus: PropTypes.func.isRequired,
	walletDatas: PropTypes.objectOf(PropTypes.any).isRequired,
	setWalletDatas: PropTypes.func.isRequired
};

export default AccountPanel;
