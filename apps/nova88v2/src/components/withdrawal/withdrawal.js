import React, { useEffect, useRef, useContext, useReducer } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "gatsby";
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
	api_payment_KycCheck,
	api_payment_GetWithdrawalLimit
} from "../../service/api/payment";
import { initState, reducer, defActionType } from "./withdrawal.reducer";
import RecentHistory from "./withdrawal.recentHistory";
import path from "../../router";
import useTransfer from "./hook/useTransfer";
import usePopBox from "../hook/usePopBox";

export default () => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { loading, setLoading } = useContext(loadingContext);
	const { errorPopBox } = usePopBox();
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
		if (userInfo.isLogin) {
			GetDailyWithdrawalLimit();
		}
	}, [userInfo.isLogin]);

	const GetDailyWithdrawalLimit = () => {
		api_payment_GetWithdrawalLimit().then(
			res => {
				if (res.data.errorCode === 0 && isMountedRef.current) {
					const {
						withdrawalMin,
						unlimited,
						withdrawalAvailableAmount,
						usdtList,
						maxTimes,
						withdrawalTimes,
						eWalletWithdrawalMin,
						eWalletStatus,
						eWalletWithdrawalAvailableAmount
					} = res.data.data;

					dispatch({
						type: defActionType.SET_WITHDRAWAL_AMOUNT_LIMIT,
						withdrawalMin,
						withdrawalMax: withdrawalAvailableAmount,
						unlimited,
						usdtList,
						maxTimes,
						withdrawalTimes,
						eWalletWithdrawalMin,
						eWalletStatus,
						eWalletWithdrawalAvailableAmount
					});
				} else if (res.data.errorCode !== 0) {
					errorPopBox(
						res.data.message || "error",
						res.data.errorCode
					);
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
		async function getData() {
			setLoading(true);
			await Promise.all([GetWithdrawalAvailableBalance(), KycCheck()]);
			setLoading(false);
		}
		getData();
	}, []);

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
						errorPopBox(
							res.data.message || "error",
							res.data.errorCode
						);
					}
					dispatch({
						type: defActionType.SET_LOADING,
						loading: false
					});
				}
			},
			() => {
				if (isMountedRef.current) {
					errorPopBox();
				}
			}
		);
	};

	const GetWithdrawalInfoRecent = async () => {
		await api_payment_GetWithdrawalInfoRecent().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						dispatch({
							type: defActionType.GET_RECENT_HISTORY,
							recentHistory: res.data.data
						});
					} else {
						errorPopBox(
							res.data.message || "error",
							res.data.errorCode
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
					} else {
						errorPopBox(
							res.data.message || "error",
							res.data.errorCode
						);
					}
					dispatch({
						type: defActionType.SET_KYC_STATUS,
						kycStatus
					});
				}
			},
			() => {
				if (isMountedRef.current) {
					errorPopBox();
				}
			}
		);
	};

	const refreshData = async () => {
		await GetWithdrawalAvailableBalance();
		await GetWithdrawalInfoRecent();
		await KycCheck();
	};

	const restoreAll = async () => {
		setLoading(true);

		await restoreAllBalanceToMainWallet();

		await refreshData();

		setLoading(false);
	};

	return (
		!loading && (
			<div className="rightModule">
				<div className="infoModule">
					<div className="inside-title">
						<span className="icon icon-icon32px_Withdraw">
							{t("lbl_Withdrawal")}
						</span>
						<button
							onClick={restoreAll}
							className="icon icon-history"
						>
							<span>{t("lbl_RestoreAll")}</span>
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
						<>
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
									GetDailyWithdrawalLimit={
										GetDailyWithdrawalLimit
									}
								/>
							</div>

							<div className="important">
								<div className="title">
									<span className="icon icon-warning" />
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
									<li>
										{t(
											"lbl_WithdrawalImportantNoticeContent2"
										)}
									</li>
									<li>
										{t(
											"lbl_WithdrawalImportantNoticeContent3"
										)}
									</li>
									<li>
										{t(
											"lbl_WithdrawalImportantNoticeContent4"
										)}
									</li>

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

										{/* lbl_LiveChat 24/7 */}
									</li>
								</ul>
							</div>
						</>
					)}
				</div>
				<RecentHistory
					dispatch={dispatch}
					refreshData={refreshData}
					recentHistory={state.recentHistory ?? []}
					GetWithdrawalInfoRecent={GetWithdrawalInfoRecent}
					GetDailyWithdrawalLimit={GetDailyWithdrawalLimit}
				/>
			</div>
		)
	);
};
