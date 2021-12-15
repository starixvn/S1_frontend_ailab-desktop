import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { useTranslation } from "react-i18next";
import QRCode from "qrcode.react";
import { number_format, isConvert } from "./common";
import ClipboardJS from "../../lib/clipboard.min";
import { defDepositType } from "../deposit/deposit.def";

const Panel = ({
	title,
	amount,
	depositAmount,
	rate,
	requestAmount,
	token,
	currencyId,
	imgUrl,
	thirdId,
	depositType,
	handlePopBox,
	cashbackAmount,
	receivedAmount,
	PromotionRate,
	promoContent
}) => {
	const { t } = useTranslation();
	const isMountedRef = useRef(null);
	const isCrypto = depositType === defDepositType.cryptoPay;
	const _isConvert = isConvert(currencyId);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		const _clipboard = new ClipboardJS(".copyBtn");
	}, []);

	const amountText = `${t(`Currency_${currencyId}`)} ${number_format({
		number: amount,
		formatRequired: true,
		isConvertRequired: _isConvert,
		digits: 0
	})}`;

	const timeText = moment().format("YYYY-MM-DD H:mm:ss");

	return (
		<div className="pop">
			<div className="cryptoPop active">
				<div className="poptit">
					{title}
					<div className="icon icon-close" onClick={handlePopBox} />
				</div>

				<div className="cryptolist">
					<span className="txt-lightgray">
						{`${t("lbl_PaymentDetails")}：`}
					</span>

					{thirdId && (
						<ul>
							<li>
								{t("lbl_Deposit_DragonPayPop_OrderNumber")}：
							</li>
							<li>{thirdId}</li>
						</ul>
					)}

					<ul>
						<li>{`${t("lbl_Time")}：`}</li>
						<li>{timeText}</li>
					</ul>
					<ul>
						<li>{`${t("lbl_OrderAmount")}：`}</li>
						<li>{amountText}</li>
					</ul>

					{promoContent === "1" && (
						<>
							<ul>
								<li>{`${t("lbl_CashbackAmount")}：`}</li>
								<li>
									{`${number_format({
										number: cashbackAmount,
										formatRequired: isConvert(currencyId)
									})}(${PromotionRate})`}
								</li>
							</ul>

							<ul>
								<li>{`${t("lbl_ReceivedAmount")}：`}</li>
								<li>
									{number_format({
										number: receivedAmount,
										formatRequired: isConvert(currencyId)
									})}
								</li>
							</ul>
						</>
					)}
				</div>

				<div className="cryptoGuide">
					{isCrypto ? (
						<QRCode
							className="lineqr_img"
							id={imgUrl}
							value={imgUrl}
							renderAs="svg"
							includeMargin={true}
						/>
					) : (
						<img src={imgUrl} className="lineqr_img" alt="qrcode" />
					)}

					<span className="txt-lightgray">
						{imgUrl}
						<button
							className="copyBtn icon icon-files-empty"
							data-clipboard-text={imgUrl}
						/>
					</span>
					<ul>
						<li>{t("lbl_Usdt_Method")}:</li>
						<li>{token}</li>
					</ul>
					<ul>
						<li>{t("lbl_Rate")}:</li>
						<li>{rate}</li>
					</ul>
					<ul>
						<li>{t("lbl_USDT_Amount")}:</li>
						<li>
							{requestAmount}
							<button
								className="copyBtn icon icon-files-empty"
								data-clipboard-text={requestAmount}
							/>
						</li>
					</ul>
				</div>

				<div className="txt-crypto">
					{`${t("lbl_ImportantNotes")}：`}
					<ul>
						<li>{t("lbl_PaymentQRNote1")}</li>
						<li>{t("lbl_PaymentQRNote2")}</li>
					</ul>
				</div>
				<div className="sisa">
					<div>{t("lbl_PaymentTimeLeft")}</div>
					<div>
						<Counter timeStop={handlePopBox} />
					</div>
				</div>
			</div>
		</div>
	);
};

export const Counter = ({ startUnixTime = null, timeStop }) => {
	const now = moment().unix();
	const [count, setCount] = useState((startUnixTime || now) + 600 - now);
	const timerRef = useRef(null);

	const secondsToTime = secondsInTime => {
		const pad = (num, size) => {
			return `000${num}`.slice(size * -1);
		};
		const time = parseFloat(secondsInTime).toFixed(3);
		const minutes = Math.floor(time / 60) % 60;
		const seconds = Math.floor(time - minutes * 60);
		return `${pad(minutes, 2)}:${pad(seconds, 2)}`;
	};

	useEffect(() => {
		const interval = setInterval(() => {
			setCount(prev => prev - 1);
		}, 1000);
		timerRef.current = interval;

		return () => {
			clearInterval(timerRef.current);
		};
	}, []);

	useEffect(() => {
		if (count === 0) {
			clearInterval(timerRef.current);
			timeStop();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [count]);

	return ` ( ${secondsToTime(count)} ) `;
};

export default Panel;

Panel.defaultProps = {
	rate: null,
	requestAmount: null,
	token: null,
	thirdId: null,
	cashbackAmount: null,
	receivedAmount: null,
	PromotionRate: "",
	promoContent: null
};

Panel.propTypes = {
	title: PropTypes.string.isRequired,
	amount: PropTypes.number.isRequired,
	depositAmount: PropTypes.string.isRequired,
	rate: PropTypes.number,
	requestAmount: PropTypes.number,
	token: PropTypes.string,
	currencyId: PropTypes.number.isRequired,
	imgUrl: PropTypes.string.isRequired,
	thirdId: PropTypes.string,
	depositType: PropTypes.string.isRequired,
	handlePopBox: PropTypes.func.isRequired,
	cashbackAmount: PropTypes.string,
	receivedAmount: PropTypes.string,
	PromotionRate: PropTypes.string,
	promoContent: PropTypes.string
};
