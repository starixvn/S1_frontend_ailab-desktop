import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import { userInfoContext } from "../common/context";
import { number_format } from "../common/common";

import { IconSpinner } from "../common/loading";

export default props => {
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
						{`${props.accountNoValue?.slice(0, 4)}  `}
						{`${props.accountNoValue?.slice(4, 8)} `}
						{`${props.accountNoValue?.slice(8, 12)} `}
						{`${props.accountNoValue?.slice(12, 16)} `}
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

export const WithdrawalUSDTConFirm = ({
	t,
	currentUSDTDetail,
	amountValue,
	cancelSubmit,
	confirmSubmit,
	getExchangeInfo,
	_isConvert
}) => {
	const { nickName, usdtAddress, currencyName, network } = currentUSDTDetail;
	const [uSDTAmount, setUSDTAmount] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getUSDTAmount = async () => {
			setLoading(true);

			const _uSDTAmount = await getExchangeInfo({
				amount: amountValue,
				currencyName,
				network
			});

			setUSDTAmount(_uSDTAmount || 0);

			setLoading(false);
		};

		getUSDTAmount();
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

						{!loading && uSDTAmount}
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
	amountValue: PropTypes.number.isRequired,
	cancelSubmit: PropTypes.func.isRequired,
	confirmSubmit: PropTypes.func.isRequired,
	getExchangeInfo: PropTypes.func.isRequired,
	_isConvert: PropTypes.bool.isRequired
};
