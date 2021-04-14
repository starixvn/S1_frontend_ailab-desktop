import React, {
	useEffect,
	useRef,
	useContext,
	useReducer,
	useState
} from "react";
import { useTranslation } from "react-i18next";
import { api_account_GetCustBankInfo } from "../../service/api/account";
import {
	defModule,
	reducer,
	initState,
	defActionType
} from "./cryptoWallet.reducer";
import { userInfoContext, popBoxContext } from "../common/context";
import InitPanel from "./cryptoWallet.set.init";
import AccountPanel from "./cryptoWallet.set.account";
import ShowCard from "./cryptoWallet.set.bankCard";
import defPopBoxType from "../common/defPopBoxType";
import Loading from "../common/loading";
import StepBar from "../common/stepBar";
import walletInfoStep from "./cryptoWallet.set.defStep";

export default () => {
	const { t } = useTranslation();
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const [state, dispatch] = useReducer(reducer, initState);
	const [showTip, setShowTip] = useState(false);
	const isMountedRef = useRef(null);
	const [loading, setLoading] = useState(true);
	const [accountName, setAccountName] = useState(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		getWalletInfo(false);
	}, []);

	const clickClose = () => {
		setPopBox({ isOpen: false });
	};

	const clickTip = () => {
		setShowTip(!showTip);
	};

	const getWalletInfo = _setAccountName => {
		api_account_GetCustBankInfo().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						const resData = res.data.data;
						if (_setAccountName && resData) {
							setUserInfo(prev => ({
								...prev,
								accountName: resData.accountName
							}));
							setAccountName(res.data.data.accountName);
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
										className="btn-cancel"
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
									className="btn-cancel"
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

	let displayModule = null;
	switch (state.displayModule) {
		case defModule.InitPanel:
			displayModule = (
				<InitPanel
					dispatch={dispatch}
					numberOfAccount={
						state.walletList ? state.walletList?.length : 0
					}
				/>
			);
			break;

		case defModule.AccountPanel:
			displayModule = (
				<AccountPanel
					dispatch={dispatch}
					accountNumber={state.accountNumber}
					accountName={
						userInfo.accountName
							? userInfo.accountName
							: accountName
					}
					setAccountName={setAccountName}
					walletList={state.walletList}
					address={state.address}
					alreadyHasAccountName={!!userInfo.accountName}
					reload={getWalletInfo}
				/>
			);
			break;

		default:
			break;
	}

	return loading ? (
		<Loading />
	) : (
		<>
			<div className="infoModule">
				<div className="inside-title icon icon-BTC">
					<span>{t("lbl_Crypto_Wallet")}</span>
					<div>{t("lbl_Update_Crypto_Wallet")}</div>
				</div>

				<StepBar
					t={t}
					step={state.step ?? 0}
					defStep={walletInfoStep}
					stepNum={2}
				/>

				<div className="accountName">
					{userInfo.accountName ? (
						<>
							{t("lbl_BankAccountName")}
							<span>{userInfo.accountName}</span>
							<button
								className="icon icon-error"
								onClick={clickTip}
							/>
							{showTip ? (
								<div className="tip active">
									{t("lbl_ContactCSD")}
								</div>
							) : null}
						</>
					) : null}
				</div>
				{displayModule}
			</div>
			<ShowCard
				accountName={state.accountName}
				walletList={state.walletList}
				reload={getWalletInfo.bind(this, false)}
			/>
		</>
	);
};
