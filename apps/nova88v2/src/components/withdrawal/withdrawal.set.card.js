import React, { useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import { defActionType, defPanel } from "./withdrawal.reducer";
import { api_accountStrict_DelCustBankInfo } from "../../service/api/accountStrict";
import { api_payment_GetBankInfoSysList } from "../../service/api/payment";
import { popBoxContext } from "../common/context";
import defPopBoxType from "../common/defPopBoxType";
import usePopBox from "../hook/usePopBox";
import BankCard from "./withdrawal.set.card.bank";
import CryptoCard from "./withdrawal.set.card.crypto";

const CardPanel = ({
	dispatch,
	state,
	t,
	accountName,
	GetCustBankInfo,
	custBankInfo,
	isUSDT
}) => {
	const { setPopBox } = useContext(popBoxContext);
	const { errorPopBox } = usePopBox();
	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const selectAccount = accountData => {
		const _selectInfo = !isUSDT
			? {
					bankName: accountData.bankName,
					accountNo: accountData.accountNo,
					sysId: accountData.sysId
			  }
			: {
					usdtAddress: accountData.usdtAddress,
					nickName: accountData.nickName
			  };
		dispatch({
			type: defActionType.SELECT_ACCOUNT,
			selectedAccount: _selectInfo,
			step: state.amount ? 3 : 2
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
						const _bankInfoSysList = datas.map((item, i) => {
							return {
								id: i,
								sysId: item.sysId,
								displayText: item.bankName,
								image: item.bankLogo
							};
						});
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

	const addCryptoWallet = () => {
		setPopBox({
			isOpen: true,
			popBoxType: defPopBoxType.AddCryptoWallet,
			GetCustBankInfo
		});
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

	return !isUSDT ? (
		<BankCard
			t={t}
			state={state}
			defPanel={defPanel}
			custBankInfo={custBankInfo}
			accountName={accountName}
			addBankAccount={addBankAccount}
			selectAccount={selectAccount}
			delAccount={delAccount}
		/>
	) : (
		<CryptoCard
			t={t}
			state={state}
			isUSDT={isUSDT}
			accountName={accountName}
			custBankInfo={custBankInfo}
			selectAccount={selectAccount}
			addCryptoWallet={addCryptoWallet}
			GetCustBankInfo={GetCustBankInfo}
		/>
	);
};

CardPanel.propTypes = {
	t: PropTypes.func.isRequired,
	state: PropTypes.objectOf(PropTypes.any).isRequired,
	dispatch: PropTypes.func.isRequired,
	accountName: PropTypes.string.isRequired,
	GetCustBankInfo: PropTypes.func.isRequired,
	custBankInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	isUSDT: PropTypes.bool.isRequired
};

export default CardPanel;
