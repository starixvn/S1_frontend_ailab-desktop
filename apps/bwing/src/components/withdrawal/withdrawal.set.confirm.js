import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes, { bool, func, number, string } from "prop-types";
import { userInfoContext } from "../common/context";
import { number_format } from "../common/common";
import { IconSpinner } from "../common/loading";

export const WithdrawalConfirm = props => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	return (
		<div className="subModuleBody column align-items-center">
			<span className="title">{t("lbl_ImportantNote")}</span>
			<div className="txt-lightgray">{t("lbl_ConfirmWithdrawal")}</div>
			<div className="smallList">
				<ul>
					<li>{t("lbl_WithdrawalTo")}</li>
					<li>{props.bankNameValue}</li>
				</ul>
				<ul>
					<li>{t("lbl_AccountNumber")}</li>
					<li className="accountNumber">
						{`${props.accountNoValue?.slice(0, 4)} `}
						{`${props.accountNoValue?.slice(4, 8)} `}
						{`${props.accountNoValue?.slice(8, 12)} `}
						{props.accountNoValue?.slice(12, 16)}
					</li>
				</ul>
				<ul>
					<li>{t("lbl_BankAccountName")}</li>
					<li>{userInfo.accountName}</li>
				</ul>
				<ul>
					<li>{t("lbl_WithdrawalAmount")}</li>
					<li>
						{number_format({
							number: props.amountValue,
							formatRequired: props._isConvert,
							digits: 0
						})}
					</li>
				</ul>
			</div>
			<div className="btnGroup">
				<button className="btn-cancel" onClick={props.cancelSubmit}>
					{t("lbl_Cancel")}
				</button>
				<button className="btn-check" onClick={props.confirmSubmit}>
					{t("lbl_Confirm")}
				</button>
			</div>
		</div>
	);
};

WithdrawalConfirm.propTypes = {
	bankNameValue: string.isRequired,
	accountNoValue: string.isRequired,
	amountValue: number.isRequired,
	_isConvert: bool.isRequired,
	cancelSubmit: func.isRequired,
	confirmSubmit: func.isRequired
};

export const WithdrawalUSDTConFirm = ({
	t,
	currentUSDTDetail,
	usdtExchangeAmount,
	amountValue,
	cancelSubmit,
	confirmSubmit,
	getExchangeInfo,
	onChangeExchangeInfo,
	_isConvert
}) => {
	const { nickName, usdtAddress, network, currencyName } = currentUSDTDetail;
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getUSDTAmount = async () => {
			setLoading(true);

			const { rate, to_Amount } = await getExchangeInfo({
				amount: amountValue,
				network,
				currencyName
			});

			onChangeExchangeInfo({
				exchangeRate: Number(rate),
				exchangeAmount: Number(to_Amount) || 0
			});

			setLoading(false);
		};

		if (amountValue) getUSDTAmount();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [amountValue, currencyName, network]);

	return (
		<div className="subModuleBody column align-items-center">
			<span className="title">{t("lbl_ImportantNote")}</span>
			<div className="txt-lightgray">{t("lbl_ConfirmWithdrawal")}</div>
			<div className="smallList">
				<ul>
					<li>{t("lbl_CryptoWalletAddress")}</li>
					<li>{usdtAddress}</li>
				</ul>
				<ul>
					<li>{t("lbl_CryptoWalletNickName")}</li>
					<li className="accountNumber">{nickName}</li>
				</ul>

				<ul>
					<li>{t("lbl_WithdrawalAmount")}</li>

					<li>
						{number_format({
							number: amountValue,
							formatRequired: _isConvert,
							digits: 0
						})}
					</li>
				</ul>

				<ul>
					<li>{t("lbl_USDT_Amount", { currencyName })}</li>
					<li>
						<IconSpinner active={loading} />

						{!loading && usdtExchangeAmount}
					</li>
				</ul>
			</div>
			<div className="txt-lightgray">
				{t("lbl_Deposit_USDT_CONFIRM_DESCRIPTION")}
			</div>
			<div className="btnGroup">
				<button className="btn-cancel" onClick={cancelSubmit}>
					{t("lbl_Cancel")}
				</button>
				<button className="btn-check" onClick={confirmSubmit}>
					{t("lbl_Confirm")}
				</button>
			</div>
		</div>
	);
};

WithdrawalUSDTConFirm.propTypes = {
	t: PropTypes.func.isRequired,
	currentUSDTDetail: PropTypes.objectOf(PropTypes.any).isRequired,
	usdtExchangeAmount: PropTypes.number.isRequired,
	amountValue: PropTypes.number.isRequired,
	cancelSubmit: PropTypes.func.isRequired,
	confirmSubmit: PropTypes.func.isRequired,
	getExchangeInfo: PropTypes.func.isRequired,
	onChangeExchangeInfo: PropTypes.func.isRequired,
	_isConvert: PropTypes.bool.isRequired
};
