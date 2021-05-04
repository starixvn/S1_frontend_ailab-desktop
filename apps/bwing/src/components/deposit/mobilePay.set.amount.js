import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import config from "../../config";
import LimitTip from "./limitTip";
import { defActionType } from "./mobilePay.reducer";
import { checkAmount, number_format, getAmountTip } from "../common/common";
import Inputbox from "../common/inputbox";

export default ({ channelInfo, _isConvert, amount, dispatch }) => {
	const { t } = useTranslation();
	const [status, setStatus] = useState({
		checked: null,
		tip: ""
	});

	const EditAmount = e => {
		let { value } = e.target;
		value = value.replace(/^(0+)|[^\d]+/g, "");

		VaildAmount(value);
		dispatch({ type: defActionType.EDIT_AMOUNT, amount: value });
	};

	const VaildAmount = _amount => {
		const result = checkAmount({
			amount: _amount,
			minAmount: channelInfo.minAmount,
			maxAmount: channelInfo.maxAmount,
			formatRequired: _isConvert,
			t
		});
		if (result.status !== 0) {
			setStatus({
				checked: false,
				tip: result.msg
			});
		} else {
			setStatus({
				checked: true,
				tip: ""
			});
		}
		return result.status === 0;
	};

	const SubmitAmount = () => {
		const result = VaildAmount(amount);
		if (result) {
			dispatch({ type: defActionType.SUBMIT_AMOUNT });
		}
	};

	const SelectAmount = _amount => {
		VaildAmount(_amount);
		dispatch({ type: defActionType.EDIT_AMOUNT, amount: _amount });
	};

	const clickInfo = () => {
		const _msg =
			status.tip === ""
				? getAmountTip(channelInfo.minAmount, _isConvert, t)
				: "";
		setStatus({
			checked: null,
			tip: _msg
		});
	};

	const typeIsSelAmount = channelInfo.amountRule === 3;

	return (
		<div className="subModuleList">
			<div className="subModule">
				<div className="subModuleBody column">
					<div>
						<div className="bankName">
							<img
								src={`${config.imgUrl}/common/images/MobilePay/${channelInfo.groupName}.png`}
								alt={channelInfo.groupName}
							/>
						</div>
						<LimitTip
							minAmount={channelInfo.minAmount}
							maxAmount={channelInfo.maxAmount}
							displayTextLimit={t("lbl_Limit")}
							displayTextUnLimit={t("lbl_Unlimited")}
							_isConvert={_isConvert}
						/>
					</div>
					{typeIsSelAmount ? (
						<FixedAmountList
							{...channelInfo}
							_isConvert={_isConvert}
							onSelectAmount={SelectAmount}
							amount={amount}
						/>
					) : null}

					<Inputbox
						// title={t("lbl_Amount")}
						placeholder={t("lbl_DepositAmount")}
						value={amount}
						onChange={EditAmount}
						readOnly={typeIsSelAmount}
						onBlur={VaildAmount.bind(this, amount)}
						clickInfo={clickInfo}
						checked={status.checked}
						// tip={status.tip}
						_isConvert={_isConvert}
						onKeyPress={e => {
							if (e.key === "Enter") {
								SubmitAmount();
							}
						}}
					/>
					<div className={`tip${status.tip ? " active" : ""}`}>
						{status.tip}
					</div>
					<div className="btnGroup">
						<button
							className={`${
								status.checked === true
									? "btn-check"
									: "btn-cancel"
							}`}
							onClick={SubmitAmount}>
							{t("lbl_deposit_submit")}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

const FixedAmountList = ({
	minAmount,
	maxAmount,
	amountList,
	_isConvert,
	amount,
	onSelectAmount
}) => {
	const rows = amountList
		?.filter(a => a >= minAmount && a <= maxAmount)
		.map(a => {
			const _afterConvertAmount = _isConvert ? a / 1000 : a;
			const isSelected = amount === _afterConvertAmount;

			return (
				<button
					onClick={onSelectAmount.bind(this, _afterConvertAmount)}
					className={`blue${isSelected ? " active" : ""}`}
					key={`deposit-mobile-${a}`}>
					{number_format(a, _isConvert)}
					<i className="icon icon-checkmark" />
				</button>
			);
		});
	return <div className="btnGroup buttonBox">{rows}</div>;
};
