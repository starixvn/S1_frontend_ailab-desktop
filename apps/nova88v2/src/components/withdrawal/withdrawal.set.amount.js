import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { number_format, checkAmount, defCurrencyList } from "../common/common";
import { defActionType, defPanel } from "./withdrawal.reducer";
import { popBoxContext } from "../common/context";
import Inputbox from "../common/inputbox";
import defPopBoxType from "../common/defPopBoxType";
import path from "../../router";

const AmountPanel = ({ dispatch, state, t, _isConvert, userInfo }) => {
	const { setPopBox } = useContext(popBoxContext);

	useEffect(() => {
		if (Object.keys(state.selectedAccount).length > 0 && state.amount) {
			ValidAmount(state.amount);
		}
	}, [state.selectedAccount]);

	useEffect(() => {
		if (
			userInfo.currencyId === defCurrencyList.INR &&
			!userInfo.phoneVerified
		) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.UpdateProfile,
				title: t("lbl_Withdrawal"),
				content: t("lbl_Complete_PhoneVerification"),
				btnBar: (
					<div className="btnGroup">
						<button
							className="btn-cancel"
							onClick={() => setPopBox({ isOpen: false })}
						>
							{t("lbl_Later")}
						</button>
						<Link
							className="btn-check"
							to={`/${userInfo.langId}/${path.profile.root}`}
						>
							{t("lbl_VertifyNow")}
						</Link>
					</div>
				)
			});
		}
	}, [userInfo.currencyId]);

	const EditAmount = Value => {
		const value = String(Value).replace(/^(0+)|[^\d]+/g, "");
		ValidAmount(value);
		dispatch({
			type: defActionType.EDIT_AMOUNT,
			amount: value
		});
	};

	const ValidAmount = _amount => {
		let result = {};
		const real_amount = _isConvert
			? Number(_amount) * 1000
			: Number(_amount);

		let _withdrawalMin = state.withdrawalMin;
		let _withdrawalMax = state.balanceData?.availableBalance;
		let _unlimited = state.unlimited;

		if (state.selectedAccount.usdtAddress) {
			const { currencyId, network } = state.selectedAccount;
			const cryptoInfo = state.usdtList.find(
				el => el.currencyId === currencyId && el.network === network
			);

			_withdrawalMin = cryptoInfo.withdrawalMin;
			_withdrawalMax = cryptoInfo.withdrawalAvailableAmount;
			_unlimited = cryptoInfo.unlimited;
		}

		if (!_unlimited && real_amount > _withdrawalMax) {
			result = {
				status: 2,
				msg: t("lbl_WithdrawalDailyReached")
			};
		} else {
			result = checkAmount({
				amount: _amount,
				minAmount: _withdrawalMin,
				maxAmount: _withdrawalMax,
				_isConvert,
				t,
				maxAmountAllowUnlimit: _unlimited,
				hintKey: "lbl_Insufficientbalance",
				digits: 2
			});
		}

		if (result.status !== 0) {
			dispatch({
				type: defActionType.CHECK_AMOUNT,
				checked: false,
				tip: result.msg
			});
		} else {
			dispatch({
				type: defActionType.CHECK_AMOUNT,
				checked: true,
				tip: ""
			});
		}
		return result.status === 0;
	};

	const crytpoLimit = state.usdtList?.find(
		el =>
			el.currencyId === state.selectedAccount.currencyId &&
			el.network === state.selectedAccount.network
	);
	const _unlimited = state.selectedAccount?.usdtAddress
		? crytpoLimit.unlimited
		: state.unlimited;

	const withdrawalMinMaxLimitHint = `${t("lbl_Daily_Min_Max_Amount", {
		min: number_format(
			state.selectedAccount?.usdtAddress
				? crytpoLimit.withdrawalMin
				: state.withdrawalMin,
			_isConvert,
			2
		),
		max: _unlimited
			? t("lbl_Unlimited")
			: number_format(
					state.selectedAccount?.usdtAddress
						? crytpoLimit.withdrawalAvailableAmount
						: state.withdrawalMax,
					_isConvert,
					2
			  )
	})}`;

	const ClosePopBox = () => {
		setPopBox({ isOpen: false });
	};

	const clickSubmit = async e => {
		e.preventDefault();
		const amountChecked = ValidAmount(state.amount);

		if (
			(state.selectedAccount.accountNo ||
				state.selectedAccount.usdtAddress) &&
			amountChecked
		) {
			dispatch({
				type: defActionType.TO_OTHER_PANEL,
				panel: defPanel.confirm
			});
		} else if (
			!state.selectedAccount.accountNo ||
			state.selectedAccount.usdtAddress
		) {
			setPopBox({
				isOpen: true,
				popBoxType: defPopBoxType.ErrorMsg,
				message: state.selectedAccount.usdtAddress
					? t("lbl_Select_Crypto_Wallet")
					: t("lbl_SelectBank_Required"),
				btnBar: (
					<div className="btnGroup">
						<button className="btn-check" onClick={ClosePopBox}>
							{t("lbl_Close")}
						</button>
					</div>
				)
			});
		}
	};

	return (
		<div className="subModule">
			<div className="subModuleBody">
				<div className="calculation">
					<div>
						<div>{t("lbl_Balance")}</div>
						<div>
							{userInfo.currencyId
								? t(`Currency_${userInfo.currencyId}`)
								: ""}
							<span>
								{number_format(
									state.balanceData?.balance,
									_isConvert
								)}
							</span>
						</div>
					</div>
					<div>-</div>
					<div>
						<div>{t("lbl_Deduction")}</div>
						<div>
							{userInfo.currencyId
								? t(`Currency_${userInfo.currencyId}`)
								: ""}
							<span>
								{number_format(
									state.balanceData?.deduction,
									_isConvert
								)}
							</span>
						</div>
					</div>
					<div>=</div>
					<div>
						<div>{t("lbl_EligibleWithdrawalAmount")}</div>
						<div>
							{userInfo.currencyId
								? t(`Currency_${userInfo.currencyId}`)
								: ""}
							<span>
								{number_format(
									state.balanceData?.availableBalance,
									_isConvert
								)}
							</span>
						</div>
					</div>
				</div>

				<form className="inputModuleRow" onSubmit={clickSubmit}>
					<Inputbox
						className="inputBox-white"
						value={state.amount}
						onChange={e => EditAmount(e.target.value)}
						// clickInfo={clickInfo}
						title={t("lbl_Amount")}
						checked={state.checked ?? null}
						tip={state.tip}
						_isConvert={_isConvert}
						onBlur={ValidAmount.bind(this, state.amount)}
						isAmount={true}
					/>
					<div className="tip active">
						<span>
							{t("lbl_Times")}:{" "}
							{`${state.withdrawalTimes} / ${
								state.maxTimes === 0
									? t("lbl_Unlimited")
									: state.maxTimes
							}`}
						</span>
						{withdrawalMinMaxLimitHint}
					</div>
					<div className="btnGroup">
						<button
							className={
								state.checked &&
								!(
									userInfo.currencyId ===
										defCurrencyList.INR &&
									!userInfo.phoneVerified
								)
									? "btn-check"
									: "gray"
							}
							disabled={
								!state.checked ||
								(userInfo.currencyId === defCurrencyList.INR &&
									!userInfo.phoneVerified) ||
								(state.maxTimes > 0 &&
									state.withdrawalTimes >= state.maxTimes)
							}
							type="submit"
						>
							{t("lbl_Submit")}
						</button>
					</div>

					{/* <div className="tip active">
						Preferred currency can not be changed after
						registration.
					</div> */}
				</form>
			</div>
		</div>
	);
};

AmountPanel.propTypes = {
	dispatch: PropTypes.func.isRequired,
	state: PropTypes.objectOf(PropTypes.any).isRequired,
	t: PropTypes.func.isRequired,
	_isConvert: PropTypes.bool.isRequired,
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired
};

export default AmountPanel;
