import React, { useEffect, useRef, useContext } from "react";
import PropTypes from "prop-types";
import config from "../../config";
import { defActionType, defPanel } from "./withdrawal.reducer";
import { api_accountStrict_DelCustBankInfo } from "../../service/api/accountStrict";
import { api_payment_GetBankInfoSysList } from "../../service/api/payment";
import { popBoxContext } from "../common/context";
import defPopBoxType from "../common/defPopBoxType";

export default ({
	dispatch,
	state,
	t,
	accountName,
	GetCustBankInfo,
	custBankInfo,
	isUSDT
}) => {
	const { setPopBox } = useContext(popBoxContext);
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
							GetCustBankInfo
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

	const bankArr = custBankInfo?.map(item => {
		const _key = `withdrawal-bankCard-${item.accountNo}`;
		const _checked = item.accountNo === state.selectedAccount?.accountNo;

		return (
			<BankCard
				key={_key}
				checkKey={item.accountNo}
				{...item}
				selectAccount={selectAccount.bind(this, item)}
				checked={_checked}
				delAccount={delAccount.bind(this, item.accountNo, item.sysId)}
				hideDelBtn={state.panel === defPanel.confirm}
			/>
		);
	});

	const usdtWalletArr = custBankInfo?.map(item => {
		const _key = `withdrawal-usdt-${item.usdtAddress}`;
		const _checked =
			item.usdtAddress === state.selectedAccount?.usdtAddress;

		return (
			<CryptoCard
				key={_key}
				checkKey={item.usdtAddress}
				{...item}
				selectAccount={selectAccount.bind(this, item)}
				checked={_checked}
			/>
		);
	});

	return !isUSDT ? (
		<div className="addBank">
			{custBankInfo.length > 0 ? bankArr : null}
			{custBankInfo.length < 3 ? (
				<div className="addBankName" onClick={addBankAccount}>
					<div className="cryptoInfo">
						<div className="icon icon-plus" />
					</div>
					<div className="walletNickname">
						{t("lbl_AddBankAccount")}
					</div>
				</div>
			) : null}
			<div className="remainder">
				{t("lbl_NumberOfBankAccounts")}:{custBankInfo?.length ?? 0}/3
			</div>
		</div>
	) : (
		<div className="addBank">
			{custBankInfo.length > 0 ? usdtWalletArr : null}
			<div className="remainder">
				{t("lbl_Number_Of_Wallet")}:{custBankInfo?.length ?? 0}/
				{isUSDT
					? custBankInfo?.length === 0
						? "3"
						: custBankInfo?.length
					: "3"}
			</div>
		</div>
	);
};

const BankCard = props => {
	return (
		<div className="addBankName">
			<div className="addBankInfo">
				<div className="bankName">
					<img
						src={`${config.imgUrl}/common/images/BankLogo/${props.bankLogo}`}
						alt=""
					/>
				</div>
				<div className="checkbox">
					<input
						type="checkbox"
						id={props.checkKey}
						onChange={props.selectAccount}
						checked={props.checked}
					/>
					<label
						htmlFor={props.checkKey}
						className="icon icon-checkbox-checked"
					/>
				</div>
			</div>
			<div className="addBankInfo">
				<div className="txt-blue">
					<span>{props.accountNo?.slice(0, 4)}</span>
					<span>{props.accountNo?.slice(4, 8)}</span>
					<span>{props.accountNo?.slice(8, 12)}</span>
					<span>{props.accountNo?.slice(12, 16)}</span>
				</div>
				{props.hideDelBtn ? null : (
					<button
						className="icon icon-bin"
						onClick={props.delAccount}
					/>
				)}
			</div>
		</div>
	);
};

const CryptoCard = props => {
	return (
		<div className="addBankName">
			<div className="cryptoInfo">
				<i className="icon icon-BTC" />
				<div>{props.usdtAddress}</div>
				<div className="checkbox">
					<input
						type="checkbox"
						id={props.checkKey}
						onChange={props.selectAccount}
						checked={props.checked}
					/>
					<label
						htmlFor={props.checkKey}
						className="icon icon-checkbox-checked"
					/>
				</div>
			</div>
			<div className="walletNickname">{props.nickName}</div>
		</div>
	);
};

BankCard.defaultProps = {
	bankLogo: "",
	accountNo: "",
	checkKey: null
};

BankCard.propTypes = {
	bankLogo: PropTypes.string,
	accountNo: PropTypes.string,
	checkKey: PropTypes.string,
	selectAccount: PropTypes.func.isRequired,
	checked: PropTypes.bool.isRequired,
	hideDelBtn: PropTypes.bool.isRequired,
	delAccount: PropTypes.func.isRequired
};

CryptoCard.defaultProps = {
	usdtAddress: "",
	checkKey: null,
	nickName: ""
};

CryptoCard.propTypes = {
	usdtAddress: PropTypes.string,
	checkKey: PropTypes.string,
	selectAccount: PropTypes.func.isRequired,
	checked: PropTypes.bool.isRequired,
	nickName: PropTypes.string
};
