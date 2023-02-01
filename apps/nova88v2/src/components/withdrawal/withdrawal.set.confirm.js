import React, { useEffect, useRef, useContext, useState } from "react";
import PropTypes from "prop-types";
import { popBoxContext } from "../common/context";
import { number_format } from "../common/common";
import defPopBoxType from "../common/defPopBoxType";
import usePopBox from "../hook/usePopBox";
import { defActionType, defPanel } from "./withdrawal.reducer";
import {
	api_payment_WithdrawalReq,
	api_payment_WithdrawalEWalletReq,
	api_payment_WithdrawalCryptoReq,
	api_payment_GetExchangeInfo
} from "../../service/api/payment";
import { Iov_GetBlackBox } from "../common/iovation";

const ConfirmPanel = ({
	dispatch,
	t,
	_isConvert,
	selectedAccount,
	accountName,
	amount,
	GetCustBankInfo,
	refreshData,
	KycCheck,
	GetDailyWithdrawalLimit,
	isIfscRequired
}) => {
	const { setPopBox } = useContext(popBoxContext);
	const [receiveUSDT, setReceiveUSDT] = useState();
	const isMountedRef = useRef(null);
	const { errorPopBox } = usePopBox();
	const _accountNo = selectedAccount.accountNo;
	const real_amount = _isConvert ? Number(amount) * 1000 : Number(amount);
	const { currencyName, network } = selectedAccount;
	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (currencyName || network) {
			api_payment_GetExchangeInfo({
				Amount: real_amount,
				CurrencyName: currencyName,
				Network: network
			}).then(
				res => {
					const { errorCode, message, data } = res.data;
					if (errorCode === 0) {
						setReceiveUSDT(Number(data.to_Amount).toString());
					} else {
						errorPopBox(message || "error", errorCode);
					}
				},
				() => {
					errorPopBox();
				}
			);
		}
	}, [real_amount, currencyName, network, errorPopBox]);

	const toAmountPanel = () => {
		dispatch({
			type: defActionType.TO_OTHER_PANEL,
			panel: defPanel.amount
		});
	};

	useEffect(() => {
		if (currencyName) {
			api_payment_GetExchangeInfo({
				Amount: real_amount,
				CurrencyName: currencyName,
				Network: network
			}).then(
				res => {
					const { errorCode, message, data } = res.data;
					if (errorCode === 0) {
						setReceiveUSDT(Number(data.to_Amount).toString());
					} else {
						errorPopBox(message || "error", errorCode);
					}
				},
				() => {
					errorPopBox();
				}
			);
		}
	}, [real_amount, currencyName, network, errorPopBox]);

	const clickSubmit = async () => {
		const setInitState = () => {
			dispatch({ type: defActionType.SET_INIT_STATE });
			GetDailyWithdrawalLimit();
			GetCustBankInfo();
			refreshData();
			KycCheck();
			setPopBox({ isOpen: false });
		};

		const ClosePopBox = () => {
			setPopBox({ isOpen: false });
		};

		const blackbox = await Iov_GetBlackBox();

		const judgeSubmit = async () => {
			let data = null;
			if (!selectedAccount.usdtAddress) {
				selectedAccount.ifscCode === undefined
					? await api_payment_WithdrawalEWalletReq({
							AccountNo: selectedAccount.accountNo,
							amount: real_amount,
							sysId: selectedAccount.sysId,
							memo: "",
							blackbox
					  }).then(res => {
							data = res;
					  })
					: await api_payment_WithdrawalReq({
							AccountNo: selectedAccount.accountNo,
							amount: real_amount,
							sysId: selectedAccount.sysId,
							blackbox,
							IFSCCode: isIfscRequired
								? selectedAccount.ifscCode
								: null
					  }).then(res => {
							data = res;
					  });
			} else {
				await api_payment_WithdrawalCryptoReq({
					AccountNo: selectedAccount.usdtAddress,
					amount: real_amount,
					blackbox,
					CurrencyId: selectedAccount.currencyId
				}).then(res => {
					data = res;
				});
			}
			return data;
		};

		try {
			const res = await judgeSubmit();
			if (isMountedRef.current) {
				if (res.data.errorCode === 0 || res.data.errorCode === 2) {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.WithdrawalSuccess,
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-check"
									onClick={setInitState}
								>
									OK
								</button>
							</div>
						)
					});
				} else if (res.data.errorCode === -1) {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.ErrorMsg,
						message: `${t("lbl_RolloverOver")}:${res.data.message}`,
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-check"
									onClick={ClosePopBox}
								>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
				} else if (res.data.errorCode === -2) {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.ErrorMsg,
						message: `${t("lbl_DepositOver")}:${res.data.message}`,
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-check"
									onClick={ClosePopBox}
								>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
				} else if (res.data.errorCode === -3) {
					setPopBox({
						isOpen: true,
						popBoxType: defPopBoxType.ErrorMsg,
						message: `${t("lbl_WithdrawalOver")}: ${parseInt(
							res.data.message,
							10
						).toString()}`,
						btnBar: (
							<div className="btnGroup">
								<button
									className="btn-check"
									onClick={ClosePopBox}
								>
									{t("lbl_Close")}
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
									className="btn-check"
									onClick={ClosePopBox}
								>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
				}
			}
		} catch (error) {
			if (isMountedRef.current) {
				setPopBox({
					isOpen: true,
					popBoxType: defPopBoxType.ErrorMsg,
					message: t("msg_ApiServerError"),
					btnBar: (
						<div className="btnGroup">
							<button className="btn-check" onClick={ClosePopBox}>
								{t("lbl_Close")}
							</button>
						</div>
					)
				});
			}
		}
	};
	return (
		<div className="subModule">
			<div className="subModuleBody column align-items-center">
				<span className="title">{t("lbl_ImportantNote")}</span>
				<div className="txt-lightgray">
					{t("lbl_ConfirmWithdrawal")}
				</div>
				{!selectedAccount.usdtAddress ? (
					<DetailInfo
						t={t}
						selectedAccount={selectedAccount}
						_accountNo={_accountNo}
						isIfscRequired={isIfscRequired}
						_isConvert={_isConvert}
						amount={amount}
						accountName={accountName}
					/>
				) : (
					<CryptoDetailInfo
						t={t}
						selectedAccount={selectedAccount}
						_isConvert={_isConvert}
						amount={amount}
						receiveUSDT={receiveUSDT}
					/>
				)}
				<div className="btnGroup">
					<button className="btn-cancel" onClick={toAmountPanel}>
						{t("lbl_Cancel")}
					</button>
					<button className="btn-check" onClick={clickSubmit}>
						{t("lbl_Submit")}
					</button>
				</div>
			</div>
		</div>
	);
};

ConfirmPanel.propTypes = {
	dispatch: PropTypes.func.isRequired,
	t: PropTypes.func.isRequired,
	_isConvert: PropTypes.bool.isRequired,
	selectedAccount: PropTypes.objectOf(PropTypes.any).isRequired,
	amount: PropTypes.string.isRequired,
	GetCustBankInfo: PropTypes.func.isRequired,
	refreshData: PropTypes.func.isRequired,
	KycCheck: PropTypes.func.isRequired,
	GetDailyWithdrawalLimit: PropTypes.func.isRequired,
	isIfscRequired: PropTypes.bool.isRequired,
	accountName: PropTypes.string.isRequired
};

const DetailInfo = ({
	t,
	selectedAccount,
	_accountNo,
	isIfscRequired,
	_isConvert,
	amount,
	accountName
}) => (
	<div className="smallList">
		<ul>
			<li>{t("lbl_WithdrawalTo")}</li>
			<li>{selectedAccount.bankName}</li>
		</ul>
		<ul>
			<li>{t("lbl_AccountNumber")}</li>
			<li className="accountNumber">
				<span>{_accountNo?.slice(0, 4)}</span>
				<span>{_accountNo?.slice(4, 8)}</span>
				<span>{_accountNo?.slice(8, 12)}</span>
				<span>{_accountNo?.slice(12, 16)}</span>
			</li>
		</ul>
		<ul>
			<li>{t("lbl_BankAccountName")}</li>
			<li>{accountName}</li>
		</ul>

		<ul>
			<li>{t("lbl_WithdrawalAmount")}</li>
			<li>
				{number_format(_isConvert ? amount * 1000 : amount, _isConvert)}
			</li>
		</ul>
		{isIfscRequired && (
			<ul>
				<li>{t("lbl_IFSCCode")}</li>
				<li>{selectedAccount.ifscCode ?? ""}</li>
			</ul>
		)}
	</div>
);

DetailInfo.propTypes = {
	t: PropTypes.func.isRequired,
	_isConvert: PropTypes.bool.isRequired,
	selectedAccount: PropTypes.objectOf(PropTypes.any).isRequired,
	amount: PropTypes.string.isRequired,
	isIfscRequired: PropTypes.bool.isRequired,
	_accountNo: PropTypes.string.isRequired,
	accountName: PropTypes.string.isRequired
};

const CryptoDetailInfo = ({
	t,
	selectedAccount,
	_isConvert,
	amount,
	receiveUSDT
}) => (
	<>
		<div className="smallList">
			<ul>
				<li>{t("lbl_CryptoWalletAddress")}</li>
				<li>{selectedAccount.usdtAddress}</li>
			</ul>
			<ul>
				<li>{t("lbl_CryptoWalletNickName")}</li>
				<li>{selectedAccount.nickName}</li>
			</ul>

			<ul>
				<li>{t("lbl_WithdrawalAmount")}</li>
				<li>
					{number_format(
						_isConvert ? amount * 1000 : amount,
						_isConvert
					)}
				</li>
			</ul>
			<ul>
				<li>
					{t("lbl_ReceiveUSDT", {
						currencyName: selectedAccount.currencyName
					})}
				</li>
				<li>{receiveUSDT}</li>
			</ul>
		</div>
		<div className="txt-lightgray">{t("lbl_WithdrawalCryptoNote")}</div>
	</>
);

CryptoDetailInfo.defaultProps = {
	receiveUSDT: null
};

CryptoDetailInfo.propTypes = {
	t: PropTypes.func.isRequired,
	_isConvert: PropTypes.bool.isRequired,
	selectedAccount: PropTypes.objectOf(PropTypes.any).isRequired,
	amount: PropTypes.string.isRequired,
	receiveUSDT: PropTypes.string
};

export default ConfirmPanel;
