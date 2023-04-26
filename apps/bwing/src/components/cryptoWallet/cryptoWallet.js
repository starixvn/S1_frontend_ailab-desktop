import React, { useEffect, useRef, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "gatsby";
import { api_account_GetCustBankInfo } from "../../service/api/account";
import { userInfoContext, popBoxContext } from "../common/context";
import { defPopBoxType } from "../common/defPopBoxType";
import InitPanel from "./cryptoWallet.set.init";
import WalletCard from "./cryptoWallet.set.walletCard";
import usePopBox from "../hook/usePopBox";
import Loading from "../common/loading";
import path from "../../router";

import AccountName from "./cryptoWallet.accountName";

export default () => {
	const { t } = useTranslation();
	const { userInfo, setUserInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox } = usePopBox();
	const isMountedRef = useRef(null);
	const [loading, setLoading] = useState(true);
	const [walletInfo, setWalletInfo] = useState([]);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		GetCustBankInfo();
	}, []);

	const GetCustBankInfo = () => {
		api_account_GetCustBankInfo().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						const resData = res.data.data;
						if (resData) {
							setUserInfo(prev => ({
								...prev,
								accountName: resData.accountName
							}));
							setWalletInfo(resData.uSDTDetail || []);
						}
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

	const addCryptoWallet = () => {
		if (!userInfo.phoneVerified) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.UpdateProfile,
				content: t("lbl_Crypto_OTP"),
				btnBar: (
					<div className="btnGroup">
						<Link
							className="btn-check"
							to={`/${userInfo.langId}/${path.profile.root}`}>
							{t("lbl_UpdatePersonalDetail")}
						</Link>
					</div>
				)
			});
		} else {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.AddCryptoWallet,
				GetCustBankInfo
			});
		}
	};

	return loading ? (
		<Loading />
	) : (
		<>
			<div className="infoModule">
				<div className="inside-title">{t("lbl_CryptoWallet")}</div>
				<div
					className="txt-lightgray"
					style={{
						wordBreak: "break-all",
						textAlign: "center"
					}}>
					{t("lbl_Update_Crypto_Wallet")}
				</div>

				<AccountName t={t} accountName={userInfo.accountName} />

				<InitPanel
					t={t}
					addCryptoWallet={addCryptoWallet}
					numberOfAccount={walletInfo ? walletInfo?.length : 0}
				/>
			</div>
			<WalletCard
				walletList={walletInfo}
				loading={loading}
				userInfo={userInfo}
				numberOfAccount={walletInfo ? walletInfo?.length : 0}
				GetCustBankInfo={GetCustBankInfo}
			/>
		</>
	);
};
