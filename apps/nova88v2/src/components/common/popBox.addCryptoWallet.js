import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { api_account_SetCustUSDTInfoBatch } from "../../service/api/accountStrict";
import { popBoxContext, userInfoContext } from "./context";
import usePopBox from "../hook/usePopBox";
import defPopBoxType from "./defPopBoxType";
import Inputbox from "./inputbox";

export const colType = {
	nickName: "nickName",
	address: "address"
};

const defStatus = {
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
	},
	nickname_3: {
		checked: null,
		tip: ""
	},
	address_3: {
		checked: null,
		tip: ""
	}
};
export default ({ GetCustBankInfo }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox } = usePopBox();
	const isMountedRef = useRef(null);
	const [status, setStatus] = useState(defStatus);
	const [walletDatas, setWalletDatas] = useState({
		nickname_1: "",
		address_1: "",
		nickname_2: "",
		address_2: "",
		nickname_3: "",
		address_3: ""
	});

	const cryptoInputDataList = [
		{
			label: "nickname_1",
			title: t("lbl_CryptoWalletNickName"),
			colType: colType.nickName,
			value: walletDatas.nickname_1,
			checked: status.nickname_1.checked,
			tip: status.nickname_1.tip
		},
		{
			label: "address_1",
			title: t("lbl_CryptoWalletAddress"),
			colType: colType.address,
			value: walletDatas.address_1,
			checked: status.address_1.checked,
			tip: status.address_1.tip
		},
		{
			label: "nickname_2",
			title: t("lbl_CryptoWalletNickName"),
			colType: colType.nickName,
			value: walletDatas.nickname_2,
			checked: status.nickname_2.checked,
			tip: status.nickname_2.tip
		},
		{
			label: "address_2",
			title: t("lbl_CryptoWalletAddress"),
			colType: colType.address,
			value: walletDatas.address_2,
			checked: status.address_2.checked,
			tip: status.address_2.tip
		},
		{
			label: "nickname_3",
			title: t("lbl_CryptoWalletNickName"),
			colType: colType.nickName,
			value: walletDatas.nickname_3,
			checked: status.nickname_3.checked,
			tip: status.nickname_3.tip
		},
		{
			label: "address_3",
			title: t("lbl_CryptoWalletAddress"),
			colType: colType.address,
			value: walletDatas.address_3,
			checked: status.address_3.checked,
			tip: status.address_3.tip
		}
	];

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const clickCancel = () => {
		setPopBox({ isOpen: false, refresh: true });
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

		if (_val && _colType === colType.nickname) {
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

		if (_addressResultList.includes(false)) {
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
			AccountName: userInfo.accountName,
			USDTInfo: combineUsdtData()
		};

		if (checkBeforeSubmit()) {
			api_account_SetCustUSDTInfoBatch(payload).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.AddBankSuccess,
								refresh: true,
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-check"
											onClick={clickCancel}>
											OK
										</button>
									</div>
								)
							});
							GetCustBankInfo();
						} else {
							errorPopBox(
								res.data.message || "error",
								res.data.errorCode
							);
						}
					}
				},
				() => {
					if (!isMountedRef.current) return;
					errorPopBox();
				}
			);
		}
	};

	const group_cryptoInputDataList = cryptoInputDataList.reduce(
		(r, e, i) => (i % 2 ? r[r.length - 1].push(e) : r.push([e])) && r,
		[]
	);

	const cryptoInputList = group_cryptoInputDataList.map(group =>
		group.map(item => {
			return (
				<>
					<Inputbox
						key={`crypto-wallet-input-${item.label}`}
						className={`inputBox-white${
							item.checked === false && item.tip !== ""
								? " error"
								: ""
						}`}
						value={item.value}
						onChange={editField.bind(
							this,
							item.label,
							item.colType
						)}
						onBlur={checkInput.bind(
							this,
							item.label,
							item.colType,
							item.value
						)}
						title={item.title}
						clickInfo={clickInfo.bind(
							this,
							item.label,
							item.colType
						)}
						checked={item.checked}
						tip={item.tip}
						placeholder={
							item.colType === colType.nickName
								? t("lbl_Optional")
								: ""
						}
					/>
					{item.colType === colType.address ? <br /> : null}
				</>
			);
		})
	);

	const hasCheckFalseStatus = Object.values(status)
		.map(item => item.checked)
		.includes(false);
	const firstAddressNotPass = status.address_1.checked !== true;
	const disableSubmit = hasCheckFalseStatus || firstAddressNotPass;

	return (
		<div className="addBankpop active">
			<span className="title">{t("lbl_Add_Crypto_Wallet")}</span>
			<form className="subModuleBody column" onSubmit={clickSubmit}>
				{cryptoInputList}
				<div className="tip active">
					{t("lbl_Crypto_Wallet_Submit_Note")}
					<br />
					{t("lbl_Modification_Please_Contact_CSD")}
				</div>
				<div className="btnGroup">
					<button className="btn-cancel" onClick={clickCancel}>
						{t("lbl_Cancel")}
					</button>
					<button
						className={disableSubmit ? "btn-cancel" : "btn-check"}
						type="submit">
						{t("lbl_Submit")}
					</button>
				</div>
			</form>
		</div>
	);
};
