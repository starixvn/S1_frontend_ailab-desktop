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
import ShowCard from "./bankInfo.set.bankCard";
import defPopBoxType from "../common/defPopBoxType";
import Loading from "../common/loading";
import StepBar from "../common/stepBar";
import bankInfoStep from "./bankInfo.set.defStep";
import { currencyCode } from "../../datas/countryCode";

export default () => {
	const { t } = useTranslation();
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [state, dispatch] = useReducer(reducer, initState);
	const [showTip, setShowTip] = useState(false);
	const isMountedRef = useRef(null);
	const [loading, setLoading] = useState(true);
	const isIfscRequired = userInfo.currencyId === currencyCode.INR;

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		GetCustBankInfo(false);
	}, []);

	const clickClose = () => {
		setPopBox({ isOpen: false });
	};

	const clickTip = () => {
		setShowTip(!showTip);
	};

	const GetCustBankInfo = setAccountName => {
		api_account_GetCustBankInfo().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						const resData = res.data.data;
						if (setAccountName) {
							setUserInfo(prev => ({
								...prev,
								accountName: resData.accountName
							}));
						}

						dispatch({
							type: defActionType.GET_CUST_BANK_INFO,
							datas: resData
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
									className="btn-check"
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

		const deleteCard = (SysId, AccountNo) => {
			setPopBox({
				isOpen: false
			});
			setLoading(true);

			api_accountStrict_DelCustBankInfo({
				AccountName: state.accountName,
				AccountNo,
				SysId
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
								message: res.data.message,
								btnBar: (
									<div className="btnGroup">
										<button
											className="btn-check"
											onClick={ClickCancel}>
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
										className="btn-check"
										onClick={ClickCancel}>
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
						className="btn-check"
						onClick={deleteCard.bind(this, sysId, accountNo)}>
						{t("lbl_Yes")}
					</button>
					<button className="btn-cancel" onClick={ClickCancel}>
						{t("lbl_No")}
					</button>
				</div>
			)
		});
	};

	return loading ? (
		<Loading />
	) : (
		<>
			<div className="infoModule">
				<div className="inside-title icon icon-icon32px_bank-account">
					<span>{t("lbl_BankInfo")}</span>
					<div>{t("lbl_UpdateBankInfo")}</div>
				</div>

				<StepBar t={t} step={state.step ?? 0} defStep={bankInfoStep} />

				<div className="accountName">
					{userInfo.accountName ? (
						<AccountNamePanel
							t={t}
							accountName={userInfo.accountName}
							clickTip={clickTip}
							showTip={showTip}
						/>
					) : null}
				</div>

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
					custBankList={state.custBankList}
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
					ifscCode={state.ifscCode ?? ""}
					isIfscRequired={isIfscRequired}
				/>
			</div>
			<ShowCard
				t={t}
				custBankList={state.custBankList}
				delBankAccount={delBankAccount}
				loading={loading}
				isIfscRequired={isIfscRequired}
			/>
		</>
	);
};
