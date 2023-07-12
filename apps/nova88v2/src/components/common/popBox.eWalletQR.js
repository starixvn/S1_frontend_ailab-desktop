import React, { useContext, useRef } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { bannerImgUrl, paymentImgUrl } from "../../config";
import { userInfoContext } from "./context";
import { number_format } from "./common";

const EWalletQR = ({ onClickClose, qrUrl, amount, transId }) => {
	const inputRef = useRef(null);
	const { t } = useTranslation();
	const { userInfo } = useContext(userInfoContext);

	const copy = () => {
		if (inputRef.current) {
			inputRef.current.select();
			document.execCommand("copy");
		}
	};

	return (
		<div className="thiaPop active">
			<div className="popTit">
				<img src={`${bannerImgUrl}/desktop/img/thaiqr.jpg`} alt="" />
				<div className="icon icon-close" onClick={onClickClose} />
			</div>
			<div className="guide">
				<div className="banklogo">
					<img
						src={`${bannerImgUrl}/desktop/img/promptpay.png`}
						alt=""
					/>
				</div>
				<div className="qrCode">
					<img src={`${paymentImgUrl}${qrUrl}`} alt="" />
				</div>
				<div className="amount">
					{t("lbl_EWalletQRDesc1")}
					<span>฿ {number_format(amount, false, 2)}</span>
				</div>
				<div className="description">
					Description:
					<input type="text" value={transId} ref={inputRef} />
					<button className="icon icon-files-empty" onClick={copy} />
				</div>
				<div className="info">
					<p>{t("lbl_EWalletQRDesc2")}</p>
					<div>{t("lbl_EWalletQRDesc3")}</div>
					<div>
						{t("lbl_EWalletQRDesc4")}
						<span>{userInfo.langId === "th" ? "179" : "167"}</span>
						{t("lbl_EWalletQRDesc5")}
					</div>
					<div>
						{t("lbl_EWalletQRDesc6")}
						<span> {t("lbl_EWalletQRDesc7")}</span>
					</div>
				</div>
			</div>
			<div className="title">{t("lbl_EWalletQRDesc8")}</div>
			<ul>
				<li>{t("lbl_EWalletQRDesc9")}</li>
				<li>{t("lbl_EWalletQRDesc10")}</li>
				<li>{t("lbl_EWalletQRDesc11")}</li>
				<li>{t("lbl_EWalletQRDesc12")}</li>
			</ul>
		</div>
	);
};

export default EWalletQR;

EWalletQR.defaultProps = {
	onClickClose: () => null
};

EWalletQR.propTypes = {
	onClickClose: PropTypes.func,
	qrUrl: PropTypes.string.isRequired,
	amount: PropTypes.number.isRequired,
	transId: PropTypes.string.isRequired
};
