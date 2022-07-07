import React, {
	useEffect,
	useRef,
	useContext,
	useReducer,
	useState
} from "react";
import { useTranslation } from "react-i18next";
import { api_account_GetCustBankInfo } from "../../service/api/account";
import { api_accountStrict_DelCustBankInfo } from "../../service/api/accountStrict";
import {
	defModule,
	reducer,
	initState,
	defActionType
} from "./bankInfo.reducer";
import { userInfoContext, popBoxContext } from "../common/context";
import PanelControl from "./bankInfo.panelControl";
import AccountNamePanel from "./bankInfo.accountName";
import ShowCard from "./bankInfo.showCard";
import Loading from "../common/loading";
import { defPopBoxType } from "../common/popBox";

export default () => {
	const { t } = useTranslation();
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [state, dispatch] = useReducer(reducer, initState);
	const [showTip, setShowTip] = useState(false);
	const [loading, setLoading] = useState(true);
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		GetCustBankInfo(false);
	}, []);

	const ClickClose = () => {
		setPopBox({ isOpen: false });
	};

	const GetCustBankInfo = setAccountName => {
		api_account_GetCustBankInfo().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						const datas = res.data.data;
						if (setAccountName) {
							setUserInfo(prev => ({
								...prev,
								accountName: datas.accountName
							}));
						}

						dispatch({
							type: defActionType.GET_CUST_BANK_INFO,
							datas
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
									onClick={ClickClose}
								>
									{t("lbl_Close")}
								</button>
							</div>
						)
					});
					setLoading(false);
				}
			}
		);
	};

	const clickTip = () => {
		const _showTip = !showTip;
		setShowTip(_showTip);
	};

	const toNextStep = () => {
		dispatch({ type: defActionType.TO_NEXT_STEP });
	};

	const toLastStep = () => {
		dispatch({ type: defActionType.TO_LAST_STEP });
	};

	const selectBank = bankIdx => {
		dispatch({ type: defActionType.SELECT_BANK, bankIdx });
	};

	const delBankAccount = (sysId, accountNo) => {
		const ClickCancel = () => {
			setPopBox({
				isOpen: false
			});
		};

		const deleteCard = (_sysId, _accountNo) => {
			setPopBox({
				isOpen: false
			});
			setLoading(true);

			api_accountStrict_DelCustBankInfo({
				AccountName: state.accountName,
				AccountNo: _accountNo,
				SysId: _sysId
			}).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							GetCustBankInfo();
							setPopBox({
								isOpen: false
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
											onClick={ClickCancel}
										>
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
										onClick={ClickCancel}
									>
										{t("lbl_Close")}
									</button>
								</div>
							)
						});
						setLoading(false);
					}
				}
			);
		};

		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.ConfirmDelete,
			message: t("lbl_AreYouSureDelete"),
			message2: t("lbl_CantBeRestore"),
			btnBar: (
				<div className="btnGroup">
					<button
						className="btn-cancel"
						onClick={deleteCard.bind(this, sysId, accountNo)}
					>
						{t("lbl_Yes")}
					</button>
					<button className="btn-check" onClick={ClickCancel}>
						{t("lbl_No")}
					</button>
				</div>
			)
		});
	};

	// let displayModule = null;
	// switch (state.displayModule) {
	// 	case defModule.InitPanel:
	// 		displayModule = (
	// 			<InitPanel
	// 				dispatch={dispatch}
	// 				numberOfAccount={
	// 					state.custBankList ? state.custBankList?.length : 0
	// 				}
	// 			/>
	// 		);
	// 		break;

	// 	case defModule.BankPanel:
	// 		displayModule = (
	// 			<BankPanel dispatch={dispatch} bankList={state.bankList} />
	// 		);
	// 		break;

	// 	case defModule.AccountPanel:
	// 		displayModule = (
	// 			<AccountPanel
	// 				dispatch={dispatch}
	// 				bankInfo={state.bankList[state.bankIdx]}
	// 				accountNumber={state.accountNumber}
	// 				accountName={
	// 					userInfo.accountName
	// 						? userInfo.accountName
	// 						: state.accountName
	// 				}
	// 				alreadyHasAccountName={!!userInfo.accountName}
	// 				reload={GetCustBankInfo}
	// 			/>
	// 		);
	// 		break;

	// 	default:
	// 		break;
	// }
	return loading ? (
		<Loading />
	) : (
		<>
			<div className="infoModule">
				<div className="inside-title icon icon-icon32px_bank-account">
					<span>{t("lbl_BankInfo")}</span>
					<div>{t("lbl_UpdateBankInfo")}</div>
				</div>

				{userInfo.accountName ? (
					<AccountNamePanel
						t={t}
						accountName={userInfo.accountName}
						clickTip={clickTip}
						showTip={showTip}
					/>
				) : null}

				<PanelControl
					t={t}
					defModule={defModule}
					currentModule={state.displayModule}
					dispatch={dispatch}
					numberOfAccount={
						state.custBankList ? state.custBankList.length : 0
					}
					toNextStep={toNextStep}
					toLastStep={toLastStep}
					bankList={state.bankList ?? null}
					selectBank={selectBank}
					bankIdx={state.bankIdx ?? null}
					accountNumber={state.accountNumber ?? null}
					accountName={
						userInfo.accountName
							? userInfo.accountName
							: state.accountName
					}
					alreadyHasAccountName={!!userInfo.accountName}
					reload={GetCustBankInfo}
					custBankList={state.custBankList}
				/>
			</div>
			<ShowCard
				custBankList={state.custBankList}
				delBankAccount={delBankAccount}
				loading={loading}
			/>
		</>
	);
};
