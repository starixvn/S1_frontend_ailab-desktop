import React, { useEffect, useRef, useState, useContext } from "react";
import PropTypes from "prop-types";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "gatsby";
import AddBankAccount from "./addBankAccount";
import Available from "./withdrawal.set.available";
import Calculation from "./withdrawal.set.calculation";
// import CashBar from "./withdrawal.set.cashBar";

import InputModuleRow from "./withdrawal.set.inputModuleRow";
import BankInfoCard from "./withdrawal.set.bankInfoCard";
import { Crypto, useUSDTFetcher } from "./withdrawal.set.crypto";
import KycUpload from "./withdrawal.set.kycUpload";
import KycPending from "./withdrawal.set.kycPending";
import WithdrawalConfirm, {
	WithdrawalUSDTConFirm
} from "./withdrawal.set.confirm";
import { api_payment_WithdrawalReq } from "../../service/api/payment";
import { api_account_GetCustBankInfo } from "../../service/api/account";
import { userInfoContext } from "../common/context";
import { defPopBoxType } from "../common/defPopBoxType";
import { isConvert, checkAmount, getAmountTip } from "../common/common";
import StepBar from "../common/stepBar";
import defStep from "./defStep";
import usePopBox from "../hook/usePopBox";

import path from "../../router";

const INIT_BANK_INFO_DETAIL = { accountNo: "", bankName: "", sysId: null };

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

const WITHDRAWAL_TYPE = {
	BANK: "bank",
	USDT: "usdt"
};

const Withdrawal = ({
	balanceData,
	kycStatus,
	uSDTWithdrawalLimit,
	withdrawalLimit,
	getWithdrawalLimit,
	getWithdrawalInfoRecent,
	getWithdrawalAvailableBalance,
	getKycStatus
}) => {
	const { t } = useTranslation();
	const { setPopBox, errorPopBox } = usePopBox();
	const isMountedRef = useRef(null);

	const [amountValue, setAmountValue] = useState("");
	const [showConfirmPage, setShowConfirmPage] = useState(false);
	const { userInfo } = useContext(userInfoContext);

	const _isConvert = isConvert(userInfo.currencyId);

	const [status, setStatus] = useState({
		checked: null,
		tip: ""
	});

	const step = showConfirmPage ? 3 : 1;

	const [withdrawalType, setWithdrawalType] = useState(null);

	const {
		confirmDeleteCryptoWallet,
		delCustUSDTInfo,
		getExchangeInfo,
		withdrawalUSDTReq
	} = useUSDTFetcher({
		isMountedRef
	});

	const [custBankInfo, setCustBankInfo] = useState(INIT_BANK_CUST_BANK_INFO);

	const [currentBankInfoDetail, setCurrentBankInfoDetail] = useState(
		INIT_BANK_INFO_DETAIL
	);

	const [currentUSDTDetail, setCurrentUSDTDetail] =
		useState(INIT_USED_DETAIL);

	const getWithdrawalMinMaxLimit = () => {
		let limit = {};
		if (withdrawalType === WITHDRAWAL_TYPE.BANK) {
			limit = withdrawalLimit;
		}

		if (withdrawalType === WITHDRAWAL_TYPE.USDT) {
			const _uSDTWithdrawalLimit = uSDTWithdrawalLimit.find(
				el =>
					el.currencyId === currentUSDTDetail.currencyId &&
					el.network === currentUSDTDetail.network
			);
			limit = _uSDTWithdrawalLimit || {};
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
			const { nickName, usdtAddress, currencyId } = item;

			await delCustUSDTInfo({
				accountName: custBankInfo.accountName,
				nickName,
				usdtAddress,
				currencyId
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

	useEffect(() => {
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
								to={`/${userInfo.langId}/${path.profile.root}?prevPage=${path.withdrawal.root}`}
							>
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

		setWithdrawalType(WITHDRAWAL_TYPE.USDT);
	};

	const onChangeBankInfo = item => {
		setCurrentBankInfoDetail(item);

		setCurrentUSDTDetail(INIT_USED_DETAIL);

		setWithdrawalType(WITHDRAWAL_TYPE.BANK);
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

		if (!unlimited && real_amount > withdrawalMax) {
			result = {
				status: 2,
				msg: t("lbl_WithdrawalDailyReached")
			};
		} else {
			result = checkAmount({
				amount: _amount,
				minAmount: withdrawalMin,
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
		if (status.checked) {
			let availableAccount;
			if (currentBankInfoDetail.accountNo) {
				availableAccount = custBankInfo.bankInfoDetail.find(
					el => el.accountNo === currentBankInfoDetail.accountNo
				);
			} else if (currentUSDTDetail.usdtAddress) {
				availableAccount = custBankInfo.uSDTDetail.find(
					el => el.usdtAddress === currentUSDTDetail.usdtAddress
				);
			}
			if (
				!availableAccount ||
				(!currentBankInfoDetail.accountNo &&
					!currentUSDTDetail.usdtAddress)
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
	};

	const initForm = () => {
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
		const amount = _isConvert
			? amountValue * 1000
			: parseInt(amountValue, 10);

		const success = await withdrawalUSDTReq({
			accountNo: currentUSDTDetail.usdtAddress,
			amount,
			currencyId: currentUSDTDetail.currencyId
		});

		if (success) {
			refreshData();
			initForm();
		}
	};

	const confirmSubmit = () => {
		const ClickDone = () => {
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
		api_payment_WithdrawalReq(AccountNo, amount, sysId).then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 2 || res.data.errorCode === 0) {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.WithdrawalSuccess,
							onClickClose: ClickClose,
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-check"
										onClick={ClickDone}
									>
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
										onClick={ClickClose}
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
							message: `${t("lbl_DepositOver")}:${
								res.data.message
							}`,
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
										className="btn-cancel"
										onClick={ClickClose}
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
										className="btn-cancel"
										onClick={ClickClose}
									>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
					}
				}
			},
			err => {
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
				}
			}
		);
	};

	if (kycStatus !== "normal")
		return (
			<>
				<div className="inside-title icon-icon32px_deposit">
					{t("lbl_Withdrawal")}
				</div>
				<div className="txt-white">{t("lbl_SubmitPhotoIdHint")}</div>
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
			[WITHDRAWAL_TYPE.USDT]: (
				<WithdrawalUSDTConFirm
					t={t}
					currentUSDTDetail={currentUSDTDetail}
					amountValue={_isConvert ? amountValue * 1000 : amountValue}
					cancelSubmit={cancelSubmit}
					confirmSubmit={withdrawalUSDTSubmit}
					getExchangeInfo={getExchangeInfo}
					_isConvert={_isConvert}
				/>
			)
		}[withdrawalType] || null;

	const confirmClassList = [
		"subModuleList",
		withdrawalType === WITHDRAWAL_TYPE.USDT && "subModuleCrypto"
	]
		.filter(Boolean)
		.join(" ");

	return (
		<>
			<div className="inside-title icon-icon32px_deposit">
				{t("lbl_Withdrawal")}
			</div>
			<div className="txt-white">{t("lbl_UpdateBankInfo")}</div>
			<StepBar step={step} t={t} defStep={defStep} />

			<div className="walletModuleLeft">
				<div className="walletModule">
					<Available
						availableBalance={balanceData.availableBalance}
						refreshAvailableBalance={refreshAvailableBalance}
						_isConvert={_isConvert}
						accountName={userInfo.accountName}
					/>
				</div>

				<div className="walletModule">
					<div className="addBank">
						<BankInfoCard
							datas={custBankInfo.bankInfoDetail}
							updateCustBankInfo={getCustBankInfo}
							onChangeBankInfo={onChangeBankInfo}
							currentBankInfoDetail={currentBankInfoDetail}
							_isConvert={_isConvert}
							isShowConfirmPage={showConfirmPage}
							balanceData={balanceData}
						/>
						<AddBankAccount
							bankInfoDetail={custBankInfo?.bankInfoDetail}
							updateCustBankInfo={getCustBankInfo}
						/>
					</div>

					<Crypto
						datas={custBankInfo.uSDTDetail}
						currentUSDTDetail={currentUSDTDetail}
						hideDeleteIcon={showConfirmPage}
						onChangeUSDTInfo={onChangeUSDTInfo}
						updateCustBankInfo={getCustBankInfo}
						deleteCryptoHandler={deleteCryptoHandler}
					/>

					<div className={confirmClassList}>
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
										status={status}
										onBlur={ValidAmount.bind(
											this,
											amountValue
										)}
										clickInfo={clickInfo}
										checked={status.checked}
										tip={status.tip}
										withdrawalType={withdrawalType}
										withdrawalMin={withdrawalMin}
										withdrawalMax={withdrawalMax}
										unlimited={unlimited}
										withdrawalTimes={
											withdrawalLimit.withdrawalTimes
										}
										maxTimes={withdrawalLimit.maxTimes}
									/>
								</div>
							)}

							{showConfirmPage && confirmPage}
						</div>
					</div>
				</div>
			</div>

			<div className="important">
				<div className="title">
					<span className="icon icon-warning" />{" "}
					{t("lbl_ImportantNotice")}
				</div>
				<ol>
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
				</ol>
			</div>
		</>
	);
};

Withdrawal.propTypes = {
	balanceData: PropTypes.objectOf(PropTypes.any).isRequired,
	kycStatus: PropTypes.string.isRequired,
	uSDTWithdrawalLimit: PropTypes.arrayOf(PropTypes.any).isRequired,
	withdrawalLimit: PropTypes.objectOf(PropTypes.any).isRequired,
	getWithdrawalInfoRecent: PropTypes.func.isRequired,
	getWithdrawalAvailableBalance: PropTypes.func.isRequired,
	getWithdrawalLimit: PropTypes.func.isRequired,
	getKycStatus: PropTypes.func.isRequired
};
export default Withdrawal;
