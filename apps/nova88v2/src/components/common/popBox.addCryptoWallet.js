import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import WAValidator from "multicoin-address-validator";
import {
	api_accountStrict_SetCustUSDTInfoBatch,
	api_accountStrict_SendOTPSMS,
	api_accountStrict_getOTPVerifyInfo,
	api_accountStrict_VerifyOTP
} from "../../service/api/accountStrict";
import { api_payment_getSupportNetwork } from "../../service/api/payment";
import { popBoxContext, userInfoContext } from "./context";
import usePopBox from "../hook/usePopBox";
import defPopBoxType from "./defPopBoxType";
import Inputbox from "./inputbox";
import Dropdown from "./dropdown";

export const Counter = ({ startUnixTime, timeStop }) => {
	const now = moment().unix();
	const [count, setCount] = useState(startUnixTime + 300 - now);
	const timerRef = useRef(null);

	const secondsToTime = secondsInTime => {
		const pad = (num, size) => {
			return `000${num}`.slice(size * -1);
		};
		const time = parseFloat(secondsInTime).toFixed(3);
		const minutes = Math.floor(time / 60) % 60;
		const seconds = Math.floor(time - minutes * 60);
		return `${pad(minutes, 2)}:${pad(seconds, 2)}`;
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setCount(prev => prev - 1);
		}, 1000);
		timerRef.current = interval;

		return () => {
			clearInterval(timerRef.current);
		};
	}, []);

	useEffect(() => {
		if (count === 0) {
			clearInterval(timerRef.current);
			timeStop();
		}
	}, [count, timeStop]);

	return ` ( ${secondsToTime(count)} ) `;
};

export const colType = {
	nickName: "nickName",
	usdtAddress: "usdtAddress",
	OTP: "OTP",
	currencyId: "currencyId"
};

const defStatus = {
	nickName: {
		checked: null,
		tip: ""
	},
	usdtAddress: {
		checked: null,
		tip: ""
	},
	network: {
		checked: null,
		tip: ""
	},
	OTP: {
		checked: null,
		tip: ""
	},
	currencyId: {
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
	const [startUnixTime, setStartUnixTime] = useState(null);
	const [timer, setTimer] = useState(false);
	const [selectedCurrency, setSelCurrency] = useState(0);
	const [selectedNetWork, setSelNetWork] = useState(0);
	const [network_opt, set_network_opt] = useState([]);
	const [status, setStatus] = useState(defStatus);
	const [walletDatas, setWalletDatas] = useState({
		nickName: "",
		usdtAddress: "",
		network: "",
		currencyId: 96,
		OTP: ""
	});

	const clickResend = () => {
		api_accountStrict_SendOTPSMS().then(
			response => {
				if (isMountedRef.current) {
					if (response.data.errorCode === 0 && response.data.data) {
						setStartUnixTime(response.data.data.startUnixTime);
						setTimer(true);
					} else {
						errorPopBox(
							response.data.message || "error",
							response.data.errorCode
						);
					}
				}
			},
			err => {
				if (isMountedRef.current) {
					errorPopBox();
				}
			}
		);
	};

	const timeStop = () => {
		setTimer(false);
	};

	const onSelNetWork = (i, item) => {
		setSelNetWork(i);
		setWalletDatas(prev => ({ ...prev, network: item.id }));
	};

	const onSelCurrency = (i, item) => {
		setSelCurrency(i);
		setWalletDatas(prev => ({ ...prev, currencyId: item.id }));
	};

	const cryptoInputDataList = [
		{
			title: t("lbl_CryptoWalletNickName"),
			colType: colType.nickName,
			value: walletDatas.nickName,
			checked: status.nickName.checked,
			tip: status.nickName.tip
		},
		{
			title: t("lbl_CryptoWalletAddress"),
			colType: colType.usdtAddress,
			value: walletDatas.usdtAddress,
			checked: status.usdtAddress.checked,
			tip: status.usdtAddress.tip
		},
		{
			title: "OTP",
			colType: colType.OTP,
			value: walletDatas.OTP,
			checked: status.OTP.checked,
			tip: status.OTP.tip
		}
	];

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		api_payment_getSupportNetwork()
			.then(res => {
				if (res.data.errorCode === 0 && res.data?.data) {
					const options = res.data.data.map(el => ({
						id: el.network,
						displayText: el.network
					}));
					set_network_opt(options);
					onSelNetWork(0, options[0]);
				}
			})
			.catch(() => {
				errorPopBox();
			});
		api_accountStrict_getOTPVerifyInfo().then(
			response => {
				if (isMountedRef.current) {
					if (response.data?.data?.startUnixTime) {
						setStartUnixTime(response.data.data.startUnixTime);
						setTimer(true);
					}
				}
			},
			err => {
				if (isMountedRef.current) {
					errorPopBox();
				}
			}
		);
	}, []);

	const clickCancel = () => {
		setPopBox({ isOpen: false, refresh: true });
	};

	const editField = (_colType, e) => {
		const val = e.target.value;
		setWalletDatas(prev => ({
			...prev,
			[_colType]: val
		}));
	};

	const checkCol = (_colType, _val) => {
		let checked = null;
		let message = "";
		const isValidAddress =
			WAValidator.validate(_val, "usdt") ||
			WAValidator.validate(_val, "trx");

		if (_colType === colType.usdtAddress) {
			if (isValidAddress) {
				checked = true;
			} else {
				message = t("lbl_NotERC20WalletAddr");
				checked = false;
			}
		}
		setStatus(prev => ({
			...prev,
			[_colType]: {
				checked,
				tip: message
			}
		}));
		return { checked, message };
	};

	const clickSubmit = e => {
		e.preventDefault();

		const payload = {
			AccountName: userInfo.accountName,
			USDTInfo: [walletDatas]
		};

		if (status.usdtAddress.checked) {
			api_accountStrict_VerifyOTP({
				inputOTPcode: walletDatas.OTP
			})
				.then(otp_res => {
					if (otp_res.data.errorCode === 0 && isMountedRef.current) {
						api_accountStrict_SetCustUSDTInfoBatch(payload).then(
							res => {
								if (isMountedRef.current) {
									if (res.data.errorCode === 0) {
										setPopBox({
											isOpen: true,
											popBoxType:
												defPopBoxType.AddBankSuccess,
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
					} else if (otp_res.data.errorCode !== 0) {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: t("msg_OTP_Invalid"),
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-check"
										onClick={clickCancel}>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
					}
				})
				.catch(() => {
					errorPopBox();
				});
		}
	};

	const cols = [
		<div className="inputBox-blue">
			<span className="txt-red">*</span>
			<Dropdown
				i18n={t}
				mainKey="cryptoCurrency"
				options={[{ id: 96, displayKey: "Currency_96" }]}
				selectedIdx={selectedCurrency}
				onSelectItem={onSelCurrency}
			/>
		</div>,
		<div className="inputBox-blue">
			<span className="txt-red">*</span>
			<Dropdown
				i18n={t}
				mainKey="network"
				options={network_opt}
				selectedIdx={selectedNetWork}
				onSelectItem={onSelNetWork}
			/>
		</div>
	];
	cryptoInputDataList.forEach((item, idx) => {
		const common = (
			<Inputbox
				// eslint-disable-next-line react/no-array-index-key
				key={`crypto-wallet-input-${item.title}-${idx}`}
				className={`inputBox-blue${
					item.checked === false && item.tip !== "" ? " error" : ""
				}`}
				value={item.value}
				onChange={editField.bind(this, item.colType)}
				onBlur={checkCol.bind(this, item.colType, item.value)}
				title={item.title}
				checked={item.checked}
				tip={item.tip}
				placeholder={
					item.colType === colType.nickName ? t("lbl_Optional") : ""
				}
			/>
		);
		const ipt2 = (
			<div className="inputModuleRow">
				{common}
				<div className="btnGroup">
					{timer ? (
						<button className="btn-cancel">
							<Counter
								startUnixTime={startUnixTime}
								timeStop={timeStop}
							/>
						</button>
					) : (
						<button className="btn-check" onClick={clickResend}>
							<span>{t("lbl_Retransmit")}</span>
						</button>
					)}
				</div>
			</div>
		);
		item.colType === colType.OTP ? cols.push(ipt2) : cols.push(common);
	});

	return (
		<div className="addAddresspop active">
			<button className="icon icon-close" onClick={clickCancel} />
			<span className="title">{t("lbl_Add_Crypto_Wallet")}</span>
			<div>
				{cols}
				<div className="tip active">
					{t("lbl_Crypto_Wallet_Submit_Note")}
					<br />
					{t("lbl_Modification_Please_Contact_CSD")}
				</div>
			</div>
			<div className="btnGroup">
				<button className="btn-cancel" onClick={clickCancel}>
					{t("lbl_Cancel")}
				</button>
				<button
					onClick={clickSubmit}
					className={
						status.usdtAddress.checked ? "btn-check" : "btn-cancel"
					}
					type="submit">
					{t("lbl_Submit")}
				</button>
			</div>
		</div>
	);
};
