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
	cashbackAmount,
	promoContent,
	receivedAmount,
	PromotionRate,
	rate,
	requestAmount,
	token,
	currencyId,
	imgUrl,
	bankName,
	accountNumber,
	accountName,
	thirdId,
	depositType,
	handlePopBox,
	currencyName
}) => {
	const { t } = useTranslation();
	const isMountedRef = useRef(null);
	const isCrypto = depositType === defDepositType.cryptoPay;

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	useEffect(() => {
		const _clipboard = new ClipboardJS(".copyBtn");
	}, []);

	const depositAmountText = `${t(`Currency_${currencyId}`)} ${number_format(
		depositAmount,
		isConvert(currencyId),
		0
	)}`;

	const amountText = `${t(`Currency_${currencyId}`)} ${number_format(
		amount,
		isConvert(currencyId),
		0
	)}`;

	const timeText = moment().format("YYYY-MM-DD H:mm:ss");

	return (
		<div className="dragonPayPop active">
			<div className="popTit">
				{title}
				<div className="icon icon-close" onClick={handlePopBox} />
			</div>
			<div className="title">{`${t("lbl_PaymentDetails")}：`}</div>

			{thirdId && (
				<div>
					{t("lbl_Deposit_DragonPayPop_OrderNumber")}：
					<span>{thirdId}</span>
				</div>
			)}

			<div>
				{`${t("lbl_Time")}：`}
				<span>{timeText}</span>
			</div>
			<div>
				{`${t("lbl_OrderAmount")}：`}
				<span>{amountText}</span>
			</div>
			{promoContent === "1" && (
				<>
					<div>
						{`${t("lbl_CashbackAmount")}：`}
						<span>
							{`${number_format(
								cashbackAmount,
								isConvert(currencyId)
							)}(${PromotionRate})`}
						</span>
					</div>
					<div>
						{`${t("lbl_ReceivedAmount")}：`}
						<span>
							{number_format(
								receivedAmount,
								isConvert(currencyId)
							)}
						</span>
					</div>
				</>
			)}

			<div className="guide">
				{isCrypto ? (
					<QRCode
						id={imgUrl}
						value={imgUrl}
						renderAs="svg"
						includeMargin={true}
					/>
				) : (
					<img src={imgUrl} className="qrCode" alt="qrcode" />
				)}

				{isCrypto ? (
					<div className="accountInfo">
						<div
							style={{
								wordBreak: "break-all",
								textAlign: "center"
							}}>
							{imgUrl}
						</div>
						<div>
							<button
								className="copyBtn"
								data-clipboard-text={imgUrl}>
								{t("lbl_Copy")}
							</button>
						</div>
						<div>
							{t("lbl_Method")}: {token}
						</div>
						<div>
							{t("lbl_Rate")}: {rate}
						</div>
						<div>
							{`${currencyName} ${t("lbl_Amount")}`}:{" "}
							{requestAmount}{" "}
							<button
								className="copyBtn"
								data-clipboard-text={requestAmount}>
								{t("lbl_Copy")}
							</button>
						</div>
					</div>
				) : (
					<div>
						{`${t("lbl_Pay")} `}
						<span>{depositAmountText}</span>
					</div>
				)}

				{accountNumber && (
					<div className="accountInfo">
						<div
							style={{
								wordBreak: "break-all",
								textAlign: "center"
							}}>
							{t("lbl_Deposit_DragonPayPop_BankName")}：{bankName}
						</div>
						<div>
							{t("lbl_Deposit_DragonPayPop_AccountName")}：
							{accountName}
							<button
								className="copyBtn"
								data-clipboard-text={accountName}>
								{t("lbl_Copy")}
							</button>
						</div>
						<div>
							{t("lbl_Deposit_DragonPayPop_AccountNumber")}：
							{accountNumber}
							<button
								className="copyBtn"
								data-clipboard-text={accountNumber}>
								{t("lbl_Copy")}
							</button>
						</div>
					</div>
				)}

				<ul>
					<li>{t("lbl_PaymentQRDesc1")}</li>
					<li>{t("lbl_PaymentQRDesc2")}</li>
				</ul>
			</div>

			<div className="title">{`${t("lbl_ImportantNotes")}：`}</div>
			<ul>
				<li>{t("lbl_PaymentQRNote1")}</li>
				<li>{t("lbl_PaymentQRNote2")}</li>
			</ul>
			<div className="sisa">
				<div>{t("lbl_PaymentTimeLeft")}</div>
				<div>
					<Counter timeStop={handlePopBox} />
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
		const pad = (num, size) => `000${num}`.slice(size * -1);
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
	bankName: null,
	accountNumber: null,
	accountName: null,
	rate: null,
	requestAmount: null,
	token: null,
	thirdId: null,
	cashbackAmount: null,
	receivedAmount: null,
	PromotionRate: null,
	promoContent: null,
	currencyName: null
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
	bankName: PropTypes.string,
	accountNumber: PropTypes.string,
	accountName: PropTypes.string,
	thirdId: PropTypes.string,
	depositType: PropTypes.string.isRequired,
	handlePopBox: PropTypes.func.isRequired,
	cashbackAmount: PropTypes.string,
	receivedAmount: PropTypes.string,
	PromotionRate: PropTypes.string,
	promoContent: PropTypes.string,
	currencyName: PropTypes.string
};
