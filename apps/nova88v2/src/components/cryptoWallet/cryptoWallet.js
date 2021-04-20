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
	defActionType,
	defStatus,
	colType
} from "./cryptoWallet.reducer";
import { userInfoContext, popBoxContext } from "../common/context";
import InitPanel from "./cryptoWallet.set.init";
import AccountPanel from "./cryptoWallet.set.account";
import WalletCard from "./cryptoWallet.set.walletCard";
import usePopBox from "../hook/usePopBox";
import Loading from "../common/loading";
import StepBar from "../common/stepBar";
import walletInfoStep from "./cryptoWallet.set.defStep";

export default () => {
	const { t } = useTranslation();
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { errorPopBox } = usePopBox();
	const [state, dispatch] = useReducer(reducer, initState);
	const [showTip, setShowTip] = useState(false);
	const isMountedRef = useRef(null);
	const [loading, setLoading] = useState(true);
	const [accountName, setAccountName] = useState(null);
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

	useEffect(() => {
		getWalletInfo(false);
	}, []);

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
						errorPopBox(
							res.data.message || "error",
							res.data.errorCode
						);
					}
					setLoading(false);
				}
			},
			() => {
				if (isMountedRef.current) {
					errorPopBox();
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
					t={t}
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
					t={t}
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
					cryptoInputDataList={cryptoInputDataList}
					status={status}
					setStatus={setStatus}
					walletDatas={walletDatas}
					setWalletDatas={setWalletDatas}
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
					<span>{t("lbl_CryptoWallet")}</span>
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
			<WalletCard walletList={state.walletList} loading={loading} />
		</>
	);
};
