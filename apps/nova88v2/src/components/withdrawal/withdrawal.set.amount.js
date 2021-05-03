import React, { useContext } from "react";
import PropTypes from "prop-types";
import { number_format, checkAmount, getAmountTip } from "../common/common";
import { defActionType, defPanel } from "./withdrawal.reducer";
import { popBoxContext } from "../common/context";
import Inputbox from "../common/inputbox";
import defPopBoxType from "../common/defPopBoxType";

const AmountPanel = ({ dispatch, state, t, _isConvert, userInfo, isUSDT }) => {
	const { setPopBox } = useContext(popBoxContext);

	const EditAmount = Value => {
		const value = String(Value).replace(/^(0+)|[^\d]+/g, "");
		ValidAmount(value);
		dispatch({
			type: defActionType.EDIT_AMOUNT,
			amount: value
		});
	};

	const ValidAmount = _amount => {
		const result = checkAmount({
			amount: _amount,
			minAmount: state.withdrawalMin,
			maxAmount: state.balanceData?.availableBalance,
			_isConvert,
			t,
			maxAmountAllowUnlimit: false
		});
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

	const clickInfo = () => {
		const _msg =
			state.tip === "" || !state.tip
				? getAmountTip(state.withdrawalMin, _isConvert, t)
				: "";
		dispatch({
			type: defActionType.CHECK_AMOUNT,
			checked: null,
			tip: _msg
		});
	};

	const ClosePopBox = () => {
		setPopBox({ isOpen: false });
	};

	const clickSubmit = e => {
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
				message: isUSDT
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
						clickInfo={clickInfo}
						title={t("lbl_Amount")}
						checked={state.checked ?? null}
						tip={state.tip}
						_isConvert={_isConvert}
						onBlur={ValidAmount.bind(this, state.amount)}
						isAmount={true}
					/>
					<div className="btnGroup">
						<button
							className={state.checked ? "btn-check" : "gray"}
							disabled={!state.checked}
							type="submit">
							{t("lbl_Submit")}
						</button>
					</div>
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
	userInfo: PropTypes.objectOf(PropTypes.any).isRequired,
	isUSDT: PropTypes.bool.isRequired
};

export default AmountPanel;
