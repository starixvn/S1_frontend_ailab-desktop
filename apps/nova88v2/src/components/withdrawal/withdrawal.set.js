import React, { useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import CardPanel from "./withdrawal.set.card";
import AmountPanel from "./withdrawal.set.amount";
import ConfirmPanel from "./withdrawal.set.confirm";
import { isConvert } from "../common/common";
import { userInfoContext, popBoxContext } from "../common/context";
import defPopBoxType from "../common/defPopBoxType";
import { defActionType } from "./withdrawal.reducer";
import { api_account_GetCustBankInfo } from "../../service/api/account";
import { currencyCode } from "../../datas/countryCode";

const MainPanel = ({
	dispatch,
	state,
	refreshData,
	KycCheck,
	GetDailyWithdrawalLimit
}) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const { setPopBox } = useContext(popBoxContext);
	const _isConvert = isConvert(userInfo.currencyId);
	const isMountedRef = useRef(null);
	const isIfscRequired = userInfo.currencyId === currencyCode.INR;

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		GetCustBankInfo();
	}, [state.balanceData]);

	const GetCustBankInfo = () => {
		const ClosePopBox = () => {
			setPopBox({ isOpen: false });
		};

		const selectPrevAccount = (_defAccountNo, _bankInfoDetail) => {
			const _preAccInfo = _bankInfoDetail.filter(
				card => card.accountNo === _defAccountNo
			)[0];
			const _preUsdtAccInfo = _bankInfoDetail.filter(
				card => card.usdtAddress === _defAccountNo
			)[0];
			if (_preAccInfo || _preUsdtAccInfo) {
				const _selectInfo = !_preUsdtAccInfo?.usdtAddress
					? {
							bankName: _preAccInfo.bankName,
							accountNo: _preAccInfo.accountNo,
							sysId: _preAccInfo.sysId,
							ifscCode: _preAccInfo.ifscCode
					  }
					: {
							usdtAddress: _preUsdtAccInfo.usdtAddress,
							nickName: _preUsdtAccInfo.nickName
					  };
				dispatch({
					type: defActionType.SELECT_ACCOUNT,
					selectedAccount: _selectInfo
				});
			}
		};

		api_account_GetCustBankInfo().then(
			res => {
				if (isMountedRef.current) {
					if (res.data.errorCode === 0) {
						const datas = res.data.data;

						const _custBankInfo = {
							uSDTDetail: datas?.uSDTDetail || [],
							bankInfoDetail: datas?.bankInfoDetail
						};

						dispatch({
							type: defActionType.GET_CUST_BANKINFO,
							custBankInfo: _custBankInfo
						});

						if (datas?.defAccountNo) {
							if (datas?.bankInfoDetail?.length > 0) {
								selectPrevAccount(
									datas.defAccountNo,
									datas.bankInfoDetail
								);
							}
							if (datas?.uSDTDetail?.length > 0) {
								selectPrevAccount(
									datas.defAccountNo,
									datas.uSDTDetail
								);
							}
						}
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

	return (
		<>
			<CardPanel
				dispatch={dispatch}
				state={state}
				t={t}
				accountName={userInfo.accountName}
				GetCustBankInfo={GetCustBankInfo}
				refreshData={refreshData}
				custBankInfo={state.custBankInfo}
				isIfscRequired={isIfscRequired}
			/>
			<div className="subModuleList">
				{state.panel === "amount" ? (
					<AmountPanel
						dispatch={dispatch}
						state={state}
						t={t}
						_isConvert={_isConvert}
						userInfo={userInfo}
					/>
				) : (
					<ConfirmPanel
						dispatch={dispatch}
						t={t}
						_isConvert={_isConvert}
						selectedAccount={state.selectedAccount}
						accountName={userInfo.accountName}
						amount={state.amount}
						GetCustBankInfo={GetCustBankInfo}
						refreshData={refreshData}
						KycCheck={KycCheck}
						GetDailyWithdrawalLimit={GetDailyWithdrawalLimit}
						isIfscRequired={isIfscRequired}
						receiveUSDT={state.receiveUSDT}
					/>
				)}
			</div>
		</>
	);
};

MainPanel.propTypes = {
	state: PropTypes.objectOf(PropTypes.any).isRequired,
	dispatch: PropTypes.func.isRequired,
	refreshData: PropTypes.func.isRequired,
	KycCheck: PropTypes.func.isRequired,
	GetDailyWithdrawalLimit: PropTypes.func.isRequired
};

export default MainPanel;
