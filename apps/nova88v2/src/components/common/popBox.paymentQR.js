import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { number_format, isConvert } from "./common";

const Panel = ({ title, amount, currencyId, imgUrl, handlePopBox }) => {
	const { t } = useTranslation();

	const isMountedRef = useRef(null);

	useEffect(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	});

	const amountText = `${t(`Currency_${currencyId}`)} ${number_format(
		amount,
		false,
		0,
		isConvert(currencyId)
	)}`;

	const timeText = moment().format("YYYY-MM-DD H:mm:ss");

	return (
		<div className="dragonPayPop active">
			<div className="popTit">
				{title}
				<div className="icon icon-close" onClick={handlePopBox} />
			</div>
			<div className="title">{`${t("lbl_PaymentDetails")}：`}</div>
			<div>
				{`${t("lbl_Time")}：`}
				<span>{timeText}</span>
			</div>
			<div>
				{`${t("lbl_OrderAmount")}：`}
				<span>{amountText}</span>
			</div>
			<div className="guide">
				<img src={imgUrl} className="qrCode" alt="qrcode" />
				<div>
					{`${t("lbl_Pay")} `}
					<span>{amountText}</span>
				</div>
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
