import React, { useEffect, useRef, useContext } from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import { defActionType, defPanel } from "./withdrawal.reducer";
import {
	api_accountStrict_DelCustBankInfo,
	api_accountStrict_DelCustEWalletInfo
} from "../../service/api/accountStrict";
import {
	api_payment_GetBankInfoSysList,
	api_payment_GetEWalletInfoSysList
} from "../../service/api/payment";
import { popBoxContext, userInfoContext } from "../common/context";
import defPopBoxType from "../common/defPopBoxType";
import usePopBox from "../hook/usePopBox";
import BankCard from "./withdrawal.set.card.bank";
import CryptoCard from "./withdrawal.set.card.crypto";
import path from "../../router";
import ECard from "./withdrawal.set.card.E";
import { useGetWithdrawalBlockSetting } from "../hook";

const CardPanel = ({
	dispatch,
	state,
	t,
	accountName,
	GetCustBankInfo,
	getCustEWalletInfo,
	custBankInfo,
	custEWalletInfo,
	isIfscRequired
}) => {
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox } = usePopBox();
	const isMountedRef = useRef(null);

	const { displayBankCard, displayEWallet, displayCrypto } =
		useGetWithdrawalBlockSetting();

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const selectAccount = accountData => {
		const _selectInfo = !accountData.usdtAddress
			? {
					bankName: accountData.bankName
						? accountData.bankName
						: accountData.eWalletName,
					accountNo: accountData.accountNo,
					sysId: accountData.sysId,
					ifscCode: accountData.ifscCode
			  }
			: {
					usdtAddress: accountData.usdtAddress,
					nickName: accountData.nickName,
					currencyId: accountData.currencyId,
					network: accountData.network,
					currencyName: accountData.currencyName
			  };
		dispatch({
			type: defActionType.SELECT_ACCOUNT,
			selectedAccount: _selectInfo
		});
	};

	const ClosePopBox = () => {
		setPopBox({ isOpen: false });
	};

	const addBankAccount = () => {
		api_payment_GetBankInfoSysList().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						const datas = res.data.data;
						const _bankInfoSysList = datas.map((item, i) => ({
							id: i,
							sysId: item.sysId,
							displayText: item.bankName,
							image: item.bankLogo?.toLowerCase()
						}));
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.AddBankAccount,
							bankInfoSysList: _bankInfoSysList,
							custBankInfo,
							GetCustBankInfo
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
	const addEAccount = async () => {
		api_payment_GetEWalletInfoSysList().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						const datas = res.data.data;
						const _EInfoSysList = datas.map((item, i) => ({
							id: i,
							sysId: item.sysId,
							displayText: item.eWalletName,
							image: item.eWalletLogo?.toLowerCase()
						}));
						setPopBox({
							isOpen: true,
							popBoxType: defPopBoxType.AddEAccount,
							EInfoSysList: _EInfoSysList,
							custEWalletInfo,
							getCustEWalletInfo
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
							to={`/${userInfo.langId}/${path.profile.root}`}
						>
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

	const delAccount = (accountNo, sysId) => {
		const delBankInfo = () => {
			api_accountStrict_DelCustBankInfo({
				AccountName: accountName,
				AccountNo: accountNo,
				SysId: sysId
			}).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							GetCustBankInfo();
							if (accountNo === state.selectedAccount.accountNo) {
								dispatch({
									type: defActionType.SELECT_ACCOUNT,
									selectedAccount: {},
									step: 1
								});
							}
							setPopBox({ isOpen: false });
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
						dispatch({
							type: defActionType.SET_LOADING,
							loading: false
						});
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
					<button className="gray" onClick={delBankInfo}>
						{t("lbl_Yes")}
					</button>
					<button className="btn-check" onClick={ClosePopBox}>
						{t("lbl_No")}
					</button>
				</div>
			)
		});
	};

	const delEWallet = (accountNo, sysId) => {
		const delEWalletInfo = () => {
			api_accountStrict_DelCustEWalletInfo({
				AccountNo: accountNo,
				SysId: sysId
			}).then(
				res => {
					if (isMountedRef.current) {
						if (res.data.errorCode === 0) {
							getCustEWalletInfo();
							if (accountNo === state.selectedAccount.accountNo) {
								dispatch({
									type: defActionType.SELECT_ACCOUNT,
									selectedAccount: {},
									step: 1
								});
							}
							setPopBox({ isOpen: false });
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
						dispatch({
							type: defActionType.SET_LOADING,
							loading: false
						});
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
					<button className="gray" onClick={delEWalletInfo}>
						{t("lbl_Yes")}
					</button>
					<button className="btn-check" onClick={ClosePopBox}>
						{t("lbl_No")}
					</button>
				</div>
			)
		});
	};

	return (
		<>
			{displayBankCard && (
				<BankCard
					t={t}
					state={state}
					defPanel={defPanel}
					custBankInfo={custBankInfo}
					addBankAccount={addBankAccount}
					selectAccount={selectAccount}
					delAccount={delAccount}
					isIfscRequired={isIfscRequired}
				/>
			)}
			{state.eWalletStatus && displayEWallet && (
				<ECard
					t={t}
					state={state}
					defPanel={defPanel}
					custEWalletInfo={custEWalletInfo}
					addEAccount={addEAccount}
					selectAccount={selectAccount}
					delAccount={delEWallet}
				/>
			)}
			{displayCrypto && (
				<CryptoCard
					userInfo={userInfo}
					t={t}
					state={state}
					custBankInfo={custBankInfo}
					selectAccount={selectAccount}
					addCryptoWallet={addCryptoWallet}
					GetCustBankInfo={GetCustBankInfo}
					defPanel={defPanel}
				/>
			)}
		</>
	);
};

CardPanel.defaultProps = {
	accountName: ""
};

CardPanel.propTypes = {
	t: PropTypes.func.isRequired,
	state: PropTypes.objectOf(PropTypes.any).isRequired,
	dispatch: PropTypes.func.isRequired,
	accountName: PropTypes.string,
	GetCustBankInfo: PropTypes.func.isRequired,
	getCustEWalletInfo: PropTypes.func.isRequired,
	custBankInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	custEWalletInfo: PropTypes.arrayOf(PropTypes.object).isRequired,
	isIfscRequired: PropTypes.bool.isRequired
};

export default CardPanel;
