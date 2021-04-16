import React, { useEffect, useRef, useContext, useReducer } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@reach/router";
import MainPanel from "./withdrawal.set";
import WalletPanel from "./withdrawal.showWallet";
import KycPanel from "./withdrawal.kyc";
import {
	popBoxContext,
	userInfoContext,
	loadingContext
} from "../common/context";
import defPopBoxType from "../common/defPopBoxType";
import { api_account_GetWithdrawalAvailableBalance } from "../../service/api/account";
import {
	api_payment_GetWithdrawalInfoRecent,
	api_payment_KycCheck
} from "../../service/api/payment";
import { initState, reducer, defActionType } from "./withdrawal.reducer";
import RecentHistory from "./withdrawal.recentHistory";
import path from "../../router";
import useTransfer from "./hook/useTransfer";

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { loading, setLoading } = useContext(loadingContext);
	const [state, dispatch] = useReducer(reducer, initState);
	const isMountedRef = useRef(null);

	const { restoreAllBalanceToMainWallet } = useTransfer();

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		if (userInfo.isLogin === true) {
			if (
				(!userInfo.accountName && userInfo.accountName !== undefined) ||
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
		async function getData() {
			setLoading(true);
			await Promise.all([GetWithdrawalAvailableBalance(), KycCheck()]);
			setLoading(false);
		}
		getData();
	}, []);

	const ClosePopBox = () => {
		setPopBox({ isOpen: false });
	};

	const GetWithdrawalAvailableBalance = async () => {
		await api_account_GetWithdrawalAvailableBalance().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						dispatch({
							type: defActionType.GET_BALANCE,
							balanceData: res.data.data
						});
					} else {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: res.data.message,
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-check"
										onClick={ClosePopBox}>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
					}
					dispatch({
						type: defActionType.SET_LOADING,
						loading: false
					});
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
									className="btn-check"
									onClick={ClosePopBox}>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
				}
			}
		);
	};

	const GetWithdrawalInfoRecent = () => {
		api_payment_GetWithdrawalInfoRecent().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						dispatch({
							type: defActionType.GET_RECENT_HISTORY,
							recentHistory: res.data.data
						});
					} else {
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.ErrorMsg,
							message: res.data.message,
							btnBar: (
								<div className="btnGroup">
									<button
										className="btn-check"
										onClick={ClosePopBox}>
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
									className="btn-check"
									onClick={ClosePopBox}>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
				}
			}
		);
	};

	const KycCheck = async () => {
		await api_payment_KycCheck().then(
			res => {
				if (isMountedRef.current) {
					const { errorCode } = res.data;
					let kycStatus = "";
					if (errorCode === 0) {
						kycStatus = "normal";
					} else if (errorCode === 1) {
						kycStatus = "kycUpload";
					} else if (errorCode === 2) {
						kycStatus = "kycPending";
					}
					dispatch({
						type: defActionType.SET_KYC_STATUS,
						kycStatus
					});
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
									className="btn-check"
									onClick={ClosePopBox}>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
				}
			}
		);
	};

	const refreshData = () => {
		GetWithdrawalAvailableBalance();
		GetWithdrawalInfoRecent();
		KycCheck();
	};

	const restoreAll = async () => {
		await restoreAllBalanceToMainWallet();

		refreshData();
	};
	return loading ? null : (
		<div className="rightModule">
			<div className="infoModule">
				<div className="inside-title icon icon-icon32px_Withdraw">
					<span>{t("lbl_Withdrawal")}</span>
					<button onClick={restoreAll} className="icon icon-history">
						<span>Restore All</span>
					</button>
				</div>

				{state.kycStatus !== "normal" ? (
					<KycPanel
						t={t}
						dispatch={dispatch}
						kycData={state.kycData ?? {}}
						kycStatus={state.kycStatus}
						KycCheck={KycCheck}
					/>
				) : (
					<div className="infoModuleLeft">
						<WalletPanel
							balanceData={state.balanceData}
							GetWithdrawalAvailableBalance={
								GetWithdrawalAvailableBalance
							}
						/>

						<MainPanel
							dispatch={dispatch}
							state={state}
							refreshData={refreshData}
							KycCheck={KycCheck}
						/>
					</div>
				)}

				<div className="important">
					<div className="title">
						<span className="icon icon-information" />
						IMPORTANT NO TICE
					</div>
					<ul>
						<li>
							Kindly please check for the latest active deposit
							bank details before you making a deposit.
						</li>
						<li>
							For using <span>"Local Bank Transfer"</span> deposit
							option, please make the transfer done before submit
							the transaction to avoid the transaction delay.
						</li>
						<li>
							Depositor's <span>ACCOUNT NAME</span> must match
							with your registered full name. We do not encourage
							transaction made using 3rd party/company account.
						</li>
						<li>
							Please <span>DO NOT</span> fill in{" "}
							<span>"NOVA88"</span> or any sensitive words related
							to gambling as reference/remark in your online
							transaction.
						</li>
						<li>
							Please take noted that will be 1x rollover required
							for all deposit made before any withdrawal can be
							processed.
						</li>
						<li>
							Kindly please contact our{" "}
							<a href="">24/7 LIVECHAT</a> if your transaction is
							still pending for more than 5 minutes.
						</li>
					</ul>
				</div>
			</div>
			<RecentHistory
				dispatch={dispatch}
				refreshData={refreshData}
				recentHistory={state.recentHistory ?? []}
				GetWithdrawalInfoRecent={GetWithdrawalInfoRecent}
			/>
		</div>
	);
};
