import React, { useEffect, useRef, useState, useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "gatsby";
import Available from "./withdrawal.set.available";
import Calculation from "./withdrawal.set.calculation";
// import CashBar from "./withdrawal.set.cashBar";
import InputModuleRow from "./withdrawal.set.inputModuleRow";
import BankInfoCard from "./withdrawal.set.bankInfoCard";
import { Crypto, useUSDTFetcher } from "./withdrawal.set.crypto";
import KycUpload from "./withdrawal.set.kycUpload";
import KycPending from "./withdrawal.set.kycPending";
import WithdrawalConfirm, {
	WithdrawalUSDTConFirm,
	WithdrawalEWalletConfirm
} from "./withdrawal.set.confirm";
import AddBankAccount from "./addBankAccount";
import {
	api_payment_WithdrawalReq,
	api_payment_WithdrawalEWalletReq
} from "../../service/api/payment";
import {
	api_account_GetCustBankInfo,
	api_account_GetCustEWalletInfo
} from "../../service/api/account";
import { userInfoContext } from "../common/context";
import { defPopBoxType } from "../common/popBox";
import usePopBox from "../hook/usePopBox";
import { getAmountTip, isConvert, checkAmount } from "../common/common";
import EWalletInfoCard from "./withdrawal.set.eWallet";
import AddEWallet from "./addEWallet";
import { WITHDRAWAL_BLOCK_SETTING_TYPE } from "./defStep";

import path from "../../router";

export const WITHDRAWAL_TYPE = {
	BANK: "bank",
	USDT: "usdt",
	EWallet: "eWallet"
};

const INIT_BANK_INFO_DETAIL = { accountNo: "", bankName: "", sysId: null };

const INIT_E_WALLET_INFO_DETAIL = {
	accountNo: "",
	eWalletName: "",
	sysId: null
};

const INIT_USED_DETAIL = {
	nickName: "",
	usdtAddress: "",
	network: "",
	currencyId: null
};

const INIT_BANK_CUST_BANK_INFO = {
	accountName: "",
	defAccountNo: "",
	uSDTDetail: [],
	bankInfoDetail: []
};

const Main = ({
	balanceData,
	kycStatus,
	uSDTWithdrawalLimit,
	withdrawalLimit,
	getWithdrawalInfoRecent,
	getWithdrawalAvailableBalance,
	getWithdrawalLimit,
	getKycStatus,
	withdrawalSettingTypeList
}) => {
	const { t } = useTranslation();
	const { setPopBox, errorPopBox } = usePopBox();
	const [amountValue, setAmountValue] = useState("");
	const [showConfirmPage, setShowConfirmPage] = useState(false);
	const { userInfo } = useContext(userInfoContext);
	const _isConvert = isConvert(userInfo.currencyId);
	const [status, setStatus] = useState({
		checked: null,
		tip: ""
	});
	const [withdrawalType, setWithdrawalType] = useState(null);
	const [exchangeInfo, setExchangeInfo] = useState({
		exchangeRate: 0,
		exchangeAmount: 0
	});
	const [processing, setProcessing] = useState(false);
	const isMountedRef = useRef(null);

	const {
		confirmDeleteCryptoWallet,
		delCustUSDTInfo,
		getExchangeInfo,
		withdrawalUSDTReq
	} = useUSDTFetcher({
		isMountedRef
	});

	const [custBankInfo, setCustBankInfo] = useState(INIT_BANK_CUST_BANK_INFO);
	const [custEWalletInfo, setCustEWalletInfo] = useState([]);

	const [currentBankInfoDetail, setCurrentBankInfoDetail] = useState(
		INIT_BANK_INFO_DETAIL
	);
	const [currentUSDTDetail, setCurrentUSDTDetail] =
		useState(INIT_USED_DETAIL);
	const [currentEWalletDetail, setCurrentEWalletDetail] = useState(
		INIT_E_WALLET_INFO_DETAIL
	);

	// * 從後台 Payment GateWay 設定的開關
	const displayBankCard = withdrawalSettingTypeList?.find(
		item => item.type === WITHDRAWAL_BLOCK_SETTING_TYPE.BankCard
	)?.status;
	const displayEWallet = withdrawalSettingTypeList?.find(
		item => item.type === WITHDRAWAL_BLOCK_SETTING_TYPE.EWallet
	)?.status;
	const displayCrypto = withdrawalSettingTypeList?.find(
		item => item.type === WITHDRAWAL_BLOCK_SETTING_TYPE.Crypto
	)?.status;

	const onChangeExchangeInfo = ({ exchangeRate, exchangeAmount }) => {
		setExchangeInfo({ exchangeRate, exchangeAmount });
	};
	const getWithdrawalMinMaxLimit = () => {
		let limit = withdrawalLimit;

		if (withdrawalType === WITHDRAWAL_TYPE.USDT) {
			const _uSDTWithdrawalLimit = uSDTWithdrawalLimit.find(
				el =>
					el.currencyId === currentUSDTDetail.currencyId &&
					el.network === currentUSDTDetail.network
			);
			limit =
				{
					..._uSDTWithdrawalLimit,
					withdrawalMax: limit.withdrawalMax,
					unlimited: limit.unlimited,
					maxTimes: limit.limit
				} || {};
		}
		return limit;
	};

	const { withdrawalMin, withdrawalMax, unlimited } =
		getWithdrawalMinMaxLimit();

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const deleteCryptoHandler = async item => {
		const confirm = await confirmDeleteCryptoWallet();

		if (confirm) {
			const { nickName, usdtAddress, currencyId, network } = item;

			await delCustUSDTInfo({
				CurrencyId: currencyId,
				Network: network,
				NickName: nickName,
				Address: usdtAddress
			});

			getCustBankInfo();
		}
	};

	const getCustBankInfo = async () => {
		const selectPrevAccount = ({
			defAccountNo = "",
			bankInfoDetail = [],
			uSDTDetail = []
		}) => {
			const _currentBankInfoDetail = bankInfoDetail.find(
				item => item.accountNo === defAccountNo
			);

			const _currentUSDTDetail = uSDTDetail.find(
				item => item.usdtAddress === defAccountNo
			);

			if (_currentBankInfoDetail) {
				onChangeBankInfo(_currentBankInfoDetail || {});
			}

			if (_currentUSDTDetail) {
				onChangeUSDTInfo(_currentUSDTDetail || {});
			}
		};

		await api_account_GetCustBankInfo().then(
			res => {
				if (isMountedRef.current) {
					const { data, errorCode, message } = res.data;

					if (errorCode === 0) {
						if (data) {
							setCustBankInfo(data);
							selectPrevAccount(data);
						}
					} else {
						errorPopBox(message || "error", errorCode);
					}
				}
			},
			() => {
				if (isMountedRef.current) {
					errorPopBox();
				}
			}
		);
	};

	const getCustEWalletInfo = async () => {
		await api_account_GetCustEWalletInfo().then(
			res => {
				if (isMountedRef.current) {
					const { data, errorCode, message } = res.data;

					if (errorCode === 0) {
						if (data) {
							setCustEWalletInfo(data || []);
						}
					} else {
						errorPopBox(message || "error", errorCode);
					}
				}
			},
			() => {
				if (isMountedRef.current) {
					errorPopBox();
				}
			}
		);
	};

	useEffect(() => {
		getCustEWalletInfo();
		getCustBankInfo();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [balanceData]);

	useEffect(() => {
		if (userInfo.isLogin === true) {
			if (
				(!userInfo.phoneNo && userInfo.phoneNo !== undefined) ||
				(!userInfo.email && userInfo.email !== undefined)
			) {
				setPopBox({
					isOpen: true,
					popBoxType: defPopBoxType.UpdateProfile,
					title: t("lbl_ImportantNote"),
					content: t("lbl_UpdatePersonalInfoWithdrawal"),
					btnBar: (
						<div className="btnGroup">
							<Link
								className="btn-check"
								to={`/${userInfo.langId}/${path.profile.root}?prevPage=${path.withdrawal.root}`}>
								{t("lbl_UpdatePersonalDetail")}
							</Link>
						</div>
					)
				});
			}
		}
	}, [userInfo]);

	useEffect(() => {
		if (amountValue) {
			ValidAmount(amountValue);
		}
	}, [currentUSDTDetail, currentBankInfoDetail]);

	const refreshAvailableBalance = () => {
		getWithdrawalAvailableBalance();
	};

	const onChangeUSDTInfo = item => {
		setCurrentUSDTDetail(item);

		setCurrentBankInfoDetail(INIT_BANK_INFO_DETAIL);

		setCurrentEWalletDetail(INIT_E_WALLET_INFO_DETAIL);

		setWithdrawalType(WITHDRAWAL_TYPE.USDT);
	};

	const onChangeBankInfo = item => {
		setCurrentBankInfoDetail(item);

		setCurrentUSDTDetail(INIT_USED_DETAIL);

		setCurrentEWalletDetail(INIT_E_WALLET_INFO_DETAIL);

		setWithdrawalType(WITHDRAWAL_TYPE.BANK);
	};

	const onChangeEWalletInfo = item => {
		setCurrentEWalletDetail(item);

		setCurrentBankInfoDetail(INIT_BANK_INFO_DETAIL);

		setCurrentUSDTDetail(INIT_USED_DETAIL);

		setWithdrawalType(WITHDRAWAL_TYPE.EWallet);
	};

	const onChangeAmount = e => {
		let { value } = e.target;
		value = value.replace(/^(0+)|[^\d]+/g, "");
		ValidAmount(value);
		setAmountValue(value);
	};

	const ValidAmount = _amount => {
		let result = {};

		const real_amount = _isConvert
			? Number(_amount) * 1000
			: Number(_amount);

		const _withdrawalMin = currentEWalletDetail.eWalletName
			? withdrawalLimit?.eWalletWithdrawalMin
			: withdrawalMin;

		if (
			!unlimited &&
			currentEWalletDetail.eWalletName &&
			real_amount > withdrawalLimit?.eWalletWithdrawalAvailableAmount
		) {
			result = {
				status: 2,
				msg: t("lbl_NotinLimit")
			};
		} else if (!unlimited && real_amount > withdrawalMax) {
			result = {
				status: 2,
				msg: t("lbl_WithdrawalDailyReached")
			};
		} else {
			result = checkAmount({
				amount: _amount,
				minAmount: _withdrawalMin,
				maxAmount: balanceData.availableBalance,
				formatRequired: _isConvert,
				t,
				maxAmountAllowUnlimit: unlimited,
				hintKey: "lbl_Insufficientbalance",
				digits: 2
			});
		}

		if (result.status !== 0) {
			setStatus({
				checked: false,
				tip: result.msg
			});
		} else {
			setStatus({
				checked: true,
				tip: ""
			});
		}
		return result.status === 0;
	};

	const clickInfo = () => {
		const _msg =
			status.tip === "" ? getAmountTip(withdrawalMin, _isConvert, t) : "";
		setStatus({
			checked: null,
			tip: _msg
		});
	};

	const toConfirmPage = () => {
		if (currentBankInfoDetail.disabled) {
			errorPopBox(t("lbl_SelectBank_Required"));
		} else if (status.checked) {
			let availableAccount;
			if (currentBankInfoDetail.accountNo) {
				availableAccount = custBankInfo.bankInfoDetail.find(
					el => el.accountNo === currentBankInfoDetail.accountNo
				);
			} else if (currentUSDTDetail.usdtAddress) {
				availableAccount = custBankInfo.uSDTDetail.find(
					el => el.usdtAddress === currentUSDTDetail.usdtAddress
				);
			} else if (currentEWalletDetail.accountNo) {
				availableAccount = custEWalletInfo.find(
					el => el.accountNo === currentEWalletDetail.accountNo
				);
			}

			if (
				!availableAccount ||
				(!currentBankInfoDetail.accountNo &&
					!currentUSDTDetail.usdtAddress &&
					!currentEWalletDetail.accountNo)
			) {
				errorPopBox(t("lbl_SelectBank_Required"));
			} else {
				setShowConfirmPage(true);
			}
		}
	};

	const cancelSubmit = () => {
		setShowConfirmPage(false);
	};

	const ClickClose = () => {
		setPopBox({ isOpen: false });
	};

	const refreshData = () => {
		getWithdrawalInfoRecent();
		getKycStatus();
		getWithdrawalLimit();
		refreshAvailableBalance();
		getCustBankInfo();
		getCustEWalletInfo();
	};

	const initForm = () => {
		setProcessing(false);

		setAmountValue("");

		setShowConfirmPage(false);

		setPopBox({
			isOpen: false
		});
		setStatus({
			checked: null,
			tip: ""
		});
	};

	const withdrawalUSDTSubmit = async () => {
		let target;
		if (currentUSDTDetail.usdtAddress) {
			await api_account_GetCustBankInfo().then(
				res => {
					if (isMountedRef.current) {
						const { uSDTDetail } = res.data.data;
						if (uSDTDetail && uSDTDetail.length > 0) {
							target = uSDTDetail.find(
								({ usdtAddress }) =>
									usdtAddress ===
									currentUSDTDetail.usdtAddress
							);
						}
					}
				},
				() => {
					if (isMountedRef.current) {
						errorPopBox();
					}
				}
			);
		}
		if (target !== undefined && target.disabled) return;

		const amount = _isConvert
			? amountValue * 1000
			: parseInt(amountValue, 10);
		const { exchangeRate, exchangeAmount } = exchangeInfo;
		const success = await withdrawalUSDTReq({
			accountNo: currentUSDTDetail.usdtAddress,
			amount,
			currencyId: currentUSDTDetail.currencyId,
			exchangeRate,
			exchangeAmount
		});

		if (success) {
			refreshData();
			initForm();
		}
	};

	const withdrawalEWalletSubmit = async () => {
		const ClickDone = () => {
			refreshData();
			initForm();
		};

		if (!processing) {
			setProcessing(true);

			const amount = _isConvert
				? amountValue * 1000
				: parseInt(amountValue, 10);

			api_payment_WithdrawalEWalletReq({
				AccountNo: currentEWalletDetail.accountNo,
				amount,
				sysId: currentEWalletDetail.sysId,
				memo: ""
			}).then(
				res => {
					if (isMountedRef.current) {
						if (
							res.data.errorCode === 2 ||
							res.data.errorCode === 0
						) {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.WithdrawalSuccess,
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-check"
											onClick={ClickDone}>
											OK
										</button>
									</div>
								)
							});
							getWithdrawalInfoRecent();
							getKycStatus();
							getWithdrawalLimit();
						} else if (res.data.errorCode === -1) {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.ErrorMsg,
								message: `${t("lbl_RolloverOver")}:${
									res.data.message
								}`,
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-cancel"
											onClick={ClickClose}>
											{t("lbl_Close")}
										</button>
									</div>
								)
							});
						} else if (res.data.errorCode === -2) {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.ErrorMsg,
								message: `${t("lbl_DepositOver")}: ${
									res.data.message
								}`,
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-cancel"
											onClick={ClickClose}>
											{t("lbl_Close")}
										</button>
									</div>
								)
							});
						} else if (res.data.errorCode === -3) {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.ErrorMsg,
								message: `${t("lbl_WithdrawalOver")}:${parseInt(
									res.data.message,
									10
								).toString()}`,
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-cancel"
											onClick={ClickClose}>
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
											onClick={ClickClose}>
											{t("lbl_Close")}
										</button>
									</div>
								)
							});
							setProcessing(false);
						}
					}
				},
				() => {
					if (isMountedRef.current) {
						setProcessing(false);
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: t("msg_ApiServerError"),
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-cancel"
										onClick={ClickClose}>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
					}
				}
			);
		}
	};

	const confirmSubmit = () => {
		const ClickDone = () => {
			setProcessing(false);
			setAmountValue("");
			onChangeBankInfo({});
			refreshAvailableBalance();
			setPopBox({
				isOpen: false
			});
			setStatus({
				checked: null,
				tip: ""
			});
			setShowConfirmPage(false);
			getKycStatus();
		};

		const AccountNo = currentBankInfoDetail.accountNo;
		const amount = _isConvert
			? amountValue * 1000
			: parseInt(amountValue, 10);
		const { sysId } = currentBankInfoDetail;
		if (!processing) {
			setProcessing(true);
			api_payment_WithdrawalReq(AccountNo, amount, sysId).then(
				res => {
					if (isMountedRef.current) {
						if (
							res.data.errorCode === 2 ||
							res.data.errorCode === 0
						) {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.WithdrawalSuccess,
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-check"
											onClick={ClickDone}>
											OK
										</button>
									</div>
								)
							});
							getWithdrawalInfoRecent();
							getKycStatus();
							getWithdrawalLimit();
						} else if (res.data.errorCode === -1) {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.ErrorMsg,
								message: `${t("lbl_RolloverOver")}:${
									res.data.message
								}`,
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-cancel"
											onClick={ClickClose}>
											{t("lbl_Close")}
										</button>
									</div>
								)
							});
						} else if (res.data.errorCode === -2) {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.ErrorMsg,
								message: `${t("lbl_DepositOver")}: ${
									res.data.message
								}`,
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-cancel"
											onClick={ClickClose}>
											{t("lbl_Close")}
										</button>
									</div>
								)
							});
						} else if (res.data.errorCode === -3) {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.ErrorMsg,
								message: `${t("lbl_WithdrawalOver")}:${parseInt(
									res.data.message,
									10
								).toString()}`,
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-cancel"
											onClick={ClickClose}>
											{t("lbl_Close")}
										</button>
									</div>
								)
							});
						} else {
							setPopBox({
								isOpen: true,
								popBoxType: defPopBoxType.ErrorMsg,
								message: `${res.data.message}`,
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-cancel"
											onClick={ClickClose}>
											{t("lbl_Close")}
										</button>
									</div>
								)
							});
							setProcessing(false);
						}
					}
				},
				() => {
					if (isMountedRef.current) {
						setProcessing(false);
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: `${res.data.message}`,
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-cancel"
										onClick={ClickClose}>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
					}
				}
			);
		}
	};

	if (kycStatus !== "normal")
		return (
			<>
				<div className="inside-title icon icon-transfer">
					<span>{t("lbl_Withdrawal")}</span>
					<div>{t("lbl_SubmitPhotoIdHint")}</div>
				</div>
				{kycStatus === "kycUpload" ? (
					<KycUpload getKycStatus={getKycStatus} />
				) : (
					<KycPending />
				)}
			</>
		);

	const confirmPage =
		{
			[WITHDRAWAL_TYPE.BANK]: (
				<WithdrawalConfirm
					bankNameValue={currentBankInfoDetail.bankName}
					amountValue={_isConvert ? amountValue * 1000 : amountValue}
					accountNoValue={currentBankInfoDetail.accountNo}
					cancelSubmit={cancelSubmit}
					confirmSubmit={confirmSubmit}
					_isConvert={_isConvert}
				/>
			),
			[WITHDRAWAL_TYPE.EWallet]: (
				<WithdrawalEWalletConfirm
					eWalletNameValue={currentEWalletDetail.eWalletName}
					amountValue={_isConvert ? amountValue * 1000 : amountValue}
					accountNoValue={currentEWalletDetail.accountNo}
					cancelSubmit={cancelSubmit}
					confirmSubmit={withdrawalEWalletSubmit}
					_isConvert={_isConvert}
				/>
			),
			[WITHDRAWAL_TYPE.USDT]: (
				<WithdrawalUSDTConFirm
					t={t}
					currentUSDTDetail={currentUSDTDetail}
					usdtExchangeAmount={exchangeInfo.exchangeAmount}
					amountValue={_isConvert ? amountValue * 1000 : amountValue}
					cancelSubmit={cancelSubmit}
					confirmSubmit={withdrawalUSDTSubmit}
					getExchangeInfo={getExchangeInfo}
					onChangeExchangeInfo={onChangeExchangeInfo}
					_isConvert={_isConvert}
				/>
			)
		}[withdrawalType] || null;
	// For Submit Input
	const placeholder = () => {
		if (currentEWalletDetail.eWalletName) {
			return `${t("lbl_MinMaxAmount")} ${
				_isConvert
					? withdrawalLimit?.eWalletWithdrawalMin / 1000
					: withdrawalLimit?.eWalletWithdrawalMin
			} / ${
				unlimited
					? t("lbl_Unlimited")
					: _isConvert
					? withdrawalLimit?.eWalletWithdrawalAvailableAmount / 1000
					: withdrawalLimit?.eWalletWithdrawalAvailableAmount
			}`;
		}
	};

	return (
		<>
			<div className="inside-title icon icon-icon32px_Withdraw">
				<span>{t("lbl_Withdrawal")}</span>
				<div>{t("lbl_UpdateBankInfo")}</div>
			</div>

			<div className="infoModuleLeft">
				<div className="walletWrapper">
					{/* <StepBar step={step} t={t} defStep={defStep} /> */}

					<div className="walletModule">
						<Available
							availableBalance={balanceData.availableBalance}
							refreshAvailableBalance={refreshAvailableBalance}
							_isConvert={_isConvert}
							accountName={userInfo.accountName}
						/>
					</div>

					{displayBankCard && (
						<div className="walletModule">
							<div className="addBank">
								<BankInfoCard
									datas={custBankInfo.bankInfoDetail}
									updateCustBankInfo={getCustBankInfo}
									onChangeBankInfo={onChangeBankInfo}
									currentBankInfoDetail={
										currentBankInfoDetail
									}
									_isConvert={_isConvert}
									isShowConfirmPage={showConfirmPage}
									balanceData={balanceData}
								/>
								<AddBankAccount
									bankInfoDetail={
										custBankInfo?.bankInfoDetail
									}
									updateCustBankInfo={getCustBankInfo}
								/>
							</div>
						</div>
					)}

					{Boolean(withdrawalLimit?.eWalletStatus) && displayEWallet && (
						<div className="walletModule">
							<div className="addBank">
								<EWalletInfoCard
									datas={custEWalletInfo}
									isShowConfirmPage={showConfirmPage}
									onChangeEWalletInfo={onChangeEWalletInfo}
									currentEWalletDetail={currentEWalletDetail}
									updateCustEWalletInfo={getCustEWalletInfo}
								/>

								<AddEWallet
									custEWalletInfo={custEWalletInfo}
									updateCustEWalletInfo={getCustEWalletInfo}
								/>
							</div>
						</div>
					)}

					{displayCrypto && (
						<div className="walletModule">
							<div className="addBank">
								<Crypto
									datas={custBankInfo.uSDTDetail}
									currentUSDTDetail={currentUSDTDetail}
									hideDeleteIcon={showConfirmPage}
									onChangeUSDTInfo={onChangeUSDTInfo}
									updateCustBankInfo={getCustBankInfo}
									deleteCryptoHandler={deleteCryptoHandler}
									amount={amountValue}
								/>
							</div>
						</div>
					)}

					<div className="subModuleList">
						<div className="subModule">
							{!showConfirmPage && (
								<div className="subModuleBody">
									<Calculation
										balanceData={balanceData}
										_isConvert={_isConvert}
									/>
									{/* <CashBar
											onChangeAmount={onChangeAmount}
											amountValue={amountValue}
											availableBalance={
												balanceData.availableBalance
											}
											_isConvert={_isConvert}
										/> */}
									<InputModuleRow
										onChangeAmount={onChangeAmount}
										amountValue={amountValue}
										toConfirmPage={toConfirmPage}
										_isConvert={_isConvert}
										onBlur={ValidAmount.bind(
											this,
											amountValue
										)}
										clickInfo={clickInfo}
										checked={status.checked}
										tip={status.tip}
										withdrawalTimes={
											withdrawalLimit.withdrawalTimes
										}
										maxTimes={withdrawalLimit.maxTimes}
										withdrawalMin={withdrawalMin}
										withdrawalMax={withdrawalMax}
										unlimited={unlimited}
										withdrawalType={withdrawalType}
										placeholder={placeholder()}
									/>
								</div>
							)}

							{showConfirmPage && confirmPage}
						</div>
					</div>
				</div>
			</div>

			<div className="importantNo">
				<div className="title">
					<span className="icon icon-warning" />{" "}
					{t("lbl_ImportantNotice")}
				</div>
				<ul>
					<li>
						<Trans
							i18nKey="lbl_WithdrawalImportantNoticeContent1"
							components={{
								Link: (
									<a
										onClick={() =>
											window.LiveChatWidget.call(
												"maximize"
											)
										}
									/>
								)
							}}
						/>
					</li>
					<li>{t("lbl_WithdrawalImportantNoticeContent2")}</li>
					<li>{t("lbl_WithdrawalImportantNoticeContent3")}</li>
					<li>{t("lbl_WithdrawalImportantNoticeContent4")}</li>

					<li>
						<Trans
							i18nKey="lbl_WithdrawalImportantNoticeContent5"
							components={{
								Link: (
									<a
										onClick={() =>
											window.LiveChatWidget.call(
												"maximize"
											)
										}
									/>
								)
							}}
						/>
					</li>
				</ul>
			</div>
		</>
	);
};

Main.defaultProps = {
	balanceData: null,
	kycStatus: null,
	uSDTWithdrawalLimit: null,
	withdrawalLimit: null,
	getWithdrawalLimit: () => null,
	getWithdrawalInfoRecent: () => null,
	getWithdrawalAvailableBalance: () => null,
	getKycStatus: () => null
};

Main.propTypes = {
	balanceData: PropTypes.objectOf(PropTypes.any),
	kycStatus: PropTypes.string,
	uSDTWithdrawalLimit: PropTypes.arrayOf(PropTypes.object),
	withdrawalLimit: PropTypes.objectOf(PropTypes.any),
	getWithdrawalLimit: PropTypes.func,
	getWithdrawalInfoRecent: PropTypes.func,
	getWithdrawalAvailableBalance: PropTypes.func,
	getKycStatus: PropTypes.func,
	withdrawalSettingTypeList: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Main;
