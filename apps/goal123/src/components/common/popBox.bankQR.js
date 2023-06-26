import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import QRCode from "qrcode.react";
import PropTypes from "prop-types";
import { userInfoContext } from "./context";
import config from "../../config";
import ClipboardJS from "../../lib/clipboard.min";
import { isConvert, number_format } from "./common";

const BankQR = ({
	onClose,
	qrCodeUrl,
	amount,
	transId,
	code,
	bankLogo,
	title,
	generateQr
}) => {
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
				onClose();
			}
		}, 1000);
		return () => clearTimeout(timer);
	}, [minutes, seconds]);

	const timeFormat = num => (num < 10 ? `0${num}` : num);

	useEffect(() => {
		// eslint-disable-next-line
		const _clipboard = new ClipboardJS(".copyBtn");
	}, []);

	return (
		<div className="qrpayPop active">
			<div className="popTit">
				{title}
				<div className="icon icon-close" onClick={onClose} />
			</div>
			<div className="logo">
				<img
					alt={bankLogo}
					src={`${config.cloudImgUrl}/${bankLogo.toLowerCase()}`}
				/>
			</div>
			<div className="info">
				{t("lbl_TransactionID")}
				<span>{transId}</span>
			</div>
			<div className="sisa">
				<div>{t("lbl_PaymentTimeLeft")}</div>
				<div>
					<span>{timeFormat(minutes)}</span>:
					<span>{timeFormat(seconds)}</span>
				</div>
			</div>
			<div className="amount">
				{t("lbl_Amount")}
				<span>
					{`${t(`Currency_${userInfo.currencyId}`)} ${number_format({
						number: amount,
						formatRequired: isConvert(userInfo.currencyId),
						digits: 0
					})}`}
				</span>
			</div>
			<div className="guide">
				<div className="qrCode">
					{generateQr ? (
						<QRCode
							value={qrCodeUrl}
							renderAs="svg"
							size={135}
							includeMargin={true}
						/>
					) : (
						<img src={`${config.cloudImgUrl}${qrCodeUrl}`} alt="" />
					)}
				</div>
				<div className="code">
					{code}
					<button className="copyBtn" data-clipboard-text={code}>
						{t("lbl_Copy")}
					</button>
				</div>
				<div className="info">{t("lbl_BankQrInfo")}</div>
			</div>
			<div className="title">{`${t("lbl_Content")}:`}</div>
			<ul>
				<li>{t("lbl_BankQrContent1")}</li>
				<li>{t("lbl_BankQrContent2")}</li>
				<li>{t("lbl_BankQrContent3")}</li>
				<li>{t("lbl_BankQrContent4")}</li>
			</ul>
			<div className="info">{t("lbl_BankQrContentNote")}</div>
		</div>
	);
};

export default BankQR;

BankQR.defaultProps = {
	onClose: () => null,
	generateQr: null
};

BankQR.propTypes = {
	onClose: PropTypes.func,
	qrCodeUrl: PropTypes.string.isRequired,
	amount: PropTypes.number.isRequired,
	transId: PropTypes.string.isRequired,
	code: PropTypes.string.isRequired,
	bankLogo: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	generateQr: PropTypes.bool
};
