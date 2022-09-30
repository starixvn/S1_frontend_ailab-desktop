import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import QRCode from "qrcode.react";
import { useTranslation } from "react-i18next";
import { userInfoContext } from "./context";

const BankQR = ({ onClickClose, qrUrl, amount, transId }) => {
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);
	const [minutes, setMinutes] = useState(5);
	const [seconds, setSeconds] = useState(0);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
			} else if (seconds === 0 && minutes > 0) {
				setMinutes(minutes - 1);
				setSeconds(59);
			} else {
				onClickClose();
			}
		}, 1000);
		return () => clearTimeout(timer);
	}, [minutes, seconds]);
	const timeFormat = num => (num < 10 ? `0${num}` : num);

	return (
		<div className="duitnowPop active">
			<div className="popTit">
				{t("lbl_DuitNowQR")}
				<div className="icon icon-close" onClick={onClickClose} />
			</div>
			<div className="title">{t("lbl_ScanAndPay")}</div>
			<div className="amount">
				{t("lbl_Amount")}
				<span>
					{t(`Currency_${userInfo.currencyId}`)} {amount}
				</span>
			</div>
			<div className="guide">
				<div className="qrCode">
					<QRCode
						value={qrUrl}
						renderAs="svg"
						size={120}
						includeMargin={true}
					/>
				</div>
				<div className="sisa">
					<div>{t("lbl_PaymentTimeLeft")}</div>
					<div>
						<span>{timeFormat(minutes)}</span>:
						<span>{timeFormat(seconds)}</span>
					</div>
				</div>
			</div>
			<div className="title">{t("lbl_ImportantNotes")}：</div>
			<ul>
				<li>{t("lbl_DuitNowQRNote1")}</li>
				<li>{t("lbl_DuitNowQRNote2")}</li>
			</ul>
		</div>
	);
};

export default BankQR;

BankQR.defaultProps = {
	onClickClose: () => null
};

BankQR.propTypes = {
	onClickClose: PropTypes.func,
	qrUrl: PropTypes.string.isRequired,
	amount: PropTypes.number.isRequired,
	transId: PropTypes.string.isRequired
};
